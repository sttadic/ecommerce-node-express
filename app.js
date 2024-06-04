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

// Import bcrypt
const bcrypt = require("bcrypt");

// Set up EJS as template engine
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

// Middleware for serving static files
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
    // Include customer name from the current session
    return res.status(200).render("index", {activePage: "home", isLoggedIn: loginStatus, customerName: req.session.userName});
});


// Route for 'About us' page
app.get("/about", (req, res) => {
     // Extract loginStatus from res.locals object
    const { loginStatus } = res.locals;
    
    // Render about us page with all relevant information
    return res.status(200).render("about", {activePage: "about", isLoggedIn: loginStatus, customerName: req.session.userName});
});


// Route that serves 'Products' page
app.get("/products", (req, res) => {
    // Extract loginStatus from res.locals object
    const { loginStatus } = res.locals;

    // Query database for products information and render products template with relevant data
    connection.query("SELECT * FROM products", (error, data) => {
        if (error) {
            console.log("Error querying database: " + error);
            return res.status(500).send("Error retrieving data from database!");
        } else {
            return res.status(200).render("products", {
                activePage: "products", 
                products: data,
                isLoggedIn: loginStatus,
                customerName: req.session.userName,
                productsList: req.session.cart
            });
        }
    });
});


// Route that handles adding products to the cart (session)
app.post("/addToCart", (req, res) => {
    // If no productID in request, respond with cart session (every time products page is loaded - cart.js)
    if (!req.body.productID) {
        return res.status(200).json(req.session.cart);
    }

    // Extract data from the request body
    const prodID = req.body.productID;
    const prodQty = req.body.quantity;

    // Initialize cart in the session if it doesn't exist yet
    if (!req.session.cart) {
        req.session.cart = [];
    }

    // Query database for name and price of a particular product
    connection.query("SELECT name, price FROM products WHERE productID = ?", [prodID], (error, data) => {
        if (error) {
            console.error("Error retrieving data from database: ", error);
            return res.status(500).send("Error retrieving data from database!");
        } else {
            // Add all data to a cart session
            req.session.cart.push( {
                productID: prodID,
                productName: data[0].name,
                productQty: prodQty,
                productPrice: data[0].price
            });

            // Send JSON as response containing cart session data
            return res.status(200).json(req.session.cart);
        }
    });
});


// Route to handle product removal from the session (cart)
app.post("/removeFromCart", (req, res) => {
    // Get the productID from the request body
    const prodID  = req.body.productID;

    // Session does not exists for some reason
    if (!req.session.cart) {
        return res.status(400).send("Cart is already empty");
    }

    // If this is the last item, remove cart session
    if (req.session.cart.length <= 1) {  
        delete req.session.cart;
        return res.status(200).send("Last item removed from the cart");
    }
    
    // Iterate over req.session.cart array and remove object with particular property value of productID
    for (let i = 0; i < req.session.cart.length; i++) {
        if (prodID == req.session.cart[i].productID) {
            req.session.cart.splice(i, 1);
            break;
        }
    }  
    // All ok
    return res.status(200).send("Product removed from the cart");
});


// Checkout route
app.post("/checkout", (req, res) => {
    // If no session (cart empty)
    if (!req.session.cart) {
        return res.status(400).redirect("/products");
    }

    // Calculate subtotal and total number of items in the cart
    let sum = 0;
    let quantity = 0;
    const cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
        sum += cart[i].productQty * cart[i].productPrice;
        quantity += parseInt(cart[i].productQty);
    }

    // Render chouckout template with subtotal
    return res.status(200).render("checkout", {subtotal: sum, totalQty: quantity});

});


// Route to handle transaction (storing purchased products into a database)
app.post("/transaction", (req, res) => {
    // Get customer id from the session
    const {userID} = req.session;
    
    // Iterate over the cart session and insert values into the corresponding columns of the transactions table
    req.session.cart.forEach(item => {
        let {productID} = item;
        let {productQty} = item;
   
        connection.query("INSERT INTO transactions VALUES (?, ?, ?)", [userID, productID, productQty], (error) => {
            if (error) {
                console.error("Error storing data to the database: ", error);
                return res.status(500).send("Error storing data to the database!");
            } 
        });
    });
    // All ok
    return res.status(201).redirect("/payment") 
});


// Payment route
app.get("/payment", (req, res) => {
    // Remove cart session
    if (req.session.cart) {
        delete req.session.cart;
    }

    // Render payment template
    return res.status(200).render("payment");
});


// Login route
app.post("/login", (req, res) => {
    // Store request object in loginData constant
    const loginData = req.body;

    // Query the database for data of all customers
    connection.query("SELECT * FROM customers", async function(error, data) {
        if (error) {
            console.error("Error retrieving data from database: ", error);
            return res.status(500).send("Error retrieving data from database!");
        } else {
            // Pass in request object properties and array of objects (data) from the database into auth module
            const authenticated = await auth(loginData.username, loginData.password, data);
            // If user is authenticated, store customerId and name in a session object and respond with status 200
            if (authenticated) {
                req.session.userID = authenticated.customerID;
                req.session.userName = authenticated.name;
                return res.status(200).send("Authenticated");
            }
            // If not authenticated, set response status to 401 and send response body as JSON
            return res.status(401).json({ error: "Invalid username/password" });
        }
    });
});


// Logout route
app.get("/logout", (req, res) => {
    // Delete userID and userName from session
    if (req.session.userID) {
        delete req.session.userID;
        delete req.session.userName;
        return res.status(302).redirect("/");
    }
});


// Account route
app.get("/account", (req, res) => {
    return res.status(200).render("register", {regMessage: ""});
});


// Route that handles registering of a new user
app.post("/register", async (req, res) => {
    // Get all data from the request body
    const { name, username, password, confPassword} = req.body;

    // Simple input validation
    if (name.trim().length < 1 || username.trim().length < 1 || password.trim().length < 1) {
        return res.status(400).render("register", {regMessage: "All fields must be completed!"});
    }
    if (password.trim().length < 6) {
        return res.status(400).render("register", {regMessage: "Password must be at least 6 characters long!"});
    }
    if (password.trim() !== confPassword.trim()) {
        return res.status(400).render("register", {regMessage: "Passwords do not match!"});
    }

    // Hash the password
    const hash = await bcrypt.hash(password.trim(), 10);

    // Store credentials to the database
    connection.query("INSERT INTO customers (username, password, name) VALUES (?, ?, ?)", [username.trim(), hash, name.trim()], (error) => {
        if (error) {
            console.error("Error storing data to the database: ", error);
            return res.status(500).send("Error storing data to the database!");
        } else {
            return res.status(201).render("register", {regMessage: `Thank you for registering ${name}!<br>You can now go back and log in!`});
        }
    });
});



// Start a server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});