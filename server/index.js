const express = require('express');
const multer = require('multer');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Upload folder config
const upload = multer({ dest: 'uploads/' });

// Handle audio upload and process
app.post('/upload', upload.single('audio'), (req, res) => {
  const audioPath = path.join(__dirname, req.file.path);
  const transcriptPath = path.join(__dirname, 'transcript.txt');

  // Step 1: Transcribe using Python
  execFile('python', ['../ai-processing/transcribe.py', audioPath], (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).json({ error: 'Transcription failed' });
    }

    const transcript = stdout.split('--- TRANSCRIPTION ---')[1]?.trim() || '';
    fs.writeFileSync(transcriptPath, transcript);

    // Step 2: Summarize
    execFile('python', ['../ai-processing/summarize.py', transcriptPath], (err2, stdout2, stderr2) => {
      if (err2) {
        console.error(stderr2);
        return res.status(500).json({ error: 'Summarization failed' });
      }

      const summary = stdout2.split('--- SUMMARY ---')[1]?.trim() || 'No summary found';
      res.json({ transcript, summary });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
