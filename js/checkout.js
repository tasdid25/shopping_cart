// Updated checkout.js with promo code validation and recalculations

document.addEventListener("DOMContentLoaded", () => {
    const checkoutTable = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");
    const promoInput = document.getElementById("promo-code");
    const applyPromoBtn = document.getElementById("apply-promo");
    const discountDisplay = document.getElementById("discount-amount");
    const finalTotalDisplay = document.getElementById("final-total");
    let cart = getCart();
    let discount = 0;
    let appliedPromo = null;

    function calculateTotal() {
        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        discountDisplay.innerText = `$${discount.toFixed(2)}`;
        finalTotalDisplay.innerText = `$${(total - discount).toFixed(2)}`;
        checkoutTotal.innerText = `$${total.toFixed(2)}`;
    }

    function renderCheckout() {
        checkoutTable.innerHTML = "";
        if (cart.length === 0) {
            checkoutTable.innerHTML = "<tr><td colspan='4'>Your cart is empty.</td></tr>";
            checkoutTotal.innerText = "$0.00";
            discountDisplay.innerText = "$0.00";
            finalTotalDisplay.innerText = "$0.00";
            return;
        }
        cart.forEach(item => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" width="50" alt="${item.title}"></td>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            checkoutTable.appendChild(row);
        });
        calculateTotal();
    }

    applyPromoBtn.addEventListener("click", () => {
        const promoCode = promoInput.value.trim().toLowerCase();
        if (appliedPromo) {
            alert("A promo code has already been applied.");
            return;
        }
        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (promoCode === "ostad10") {
            discount = total * 0.10;
            appliedPromo = "ostad10";
        } else if (promoCode === "ostad5") {
            discount = total * 0.05;
            appliedPromo = "ostad5";
        } else {
            alert("Invalid promo code. Please try again.");
            return;
        }
        calculateTotal();
        alert("Promo code applied successfully!");
    });

    document.getElementById("place-order").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to your cart before placing an order.");
            return;
        }
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });

    renderCheckout();
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
