const express = require('express');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
var MongoClient = require('mongodb').MongoClient;

dotenv.config({ path: './backend/credentials.env' });
const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({ dest: 'uploads/' });
const port = 3001;

var uri = "mongodb://harrisonmacey:<password>@ac-exkq8sr-shard-00-00.qykp6gp.mongodb.net:27017,ac-exkq8sr-shard-00-01.qykp6gp.mongodb.net:27017,ac-exkq8sr-shard-00-02.qykp6gp.mongodb.net:27017/?ssl=true&replicaSet=atlas-13x7sp-shard-0&authSource=admin&retryWrites=true&w=majority";



// Endpoint to receive and save metadata
app.post('/upload-metadata', async (req, res) => {
    try {
        const { tag, link, uniqueId } = req.body;
        console.log("workgin2");

        MongoClient.connect(uri, async function(err, client) {
            console.log("connected successfully");
            const collection = client.db("test").collection("devices");
            
            const doc = {
                title: "Record of a Shriveled Datum",
                content: "No bytes, no problem. Just insert a document, in MongoDB",
              }
              // Insert the defined document into the "haiku" collection
              const result = await balls.insertOne(doc);

            client.close();
          });
        
        res.status(200).json({ message: 'Metadata saved successfully' });
    } catch (error) {
        console.error('Error saving metadata:', error);
        res.status(500).send('Error saving metadata');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
