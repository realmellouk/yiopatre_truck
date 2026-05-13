// ========== PRODUCT FUNCTIONS ==========
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) {
        console.error('Featured container not found!');
        return;
    }

    console.log('Total products available:', products.length);

    if (!products || products.length === 0) {
        featuredContainer.innerHTML = '<p>' + t('no_products_available') + '</p>';
        return;
    }

    const featuredProducts = products.filter(p => p.featured).slice(0, 4);
    console.log('Featured products found:', featuredProducts.length);

    featuredContainer.innerHTML = '';
    featuredProducts.forEach(product => {
        featuredContainer.appendChild(createProductCard(product));
    });

    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p>' + t('no_featured_products') + '</p>';
    }
}

function loadAllProducts(filteredProducts = null) {
    const productsContainer = document.getElementById('all-products');
    if (!productsContainer) return;

    const productsToShow = filteredProducts || products;
    productsContainer.innerHTML = '';

    if (productsToShow.length === 0) {
        productsContainer.innerHTML = `
            <div class="text-center" style="grid-column: 1/-1; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray); margin-bottom: 20px;"></i>
                <h3>${t('no_products_found')}</h3>
                <p>${t('no_products_hint')}</p>
            </div>
        `;
        return;
    }

    productsToShow.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const stockStatus = product.stock > 10 ? t('stock_in') : product.stock > 0 ? t('stock_low') : t('stock_out');
    const stockClass = product.stock > 10 ? 'stock-in' : product.stock > 0 ? 'stock-low' : 'stock-out';

    card.innerHTML = `
        ${product.featured ? '<span class="product-badge">' + t('badge_featured') + '</span>' : ''}
        <img src="${product.image}" alt="${product.name}" class="product-image" onclick="showProductDetail(${product.id})">
        <div class="product-info">
            <div class="product-header">
                <div>
                    <h3 class="product-name" onclick="showProductDetail(${product.id})" style="cursor: pointer;">${product.name}</h3>
                    <p class="product-ref">${t('label_ref')}: ${product.ref}</p>
                </div>
                <div class="stock-status ${stockClass}">
                    <i class="fas fa-${product.stock > 0 ? 'check' : 'times'}"></i>
                    ${stockStatus}
                </div>
            </div>
            <span class="product-category">${product.category}</span>
            <p class="product-description">${product.description.substring(0, 100)}...</p>
            <div class="product-footer">
                <div>
                    <p class="product-price">${product.price.toFixed(2)} MAD</p>
                    <small>${product.brand || ''}</small>
                </div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                    <i class="fas fa-cart-plus"></i> ${t('btn_add_to_cart')}
                </button>
            </div>
        </div>
    `;

    return card;
}

function loadCategories() {
    const categoryGrid = document.getElementById('category-grid');
    if (!categoryGrid) return;

    updateCategoryCounts();

    categoryGrid.innerHTML = '';
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.count} ${t('products_suffix')}</p>
        `;
        card.onclick = () => {
            showPage('products');
            setTimeout(() => {
                const filter = document.getElementById('category-filter');
                if (filter) {
                    filter.value = category.id;
                    filterProducts();
                }
            }, 100);
        };
        categoryGrid.appendChild(card);
    });
}

function updateCategoryCounts() {
    categories.forEach(category => {
        category.count = products.filter(p => p.category === category.name).length;
    });
}

function loadAllCategories() {
    const allCategories = document.getElementById('all-categories');
    if (!allCategories) return;

    updateCategoryCounts();

    allCategories.innerHTML = '';
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.count} ${t('products_suffix')}</p>
        `;
        card.onclick = () => {
            showPage('products');
            setTimeout(() => {
                const filter = document.getElementById('category-filter');
                if (filter) {
                    filter.value = category.id;
                    filterProducts();
                }
            }, 100);
        };
        allCategories.appendChild(card);
    });
}

