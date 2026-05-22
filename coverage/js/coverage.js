// State management
let selectedLocation = null;
let selectedProvider = null;
let selectedPackage = null;

// DOM elements
const searchInput = document.getElementById('locationSearch');
const searchBtn = document.getElementById('searchBtn');
const suggestionsDiv = document.getElementById('searchSuggestions');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const popularGrid = document.getElementById('popularGrid');

// Popular locations for quick access
const popularLocations = [
  'Sandton',
  'Fourways',
  'Cape Town CBD',
  'Umhlanga',
  'Pretoria CBD',
  'Centurion',
  'Durban CBD',
  'Bloemfontein',
];

// Render popular locations
function renderPopularLocations() {
  popularGrid.innerHTML = popularLocations
    .map(
      (loc) =>
        `<div class="popular-item" onclick="searchAndSelect('${loc}')">${loc}</div>`
    )
    .join('');
}

// Search and select a location
function searchAndSelect(query) {
  searchInput.value = query;
  performSearch();
}

// Perform search
async function performSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    showError('Please enter a suburb or city name');
    return;
  }

  // Show loading
  loadingState.style.display = 'block';
  resultsSection.style.display = 'none';
  suggestionsDiv.classList.remove('active');

  // Simulate API delay
  setTimeout(() => {
    const results = searchLocation(query);

    if (results.length === 0) {
      loadingState.style.display = 'none';
      showNoResults();
      return;
    }

    // Take the best match (first result)
    selectedLocation = results[0];
    displayResults();

    loadingState.style.display = 'none';
    resultsSection.style.display = 'block';
  }, 800);
}

// Display results
function displayResults() {
  if (!selectedLocation) return;

  // Display location info
  const locationInfo = document.getElementById('locationInfo');
  locationInfo.innerHTML = `
        <h2><i class="fas fa-map-pin"></i> ${selectedLocation.name}</h2>
        <p>${selectedLocation.suburb}, ${selectedLocation.city} | ${
    selectedLocation.province
  } | Postal Code: ${selectedLocation.postalCode}</p>
        ${
          !selectedLocation.hasFibre
            ? '<p class="mt-2"><i class="fas fa-clock"></i> Fibre coming soon to your area! LTE/5G options available.</p>'
            : ''
        }
    `;

  // Display providers
  const providers = getProvidersForLocation(selectedLocation);
  const providerSelectionDiv = document.getElementById('providerSelection');

  if (providers.length === 0) {
    providerSelectionDiv.innerHTML = `
            <div class="section-title">Available Connectivity Options</div>
            <div class="alert-info">
                <i class="fas fa-tower-cell"></i> Fibre is not yet available in your area.
                <br>Click below to see LTE and 5G options.
                <div class="mt-3">
                    <button class="btn-primary" onclick="showLteOptions()">View LTE/5G Options →</button>
                </div>
            </div>
        `;
    document.getElementById('packageSelection').innerHTML = '';
    document.getElementById('orderSummary').style.display = 'none';
    return;
  }

  providerSelectionDiv.innerHTML = `
        <div class="section-title"><i class="fas fa-building"></i> Select Your Fibre Provider</div>
        <div class="provider-grid">
            ${providers
              .map(
                (provider) => `
                <div class="provider-card" data-provider="${provider.id}" onclick="selectProvider('${provider.id}')">
                    <div class="provider-icon"><i class="${provider.logo}"></i></div>
                    <h3>${provider.name}</h3>
                    <div class="provider-tech">${provider.technology}</div>
                    <div class="provider-speed">Up to ${provider.maxSpeed}</div>
                </div>
            `
              )
              .join('')}
        </div>
    `;

  // Reset selections
  selectedProvider = null;
  selectedPackage = null;
  document.getElementById('packageSelection').innerHTML = '';
  document.getElementById('orderSummary').style.display = 'none';
}

// Select a provider
function selectProvider(providerId) {
  selectedProvider = providerId;
  selectedPackage = null;

  // Update UI
  document.querySelectorAll('.provider-card').forEach((card) => {
    card.classList.remove('selected');
    if (card.dataset.provider === providerId) {
      card.classList.add('selected');
    }
  });

  // Show packages
  const packages = getPackagesForProvider(providerId);
  const provider = fibreProviders[providerId];

  const packageSelectionDiv = document.getElementById('packageSelection');
  packageSelectionDiv.innerHTML = `
        <div class="section-title"><i class="fas fa-tags"></i> Choose Your Package (${
          provider.name
        })</div>
        <div class="package-grid">
            ${Object.entries(packages)
              .map(
                ([key, pkg]) => `
                <div class="package-card" data-package="${key}" onclick="selectPackage('${key}', ${
                  pkg.price
                })">
                    <div class="package-name">${pkg.speed}</div>
                    <div class="package-speed">↓${pkg.download}Mbps / ↑${
                  pkg.upload
                }Mbps</div>
                    <div class="package-price">R ${pkg.price.toLocaleString()}<span style="font-size: 0.875rem;">/month</span></div>
                    <div class="package-contract">${pkg.contract} contract</div>
                    <ul class="package-features">
                        ${pkg.features
                          .map(
                            (f) => `<li><i class="fas fa-check"></i> ${f}</li>`
                          )
                          .join('')}
                    </ul>
                </div>
            `
              )
              .join('')}
        </div>
    `;

  document.getElementById('orderSummary').style.display = 'none';
}

