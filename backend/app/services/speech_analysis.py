"""Speech-to-text + NLP analysis: speed, fillers, positives, communication score."""
import re
from typing import Dict, Tuple

import speech_recognition as sr

FILLER_WORDS = {
    "um", "uh", "uhh", "umm", "like", "you know", "so", "actually", "basically",
    "literally", "i mean", "kind of", "sort of", "right", "okay",
}
POSITIVE_WORDS = {
    "great", "excellent", "love", "happy", "confident", "achieved", "success",
    "successful", "improved", "led", "delivered", "built", "launched", "good",
    "amazing", "passionate", "motivated", "proud", "innovative",
}


def transcribe(audio_path: str) -> str:
    if not audio_path:
        return ""
    r = sr.Recognizer()
    try:
        with sr.AudioFile(audio_path) as src:
            audio = r.record(src)
        return r.recognize_google(audio)
    except Exception as e:
        print(f"[speech_analysis] transcribe: {e}")
        return ""


def analyze_speech(text: str, audio_duration_sec: float = 60.0
                   ) -> Tuple[Dict, float]:
    """Returns: ({metrics}, communication_score 0-100)"""
    text_l = text.lower().strip()
    words  = re.findall(r"\b\w+\b", text_l)
    n_words = len(words)

    filler_count = sum(text_l.count(f) for f in FILLER_WORDS)
    positive_count = sum(1 for w in words if w in POSITIVE_WORDS)

    wpm = round((n_words / audio_duration_sec) * 60, 1) if audio_duration_sec > 0 else 0
    filler_ratio   = round(filler_count   / max(n_words, 1) * 100, 2)
    positive_ratio = round(positive_count / max(n_words, 1) * 100, 2)

    # Communication score heuristic
    pace_score   = 100 - min(abs(wpm - 130), 60) / 60 * 100   # ideal ≈ 130 wpm
    filler_score = max(0, 100 - filler_ratio * 10)
    pos_score    = min(100, positive_ratio * 20 + 50)
    comm_score   = round(pace_score * 0.4 + filler_score * 0.4 + pos_score * 0.2, 2)

    metrics = {
        "word_count":       n_words,
        "wpm":              wpm,
        "filler_count":     filler_count,
        "filler_ratio_pct": filler_ratio,
        "positive_count":   positive_count,
        "positive_ratio_pct": positive_ratio,
        "duration_sec":     round(audio_duration_sec, 1),
    }
    return metrics, max(0, min(100, comm_score))
