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
    // Focus on username and clear input fields and error message every time popup is reopened
    username.focus();
    username.value="";
    document.getElementById("login-error").innerHTML = "";
    document.getElementById("password").value = "";
};  

// Display error message for wrong username/password anytime submit button is clicked. If user is
// authenticated, server will redirect straight away and message won't be displayed
function loginError() {
    setTimeout(() => {
        document.getElementById("login-error").innerHTML = "Invalid username/password";
    }, 200);
}