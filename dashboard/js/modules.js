// Section switching
function switchSection(section) {
  document
    .querySelectorAll('[id$="Section"]')
    .forEach((el) => (el.style.display = 'none'));
  document.getElementById(`${section}Section`).style.display = 'block';
  document
    .querySelectorAll('.nav-item')
    .forEach((item) => item.classList.remove('active'));
  document
    .querySelector(`.nav-item[data-section="${section}"]`)
    .classList.add('active');
  const titles = {
    overview: 'Dashboard',
    usage: 'Data Usage',
    billing: 'Billing & Invoices',
    support: 'Support Tickets',
    profile: 'Account Settings',
    services: 'My Services',
  };
  document.querySelector('.page-title h1').textContent =
    titles[section] || 'Dashboard';

  if (section === 'overview') renderOverview();
  if (section === 'billing') renderAllInvoices();
  if (section === 'support') renderAllTickets();
  if (section === 'profile') renderProfile();
  if (section === 'services') renderServices();
  if (section === 'usage') renderUsageDetails();
}

function renderOverview() {
  const recentInvoicesBody = document.getElementById('recentInvoicesBody');
  recentInvoicesBody.innerHTML = window.appData.invoices
    .slice(0, 3)
    .map(
      (inv) => `
      <tr><td>${inv.id}</td><td>${
        inv.date
      }</td><td>R ${inv.amount.toLocaleString()}</td><td><span class="status-${
        inv.status
      }">${inv.status === 'pending' ? 'Pending' : 'Paid'}</span></td><td>${
        inv.status === 'pending'
          ? `<button class="btn-pay" data-invoice-id="${inv.id}" data-amount="${inv.amount}">Pay Now</button>`
          : ''
      }</td></tr>
  `
    )
    .join('');

  const ticketsPreview = document.getElementById('ticketsPreviewList');
  ticketsPreview.innerHTML = window.appData.tickets
    .filter((t) => t.status !== 'resolved')
    .slice(0, 2)
    .map(
      (ticket) => `
      <div class="ticket-item" onclick="openTicketDetail(${ticket.id})">
          <div class="ticket-header"><span class="ticket-title">${
            ticket.title
          }</span><span class="ticket-status status-${ticket.status}">${
        ticket.status === 'progress' ? 'In Progress' : 'Open'
      }</span></div>
          <div class="ticket-message">${ticket.message.substring(0, 80)}${
        ticket.message.length > 80 ? '...' : ''
      }</div>
          <div class="ticket-date">Opened: ${ticket.date} | Last update: ${
        ticket.lastUpdate
      }</div>
      </div>
  `
    )
    .join('');

  document.querySelectorAll('.btn-pay').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPaymentModal(btn.dataset.invoiceId, btn.dataset.amount);
    });
  });
}

function renderAllInvoices() {
  const allInvoicesBody = document.getElementById('allInvoicesBody');
  allInvoicesBody.innerHTML = window.appData.invoices
    .map(
      (inv) => `
      <tr>
          <td>${inv.id}</td><td>${inv.date}</td><td>${
        inv.dueDate
      }</td><td>R ${inv.amount.toLocaleString()}</td>
          <td><span class="status-${inv.status}">${
        inv.status === 'pending' ? 'Pending' : 'Paid'
      }</span></td>
          <td>${
            inv.status === 'pending'
              ? `<button class="btn-pay" data-invoice-id="${inv.id}" data-amount="${inv.amount}">Pay Now</button>`
              : ''
          }</td>
      </tr>
  `
    )
    .join('');
  document
    .querySelectorAll('.btn-pay')
    .forEach((btn) =>
      btn.addEventListener('click', () =>
        openPaymentModal(btn.dataset.invoiceId, btn.dataset.amount)
      )
    );
}

function renderAllTickets() {
  const allTicketsList = document.getElementById('allTicketsList');
  allTicketsList.innerHTML = window.appData.tickets
    .map(
      (ticket) => `
      <div class="ticket-item" onclick="openTicketDetail(${ticket.id})">
          <div class="ticket-header"><span class="ticket-title">${
            ticket.title
          }</span><span class="ticket-status status-${ticket.status}">${
        ticket.status === 'progress'
          ? 'In Progress'
          : ticket.status === 'open'
          ? 'Open'
          : 'Resolved'
      }</span></div>
          <div class="ticket-message">${ticket.message}</div>
          <div class="ticket-date">Opened: ${ticket.date} | Last update: ${
        ticket.lastUpdate
      }</div>
      </div>
  `
    )
    .join('');
}

