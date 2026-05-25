// ========== GRAYTECH CUSTOMER PORTAL DATA ==========
// This file contains all mock data for the dashboard

const appData = {
  // User Profile
  user: {
      id: 'GT-10042',
      name: 'Thabo Nkosi',
      email: 'thabo@business.co.za',
      phone: '+27 82 555 1234',
      alternatePhone: '+27 11 234 5678',
      accountType: 'Business - Premium',
      currentPlan: 'Fibre 200Mbps',
      monthlyCost: 1245,
      contractStart: '15 Dec 2024',
      contractEnd: '15 Dec 2025',
      contractTerm: '12 months',
      registrationDate: '15 Dec 2024',
      vatNumber: '4870212345',
      taxStatus: 'VAT Registered',
      paymentDay: '5th of each month',
      debitOrderDate: '5th of each month',
      accountStatus: 'Active',
      creditLimit: 5000,
      currentCredit: 0
  },
  
  // Billing Address
  address: {
      street: '123 Business Park, Block C, 4th Floor',
      city: 'Fourways',
      suburb: 'Fourways',
      province: 'Gauteng',
      postalCode: '2191',
      country: 'South Africa'
  },
  
  // Data Usage
  usage: {
      total: 500,
      used: 347,
      remaining: 153,
      percentageUsed: 69.4,
      peakUsed: 156,
      offPeakUsed: 191,
      daily: [45.2, 52.1, 48.3, 61.5, 55.2, 42.8, 44.6],
      dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dateRange: '19-25 May 2026',
      billingCycleStart: '15 May 2026',
      billingCycleEnd: '14 Jun 2026',
      historicalUsage: [
          { month: 'Apr 2026', used: 482, total: 500 },
          { month: 'Mar 2026', used: 498, total: 500 },
          { month: 'Feb 2026', used: 445, total: 500 },
          { month: 'Jan 2026', used: 387, total: 500 }
      ]
  },
  
  // Invoices
  invoices: [
      { id: 'INV-2026-005', date: '15 May 2026', dueDate: '5 Jun 2026', amount: 1245, status: 'pending', items: [{ description: 'Fibre 200Mbps - Monthly Subscription', amount: 1245 }] },
      { id: 'INV-2026-004', date: '15 Apr 2026', dueDate: '5 May 2026', amount: 1245, status: 'paid', paidDate: '28 Apr 2026', paymentMethod: 'Debit Order' },
      { id: 'INV-2026-003', date: '15 Mar 2026', dueDate: '5 Apr 2026', amount: 1245, status: 'paid', paidDate: '1 Apr 2026', paymentMethod: 'Credit Card' },
      { id: 'INV-2026-002', date: '15 Feb 2026', dueDate: '5 Mar 2026', amount: 1245, status: 'paid', paidDate: '28 Feb 2026', paymentMethod: 'EFT' },
      { id: 'INV-2026-001', date: '15 Jan 2026', dueDate: '5 Feb 2026', amount: 1245, status: 'paid', paidDate: '30 Jan 2026', paymentMethod: 'Debit Order' },
      { id: 'INV-2025-012', date: '15 Dec 2025', dueDate: '5 Jan 2026', amount: 1120, status: 'paid', paidDate: '20 Dec 2025', paymentMethod: 'Credit Card' },
      { id: 'INV-2025-011', date: '15 Nov 2025', dueDate: '5 Dec 2025', amount: 1120, status: 'paid', paidDate: '28 Nov 2025', paymentMethod: 'Debit Order' }
  ],
  
  // Payment Methods
  paymentMethods: [
      { id: 1, type: 'visa', last4: '4242', expiry: '12/2027', isDefault: true },
      { id: 2, type: 'mastercard', last4: '1234', expiry: '09/2026', isDefault: false }
  ],
  
  // Support Tickets
  tickets: [
      { id: 1, title: 'Slow internet speeds in the evening', message: 'Our team is investigating. A technician has been assigned to your area.', status: 'progress', date: '10 Jan 2026', lastUpdate: '2 hours ago', priority: 'High', category: 'Technical', assignedTo: 'Support Team A', responses: [] },
      { id: 2, title: 'Billing discrepancy on January invoice', message: "Awaiting response from billing department. We've escalated your query.", status: 'open', date: '20 Jan 2026', lastUpdate: 'Yesterday', priority: 'Normal', category: 'Billing', assignedTo: 'Billing Team', responses: [] },
      { id: 3, title: 'Router configuration assistance', message: 'Issue resolved. Configuration guide was emailed to you.', status: 'resolved', date: '5 Jan 2026', lastUpdate: '8 Jan 2026', priority: 'Low', category: 'Technical', assignedTo: 'Technical Support', responses: [] }
  ],
  
  // Upgrades & Add-ons
  upgrades: [
      { id: 1, name: 'Fibre 500Mbps', speed: '500/250 Mbps', price: 1845, type: 'upgrade', features: ['Faster downloads', 'Better for multiple users', 'Ideal for 4K streaming'] },
      { id: 2, name: 'Fibre 1Gbps', speed: '1000/500 Mbps', price: 2495, type: 'upgrade', features: ['Ultimate speed', 'Zero lag gaming', '8K streaming ready'] }
  ],
  
  addons: [
      { id: 3, name: 'VoIP Business', speed: 'Unlimited Calls', price: 299, type: 'addon', features: ['Unlimited local calls', 'Voicemail to email', 'Call recording'] },
      { id: 4, name: 'Static IP Address', speed: 'Dedicated IPv4', price: 49, type: 'addon', features: ['Remote access', 'Host servers', 'Better security'] },
      { id: 5, name: 'Business Email Suite', speed: '5 Professional Emails', price: 99, type: 'addon', features: ['Custom domain', '50GB storage', 'Mobile sync'] },
      { id: 6, name: 'Cloud Backup', speed: '500GB Storage', price: 149, type: 'addon', features: ['Automatic backup', 'End-to-end encryption', '24/7 access'] }
  ],
  
  // Security Settings
  security: {
      twoFactorEnabled: false,
      lastPasswordChange: '15 Jan 2026',
      lastLogin: '25 May 2026 08:32',
      mfaMethods: ['SMS', 'Authenticator App (Not setup)'],
      trustedDevices: [
          { name: 'Chrome on Windows', lastUsed: '25 May 2026', location: 'Johannesburg' },
          { name: 'Safari on iPhone', lastUsed: '23 May 2026', location: 'Pretoria' }
      ]
  },
  
  // Login History
  loginHistory: [
      { date: '25 May 2026 08:32:15', ip: '197.234.12.45', device: 'Chrome on Windows', browser: 'Chrome 124', os: 'Windows 11', location: 'Johannesburg', successful: true },
      { date: '24 May 2026 19:15:22', ip: '197.234.12.45', device: 'Chrome on Windows', browser: 'Chrome 124', os: 'Windows 11', location: 'Johannesburg', successful: true },
      { date: '23 May 2026 09:05:47', ip: '102.132.44.12', device: 'Safari on iPhone', browser: 'Safari 17', os: 'iOS 17', location: 'Pretoria', successful: true },
      { date: '22 May 2026 21:30:00', ip: '102.132.44.12', device: 'Safari on iPhone', browser: 'Safari 17', os: 'iOS 17', location: 'Pretoria', successful: true },
      { date: '21 May 2026 07:45:33', ip: '197.234.12.45', device: 'Chrome on Windows', browser: 'Chrome 124', os: 'Windows 11', location: 'Johannesburg', successful: true }
  ],
  
  // Referral Program
  referrals: {
      code: 'THABO2026',
      link: 'https://graytechsystems.co.za/ref/THABO2026',
      friendsReferred: 3,
      creditEarned: 300,
      creditPending: 150,
      totalCredit: 450,
      history: [
          { friend: 'Sipho Dlamini', date: '10 May 2026', status: 'Active', creditEarned: 100 },
          { friend: 'Linda van der Merwe', date: '5 May 2026', status: 'Active', creditEarned: 100 },
          { friend: 'Ahmed Patel', date: '1 May 2026', status: 'Active', creditEarned: 100 },
          { friend: 'Michael Brown', date: '15 Apr 2026', status: 'Pending', creditEarned: 0 }
      ]
  },
  
  // Network Status
  networkStatus: {
      status: 'operational',
      uptime: '99.96%',
      lastOutage: '23 May 2026 (2 hours)',
      latency: '12ms',
      downloadSpeed: '198 Mbps',
      uploadSpeed: '97 Mbps',
      plannedMaintenance: [
          { date: '28 May 2026 02:00-04:00', duration: '2 hours', impact: 'Minor interruptions possible' }
      ]
  },
  
  // Notifications
  notifications: [
      { id: 1, type: 'invoice', title: 'New Invoice Available', message: 'Invoice #INV-2026-005 is ready for payment.', time: '5 min ago', read: false },
      { id: 2, type: 'upgrade', title: 'Service Upgrade Available', message: 'Fibre 1Gbps is now available in your area!', time: '1 hour ago', read: false },
      { id: 3, type: 'support', title: 'Support Ticket Update', message: 'Your ticket #1 has been updated by support.', time: 'Yesterday', read: false }
  ]
};

// Helper function to get total pending amount
function getPendingTotal() {
  return appData.invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
}

// Helper function to get active ticket count
function getActiveTicketCount() {
  return appData.tickets.filter(t => t.status !== 'resolved').length;
}

// Helper function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
}

// Helper function to format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-ZA');
}