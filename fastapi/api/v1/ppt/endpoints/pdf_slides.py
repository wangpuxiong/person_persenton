import os
import shutil
import tempfile
import subprocess
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from api.v1.auth.router import get_current_user
from pydantic import BaseModel

from services.documents_loader import DocumentsLoader
from utils.asset_directory_utils import get_images_directory
import uuid
from constants.documents import PDF_MIME_TYPES

# 创建PDF幻灯片处理相关的路由器
PDF_SLIDES_ROUTER = APIRouter(prefix="/pdf-slides", tags=["PDF Slides"])


class PdfSlideData(BaseModel):
    """单个PDF幻灯片数据模型"""
    slide_number: int  # 幻灯片编号
    screenshot_url: str  # 幻灯片截图URL


class PdfSlidesResponse(BaseModel):
    """PDF幻灯片处理响应模型"""
    success: bool  # 处理是否成功
    slides: List[PdfSlideData]  # 幻灯片数据列表
    total_slides: int  # 总幻灯片数量


@PDF_SLIDES_ROUTER.post("/process", response_model=PdfSlidesResponse, responses={401: {}, 403: {}})
async def process_pdf_slides(
    pdf_file: UploadFile = File(..., description="PDF file to process"),
    current_user: str = Depends(get_current_user)
):
    """
    处理上传的PDF文件并提取每张幻灯片的截图
    
    此端点执行以下操作：
    1. 验证上传的PDF文件格式和大小
    2. 使用ImageMagick将PDF页面转换为PNG图像
    3. 将生成的截图保存到永久存储位置
    4. 返回每张幻灯片的截图URL列表
    
    注意：由于PDF文件已嵌入字体，因此不需要安装额外字体
    """

    # 验证文件是否为PDF类型
    if pdf_file.content_type not in PDF_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Expected PDF file, got {pdf_file.content_type}",
        )
    
    # 验证文件大小不超过100MB
    if (
        hasattr(pdf_file, "size")
        and pdf_file.size
        and pdf_file.size > (100 * 1024 * 1024)  # 100MB限制
    ):
        raise HTTPException(
            status_code=400,
            detail="PDF file exceeded max upload size of 100 MB",
        )

    # 创建临时目录用于处理文件，上下文管理器确保处理完成后自动清理
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            # 保存上传的PDF文件到临时目录
            pdf_path = os.path.join(temp_dir, "presentation.pdf")
            with open(pdf_path, "wb") as f:
                pdf_content = await pdf_file.read()
                f.write(pdf_content)

            # 使用DocumentsLoader从PDF生成页面截图
            screenshot_paths = await DocumentsLoader.get_page_images_from_pdf_async(
                pdf_path, temp_dir
            )
            print(f"Generated {len(screenshot_paths)} PDF screenshots")

            # 准备永久存储位置
            images_dir = get_images_directory()
            presentation_id = uuid.uuid4()  # 为当前演示文稿生成唯一标识符
            presentation_images_dir = os.path.join(images_dir, str(presentation_id))
            os.makedirs(presentation_images_dir, exist_ok=True)

            slides_data = []

            # 处理每张幻灯片的截图
            for i, screenshot_path in enumerate(screenshot_paths, 1):
                # 设置目标文件名和路径
                screenshot_filename = f"slide_{i}.png"
                permanent_screenshot_path = os.path.join(
                    presentation_images_dir, screenshot_filename
                )

                if (
                    os.path.exists(screenshot_path)  # 检查截图文件是否存在
                    and os.path.getsize(screenshot_path) > 0  # 确保文件不为空
                ):
                    # 使用shutil.copy2而不是os.rename以处理跨设备移动
                    shutil.copy2(screenshot_path, permanent_screenshot_path)
                    # 构建可访问的URL路径
                    screenshot_url = (
                        f"/app_data/images/{presentation_id}/{screenshot_filename}"
                    )
                else:
                    # 如果截图生成失败，使用占位图像
                    screenshot_url = "/static/images/placeholder.jpg"

                # 添加幻灯片数据到结果列表
                slides_data.append(
                    PdfSlideData(slide_number=i, screenshot_url=screenshot_url)
                )

            # 返回处理成功的响应，包含所有幻灯片数据
            return PdfSlidesResponse(
                success=True, slides=slides_data, total_slides=len(slides_data)
            )

        except Exception as e:
            # 记录错误并返回500错误响应
            print(f"Error processing PDF slides: {str(e)}")
            raise HTTPException(
                status_code=500, detail=f"Failed to process PDF: {str(e)}"
            )
