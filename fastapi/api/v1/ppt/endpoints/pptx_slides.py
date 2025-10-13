import os
import shutil
import zipfile
import tempfile
import subprocess
import uuid
from typing import List, Optional, Dict
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from api.v1.auth.router import get_current_user
from pydantic import BaseModel
import aiohttp
import asyncio
import xml.etree.ElementTree as ET
import re

from services.documents_loader import DocumentsLoader
from utils.asset_directory_utils import get_images_directory
import uuid
from constants.documents import POWERPOINT_TYPES


PPTX_SLIDES_ROUTER = APIRouter(prefix="/pptx-slides", tags=["PPTX Slides"])


class SlideData(BaseModel):
    """单个PPTX幻灯片数据模型"""
    slide_number: int  # 幻灯片编号
    screenshot_url: str  # 幻灯片截图URL
    xml_content: str  # 幻灯片XML内容
    normalized_fonts: List[str]  # 标准化后的字体列表


class FontAnalysisResult(BaseModel):
    """字体分析结果模型"""
    internally_supported_fonts: List[Dict[str, str]]  # 内部支持的字体（包含Google Fonts URL）
    not_supported_fonts: List[str]  # 不支持的字体列表


class PptxSlidesResponse(BaseModel):
    """PPTX幻灯片处理响应模型"""
    success: bool  # 处理是否成功
    slides: List[SlideData]  # 幻灯片数据列表
    total_slides: int  # 总幻灯片数量
    fonts: Optional[FontAnalysisResult] = None  # 字体分析结果（可选）


# 创建仅用于字体分析的路由器和响应模型
class PptxFontsResponse(BaseModel):
    """PPTX字体分析专用响应模型"""
    success: bool  # 分析是否成功
    fonts: FontAnalysisResult  # 字体分析结果


PPTX_FONTS_ROUTER = APIRouter(prefix="/pptx-fonts", tags=["PPTX Fonts"])

# 用于字体名称标准化的样式标记集合
_STYLE_TOKENS = {
    # 样式相关
    "italic",
    "italics",
    "ital",
    "oblique",
    "roman",
    # 组合样式快捷方式
    "bolditalic",
    "bolditalics",
    # 字重相关
    "thin",
    "hairline",
    "extralight",
    "ultralight",
    "light",
    "demilight",
    "semilight",
    "book",
    "regular",
    "normal",
    "medium",
    "semibold",
    "demibold",
    "bold",
    "extrabold",
    "ultrabold",
    "black",
    "extrablack",
    "ultrablack",
    "heavy",
    # 字宽/伸展相关
    "narrow",
    "condensed",
    "semicondensed",
    "extracondensed",
    "ultracondensed",
    "expanded",
    "semiexpanded",
    "extraexpanded",
    "ultraexpanded",
}
# 通常与样式标记一起使用的修饰符
_STYLE_MODIFIERS = {"semi", "demi", "extra", "ultra"}


def _insert_spaces_in_camel_case(value: str) -> str:
    """在驼峰命名中插入空格，使字体名称更易读"""
    # 在小写字母或数字后跟的大写字母前插入空格（如 MontserratBold -> Montserrat Bold）
    value = re.sub(r"(?<=[a-z0-9])([A-Z])", r" \\1", value)
    # 处理BoldItalic等连续大写字母序列 -> Bold Italic
    value = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\\1 \\2", value)
    return value


def normalize_font_family_name(raw_name: str) -> str:
    """标准化字体家族名称，移除样式/字重/伸展描述符并分割驼峰命名"""
    if not raw_name:
        return raw_name
    # 将分隔符替换为空格
    name = raw_name.replace("_", " ").replace("-", " ")
    # 在驼峰命名中插入空格
    name = _insert_spaces_in_camel_case(name)
    # 合并多个空格
    name = re.sub(r"\\s+", " ", name).strip()
    # 转为小写用于匹配，但保留原始大小写用于输出
    lower_name = name.lower()
    # 快速处理：如果完整字符串以纯样式后缀结尾，则修剪它
    for style in sorted(_STYLE_TOKENS, key=len, reverse=True):
        if lower_name.endswith(" " + style):
            name = name[: -(len(style) + 1)]
            lower_name = lower_name[: -(len(style) + 1)]
            break
    # 分词处理
    tokens_original = name.split(" ")
    tokens_filtered: List[str] = []
    for index, tok in enumerate(tokens_original):
        lower_tok = tok.lower()
        # 始终保留第一个标记，以避免去掉像"Black Ops One"这样的字体家族
        if index == 0:
            tokens_filtered.append(tok)
            continue
        # 丢弃样式标记和独立的修饰符
        if lower_tok in _STYLE_TOKENS or lower_tok in _STYLE_MODIFIERS:
            continue
        tokens_filtered.append(tok)
    # 如果除了第一个标记外的所有内容都被丢弃，并且第一个标记是样式标记（不太可能），则回退到原始值
    if not tokens_filtered:
        tokens_filtered = tokens_original
    normalized = " ".join(tokens_filtered).strip()
    # 最后清理剩余的多个空格
    normalized = re.sub(r"\\s+", " ", normalized)
    return normalized


