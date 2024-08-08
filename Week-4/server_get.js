const express = require("express");
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3040;
app.use(express.static('public'))


// MongoDB Setup
const uri = 'mongodb+srv://ahmadtc17:lEHPujvj7D0nruzG@cluster0.fjfikfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        const database = client.db('form');
        const collection = database.collection('formData');
        console.log("Connected to MongoDB/DB/Collection");
        
        app.use(bodyParser.json());

        app.post('/submit-form', async (req, res) => {
            try {
                const formData = req.body;
                console.log("Received form data:\n", formData);
                await collection.insertOne(formData);
                res.json({ message: 'Form submitted successfully! Someone will reach out to you :)' });
            } catch (error) {
                console.error("Error inserting form data:", error);
                res.status(500).json({ message: 'Failed to submit form' });
            }
        });

        app.listen(port, () => {
            console.log(`Server running on port: ${port}\n`);
        });
    } catch (ex) {
        console.error("Error connecting to MongoDB:", ex);
    }
}

runDBConnection().catch(console.dir);