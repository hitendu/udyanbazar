const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Save uploaded image
app.post('/upload', (req, res) => {
  const { image, name } = req.body;
  const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');
  const fileName = name || `photo_${Date.now()}.jpg`;

  fs.writeFile(fileName, base64Data, 'base64', err => {
    if (err) {
      console.error("Image save failed:", err);
      res.status(500).send("Failed to save image");
    } else {
      console.log("Image saved:", fileName);
      res.send("Image saved");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});