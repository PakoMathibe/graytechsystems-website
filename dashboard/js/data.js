// Mock user data
window.appData = {
  user: {
    name: 'Thabo Nkosi',
    email: 'thabo@business.co.za',
    phone: '+27 82 555 1234',
    accountType: 'Business - Premium',
    currentPlan: 'Fibre 200Mbps',
    monthlyCost: 1245,
    contractEnd: '15 Dec 2025',
  },
  address: {
    street: '123 Business Park, Block C',
    city: 'Fourways, Johannesburg',
    postalCode: '2191',
  },
  usage: {
    total: 500,
    used: 347,
    peakUsed: 156,
    offPeakUsed: 191,
    daily: [45, 52, 48, 61, 55, 42, 44],
  },
  invoices: [
    {
      id: 'INV-2024-001',
      date: '15 Jan 2025',
      dueDate: '5 Feb 2025',
      amount: 1245,
      status: 'pending',
    },
    {
      id: 'INV-2024-052',
      date: '15 Dec 2024',
      dueDate: '5 Jan 2025',
      amount: 1245,
      status: 'paid',
    },
    {
      id: 'INV-2024-051',
      date: '15 Nov 2024',
      dueDate: '5 Dec 2024',
      amount: 1245,
      status: 'paid',
    },
    {
      id: 'INV-2024-050',
      date: '15 Oct 2024',
      dueDate: '5 Nov 2024',
      amount: 1245,
      status: 'paid',
    },
    {
      id: 'INV-2024-049',
      date: '15 Sep 2024',
      dueDate: '5 Oct 2024',
      amount: 1245,
      status: 'paid',
    },
  ],
  tickets: [
    {
      id: 1,
      title: 'Slow internet speeds in the evening',
      message: 'Our team is investigating. A technician has been assigned.',
      status: 'progress',
      date: '10 Jan 2025',
      lastUpdate: '2 hours ago',
    },
    {
      id: 2,
      title: 'Billing discrepancy on January invoice',
      message:
        "Awaiting response from billing department. We've escalated your query.",
      status: 'open',
      date: '20 Jan 2025',
      lastUpdate: 'Yesterday',
    },
    {
      id: 3,
      title: 'Router configuration assistance',
      message: 'Issue resolved. Configuration guide was emailed to you.',
      status: 'resolved',
      date: '5 Jan 2025',
      lastUpdate: '8 Jan 2025',
    },
  ],
  upgrades: [
    { name: 'Fibre 500Mbps', speed: '500/250 Mbps', price: 1845 },
    { name: 'Fibre 1Gbps', speed: '1000/500 Mbps', price: 2495 },
    {
      name: 'VoIP Business',
      speed: 'Unlimited Calls',
      price: 299,
      type: 'addon',
    },
  ],
};

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast-notification ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function updateDashboardStats() {
  document.getElementById('currentPlan').textContent =
    window.appData.user.currentPlan;
  document.getElementById(
    'dataUsed'
  ).textContent = `${window.appData.usage.used} / ${window.appData.usage.total} GB`;
  const pendingTotal = window.appData.invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => sum + i.amount, 0);
  document.getElementById(
    'outstandingBalance'
  ).textContent = `R ${pendingTotal.toLocaleString()}`;
  const activeTickets = window.appData.tickets.filter(
    (t) => t.status !== 'resolved'
  ).length;
  document.getElementById('activeTicketCount').textContent = activeTickets;
}
