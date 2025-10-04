import secrets
from typing import Optional
import uuid
from datetime import datetime
from sqlmodel import Column, DateTime, Field, SQLModel

from utils.datetime_utils import get_current_utc_datetime


class WebhookSubscription(SQLModel, table=True):
    __tablename__ = "webhook_subscriptions"

    id: str = Field(
        default_factory=lambda: f"webhook-{secrets.token_hex(32)}", primary_key=True
    )
    user_id: Optional[str] = Field(index=True, default=None, description="User ID associated with the webhook subscription")
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), nullable=False),
        default_factory=get_current_utc_datetime,
    )
    url: str
    secret: Optional[str] = None
    event: str = Field(index=True)
