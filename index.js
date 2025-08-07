// Importing the express module
const express = require("express");

// Creating an express application
const app = express();

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




// Starting the server on port 5000
app.listen(5000, () => {
    console.log("The Server is Running on 5000 Port");
});