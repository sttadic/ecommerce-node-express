# Express Application - Web Store 'TheCoffeeCove'
Final project for the Web Application Development module - Higher Diploma in Software Development. <br>
Stjepan Tadic

<br>

### [Short video demo](https://youtu.be/hZiWZWLP-KY)
<br>

## Table of Content
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Features](#features)

<br>

## Introduction
This is an Express.js web application serving as a coffee-themed e-commerce platform. It provides users with essential functionalities such as user registration, login, and logout. Users can subscribe to a newsletter and interact with a catalog of coffee products, add or remove them from the shopping cart, and make purchases.

<br>

## Technologies Used
### Frontend
- HTML
- CSS
- JavaScript (interactivity and AJAX)
- Bootstrap (responsive design)
- EJS (Embedded JavaScript templates)
### Backend
- Node.js
- Express.js
### Database
- MySQL
### Authentication
- Bcrypt (password hashing)
- Express-session (managing user sessions)
### Middleware
- Body-parser (parsing incoming request bodies)

<br>

## Setup
- Clone the repository:
```bash
git clone https://github.com/sttadic/ecommerce-node-express.git
```
- Navigate to the project directory and install dependencies:
```bash
npm install
```
- Import the database:
```bash
mysql -u root -p G00438839 < database_dump.sql
```
When prompted for MySQL password, enter 'root'. <br><br>
Or simply import the 'database_dump.sql' file from the project root directory if using MySQL GUI tools such as phpAdmin or MySQL Workbench.
- Run the application:
```bash
npm start
```
- Navigate to 'http://localhost:3000' in your web browser to see the application in action.

<br>

## Features

- **Responsive Design** <br>
The website is fully responsive, utilizing Bootstrap's grid system and media queries to scale seamlessly across different screen sizes.

- **User Authentication** <br>
Customer login is implemented as a popup activated from a navbar. Options to register and log out are also available. Passwords are securely hashed using bcrypt and stored in a database.

- **Navbar** <br>
The Bootstrap navbar element is implemented and modified in a way that dynamically adds or removes items, changing size and appearance based on a login status, the currently opened web page, and screen size.

- **Carousel** <br> 
An interactive automatic slideshow on the home page that displays a random slide on each page load.

- **Newsletter Subscription** <br>
Client-side email validation is implemented using Regular Expressions. The newsletter form is for demonstration purposes only and does not send requests to the server.

- **Shopping Cart** <br>
The shopping cart is implemented as a Bootstrap off-canvas element. Customers can add or remove products from the cart. The coffee icon, which opens the shopping cart, is highlighted if a product exists in the cart. The subtotal updates dynamically as products and their respective quantities are added or removed. <br>
Some restrictions are implemented, such as limiting product quantities to a range of 1 to 99.

- **Checkout** <br>
The checkout provides the summary of the shopping cart (number of products and their subtotal). Customers can either return to the products page or proceed to fill out payment details (optional, for demonstration purposes) and click the "Pay Now" button to finalize the purchase. At this point, all products and their quantities are added to the 'transactions' junction table in the database for the logged-in user.

- **Error Handling** <br>
Provides meaningful error and warning messages and handles edge cases gracefully.
