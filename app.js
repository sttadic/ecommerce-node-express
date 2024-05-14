// Import and create a new instance of express
const express = require("express");
const app = express();

// Import and configure express session middleware
const session = require("express-session");
app.use(session({
    name: "sid",                // session name
    resave: false,              // do not store sessions that are not modified during the request
    saveUninitialized: false,   // do not store new unmodified sessions (with no data)
    secret: "secret_key",       // string used to sign sid cookie
    cookie: {
        maxAge: 7200000,        // maximum age of a cookie in milliseconds (set to two hours)
        sameSite: true          // browser will accept cookies only from the same domain
    }
}));

// Import bodyparser and use json and urlencoded parser as middleware for the application with extended parsing mode
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());

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

// Import authentication module
const auth = require("./utils/auth.js")


// Route to serve the landing page
app.get("/", (req, res) => {
    // Check whether user is logged in and assign status to loginStatus variable accordingly
    let loginStatus = "Log In";
    if (req.session.userID) {
        loginStatus = "Log Out"
    };
    res.render("index", {activePage: "home", isLoggedIn: loginStatus});
});

// Route to handle 'newsletter' subscription
app.post("/newsletter", (req, res) => {
    console.log("Success");
});

// Route for 'about us' page
app.get("/about", (req, res) => {
    // Check whether user is logged in and assign status to loginStatus variable accordingly
    let loginStatus = "Log In";
    if (req.session.userID) {
        loginStatus = "Log Out"
    };
    
    res.render("about", {activePage: "about", isLoggedIn: loginStatus});
});

// Route that serves 'products' page
app.get("/products", (req, res) => {
    // Check whether user is logged in and assign status to loginStatus variable accordingly
    let loginStatus = "Log In";
    if (req.session.userID) {
        loginStatus = "Log Out"
    };

    connection.query("SELECT * FROM products", (error, data) => {
        if (error) {
            console.log("Error querying database: " + error);
        } else {
            res.render("products", {activePage: "products", products: data, isLoggedIn: loginStatus});
        }
    });
});

// Login route
app.post("/login", (req, res) => {
    // Store request object in loginData constant
    const loginData = req.body;

    // Query the database for usernames and passwords of all customers
    connection.query("SELECT * FROM customers", function(error, data) {
        if (error) {
            console.log("Error retrieving data from database: ", error);
            res.status(500).send("Error retrieving data from database!");
        } else {
            // Pass in request object properties and array of objects (data) from the database into auth module
            const authenticated = auth(loginData.username, loginData.password, data);
            // If user is authenticated, store customerID in a session object and respond with status 200
            if (authenticated) {
                req.session.userID = authenticated.customerID;
                return res.status(200).send("Authenticated");
            }
            // If not authenticated, set response status to 401 and respond with a JSON containing error message
            res.status(401);
            res.json({ error: "Invalid username/password" });
        }
    });
});


// Start a server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});