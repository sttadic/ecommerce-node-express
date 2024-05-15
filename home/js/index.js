// Assign a random 'carousel item' and 'carousel indicator' an 'active' class on page load
let randomImg = Math.floor(Math.random() * 3);
let carouselItems = document.querySelectorAll(".carousel-item");
let carouselIndicators = document.querySelectorAll(".indicator");
carouselItems[randomImg].classList.add("active");
carouselIndicators[randomImg].classList.add("active");


// Client-side email validation using regular expressions - newsletter submission
function emailValidator(event) {
    // Prevent form submission
    event.preventDefault();
    // Initialze variables, email stores trimmed (whitespace removed) input value (email address)
    let message = document.getElementById("news-message");
    let email = document.getElementById("news-email").value.trim();
    // Must start with at least one alphabetic, numeric or _ character with optional .(dot) and - (hyphen) but not at the very start or before @, 
    // then follows mandatory @ literal. After that, optional one or many alphabetic, numeric, _ . - chars. Follows mandatory combination of 
    // alphabetic, numeric and _ chars, and finaly, after . (dot) 2-5 mandatory alphabetic chars representing top level domain (TLD)
    let validPattern = /^(\w+\.*-*)?\w+@(\w+\.*-*)?\w+\.[a-zA-Z]{2,5}$/;

    // Validate submitted email by comparing it against regex pattern
    if (validPattern.test(email)) {
        message.textContent = "Thank you for Subscribing!";
    // If not validated, display error message and clear content from relevant elements
    } else {
        let invalidEmail = document.getElementById("news-email");
        message.textContent = `"${invalidEmail.value}" is not valid e-mail address!`;
        invalidEmail.value = "";
        document.getElementById("news-email").addEventListener("click", () => {
            message.textContent = "";
        });
    }
}