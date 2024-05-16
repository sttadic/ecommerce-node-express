// Logic to populate cart (offcanvas) with corresponding product data using ajax
function addProduct(addBtn) {

    // Extract the value of parent's element with the class 'productID' and 'quantity'
    let pID = addBtn.parentNode.querySelector(".productID").value;
    let pQty = addBtn.parentNode.querySelector(".quantity").value;

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
                let inpQty = document.createElement("input");
                inpQty.className = "cart-quantity";
                inpQty.setAttribute("type", "number");
                inpQty.setAttribute("min", "1");
                inpQty.setAttribute("max", "99");
                inpQty.setAttribute("value", productsData[i].productQty);
                colQty.appendChild(inpQty);

                // Product price column
                let colPrice = document.createElement("div");
                colPrice.className = "col-lg-2";
                colPrice.textContent = productsData[i].productPrice;

                // Product total price column
                let colTotal = document.createElement("div");
                colTotal.className = "col-lg-2 product-total";
                colTotal.textContent = (productsData[i].productQty * productsData[i].productPrice).toFixed(2);

                // Add to the sum on each iteration
                sum += productsData[i].productQty * productsData[i].productPrice;

                // Column with 'remove' button - onclick event calls function with 'productID' as parameter
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

    // Remove parent of a parent element (row) from which 'remove button' was clicked
    remBtn.parentElement.parentElement.remove(); 

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/removeFromCart", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Send productID to the server so it can be deleted from a session (cart)
    xhttp.send(JSON.stringify({productID: pID}));
}