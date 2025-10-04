from fastapi import HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response, JSONResponse
from api.v1.auth.router import get_current_user

# 不需要认证的路径列表
PUBLIC_PATHS = [
    "/auth",
    "/docs",
    "/redoc",
    "/openapi.json",
    "/static",
    "/api/v1/mock",  # 假设模拟端点是公开的
]

# 需要认证但允许匿名访问的路径列表
AUTH_OPTIONAL_PATHS = [
    # 可以添加需要认证但允许匿名访问的路径
]

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        
        # 检查是否为公开路径
        if any(path.startswith(public_path) for public_path in PUBLIC_PATHS):
            return await call_next(request)
        
        # 获取当前用户
        current_user = get_current_user(request)
        
        # 检查是否为可选认证路径
        if any(path.startswith(auth_optional_path) for auth_optional_path in AUTH_OPTIONAL_PATHS):
            # 即使未登录也继续处理请求
            return await call_next(request)
        
        # 对于其他路径，要求用户必须登录
        if not current_user:
            # 所有请求，返回401错误
            return JSONResponse(
                status_code=401,
                content={"detail": "Authentication required"}
            )
        
        # 用户已登录，继续处理请求
        return await call_next(request)