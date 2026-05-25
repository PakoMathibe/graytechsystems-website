// ========== MAIN APPLICATION LOGIC ==========
let currentLocation = null;
let selectedPackage = null;
let orderItems = [];

// DOM Elements
const searchInput = document.getElementById('locationSearch');
const searchBtn = document.getElementById('searchBtn');
const useMyLocation = document.getElementById('useMyLocation');
const suggestionsDiv = document.getElementById('suggestions');
const resultsSection = document.getElementById('resultsSection');
const statsBar = document.getElementById('statsBar');
const loadingState = document.getElementById('loadingState');
const providersList = document.getElementById('providersList');
const orderSummary = document.getElementById('orderSummary');

// Search functionality
function showSuggestions() {
    const query = searchInput.value;
    const results = searchLocation(query);
    if (results.length > 0 && query.length > 1) {
        suggestionsDiv.innerHTML = results.map(loc => 
            `<span class="suggestion" onclick="selectLocation('${loc.name}', '${loc.city}', '${loc.postalCode}')">${loc.name}, ${loc.city} (${loc.postalCode})</span>`
        ).join('');
        suggestionsDiv.style.display = 'flex';
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

window.selectLocation = function(name, city, postalCode) {
    searchInput.value = `${name}, ${city}`;
    suggestionsDiv.style.display = 'none';
    performSearch();
};

async function performSearch() {
    const query = searchInput.value;
    if (!query) { showToast('Please enter a location', 'error'); return; }
    
    const matched = allLocations.find(loc => 
        query.toLowerCase().includes(loc.name.toLowerCase()) || 
        query.toLowerCase().includes(loc.city.toLowerCase()) || 
        loc.postalCode === query
    );
    
    if (!matched) { showToast('Location not found. Please try another area.', 'error'); return; }
    
    currentLocation = matched;
    statsBar.style.display = 'block';
    resultsSection.style.display = 'block';
    loadingState.style.display = 'flex';
    providersList.style.display = 'none';
    
    setTimeout(() => {
        loadingState.style.display = 'none';
        providersList.style.display = 'block';
        renderResults(matched);
    }, 800);
}

function renderResults(location) {
    document.getElementById('locationInfo').innerHTML = `
        <div class="location-badge">
            <i class="fas fa-map-marker-alt"></i> ${location.name}, ${location.city} - ${location.province} (${location.postalCode})
        </div>
    `;
    
    let availableProviders = [];
    if (location.hasFibre && location.providers) {
        availableProviders = location.providers.map(p => providers[p]).filter(p => p);
    }
    
    if (availableProviders.length === 0) {
        providersList.innerHTML = `
            <div class="text-center" style="padding: 3rem;">
                <i class="fas fa-sad-tear fa-4x" style="color: var(--gray);"></i>
                <h3 style="margin: 1rem 0;">Fibre Not Yet Available</h3>
                <p>We're expanding! Register your interest and we'll notify you when fibre arrives.</p>
                <button class="search-btn" onclick="registerInterest()">Register Interest →</button>
            </div>
        `;
        document.getElementById('comparisonSection').style.display = 'none';
        return;
    }
    
    // Update stats
    const allPackages = availableProviders.flatMap(p => p.speeds.map((s, i) => ({ speed: s, price: p.prices[i] })));
    const minPrice = Math.min(...allPackages.map(p => p.price));
    const maxSpeed = Math.max(...allPackages.map(p => p.speed));
    document.getElementById('statProviders').textContent = availableProviders.length;
    document.getElementById('statPackages').textContent = allPackages.length;
    document.getElementById('statMinPrice').textContent = `R${minPrice}`;
    document.getElementById('statMaxSpeed').textContent = `${maxSpeed}Mbps`;
    
    // Render provider cards
    providersList.innerHTML = availableProviders.map(provider => `
        <div class="provider-card" data-provider="${provider.name}">
            <div class="provider-header" onclick="toggleProvider('${provider.name}')">
                <div class="provider-info">
                    <div class="provider-icon"><i class="${provider.icon}"></i></div>
                    <div>
                        <div class="provider-name">${provider.name}</div>
                        <div class="provider-tech">${provider.tech} • Up to ${provider.maxSpeed}Mbps</div>
                    </div>
                </div>
                <i class="fas fa-chevron-down provider-expand"></i>
            </div>
            <div class="provider-packages">
                <div class="package-grid" id="packages-${provider.name.replace(/\s/g, '')}"></div>
            </div>
        </div>
    `).join('');
    
    availableProviders.forEach(provider => {
        const container = document.getElementById(`packages-${provider.name.replace(/\s/g, '')}`);
        if (container) {
            container.innerHTML = provider.speeds.map((speed, i) => `
                <div class="package-item" onclick="selectPackage('${provider.name}', ${speed}, ${provider.prices[i]}, '${provider.tech}')">
                    <div class="package-speed">${speed}Mbps</div>
                    <div class="package-price">R${provider.prices[i].toLocaleString()}<small>/month</small></div>
                    <ul class="package-features">
                        <li><i class="fas fa-check"></i> Uncapped Data</li>
                        <li><i class="fas fa-check"></i> Free Installation</li>
                        <li><i class="fas fa-check"></i> Free Router</li>
                        ${speed >= 200 ? '<li><i class="fas fa-check"></i> Static IP</li>' : ''}
                        ${speed >= 500 ? '<li><i class="fas fa-check"></i> Priority Support</li>' : ''}
                    </ul>
                </div>
            `).join('');
        }
    });
    
    // Render comparison table
    document.getElementById('comparisonBody').innerHTML = availableProviders.flatMap(provider => 
        provider.speeds.map((speed, i) => `
            <tr>
                <td><div class="provider-badge"><i class="${provider.icon}"></i> ${provider.name}</div></td>
                <td>${speed}Mbps</td>
                <td>${speed} / ${provider.tech === 'FTTH (Symmetrical)' ? speed : Math.floor(speed/2)} Mbps</td>
                <td><strong>R${provider.prices[i].toLocaleString()}</strong>/month</td>
                <td>12 months</td>
                <td><button class="filter-chip" onclick="selectPackage('${provider.name}', ${speed}, ${provider.prices[i]}, '${provider.tech}')">Select →</button></td>
            </tr>
        `)
    ).join('');
    
    document.getElementById('comparisonSection').style.display = 'block';
}

window.toggleProvider = function(providerName) {
    const card = document.querySelector(`.provider-card[data-provider="${providerName}"]`);
    if (card) card.classList.toggle('expanded');
};

window.selectPackage = function(providerName, speed, price, tech) {
    selectedPackage = { name: `${providerName} ${speed}Mbps`, speed, price, tech };
    
    document.querySelectorAll('.package-item').forEach(p => p.classList.remove('selected'));
    if (event.currentTarget) event.currentTarget.classList.add('selected');
    
    orderItems = [{ name: `${providerName} Fibre ${speed}Mbps`, price: price, oneTime: 999 }];
    renderOrderSummary();
    orderSummary.classList.add('show');
    showToast(`${providerName} ${speed}Mbps selected! Review your order below.`, 'success');
};

function renderOrderSummary() {
    const monthlyTotal = orderItems.reduce((sum, i) => sum + i.price, 0);
    document.getElementById('orderContent').innerHTML = orderItems.map(item => `
        <div class="order-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>Monthly: R${item.price.toLocaleString()}</small>
                ${item.oneTime ? `<br><small>Installation: R${item.oneTime.toLocaleString()}</small>` : ''}
            </div>
        </div>
    `).join('');
    document.getElementById('orderTotal').innerHTML = `R${monthlyTotal.toLocaleString()}<small>/month</small>`;
}

// Event listeners
searchInput.addEventListener('input', showSuggestions);
searchBtn.addEventListener('click', performSearch);
useMyLocation.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            showToast('Getting your location...', 'info');
            // Find nearest location based on coordinates (simplified)
            const nearest = allLocations.reduce((closest, loc) => {
                const dist = Math.hypot(loc.lat - pos.coords.latitude, loc.lng - pos.coords.longitude);
                return dist < (closest.dist || Infinity) ? { loc, dist } : closest;
            }, {});
            if (nearest.loc) {
                searchInput.value = `${nearest.loc.name}, ${nearest.loc.city}`;
                performSearch();
            }
        }, () => showToast('Could not get your location', 'error'));
    } else {
        showToast('Geolocation not supported', 'error');
    }
});

