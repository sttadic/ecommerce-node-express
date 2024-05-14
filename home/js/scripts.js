// Logout confirmation logic
let logout = document.querySelector(".log-out");
// If '.log-out' class exists (added dynamically depending on login status)
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