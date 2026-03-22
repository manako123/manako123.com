// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Ordner für Uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.static('.')); // Serviert index.html, css, uploads

// Upload Endpoint
app.post('/upload', upload.single('video'), (req, res) => {
    if(req.file){
        res.json({ success:true, filename:req.file.filename });
    } else {
        res.status(400).json({ success:false });
    }
});

// Videos Endpoint
const fs = require('fs');
app.get('/videos', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if(err) return res.status(500).json({error:'Server error'});
        res.json(files);
    });
});

app.listen(3000, () => console.log('Server läuft auf http://localhost:3000'));