function renderProfile() {
  document.getElementById('profileInfo').innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
          <div><label style="display: block; font-size: 0.75rem; color: var(--gray);">Full Name</label><div style="font-weight: 500;">${window.appData.user.name}</div></div>
          <div><label style="display: block; font-size: 0.75rem; color: var(--gray);">Email Address</label><div style="font-weight: 500;">${window.appData.user.email}</div></div>
          <div><label style="display: block; font-size: 0.75rem; color: var(--gray);">Phone Number</label><div style="font-weight: 500;">${window.appData.user.phone}</div></div>
          <div><label style="display: block; font-size: 0.75rem; color: var(--gray);">Account Type</label><div style="font-weight: 500;">${window.appData.user.accountType}</div></div>
      </div>
  `;
  document.getElementById('billingAddress').innerHTML = `
      <div style="line-height: 1.6;">
          <div>${window.appData.user.name}</div>
          <div>${window.appData.address.street}</div>
          <div>${window.appData.address.city}</div>
          <div>${window.appData.address.postalCode}</div>
      </div>
  `;
}

function renderServices() {
  document.getElementById('serviceStats').innerHTML = `
      <div class="stat-card"><div class="stat-info"><h3>Active Service</h3><div class="stat-value">${
        window.appData.user.currentPlan
      }</div></div><div class="stat-icon"><i class="fas fa-tachometer-alt"></i></div></div>
      <div class="stat-card"><div class="stat-info"><h3>Monthly Cost</h3><div class="stat-value">R ${window.appData.user.monthlyCost.toLocaleString()}</div></div><div class="stat-icon"><i class="fas fa-rand"></i></div></div>
      <div class="stat-card"><div class="stat-info"><h3>Contract End</h3><div class="stat-value">${
        window.appData.user.contractEnd
      }</div></div><div class="stat-icon"><i class="fas fa-calendar-alt"></i></div></div>
  `;
  const upgradesList = document.getElementById('upgradesList');
  upgradesList.innerHTML = window.appData.upgrades
    .map(
      (upgrade) => `
      <div class="plan-card" onclick="openOrderModal('${upgrade.name}', ${
        upgrade.price
      })">
          <div class="plan-name">${upgrade.name}</div>
          <div class="plan-speed">${upgrade.speed}</div>
          <div class="plan-price">R ${upgrade.price.toLocaleString()}/month</div>
          <button class="btn-upgrade">${
            upgrade.type === 'addon' ? 'Add Service' : 'Upgrade'
          }</button>
      </div>
  `
    )
    .join('');
}

function renderUsageDetails() {
  const percent =
    (window.appData.usage.used / window.appData.usage.total) * 100;
  document.getElementById('usageDetails').innerHTML = `
      <div class="usage-item"><div class="usage-label"><span>Monthly Data Usage</span><span>${
        window.appData.usage.used
      } GB / ${window.appData.usage.total} GB (${Math.round(
    percent
  )}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${percent}%"></div></div></div>
      <div class="usage-item"><div class="usage-label"><span>Peak Hours Usage (18:00 - 22:00)</span><span>${
        window.appData.usage.peakUsed
      } GB / ${window.appData.usage.total} GB (${Math.round(
    (window.appData.usage.peakUsed / window.appData.usage.total) * 100
  )}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${
    (window.appData.usage.peakUsed / window.appData.usage.total) * 100
  }%"></div></div></div>
      <div class="usage-item"><div class="usage-label"><span>Off-Peak Usage (22:00 - 18:00)</span><span>${
        window.appData.usage.offPeakUsed
      } GB / ${window.appData.usage.total} GB (${Math.round(
    (window.appData.usage.offPeakUsed / window.appData.usage.total) * 100
  )}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${
    (window.appData.usage.offPeakUsed / window.appData.usage.total) * 100
  }%"></div></div></div>
  `;
  if (dailyUsageChart) dailyUsageChart.update();
}

// Modal functions
function openPaymentModal(invoiceId, amount) {
  document.getElementById('modalInvoiceNumber').textContent = invoiceId;
  document.getElementById('modalInvoiceAmount').textContent = `R ${parseInt(
    amount
  ).toLocaleString()}`;
  document.getElementById('paymentModal').classList.add('active');
  window.currentPaymentInvoice = invoiceId;
}

function openOrderModal(serviceName, price) {
  document.getElementById('orderServiceName').textContent = serviceName;
  document.getElementById(
    'orderServicePrice'
  ).textContent = `R ${price.toLocaleString()}/month`;
  document.getElementById('orderModal').classList.add('active');
  window.currentOrderService = { name: serviceName, price: price };
}

function openTicketDetail(ticketId) {
  const ticket = window.appData.tickets.find((t) => t.id === ticketId);
  if (ticket)
    showToast(
      `Ticket #${ticketId}: ${ticket.title} - Status: ${ticket.status}`,
      'info'
    );
}

function openNewTicketModal() {
  document.getElementById('ticketModal').classList.add('active');
}
function openEditProfileModal() {
  document.getElementById('editFullName').value = window.appData.user.name;
  document.getElementById('editEmail').value = window.appData.user.email;
  document.getElementById('editPhone').value = window.appData.user.phone;
  document.getElementById('editProfileModal').classList.add('active');
}
function openEditAddressModal() {
  document.getElementById('editStreet').value = window.appData.address.street;
  document.getElementById('editCity').value = window.appData.address.city;
  document.getElementById('editPostalCode').value =
    window.appData.address.postalCode;
  document.getElementById('editAddressModal').classList.add('active');
}

// Close modals
document.querySelectorAll('.modal-close').forEach((closeBtn) => {
  closeBtn.addEventListener('click', () =>
    document
      .querySelectorAll('.modal')
      .forEach((m) => m.classList.remove('active'))
  );
});

// Confirm payment
document.getElementById('confirmPaymentBtn')?.addEventListener('click', () => {
  const invoice = window.appData.invoices.find(
    (i) => i.id === window.currentPaymentInvoice
  );
  if (invoice) {
    invoice.status = 'paid';
    updateDashboardStats();
    if (document.getElementById('billingSection').style.display !== 'none')
      renderAllInvoices();
    if (document.getElementById('overviewSection').style.display !== 'none')
      renderOverview();
    showToast(
      `Payment of R ${invoice.amount.toLocaleString()} successful! Receipt sent to email.`,
      'success'
    );
  }
  document.getElementById('paymentModal').classList.remove('active');
});

// Confirm order
document.getElementById('confirmOrderBtn')?.addEventListener('click', () => {
  showToast(
    `Upgrade to ${window.currentOrderService.name} confirmed! Our team will contact you within 24 hours.`,
    'success'
  );
  document.getElementById('orderModal').classList.remove('active');
});

// Submit ticket
document.getElementById('submitTicketBtn')?.addEventListener('click', () => {
  const subject = document.getElementById('ticketSubject').value;
  const message = document.getElementById('ticketMessage').value;
  const priority = document.getElementById('ticketPriority').value;
  if (!subject || !message) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  const newTicket = {
    id: window.appData.tickets.length + 1,
    title: subject,
    message: message,
    status: 'open',
    date: new Date().toLocaleDateString('en-GB'),
    lastUpdate: 'Just now',
  };
  window.appData.tickets.unshift(newTicket);
  updateDashboardStats();
  if (document.getElementById('supportSection').style.display !== 'none')
    renderAllTickets();
  if (document.getElementById('overviewSection').style.display !== 'none')
    renderOverview();
  showToast(
    `Ticket #${newTicket.id} created successfully! We'll respond within 24 hours.`,
    'success'
  );
  document.getElementById('ticketModal').classList.remove('active');
  document.getElementById('ticketSubject').value = '';
  document.getElementById('ticketMessage').value = '';
});

// Save profile
document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
  window.appData.user.name = document.getElementById('editFullName').value;
  window.appData.user.email = document.getElementById('editEmail').value;
  window.appData.user.phone = document.getElementById('editPhone').value;
  renderProfile();
  updateDashboardStats();
  showToast('Profile updated successfully!', 'success');
  document.getElementById('editProfileModal').classList.remove('active');
});

// Save address
document.getElementById('saveAddressBtn')?.addEventListener('click', () => {
  window.appData.address.street = document.getElementById('editStreet').value;
  window.appData.address.city = document.getElementById('editCity').value;
  window.appData.address.postalCode =
    document.getElementById('editPostalCode').value;
  renderProfile();
  showToast('Billing address updated successfully!', 'success');
  document.getElementById('editAddressModal').classList.remove('active');
});

// Notification bell
document.getElementById('notificationBell')?.addEventListener('click', () => {
  showToast(
    'You have 3 unread notifications: New invoice available, Service upgrade reminder, Support ticket update',
    'info'
  );
});

// Event listeners
document.getElementById('newTicketBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  openNewTicketModal();
});
document.getElementById('editProfileBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  openEditProfileModal();
});
document.getElementById('editAddressBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  openEditAddressModal();
});

// Navigation
document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection(item.dataset.section);
    if (window.innerWidth <= 992) toggleSidebar();
  });
});

// Mobile sidebar
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}
document.getElementById('menuToggle')?.addEventListener('click', toggleSidebar);
document
  .getElementById('sidebarOverlay')
  ?.addEventListener('click', toggleSidebar);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  updateDashboardStats();
  renderOverview();
});
