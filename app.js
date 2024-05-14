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

// Import bodyparser and use json and urlencoded parser with extented parsing mode as middleware for the application
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

// Custom middleware that checks if userID exists in a session and stores a string ('Log Out' or 'Log In') into a res.locals object
app.use((req, res, next) => {
    const { userID } = req.session;
    res.locals.loginStatus = "Log In";
    if (userID) {
        res.locals.loginStatus = "Log Out";
    }
    next();
});


// Route to serve the landing page
app.get("/", (req, res) => {
    // Extract loginStatus from res.locals object
    const { loginStatus } = res.locals;

    // Render home page with activePage status to highlight navbar link and login status to display 'Log In'/'Log out' accordingly
    // Also display customer name if logged in
    res.render("index", {activePage: "home", isLoggedIn: loginStatus, customerName: req.session.userName});
});


// Route for 'about us' page
app.get("/about", (req, res) => {
     // Extract loginStatus from res.locals object
    const { loginStatus } = res.locals;
    
    // Render about us page with all relevant information
    res.render("about", {activePage: "about", isLoggedIn: loginStatus, customerName: req.session.userName});
});


// Route that serves 'products' page
app.get("/products", (req, res) => {
    // Extract loginStatus from res.locals object
    const { loginStatus } = res.locals;

    // Query database for products information and render products template with relevant data
    connection.query("SELECT * FROM products", (error, data) => {
        if (error) {
            console.log("Error querying database: " + error);
        } else {
            res.render("products", {activePage: "products", products: data, isLoggedIn: loginStatus, customerName: req.session.userName});
        }
    });
});


// Login route
app.post("/login", (req, res) => {
    // Store request object in loginData constant
    const loginData = req.body;

    // Query the database for data of all customers
    connection.query("SELECT * FROM customers", function(error, data) {
        if (error) {
            console.log("Error retrieving data from database: ", error);
            res.status(500).send("Error retrieving data from database!");
        } else {
            // Pass in request object properties and array of objects (data) from the database into auth module
            const authenticated = auth(loginData.username, loginData.password, data);
            // If user is authenticated, store customerID and name in a session object and respond with status 200
            if (authenticated) {
                req.session.userID = authenticated.customerID;
                req.session.userName = authenticated.name;
                return res.status(200).send("Authenticated");
            }
            // If not authenticated, set response status to 401 and respond with a JSON containing error message
            res.status(401);
            res.json({ error: "Invalid username/password" });
        }
    });
});


// Logout route
app.get("/logout", (req, res) => {
    // Delete userID and userName from session
    if (req.session.userID) {
        delete req.session.userID;
        delete req.session.userName;
        res.redirect("/");
    }
});



// Start a server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});