def extract_fonts_from_oxml(xml_content: str) -> List[str]:
    """
    从OXML内容中提取字体名称
    
    Args:
        xml_content: OXML内容字符串
    
    Returns:
        在OXML中找到的唯一字体名称列表
    """
    fonts = set()

    try:
        # 解析XML内容
        root = ET.fromstring(xml_content)

        # 定义OXML中常用的命名空间
        namespaces = {
            "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
            "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
            "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        }

        # 搜索各种OXML元素中的字体引用
        # 查找拉丁文字体
        for font_elem in root.findall(".//a:latin", namespaces):
            if "typeface" in font_elem.attrib:
                fonts.add(font_elem.attrib["typeface"])

        # 查找东亚字体
        for font_elem in root.findall(".//a:ea", namespaces):
            if "typeface" in font_elem.attrib:
                fonts.add(font_elem.attrib["typeface"])

        # 查找复杂脚本字体
        for font_elem in root.findall(".//a:cs", namespaces):
            if "typeface" in font_elem.attrib:
                fonts.add(font_elem.attrib["typeface"])

        # 查找主题元素中的字体引用
        for font_elem in root.findall(".//a:font", namespaces):
            if "typeface" in font_elem.attrib:
                fonts.add(font_elem.attrib["typeface"])

        # 查找rPr（运行属性）中的字体引用
        for rpr_elem in root.findall(".//a:rPr", namespaces):
            for font_elem in rpr_elem.findall(".//a:latin", namespaces):
                if "typeface" in font_elem.attrib:
                    fonts.add(font_elem.attrib["typeface"])

        # 也搜索不带命名空间前缀的元素以提高兼容性
        for font_elem in root.findall(".//latin"):
            if "typeface" in font_elem.attrib:
                fonts.add(font_elem.attrib["typeface"])

        # 正则表达式作为备用方法，用于查找可能被遗漏的字体
        font_pattern = r'typeface="([^"]+)"'
        regex_fonts = re.findall(font_pattern, xml_content)
        fonts.update(regex_fonts)

        # 过滤掉系统字体和空值
        system_fonts = {"+mn-lt", "+mj-lt", "+mn-ea", "+mj-ea", "+mn-cs", "+mj-cs", ""}
        fonts = {font for font in fonts if font not in system_fonts and font.strip()}

        return list(fonts)

    except Exception as e:
        print(f"Error extracting fonts from OXML: {e}")
        return []


async def check_google_font_availability(font_name: str) -> bool:
    """
    检查字体是否在Google Fonts中可用
    
    Args:
        font_name: 要检查的字体名称
    
    Returns:
        如果字体在Google Fonts中可用则返回True，否则返回False
    """
    try:
        formatted_name = font_name.replace(" ", "+")
        url = f"https://fonts.googleapis.com/css2?family={formatted_name}&display=swap"

        async with aiohttp.ClientSession() as session:
            async with session.head(
                url, timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                return response.status == 200

    except Exception as e:
        print(f"Error checking Google Font availability for {font_name}: {e}")
        return False


async def analyze_fonts_in_all_slides(slide_xmls: List[str]) -> FontAnalysisResult:
    """
    分析所有幻灯片中的字体并确定Google Fonts可用性
    
    Args:
        slide_xmls: 所有幻灯片的OXML内容字符串列表
    
    Returns:
        包含支持和不支持字体的FontAnalysisResult
    """
    # 从所有幻灯片中提取字体
    raw_fonts = set()
    for xml_content in slide_xmls:
        slide_fonts = extract_fonts_from_oxml(xml_content)
        raw_fonts.update(slide_fonts)

    # 标准化为根字体家族（例如 "Montserrat Italic" -> "Montserrat"）
    normalized_fonts = {normalize_font_family_name(f) for f in raw_fonts}
    # 移除空值（如果有）
    normalized_fonts = {f for f in normalized_fonts if f}

    if not normalized_fonts:
        return FontAnalysisResult(internally_supported_fonts=[], not_supported_fonts=[])

    # 并发检查每个标准化字体在Google Fonts中的可用性
    tasks = [check_google_font_availability(font) for font in normalized_fonts]
    results = await asyncio.gather(*tasks)

    internally_supported_fonts = []
    not_supported_fonts = []

    for font, is_available in zip(normalized_fonts, results):
        if is_available:
            formatted_name = font.replace(" ", "+")
            google_fonts_url = f"https://fonts.googleapis.com/css2?family={formatted_name}&display=swap"
            internally_supported_fonts.append(
                {"name": font, "google_fonts_url": google_fonts_url}
            )
        else:
            not_supported_fonts.append(font)

    return FontAnalysisResult(
        internally_supported_fonts=internally_supported_fonts, not_supported_fonts=[]
    )


@PPTX_SLIDES_ROUTER.post("/process", response_model=PptxSlidesResponse, responses={401: {}, 403: {}})
async def process_pptx_slides(
    pptx_file: UploadFile = File(..., description="PPTX file to process"),
    fonts: Optional[List[UploadFile]] = File(None, description="Optional font files"),
    current_user: str = Depends(get_current_user)
):
    """
    处理PPTX文件以提取幻灯片截图和XML内容
    
    此端点执行以下操作：
    1. 验证上传的PPTX文件
    2. 安装任何提供的字体文件
    3. 解压PPTX以提取幻灯片XML
    4. 使用LibreOffice生成幻灯片截图
    5. 返回每张幻灯片的截图URL和XML内容
    
    参数:
        pptx_file: 要处理的PPTX文件（必填）
        fonts: 可选的字体文件列表（每个文件为TTF或OTF格式）
        current_user: 当前登录用户ID
    
    返回:
        PptxSlidesResponse包含每张幻灯片的截图URL和XML内容
    """

    # 验证PPTX文件类型
    if pptx_file.content_type not in POWERPOINT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Expected PPTX file, got {pptx_file.content_type}",
        )
    # 强制执行100MB大小限制
    if (
        hasattr(pptx_file, "size")
        and pptx_file.size
        and pptx_file.size > (100 * 1024 * 1024)
    ):
        raise HTTPException(
            status_code=400,
            detail="PPTX file exceeded max upload size of 100 MB",
        )

    # 创建临时目录用于处理
    with tempfile.TemporaryDirectory() as temp_dir:
        if True:
            # 保存上传的PPTX文件
            pptx_path = os.path.join(temp_dir, "presentation.pptx")
            with open(pptx_path, "wb") as f:
                pptx_content = await pptx_file.read()
                f.write(pptx_content)

            # 如果提供了字体，则安装它们
            if fonts:
                await _install_fonts(fonts, temp_dir)

            # 从PPTX中提取幻灯片XML
            slide_xmls = _extract_slide_xmls(pptx_path, temp_dir)

            # 将PPTX转换为PDF
            pdf_path = await _convert_pptx_to_pdf(pptx_path, temp_dir)

            # 使用LibreOffice生成截图
            screenshot_paths = await DocumentsLoader.get_page_images_from_pdf_async(
                pdf_path, temp_dir
            )
            print(f"Screenshot paths: {screenshot_paths}")

            # 分析所有幻灯片中的字体
            font_analysis = await analyze_fonts_in_all_slides(slide_xmls)
            print(
                f"Font analysis completed: {len(font_analysis.internally_supported_fonts)} supported, {len(font_analysis.not_supported_fonts)} not supported"
            )

            # 将截图移动到图像目录并生成URL
            images_dir = get_images_directory()
            presentation_id = uuid.uuid4()
            presentation_images_dir = os.path.join(images_dir, str(presentation_id))
            os.makedirs(presentation_images_dir, exist_ok=True)

            slides_data = []

            for i, (xml_content, screenshot_path) in enumerate(
                zip(slide_xmls, screenshot_paths), 1
            ):
                # 将截图移动到永久位置
                screenshot_filename = f"slide_{i}.png"
                permanent_screenshot_path = os.path.join(
                    presentation_images_dir, screenshot_filename
                )

                if (
                    os.path.exists(screenshot_path)
                    and os.path.getsize(screenshot_path) > 0
                ):
                    # 使用shutil.copy2而不是os.rename以处理跨设备移动
                    shutil.copy2(screenshot_path, permanent_screenshot_path)
                    screenshot_url = (
                        f"/app_data/images/{presentation_id}/{screenshot_filename}"
                    )
                else:
                    # 如果截图生成失败或文件为空占位符，则使用回退方案
                    screenshot_url = "/static/images/placeholder.jpg"

                # 计算此幻灯片的标准化字体
                raw_slide_fonts = extract_fonts_from_oxml(xml_content)
                normalized_fonts = sorted(
                    {normalize_font_family_name(f) for f in raw_slide_fonts if f}
                )

                slides_data.append(
                    SlideData(
                        slide_number=i,
                        screenshot_url=screenshot_url,
                        xml_content=xml_content,
                        normalized_fonts=normalized_fonts,
                    )
                )

            return PptxSlidesResponse(
                success=True,
                slides=slides_data,
                total_slides=len(slides_data),
                fonts=font_analysis,
            )


# 新：仅字体分析端点，利用相同的字体提取/分析功能
@PPTX_FONTS_ROUTER.post("/process", response_model=PptxFontsResponse, responses={401: {}, 403: {}})
async def process_pptx_fonts(
    pptx_file: UploadFile = File(..., description="PPTX file to analyze fonts from"),
    current_user: str = Depends(get_current_user)
):
    """
    分析PPTX文件并仅返回文档中使用的字体
    
    使用与/pptx-slides端点完全相同的字体提取和分析实用工具
    """
    # 验证PPTX文件类型
    if pptx_file.content_type not in POWERPOINT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Expected PPTX file, got {pptx_file.content_type}",
        )

    # 创建临时目录用于处理
    with tempfile.TemporaryDirectory() as temp_dir:
        # 保存上传的PPTX文件
        pptx_path = os.path.join(temp_dir, "presentation.pptx")
        with open(pptx_path, "wb") as f:
            pptx_content = await pptx_file.read()
            f.write(pptx_content)

        # 从PPTX中提取幻灯片XML
        slide_xmls = _extract_slide_xmls(pptx_path, temp_dir)

        # 分析所有幻灯片中的字体（与/pptx-slides中相同的逻辑）
        font_analysis = await analyze_fonts_in_all_slides(slide_xmls)

        return PptxFontsResponse(
            success=True,
            fonts=font_analysis,
        )


