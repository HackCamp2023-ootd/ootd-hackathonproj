const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors'); // Require CORS
const fs = require('fs-extra');
require('dotenv').config({ path: './backend/credentials.env' });



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
        // const file = req.file;
        // if (!file) {
        //     return res.status(400).send('No file uploaded.');
        // }

        // // Read the file and convert it to base64
        // const fileBuffer = await fs.readFile(file.path);
        // const imageData = fileBuffer.toString('base64');

        // // Call the Google Vision API
        // const visionResult = await analyzeImageWithGoogleVision(imageData);
        // // ... Call other helper functions as before ...

        // res.json({ 
        //     success: true, 
        //     visionResult, 
        //     // ... Other response data ...
        // });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing file');
    }
});

app.post('/startPipeline', (req, res) => {
    makeApiCall();
    res.send('API call initiated');
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
