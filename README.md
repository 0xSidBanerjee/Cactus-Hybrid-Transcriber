# 🌵 Cactus Hybrid Transcriber (POC)

A high-performance, hybrid speech-to-text proof-of-concept that seamlessly blends on-device inference with cloud fallback. Built with **FastAPI** and **React + Vite**, utilizing the **Cactus ASR Engine** for privacy-first, low-latency transcription.

---

## 🚀 Overview

Cactus Hybrid Transcriber is designed to demonstrate a "Local-First" approach to speech recognition. It prioritizes on-device processing to ensure data privacy and zero latency, while providing an architectural path for cloud handoff when high-accuracy or complex audio processing is required.

### Key Features
- **On-Device Inference**: Utilizes the local Cactus engine for immediate transcription.
- **Hybrid Routing**: Intelligent logic (POC) to distinguish between local and cloud-processed results.
- **Modern Tech Stack**: FastAPI backend for speed, React frontend for a premium user experience.
- **Privacy Centric**: Audio stays local unless cloud handoff is explicitly configured.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS (Glassmorphism inspired)
- **Backend**: FastAPI (Python 3.9+), Uvicorn
- **Engine**: [Cactus ASR](https://www.cactuscompute.com/)
- **Interconnect**: RESTful API with multipart/form-data support

## 📥 Installation

### Prerequisites
- Python 3.9+
- Node.js 18+
- [Cactus CLI](https://www.cactuscompute.com/docs/install) installed and available in your system path.

### 1. Clone the repository
```bash
git clone https://github.com/0xSidBanerjee/Cactus-Hybrid-Transcriber.git
cd Cactus-Hybrid-Transcriber
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🧪 Usage & Testing

1. Open the web interface.
2. Drag and drop or click to upload an audio file (`.wav`, `.mp3`, `.m4a`, `.ogg`).
3. Click **Transcribe**.
4. View the result, processing latency, and the routing badge (On-device vs. Cloud).

> [!NOTE]
> This is a **Proof of Concept**. Cloud fallback requires a valid `CACTUS_CLOUD_KEY` to be configured in your environment. Without a key, all processing remains strictly local.

## 📄 License

This project is licensed under the **MIT License**. 

---

Built with ☕️ for high-performance audio processing.