def _create_font_alias_config(raw_fonts: List[str]) -> str:
    """创建一个临时fontconfig配置，将变体家族名称别名映射到标准化的根家族
    返回配置文件的路径
    """
    # 构建从原始到标准化的映射（如果不同）
    mappings: Dict[str, str] = {}
    for f in raw_fonts:
        normalized = normalize_font_family_name(f)
        if normalized and normalized != f:
            mappings[f] = normalized
    # 仅在有映射时创建配置
    fd, fonts_conf_path = tempfile.mkstemp(prefix="fonts_alias_", suffix=".conf")
    os.close(fd)
    with open(fonts_conf_path, "w", encoding="utf-8") as cfg:
        cfg.write(
            """<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <include>/etc/fonts/fonts.conf</include>
"""
        )
        for src, dst in mappings.items():
            cfg.write(
                f"""
  <match target="pattern">
    <test name="family" compare="eq">
      <string>{src}</string>
    </test>
    <edit name="family" mode="assign" binding="strong">
      <string>{dst}</string>
    </edit>
  </match>
"""
            )
        cfg.write("\n</fontconfig>\n")
    return fonts_conf_path


async def _install_fonts(fonts: List[UploadFile], temp_dir: str) -> None:
    """安装提供的字体文件到系统"""
    fonts_dir = os.path.join(temp_dir, "fonts")
    os.makedirs(fonts_dir, exist_ok=True)

    for font_file in fonts:
        # 保存字体文件
        font_path = os.path.join(fonts_dir, font_file.filename)
        with open(font_path, "wb") as f:
            font_content = await font_file.read()
            f.write(font_content)

        # 安装字体（复制到系统字体目录）
        try:
            subprocess.run(
                ["cp", font_path, "/usr/share/fonts/truetype/"],
                check=True,
                capture_output=True,
            )
        except subprocess.CalledProcessError as e:
            print(f"Warning: Failed to install font {font_file.filename}: {e}")

    # 刷新字体缓存
    try:
        subprocess.run(["fc-cache", "-f", "-v"], check=True, capture_output=True)
    except subprocess.CalledProcessError as e:
        print(f"Warning: Failed to refresh font cache: {e}")


