from typing import Annotated, Any, Dict, Optional
from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from models.sql.presentation import PresentationModel
from models.sql.slide import SlideModel
from models.sql.image_asset import ImageAsset
from services.database import get_async_session
from services.image_generation_service import ImageGenerationService
from utils.asset_directory_utils import get_images_directory
from utils.llm_calls.edit_slide import get_edited_slide_content
from utils.llm_calls.edit_slide_html import get_edited_slide_html
from utils.llm_calls.select_slide_type_on_edit import get_slide_layout_from_prompt
from utils.process_slides import process_old_and_new_slides_and_fetch_assets
from api.v1.auth.router import get_current_user, get_user_with_model_access, get_current_api_key
import uuid


SLIDE_ROUTER = APIRouter(prefix="/slide", tags=["Slide"])


@SLIDE_ROUTER.post("/edit")
async def edit_slide(
    id: Annotated[uuid.UUID, Body()],
    prompt: Annotated[str, Body()],
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: str = Depends(get_current_user),
    api_key: str = Depends(get_current_api_key),
):
    """
    编辑幻灯片内容
    
    参数:
        id: 幻灯片唯一标识符
        prompt: 编辑提示
        sql_session: 异步数据库会话
        current_user: 当前登录用户
        api_key: 当前用户的API密钥
    
    返回:
        更新后的幻灯片对象
    
    异常:
        HTTPException 404: 幻灯片不存在
        HTTPException 403: 无权限编辑该幻灯片
    """
    slide = await sql_session.get(SlideModel, id)
    # 检查幻灯片是否存在
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    
    presentation = await sql_session.get(PresentationModel, slide.presentation)
    if not presentation:
        raise HTTPException(status_code=404, detail="Presentation not found")
    
    # 检查用户是否有编辑该幻灯片的权限
    if presentation.user_id != current_user:
        raise HTTPException(status_code=403, detail="Not authorized to edit this slide")

    presentation_layout = presentation.get_layout()
    # 大模型根据编辑提示生成新的幻灯片布局
    slide_layout = await get_slide_layout_from_prompt(
        prompt, presentation_layout, slide, api_key=api_key
    )

    # 大模型根据编辑提示生成新的幻灯片内容
    edited_slide_content = await get_edited_slide_content(
        prompt, slide, presentation.language, slide_layout, api_key=api_key
    )

    image_generation_service = ImageGenerationService(output_directory=get_images_directory(), api_key=api_key)

    # 处理旧幻灯片内容和新幻灯片内容，生成新的资产
    new_assets = await process_old_and_new_slides_and_fetch_assets(
        image_generation_service,
        slide.content,
        edited_slide_content,
    )
    
    # 为新资产设置用户ID
    for asset in new_assets:
        if isinstance(asset, ImageAsset):
            asset.user_id = current_user

    # 为新幻灯片设置唯一ID
    slide.id = uuid.uuid4()

    sql_session.add(slide)
    slide.content = edited_slide_content
    slide.layout = slide_layout.id
    slide.speaker_note = edited_slide_content.get("__speaker_note__", "")
    sql_session.add_all(new_assets)
    await sql_session.commit()

    return slide


@SLIDE_ROUTER.post("/edit-html", response_model=SlideModel)
async def edit_slide_html(
    id: Annotated[uuid.UUID, Body()],
    prompt: Annotated[str, Body()],
    html: Annotated[Optional[str], Body()] = None,
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: str = Depends(get_current_user),
):
    """
    编辑幻灯片HTML内容
    
    参数:
        id: 幻灯片唯一标识符
        prompt: 编辑提示
        html: 要编辑的HTML内容（可选）
        sql_session: 异步数据库会话
        current_user: 当前登录用户ID（可选）
    
    返回:
        更新后的幻灯片对象
    
    异常:
        HTTPException 404: 幻灯片不存在
        HTTPException 400: 没有HTML内容可编辑
        HTTPException 403: 无权限编辑该幻灯片
    """
    slide = await sql_session.get(SlideModel, id)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")

    html_to_edit = html or slide.html_content
    if not html_to_edit:
        raise HTTPException(status_code=400, detail="No HTML to edit")

    edited_slide_html = await get_edited_slide_html(prompt, html_to_edit)

    # Always assign a new unique id to the slide
    # This is to ensure that the nextjs can track slide updates
    slide.id = uuid.uuid4()

    sql_session.add(slide)
    slide.html_content = edited_slide_html
    await sql_session.commit()

    return slide
