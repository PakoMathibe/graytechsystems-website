// Fibre network providers database
const fibreProviders = {
  openserve: {
    id: 'openserve',
    name: 'OpenServe',
    logo: 'fas fa-network-wired',
    description: "South Africa's largest fibre network provider",
    technology: 'FTTH (Fibre to the Home)',
    maxSpeed: '1000Mbps',
    coverage: 'National',
  },
  vumatel: {
    id: 'vumatel',
    name: 'Vumatel',
    logo: 'fas fa-tachometer-alt',
    description: 'Open access fibre network',
    technology: 'FTTH',
    maxSpeed: '1000Mbps',
    coverage: 'Major metros',
  },
  octotel: {
    id: 'octotel',
    name: 'Octotel',
    logo: 'fas fa-building',
    description: "Cape Town's leading fibre provider",
    technology: 'FTTH',
    maxSpeed: '1000Mbps',
    coverage: 'Western Cape',
  },
  frogfoot: {
    id: 'frogfoot',
    name: 'Frogfoot',
    logo: 'fas fa-frog',
    description: 'Growing fibre network across SA',
    technology: 'FTTH',
    maxSpeed: '500Mbps',
    coverage: 'Major cities',
  },
  mfn: {
    id: 'mfn',
    name: 'MetroFibre Networx',
    logo: 'fas fa-chart-line',
    description: 'High-speed fibre solutions',
    technology: 'FTTH/FTTB',
    maxSpeed: '1000Mbps',
    coverage: 'Select areas',
  },
  linkafrica: {
    id: 'linkafrica',
    name: 'Link Africa',
    logo: 'fas fa-link',
    description: 'Infrastructure provider',
    technology: 'FTTH',
    maxSpeed: '200Mbps',
    coverage: 'Limited areas',
  },
  vodacom: {
    id: 'vodacom',
    name: 'Vodacom Fibre',
    logo: 'fas fa-mobile-alt',
    description: "Vodacom's fibre network",
    technology: 'FTTH',
    maxSpeed: '500Mbps',
    coverage: 'Major centres',
  },
  mtn: {
    id: 'mtn',
    name: 'MTN Fibre',
    logo: 'fas fa-signal',
    description: "MTN's fibre infrastructure",
    technology: 'FTTH',
    maxSpeed: '500Mbps',
    coverage: 'Major centres',
  },
  fibrehoods: {
    id: 'fibrehoods',
    name: 'Fibrehoods',
    logo: 'fas fa-home',
    description: 'Community-focused fibre',
    technology: 'FTTH',
    maxSpeed: '200Mbps',
    coverage: 'Gauteng & WC',
  },
};

// Get providers for a location
function getProvidersForLocation(location) {
  if (!location.hasFibre || !location.fibreProviders) return [];
  return location.fibreProviders
    .map((providerId) => fibreProviders[providerId])
    .filter((p) => p);
}
