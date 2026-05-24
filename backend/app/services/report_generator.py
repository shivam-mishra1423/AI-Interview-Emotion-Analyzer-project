"""Orchestrates full analysis pipeline + PDF report generation."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm

from app.database import SessionLocal
from app.models import Interview
from app.services.emotion_detection import detect_emotions
from app.services.audio_extractor import extract_audio
from app.services.speech_analysis import transcribe, analyze_speech
from app.services.confidence_score import predict_confidence
from app.utils.video_utils import get_video_duration


def build_feedback(emo_score, comm_score, conf_score, metrics) -> str:
    tips = []
    if comm_score < 60:
        tips.append("Reduce filler words and aim for a steady ~130 wpm pace.")
    if metrics.get("filler_ratio_pct", 0) > 5:
        tips.append("Practice pausing instead of using fillers like 'um', 'uh', 'like'.")
    if emo_score < 50:
        tips.append("Project more positive energy — smile naturally and maintain eye contact.")
    if conf_score < 65:
        tips.append("Use the STAR method to structure confident, specific answers.")
    if not tips:
        tips.append("Great delivery! Keep recording mock interviews to maintain consistency.")
    return " ".join(tips)


def run_full_analysis(interview_id: int) -> None:
    db = SessionLocal()
    try:
        iv = db.query(Interview).filter(Interview.id == interview_id).first()
        if not iv:
            return
        iv.status = "processing"; db.commit()

        # 1) Emotions
        emotions, emo_score = detect_emotions(iv.video_path)

        # 2) Audio + transcript
        audio_path = extract_audio(iv.video_path)
        duration   = get_video_duration(iv.video_path) or 60.0
        transcript = transcribe(audio_path)

        # 3) Speech metrics
        speech_metrics, comm_score = analyze_speech(transcript, duration)

        # 4) Confidence
        features = {
            "emotion_score":       emo_score,
            "happy_pct":           emotions.get("happy", 0),
            "wpm":                 speech_metrics.get("wpm", 0),
            "filler_ratio_pct":    speech_metrics.get("filler_ratio_pct", 0),
            "positive_ratio_pct":  speech_metrics.get("positive_ratio_pct", 0),
        }
        conf_score = predict_confidence(features)

        # 5) Persist
        iv.emotions            = emotions
        iv.emotion_score       = emo_score
        iv.transcript          = transcript
        iv.speech_metrics      = speech_metrics
        iv.communication_score = comm_score
        iv.confidence_score    = conf_score
        iv.feedback            = build_feedback(emo_score, comm_score, conf_score, speech_metrics)
        iv.status              = "done"
        db.commit()
    except Exception as e:
        print(f"[analysis] failed: {e}")
        iv = db.query(Interview).filter(Interview.id == interview_id).first()
        if iv:
            iv.status = "failed"
            iv.feedback = f"Analysis failed: {e}"
            db.commit()
    finally:
        db.close()


def generate_pdf_report(iv: Interview) -> str:
    out_dir = os.path.dirname(iv.video_path)
    pdf_path = os.path.join(out_dir, f"interview_{iv.id}_report.pdf")
    c = canvas.Canvas(pdf_path, pagesize=A4)
    w, h = A4

    c.setFont("Helvetica-Bold", 20)
    c.drawString(2 * cm, h - 2 * cm, "AI Interview Analysis Report")

    c.setFont("Helvetica", 11)
    y = h - 3.5 * cm
    lines = [
        f"Interview ID: {iv.id}",
        f"Date: {iv.created_at.strftime('%Y-%m-%d %H:%M')}",
        f"Status: {iv.status}",
        "",
        f"Confidence Score:    {iv.confidence_score} / 100",
        f"Communication Score: {iv.communication_score} / 100",
        f"Emotion Score:       {iv.emotion_score} / 100",
        "",
        "Speech Metrics:",
    ]
    for k, v in (iv.speech_metrics or {}).items():
        lines.append(f"  • {k}: {v}")
    lines += ["", "Emotion Distribution:"]
    for k, v in (iv.emotions or {}).items():
        lines.append(f"  • {k}: {v}%")
    lines += ["", "Feedback:", iv.feedback or "—"]

    for line in lines:
        c.drawString(2 * cm, y, str(line)[:110])
        y -= 0.6 * cm
        if y < 2 * cm:
            c.showPage(); y = h - 2 * cm; c.setFont("Helvetica", 11)

    c.save()
    return pdf_path
