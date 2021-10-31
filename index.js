const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2in19.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('luxury_hotel');
        const roomsCollection = database.collection('rooms');

        // GET API FOR ROOMS
        app.get('/rooms', async (req, res) => {
            const cursor = roomsCollection.find({});
            const rooms = await cursor.toArray();
            res.send(rooms);
        });

        // POST API FOR ROOMS
        app.post('/rooms', async (req, res) => {
            const room = req.body;
            const result = await roomsCollection.insertOne(room);
            res.send(result);
        });

        // DELETE API FOR ROOMS
        app.delete('/rooms/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await roomsCollection.deleteOne(query);
            res.send(result);
        })

    } finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Server!!!');
})

app.listen(port, () => {
    console.log(port)
})