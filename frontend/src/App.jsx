import { useState, useRef } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log('Transcription Response:', data)
    } catch (error) {
      console.error('Error uploading file:', error)
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

      <button 
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? 'Transcribing...' : 'Transcribe'}
      </button>
    </div>
  )
}

export default App
