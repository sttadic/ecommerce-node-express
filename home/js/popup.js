let username = document.getElementById("username");
let password = document.getElementById("password");
let loginError = document.getElementById("login-error");

// Function that toggles login popup
function togglePopup() {
    let blurAll = document.querySelectorAll(".blur");
    let popup = document.getElementById("popup");
    // Toggle classes for all .blur and .popup elements to add/remove blur and make popup appear/disapear
    blurAll.forEach(element => {
        element.classList.toggle("blur-active");
    });
    popup.classList.toggle("popup-active");
    // Focus on username, clear input fields and error message every time popup is reopened
    username.focus();
    username.value="";
    loginError.textContent = "";
    password.value = "";
};

// Refocus and clear input fields if wrong username/password provided
document.getElementById("login-submit").addEventListener("click", () => {
    // Wait 0.1sec so values of input fields could be read on time for login form submission (authentication.js) 
    setTimeout(() => {
        username.focus();
        username.value="";
        password.value = "";
    }, 100);
});

// Clear login error message on keypress event
username.addEventListener("keypress", () => {
    loginError.textContent = "";
});