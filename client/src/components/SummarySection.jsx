// File: client/src/components/SummarySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiDownload } from 'react-icons/fi';

function SummarySection({ summary }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  const downloadAsText = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
  };

  return (
    <motion.div className="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>📌 Summary</h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={copyToClipboard} title="Copy to clipboard">
          <FiCopy /> Copy
        </button>
        <button onClick={downloadAsText} title="Download .txt">
          <FiDownload /> Download
        </button>
      </div>

      <pre>{summary}</pre>
    </motion.div>
  );
}

export default SummarySection;
