"""Video upload + trigger analysis."""
import os, shutil, uuid
from fastapi import APIRouter, UploadFile, File, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Interview, User
from app.schemas import InterviewOut
from app.routes.auth import get_current_user
from app.services.report_generator import run_full_analysis

router = APIRouter()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./app/uploads")
ALLOWED_EXT = {".mp4", ".mov", ".avi", ".mkv", ".webm"}


@router.post("/video", response_model=InterviewOut)
async def upload_video(
    background: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current: User = Depends(get_current_user),
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(400, f"Unsupported file type. Allowed: {ALLOWED_EXT}")

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    fname = f"{uuid.uuid4().hex}{ext}"
    fpath = os.path.join(UPLOAD_DIR, fname)
    with open(fpath, "wb") as buf:
        shutil.copyfileobj(file.file, buf)

    interview = Interview(user_id=current.id, video_path=fpath, status="processing")
    db.add(interview); db.commit(); db.refresh(interview)

    # Run heavy analysis in background
    background.add_task(run_full_analysis, interview.id)

    return interview
