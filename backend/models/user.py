from typing import Optional, List
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class User(Document):
    email: EmailStr = Field(unique=True)
    password_hash: str
    phone: Optional[str] = None
    role: str = "user"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"

class ConversionLog(Document):
    user_id: Optional[PydanticObjectId] = None
    tool_id: str
    original_filename: str
    result_filename: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "success"

    class Settings:
        name = "conversion_logs"
