"""Dashboard aggregation endpoints."""
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import Interview, User
from app.schemas import InterviewOut
from app.routes.auth import get_current_user

router = APIRouter()


@router.get("/interviews", response_model=List[InterviewOut])
def my_interviews(db: Session = Depends(get_db), current: User = Depends(get_current_user)):
    q = db.query(Interview)
    if current.role != "admin":
        q = q.filter(Interview.user_id == current.id)
    return q.order_by(Interview.created_at.desc()).all()


@router.get("/stats")
def stats(db: Session = Depends(get_db), current: User = Depends(get_current_user)):
    q = db.query(Interview)
    if current.role != "admin":
        q = q.filter(Interview.user_id == current.id)
    total = q.count()
    avg_conf = q.with_entities(func.avg(Interview.confidence_score)).scalar() or 0
    avg_comm = q.with_entities(func.avg(Interview.communication_score)).scalar() or 0
    avg_emo  = q.with_entities(func.avg(Interview.emotion_score)).scalar() or 0
    return {
        "total_interviews": total,
        "avg_confidence":   round(float(avg_conf), 2),
        "avg_communication":round(float(avg_comm), 2),
        "avg_emotion":      round(float(avg_emo), 2),
    }
