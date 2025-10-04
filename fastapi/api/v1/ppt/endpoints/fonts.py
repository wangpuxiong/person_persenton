"""
字体管理 API 端点模块

此模块提供了字体文件的上传、列出和删除功能，支持多种字体格式
(ttf, otf, woff, woff2, eot)，并提供字体元数据提取功能。
"""
import os
import os
import uuid
import shutil
from pathlib import Path
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException, File, UploadFile, Depends
from pydantic import BaseModel
from utils.asset_directory_utils import get_app_data_directory_env
import uuid

try:
    from fontTools.ttLib import TTFont
    from fontTools.ttLib.tables._n_a_m_e import table__n_a_m_e
    FONTTOOLS_AVAILABLE = True
except ImportError:
    FONTTOOLS_AVAILABLE = False

from api.v1.auth.router import get_current_user

FONTS_ROUTER = APIRouter(prefix="/fonts", tags=["fonts"])

# Supported font file extensions
SUPPORTED_FONT_EXTENSIONS = {
    '.ttf': 'font/ttf',
    '.otf': 'font/otf', 
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject'
}

class FontUploadResponse(BaseModel):
    success: bool
    font_name: str
    font_url: str
    font_path: str
    message: Optional[str] = None

class FontListResponse(BaseModel):
    success: bool
    fonts: List[dict]
    message: Optional[str] = None


def get_fonts_directory() -> str:
    """Get the fonts directory path, create if it doesn't exist"""
    app_data_dir = get_app_data_directory_env() or "/tmp/presenton"
    fonts_dir = os.path.join(app_data_dir, "fonts")
    os.makedirs(fonts_dir, exist_ok=True)
    return fonts_dir


def is_valid_font_file(file: UploadFile) -> bool:
    """Validate font file by extension and MIME type"""
    if not file.filename:
        return False
    
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in SUPPORTED_FONT_EXTENSIONS:
        return False
    
    # Check MIME type
    content_type = file.content_type or ""
    valid_mime_types = [
        "font/ttf", "font/otf", "font/woff", "font/woff2",
        "application/font-ttf", "application/font-otf", 
        "application/font-woff", "application/font-woff2",
        "application/x-font-ttf", "application/x-font-otf",
        "font/truetype", "font/opentype"
    ]
    
    return content_type in valid_mime_types


def extract_font_name_from_file(file_path: str) -> str:
    """Extract the actual font family name from font file metadata"""
    if not FONTTOOLS_AVAILABLE:
        # Fallback to filename parsing if fonttools not available
        filename = os.path.basename(file_path)
        base_name = os.path.splitext(filename)[0]
        if '_' in filename and len(filename.split('_')[-1].split('.')[0]) == 8:
            # Remove UUID part
            parts = filename.split('_')
            if len(parts) > 1:
                return '_'.join(parts[:-1])
        return base_name
    
    try:
        font = TTFont(file_path)
        
        # Try to get font family name from name table
        if 'name' in font:
            name_table = font['name']
            
            # Preferred order: Family name (ID 1), then Full name (ID 4), then PostScript name (ID 6)
            for name_id in [1, 4, 6]:
                for record in name_table.names:
                    if record.nameID == name_id:
                        # Prefer English names
                        if record.langID == 0x409 or record.langID == 0:  # English
                            font_name = record.toUnicode().strip()
                            if font_name:
                                font.close()
                                return font_name
            
            # If no English name found, use any available family name
            for record in name_table.names:
                if record.nameID == 1:  # Family name
                    font_name = record.toUnicode().strip()
                    if font_name:
                        font.close()
                        return font_name
        
        font.close()
    except Exception as e:
        # If font parsing fails, fallback to filename
        print(f"Error reading font metadata from {file_path}: {e}")
    
    # Fallback to filename parsing
    filename = os.path.basename(file_path)
    base_name = os.path.splitext(filename)[0]
    if '_' in filename and len(filename.split('_')[-1].split('.')[0]) == 8:
        # Remove UUID part
        parts = filename.split('_')
        if len(parts) > 1:
            return '_'.join(parts[:-1])
    return base_name


