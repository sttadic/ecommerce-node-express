function addProduct(button) {

    // Extract the value of parent's element with the class .productID
    let pID = button.parentNode.querySelector(".productID").value;
    let pQty = button.parentNode.querySelector(".quantity").value;

    // AJAX 'add to cart' logic
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "addToCart", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        productID: pID, 
        quantity: pQty
    }));

    xhttp.onload = () => {
        if (xhttp.status >= 200 && xhttp.status < 300) {
            // Parse JSON response
            let productsData = JSON.parse(xhttp.responseText);
            
            // Assign and clear an element that will contain product information in the cart
            let productsWrapper = document.getElementById("cart-product-wrapper");
            productsWrapper.innerHTML = "";

            // Iterate over productsData array of objects, create elements with respective attributes and values and append them to the parent elements
            for (let i = 0; i < productsData.length; i++) {
                let row = document.createElement("div");
                row.className = "cart-product"
                
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

                
                row.appendChild(colName);
                row.appendChild(colQty);
                productsWrapper.appendChild(row);

            }


            
        }
    }
}