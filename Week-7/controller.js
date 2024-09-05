const express = require("express");
const bodyParser = require('body-parser');
const { connectToDB, insertFormData } = require('./model');
const { Server } = require('socket.io');

const app = express();
const port = 3040;

// Start the server
const server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

const io = new Server(server);

app.use(express.static('public'));
app.use(bodyParser.json());

connectToDB().catch(console.dir);

let userCount = 0; // Tracking number of users that are connected

app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log("Received form data:\n", formData);
        await insertFormData(formData);


        res.json({ message: 'Form submitted successfully! Someone will reach out to you :)' });
    } catch (error) {
        console.error("Error inserting form data:", error);
        res.status(500).json({ message: 'Failed to submit form' });
    }
});

io.on('connection', (socket) => {
    userCount++;
    console.log(`User connected. Total users: ${userCount}`);

    socket.on('disconnect', () => {
        userCount--;
        console.log(`User disconnected. Total users: ${userCount}`);
    });
});



