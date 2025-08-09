
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
        const database = client.db("testDB");
        const gymCollection = database.collection("gym");

        // Wait until the MongoDB client connects to the server
        // await client.connect();

        // Print a message to confirm the client is connected
        console.log("The database client is connected to mongodb server");

        app.get("/get-data", async (req, res) => {
            // Find all documents in the collection and convert the cursor to an array
            const data = await gymCollection.find().toArray();
            res.send(data); // Send the found documents back to the client (as JSON/array)
        });

        app.get("/get-single-data/:id", async (req, res) => {
            const id = req.params.id; // get the "id" from the URL path
            const query = { _id: new ObjectId(id) }; // create a MongoDB query using the _id
            const result = await gymCollection.findOne(query); // find one document that matches the query
            res.send(result); // send the found document back to the client
        });

        app.post("/add-data", async (req, res) => {
            const data = req.body; // Read JSON body sent by the client (requires express.json middleware)
            console.log("added data: ", data);

            const result = await gymCollection.insertOne(data); // Insert one document into the collection

            res.send(result); // Send MongoDB result object (contains insertedId, acknowledged, etc.)
            console.log("result send to mongodb: ", result);
        });

        app.delete("/delete-data/:id", async (req, res) => {
            const id = req.params.id; // get "id" from URL path
            const query = { _id: new ObjectId(id) }; // build query to match _id in MongoDB
            const result = await gymCollection.deleteOne(query); // delete one matching document
            res.send(result); // send result back to client
        });


        // fetch("")
        // .then((res) => res.json())
        // .then((result) => console.log(result))

        // fetch("",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(),
        // })
        // .then((res) => res.json())
        // .then((result) => console.log(result))




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