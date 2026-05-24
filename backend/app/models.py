"""SQLAlchemy ORM models."""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"
    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String(120), nullable=False)
    email         = Column(String(180), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role          = Column(String(40), default="candidate")
    created_at    = Column(DateTime, default=datetime.utcnow)

    interviews = relationship("Interview", back_populates="user", cascade="all, delete")


class Interview(Base):
    __tablename__ = "interviews"
    id                   = Column(Integer, primary_key=True, index=True)
    user_id              = Column(Integer, ForeignKey("users.id"), nullable=False)
    video_path           = Column(String(500), nullable=False)
    transcript           = Column(Text, default="")
    emotion_score        = Column(Float, default=0.0)
    communication_score  = Column(Float, default=0.0)
    confidence_score     = Column(Float, default=0.0)
    emotions             = Column(JSON, default=dict)   # {"happy": 0.4, ...}
    speech_metrics       = Column(JSON, default=dict)   # {"wpm": 130, ...}
    feedback             = Column(Text, default="")
    status               = Column(String(40), default="pending")  # pending|processing|done|failed
    created_at           = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="interviews")
