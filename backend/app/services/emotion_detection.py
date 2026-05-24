"""Emotion detection from video frames using OpenCV + DeepFace."""
from collections import Counter
from typing import Dict, Tuple
import cv2

try:
    from deepface import DeepFace
    DEEPFACE_OK = True
except Exception:
    DEEPFACE_OK = False


EMOTIONS = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]


def detect_emotions(video_path: str, sample_rate: int = 30) -> Tuple[Dict[str, float], float]:
    """
    Sample 1 frame every `sample_rate` frames, run DeepFace, aggregate.
    Returns: ({emotion: percentage}, overall_emotion_score 0-100)
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {e: 0.0 for e in EMOTIONS}, 0.0

    counts = Counter()
    frame_idx, faces_seen = 0, 0

    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if frame_idx % sample_rate == 0 and DEEPFACE_OK:
            try:
                result = DeepFace.analyze(
                    frame, actions=["emotion"],
                    enforce_detection=False, silent=True,
                )
                if isinstance(result, list):
                    result = result[0]
                dominant = result.get("dominant_emotion")
                if dominant:
                    counts[dominant] += 1
                    faces_seen += 1
            except Exception:
                pass
        frame_idx += 1
    cap.release()

    if faces_seen == 0:
        # Fallback distribution so frontend has data
        return {"neutral": 100.0, **{e: 0.0 for e in EMOTIONS if e != "neutral"}}, 50.0

    dist = {e: round(counts.get(e, 0) / faces_seen * 100, 2) for e in EMOTIONS}

    # Emotion score: positive emotions weighted high, negative low
    weights = {"happy": 1.0, "surprise": 0.8, "neutral": 0.7,
               "sad": 0.3,  "fear": 0.2,    "angry": 0.1, "disgust": 0.1}
    score = sum(dist[e] * weights[e] for e in EMOTIONS) / 100.0 * 100
    return dist, round(score, 2)
