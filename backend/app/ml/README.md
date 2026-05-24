# ML Module

Train the confidence regression model:

```bash
cd backend
python -m app.ml.train_model
```

This produces `model.pkl` used by `services/confidence_score.py`. If `model.pkl` is missing, the service falls back to a weighted formula.

`dataset/` is where you place real labeled interview data (CSV with columns: `emotion_score, happy_pct, wpm, filler_ratio_pct, positive_ratio_pct, confidence`).
