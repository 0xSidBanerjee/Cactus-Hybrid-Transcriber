import { useState, useRef } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail?.error || response.statusText)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong during transcription.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Cactus Transcriber</h1>
      <p>On-device speech-to-text with hybrid cloud fallback</p>

      <div 
        className="drop-zone" 
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".wav,.mp3,.m4a,.ogg"
          style={{ display: 'none' }}
        />
        <p>Drop audio file here</p>
        <p>or click to upload</p>
        <span className="formats">wav · mp3 · m4a · ogg</span>
      </div>

      {file && <div className="filename">{file.name}</div>}

      {error && <div className="error-message">{error}</div>}

      <button 
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? 'Transcribing...' : 'Transcribe'}
      </button>

      {result && (
        <div className="result-section">
          <div className="transcript-box">
            {result.transcript}
          </div>
          
          <div className="result-meta">
            {result.cloud_handoff ? (
              <span className="badge cloud">☁ Routed to Cactus Cloud</span>
            ) : (
              <span className="badge on-device">✓ Processed on-device</span>
            )}
            
            <div className="stats">
              {result.duration_ms}ms · {result.model_used}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
