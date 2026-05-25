// ========== INTERACTIVE MAP INITIALIZATION ==========
let map = null;
let mapInitialized = false;

function initMap() {
    if (mapInitialized) return;
    
    map = L.map('mapContainer').setView([-28.5, 24.5], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 5
    }).addTo(map);
    
    // Add province overlays
    const provinces = {
        gauteng: { bounds: [[-26.8, 27.0], [-24.8, 29.2]], label: 'Gauteng' },
        westerncape: { bounds: [[-35.0, 18.0], [-32.5, 23.5]], label: 'Western Cape' },
        kwazulunatal: { bounds: [[-31.0, 29.0], [-27.0, 32.5]], label: 'KwaZulu-Natal' },
        easterncape: { bounds: [[-34.0, 24.0], [-31.0, 29.5]], label: 'Eastern Cape' },
        freestate: { bounds: [[-30.0, 24.5], [-27.0, 28.5]], label: 'Free State' },
        mpumalanga: { bounds: [[-27.0, 29.0], [-25.0, 31.5]], label: 'Mpumalanga' },
        limpopo: { bounds: [[-25.0, 27.0], [-22.0, 31.0]], label: 'Limpopo' },
        northwest: { bounds: [[-28.0, 24.0], [-25.0, 28.0]], label: 'North West' },
        northerncape: { bounds: [[-32.0, 20.0], [-26.0, 25.0]], label: 'Northern Cape' }
    };
    
    for (const [key, province] of Object.entries(provinces)) {
        const color = locationsDatabase[key]?.color || '#06a3da';
        const bounds = L.latLngBounds(province.bounds);
        const rectangle = L.rectangle(bounds, { 
            color: color, 
            weight: 2, 
            opacity: 0.7, 
            fillOpacity: 0.1,
            className: 'province-rectangle'
        }).addTo(map);
        
        rectangle.bindPopup(`
            <div style="text-align: center; min-width: 150px;">
                <strong style="color: ${color};">${province.label}</strong><br>
                ${locationsDatabase[key]?.areas.filter(a => a.hasFibre).length || 0} fibre-enabled areas<br>
                <button onclick="searchProvince('${key}')" style="background: ${color}; color: white; border: none; padding: 5px 12px; border-radius: 20px; margin-top: 8px; cursor: pointer;">Check Coverage →</button>
            </div>
        `);
        
        // Add hover effect
        rectangle.on('mouseover', function() { this.setStyle({ fillOpacity: 0.2, weight: 3 }); });
        rectangle.on('mouseout', function() { this.setStyle({ fillOpacity: 0.1, weight: 2 }); });
    }
    
    mapInitialized = true;
}

window.searchProvince = function(provinceKey) {
    const province = locationsDatabase[provinceKey];
    if (province && province.areas.length > 0) {
        const firstArea = province.areas[0];
        document.getElementById('locationSearch').value = `${firstArea.name}, ${firstArea.city}`;
        document.querySelector('.search-tab[data-tab="address"]').click();
        performSearch();
    }
};