// ========== FILTER FUNCTIONS ==========
function populateCategoryFilter() {
    const filter = document.getElementById('category-filter');
    if (!filter) return;

    filter.innerHTML = '<option value="all">' + t('filter_all_categories') + '</option>';

    const uniqueCategories = [];
    products.forEach(product => {
        if (!uniqueCategories.includes(product.category)) {
            uniqueCategories.push(product.category);
        }
    });

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const stockFilter = document.getElementById('stock-filter').value;

    let filtered = products.filter(p =>
        p.price >= minPrice &&
        p.price <= maxPrice
    );

    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (stockFilter === 'in-stock') {
        filtered = filtered.filter(p => p.stock > 0);
    }

    loadAllProducts(filtered);
}

function sortProducts() {
    const sortBy = document.getElementById('sort-filter').value;
    let sorted = [...products];

    switch (sortBy) {
        case 'price-low':  sorted.sort((a, b) => a.price - b.price);                          break;
        case 'price-high': sorted.sort((a, b) => b.price - a.price);                          break;
        case 'name':       sorted.sort((a, b) => a.name.localeCompare(b.name));               break;
        case 'newest':     sorted.sort((a, b) => b.id - a.id);                                break;
        case 'featured':   sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    loadAllProducts(sorted);
}

function resetFilters() {
    document.getElementById('category-filter').value = 'all';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('stock-filter').value = 'all';
    document.getElementById('sort-filter').value = 'featured';
    loadAllProducts();
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.ref.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        (p.brand && p.brand.toLowerCase().includes(searchTerm)) ||
        p.description.toLowerCase().includes(searchTerm)
    );

    loadAllProducts(filtered);
}

// ========== REVIEWS HELPERS ==========
function getReviews(productId) {
    try { return JSON.parse(localStorage.getItem('reviews_' + productId) || '[]'); }
    catch(e) { return []; }
}

function saveReview(productId, review) {
    const reviews = getReviews(productId);
    reviews.unshift(review);
    localStorage.setItem('reviews_' + productId, JSON.stringify(reviews));
}

function renderStars(rating, size) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<i class="fas fa-star star-icon${i > rating ? ' empty' : ''}" style="font-size:${size || '0.9rem'}"></i>`;
    }
    return html;
}

function renderReviewsSection(productId) {
    const reviews = getReviews(productId);
    const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;
    const countLabel = reviews.length === 1 ? t('reviews_count_single') : t('reviews_count_plural');

    const summaryHTML = avg ? `
        <div class="reviews-summary">
            <div class="reviews-avg-score">${avg}</div>
            <div>
                <div class="reviews-avg-stars">${renderStars(Math.round(avg), '1.1rem')}</div>
                <div class="reviews-count">${reviews.length} ${countLabel}</div>
            </div>
        </div>` : '';

    const listHTML = reviews.length === 0
        ? `<div class="no-reviews"><i class="fas fa-comment-slash" style="margin-right:6px"></i>${t('reviews_no')}</div>`
        : `<div class="review-list" id="review-list-${productId}">
            ${reviews.map(r => `
                <div class="review-item">
                    <div class="review-item-header">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <span class="review-author"><i class="fas fa-user-circle" style="color:var(--primary)"></i> ${r.author}</span>
                            <div class="review-stars">${renderStars(r.rating)}</div>
                        </div>
                        <span class="review-date">${r.date}</span>
                    </div>
                    <p class="review-text">${r.text}</p>
                </div>`).join('')}
           </div>`;

    return `
        <div class="reviews-section">
            <h4><i class="fas fa-star" style="color:var(--primary)"></i> ${t('reviews_title')}</h4>
            ${summaryHTML}
            ${listHTML}
            <div class="review-form">
                <h5><i class="fas fa-pen"></i> ${t('review_write')}</h5>
                <input type="text" id="review-author-${productId}" placeholder="${t('review_name_placeholder')}" maxlength="40">
                <div class="star-rating-input" id="star-input-${productId}">
                    ${[1,2,3,4,5].map(n => `<button class="star-btn" data-val="${n}" onclick="setReviewStar(${productId},${n})">&#9733;</button>`).join('')}
                </div>
                <textarea id="review-text-${productId}" rows="3" placeholder="${t('review_text_placeholder')}"></textarea>
                <button class="btn-submit-review" onclick="submitReview(${productId})">
                    <i class="fas fa-paper-plane"></i> ${t('review_submit')}
                </button>
            </div>
        </div>`;
}

function setReviewStar(productId, value) {
    document.querySelectorAll(`#star-input-${productId} .star-btn`).forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.val) <= value);
    });
    document.getElementById(`star-input-${productId}`).dataset.selected = value;
}

