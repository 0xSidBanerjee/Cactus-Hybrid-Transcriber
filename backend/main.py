from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import tempfile
import os
import re
import shutil

app = FastAPI(title="Cactus Transcriber API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend runs on localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {"wav", "mp3", "m4a", "ogg"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    # 1. Validate file extension
    file_ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Unsupported file format",
                "detail": f"Only {', '.join(ALLOWED_EXTENSIONS)} are accepted."
            }
        )

    # 2. Write to temp file
    # We use a suffix to help Cactus (and potentially ffprobe/ffmpeg) identify the format
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_ext}") as tmp:
        try:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name
        finally:
            tmp.close()

    try:
        # 3. Call the CLI
        # Use subprocess.run to capture output
        # We use 'echo "" |' to skip the cloud key prompt if it appears
        process = subprocess.run(
            f"echo \"\" | cactus transcribe --file {tmp_path}",
            shell=True,
            capture_output=True,
            text=True
        )

        if process.returncode != 0:
            raise HTTPException(
                status_code=500,
                detail=f"Cactus CLI error: {process.stderr}"
            )

        stdout = process.stdout
        
        # 4. Parse the output
        # We look for everything between "Transcribing: <filename>" and the first metadata block "["
        # This handles transcripts on the same line OR the next lines, but stops at metadata.
        transcript_match = re.search(r"Transcribing:.*?\s{2,}(.*?)(?=\s*\[)", stdout, re.DOTALL)
        if not transcript_match:
            # Try matching across newlines if not on the same line
            transcript_match = re.search(r"Transcribing:[^\n]*\n\s*(.*?)(?=\s*\[)", stdout, re.DOTALL)
        
        transcript = transcript_match.group(1).strip() if transcript_match else ""

        # Cloud Handoff
        handoff_match = re.search(r"\[cloud_handoff: (true|false)\]", stdout, re.IGNORECASE)
        cloud_handoff = handoff_match.group(1).lower() == "true" if handoff_match else False

        # Duration
        # Using a more flexible regex that doesn't expect the closing bracket immediately
        duration_match = re.search(r"\[processed in: ([\d\.]+)s", stdout)
        duration_ms = int(float(duration_match.group(1)) * 1000) if duration_match else 0

        return {
            "transcript": transcript,
            "cloud_handoff": cloud_handoff,
            "duration_ms": duration_ms,
            "model_used": "parakeet-tdt-0.6b-v3"
        }

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # 5. Clean up temp file
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
