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
MongoClient.connect(uri, function(err, client) {
//   const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("working");
//   client.close();
});



// Endpoint to receive and save metadata
app.post('/upload-metadata', async (req, res) => {
    try {
        const { tag, link, uniqueId } = req.body;
        // const collection = client.db("cluster0").collection("cluster0"); // Replace with your DB and collection name
        console.log("workgin2");
        await collection.insertOne({ tag, link, uniqueId });

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
