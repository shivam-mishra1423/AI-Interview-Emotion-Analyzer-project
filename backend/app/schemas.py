"""Pydantic schemas."""
from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, EmailStr


# ---------- Auth ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "candidate"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ---------- Interview ----------
class InterviewOut(BaseModel):
    id: int
    user_id: int
    video_path: str
    transcript: Optional[str] = ""
    emotion_score: float
    communication_score: float
    confidence_score: float
    emotions: Optional[Dict[str, Any]] = {}
    speech_metrics: Optional[Dict[str, Any]] = {}
    feedback: Optional[str] = ""
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
