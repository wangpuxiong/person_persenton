from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from models.image_prompt import ImagePrompt
from models.sql.image_asset import ImageAsset
from services.database import get_async_session
from services.image_generation_service import ImageGenerationService
from utils.asset_directory_utils import get_images_directory
import os
import uuid
from utils.file_utils import get_file_name_with_random_uuid
from api.v1.auth.router import get_current_user, get_user_with_model_access, get_current_api_key

IMAGES_ROUTER = APIRouter(prefix="/images", tags=["Images"])


@IMAGES_ROUTER.get("/generate")
async def generate_image(
    prompt: str,
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: Optional[str] = Depends(get_current_user),
    api_key: str = Depends(get_current_api_key),
):
    """
    生成图像
    
    Args:
        prompt: 图像生成的提示文本
        sql_session: 异步数据库会话（通过依赖注入获取）
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        包含图像路径的响应对象
    """
    images_directory = get_images_directory()
    image_prompt = ImagePrompt(prompt=prompt)

    image_generation_service = ImageGenerationService(
        output_directory=images_directory, 
        api_key=api_key,
        model=None
    )
    image = await image_generation_service.generate_image(image_prompt)

    # 检查生成的图像是否为 ImageAsset 实例
    if not isinstance(image, ImageAsset):
        return image
    
    # 关联图像与用户
    image.user_id = current_user

    sql_session.add(image)
    await sql_session.commit()

    return image.path


@IMAGES_ROUTER.get("/generated", response_model=List[ImageAsset])
async def get_generated_images(
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: str = Depends(get_current_user)
):
    """
    获取当前用户生成的未上传图像
    
    Args:
        sql_session: 异步数据库会话（通过依赖注入获取）
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        包含未上传图像资产的列表
    """
    try:
        images = await sql_session.scalars(
            select(ImageAsset)
            .where(ImageAsset.is_uploaded == False)
            .where(ImageAsset.user_id == current_user)
            .order_by(ImageAsset.created_at.desc())
        )
        return images
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve generated images: {str(e)}"
        )


@IMAGES_ROUTER.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: str = Depends(get_current_user)
):
    """
    上传图像
    
    Args:
        file: 上传的图像文件（通过 FormData 上传）
        sql_session: 异步数据库会话（通过依赖注入获取）
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        包含上传图像资产的响应对象
    """
    try:
        new_filename = get_file_name_with_random_uuid(file)
        image_path = os.path.join(
            get_images_directory(), os.path.basename(new_filename)
        )

        with open(image_path, "wb") as f:
            f.write(await file.read())

        # 关联图像与用户
        image_asset = ImageAsset(path=image_path, is_uploaded=True, user_id=current_user)

        sql_session.add(image_asset)
        await sql_session.commit()

        return image_asset
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")


@IMAGES_ROUTER.get("/uploaded", response_model=List[ImageAsset])
async def get_uploaded_images(
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: str = Depends(get_current_user)
):
    """
    获取当前用户上传的图像
    
    Args:
        sql_session: 异步数据库会话（通过依赖注入获取）
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        包含上传图像资产的列表
    """
    try:
        images = await sql_session.scalars(
            select(ImageAsset)
            .where(ImageAsset.is_uploaded == True)
            .where(ImageAsset.user_id == current_user)
            .order_by(ImageAsset.created_at.desc())
        )
        return images
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve uploaded images: {str(e)}"
        )


@IMAGES_ROUTER.delete("/{id}", status_code=204)
async def delete_uploaded_image_by_id(
    id: uuid.UUID,
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: str = Depends(get_current_user)
):
    """
    删除当前用户上传的图像
    
    Args:
        id: 要删除的图像资产ID
        sql_session: 异步数据库会话（通过依赖注入获取）
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        无返回值（204 No Content）
    """
    try:
        # 检查图像是否存在
        image = await sql_session.get(ImageAsset, id)
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")
        
        # 检查图像是否属于当前用户
        if image.user_id != current_user:
            raise HTTPException(status_code=403, detail="Not authorized to delete this image")

        os.remove(image.path)

        await sql_session.delete(image)
        await sql_session.commit()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete image: {str(e)}")
