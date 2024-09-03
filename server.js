// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5000; // You can use any port number that's not in use

// Middleware to handle file download
app.get('/download/:owner/:filename', (req, res) => {
  const { owner, filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', owner, filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`File server running at http://localhost:${port}`);
});
