document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");

    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const products = await response.json();

        products.slice(0, 12).forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "col-md-4 d-flex align-items-stretch mb-4"; // Ensures all cards are the same size

            productCard.innerHTML = `
                <div class="card h-100">
                    <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text text-truncate" style="max-width: 100%;">${product.description}</p>
                        <p><strong>$${product.price}</strong></p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.images[0]}">Add to Cart</button>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });

        // Function to update the cart icon dynamically
        function updateCartIcon() {
            let cart = getCart();
            const cartCount = document.getElementById("cart-count");
            cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
        }

        // Add item to the cart
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                let cart = getCart();
                const productId = event.target.dataset.id;
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: productId,
                        title: event.target.dataset.title,
                        price: parseFloat(event.target.dataset.price),
                        image: event.target.dataset.image,
                        quantity: 1
                    });
                }

                saveCart(cart); // Store updated cart
                updateCartIcon(); // Update cart icon dynamically
            });
        });

        // Initialize cart count on page load
        updateCartIcon();

    } catch (error) {
        console.error("Error fetching products:", error);
    }
});

// Mock functions for cart storage (use localStorage or other persistent storage)
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");

    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const products = await response.json();

        products.slice(0, 12).forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "col-md-4 mb-4"; // Bootstrap spacing class
            productCard.innerHTML = `
                <div class="card h-100"> <!-- h-100 to make sure the card takes full height -->
                    <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}</p>
                        <p><strong>$${product.price}</strong></p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.images[0]}">Add to Cart</button>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });

        // Handle the "Add to Cart" button click
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                let cart = getCart();
                const productId = event.target.dataset.id;
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: productId,
                        title: event.target.dataset.title,
                        price: parseFloat(event.target.dataset.price),
                        image: event.target.dataset.image,
                        quantity: 1
                    });
                }

                saveCart(cart);

                // Change the button color to indicate it's been added
                event.target.classList.remove("btn-primary");
                event.target.classList.add("btn-success");
                event.target.innerText = "Added to Cart";
            });
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});
