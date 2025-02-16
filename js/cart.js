document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cart = getCart();

    // Function to render the cart items
    function renderCart() {
        cartTable.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" width="50"></td>
                <td>${item.title}</td>
                <td>$${item.price}</td>
                <td><input type="number" class="form-control quantity" data-index="${index}" value="${item.quantity}" min="1"></td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger remove-item" data-index="${index}">X</button></td>
            `;
            cartTable.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotal.innerText = `$${total.toFixed(2)}`;
        saveCart(cart);
    }

    // Remove item from the cart
    cartTable.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            cart.splice(index, 1); // Remove item at the specified index
            renderCart(); // Re-render the cart after removal
        }
    });

    // Update quantity and recalculate total
    cartTable.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity")) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value);

            if (newQuantity >= 1) {
                cart[index].quantity = newQuantity; // Update the quantity
                renderCart(); // Re-render the cart after quantity change
            }
        }
    });

    // Initial render
    renderCart();
});

// Mock functions for cart storage (use localStorage or other persistent storage)
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
