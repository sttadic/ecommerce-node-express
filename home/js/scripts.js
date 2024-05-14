// Logout confirmation logic (navbar.ejs)
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


// Assign a random 'carousel item' and 'carousel indicator' an 'active' class on page load (index.ejs)
let randomImg = Math.floor(Math.random() * 3);
let carouselItems = document.querySelectorAll(".carousel-item");
let carouselIndicators = document.querySelectorAll(".indicator");
carouselItems[randomImg].classList.add("active");
carouselIndicators[randomImg].classList.add("active");