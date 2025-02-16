document.addEventListener('DOMContentLoaded', () => {
    const rollNumberInput = document.getElementById('roll-number');
    const promoCodeInput = document.getElementById('promo-code');
    const applyDiscountBtn = document.getElementById('apply-discount');
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const totalDiscountDisplay = document.getElementById('total-discount');
    const totalPriceDisplay = document.getElementById('total-price');
    const placeOrderBtn = document.getElementById('place-order');

    const products = [
        { id: 1, name: 'Laptop', price: 100000 },
        { id: 2, name: 'Smartphone', price: 50000 },
        { id: 3, name: 'Headphones', price: 15000 },
        { id: 4, name: 'Tablet', price: 70000 }
    ];

    let cart = [];
    let discountPercentage = 0;
    let promoDiscount = 0;

    const getDiscountPercentage = (rollNumber) => {
        const parts = rollNumber.split('-');
        if (parts.length < 2) return 0;
        const afterDash = parts[1];

        if (!/^\d+$/.test(afterDash)) return 0; // Ensure it's numeric
        const len = afterDash.length;
        
        let discount = 0;
        if (len % 2 === 0) {
            // Even length → Take the middle two digits
            const mid1 = Math.floor(len / 2) - 1;
            discount = parseInt(afterDash[mid1] + afterDash[mid1 + 1]);
        } else {
            // Odd length → Take the center digit only
            discount = parseInt(afterDash[Math.floor(len / 2)]);
        }

        return Math.min(discount, 50); // Max discount 50%
    };

    const applyDiscount = () => {
        const rollNumber = rollNumberInput.value.trim();
        if (!rollNumber.includes('-')) {
            alert("Please enter a valid roll number.");
            return;
        }
        discountPercentage = getDiscountPercentage(rollNumber);
        const promoCode = promoCodeInput.value.trim();
        promoDiscount = promoCode === "EXTRA10" && cart.length >= 2 ? 10 : 0;
        updateCart();
    };

    const addToCart = (product) => {
        cart.push(product);
        updateCart();
    };

    const updateCart = () => {
        if (cart.length === 0) {
            cartList.innerHTML = "<li>No items in cart</li>";
            totalDiscountDisplay.textContent = "0%";
            totalPriceDisplay.textContent = "0 PKR";
            return;
        }

        const totalDiscount = Math.min(discountPercentage + promoDiscount, cart.length >= 2 ? 60 : 50);
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        const discountedPrice = totalPrice * (1 - totalDiscount / 100);

        cartList.innerHTML = cart.map((item, index) => `
            <li>
                ${item.name} - ${item.price} PKR
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            </li>
        `).join('');

        totalDiscountDisplay.textContent = `${totalDiscount}%`;
        totalPriceDisplay.textContent = `${discountedPrice.toFixed(2)} PKR`;
    };

    const renderProducts = () => {
        if (!productList) {
            console.error("Element with ID 'product-list' not found!");
            return;
        }
        productList.innerHTML = products.map(product => `
            <li>
                ${product.name} - ${product.price} PKR
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </li>
        `).join('');
    };

    const placeOrder = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Add products before placing an order.");
            return;
        }

        alert("✅ Order placed successfully!");
        cart = [];
        discountPercentage = 0;
        promoDiscount = 0;
        rollNumberInput.value = "";
        promoCodeInput.value = "";
        updateCart();
    };

    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) addToCart(product);
        }
    });

    cartList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.dataset.index);
            cart.splice(index, 1);
            updateCart();
        }
    });

    applyDiscountBtn.addEventListener('click', applyDiscount);
    placeOrderBtn.addEventListener('click', placeOrder);
    
    renderProducts();
});
