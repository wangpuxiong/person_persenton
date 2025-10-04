import uuid
from fastapi import APIRouter, Depends
from models.api_error_model import APIErrorModel
from models.presentation_and_path import PresentationPathAndEditPath
from typing import List
from api.v1.auth.router import get_current_user

API_V1_MOCK_ROUTER = APIRouter(prefix="/api/v1/mock", tags=["Mock"])


@API_V1_MOCK_ROUTER.get(
    "/presentation-generation-completed",
    response_model=List[PresentationPathAndEditPath],
    responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}}
)
async def mock_presentation_generation_completed(current_user: str = Depends(get_current_user)):
    return [
        PresentationPathAndEditPath(
            presentation_id=uuid.uuid4(),
            path="/app_data/exports/test.pdf",
            edit_path="/presentation?id=123",
        )
    ]


@API_V1_MOCK_ROUTER.get(
    "/presentation-generation-failed",
    response_model=List[APIErrorModel],
    responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}}
)
async def mock_presentation_generation_failed(current_user: str = Depends(get_current_user)):
    return [
        APIErrorModel(
            status_code=500,
            detail="Presentation generation failed",
        )
    ]
