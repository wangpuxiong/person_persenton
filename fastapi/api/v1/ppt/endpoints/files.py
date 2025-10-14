from http.client import HTTPException
import os
from typing import Annotated, List, Optional
from fastapi import APIRouter, BackgroundTasks, Body, File, UploadFile, Depends, HTTPException  # 添加

from constants.documents import UPLOAD_ACCEPTED_FILE_TYPES
from models.decomposed_file_info import DecomposedFileInfo
from services.temp_file_service import TEMP_FILE_SERVICE
from services.documents_loader import DocumentsLoader
import uuid
from utils.validators import validate_files
from api.v1.auth.router import get_current_user
from utils.get_env import get_temp_directory_env
import logging

logger = logging.getLogger(__name__)

# 创建文件操作相关的API路由
FILES_ROUTER = APIRouter(prefix="/files", tags=["Files"])


@FILES_ROUTER.post("/upload", response_model=List[str], responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def upload_files(files: List[UploadFile] = File(...), current_user: str = Depends(get_current_user)):
    """上传文件接口
    
    接收用户上传的文件列表，验证文件合法性，保存到临时目录并返回文件路径列表。
    
    Args:
        files: 上传的文件列表
        current_user: 当前认证的用户（通过依赖注入获取）
        
    Returns:
        List[str]: 保存后的临时文件路径列表
        
    Raises:
        HTTPException: 当未提供文件时抛出400错误
    """
    if not files:
        raise HTTPException(400, "Documents are required")

    temp_dir = TEMP_FILE_SERVICE.create_temp_dir(str(uuid.uuid4()))

    validate_files(files, True, True, 100, UPLOAD_ACCEPTED_FILE_TYPES)

    temp_files: List[str] = []
    if files:
        for each_file in files:
            temp_path = TEMP_FILE_SERVICE.create_temp_file_path(
                each_file.filename, temp_dir
            )
            with open(temp_path, "wb") as f:
                content = await each_file.read()
                f.write(content)

            temp_files.append(temp_path)

    return temp_files


@FILES_ROUTER.post("/decompose", response_model=List[DecomposedFileInfo], responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def decompose_files(
    file_paths: Annotated[List[str], Body(embed=True)],
    current_user: str = Depends(get_current_user)
):
    """文件分解接口
    
    接收文件路径列表，将非文本文件解析为文本格式，并返回所有文件的分解信息。
    
    Args:
        file_paths: 要分解的文件路径列表
        current_user: 当前认证的用户（通过依赖注入获取）
        
    Returns:
        List[DecomposedFileInfo]: 包含文件名和路径的分解文件信息列表
    """
    temp_dir = TEMP_FILE_SERVICE.create_temp_dir(str(uuid.uuid4()))

    txt_files = []
    other_files = []
    # 分类文件类型
    for file_path in file_paths:
        if file_path.endswith(".txt"):
            txt_files.append(file_path)
        else:
            other_files.append(file_path)

    # 处理非文本文件
    try:
        documents_loader = DocumentsLoader(file_paths=other_files)
        await documents_loader.load_documents(temp_dir)
        parsed_documents = documents_loader.documents
    except Exception as e:
        # 清理临时目录
        TEMP_FILE_SERVICE.cleanup_temp_dir(temp_dir)
        # 添加详细的错误日志
        logger.error(f"文件解析失败: {str(e)}")
        logger.error(f"环境变量 HF_ENDPOINT: {os.environ.get('HF_ENDPOINT')}")
        
        # 根据不同的错误类型提供更具体的错误信息
        if "Hub" in str(e) or "model" in str(e).lower():
            raise HTTPException(500, "文件解析失败: 无法下载或加载所需的模型。请检查网络连接或配置Hugging Face镜像站。")
        else:
            raise HTTPException(500, f"文件解析失败: {str(e)}")

    response = []
    for index, parsed_doc in enumerate(parsed_documents):
        file_path = TEMP_FILE_SERVICE.create_temp_file_path(
            f"{uuid.uuid4()}.txt", temp_dir
        )
        logger.info(f"文件解析成功: {file_path}")
        parsed_doc = parsed_doc.replace("<br>", "\n")
        with open(file_path, "w") as text_file:
            text_file.write(parsed_doc)
        response.append(
            DecomposedFileInfo(
                name=os.path.basename(other_files[index]), file_path=file_path
            )
        )

    # 处理文本文件
    for each_file in txt_files:
        response.append(
            DecomposedFileInfo(name=os.path.basename(each_file), file_path=each_file)
        )

    return response

@FILES_ROUTER.post("/update", responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def update_files(
    file_path: Annotated[str, Body()],
    file: Annotated[UploadFile, File()],
    current_user: str = Depends(get_current_user)
):
    """文件更新接口
    
    接收文件路径和新的文件内容，更新指定路径的文件内容。
    
    Args:
        file_path: 要更新的文件路径
        file: 包含新内容的上传文件
        current_user: 当前认证的用户（通过依赖注入获取）
        
    Returns:
        dict: 包含成功消息的字典
    """
    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {"message": "File updated successfully"}