// Select a package
function selectPackage(packageKey, price) {
  selectedPackage = { key: packageKey, price: price };

  // Update UI
  document.querySelectorAll('.package-card').forEach((card) => {
    card.classList.remove('selected');
    if (card.dataset.package === packageKey) {
      card.classList.add('selected');
    }
  });

  // Show order summary
  const provider = fibreProviders[selectedProvider];
  const pkg = getPackagesForProvider(selectedProvider)[packageKey];

  const orderSummary = document.getElementById('orderSummary');
  orderSummary.style.display = 'block';
  orderSummary.innerHTML = `
        <h3><i class="fas fa-shopping-cart"></i> Order Summary</h3>
        <div class="summary-details">
            <div class="summary-text">
                <p><strong>Location:</strong> ${selectedLocation.name}</p>
                <p><strong>Provider:</strong> <span class="provider-name">${
                  provider.name
                }</span></p>
                <p><strong>Package:</strong> ${pkg.speed} (↓${
    pkg.download
  }Mbps / ↑${pkg.upload}Mbps)</p>
                <p><strong>Contract:</strong> ${pkg.contract}</p>
            </div>
            <div class="summary-price">
                R ${pkg.price.toLocaleString()}<small>/month</small>
            </div>
            <button class="btn-order" onclick="placeOrder()">
                <i class="fas fa-arrow-right"></i> Proceed to Order
            </button>
        </div>
    `;
}

// Place order
function placeOrder() {
  if (!selectedLocation || !selectedProvider || !selectedPackage) return;

  const provider = fibreProviders[selectedProvider];
  const pkg = getPackagesForProvider(selectedProvider)[selectedPackage.key];

  // Save order to localStorage for demo
  const order = {
    location: selectedLocation,
    provider: provider,
    package: pkg,
    orderDate: new Date().toISOString(),
    orderNumber: 'GT-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
  };

  localStorage.setItem('pendingOrder', JSON.stringify(order));

  // Show success and redirect to checkout
  alert(
    `Order initiated!\n\nOrder #: ${order.orderNumber}\n\nA GrayTech consultant will contact you within 24 hours to confirm installation.\n\nDemo: This would redirect to payment/checkout page.`
  );

  // In production: window.location.href = '../checkout.html';
}

// Show LTE options for non-fibre areas
function showLteOptions() {
  alert(
    'Demo: LTE/5G packages would be shown here.\n\nAvailable options:\n• 50GB Monthly - R399\n• 100GB Monthly - R599\n• Uncapped LTE - R899\n\nA GrayTech consultant will contact you to confirm coverage.'
  );
}

// Show error message
function showError(message) {
  loadingState.style.display = 'none';
  resultsSection.style.display = 'none';
  alert(message);
}

// Show no results
function showNoResults() {
  loadingState.style.display = 'none';
  resultsSection.style.display = 'block';
  document.getElementById('locationInfo').innerHTML = `
        <div class="alert-warning" style="background: rgba(245,158,11,0.1); border-left: 4px solid var(--warning); padding: 1rem; border-radius: 8px;">
            <i class="fas fa-search"></i> No results found for "${searchInput.value}"
            <br><small>Try searching by suburb name (e.g., "Sandton", "Cape Town", "Fourways") or check popular locations below.</small>
        </div>
    `;
  document.getElementById('providerSelection').innerHTML = '';
  document.getElementById('packageSelection').innerHTML = '';
}

// Live search suggestions
searchInput.addEventListener('input', function () {
  const query = this.value.trim();
  if (query.length < 2) {
    suggestionsDiv.classList.remove('active');
    return;
  }

  const results = searchLocation(query);
  if (results.length > 0) {
    suggestionsDiv.innerHTML = results
      .map(
        (r) =>
          `<div class="suggestion-tag" onclick="searchAndSelect('${r.name}')">${r.name}, ${r.city}</div>`
      )
      .join('');
    suggestionsDiv.classList.add('active');
  } else {
    suggestionsDiv.classList.remove('active');
  }
});

// Search button click
searchBtn.addEventListener('click', performSearch);

// Enter key search
searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    performSearch();
  }
});

// Initialize
renderPopularLocations();
