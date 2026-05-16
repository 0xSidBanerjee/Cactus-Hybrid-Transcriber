# Cactus Hybrid Transcriber

A minimal, high-performance web application demonstrating hybrid speech-to-text transcription using the **Cactus Engine**. The application automatically routes audio processing between on-device inference and Cactus Cloud based on audio quality and complexity.

## 🚀 Overview

- **On-Device First**: Transcribes clean audio locally using optimized models (e.g., `parakeet-ctc-1.1b`).
- **Seamless Fallback**: Automatically hands off noisy or complex audio to Cactus Cloud for maximum accuracy.
- **Real-time Feedback**: Visual badges indicate exactly where your data was processed.

## 🛠 Tech Stack

### Backend
- **FastAPI**: Async Python web framework.
- **Cactus SDK**: Hybrid transcription engine.
- **Uvicorn**: High-performance ASGI server.

### Frontend
- **React + Vite**: Fast, modern frontend development.
- **Vanilla CSS**: Clean, premium design without extra weight.

## 📂 Project Structure

```text
cactus-transcriber/
├── backend/            # FastAPI source code
│   ├── main.py         # Application entry point
│   ├── requirements.txt
│   └── .env            # Environment variables (Cactus API Key)
├── frontend/           # React frontend (Coming soon)
├── audio/              # Sample audio files for testing
├── .gitignore
└── README.md
```

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.11+
- [Cactus CLI](https://cactuscompute.com) installed and configured.

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## 📈 Roadmap & Milestones

- [x] **M1: Cactus CLI Integration** — Verified local transcription engine.
- [x] **M2: Backend Skeleton** — FastAPI setup with health checks and CORS.
- [x] **M3: Transcription Endpoint** — `POST /transcribe` integration.
- [x] **M4: Frontend Scaffolding** — React + Vite setup.
- [ ] **M5: Upload Logic** — Frontend to Backend file handling.
- [ ] **M6: Result Visualization** — Transcript display and routing badges.
- [ ] **M7: E2E Testing** — End-to-end validation with hybrid routing.
- [ ] **M8: Polish** — UI refinements and error handling.

## 📄 License
Internal POC - RS Software Demo.
