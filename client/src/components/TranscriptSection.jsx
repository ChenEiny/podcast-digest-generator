// File: client/src/components/TranscriptSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiDownload } from 'react-icons/fi';

function TranscriptSection({ transcript, audioURL }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
  };

  const downloadAsText = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
  };

  return (
    <motion.div className="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>📝 Transcript</h2>

      {audioURL && (
        <audio controls src={audioURL} style={{ width: '100%', marginBottom: '1rem' }} />
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={copyToClipboard} title="Copy to clipboard">
          <FiCopy /> Copy
        </button>
        <button onClick={downloadAsText} title="Download .txt">
          <FiDownload /> Download
        </button>
      </div>

      <pre>{transcript}</pre>
    </motion.div>
  );
}

export default TranscriptSection;
