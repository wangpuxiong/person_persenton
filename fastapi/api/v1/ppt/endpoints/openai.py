from typing import Annotated, List
from fastapi import APIRouter, Body, Depends, HTTPException

from utils.available_models import list_available_openai_compatible_models
from api.v1.auth.router import get_current_user

OPENAI_ROUTER = APIRouter(prefix="/openai", tags=["OpenAI"])


@OPENAI_ROUTER.post("/models/available", response_model=List[str], responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def get_available_models(
    url: Annotated[str, Body()],
    api_key: Annotated[str, Body()],
    current_user: str = Depends(get_current_user)
):
    try:
        return await list_available_openai_compatible_models(url, api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
