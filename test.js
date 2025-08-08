const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(express.json());
app.use(cors());

// Import necessary tools from mongodb package
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Create the MongoDB connection URI using credentials from .env
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dk8ve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

const run = async () =>{
    await client.connect();
    console.log("the server is connected to mongodb");
}

run();

app.get("/", (req, res) =>{
    res.send("The server is started");
})

app.listen(port, () =>{
    console.log(`server is starting ${port} port`);
})