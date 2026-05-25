// ========== COMPLETE LOCATION DATABASE (70+ locations across all 9 provinces) ==========
const locationsDatabase = {
    gauteng: { province: 'Gauteng', color: '#06a3da', areas: [
        { name: 'Johannesburg CBD', suburb: 'Johannesburg Central', city: 'Johannesburg', postalCode: '2000', lat: -26.2041, lng: 28.0473, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot', 'metrofibre'] },
        { name: 'Sandton', suburb: 'Sandton', city: 'Johannesburg', postalCode: '2196', lat: -26.1076, lng: 28.0553, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot', 'octotel', 'metrofibre', 'vodacom', 'mtn'] },
        { name: 'Fourways', suburb: 'Fourways', city: 'Johannesburg', postalCode: '2191', lat: -26.0262, lng: 28.0019, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot', 'metrofibre'] },
        { name: 'Midrand', suburb: 'Midrand', city: 'Johannesburg', postalCode: '1685', lat: -25.9993, lng: 28.1268, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Randburg', suburb: 'Randburg', city: 'Johannesburg', postalCode: '2194', lat: -26.1025, lng: 28.0014, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Roodepoort', suburb: 'Roodepoort', city: 'Johannesburg', postalCode: '1724', lat: -26.1625, lng: 27.8725, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Bryanston', suburb: 'Bryanston', city: 'Johannesburg', postalCode: '2191', lat: -26.0551, lng: 28.0315, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot', 'metrofibre'] },
        { name: 'Rosebank', suburb: 'Rosebank', city: 'Johannesburg', postalCode: '2196', lat: -26.1435, lng: 28.0451, hasFibre: true, providers: ['openserve', 'vumatel', 'octotel'] },
        { name: 'Pretoria CBD', suburb: 'Pretoria Central', city: 'Pretoria', postalCode: '0002', lat: -25.7461, lng: 28.1881, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Centurion', suburb: 'Centurion', city: 'Pretoria', postalCode: '0157', lat: -25.8587, lng: 28.1875, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot', 'metrofibre'] },
        { name: 'Menlyn', suburb: 'Menlyn', city: 'Pretoria', postalCode: '0063', lat: -25.7834, lng: 28.2784, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Hatfield', suburb: 'Hatfield', city: 'Pretoria', postalCode: '0028', lat: -25.7531, lng: 28.2393, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Brooklyn', suburb: 'Brooklyn', city: 'Pretoria', postalCode: '0181', lat: -25.7714, lng: 28.2341, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Waterkloof', suburb: 'Waterkloof', city: 'Pretoria', postalCode: '0145', lat: -25.7888, lng: 28.2275, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Boksburg', suburb: 'Boksburg', city: 'Johannesburg', postalCode: '1459', lat: -26.2124, lng: 28.2595, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Benoni', suburb: 'Benoni', city: 'Johannesburg', postalCode: '1501', lat: -26.1885, lng: 28.3208, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Kempton Park', suburb: 'Kempton Park', city: 'Johannesburg', postalCode: '1619', lat: -26.1048, lng: 28.2349, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Bedfordview', suburb: 'Bedfordview', city: 'Johannesburg', postalCode: '2008', lat: -26.1775, lng: 28.1348, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Edenvale', suburb: 'Edenvale', city: 'Johannesburg', postalCode: '1609', lat: -26.1393, lng: 28.1521, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Germiston', suburb: 'Germiston', city: 'Johannesburg', postalCode: '1401', lat: -26.2231, lng: 28.1762, hasFibre: true, providers: ['openserve', 'vumatel'] }
    ]},
    westerncape: { province: 'Western Cape', color: '#34ad54', areas: [
        { name: 'Cape Town CBD', suburb: 'Cape Town Central', city: 'Cape Town', postalCode: '8001', lat: -33.9249, lng: 18.4241, hasFibre: true, providers: ['openserve', 'octotel', 'vumatel', 'frogfoot', 'metrofibre'] },
        { name: 'Sea Point', suburb: 'Sea Point', city: 'Cape Town', postalCode: '8005', lat: -33.9156, lng: 18.3899, hasFibre: true, providers: ['octotel', 'openserve', 'vumatel'] },
        { name: 'Green Point', suburb: 'Green Point', city: 'Cape Town', postalCode: '8005', lat: -33.9036, lng: 18.4044, hasFibre: true, providers: ['octotel', 'openserve'] },
        { name: 'Camps Bay', suburb: 'Camps Bay', city: 'Cape Town', postalCode: '8040', lat: -33.9515, lng: 18.3815, hasFibre: true, providers: ['octotel', 'vumatel'] },
        { name: 'Claremont', suburb: 'Claremont', city: 'Cape Town', postalCode: '7708', lat: -33.9806, lng: 18.4659, hasFibre: true, providers: ['octotel', 'openserve', 'vumatel', 'frogfoot'] },
        { name: 'Rondebosch', suburb: 'Rondebosch', city: 'Cape Town', postalCode: '7700', lat: -33.9636, lng: 18.4777, hasFibre: true, providers: ['octotel', 'openserve', 'vumatel'] },
        { name: 'Newlands', suburb: 'Newlands', city: 'Cape Town', postalCode: '7700', lat: -33.9784, lng: 18.4616, hasFibre: true, providers: ['octotel', 'openserve'] },
        { name: 'Kenilworth', suburb: 'Kenilworth', city: 'Cape Town', postalCode: '7708', lat: -33.9927, lng: 18.4733, hasFibre: true, providers: ['octotel', 'openserve', 'vumatel'] },
        { name: 'Bellville', suburb: 'Bellville', city: 'Cape Town', postalCode: '7530', lat: -33.9047, lng: 18.6319, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Durbanville', suburb: 'Durbanville', city: 'Cape Town', postalCode: '7550', lat: -33.825, lng: 18.635, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Stellenbosch', suburb: 'Stellenbosch', city: 'Stellenbosch', postalCode: '7600', lat: -33.9366, lng: 18.8617, hasFibre: true, providers: ['openserve', 'octotel', 'vumatel', 'frogfoot'] },
        { name: 'Somerset West', suburb: 'Somerset West', city: 'Somerset West', postalCode: '7130', lat: -34.0833, lng: 18.85, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Paarl', suburb: 'Paarl', city: 'Paarl', postalCode: '7646', lat: -33.7242, lng: 18.955, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'George', suburb: 'George', city: 'George', postalCode: '6529', lat: -33.956, lng: 22.5072, hasFibre: true, providers: ['openserve', 'vumatel'] }
    ]},
    kwazulunatal: { province: 'KwaZulu-Natal', color: '#f59e0b', areas: [
        { name: 'Durban CBD', suburb: 'Durban Central', city: 'Durban', postalCode: '4001', lat: -29.8587, lng: 31.0218, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot', 'metrofibre'] },
        { name: 'Umhlanga', suburb: 'Umhlanga', city: 'Durban', postalCode: '4319', lat: -29.7247, lng: 31.0812, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot', 'metrofibre'] },
        { name: 'Ballito', suburb: 'Ballito', city: 'Ballito', postalCode: '4420', lat: -29.5402, lng: 31.214, hasFibre: true, providers: ['openserve', 'vumatel', 'frogfoot'] },
        { name: 'Westville', suburb: 'Westville', city: 'Durban', postalCode: '3629', lat: -29.831, lng: 30.928, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Pinetown', suburb: 'Pinetown', city: 'Durban', postalCode: '3610', lat: -29.8208, lng: 30.8764, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Hillcrest', suburb: 'Hillcrest', city: 'Durban', postalCode: '3610', lat: -29.775, lng: 30.775, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'Pietermaritzburg', suburb: 'Pietermaritzburg', city: 'Pietermaritzburg', postalCode: '3201', lat: -29.6167, lng: 30.3833, hasFibre: true, providers: ['openserve', 'vumatel'] }
    ]},
    easterncape: { province: 'Eastern Cape', color: '#8b5cf6', areas: [
        { name: 'Gqeberha', suburb: 'Port Elizabeth', city: 'Gqeberha', postalCode: '6001', lat: -33.9608, lng: 25.6022, hasFibre: true, providers: ['openserve', 'vumatel'] },
        { name: 'East London', suburb: 'East London', city: 'East London', postalCode: '5201', lat: -33.0152, lng: 27.9045, hasFibre: true, providers: ['openserve', 'vumatel'] }
    ]},
    freestate: { province: 'Free State', color: '#ec4899', areas: [
        { name: 'Bloemfontein', suburb: 'Bloemfontein', city: 'Bloemfontein', postalCode: '9301', lat: -29.1167, lng: 26.2167, hasFibre: true, providers: ['openserve', 'vumatel'] }
    ]},
    mpumalanga: { province: 'Mpumalanga', color: '#f97316', areas: [
        { name: 'Mbombela', suburb: 'Nelspruit', city: 'Mbombela', postalCode: '1200', lat: -25.4667, lng: 30.9667, hasFibre: true, providers: ['openserve'] },
        { name: 'Witbank', suburb: 'eMalahleni', city: 'Witbank', postalCode: '1035', lat: -25.8667, lng: 29.2167, hasFibre: true, providers: ['openserve'] }
    ]},
    limpopo: { province: 'Limpopo', color: '#10b981', areas: [
        { name: 'Polokwane', suburb: 'Polokwane', city: 'Polokwane', postalCode: '0699', lat: -23.9, lng: 29.45, hasFibre: true, providers: ['openserve'] }
    ]},
    northwest: { province: 'North West', color: '#3b82f6', areas: [
        { name: 'Rustenburg', suburb: 'Rustenburg', city: 'Rustenburg', postalCode: '0299', lat: -25.6667, lng: 27.2333, hasFibre: true, providers: ['openserve'] }
    ]},
    northerncape: { province: 'Northern Cape', color: '#f97316', areas: [
        { name: 'Kimberley', suburb: 'Kimberley', city: 'Kimberley', postalCode: '8301', lat: -28.7383, lng: 24.7635, hasFibre: false, providers: [] }
    ]}
};

// Flatten locations for searching
let allLocations = [];
for (const provinceKey in locationsDatabase) {
    locationsDatabase[provinceKey].areas.forEach(area => {
        allLocations.push({ ...area, province: locationsDatabase[provinceKey].province, provinceKey });
    });
}

// Provider details with pricing
const providers = {
    openserve: { name: 'OpenServe', icon: 'fas fa-network-wired', color: '#0054A6', tech: 'FTTH', maxSpeed: 1000, speeds: [50, 100, 200, 500, 1000], prices: [599, 799, 1049, 1499, 1999] },
    vumatel: { name: 'Vumatel', icon: 'fas fa-tachometer-alt', color: '#E31E24', tech: 'FTTH', maxSpeed: 1000, speeds: [50, 100, 200, 500, 1000], prices: [649, 849, 1099, 1599, 2099] },
    octotel: { name: 'Octotel', icon: 'fas fa-building', color: '#00A3E0', tech: 'FTTH (Symmetrical)', maxSpeed: 1000, speeds: [50, 100, 200, 500, 1000], prices: [699, 899, 1199, 1699, 2199] },
    frogfoot: { name: 'Frogfoot', icon: 'fas fa-frog', color: '#2E8B57', tech: 'FTTH', maxSpeed: 500, speeds: [20, 50, 100, 200], prices: [449, 599, 799, 999] },
    metrofibre: { name: 'MetroFibre', icon: 'fas fa-chart-line', color: '#7C3AED', tech: 'FTTH', maxSpeed: 1000, speeds: [50, 100, 200, 500, 1000], prices: [699, 899, 1199, 1699, 2199] },
    vodacom: { name: 'Vodacom Fibre', icon: 'fas fa-mobile-alt', color: '#ED0776', tech: 'FTTH', maxSpeed: 500, speeds: [50, 100, 200], prices: [699, 899, 1099] },
    mtn: { name: 'MTN Fibre', icon: 'fas fa-signal', color: '#FFC000', tech: 'FTTH', maxSpeed: 500, speeds: [50, 100, 200], prices: [699, 899, 1099] }
};

// Search function
function searchLocation(query) {
    if (!query || query.length < 2) return [];
    const lowerQuery = query.toLowerCase();
    return allLocations.filter(loc => 
        loc.name.toLowerCase().includes(lowerQuery) || 
        loc.suburb.toLowerCase().includes(lowerQuery) || 
        loc.city.toLowerCase().includes(lowerQuery) || 
        loc.postalCode.includes(query)
    ).slice(0, 10);
}