const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors'); // Require CORS

// Importing mock helper functions
const analyzeImageWithGoogleVision = require('./googleVisionHelper');
const uploadToS3 = require('./s3Helper');
const saveMetadataToMongoDB = require('./mongoDBHelper');

dotenv.config();
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());
const port = 3001;

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // Call mock helper functions
        const visionResult = await analyzeImageWithGoogleVision(file.path);
        const s3Url = await uploadToS3(file);
        const mongoDBResponse = await saveMetadataToMongoDB({ description: visionResult, imageUrl: s3Url });

        res.json({ 
            success: true, 
            message: 'File processed successfully', 
            visionResult, 
            s3Url, 
            mongoDBResponse 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing file');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
