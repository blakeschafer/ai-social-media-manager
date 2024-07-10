require("dotenv").config();
const express = require('express');
const multer = require('multer');
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const { promisify } = require('util');
const cors = require('cors');
const readFileAsync = promisify(fs.readFile);

const app = express();
const port = process.env.PORT || 4000;

// Set up CORS and JSON middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: storage });

// Instagram client setup
const ig = new IgApiClient();

async function loginToInstagram() {
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: `uploads/${req.file.filename}`  // Save the path for further use
    });
});

// Endpoint to post images to Instagram
app.post('/postToInstagram', async (req, res) => {
    const { filePath, caption } = req.body;
    try {
        await loginToInstagram(); // Ensure we are logged in

        const imageBuffer = await readFileAsync(filePath); // Read the file into a Buffer
        const publishResult = await ig.publish.photo({
            file: imageBuffer,
            caption: caption
        });

        res.status(200).json({ message: 'Posted to Instagram successfully', publishResult });
    } catch (error) {
        console.error('Failed to post to Instagram:', error);
        res.status(500).json({ message: 'Failed to post to Instagram', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
