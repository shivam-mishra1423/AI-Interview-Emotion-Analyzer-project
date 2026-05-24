"""Get analysis results."""
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Interview, User
from app.schemas import InterviewOut
from app.routes.auth import get_current_user
from app.services.report_generator import generate_pdf_report

router = APIRouter()


@router.get("/{interview_id}", response_model=InterviewOut)
def get_analysis(interview_id: int, db: Session = Depends(get_db),
                 current: User = Depends(get_current_user)):
    iv = db.query(Interview).filter(Interview.id == interview_id).first()
    if not iv:
        raise HTTPException(404, "Interview not found")
    if iv.user_id != current.id and current.role != "admin":
        raise HTTPException(403, "Not authorized")
    return iv


@router.get("/{interview_id}/report")
def download_report(interview_id: int, db: Session = Depends(get_db),
                    current: User = Depends(get_current_user)):
    iv = db.query(Interview).filter(Interview.id == interview_id).first()
    if not iv:
        raise HTTPException(404, "Interview not found")
    if iv.user_id != current.id and current.role != "admin":
        raise HTTPException(403, "Not authorized")
    path = generate_pdf_report(iv)
    return FileResponse(path, filename=f"interview_{interview_id}_report.pdf",
                        media_type="application/pdf")
