// ========== PRODUCT FUNCTIONS ==========
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) {
        console.error('Featured container not found!');
        return;
    }
    
    console.log('Total products available:', products.length);
    console.log('Products array:', products);
    
    if (!products || products.length === 0) {
        featuredContainer.innerHTML = '<p>No products available. Please check data loading.</p>';
        return;
    }
    
    const featuredProducts = products.filter(p => p.featured).slice(0, 4);
    console.log('Featured products found:', featuredProducts.length);
    
    featuredContainer.innerHTML = '';
    featuredProducts.forEach(product => {
        featuredContainer.appendChild(createProductCard(product));
    });
    
    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p>No featured products available.</p>';
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
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
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
    
    const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';
    const stockClass = product.stock > 10 ? 'stock-in' : product.stock > 0 ? 'stock-low' : 'stock-out';
    
    card.innerHTML = `
        ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
        <img src="${product.image}" alt="${product.name}" class="product-image" onclick="showProductDetail(${product.id})">
        <div class="product-info">
            <div class="product-header">
                <div>
                    <h3 class="product-name" onclick="showProductDetail(${product.id})" style="cursor: pointer;">${product.name}</h3>
                    <p class="product-ref">Ref: ${product.ref}</p>
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
                    <i class="fas fa-cart-plus"></i> Add
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function loadCategories() {
    const categoryGrid = document.getElementById('category-grid');
    if (!categoryGrid) return;
    
    // Update category counts based on actual products
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
            <p>${category.count} products</p>
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
    
    // Update category counts
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
            <p>${category.count} products</p>
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
    
    filter.innerHTML = '<option value="all">All Categories</option>';
    
    // Get unique categories from products
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
    
    // Category filtering
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
    
    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            sorted.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
            // Featured products first, then others
            sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
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

// ========== PRODUCT DETAIL MODAL ==========
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const name = document.getElementById('modal-product-name');
    const content = document.getElementById('modal-product-content');
    
    name.textContent = product.name;
    
    const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';
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
                    <p><strong>Reference:</strong> ${product.ref}</p>
                    <p><strong>Brand:</strong> ${product.brand || 'N/A'}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    ${product.warranty ? `<p><strong>Warranty:</strong> ${product.warranty} months</p>` : ''}
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4>Description</h4>
                    <p>${product.description}</p>
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${product.id}); closeProductModal();" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="closeProductModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// ========== ADD SAMPLE PRODUCTS FUNCTION ==========
function addSampleProducts() {
    // Only add if no products exist
    if (products.length === 0) {
        console.log('Adding sample products...');
        
        const sampleProducts =[
    {
        id: 1,
        name: "Heavy Duty Air Filter",
        ref: "AF-HD900",
        category: "Filters",
        brand: "MANN-FILTER",
        price: 599.00,
        stock: 40,
        featured: true,
        image: "images/filter1.jpg",
        description: "Heavy-duty air filter providing maximum engine protection in dusty environments. Designed for commercial trucks.",
        warranty: 6
    },
    {
        id: 2,
        name: "Fuel Water Separator Filter",
        ref: "FWS-750",
        category: "Filters",
        brand: "Baldwin",
        price: 895.00,
        stock: 25,
        featured: false,
        image: "images/filter2.jpg",
        description: "Advanced fuel filtration system with water separation for diesel engines.",
        warranty: 12
    },
    {
        id: 3,
        name: "High Performance Oil Filter",
        ref: "OF-HP550",
        category: "Filters",
        brand: "Fleetguard",
        price: 427.00,
        stock: 60,
        featured: false,
        image: "images/filter3.jpg",
        description: "Premium oil filter with synthetic media for extended service intervals.",
        warranty: 12
    },
    {
        id: 4,
        name: "Cabin Air Filter",
        ref: "CAF-300",
        category: "Filters",
        brand: "WIX",
        price: 360.00,
        stock: 35,
        featured: false,
        image: "images/filter4.jpg",
        description: "HEPA cabin air filter for improved air quality in truck cabins.",
        warranty: 6
    },
    {
        id: 5,
        name: "Hydraulic Filter Kit",
        ref: "HFK-8800",
        category: "Filters",
        brand: "Donaldson",
        price: 1250.00,
        stock: 15,
        featured: false,
        image: "images/filter5.jpg",
        description: "Complete hydraulic filtration kit for heavy equipment and trucks.",
        warranty: 12
    },
    {
        id: 6,
        name: "Heavy Duty Brake Pad Set",
        ref: "BP-HD880",
        category: "Brakes",
        brand: "Meritor",
        price: 2899.00,
        stock: 30,
        featured: true,
        image: "images/brake1.jpg",
        description: "Ceramic brake pads for commercial trucks with extended lifespan.",
        warranty: 24
    },
    {
        id: 7,
        name: "Air Brake Chamber",
        ref: "ABC-XL30",
        category: "Brakes",
        brand: "Bendix",
        price: 1455.00,
        stock: 40,
        featured: false,
        image: "images/brake2.jpg",
        description: "Reliable air brake chamber for heavy-duty truck applications.",
        warranty: 18
    },
    {
        id: 8,
        name: "Brake Rotor Pair",
        ref: "BRP-8500",
        category: "Brakes",
        brand: "Eaton",
        price: 4200.00,
        stock: 18,
        featured: false,
        image: "images/brake3.jpg",
        description: "Vented brake rotors designed for high-temperature heavy-duty use.",
        warranty: 24
    },
    {
        id: 9,
        name: "Brake Caliper Assembly",
        ref: "BCA-7765",
        category: "Brakes",
        brand: "Knorr-Bremse",
        price: 3257.00,
        stock: 22,
        featured: false,
        image: "images/brake4.jpg",
        description: "Complete brake caliper assembly with mounting hardware.",
        warranty: 12
    },
    {
        id: 10,
        name: "ABS Sensor",
        ref: "ABS-T45",
        category: "Brakes",
        brand: "WABCO",
        price: 899.00,
        stock: 50,
        featured: false,
        image: "images/brake5.jpg",
        description: "Wheel speed sensor for anti-lock braking systems.",
        warranty: 12
    },
    {
        id: 11,
        name: "LED Headlight Pair",
        ref: "LED-HL900",
        category: "Lights",
        brand: "Peterson",
        price: 1999.00,
        stock: 45,
        featured: true,
        image: "images/light1.jpg",
        description: "Bright LED headlights with 10,000 lumens output for improved visibility.",
        warranty: 36
    },
    {
        id: 12,
        name: "LED Work Light Bar",
        ref: "WL-50IN",
        category: "Lights",
        brand: "Rigid Industries",
        price: 4500.00,
        stock: 20,
        featured: false,
        image: "images/light2.jpg",
        description: "50-inch LED light bar with spot/flood combo pattern.",
        warranty: 60
    },
    {
        id: 13,
        name: "LED Tail Light Assembly",
        ref: "TL-LED88",
        category: "Lights",
        brand: "Grote",
        price: 1655.00,
        stock: 35,
        featured: false,
        image: "images/light3.jpg",
        description: "Complete LED tail light assembly with stop, turn, and reverse functions.",
        warranty: 24
    },
    {
        id: 14,
        name: "LED Marker Light Set",
        ref: "ML-SET10",
        category: "Lights",
        brand: "Truck-Lite",
        price: 752.50,
        stock: 60,
        featured: false,
        image: "images/light4.jpg",
        description: "Set of 10 LED clearance and marker lights with mounting hardware.",
        warranty: 36
    },
    {
        id: 15,
        name: "LED Fog Light Kit",
        ref: "FL-KIT22",
        category: "Lights",
        brand: "KC HiLites",
        price: 1899.99,
        stock: 25,
        featured: false,
        image: "images/light5.jpg",
        description: "High-performance LED fog light kit with mounting brackets.",
        warranty: 24
    },
    {
        id: 16,
        name: "Turbocharger Assembly",
        ref: "TURBO-ISX15",
        category: "Engine",
        brand: "Cummins",
        price: 24500.00,
        stock: 8,
        featured: true,
        image: "images/turbo1.jpg",
        description: "Complete turbocharger assembly for Cummins ISX15 engine.",
        warranty: 24
    },
    {
        id: 17,
        name: "Heavy Duty Alternator",
        ref: "ALT-270A",
        category: "Engine",
        brand: "Delco Remy",
        price: 4857.50,
        stock: 25,
        featured: false,
        image: "images/turbo2.jpg",
        description: "270-amp heavy duty alternator for commercial vehicles.",
        warranty: 18
    },
    {
        id: 18,
        name: "Water Pump",
        ref: "WP-M11",
        category: "Engine",
        brand: "Mack",
        price: 3255.00,
        stock: 30,
        featured: false,
        image: "images/turbo3.jpg",
        description: "Heavy duty water pump for Mack M11 engine applications.",
        warranty: 12
    },
    {
        id: 19,
        name: "Glow Plug Set",
        ref: "GP-SET8",
        category: "Engine",
        brand: "Beru",
        price: 1455.00,
        stock: 45,
        featured: false,
        image: "images/plug4.jpg",
        description: "Set of 8 glow plugs for diesel engine cold starts.",
        warranty: 12
    },
    {
        id: 20,
        name: "Engine Mount Kit",
        ref: "EMK-4400",
        category: "Engine",
        brand: "Vibratech",
        price: 4202.50,
        stock: 18,
        featured: false,
        image: "images/turbo4.jpg",
        description: "Complete engine mount kit for heavy-duty vibration reduction.",
        warranty: 24
    },
     {
        id: 21,
        name: "Heavy Duty Clutch Kit",
        ref: "CLUTCH-FS6606",
        category: "Transmission",
        brand: "Eaton",
        price: 8500.00,
        stock: 15,
        featured: true,
        image: "images/clutch1.jpg",
        description: "Complete clutch kit for heavy-duty truck transmissions.",
        warranty: 24
    },
    {
        id: 22,
        name: "Transmission Filter Kit",
        ref: "TFK-ALLISON",
        category: "Transmission",
        brand: "Allison",
        price: 955.00,
        stock: 40,
        featured: false,
        image: "images/clutch2.jpg",
        description: "Transmission filter and gasket kit for Allison transmissions.",
        warranty: 12
    },
    {
        id: 23,
        name: "U-Joint Kit",
        ref: "UJ-1880",
        category: "Transmission",
        brand: "Spicer",
        price: 1655.00,
        stock: 35,
        featured: false,
        image: "images/clutch 3.jpg",
        description: "Heavy duty universal joint kit for driveline applications.",
        warranty: 12
    },
    {
        id: 24,
        name: "Transmission Mount",
        ref: "TM-7765",
        category: "Transmission",
        brand: "Energy Suspension",
        price: 899.00,
        stock: 50,
        featured: false,
        image: "images/clutch4.jpg",
        description: "Polyurethane transmission mount for reduced movement.",
        warranty: 24
    },
    {
        id: 25,
        name: "Shift Fork Assembly",
        ref: "SFA-13SP",
        category: "Transmission",
        brand: "Fuller",
        price: 3250.00,
        stock: 12,
        featured: false,
        image: "images/clutch5.jpg",
        description: "Shift fork assembly for 13-speed manual transmissions.",
        warranty: 12
    },
      {
        id: 26,
        name: "Air Spring Assembly",
        ref: "AIR-8800",
        category: "Suspension",
        brand: "Firestone",
        price: 3850.00,
        stock: 30,
        featured: true,
        image: "images/air1.jpg",
        description: "Heavy duty air spring assembly for truck suspension systems.",
        warranty: 24
    },
    {
        id: 27,
        name: "Leaf Spring Set",
        ref: "LS-35000",
        category: "Suspension",
        brand: "Hendrickson",
        price: 12500.00,
        stock: 10,
        featured: false,
        image: "images/air2.png",
        description: "Complete leaf spring set for tandem axle trucks.",
        warranty: 36
    },
    {
        id: 28,
        name: "Shock Absorber Pair",
        ref: "SHOCK-MT45",
        category: "Suspension",
        brand: "Monroe",
        price: 2255.00,
        stock: 40,
        featured: false,
        image: "images/air3.jpg",
        description: "Heavy duty shock absorbers for commercial vehicle applications.",
        warranty: 24
    },
    {
        id: 29,
        name: "Track Bar Assembly",
        ref: "TB-7765",
        category: "Suspension",
        brand: "Daystar",
        price: 1899.99,
        stock: 25,
        featured: false,
        image: "images/air4.jpg",
        description: "Adjustable track bar for improved axle alignment.",
        warranty: 12
    },
    {
        id: 30,
        name: "Suspension Bushings Kit",
        ref: "SBK-FULL",
        category: "Suspension",
        brand: "Energy Suspension",
        price: 1455.00,
        stock: 35,
        featured: false,
        image: "images/air5.jpg",
        description: "Complete polyurethane suspension bushing kit.",
        warranty: 24
    },
     {
        id: 31,
        name: "Heavy Duty Battery",
        ref: "BATT-31HD",
        category: "Electrical",
        brand: "Interstate",
        price: 2899.99,
        stock: 50,
        featured: true,
        image: "images/battery1.jpg",
        description: "Group 31 heavy duty commercial truck battery with 950 CCA.",
        warranty: 36
    },
    {
        id: 32,
        name: "Starter Motor",
        ref: "STARTER-DD15",
        category: "Electrical",
        brand: "Bosch",
        price: 5250.00,
        stock: 18,
        featured: false,
        image: "images/battery2.png",
        description: "High torque starter motor for Detroit Diesel DD15 engines.",
        warranty: 24
    },
    {
        id: 33,
        name: "Wiring Harness",
        ref: "WH-TRUCK",
        category: "Electrical",
        brand: "Painless Performance",
        price: 4507.50,
        stock: 12,
        featured: false,
        image: "images/battery3.jpg",
        description: "Complete 12-circuit wiring harness for truck electrical systems.",
        warranty: 12
    },
    {
        id: 34,
        name: "Circuit Breaker Panel",
        ref: "CBP-16",
        category: "Electrical",
        brand: "Blue Sea Systems",
        price: 1899.50,
        stock: 30,
        featured: false,
        image: "images/battery4.jpg",
        description: "16-circuit breaker panel with waterproof cover.",
        warranty: 24
    },
    {
        id: 35,
        name: "Voltage Regulator",
        ref: "VR-28SI",
        category: "Electrical",
        brand: "Leece Neville",
        price: 955.00,
        stock: 45,
        featured: false,
        image: "images/battery5.jpg",
        description: "External voltage regulator for 28SI series alternators.",
        warranty: 12
    },
    {
        id: 36,
        name: "Heavy Duty Radiator",
        ref: "RAD-HD400",
        category: "Cooling",
        brand: "Mishimoto",
        price: 12500.00,
        stock: 10,
        featured: true,
        image: "images/fan1.jpg",
        description: "Aluminum heavy duty radiator for commercial truck applications.",
        warranty: 36
    },
    {
        id: 37,
        name: "Intercooler Assembly",
        ref: "IC-ISX15",
        category: "Cooling",
        brand: "Banks Power",
        price: 8500.00,
        stock: 15,
        featured: false,
        image: "images/fan2.jpg",
        description: "High efficiency intercooler for Cummins ISX15 engines.",
        warranty: 24
    },
    {
        id: 38,
        name: "Coolant Reservoir",
        ref: "CR-5GAL",
        category: "Cooling",
        brand: "Spectra Premium",
        price: 1455.00,
        stock: 35,
        featured: false,
        image: "images/fan3.jpg",
        description: "5-gallon coolant overflow reservoir with mounting brackets.",
        warranty: 12
    },
    {
        id: 39,
        name: "Radiator Fan Clutch",
        ref: "FC-VISCO",
        category: "Cooling",
        brand: "Horton",
        price: 3250.00,
        stock: 25,
        featured: false,
        image: "images/fan4.jpg",
        description: "Viscous fan clutch for heavy duty cooling systems.",
        warranty: 12
    },
    {
        id: 40,
        name: "Cooling Fan Assembly",
        ref: "FAN-38IN",
        category: "Cooling",
        brand: "Flex-a-lite",
        price: 4202.50,
        stock: 20,
        featured: false,
        image: "images/fan5.jpg",
        description: "38-inch electric cooling fan with shroud assembly.",
        warranty: 24
    },
    {
        id: 41,
        name: "Fuel Injection Pump",
        ref: "FIP-P7100",
        category: "Fuel System",
        brand: "Bosch",
        price: 18500.00,
        stock: 8,
        featured: true,
        image: "images/fuel1.jpg",
        description: "P7100 fuel injection pump for Cummins diesel engines.",
        warranty: 24
    },
    {
        id: 42,
        name: "Fuel Tank",
        ref: "FT-100GAL",
        category: "Fuel System",
        brand: "Transfer Flow",
        price: 9507.50,
        stock: 12,
        featured: false,
        image: "images/fuel2.jpg",
        description: "100-gallon aluminum fuel tank with mounting hardware.",
        warranty: 60
    },
    {
        id: 43,
        name: "Fuel Injector Set",
        ref: "INJ-SET6",
        category: "Fuel System",
        brand: "Denso",
        price: 12500.50,
        stock: 15,
        featured: false,
        image: "images/fuel3.png",
        description: "Set of 6 remanufactured fuel injectors for diesel engines.",
        warranty: 24
    },
    {
        id: 44,
        name: "Fuel Lines Kit",
        ref: "FLK-COMPLETE",
        category: "Fuel System",
        brand: "Russell",
        price: 2899.99,
        stock: 25,
        featured: false,
        image: "images/fuel4.jpg",
        description: "Complete stainless steel braided fuel line kit.",
        warranty: 12
    },
    {
        id: 45,
        name: "Fuel Cap Assembly",
        ref: "FC-LOCKING",
        category: "Fuel System",
        brand: "Stant",
        price: 457.50,
        stock: 60,
        featured: false,
        image: "images/fuel5.jpg",
        description: "Locking fuel cap with tether for commercial vehicles.",
        warranty: 12
    },
    {
        id: 46,
        name: "Performance Exhaust System",
        ref: "EXH-5IN",
        category: "Exhaust",
        brand: "MagnaFlow",
        price: 12500.00,
        stock: 15,
        featured: true,
        image: "images/Exhaust1.jpg",
        description: "5-inch aluminized performance exhaust system for trucks.",
        warranty: 60
    },
    {
        id: 47,
        name: "Diesel Particulate Filter",
        ref: "DPF-DD15",
        category: "Exhaust",
        brand: "Donaldson",
        price: 28500.00,
        stock: 8,
        featured: false,
        image: "images/Exhaust2.jpg",
        description: "EPA compliant DPF filter for Detroit Diesel DD15 engines.",
        warranty: 24
    },
    {
        id: 48,
        name: "Exhaust Manifold",
        ref: "EM-CAT15",
        category: "Exhaust",
        brand: "Banks Power",
        price: 6507.50,
        stock: 20,
        featured: false,
        image: "images/Exhaust3.jpg",
        description: "High-flow exhaust manifold for Caterpillar C15 engines.",
        warranty: 24
    },
    {
        id: 49,
        name: "Muffler Assembly",
        ref: "MUFF-8IN",
        category: "Exhaust",
        brand: "Walker",
        price: 3250.00,
        stock: 30,
        featured: false,
        image: "images/Exhaust4.jpg",
        description: "8-inch round heavy duty muffler for commercial trucks.",
        warranty: 36
    },
    {
        id: 50,
        name: "Exhaust Clamp Kit",
        ref: "ECK-10PK",
        category: "Exhaust",
        brand: "Bandclamp",
        price: 899.99,
        stock: 50,
        featured: false,
        image: "images/Exhaust5.jpg",
        description: "Kit of 10 heavy duty band clamps for exhaust systems.",
        warranty: 12
    }
        ];
        
        // Add all sample products
        products.push(...sampleProducts);
        
        // Save to localStorage
        saveToLocalStorage();
        
        console.log('✅ Added', sampleProducts.length, 'sample products');
        
        // Show notification
        showNotification('Sample products loaded successfully!', 'success');
        
        // Update UI if we're on a products page
        if (document.getElementById('featured-products')) {
            loadFeaturedProducts();
        }
        if (document.getElementById('all-products')) {
            loadAllProducts();
        }
        
        return true;
    }
    
    return false;
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchProducts();
            }
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
    
    // Auto-add sample products if empty
    setTimeout(() => {
        if (products.length === 0) {
            console.log('No products found, auto-adding samples...');
            addSampleProducts();
        }
    }, 1000);
});

// ========== EXPORT FUNCTIONS FOR GLOBAL USE ==========
// Make sure these functions are available globally
window.addSampleProducts = addSampleProducts;
window.updateCategoryCounts = updateCategoryCounts;