function submitReview(productId) {
    const author = document.getElementById(`review-author-${productId}`).value.trim();
    const text   = document.getElementById(`review-text-${productId}`).value.trim();
    const rating = parseInt(document.getElementById(`star-input-${productId}`).dataset.selected || '0');

    if (!author) { showNotification(t('review_warn_name'), 'warning'); return; }
    if (!rating)  { showNotification(t('review_warn_rating'), 'warning'); return; }
    if (!text)    { showNotification(t('review_warn_text'), 'warning'); return; }

    const now = new Date();
    saveReview(productId, {
        author, rating, text,
        date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });

    const reviewsDiv = document.querySelector('.reviews-section');
    if (reviewsDiv) reviewsDiv.outerHTML = renderReviewsSection(productId);
    showNotification(t('review_success'), 'success');
}

// ========== PRODUCT DETAIL MODAL ==========
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const name = document.getElementById('modal-product-name');
    const content = document.getElementById('modal-product-content');

    name.textContent = product.name;

    const stockStatus = product.stock > 10 ? t('stock_in') : product.stock > 0 ? t('stock_low') : t('stock_out');
    const stockClass = product.stock > 10 ? 'stock-in' : product.stock > 0 ? 'stock-low' : 'stock-out';

    content.innerHTML = `
        <div class="checkout-grid">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; max-width: 100%; object-fit: contain; border-radius: 10px; margin-bottom: 20px; display: block;">
            </div>
            <div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>${product.price.toFixed(2)} MAD</h3>
                    <p class="${stockClass}"><i class="fas fa-${product.stock > 0 ? 'check' : 'times'}"></i> ${stockStatus}</p>
                    <p><strong>${t('label_reference')}</strong> ${product.ref}</p>
                    <p><strong>${t('label_brand')}</strong> ${product.brand || 'N/A'}</p>
                    <p><strong>${t('label_category')}</strong> ${product.category}</p>
                    ${product.warranty ? `<p><strong>${t('label_warranty')}</strong> ${product.warranty} ${t('warranty_months')}</p>` : ''}
                </div>
                <div style="margin-bottom: 20px;">
                    <h4>${t('label_description')}</h4>
                    <p>${product.description}</p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${product.id}); closeProductModal();" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> ${t('btn_add_cart_detail')}
                    </button>
                    <button class="btn btn-outline" onclick="closeProductModal()">
                        <i class="fas fa-times"></i> ${t('btn_close')}
                    </button>
                </div>
            </div>
        </div>
        ${renderReviewsSection(productId)}
    `;

    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// ========== SAMPLE REVIEWS ==========
