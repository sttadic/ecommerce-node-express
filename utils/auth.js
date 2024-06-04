const bcrypt = require("bcrypt");

// Authentication function
async function authenticate(username, password, customers) {
    const customer = customers.find(customer => customer.username === username);
    // No customer username match
    if (!customer) {
        return null;
    }
    // Compare input with the hash from the database
    const isMatch = await bcrypt.compare(password, customer.password);

    // No password match
    if (!isMatch) {
        return null;
    }

    // Customer credentials match -> return customer object
    return customer;
}

module.exports = authenticate;