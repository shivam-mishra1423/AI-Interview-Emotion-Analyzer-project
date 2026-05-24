"""Confidence score = ML model on emotion + speech features.
Falls back to a weighted formula if model isn't trained."""
import os, joblib, numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "ml", "model.pkl")


def _formula(features: dict) -> float:
    w = {"emotion": 0.35, "smile": 0.15, "wpm_fit": 0.15,
         "filler_penalty": 0.15, "positive": 0.20}
    smile = features.get("happy_pct", 0) / 100
    wpm   = features.get("wpm", 0)
    wpm_fit = max(0, 1 - abs(wpm - 130) / 130)
    filler_penalty = max(0, 1 - features.get("filler_ratio_pct", 0) / 20)
    positive = min(1, features.get("positive_ratio_pct", 0) / 5)
    emotion = features.get("emotion_score", 50) / 100

    raw = (w["emotion"] * emotion + w["smile"] * smile +
           w["wpm_fit"] * wpm_fit + w["filler_penalty"] * filler_penalty +
           w["positive"] * positive)
    return round(raw * 100, 2)


def predict_confidence(features: dict) -> float:
    if os.path.exists(MODEL_PATH):
        try:
            model = joblib.load(MODEL_PATH)
            x = np.array([[
                features.get("emotion_score", 50),
                features.get("happy_pct", 0),
                features.get("wpm", 0),
                features.get("filler_ratio_pct", 0),
                features.get("positive_ratio_pct", 0),
            ]])
            return round(float(model.predict(x)[0]), 2)
        except Exception as e:
            print(f"[confidence] model error, falling back: {e}")
    return _formula(features)