function addSampleReviews() {
    const reviews = {
        1:  [
            { author: "Khalid M.", rating: 5, text: "Excellent filter, fits perfectly and noticeably improved engine performance. Will order again.", date: "12 Apr 2025" },
            { author: "Youssef B.", rating: 4, text: "Good quality for the price. Easy to install, been running for 3 months with no issues.", date: "02 Mar 2025" },
            { author: "Rachid T.", rating: 5, text: "Best air filter I've used on my truck. Highly recommend for dusty environments.", date: "18 Jan 2025" }
        ],
        6:  [
            { author: "Hassan A.", rating: 5, text: "Incredible stopping power. These pads handle highway loads without any fade.", date: "05 May 2025" },
            { author: "Omar F.", rating: 4, text: "Solid quality. Slight bedding-in noise the first week but then perfectly silent.", date: "14 Mar 2025" }
        ],
        11: [
            { author: "Nabil K.", rating: 5, text: "Night driving transformed completely. Very bright and well-aimed beam pattern.", date: "20 Apr 2025" },
            { author: "Amine S.", rating: 5, text: "Easy to swap in, no coding needed. Build quality feels very premium.", date: "08 Feb 2025" },
            { author: "Tariq H.", rating: 3, text: "Good lights but one of the connectors needed a slight trim to fit properly.", date: "27 Jan 2025" }
        ],
        16: [
            { author: "Mourad L.", rating: 5, text: "Perfect OEM replacement. Boost pressure back to factory spec after install.", date: "01 May 2025" },
            { author: "Samir D.", rating: 4, text: "Quality part, shipping was fast. Had it installed by my mechanic with zero issues.", date: "11 Apr 2025" }
        ],
        21: [
            { author: "Abdelhak R.", rating: 5, text: "Completely transformed the feel of the transmission. Very smooth engagement.", date: "03 May 2025" },
            { author: "Karim N.", rating: 4, text: "Good kit, everything included. Takes some break-in time but well worth it.", date: "19 Mar 2025" },
            { author: "Fouad Z.", rating: 5, text: "Been running 6 months hard use — no slip, no chatter. Excellent product.", date: "22 Feb 2025" }
        ],
        26: [
            { author: "Bilal O.", rating: 5, text: "Ride quality is night and day. These springs handle full load beautifully.", date: "30 Apr 2025" },
            { author: "Mehdi C.", rating: 4, text: "Good product, holds pressure well. Installation took about 2 hours.", date: "15 Feb 2025" }
        ],
        31: [
            { author: "Adil Y.", rating: 5, text: "Cranks the engine in cold mornings without hesitation. Solid battery.", date: "28 Apr 2025" },
            { author: "Reda M.", rating: 5, text: "Already on my second one from this brand — they last a long time.", date: "10 Jan 2025" }
        ],
        36: [
            { author: "Hicham B.", rating: 5, text: "No more overheating on mountain routes. This radiator is a beast.", date: "22 Apr 2025" },
            { author: "Soufiane A.", rating: 4, text: "Great build quality, all fittings lined up perfectly on my truck.", date: "05 Mar 2025" }
        ],
        41: [
            { author: "Zakaria E.", rating: 5, text: "Restored full power to my truck. Genuine quality, runs like new.", date: "18 Apr 2025" },
            { author: "Imad T.", rating: 4, text: "Took a professional to calibrate but the pump itself is top notch.", date: "02 Apr 2025" }
        ],
        46: [
            { author: "Othmane K.", rating: 5, text: "Great sound and noticeably better exhaust flow. Well worth the price.", date: "10 May 2025" },
            { author: "Yassine F.", rating: 5, text: "Perfect fit, welds look clean, finish is holding up well after 4 months.", date: "27 Mar 2025" },
            { author: "Hamza P.", rating: 4, text: "Good system overall. One clamp needed a slight adjustment but easy fix.", date: "14 Feb 2025" }
        ]
    };
    Object.entries(reviews).forEach(([id, list]) => {
        if (!localStorage.getItem('reviews_' + id)) {
            localStorage.setItem('reviews_' + id, JSON.stringify(list));
        }
    });
}

