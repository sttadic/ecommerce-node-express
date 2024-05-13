// Import and create a new instance of express
const express = require("express");
const app = express();

// Import and configure express session middleware
const session = require("express-session");
app.use(session({
    name: "sid",                // session name
    resave: false,              // do not store sessions that are not modified during the request
    saveUninitialized: false,   // do not store new unmodified sessions (with no data)
    secret: "secret_key",       // dummy string used to sign sid cookie
    cookie: {
        maxAge: 7200000,        // maximum age of a cookie in milliseconds (set to two hours)
        sameSite: true,         // browser will accept cookies only from the same domain
    }
}));

// Import bodyparser and use urlencoded parser as middleware for the application with extended parsing mode
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the view engine
app.set("view engine", "ejs");

// Import mysql2 module, pass in a config object and create a connection to the database
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



// Route to serve the 'home page'
app.get("/", (req, res) => {
    res.render("index", {isHome: "active", isProducts: "", isAbout: ""});
});

// Route to handle 'newsletter' subscription
app.post("/newsletter", (req, res) => {
    console.log("Success");
});

// Route for 'about us' page
app.get("/about", (req, res) => {
    res.render("about", {isAbout: "active", isProducts: "", isHome: ""});
});

// Route that serves 'products' page
app.get("/products", (req, res) => {
    connection.query("SELECT * FROM products", (error, data) => {
        if (error) {
            console.log("Error querying database: " + error);
        } else {
            res.render("products", {products: data, isProducts: "active", isHome: "", isAbout: ""});
        }
    });
});


// Start a server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});