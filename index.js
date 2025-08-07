// Importing the express module
const express = require("express");

// Creating an express application
const app = express();

// Starting the server on port 5000
app.listen(5000, () => {
    console.log("The Server is Running on 5000 Port");
});