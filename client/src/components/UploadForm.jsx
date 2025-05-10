import React from 'react';

function UploadForm({ file, setFile, loading, onUpload }) {
  return (
    <div className="upload-box">
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={onUpload} disabled={loading || !file}>
        {loading ? 'Processing...' : 'Upload & Summarize'}
      </button>
    </div>
  );
}

export default UploadForm;
