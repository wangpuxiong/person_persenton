from typing import List
from fastapi import APIRouter, Depends
from services.icon_finder_service import ICON_FINDER_SERVICE
from api.v1.auth.router import get_current_user

ICONS_ROUTER = APIRouter(prefix="/icons", tags=["Icons"])


@ICONS_ROUTER.get("/search", response_model=List[str], responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def search_icons(query: str, limit: int = 20, current_user: str = Depends(get_current_user)):
    """
    搜索图标
    
    Args:
        query: 搜索查询字符串
        limit: 返回的图标数量限制（默认20）
        current_user: 当前登录用户（通过依赖注入获取）
        
    Returns:
        包含匹配图标路径的列表，每个路径都是 `/static/icons/bold/{icon_name}.svg` 格式
    """
    return await ICON_FINDER_SERVICE.search_icons(query, limit)
