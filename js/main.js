// ========== GLOBAL VARIABLES ==========
let currentUser = null;
let users = [];
let products = [];
let categories = [];
let cart = [];
let orders = [];
let faq = [];

// ========== DATA INITIALIZATION ==========
function loadFromLocalStorage() {
    console.log('Loading from localStorage...');

    // Load users
    const savedUsers = localStorage.getItem('yiopatre-users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
        console.log('Loaded users:', users.length);

        // Ensure admin user exists
        const adminExists = users.find(u => u.email === 'admin@yiopatretruck.com');
        if (!adminExists) {
            console.log('Admin user missing, recreating...');
            users.push({
                id: 1,
                email: 'admin@yiopatretruck.com',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                phone: '+1 (555) 123-4567',
                joined: '2024-01-01',
                isAdmin: true,
                addresses: []
            });
            localStorage.setItem('yiopatre-users', JSON.stringify(users));
        }
    } else {
        // Create default users
        users = [
            {
                id: 1,
                email: 'admin@yiopatretruck.com',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                phone: '+1 (555) 123-4567',
                joined: '2024-01-01',
                isAdmin: true,
                addresses: []
            },
            {
                id: 2,
                email: 'user@test.com',
                password: 'user123',
                firstName: 'John',
                lastName: 'Doe',
                phone: '+1 (555) 987-6543',
                joined: '2024-01-15',
                isAdmin: false,
                addresses: []
            }
        ];
        console.log('Created default users:', users);
        localStorage.setItem('yiopatre-users', JSON.stringify(users));
    }

    // FIX: Always skip cached products so addSampleProducts() in products.js
    // loads the correct paths on every visit — no stale data survives
    localStorage.removeItem('yiopatre-products');
    console.log('Product cache cleared — fresh load from products.js');

    // Load cart (safe to keep cached)
    const savedCart = localStorage.getItem('yiopatre-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        // NOTE: updateCartCount() is in cart.js — only call it after DOM is ready
        console.log('Loaded cart:', cart.length, 'items');
    }

    // Load orders
    const savedOrders = localStorage.getItem('yiopatre-orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
        console.log('Loaded orders:', orders.length);
    }

    // Load current user
    const savedUser = localStorage.getItem('current-user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        console.log('Loaded current user:', currentUser.email);
    }
}

function createAdminUser() {
    console.log('Force creating admin user...');
    let adminExists = users.find(u => u.email === 'admin@yiopatretruck.com');
    if (adminExists) {
        showNotification('Admin user already exists', 'info');
        return;
    }
    const adminUser = {
        id: users.length + 1,
        email: 'admin@yiopatretruck.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1 (555) 123-4567',
        joined: new Date().toISOString().split('T')[0],
        isAdmin: true,
        addresses: []
    };
    users.push(adminUser);
    saveToLocalStorage();
    showNotification('Admin user created successfully!', 'success');
    setTimeout(() => { login('admin@yiopatretruck.com', 'admin123'); }, 1000);
}

function showAllUsers() {
    const userList = users.map((user, index) =>
        `${index + 1}. ${user.email} - ${user.firstName} ${user.lastName} ${user.isAdmin ? '(ADMIN)' : ''}`
    ).join('\n');
    alert(`Total Users: ${users.length}\n\n${userList}`);
}

function clearAndReset() {
    if (confirm('Clear all data and reset?')) {
        localStorage.clear();
        users = []; products = []; cart = []; currentUser = null;
        showNotification('All data cleared. Page will reload...', 'warning');
        setTimeout(() => { location.reload(); }, 1000);
    }
}

