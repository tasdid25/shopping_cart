const STORAGE_KEY = "shoppingCart";

function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}