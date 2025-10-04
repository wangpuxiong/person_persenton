"""Ollama 模型管理相关 API 端点

此模块提供了与 Ollama 本地大语言模型交互的 API 端点，包括获取支持的模型列表、
查看当前可用的模型以及拉取新模型的功能。
"""
from datetime import datetime, timedelta
import json
from typing import List
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.ppt.background_tasks import pull_ollama_model_background_task
from api.v1.auth.router import get_current_user
from constants.supported_ollama_models import SUPPORTED_OLLAMA_MODELS
from models.ollama_model_metadata import OllamaModelMetadata
from models.ollama_model_status import OllamaModelStatus
from models.sql.ollama_pull_status import OllamaPullStatus
from services.database import get_container_db_async_session
from utils.ollama import list_pulled_ollama_models

OLLAMA_ROUTER = APIRouter(prefix="/ollama", tags=["Ollama"])


@OLLAMA_ROUTER.get("/models/supported", response_model=List[OllamaModelMetadata], responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
def get_supported_models(current_user: str = Depends(get_current_user)):
    """获取系统支持的所有 Ollama 模型列表

    Args:
        current_user: 当前登录用户，通过身份验证获取

    Returns:
        List[OllamaModelMetadata]: 支持的模型元数据列表
    """
    return SUPPORTED_OLLAMA_MODELS.values()


@OLLAMA_ROUTER.get("/models/available", response_model=List[OllamaModelStatus], responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def get_available_models(current_user: str = Depends(get_current_user)):
    """获取当前已拉取到本地的 Ollama 模型列表

    Args:
        current_user: 当前登录用户，通过身份验证获取

    Returns:
        List[OllamaModelStatus]: 可用模型状态列表
    """
    return await list_pulled_ollama_models()


@OLLAMA_ROUTER.get("/model/pull", response_model=OllamaModelStatus, responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def pull_model(
    model: str,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_container_db_async_session),
    current_user: str = Depends(get_current_user)
):
    """拉取指定的 Ollama 模型到本地

    Args:
        model: 要拉取的模型名称
        background_tasks: FastAPI 背景任务队列，用于异步执行拉取任务
        session: 异步数据库会话，用于存储拉取状态

    Returns:
        OllamaModelStatus: 模型拉取状态
    """
    if model not in SUPPORTED_OLLAMA_MODELS:
        raise HTTPException(
            status_code=400,
            detail=f"Model {model} is not supported",
        )

    try:
        pulled_models = await list_pulled_ollama_models()
        filtered_models = [
            pulled_model for pulled_model in pulled_models if pulled_model.name == model
        ]
        if filtered_models:
            return filtered_models[0]
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to check pulled models: {e}",
        )

    saved_pull_status = None
    saved_model_status = None
    try:
        saved_pull_status = await session.get(OllamaPullStatus, model)
        saved_model_status = saved_pull_status.status
    except Exception as e:
        pass

    # If the model is being pulled, return the model
    if saved_model_status:
        # If the model is being pulled, return the model
        # ? If the model status is pulled in database but was not found while listing pulled models,
        # ? it means the model was deleted and we need to pull it again
        if (
            saved_model_status["status"] == "error"
            or saved_model_status["status"] == "pulled"
            or saved_pull_status.last_updated < (datetime.now() - timedelta(seconds=10))
        ):
            await session.delete(saved_pull_status)
        else:
            return saved_model_status

    # If the model is not being pulled, pull the model
    background_tasks.add_task(pull_ollama_model_background_task, model)

    return OllamaModelStatus(
        name=model,
        status="pulling",
        done=False,
    )
