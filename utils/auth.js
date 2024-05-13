// Authentication function that takes parameters username, password and customers object
function authenticate(username, password, customers) {
    const customer = customers.find(customer => customer.username === username);

    // If customer credentials match, return customer object
    if (customer && customer.password === password) {
        return customer;
    }
    return null;
}

module.exports = authenticate;