async function initializeData() {
    console.log('Initializing data...');

    // FIX: loadFromLocalStorage is called ONCE here only.
    // The bare loadFromLocalStorage() call at the bottom of the file
    // was removed — it ran before cart.js loaded, causing
    // "updateCartCount is not defined" errors.
    loadFromLocalStorage();

    // FIX: No fallback products — products.js handles seeding via
    // addSampleProducts() in its own DOMContentLoaded listener.
    // getFallbackProducts() used placeholder.com URLs that are
    // blocked on Vercel and had no real images.

    categories = [
        { id: 'Filters',      name: 'Filters',      icon: 'fas fa-filter',    count: 0 },
        { id: 'Brakes',       name: 'Brakes',        icon: 'fas fa-stop',      count: 0 },
        { id: 'Lights',       name: 'Lights',        icon: 'fas fa-lightbulb', count: 0 },
        { id: 'Engine',       name: 'Engine',        icon: 'fas fa-cog',       count: 0 },
        { id: 'Transmission', name: 'Transmission',  icon: 'fas fa-gears',     count: 0 },
        { id: 'Suspension',   name: 'Suspension',    icon: 'fas fa-square',    count: 0 },
        { id: 'Electrical',   name: 'Electrical',    icon: 'fas fa-bolt',      count: 0 },
        { id: 'Cooling',      name: 'Cooling',       icon: 'fas fa-snowflake', count: 0 },
        { id: 'Fuel System',  name: 'Fuel System',   icon: 'fas fa-gas-pump',  count: 0 },
        { id: 'Exhaust',      name: 'Exhaust',       icon: 'fas fa-wind',      count: 0 }
    ];

    updateCategoryCounts();
    updateAuthUI();

    // Now that DOM + all scripts are loaded, sync the cart badge
    if (typeof updateCartCount === 'function') updateCartCount();

    console.log('=== INITIALIZE DATA COMPLETE ===');
    console.log('Final products count:', products.length);
}

// ========== LOCAL STORAGE ==========
function saveToLocalStorage() {
    localStorage.setItem('yiopatre-users',    JSON.stringify(users));
    localStorage.setItem('yiopatre-products', JSON.stringify(products));
    localStorage.setItem('yiopatre-cart',     JSON.stringify(cart));
    localStorage.setItem('yiopatre-orders',   JSON.stringify(orders));
    if (currentUser) {
        localStorage.setItem('current-user', JSON.stringify(currentUser));
    }
    console.log('Data saved to localStorage');
}

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
    console.log('Showing page:', pageId);

    if ((pageId === 'profile' || pageId === 'orders') && !isLoggedIn()) {
        showNotification('Please login to access this page', 'error');
        showPage('auth');
        return;
    }

    if (pageId === 'admin' && !isAdmin()) {
        showNotification('Admin access required', 'error');
        showPage(isLoggedIn() ? 'home' : 'auth');
        return;
    }

    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));

    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) targetPage.classList.remove('hidden');

    const mainNav = document.getElementById('main-nav');
    if (mainNav) mainNav.classList.remove('active');

    window.location.hash = pageId;

    switch (pageId) {
        case 'home':       loadFeaturedProducts(); loadCategories();         break;
        case 'products':   loadAllProducts();      populateCategoryFilter(); break;
        case 'categories': loadAllCategories();                              break;
        case 'cart':       displayCartItems();                               break;
        case 'checkout':   displayCheckoutSummary(); setupPaymentToggle();   break;
        case 'orders':     loadUserOrders();                                 break;
        case 'support':    loadFAQ();                                        break;
        case 'auth':       switchAuthTab('login');                           break;
        case 'profile':    if (isLoggedIn()) loadProfileInfo();              break;
        case 'admin':      if (isAdmin())    loadAdminProductList();         break;
    }

    window.scrollTo(0, 0);
}

// ========== UTILITY ==========
function toggleMobileMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('active');
}

function isLoggedIn() { return currentUser !== null; }
function isAdmin()    { return currentUser && currentUser.isAdmin === true; }

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;min-width:280px;box-shadow:0 8px 24px rgba(0,0,0,0.15);';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}
        <button onclick="this.parentElement.remove()" style="float:right;background:none;border:none;cursor:pointer;font-size:1.1rem;">&times;</button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => { if (notification.parentElement) notification.remove(); }, 3000);
}

// ========== ADMIN FUNCTIONS ==========
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`admin-tab-${tab}`).style.display = 'block';
    event.target.classList.add('active');
}

