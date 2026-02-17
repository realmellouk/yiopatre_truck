// ========== CART FUNCTIONS ==========
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (product.stock === 0) {
        showNotification('This product is out of stock!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showNotification(`Only ${product.stock} items available in stock!`, 'error');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    const cartBadge = document.getElementById('cart-badge');
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartBadge) cartBadge.textContent = totalItems;
}

function displayCartItems() {
    const container = document.getElementById('cart-container');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
                <button class="btn btn-primary mt-20" onclick="showPage('products')">
                    <i class="fas fa-shopping-cart"></i> Browse Products
                </button>
            </div>
        `;
        return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onclick="showProductDetail(${item.id})" style="cursor: pointer;">
                <div>
                    <h3 onclick="showProductDetail(${item.id})" style="cursor: pointer;">${item.name}</h3>
                    <p>Ref: ${item.ref}</p>
                    <p>${item.price.toFixed(2)} MAD each</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${item.stock}" onchange="updateQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div>
                    <h3>${itemTotal.toFixed(2)} MAD</h3>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    cartHTML += `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)} MAD</span>
            </div>
            <div class="summary-row">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)} MAD</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total:</span>
                <span>${total.toFixed(2)} MAD</span>
            </div>
            <button class="btn btn-primary mt-20" style="width: 100%;" onclick="showPage('checkout')">
                <i class="fas fa-lock"></i> Proceed to Checkout
            </button>
            <button class="btn btn-outline mt-10" style="width: 100%;" onclick="showPage('products')">
                <i class="fas fa-arrow-left"></i> Continue Shopping
            </button>
        </div>
    `;
    
    container.innerHTML = cartHTML;
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    newQuantity = parseInt(newQuantity);
    const product = products.find(p => p.id === productId);
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > product.stock) {
        showNotification(`Only ${product.stock} items available in stock!`, 'error');
        return;
    }
    
    item.quantity = newQuantity;
    displayCartItems();
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCartItems();
    updateCartCount();
}