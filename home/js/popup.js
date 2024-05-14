// Function that triggers login popup
function togglePopup() {
    let username = document.getElementById("username");
    let blurAll = document.querySelectorAll(".blur");
    let popup = document.getElementById("popup");
    // Togle classes for all .blur and .popup elements to add/remove blur and make popup appear/disapear
    blurAll.forEach(element => {
        element.classList.toggle("blur-active");
    });
    popup.classList.toggle("popup-active");
    // Focus on username and clear input fields and error message every time the popup is reopened
    username.focus();
    username.value="";
    document.getElementById("login-error").innerHTML = "";
    document.getElementById("password").value = "";
};  


// AJAX login form submission
// Listen for the click event
document.getElementById("login-submit").addEventListener("click", function(event) {
    // Prevent default form submission
    event.preventDefault();
// Instantiate XMLHttpRequest object
let xhttp = new XMLHttpRequest();
xhttp.open("POST", "/login", true);
// Set the content type to JSON
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
    // If server responds with status 401
    if (xhttp.readyState === 4 && xhttp.status === 401) {
        // Parse JSON
        let data = JSON.parse(xhttp.responseText);
        // Check for error message and display it within a login popup
        if (data && data.error) {
            document.getElementById("login-error").innerHTML = "Invalid username/password";
        }
      // If all ok
    } else if (xhttp.readyState === 4 && xhttp.status === 200) {
        window.location.href = "/";
    }
}
// Send login data as JSON to the server
xhttp.send(JSON.stringify({ 
    username: document.getElementById("username").value, password: document.getElementById("password").value }));
});