function loadAdminProductList() {
    const listContainer = document.getElementById('admin-product-list');
    const countSpan     = document.getElementById('product-count');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    countSpan.textContent = products.length;

    products.forEach(product => {
        const productRow = document.createElement('div');
        productRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:12px;background:#f9f9f9;border-radius:8px;border:1px solid var(--border);margin-bottom:10px;';
        productRow.innerHTML = `
            <div style="flex:1;">
                <div style="font-weight:600;color:var(--secondary);font-size:1.1rem;">${product.name}</div>
                <div style="font-size:0.85rem;color:var(--gray);margin-top:5px;">
                    Ref: ${product.ref} | Category: ${product.category} | Stock: ${product.stock}
                </div>
                <div style="font-size:0.95rem;color:var(--primary);font-weight:700;margin-top:5px;">
                    ${product.price.toFixed(2)} MAD
                </div>
            </div>
            <div style="display:flex;gap:8px;">
                <button class="btn btn-secondary" onclick="editProduct(${product.id})" style="padding:6px 12px;font-size:0.85rem;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn" style="background:var(--danger);color:white;border:none;padding:6px 12px;font-size:0.85rem;cursor:pointer;border-radius:30px;" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        listContainer.appendChild(productRow);
    });

    const form = document.getElementById('admin-product-form');
    if (form && !form.dataset.listenerAdded) {
        form.addEventListener('submit', submitProduct);
        form.dataset.listenerAdded = 'true';
    }
}

function submitProduct(e) {
    e.preventDefault();
    const formMsg     = document.getElementById('admin-form-msg');
    const name        = document.getElementById('admin-name').value.trim();
    const ref         = document.getElementById('admin-ref').value.trim();
    const category    = document.getElementById('admin-category').value;
    const price       = parseFloat(document.getElementById('admin-price').value);
    const quantity    = parseInt(document.getElementById('admin-quantity').value);
    const image       = document.getElementById('admin-image').value.trim();
    const description = document.getElementById('admin-description').value.trim();

    if (!name || !ref || !category || !price || !image || !description) {
        showFormMessage(formMsg, 'Please fill in all required fields', 'error'); return;
    }
    if (price <= 0)   { showFormMessage(formMsg, 'Price must be greater than 0', 'error'); return; }
    if (quantity < 0) { showFormMessage(formMsg, 'Quantity cannot be negative', 'error');  return; }

    const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name, ref, category, price, image, description,
        stock: quantity, featured: false, brand: 'Yiopatre', warranty: 12
    };

    products.push(newProduct);
    saveToLocalStorage();
    showFormMessage(formMsg, `Product "${name}" added successfully!`, 'success');
    document.getElementById('admin-product-form').reset();
    loadAdminProductList();
    if (document.getElementById('featured-products')) loadFeaturedProducts();
    setTimeout(() => { formMsg.style.display = 'none'; }, 3000);
}

function showFormMessage(element, message, type) {
    element.textContent = message;
    element.style.display = 'block';
    element.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
    element.style.color      = type === 'success' ? '#155724' : '#721c24';
    element.style.border     = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveToLocalStorage();
        loadAdminProductList();
        showNotification('Product deleted successfully', 'success');
    }
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    document.getElementById('admin-name').value        = product.name;
    document.getElementById('admin-ref').value         = product.ref;
    document.getElementById('admin-category').value    = product.category;
    document.getElementById('admin-price').value       = product.price;
    document.getElementById('admin-quantity').value    = product.stock || 0;
    document.getElementById('admin-image').value       = product.image;
    document.getElementById('admin-description').value = product.description;
    switchAdminTab('add');
    showNotification('Edit the product details and click Add to update', 'info');
}

// ========== HELPERS ==========
function updateCategoryCounts() {
    if (categories && products) {
        categories.forEach(cat => {
            cat.count = products.filter(p => p.category === cat.name).length;
        });
    }
}

// ========== SCROLL-HIDE NAVBAR ==========
(function initScrollHide() {
    const header   = document.querySelector('.header');
    let lastScroll = 0;
    const THRESHOLD = 80;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= THRESHOLD) {
            header.classList.remove('header-hidden');
        } else if (currentScroll > lastScroll + 4) {
            header.classList.add('header-hidden');
        } else if (currentScroll < lastScroll - 4) {
            header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
    }, { passive: true });
})();

// ========== INITIALIZATION ==========
// initializeData runs once when the DOM + all scripts are ready.
// FIX: The duplicate bare loadFromLocalStorage() call that used to sit
// here has been REMOVED. It ran before cart.js was parsed, causing:
//   "ReferenceError: updateCartCount is not defined"
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeData);
} else {
    initializeData();
}

window.addEventListener('beforeunload', saveToLocalStorage);

window.onhashchange = function () {
    const hash = window.location.hash.substring(1);
    if (hash) showPage(hash);
};

// ========== GLOBAL EXPORTS ==========
window.updateCategoryCounts = updateCategoryCounts;
window.createAdminUser      = createAdminUser;
window.showAllUsers         = showAllUsers;
window.clearAndReset        = clearAndReset;
window.showPage             = showPage;
window.toggleMobileMenu     = toggleMobileMenu;
window.isLoggedIn           = isLoggedIn;
window.isAdmin              = isAdmin;
window.showNotification     = showNotification;
window.saveToLocalStorage   = saveToLocalStorage;

console.log('=== MAIN.JS READY ===');