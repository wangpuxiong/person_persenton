from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse
from typing import Optional, Callable, Union
import traceback
from models.api_error_model import APIErrorModel

# 认证相关的错误处理函数
def handle_authentication_error(request: Request, exc: HTTPException) -> JSONResponse:
    """
    处理认证相关的错误
    """
    # 使用APIErrorModel的from_exception方法构建错误响应
    error_response = APIErrorModel.from_exception(
        exc, 
        path=request.url.path,
        method=request.method
    )
    
    # 返回JSON响应
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response.model_dump()
    )

def handle_permission_error(request: Request, exc: HTTPException) -> JSONResponse:
    """
    处理权限相关的错误
    """
    error_response = APIErrorModel.from_exception(
        exc, 
        path=request.url.path,
        method=request.method
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response.model_dump()
    )

def handle_general_error(request: Request, exc: Exception) -> JSONResponse:
    """
    处理一般的未捕获异常
    """
    # 记录完整的错误堆栈
    print("未捕获的异常:")
    print(traceback.format_exc())
    
    error_response = APIErrorModel.from_exception(
        exc, 
        path=request.url.path,
        method=request.method
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_response.model_dump()
    )

# 注册全局异常处理器
def register_exception_handlers(app):
    """
    注册全局异常处理器
    """
    # 认证错误处理
    @app.exception_handler(401)
    async def authentication_exception_handler(request: Request, exc: HTTPException):
        if hasattr(exc, 'detail') and ("Not authenticated" in str(exc.detail) or "Unauthorized" in str(exc.detail)):
            return handle_authentication_error(request, exc)
        return handle_general_error(request, exc)
    
    # 权限错误处理
    @app.exception_handler(403)
    async def permission_exception_handler(request: Request, exc: HTTPException):
        if hasattr(exc, 'detail') and "permission" in str(exc.detail).lower():
            return handle_permission_error(request, exc)
        return handle_general_error(request, exc)
    
    # 全局异常处理
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return handle_general_error(request, exc)