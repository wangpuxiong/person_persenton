from typing import Annotated, List
from fastapi import APIRouter, Body, Depends, HTTPException

from utils.available_models import list_available_google_models
from api.v1.auth.router import get_current_user

GOOGLE_ROUTER = APIRouter(prefix="/google", tags=["Google"])


@GOOGLE_ROUTER.post("/models/available", response_model=List[str], responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def get_available_models(api_key: Annotated[str, Body(embed=True)], current_user: str = Depends(get_current_user)):
    """获取用户可用的 Google 模型列表
    
    Args:
        api_key: Google API 密钥，从请求体中获取
        current_user: 当前已认证的用户（通过依赖注入自动获取）
        
    Returns:
        List[str]: 用户可用的 Google 模型 ID 列表
        
    Raises:
        HTTPException: 当请求失败时返回 500 状态码及错误详情
    """
    try:
        return await list_available_google_models(api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
