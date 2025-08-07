// Importing the express module
const express = require("express");

// Importing the 'cors' package (Cross-Origin Resource Sharing)
const cors = require("cors");

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