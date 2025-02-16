document.addEventListener("DOMContentLoaded", () => {
    const checkoutTable = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");
    let cart = getCart(); // Get cart items from localStorage

    // Function to render the cart items on the checkout page
    function renderCheckout() {
        checkoutTable.innerHTML = ""; // Clear previous items
        let total = 0;

        if (cart.length === 0) {
            checkoutTable.innerHTML = "<tr><td colspan='4'>Your cart is empty.</td></tr>";
            checkoutTotal.innerText = "$0.00";
            return;
        }

        // Render each item in the cart
        cart.forEach(item => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" width="50" alt="${item.title}"></td>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            checkoutTable.appendChild(row);
            total += item.price * item.quantity; // Calculate the total
        });

        // Display the total amount in the checkout
        checkoutTotal.innerText = `$${total.toFixed(2)}`;
    }

    // Handle the Place Order button click
    document.getElementById("place-order").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to your cart before placing an order.");
            return;
        }

        alert("Order placed successfully!");
        localStorage.removeItem("cart"); // Clear the cart from localStorage
        window.location.href = "index.html"; // Redirect to homepage
    });

    renderCheckout(); // Render the cart items and total when the page loads
});

// Helper functions for cart storage (localStorage in this case)
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage
}
