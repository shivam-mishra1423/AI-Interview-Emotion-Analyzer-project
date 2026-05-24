# 🎯 AI Interview & Emotion Analyzer

An advanced AI-powered Full Stack Web Application that analyzes interview videos using **Computer Vision, NLP, Deep Learning, and Machine Learning** to evaluate:

- Facial Emotions
- Confidence Level
- Communication Skills
- Speech Quality
- Interview Performance

This project is built for real-world interview analysis and is a strong portfolio project for Data Science, AI/ML, and Full Stack Development roles.

---

# 🌐 Live Project Links

## 🚀 Frontend Live Demo
[Open Frontend Project](https://ai-interview-emotion-a-git-288cb4-shivam-kumar-mishras-projects.vercel.app/)

---

## ⚡ Backend API
[Open Backend Server](https://ai-interview-emotion-analyzer-project.onrender.com/)

---

## 📄 Swagger API Documentation
[Open Swagger Docs](https://ai-interview-emotion-analyzer-project.onrender.com/docs)

---

## 💻 GitHub Repository
[Open GitHub Repository](https://github.com/shivam-mishra1423/AI-Interview-Emotion-Analyzer-project/tree/main)
# 🧠 Project Overview

The system allows users to upload interview videos and automatically performs:

- Facial Emotion Detection
- Audio Extraction
- Speech-to-Text Conversion
- NLP-based Communication Analysis
- Confidence Score Prediction
- PDF Report Generation
- Dashboard Analytics Visualization

The complete application is deployed online using modern cloud technologies.

---

# 🚀 Main Features

## 🎥 Video Upload System
- Upload interview videos
- Drag & Drop functionality
- Secure file handling
- Real-time upload progress tracking

---

## 😀 Facial Emotion Detection
The AI model analyzes facial expressions frame-by-frame using Deep Learning.

### Detected Emotions:
- Happy
- Sad
- Angry
- Fear
- Neutral
- Surprise
- Disgust

### Technologies Used:
- OpenCV
- DeepFace
- TensorFlow

---

## 🎙️ Audio & Speech Analysis

The system extracts audio from the uploaded interview video and converts speech into text.

### Features:
- Speech-to-Text
- Communication Analysis
- Speaking Speed Detection
- Filler Word Detection
- Positive Word Analysis

### Technologies Used:
- MoviePy
- SpeechRecognition
- NLP

---

## 💬 NLP Communication Analysis

Natural Language Processing is used to analyze communication quality.

### Analysis Includes:
- Confidence in speaking
- Filler words
- Speaking rate
- Positive vocabulary
- Grammar quality
- Sentence structure

### Libraries Used:
- NLTK
- spaCy
- scikit-learn

---

## 📊 AI Confidence Score Prediction

Machine Learning models predict overall confidence score using:
- Facial emotions
- Speech quality
- Communication metrics
- Audio analysis

### ML Algorithms:
- Random Forest
- Feature Engineering
- Data Scaling

---

## 📈 Dashboard Analytics

Interactive dashboard with:
- Emotion charts
- Confidence graphs
- Performance analytics
- Historical interview analysis

### Frontend Visualization:
- Pie Charts
- Line Charts
- Bar Graphs

### Libraries:
- Recharts
- Framer Motion

---

## 🔐 Authentication System

Secure authentication using JWT tokens.

### Features:
- User Registration
- Login System
- Protected Routes
- Token Authentication

---

## 📄 PDF Report Generation

Automatically generates downloadable interview analysis reports.

Includes:
- Confidence Score
- Emotion Distribution
- Speech Analysis
- Communication Feedback

---

# 🛠️ Tech Stack

# Backend Technologies
- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- OpenCV
- TensorFlow
- DeepFace
- NLP

---

# Frontend Technologies
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts
- Framer Motion

---

# AI / ML Technologies
- TensorFlow
- scikit-learn
- NLP
- Deep Learning
- Computer Vision
- Emotion Recognition

---

# ☁️ Deployment Technologies

## Frontend Deployment
- Vercel

## Backend Deployment
- Render

## Database
- PostgreSQL / Neon DB

---

# 📂 Project Structure

```bash
AI-Interview-Emotion-Analyzer-project/
│
├── backend/
│   ├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── package.json
│
├── docker-compose.yml
└── README.md
⚙️ Local Installation Setup
1️⃣ Clone Repository
git clone https://github.com/shivam-mishra1423/AI-Interview-Emotion-Analyzer-project.git
cd AI-Interview-Emotion-Analyzer-project
2️⃣ Backend Setup
cd backend
Create Virtual Environment
Windows
python -m venv venv
venv\Scripts\activate
Linux / Mac
python -m venv venv
source venv/bin/activate
Install Requirements
pip install -r requirements.txt
Download NLP Model
python -m spacy download en_core_web_sm
Run Backend
uvicorn app.main:app --reload --port 8000

Backend Running:

http://localhost:8000

Swagger Docs:

http://localhost:8000/docs
3️⃣ Frontend Setup
cd frontend

Install Packages:

npm install

Run Frontend:

npm run dev

Frontend Running:

http://localhost:5173
🐳 Docker Setup

Run Full Project:

docker-compose up --build
🔥 API Endpoints
Authentication APIs
Method	Endpoint
POST	/api/auth/register
POST	/api/auth/login
GET	/api/auth/me
Upload APIs
Method	Endpoint
POST	/api/upload/video
Analysis APIs
Method	Endpoint
GET	/api/analysis/{interview_id}
GET	/api/analysis/{interview_id}/report
Dashboard APIs
Method	Endpoint
GET	/api/dashboard/interviews
GET	/api/dashboard/stats
📸 Application Workflow
User Uploads Video
        ↓
Video Processing
        ↓
Frame Extraction
        ↓
Emotion Detection
        ↓
Audio Extraction
        ↓
Speech-to-Text
        ↓
NLP Analysis
        ↓
Confidence Score Prediction
        ↓
Dashboard Visualization
        ↓
PDF Report Generation
