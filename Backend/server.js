const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors'); // Require CORS
const fs = require('fs-extra');
require('dotenv').config({ path: './backend/credentials.env' });


// Importing mock helper functions

dotenv.config();
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());
const port = 3001;

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
    
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