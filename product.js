// product.js
// This script dynamically fills in the product template based on provided product data.

// Example usage: Each product page sets window.productData before loading this script.

document.addEventListener('DOMContentLoaded', function() {
    // Calculates the final price by multiplying price and quantity
    function finalPrice(price, quantity) {
        // Ensure price is a number (in case it's a string)
        return parseFloat(price) * parseInt(quantity);
    }
    if (!window.productData) {
        console.error('No productData found!');
        return;
    }
    document.title = window.productData.title;
    

    // OH NO I FORGOT TO CHECK IF THE ELEMENTS EXIST BEFORE TRYING TO SET THEM.
    // NO WONDER THE CODE STOPPED WORKING
    // BY DELETING THE IMAGE ELEMENT WE BROKE THE ENTIRE PAGE.
    // SINCE THE CODE IS RELIANT ON AN ELEMENT THAT DOESN'T EXIST ANYMORE.
    const titleElement = document.getElementById('product-title');
    if (titleElement) titleElement.textContent = window.productData.title;
    
    const nameElement = document.getElementById('product-name');
    if (nameElement) nameElement.textContent = window.productData.title;
    
    const imageElement = document.getElementById('product-image');
    if (imageElement) {
        imageElement.src = window.productData.image;
        imageElement.alt = window.productData.title;
    }
    
    const descElement = document.getElementById('product-description');
    if (descElement) descElement.textContent = window.productData.description;
    
    const priceElement = document.getElementById('product-price');
    if (priceElement) priceElement.textContent = window.productData.price;
    // Add to cart button logic
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Validate quantity first
            const container = document.querySelector('.product-container');
            if (container) {
                const qtyInput = container.querySelector('input[type="number"]');
                const qty = parseInt(qtyInput ? qtyInput.value : 1, 10);
                if (isNaN(qty) || qty < 1) {
                    alert('Quantity must be 1 or more.');
                    return;
                }
            }

            // Retrieve cart from localStorage or initialize
            // Essentially this saves the stuff. 
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            // Get selected size/variation if present
            let selectedOption = '';
            let selectedQty = 1;
            // Try to find a select element and quantity input in the product container
            if (container) {
                const select = container.querySelector('select');
                if (select) {
                    selectedOption = select.options[select.selectedIndex].text;
                }
                const qtyInput = container.querySelector('input[type="number"]');
                if (qtyInput && !isNaN(parseInt(qtyInput.value))) {
                    selectedQty = parseInt(qtyInput.value);
                }
            }
            // Check if product already in cart (by title, selected option, and quantity)
            const exists = cart.some(item => item.title === window.productData.title && item.option === selectedOption);
            if (!exists) {
                // Add product to cart
                cart.push({
                    title: window.productData.title,
                    image: window.productData.image,
                    price: window.productData.price,
                    description: window.productData.description,
                    option: selectedOption,
                    quantity: selectedQty
                        ,finalPrice: finalPrice(window.productData.price, selectedQty)
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Product added to cart!');
            } else {
                alert('This product is already in your cart.');
            }
        });
    }
});