@FONTS_ROUTER.post("/upload", response_model=FontUploadResponse, responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def upload_font(
    font_file: UploadFile = File(..., description="Font file to upload (.ttf, .otf, .woff, .woff2, .eot)"),
    current_user: str = Depends(get_current_user)
):
    """
    上传字体文件并保存到字体目录
    
    Args:
        font_file: 要上传的字体文件
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        FontUploadResponse: 包含字体详细信息和可访问 URL 的响应对象
        
    Raises:
        HTTPException: 如果文件验证失败或上传过程中发生错误
    """
    try:
        # 验证文件名是否为空
        if not font_file.filename:
            raise HTTPException(
                status_code=400,
                detail="No file name provided"
            )
        
        if not is_valid_font_file(font_file):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid font file. Supported formats: {', '.join(SUPPORTED_FONT_EXTENSIONS.keys())}"
            )
        
        # 生成唯一文件名以避免冲突
        file_ext = os.path.splitext(font_file.filename)[1].lower()
        base_name = os.path.splitext(font_file.filename)[0]
        unique_filename = f"{base_name}_{str(uuid.uuid4())[:8]}{file_ext}"
        
        # 确保字体目录存在
        fonts_dir = get_fonts_directory()
        font_path = os.path.join(fonts_dir, unique_filename)
        
        # 保存上传的字体文件
        with open(font_path, "wb") as buffer:
            shutil.copyfileobj(font_file.file, buffer)
        
        # 构建可访问的URL
        font_url = f"/app_data/fonts/{unique_filename}"
        
        return FontUploadResponse(
            success=True,
            font_name=base_name,
            font_url=font_url,
            font_path=font_path,
            message=f"Font '{base_name}' uploaded successfully"
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        print(f"Error uploading font: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error uploading font: {str(e)}"
        )


@FONTS_ROUTER.get("/list", response_model=FontListResponse, responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def list_fonts(current_user: str = Depends(get_current_user)):
    """
    列出所有已上传的字体及其可访问的 URL
    
    Args:
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        FontListResponse: 包含可用字体列表的响应对象
    """
    try:
        fonts_dir = get_fonts_directory()
        fonts = []
        
        # 遍历字体目录下的所有文件
        if os.path.exists(fonts_dir):
            for filename in os.listdir(fonts_dir):
                file_path = os.path.join(fonts_dir, filename)
                
                if os.path.isfile(file_path):
                    file_ext = os.path.splitext(filename)[1].lower()
                    
                    if file_ext in SUPPORTED_FONT_EXTENSIONS:
                        # 提取字体名称
                        font_name = extract_font_name_from_file(file_path)
                        
                        # 提取原始文件名（移除UUID后缀）
                        base_name = filename
                        if '_' in filename and len(filename.split('_')[-1].split('.')[0]) == 8:
                            # 移除UUID后缀以获取原始文件名
                            parts = filename.split('_')
                            if len(parts) > 1:
                                base_name = '_'.join(parts[:-1]) + file_ext
                        
                        fonts.append({
                            "filename": filename,
                            "font_name": font_name,
                            "original_name": base_name,
                            "font_url": f"/app_data/fonts/{filename}",
                            "font_type": SUPPORTED_FONT_EXTENSIONS.get(file_ext, 'unknown'),
                            "file_size": os.path.getsize(file_path)
                        })
        
        return FontListResponse(
            success=True,
            fonts=fonts,
            message=f"Found {len(fonts)} font files"
        )
        
    except Exception as e:
        print(f"Error listing fonts: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error listing fonts: {str(e)}"
        )


@FONTS_ROUTER.delete("/delete/{filename}", responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def delete_font(filename: str, current_user: str = Depends(get_current_user)):
    """
    从字体目录中删除字体文件
    
    Args:
        filename: 要删除的字体文件的名称
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        包含成功消息的响应对象
    """
    try:
        fonts_dir = get_fonts_directory()
        font_path = os.path.join(fonts_dir, filename)
        
        if not os.path.exists(font_path):
            raise HTTPException(
                status_code=404,
                detail=f"Font file '{filename}' not found"
            )
        
        # 确认文件扩展名是字体格式
        file_ext = os.path.splitext(filename.lower())[1]
        if file_ext not in SUPPORTED_FONT_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="File is not a recognized font format"
            )
        
        os.remove(font_path)
        
        return {
            "success": True,
            "message": f"Font '{filename}' deleted successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error deleting font: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting font: {str(e)}"
        )