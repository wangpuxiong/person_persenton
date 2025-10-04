from typing import Optional
from fastapi import APIRouter, Body, Depends, HTTPException, Path
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from enums.webhook_event import WebhookEvent
from models.sql.webhook_subscription import WebhookSubscription
from services.database import get_async_session
from api.v1.auth.router import get_current_user

API_V1_WEBHOOK_ROUTER = APIRouter(prefix="/api/v1/webhook", tags=["Webhook"])


class SubscribeToWebhookRequest(BaseModel):
    url: str = Field(description="The URL to send the webhook to")
    secret: Optional[str] = Field(None, description="The secret to use for the webhook")
    event: WebhookEvent = Field(description="The event to subscribe to")


class SubscribeToWebhookResponse(BaseModel):
    id: str


@API_V1_WEBHOOK_ROUTER.post(
    "/subscribe", 
    response_model=SubscribeToWebhookResponse, 
    status_code=201,
    responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}}
)
async def subscribe_to_webhook(
    body: SubscribeToWebhookRequest,
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: Optional[str] = Depends(get_current_user),
):
    webhook_subscription = WebhookSubscription(
        url=body.url,
        secret=body.secret,
        event=body.event,
        user_id=current_user,
    )
    sql_session.add(webhook_subscription)
    await sql_session.commit()
    return SubscribeToWebhookResponse(id=webhook_subscription.id)


@API_V1_WEBHOOK_ROUTER.delete("/unsubscribe", status_code=204, responses={401: {"description": "Unauthorized"}, 403: {"description": "Forbidden"}})
async def unsubscribe_to_webhook(
    id: str = Body(
        embed=True, description="The ID of the webhook subscription to unsubscribe from"
    ),
    sql_session: AsyncSession = Depends(get_async_session),
    current_user: Optional[str] = Depends(get_current_user),
):

    webhook_subscription = await sql_session.get(WebhookSubscription, id)
    if not webhook_subscription:
        raise HTTPException(404, "Webhook subscription not found")
    
    # 检查用户权限
    if current_user and webhook_subscription.user_id and webhook_subscription.user_id != current_user:
        raise HTTPException(403, "You don't have permission to unsubscribe this webhook")

    await sql_session.delete(webhook_subscription)
    await sql_session.commit()
