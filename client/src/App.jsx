// File: client/src/App.jsx
import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import TranscriptSection from './components/TranscriptSection';
import SummarySection from './components/SummarySection';
import ErrorMessage from './components/ErrorMessage';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setTranscript('');
    setSummary('');
    setError('');
    setAudioURL(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const res = await axios.post('http://localhost:3001/upload', formData);
      setTranscript(res.data.transcript);
      setSummary(res.data.summary);
    } catch (err) {
      setError('Something went wrong while processing the file.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="container">
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <h1>🎙️ Podcast Digest Generator</h1>
      <p className="subtitle">Upload a podcast or voice memo and get a bullet-point summary.</p>

      <UploadForm file={file} setFile={setFile} loading={loading} onUpload={handleUpload} />
      {error && <ErrorMessage message={error} />}
      {transcript && <TranscriptSection transcript={transcript} audioURL={audioURL} />}
      {summary && <SummarySection summary={summary} />}
    </div>
  );
}

export default App;
