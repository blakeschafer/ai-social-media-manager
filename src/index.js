const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Middleware to serve static files
app.use(express.static('public')); // Assuming you keep your HTML file in a directory named 'public'

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // Adjust the path as necessary
});

// Route for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('File uploaded successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
