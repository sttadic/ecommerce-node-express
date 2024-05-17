const arrProductIDs = [];

// Logic to populate cart (offcanvas) with corresponding product data using ajax
function addProduct(addBtn) {

    // Extract the value of parent's element
    let pID = addBtn.parentElement.querySelector(".productID").value;
    let pQty = addBtn.parentElement.querySelector(".quantity").value;
    
    // Prevent out-of-range quantities and duplicated products in a cart
    let isValid = validateInput(pQty, pID , arrProductIDs);
    if (!isValid) {
        return;
    }

    // Add product Id into an array to be validated on next call by the code above
    arrProductIDs.push(pID);

    // Instantiate XMLHttpRequest object, set endpoint and RequestHeder content type
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "addToCart", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    // Send productID and quantity to the server
    xhttp.send(JSON.stringify({
        productID: pID, 
        quantity: pQty
    }));
    // Onload event handler (response data available)
    xhttp.onload = () => {
        // All ok
        if (xhttp.status >= 200 && xhttp.status < 300) {
            // Parse JSON response
            let productsData = JSON.parse(xhttp.responseText);
            
            // Assign and clear an element that will contain product information in the cart so it wouldn't append products on each response
            let productsWrapper = document.getElementById("cart-product-wrapper");
            productsWrapper.innerHTML = "";

            // Initialize sum variable used to display total price of all added products
            let sum = 0;

            // Iterate over productsData array of objects, create elements with respective attributes and values and append them to the parent elements
            for (let i = 0; i < productsData.length; i++) {

                // Create row
                let row = document.createElement("div");
                row.className = "row cart-product"
                
                // Product name column
                let colName = document.createElement("div");
                colName.className = "col-lg-3";
                colName.textContent = productsData[i].productName;

                // Quantity column with input element
                let colQty = document.createElement("div");
                colQty.className = "col-lg-2";
                colQty.textContent = "Qty: ";
                let inpQty = document.createElement("input");
                inpQty.className = "cart-quantity";
                inpQty.setAttribute("value", productsData[i].productQty);
                colQty.appendChild(inpQty);

                // Product price column
                let colPrice = document.createElement("div");
                colPrice.className = "col-lg-2";
                colPrice.textContent = "Price: €" + productsData[i].productPrice;

                // Product total price column
                let colTotal = document.createElement("div");
                colTotal.className = "col-lg-2 product-total";
                colTotal.textContent ="Total: €" + (productsData[i].productQty * productsData[i].productPrice).toFixed(2);

                // Add to the sum on each iteration
                sum += productsData[i].productQty * productsData[i].productPrice;

                // Column with 'remove' button - onclick event calls a function that removes a product (row)
                let colRemove = document.createElement("div");
                colRemove.className = "col-lg-3";
                let btnRemove = document.createElement("button");
                btnRemove.className = "prod-remove";
                btnRemove.textContent = "Remove";
                btnRemove.setAttribute("type", "button");
                btnRemove.setAttribute("onclick", `removeFromCart(${productsData[i].productID}, this)`);
                colRemove.appendChild(btnRemove);
                
                // Append all to the row element (div)
                row.appendChild(colName);
                row.appendChild(colQty);
                row.appendChild(colPrice);
                row.appendChild(colTotal);
                row.appendChild(colRemove);
                // Append row to the parent element
                productsWrapper.appendChild(row);
            }
            // Display total of entire cart
            document.getElementById("cart-total").textContent = sum.toFixed(2);
        } else {
            // Alert with status code and response body
            alert("Oops, something went wrong! Status code: " + xhttp.status + " - " + xhttp.responseText);
        }
    }
}


// Remove product from cart (triggered by click on cart 'remove' button)
function removeFromCart(pID, remBtn) {

    // Substract value of removed item from subtotal
    let prodTotal = remBtn.parentElement.parentElement.querySelector(".product-total").textContent;
    document.getElementById("cart-total").textContent -= prodTotal;

    // Remove parent of a parent element (row) from which 'remove button' was clicked on
    remBtn.parentElement.parentElement.remove(); 

    // Set endpoint and requestHeader
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/removeFromCart", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Send productID to the server so it can be deleted from a session
    xhttp.send(JSON.stringify({productID: pID}));
}


// Function that checks quantity range and product status in a cart
function validateInput(prodID, prodQuantity, arrProdIDs) {
    if (prodQuantity < 1 || prodQuantity > 99) {
        alert("Please select quantity between 1-99");
        return false;
    }

    for (let i = 0; i < arrProdIDs.length; i++) {
        if (prodID === arrProdIDs[i]) {
            alert("Product is already added to the cart");
            return false;
        }
    }
    return true;
}