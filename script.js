/* =========================
   NOIRÉ FASHION STORE
========================= */

const products = [
    {
        id: 1,
        name: "Sculpted Black Dress",
        price: 2899,
        category: "women",
        description: "A structured silhouette designed for effortless evening styling."
    },
    {
        id: 2,
        name: "Relaxed Overshirt",
        price: 2499,
        category: "men",
        description: "A relaxed everyday layer with a clean contemporary silhouette."
    },
    {
        id: 3,
        name: "Satin Slip Dress",
        price: 3199,
        category: "women",
        description: "A fluid satin-inspired silhouette made for after-dark moments."
    },
    {
        id: 4,
        name: "Minimal Polo",
        price: 1799,
        category: "men",
        description: "A refined essential for a clean and understated wardrobe."
    },
    {
        id: 5,
        name: "Structured Handbag",
        price: 2299,
        category: "accessories",
        description: "A structured everyday handbag with a minimal NOIRÉ finish."
    },
    {
        id: 6,
        name: "Statement Sunglasses",
        price: 1299,
        category: "accessories",
        description: "Bold frames designed to complete your everyday look."
    }
];


let cart = [];
let wishlist = [];


/* =========================
   ELEMENTS
========================= */

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const wishlistCount = document.getElementById("wishlistCount");

const toast = document.getElementById("toast");

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

const quickModal = document.getElementById("quickModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalAdd = document.getElementById("modalAdd");

let currentModalProduct = null;


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}


/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =========================
   CART
========================= */

function addToCart(product) {

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    showToast(`${product.name} added to your bag.`);
}


function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}


function updateCart() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your bag is currently empty.
            </div>
        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach(item => {

            const div = document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>
                        ${formatPrice(item.price)}
                        × ${item.quantity}
                    </p>
                </div>

                <button
                    class="remove-item"
                    data-id="${item.id}"
                >
                    Remove
                </button>
            `;

            cartItems.appendChild(div);

        });
    }


    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartTotal.textContent = formatPrice(total);
}


/* =========================
   OPEN CART
========================= */

function openCart() {

    cartDrawer.classList.add("active");
    overlay.classList.add("active");

}

function closeCartDrawer() {

    cartDrawer.classList.remove("active");
    overlay.classList.remove("active");

}

cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartDrawer);

overlay.addEventListener("click", closeCartDrawer);


/* =========================
   REMOVE CART ITEM
========================= */

cartItems.addEventListener("click", event => {

    if (
        event.target.classList.contains("remove-item")
    ) {

        const id = Number(
            event.target.dataset.id
        );

        removeFromCart(id);
    }

});


/* =========================
   PRODUCT HEARTS
========================= */

document.querySelectorAll(".heart-btn").forEach((button, index) => {

    button.addEventListener("click", () => {

        const product = products[index];

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {

            wishlist.push(product);

            showToast("Added to wishlist.");

        } else {

            wishlist = wishlist.filter(
                item => item.id !== product.id
            );

            showToast("Removed from wishlist.");

        }

        wishlistCount.textContent = wishlist.length;

    });

});


/* =========================
   QUICK VIEW
========================= */

document.querySelectorAll(".quick-btn").forEach((button, index) => {

    button.addEventListener("click", () => {

        const product = products[index];

        currentModalProduct = product;

        modalTitle.textContent = product.name;

        modalDescription.textContent =
            product.description;

        modalPrice.textContent =
            formatPrice(product.price);

        quickModal.classList.add("active");

    });

});


closeModal.addEventListener("click", () => {

    quickModal.classList.remove("active");

});


quickModal.addEventListener("click", event => {

    if (event.target === quickModal) {

        quickModal.classList.remove("active");

    }

});


modalAdd.addEventListener("click", () => {

    if (currentModalProduct) {

        addToCart(currentModalProduct);

        quickModal.classList.remove("active");

        openCart();

    }

});


/* =========================
   FILTERS
========================= */

const filters = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn =>
            btn.classList.remove("active")
        );

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;

        productCards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                selected === "all" ||
                category === selected
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================
   SEARCH
========================= */

searchBtn.addEventListener("click", () => {

    searchPanel.classList.add("active");

    searchInput.focus();

});


closeSearch.addEventListener("click", () => {

    searchPanel.classList.remove("active");

    searchInput.value = "";

    productCards.forEach(card => {
        card.style.display = "";
    });

});


searchInput.addEventListener("input", () => {

    const query =
        searchInput.value.toLowerCase().trim();

    productCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        if (
            query === "" ||
            name.includes(query)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


/* =========================
   VIEW ALL
========================= */

document.getElementById("viewAllBtn")
    .addEventListener("click", () => {

        productCards.forEach(card => {
            card.style.display = "";
        });

        filters.forEach(btn =>
            btn.classList.remove("active")
        );

        document
            .querySelector('[data-filter="all"]')
            .classList.add("active");

        document
            .getElementById("new")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================
   NEWSLETTER
========================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        if (!email) {
            showToast("Please enter your email.");
            return;
        }

        showToast(
            "You're subscribed to NOIRÉ."
        );

        event.target.reset();

    });


/* =========================
   CHECKOUT
========================= */

document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your bag is empty.");

            return;
        }

        showToast(
            "Demo checkout — payment is not connected."
        );

    });


/* =========================
   MOBILE MENU
========================= */

const menuBtn =
    document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {

    const nav =
        document.querySelector(".nav-links");

    nav.style.display =
        nav.style.display === "flex"
            ? ""
            : "flex";

    if (nav.style.display === "flex") {

        nav.style.position = "absolute";
        nav.style.top = "82px";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.background = "#f4efe7";
        nav.style.padding = "25px";
        nav.style.flexDirection = "column";
        nav.style.gap = "20px";
        nav.style.borderBottom =
            "1px solid #ddd";

    }

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        quickModal.classList.remove("active");

        closeCartDrawer();

        searchPanel.classList.remove("active");

    }

});


/* INITIAL */

updateCart();