// ========== SAMPLE PRODUCTS ==========
function addSampleProducts() {
    if (products.length === 0) {
        console.log('Adding sample products...');

        // ⚠️  ALL image paths must be "images/filename.ext"
        // ⚠️  No spaces in filenames — "clutch3.jpg" not "clutch 3.jpg"
        // ⚠️  Case matters on Linux/Vercel — "exhaust1.jpg" not "Exhaust1.jpg"
        const sampleProducts = [
            // ── FILTERS ──────────────────────────────────────────────
            {
                id: 1, name: "Heavy Duty Air Filter", ref: "AF-HD900",
                category: "Filters", brand: "MANN-FILTER", price: 599.00, stock: 40,
                featured: true, warranty: 6,
                image: "images/filter1.jpg",
                description: "Heavy-duty air filter providing maximum engine protection in dusty environments. Designed for commercial trucks."
            },
            {
                id: 2, name: "Fuel Water Separator Filter", ref: "FWS-750",
                category: "Filters", brand: "Baldwin", price: 895.00, stock: 25,
                featured: false, warranty: 12,
                image: "images/filter2.jpg",
                description: "Advanced fuel filtration system with water separation for diesel engines."
            },
            {
                id: 3, name: "High Performance Oil Filter", ref: "OF-HP550",
                category: "Filters", brand: "Fleetguard", price: 427.00, stock: 60,
                featured: false, warranty: 12,
                image: "images/filter3.jpg",
                description: "Premium oil filter with synthetic media for extended service intervals."
            },
            {
                id: 4, name: "Cabin Air Filter", ref: "CAF-300",
                category: "Filters", brand: "WIX", price: 360.00, stock: 35,
                featured: false, warranty: 6,
                image: "images/filter4.jpg",
                description: "HEPA cabin air filter for improved air quality in truck cabins."
            },
            {
                id: 5, name: "Hydraulic Filter Kit", ref: "HFK-8800",
                category: "Filters", brand: "Donaldson", price: 1250.00, stock: 15,
                featured: false, warranty: 12,
                image: "images/filter5.jpg",
                description: "Complete hydraulic filtration kit for heavy equipment and trucks."
            },
            // ── BRAKES ───────────────────────────────────────────────
            {
                id: 6, name: "Heavy Duty Brake Pad Set", ref: "BP-HD880",
                category: "Brakes", brand: "Meritor", price: 2899.00, stock: 30,
                featured: true, warranty: 24,
                image: "images/brake1.jpg",
                description: "Ceramic brake pads for commercial trucks with extended lifespan."
            },
            {
                id: 7, name: "Air Brake Chamber", ref: "ABC-XL30",
                category: "Brakes", brand: "Bendix", price: 1455.00, stock: 40,
                featured: false, warranty: 18,
                image: "images/brake2.jpg",
                description: "Reliable air brake chamber for heavy-duty truck applications."
            },
            {
                id: 8, name: "Brake Rotor Pair", ref: "BRP-8500",
                category: "Brakes", brand: "Eaton", price: 4200.00, stock: 18,
                featured: false, warranty: 24,
                image: "images/brake3.jpg",
                description: "Vented brake rotors designed for high-temperature heavy-duty use."
            },
            {
                id: 9, name: "Brake Caliper Assembly", ref: "BCA-7765",
                category: "Brakes", brand: "Knorr-Bremse", price: 3257.00, stock: 22,
                featured: false, warranty: 12,
                image: "images/brake4.jpg",
                description: "Complete brake caliper assembly with mounting hardware."
            },
            {
                id: 10, name: "ABS Sensor", ref: "ABS-T45",
                category: "Brakes", brand: "WABCO", price: 899.00, stock: 50,
                featured: false, warranty: 12,
                image: "images/brake5.jpg",
                description: "Wheel speed sensor for anti-lock braking systems."
            },
            // ── LIGHTS ───────────────────────────────────────────────
            {
                id: 11, name: "LED Headlight Pair", ref: "LED-HL900",
                category: "Lights", brand: "Peterson", price: 1999.00, stock: 45,
                featured: true, warranty: 36,
                image: "images/light1.jpg",
                description: "Bright LED headlights with 10,000 lumens output for improved visibility."
            },
            {
                id: 12, name: "LED Work Light Bar", ref: "WL-50IN",
                category: "Lights", brand: "Rigid Industries", price: 4500.00, stock: 20,
                featured: false, warranty: 60,
                image: "images/light2.jpg",
                description: "50-inch LED light bar with spot/flood combo pattern."
            },
            {
                id: 13, name: "LED Tail Light Assembly", ref: "TL-LED88",
                category: "Lights", brand: "Grote", price: 1655.00, stock: 35,
                featured: false, warranty: 24,
                image: "images/light3.jpg",
                description: "Complete LED tail light assembly with stop, turn, and reverse functions."
            },
            {
                id: 14, name: "LED Marker Light Set", ref: "ML-SET10",
                category: "Lights", brand: "Truck-Lite", price: 752.50, stock: 60,
                featured: false, warranty: 36,
                image: "images/light4.jpg",
                description: "Set of 10 LED clearance and marker lights with mounting hardware."
            },
            {
                id: 15, name: "LED Fog Light Kit", ref: "FL-KIT22",
                category: "Lights", brand: "KC HiLites", price: 1899.99, stock: 25,
                featured: false, warranty: 24,
                image: "images/light5.jpg",
                description: "High-performance LED fog light kit with mounting brackets."
            },
            // ── ENGINE ───────────────────────────────────────────────
            {
                id: 16, name: "Turbocharger Assembly", ref: "TURBO-ISX15",
                category: "Engine", brand: "Cummins", price: 24500.00, stock: 8,
                featured: true, warranty: 24,
                image: "images/turbo1.jpg",
                description: "Complete turbocharger assembly for Cummins ISX15 engine."
            },
            {
                id: 17, name: "Heavy Duty Alternator", ref: "ALT-270A",
                category: "Engine", brand: "Delco Remy", price: 4857.50, stock: 25,
                featured: false, warranty: 18,
                image: "images/turbo2.jpg",
                description: "270-amp heavy duty alternator for commercial vehicles."
            },
            {
                id: 18, name: "Water Pump", ref: "WP-M11",
                category: "Engine", brand: "Mack", price: 3255.00, stock: 30,
                featured: false, warranty: 12,
                image: "images/turbo3.jpg",
                description: "Heavy duty water pump for Mack M11 engine applications."
            },
            {
                id: 19, name: "Glow Plug Set", ref: "GP-SET8",
                category: "Engine", brand: "Beru", price: 1455.00, stock: 45,
                featured: false, warranty: 12,
                image: "images/plug4.jpg",
                description: "Set of 8 glow plugs for diesel engine cold starts."
            },
            {
                id: 20, name: "Engine Mount Kit", ref: "EMK-4400",
                category: "Engine", brand: "Vibratech", price: 4202.50, stock: 18,
                featured: false, warranty: 24,
                image: "images/turbo4.jpg",
                description: "Complete engine mount kit for heavy-duty vibration reduction."
            },
            // ── TRANSMISSION ─────────────────────────────────────────
            {
                id: 21, name: "Heavy Duty Clutch Kit", ref: "CLUTCH-FS6606",
                category: "Transmission", brand: "Eaton", price: 8500.00, stock: 15,
                featured: true, warranty: 24,
                image: "images/clutch1.jpg",
                description: "Complete clutch kit for heavy-duty truck transmissions."
            },
            {
                id: 22, name: "Transmission Filter Kit", ref: "TFK-ALLISON",
                category: "Transmission", brand: "Allison", price: 955.00, stock: 40,
                featured: false, warranty: 12,
                image: "images/clutch2.jpg",
                description: "Transmission filter and gasket kit for Allison transmissions."
            },
            {
                id: 23, name: "U-Joint Kit", ref: "UJ-1880",
                category: "Transmission", brand: "Spicer", price: 1655.00, stock: 35,
                featured: false, warranty: 12,
                image: "images/clutch3.jpg",    // ← was "clutch 3.jpg" (space removed)
                description: "Heavy duty universal joint kit for driveline applications."
            },
            {
                id: 24, name: "Transmission Mount", ref: "TM-7765",
                category: "Transmission", brand: "Energy Suspension", price: 899.00, stock: 50,
                featured: false, warranty: 24,
                image: "images/clutch4.jpg",
                description: "Polyurethane transmission mount for reduced movement."
            },
            {
                id: 25, name: "Shift Fork Assembly", ref: "SFA-13SP",
                category: "Transmission", brand: "Fuller", price: 3250.00, stock: 12,
                featured: false, warranty: 12,
                image: "images/clutch5.jpg",
                description: "Shift fork assembly for 13-speed manual transmissions."
            },
            // ── SUSPENSION ───────────────────────────────────────────
            {
                id: 26, name: "Air Spring Assembly", ref: "AIR-8800",
                category: "Suspension", brand: "Firestone", price: 3850.00, stock: 30,
                featured: true, warranty: 24,
                image: "images/air1.jpg",
                description: "Heavy duty air spring assembly for truck suspension systems."
            },
            {
                id: 27, name: "Leaf Spring Set", ref: "LS-35000",
                category: "Suspension", brand: "Hendrickson", price: 12500.00, stock: 10,
                featured: false, warranty: 36,
                image: "images/air2.png",
                description: "Complete leaf spring set for tandem axle trucks."
            },
            {
                id: 28, name: "Shock Absorber Pair", ref: "SHOCK-MT45",
                category: "Suspension", brand: "Monroe", price: 2255.00, stock: 40,
                featured: false, warranty: 24,
                image: "images/air3.jpg",
                description: "Heavy duty shock absorbers for commercial vehicle applications."
            },
            {
                id: 29, name: "Track Bar Assembly", ref: "TB-7765",
                category: "Suspension", brand: "Daystar", price: 1899.99, stock: 25,
                featured: false, warranty: 12,
                image: "images/air4.jpg",
                description: "Adjustable track bar for improved axle alignment."
            },
            {
                id: 30, name: "Suspension Bushings Kit", ref: "SBK-FULL",
                category: "Suspension", brand: "Energy Suspension", price: 1455.00, stock: 35,
                featured: false, warranty: 24,
                image: "images/air5.jpg",
                description: "Complete polyurethane suspension bushing kit."
            },
            // ── ELECTRICAL ───────────────────────────────────────────
            {
                id: 31, name: "Heavy Duty Battery", ref: "BATT-31HD",
                category: "Electrical", brand: "Interstate", price: 2899.99, stock: 50,
                featured: true, warranty: 36,
                image: "images/battery1.jpg",
                description: "Group 31 heavy duty commercial truck battery with 950 CCA."
            },
            {
                id: 32, name: "Starter Motor", ref: "STARTER-DD15",
                category: "Electrical", brand: "Bosch", price: 5250.00, stock: 18,
                featured: false, warranty: 24,
                image: "images/battery2.png",
                description: "High torque starter motor for Detroit Diesel DD15 engines."
            },
            {
                id: 33, name: "Wiring Harness", ref: "WH-TRUCK",
                category: "Electrical", brand: "Painless Performance", price: 4507.50, stock: 12,
                featured: false, warranty: 12,
                image: "images/battery3.jpg",
                description: "Complete 12-circuit wiring harness for truck electrical systems."
            },
            {
                id: 34, name: "Circuit Breaker Panel", ref: "CBP-16",
                category: "Electrical", brand: "Blue Sea Systems", price: 1899.50, stock: 30,
                featured: false, warranty: 24,
                image: "images/battery4.jpg",
                description: "16-circuit breaker panel with waterproof cover."
            },
            {
                id: 35, name: "Voltage Regulator", ref: "VR-28SI",
                category: "Electrical", brand: "Leece Neville", price: 955.00, stock: 45,
                featured: false, warranty: 12,
                image: "images/battery5.jpg",
                description: "External voltage regulator for 28SI series alternators."
            },
            // ── COOLING ──────────────────────────────────────────────
            {
                id: 36, name: "Heavy Duty Radiator", ref: "RAD-HD400",
                category: "Cooling", brand: "Mishimoto", price: 12500.00, stock: 10,
                featured: true, warranty: 36,
                image: "images/fan1.jpg",
                description: "Aluminum heavy duty radiator for commercial truck applications."
            },
            {
                id: 37, name: "Intercooler Assembly", ref: "IC-ISX15",
                category: "Cooling", brand: "Banks Power", price: 8500.00, stock: 15,
                featured: false, warranty: 24,
                image: "images/fan2.jpg",
                description: "High efficiency intercooler for Cummins ISX15 engines."
            },
            {
                id: 38, name: "Coolant Reservoir", ref: "CR-5GAL",
                category: "Cooling", brand: "Spectra Premium", price: 1455.00, stock: 35,
                featured: false, warranty: 12,
                image: "images/fan3.jpg",
                description: "5-gallon coolant overflow reservoir with mounting brackets."
            },
            {
                id: 39, name: "Radiator Fan Clutch", ref: "FC-VISCO",
                category: "Cooling", brand: "Horton", price: 3250.00, stock: 25,
                featured: false, warranty: 12,
                image: "images/fan4.jpg",
                description: "Viscous fan clutch for heavy duty cooling systems."
            },
            {
                id: 40, name: "Cooling Fan Assembly", ref: "FAN-38IN",
                category: "Cooling", brand: "Flex-a-lite", price: 4202.50, stock: 20,
                featured: false, warranty: 24,
                image: "images/fan5.jpg",
                description: "38-inch electric cooling fan with shroud assembly."
            },
            // ── FUEL SYSTEM ──────────────────────────────────────────
            {
                id: 41, name: "Fuel Injection Pump", ref: "FIP-P7100",
                category: "Fuel System", brand: "Bosch", price: 18500.00, stock: 8,
                featured: true, warranty: 24,
                image: "images/fuel1.jpg",
                description: "P7100 fuel injection pump for Cummins diesel engines."
            },
            {
                id: 42, name: "Fuel Tank", ref: "FT-100GAL",
                category: "Fuel System", brand: "Transfer Flow", price: 9507.50, stock: 12,
                featured: false, warranty: 60,
                image: "images/fuel2.jpg",
                description: "100-gallon aluminum fuel tank with mounting hardware."
            },
            {
                id: 43, name: "Fuel Injector Set", ref: "INJ-SET6",
                category: "Fuel System", brand: "Denso", price: 12500.50, stock: 15,
                featured: false, warranty: 24,
                image: "images/fuel3.png",
                description: "Set of 6 remanufactured fuel injectors for diesel engines."
            },
            {
                id: 44, name: "Fuel Lines Kit", ref: "FLK-COMPLETE",
                category: "Fuel System", brand: "Russell", price: 2899.99, stock: 25,
                featured: false, warranty: 12,
                image: "images/fuel4.jpg",
                description: "Complete stainless steel braided fuel line kit."
            },
            {
                id: 45, name: "Fuel Cap Assembly", ref: "FC-LOCKING",
                category: "Fuel System", brand: "Stant", price: 457.50, stock: 60,
                featured: false, warranty: 12,
                image: "images/fuel5.jpg",
                description: "Locking fuel cap with tether for commercial vehicles."
            },
            // ── EXHAUST ──────────────────────────────────────────────
            {
                id: 46, name: "Performance Exhaust System", ref: "EXH-5IN",
                category: "Exhaust", brand: "MagnaFlow", price: 12500.00, stock: 15,
                featured: true, warranty: 60,
                image: "images/exhaust1.jpg",   // ← was "Exhaust1.jpg" (lowercase)
                description: "5-inch aluminized performance exhaust system for trucks."
            },
            {
                id: 47, name: "Diesel Particulate Filter", ref: "DPF-DD15",
                category: "Exhaust", brand: "Donaldson", price: 28500.00, stock: 8,
                featured: false, warranty: 24,
                image: "images/exhaust2.jpg",   // ← lowercase
                description: "EPA compliant DPF filter for Detroit Diesel DD15 engines."
            },
            {
                id: 48, name: "Exhaust Manifold", ref: "EM-CAT15",
                category: "Exhaust", brand: "Banks Power", price: 6507.50, stock: 20,
                featured: false, warranty: 24,
                image: "images/exhaust3.jpg",   // ← lowercase
                description: "High-flow exhaust manifold for Caterpillar C15 engines."
            },
            {
                id: 49, name: "Muffler Assembly", ref: "MUFF-8IN",
                category: "Exhaust", brand: "Walker", price: 3250.00, stock: 30,
                featured: false, warranty: 36,
                image: "images/exhaust4.jpg",   // ← lowercase
                description: "8-inch round heavy duty muffler for commercial trucks."
            },
            {
                id: 50, name: "Exhaust Clamp Kit", ref: "ECK-10PK",
                category: "Exhaust", brand: "Bandclamp", price: 899.99, stock: 50,
                featured: false, warranty: 12,
                image: "images/exhaust5.jpg",   // ← lowercase
                description: "Kit of 10 heavy duty band clamps for exhaust systems."
            }
        ];

        products.push(...sampleProducts);
        saveToLocalStorage();
        addSampleReviews();

        console.log('✅ Added', sampleProducts.length, 'sample products');
        showNotification('Sample products loaded successfully!', 'success');

        if (document.getElementById('featured-products')) loadFeaturedProducts();
        if (document.getElementById('all-products'))      loadAllProducts();

        return true;
    }

    return false;
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchProducts();
            }
        });
    }

    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeProductModal();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeProductModal();
    });

    setTimeout(() => {
        if (products.length === 0) {
            console.log('No products found, auto-adding samples...');
            addSampleProducts();
        }
    }, 1000);
});

// ========== GLOBAL EXPORTS ==========
window.addSampleProducts    = addSampleProducts;
window.setReviewStar        = setReviewStar;
window.submitReview         = submitReview;
window.updateCategoryCounts = updateCategoryCounts;