def _extract_slide_xmls(pptx_path: str, temp_dir: str) -> List[str]:
    """从PPTX文件中提取幻灯片XML内容"""
    slide_xmls = []
    extract_dir = os.path.join(temp_dir, "pptx_extract")

    try:
        # 解压PPTX文件
        with zipfile.ZipFile(pptx_path, "r") as zip_ref:
            zip_ref.extractall(extract_dir)

        # 在ppt/slides/目录中查找幻灯片
        slides_dir = os.path.join(extract_dir, "ppt", "slides")

        if not os.path.exists(slides_dir):
            raise Exception("No slides directory found in PPTX file")

        # 获取所有幻灯片XML文件并按数字排序
        slide_files = [
            f
            for f in os.listdir(slides_dir)
            if f.startswith("slide") and f.endswith(".xml")
        ]
        slide_files.sort(key=lambda x: int(x.replace("slide", "").replace(".xml", "")))

        # 读取每个幻灯片的XML内容
        for slide_file in slide_files:
            slide_path = os.path.join(slides_dir, slide_file)
            with open(slide_path, "r", encoding="utf-8") as f:
                slide_xmls.append(f.read())

        return slide_xmls

    except Exception as e:
        raise Exception(f"Failed to extract slide XMLs: {str(e)}")


async def _convert_pptx_to_pdf(pptx_path: str, temp_dir: str) -> str:
    """使用LibreOffice + ImageMagick生成PPTX幻灯片的PNG截图"""
    screenshots_dir = os.path.join(temp_dir, "screenshots")
    os.makedirs(screenshots_dir, exist_ok=True)

    try:
        # 首先，通过提取XML获取幻灯片数量
        slide_xmls = _extract_slide_xmls(pptx_path, temp_dir)
        slide_count = len(slide_xmls)

        # 构建字体别名配置，强制变体家族解析为标准化的根家族
        raw_fonts: List[str] = []
        for xml in slide_xmls:
            raw_fonts.extend(extract_fonts_from_oxml(xml))
        raw_fonts = list({f for f in raw_fonts if f})
        fonts_conf_path = _create_font_alias_config(raw_fonts)
        env = os.environ.copy()
        env["FONTCONFIG_FILE"] = fonts_conf_path

        print(f"Found {slide_count} slides in presentation")

        # 步骤1：使用LibreOffice将PPTX转换为PDF
        print("Starting LibreOffice PDF conversion...")
        pdf_filename = "temp_presentation.pdf"
        pdf_path = os.path.join(screenshots_dir, pdf_filename)

        try:
            result = subprocess.run(
                [
                    "libreoffice",
                    "--headless",
                    "--convert-to",
                    "pdf",
                    "--outdir",
                    screenshots_dir,
                    pptx_path,
                ],
                check=True,
                capture_output=True,
                text=True,
                timeout=500,
                env=env,
            )

            # 查找生成的PDF文件（LibreOffice使用原始文件名）
            pdf_files = [f for f in os.listdir(screenshots_dir) if f.endswith(".pdf")]
            if not pdf_files:
                raise Exception("LibreOffice failed to generate PDF file")

            actual_pdf_path = os.path.join(screenshots_dir, pdf_files[0])
            print(f"Generated PDF: {actual_pdf_path}")
            return actual_pdf_path

        except Exception as e:
            # 重新抛出我们已经处理过的特定异常
            if "timed out" in str(e) or "failed:" in str(e):
                raise
            # 处理任何其他意外异常
            raise Exception(f"Screenshot generation failed: {str(e)}")

    except Exception as e:
        # 重新抛出我们已经处理过的特定异常
        if "timed out" in str(e) or "failed:" in str(e):
            raise
        # 处理任何其他意外异常
        raise Exception(f"Screenshot generation failed: {str(e)}")
