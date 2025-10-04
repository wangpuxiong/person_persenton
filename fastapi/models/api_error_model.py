from fastapi import HTTPException
from pydantic import BaseModel


class APIErrorModel(BaseModel):
    status_code: int
    error_type: str
    message: str
    path: str
    method: str

    @classmethod
    def from_exception(cls, e: Exception, path: str, method: str) -> "APIErrorModel":
        if isinstance(e, HTTPException):
            error_type = "AuthenticationError" if e.status_code == 401 else "PermissionError" if e.status_code == 403 else "HTTPException"
            return APIErrorModel(
                status_code=e.status_code,
                error_type=error_type,
                message=e.detail,
                path=path,
                method=method
            )
        return APIErrorModel(
            status_code=500,
            error_type="InternalServerError",
            message=str(e),
            path=path,
            method=method
        )
