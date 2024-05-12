// Import and create a new instance of express
const express = require("express");
const app = express();

// Import bodyparser and set urlencoded parser as middleware for the application with extended parsing mode (nested objects)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the view engine
app.set("view engine", "ejs");

// Import mysql2 module and create a connection to the database
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "G00438839"
});
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to the database: ", err);
    } else {
        console.log("Connected to the database!");
    }
});

// Serve static files from a public directory
app.use(express.static("home"));


// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/newsletter", (req, res) => {
    console.log("Success");
});

app.get("/products", (req, res) => {

    connection.query("SELECT * FROM products", (error, data) => {
        if (error) {
            console.log("Error querying database: " + error);
        } else {
            res.render("products", {products: data});
        }
    });
});


// Start a server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});