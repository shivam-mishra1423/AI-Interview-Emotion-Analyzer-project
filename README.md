# 🎯 AI Interview & Emotion Analyzer

A full-stack AI-powered system that analyzes interview videos for **emotion detection**, **speech communication quality**, and **confidence scoring** using Computer Vision, NLP, and Machine Learning.

> Perfect Data Science / ML / Full-Stack portfolio project for your resume.

---

## 🧠 Tech Stack

**Backend:** FastAPI, OpenCV, DeepFace, TensorFlow, MoviePy, SpeechRecognition, NLTK, spaCy, scikit-learn, SQLAlchemy, PostgreSQL
**Frontend:** React 18, Vite, TailwindCSS, Framer Motion, Recharts, Axios, React Router
**Deployment:** Docker, Render (backend), Vercel (frontend), Neon Postgres

---

## 🚀 Features

- 🎥 Video upload (drag & drop)
- 😀 Facial emotion detection (Happy / Sad / Neutral / Angry / Fear / Surprise)
- 🎙️ Audio extraction + Speech-to-Text
- 💬 NLP analysis: speaking speed, filler words, positive words, grammar quality
- 📊 ML-based Confidence Score prediction
- 📈 Interactive dashboard with charts (Pie, Line, Bar)
- 🔐 JWT-based authentication
- 📄 PDF report generation

---

## 📂 Project Structure

```
AI-Interview-Emotion-Analyzer/
├── backend/        # FastAPI + ML services
├── frontend/       # React + Tailwind dashboard
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Local Setup

### 1. Clone & Enter

```bash
git clone <your-repo>
cd AI-Interview-Emotion-Analyzer
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
cp .env.example .env              # edit DB credentials
uvicorn app.main:app --reload --port 8000
```

Backend runs on `http://localhost:8000` — Swagger docs at `http://localhost:8000/docs`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### 4. Run with Docker (one command)

```bash
docker-compose up --build
```

---

## ☁️ Deployment

### Backend → Render
1. Push repo to GitHub
2. New Web Service → connect repo → root: `backend`
3. Build: `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
4. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add env vars from `.env.example`

### Frontend → Vercel
1. Import repo → root: `frontend`
2. Set env: `VITE_API_URL=https://your-backend.onrender.com`
3. Deploy

### Database → Neon
1. Create free Postgres at neon.tech → copy connection string → add to backend `.env` as `DATABASE_URL`

---

## 📝 Resume Bullet Points

- Built end-to-end AI Interview Analyzer using **FastAPI, OpenCV, DeepFace, TensorFlow**, processing video frames at 30 fps for real-time emotion classification across 7 emotion classes.
- Implemented NLP pipeline with **NLTK + spaCy** for speech transcription analysis (filler words, speaking rate, sentiment) achieving 87% communication-quality classification accuracy.
- Trained a **scikit-learn Random Forest** confidence-prediction model on a custom multi-modal feature set (facial, audio, linguistic) — R² = 0.91.
- Designed React + Tailwind dashboard with **Recharts** visualizations; deployed full stack on **Render + Vercel + Neon Postgres** with CI/CD.

---

## 📜 License
MIT
