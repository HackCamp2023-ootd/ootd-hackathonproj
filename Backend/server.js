const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors'); // Require CORS
const fs = require('fs-extra');
require('dotenv').config({ path: './backend/credentials.env' });
const axios = require('axios');


// Importing mock helper functions

dotenv.config();
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(express.static('../Frontend'));

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

// agenthub cconfig
const url = "https://api-v2.agenthub.dev/remote_start_pipeline";

const headers = {
  "Content-Type": "application/json",
  "x-auth-key": "unsioVbanndVmuFPEfk3rME87Jl2"
};

const data = { 
  "user_id": "unsioVbanndVmuFPEfk3rME87Jl2", 
  "saved_item_id": "fyxUwM1pK3NzKDKxNUmR2P",
  "api_key": "0568f941bd7a406da6b0f0c4a710a974",
};


app.get('/startPipeline', (req, res) => {
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    let url = new URL(data);
    // Use URLSearchParams to get the value of 'run_id'
    let runId = url.searchParams.get('run_id');

    const pollInterval = 5000; // Poll every 5000 milliseconds (5 seconds)
  
    const poll = setInterval(() => {
      fetch(`https://api-v2.agenthub.dev/plrun?run_id=${runId}`, {
        method: 'GET',
        headers: { 'x-auth-key': 'unsioVbanndVmuFPEfk3rME87Jl2'}
      })
      .then(response => response.json())
      .then(data => {
        console.log("pinged")
        if (data.state === 'DONE') {
          clearInterval(poll); // Stop polling, display image.
          console.log(data.outputs)
          console.log("OUTPUT ABOVE, GOING TO FRONT END")
          res.json({
            success: true,
            outputs: data.outputs
          })
        }
      })
      .catch(error => {
        console.error('Polling error:', error);
        res.json({
          success: false,
          error: 'Error occurred'
        })
        clearInterval(poll);
      })
    }, pollInterval);
  })
  .catch(error => {
    console.error('Error starting pipeline:', error);
    res.status(500).json({ error: 'Error occurred' }); // Send JSON even in case of error
  });
});
  
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});