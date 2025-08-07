// Importing the express module
const express = require("express");

// Creating an express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Route handler for the root path ("/")
// When someone visits http://localhost:5000/
app.get("/", (req, res) => {
    // Sending a response text to the browser
    res.send("The Server is Working");
});


// Route handler for "/users" path
// When someone visits http://localhost:5000/users
app.get("/users", (req, res) => {
    // Sending an empty array as the response
    res.send([]);
});


// Handle POST request to "/users" path
app.post("/users", (req, res) => {
    // Accessing the data sent in the request body
    const user = req.body;
    res.send(user);
});


// Starting the server on port 5000
app.listen(5000, () => {
    console.log("The Server is Running on 5000 Port");
});