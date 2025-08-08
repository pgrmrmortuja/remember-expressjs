
// Importing the express module
const express = require("express");

// Importing the 'cors' package (Cross-Origin Resource Sharing)
const cors = require("cors");

// Load environment variables from .env file
require('dotenv').config();

// Creating an express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Using the CORS middleware to allow requests from any origin
app.use(cors({
    origin: '*',
}));

// Custom middleware to log request details
const logger = (req, res, next) => {
    // Logging HTTP method, URL, and IP address
    console.log(`${req.method} ${req.url} - ${req.ip}`);

    // Passing control to the next middleware or route handler
    next();
};

// Using the logger middleware for all incoming requests
app.use(logger);

// Import necessary tools from mongodb package
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Create the MongoDB connection URI using credentials from .env
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dk8ve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

// Declare an asynchronous function to connect to the MongoDB server
const run = async () => {
    try {
         // Wait until the MongoDB client connects to the server
        // await client.connect();
        // Print a message to confirm the client is connected
        console.log("The database client is connected to mongodb server");

        app.post("/add-data", (req, res) =>{
            const data = req.body;
            console.log("the added data: ", data);
            res.send(data);
        })




    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};
run();

// Call the run function to start the connection
run();


// Route handler for the root path ("/")
// When someone visits http://localhost:5000/
app.get("/", (req, res) => {
    // Sending a response text to the browser
    res.send("The Server is Working");
});


// Starting the server on port 5000
app.listen(5000, () => {
    console.log("The Server is Running on 5000 Port");
});