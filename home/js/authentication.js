// AJAX login form submission
// Listen for the click event on submit button of login popup
document.getElementById("login-submit").addEventListener("click", (event) => {
    // Prevent default form submission
    event.preventDefault();
// Instantiate XMLHttpRequest object
let xhttp = new XMLHttpRequest();
xhttp.open("POST", "/login", true);
// Set request header content type to JSON
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = () => {
    // Status of request is 4 (response is ready)
    if (xhttp.readyState === 4) {
        // Server responds with status 401 (unauthorized)
        if (xhttp.status === 401) {
            // Parse JSON
            let data = JSON.parse(xhttp.responseText);
            // Check for error message and display its content in element with id 'login-error'
            if (data && data.error) {
                document.getElementById("login-error").textContent = data.error;
            }
        // Server responds with 200 (all ok) - open the page from which login was called
         } else if (xhttp.status === 200) {
            let activePage = document.querySelector(".active").getAttribute("href");
            window.location.href = activePage;
        } else {
            alert("Ups, something went wrong! Status code: " + xhttp.status);
        }
    }
}
// Send JSON containing login data to the server
xhttp.send(JSON.stringify({ 
    username: document.getElementById("username").value, password: document.getElementById("password").value }));
});


// Logout confirmation (navbar.ejs)
let logout = document.querySelector(".log-out");
// Check if '.log-out' class exists (added dynamically to link tag depending on login status)
if (logout) {
    // Listen for click event
    logout.addEventListener("click", function(event) {
        // Show confirmation window and if confirmed, redirect to logout endpoint
        let confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            window.location.href = "/logout";
        } else {
            // do nothing (stay logged in)
        }
    });
}