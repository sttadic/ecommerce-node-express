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


// AJAX login popup form submission
// Listen for the click event on submit button
document.getElementById("login-submit").addEventListener("click", function(event) {
    // Prevent default form submission
    event.preventDefault();
// Instantiate XMLHttpRequest object
let xhttp = new XMLHttpRequest();
xhttp.open("POST", "/login", true);
// Set request header content type to JSON
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
    // Status of request is 4 (response is ready)
    if (xhttp.readyState === 4) {
        // Server responds with status 401 (unauthorized)
        if (xhttp.status === 401) {
            // Parse JSON
            let data = JSON.parse(xhttp.responseText);
            // Check for error message and display it within a login popup
            if (data && data.error) {
                document.getElementById("login-error").innerHTML = "Invalid username/password";
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
// Send login data as JSON to the server
xhttp.send(JSON.stringify({ 
    username: document.getElementById("username").value, password: document.getElementById("password").value }));
});