"""Train a confidence-prediction Random Forest on synthetic/labeled data.

Run:
    python -m app.ml.train_model
"""
import os, joblib, numpy as np, pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

OUT = os.path.join(os.path.dirname(__file__), "model.pkl")


def synthetic_dataset(n=2000, seed=42):
    rng = np.random.default_rng(seed)
    emotion_score      = rng.uniform(20, 100, n)
    happy_pct          = rng.uniform(0, 80, n)
    wpm                = rng.uniform(60, 200, n)
    filler_ratio_pct   = rng.uniform(0, 20, n)
    positive_ratio_pct = rng.uniform(0, 10, n)

    # Ground-truth confidence (synthetic but realistic)
    wpm_fit = np.clip(1 - np.abs(wpm - 130) / 130, 0, 1)
    confidence = (
        0.35 * (emotion_score / 100)
      + 0.15 * (happy_pct / 100)
      + 0.15 * wpm_fit
      + 0.15 * np.clip(1 - filler_ratio_pct / 20, 0, 1)
      + 0.20 * np.clip(positive_ratio_pct / 5, 0, 1)
    ) * 100 + rng.normal(0, 3, n)
    confidence = np.clip(confidence, 0, 100)

    return pd.DataFrame({
        "emotion_score": emotion_score,
        "happy_pct": happy_pct,
        "wpm": wpm,
        "filler_ratio_pct": filler_ratio_pct,
        "positive_ratio_pct": positive_ratio_pct,
        "confidence": confidence,
    })


def main():
    df = synthetic_dataset()
    X = df.drop(columns=["confidence"]).values
    y = df["confidence"].values

    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=200, random_state=42)
    model.fit(X_tr, y_tr)
    print(f"R² on test: {r2_score(y_te, model.predict(X_te)):.3f}")

    joblib.dump(model, OUT)
    print(f"Saved → {OUT}")


if __name__ == "__main__":
    main()