// Tab switching
document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('addressTab').style.display = tab.dataset.tab === 'address' ? 'block' : 'none';
        document.getElementById('mapTab').style.display = tab.dataset.tab === 'map' ? 'block' : 'none';
        if (tab.dataset.tab === 'map' && !mapInitialized) initMap();
    });
});

// Order summary
document.getElementById('closeSummary').addEventListener('click', () => orderSummary.classList.remove('show'));
document.getElementById('checkoutBtn').addEventListener('click', () => document.getElementById('checkoutModal').classList.add('active'));

// Checkout
document.getElementById('submitOrderBtn').addEventListener('click', function() {
    const name = document.getElementById('checkoutName').value;
    const email = document.getElementById('checkoutEmail').value;
    const phone = document.getElementById('checkoutPhone').value;
    if (!name || !email || !phone) { showToast('Please fill in all fields', 'error'); return; }
    
    const orderNumber = 'GT-FIBRE-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('orderNumber').innerText = orderNumber;
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('confirmationModal').classList.add('active');
    orderSummary.classList.remove('show');
    showToast(`Order ${orderNumber} confirmed! Check your email.`, 'success');
});

// Close modals
document.querySelectorAll('.modal-close, #closeConfirmation').forEach(btn => {
    btn.addEventListener('click', () => document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')));
});

window.showToast = function(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = type === 'error' ? 'var(--danger)' : type === 'success' ? 'var(--success)' : 'var(--dark)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

window.registerInterest = function() { showToast('Thanks! We\'ll notify you when fibre arrives in your area.', 'success'); };

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set up any initial state
    const popularLocations = ['Sandton', 'Cape Town', 'Durban', 'Pretoria', 'Fourways'];
    const suggestionsContainer = document.getElementById('suggestions');
    if (suggestionsContainer && popularLocations.length) {
        // Optional: Add popular suggestions
    }
});