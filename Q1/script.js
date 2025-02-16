const products = [
    { 
        name: "Smartphone", 
        price: "$499", 
        image: "smartphone.png",
        description: "Flagship device with 120Hz AMOLED display and 108MP camera" 
    },
    { 
        name: "Laptop", 
        price: "$1299", 
        image: "Laptop.png",
        description: "Ultrabook with 4K OLED touchscreen and 32GB RAM" 
    },
    { 
        name: "Headphones", 
        price: "$299", 
        image: "headphones.png",
        description: "Premium noise cancellation with 40hr battery life" 
    }
];


function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <div class="price-tag">${product.price}</div>
            </div>
            <div class="card-back">
                <p>${product.description}</p>
                <button class="buy-btn" onclick="buyNow('${product.name}')">Buy Now →</button>
            </div>
        </div>
    `;
    return card;
}


function buyNow(productName) {
    const toast = document.createElement('div');
    toast.textContent = `✅ Added ${productName} to cart!`;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent);
        color: var(--dark);
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: var(--shadow);
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

const container = document.getElementById('product-container');
products.forEach(product => {
    container.appendChild(createProductCard(product));
});
