// ========== MODULE RENDERING FUNCTIONS ==========

function updateStats() {
  const pendingTotal = getPendingTotal();
  const activeTickets = getActiveTicketCount();
  const percentUsed = (appData.usage.used / appData.usage.total) * 100;
  
  document.getElementById('statsGrid').innerHTML = `
      <div class="stat-card" onclick="switchSection('services')">
          <div class="stat-info"><h3>Current Plan</h3><div class="stat-value">${appData.user.currentPlan}</div><div class="stat-trend">R ${appData.user.monthlyCost}/month</div></div>
          <div class="stat-icon"><i class="fas fa-tachometer-alt"></i></div>
      </div>
      <div class="stat-card" onclick="switchSection('usage')">
          <div class="stat-info"><h3>Data Used</h3><div class="stat-value">${appData.usage.used} / ${appData.usage.total} GB</div><div class="stat-trend">${Math.round(percentUsed)}% of monthly cap</div></div>
          <div class="stat-icon"><i class="fas fa-database"></i></div>
      </div>
      <div class="stat-card" onclick="switchSection('billing')">
          <div class="stat-info"><h3>Outstanding Balance</h3><div class="stat-value">${formatCurrency(pendingTotal)}</div><div class="stat-trend">Due by ${appData.invoices.find(i => i.status === 'pending')?.dueDate || 'No pending'}</div></div>
          <div class="stat-icon"><i class="fas fa-credit-card"></i></div>
      </div>
      <div class="stat-card" onclick="switchSection('support')">
          <div class="stat-info"><h3>Active Tickets</h3><div class="stat-value">${activeTickets}</div><div class="stat-trend">Avg response: < 24h</div></div>
          <div class="stat-icon"><i class="fas fa-ticket-alt"></i></div>
      </div>
  `;
}

function renderOverview() {
  updateStats();
  
  // Recent Invoices
  const recentInvoicesBody = document.getElementById('recentInvoicesBody');
  recentInvoicesBody.innerHTML = appData.invoices.slice(0, 3).map(inv => `
      <tr>
          <td><strong>${inv.id}</strong></td>
          <td>${inv.date}</td>
          <td>${formatCurrency(inv.amount)}</td>
          <td><span class="status-${inv.status}">${inv.status === 'pending' ? 'Pending' : 'Paid'}</span></td>
          <td>${inv.status === 'pending' ? `<button class="btn-pay" data-id="${inv.id}" data-amount="${inv.amount}">Pay Now</button>` : '<span class="badge-default">Paid</span>'}</td>
      </tr>
  `).join('');
  
  document.querySelectorAll('.btn-pay').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); openPaymentModal(btn.dataset.id, btn.dataset.amount); });
  });
  
  // Active Tickets Preview
  const ticketsPreview = document.getElementById('ticketsPreviewList');
  const activeTickets = appData.tickets.filter(t => t.status !== 'resolved');
  ticketsPreview.innerHTML = activeTickets.length > 0 ? activeTickets.map(ticket => `
      <div class="ticket-item" onclick="openTicketDetail(${ticket.id})">
          <div class="ticket-header"><span class="ticket-title">${ticket.title}</span><span class="status-${ticket.status}">${ticket.status === 'progress' ? 'In Progress' : 'Open'}</span></div>
          <div class="ticket-message">${ticket.message.substring(0, 100)}${ticket.message.length > 100 ? '...' : ''}</div>
          <div class="ticket-date"><i class="far fa-clock"></i> Updated: ${ticket.lastUpdate}</div>
      </div>
  `).join('') : '<div class="text-center p-4 text-muted">No active tickets. <a onclick="openNewTicketModal()">Create one here →</a></div>';
}

function renderAllInvoices() {
  const allInvoicesBody = document.getElementById('allInvoicesBody');
  allInvoicesBody.innerHTML = appData.invoices.map(inv => `
      <tr>
          <td><strong>${inv.id}</strong></td>
          <td>${inv.date}</td>
          <td>${inv.dueDate}</td>
          <td>${formatCurrency(inv.amount)}</td>
          <td><span class="status-${inv.status}">${inv.status === 'pending' ? 'Pending' : 'Paid'}</span></td>
          <td>${inv.status === 'pending' ? `<button class="btn-pay" data-id="${inv.id}" data-amount="${inv.amount}">Pay Now</button>` : '<span class="badge-default"><i class="fas fa-check"></i> Paid</span>'}</td>
      </tr>
  `).join('');
  
  document.querySelectorAll('.btn-pay').forEach(btn => {
      btn.addEventListener('click', () => openPaymentModal(btn.dataset.id, btn.dataset.amount));
  });
}

function renderAllTickets() {
  const allTicketsList = document.getElementById('allTicketsList');
  allTicketsList.innerHTML = appData.tickets.map(ticket => `
      <div class="ticket-item" onclick="openTicketDetail(${ticket.id})">
          <div class="ticket-header">
              <span class="ticket-title">${ticket.title}</span>
              <div><span class="status-${ticket.status}">${ticket.status === 'progress' ? 'In Progress' : ticket.status === 'open' ? 'Open' : 'Resolved'}</span><span class="badge-default" style="margin-left:0.5rem">${ticket.priority}</span></div>
          </div>
          <div class="ticket-message">${ticket.message}</div>
          <div class="ticket-date"><i class="far fa-calendar-alt"></i> Opened: ${ticket.date} | <i class="far fa-clock"></i> Last update: ${ticket.lastUpdate}</div>
      </div>
  `).join('');
}

function renderProfile() {
  document.getElementById('profileInfo').innerHTML = `
      <div class="profile-grid">
          <div class="profile-field"><label>Full Name</label><div class="value">${appData.user.name}</div></div>
          <div class="profile-field"><label>Email Address</label><div class="value">${appData.user.email}</div></div>
          <div class="profile-field"><label>Phone Number</label><div class="value">${appData.user.phone}</div></div>
          <div class="profile-field"><label>Alternate Phone</label><div class="value">${appData.user.alternatePhone || 'Not provided'}</div></div>
          <div class="profile-field"><label>Account Type</label><div class="value">${appData.user.accountType}</div></div>
          <div class="profile-field"><label>Account Number</label><div class="value">${appData.user.id}</div></div>
          <div class="profile-field"><label>VAT Number</label><div class="value">${appData.user.vatNumber}</div></div>
          <div class="profile-field"><label>Tax Status</label><div class="value">${appData.user.taxStatus}</div></div>
      </div>
  `;
  
  document.getElementById('billingAddress').innerHTML = `
      <div style="line-height: 1.8">
          <div><strong>${appData.user.name}</strong></div>
          <div>${appData.address.street}</div>
          <div>${appData.address.suburb}, ${appData.address.city}</div>
          <div>${appData.address.province}, ${appData.address.postalCode}</div>
          <div>${appData.address.country}</div>
      </div>
  `;
  
  document.getElementById('contractInfo').innerHTML = `
      <div class="profile-grid">
          <div class="profile-field"><label>Current Plan</label><div class="value">${appData.user.currentPlan}</div></div>
          <div class="profile-field"><label>Monthly Subscription</label><div class="value">${formatCurrency(appData.user.monthlyCost)}</div></div>
          <div class="profile-field"><label>Contract Start</label><div class="value">${appData.user.contractStart}</div></div>
          <div class="profile-field"><label>Contract End</label><div class="value">${appData.user.contractEnd}</div></div>
          <div class="profile-field"><label>Payment Day</label><div class="value">${appData.user.paymentDay}</div></div>
          <div class="profile-field"><label>Debit Order Date</label><div class="value">${appData.user.debitOrderDate}</div></div>
          <div class="profile-field"><label>Account Status</label><div class="value"><span class="status-paid">${appData.user.accountStatus}</span></div></div>
          <div class="profile-field"><label>Credit Limit</label><div class="value">${formatCurrency(appData.user.creditLimit)}</div></div>
      </div>
  `;
}

function renderServices() {
  document.getElementById('serviceStats').innerHTML = `
      <div class="stat-card"><div class="stat-info"><h3>Active Service</h3><div class="stat-value">${appData.user.currentPlan}</div><div class="stat-trend">${appData.user.currentPlan}</div></div><div class="stat-icon"><i class="fas fa-tachometer-alt"></i></div></div>
      <div class="stat-card"><div class="stat-info"><h3>Monthly Cost</h3><div class="stat-value">${formatCurrency(appData.user.monthlyCost)}</div><div class="stat-trend">Including VAT</div></div><div class="stat-icon"><i class="fas fa-wallet"></i></div></div>
      <div class="stat-card"><div class="stat-info"><h3>Contract End</h3><div class="stat-value">${appData.user.contractEnd}</div><div class="stat-trend">${Math.ceil((new Date(appData.user.contractEnd) - new Date()) / (1000 * 60 * 60 * 24))} days remaining</div></div><div class="stat-icon"><i class="fas fa-calendar-alt"></i></div></div>
  `;
  
  document.getElementById('upgradesList').innerHTML = appData.upgrades.map(up => `
      <div class="plan-card" onclick="openOrderModal('${up.name}', ${up.price})">
          <div class="plan-name">${up.name}</div><div class="plan-speed">${up.speed}</div><div class="plan-price">${formatCurrency(up.price)}/month</div>
          <div class="plan-features"><small>${up.features.slice(0, 2).join(' • ')}</small></div>
          <button class="btn-upgrade">Upgrade →</button>
      </div>
  `).join('');
  
  document.getElementById('addonsList').innerHTML = appData.addons.map(addon => `
      <div class="plan-card" onclick="openOrderModal('${addon.name}', ${addon.price})">
          <div class="plan-name">${addon.name}</div><div class="plan-speed">${addon.speed}</div><div class="plan-price">${formatCurrency(addon.price)}/month</div>
          <div class="plan-features"><small>${addon.features.slice(0, 2).join(' • ')}</small></div>
          <button class="btn-upgrade">Add →</button>
      </div>
  `).join('');
}

function renderUsageDetails() {
  const percent = (appData.usage.used / appData.usage.total) * 100;
  const peakPercent = (appData.usage.peakUsed / appData.usage.total) * 100;
  const offPeakPercent = (appData.usage.offPeakUsed / appData.usage.total) * 100;
  
  document.getElementById('usageDetails').innerHTML = `
      <div class="usage-item"><div class="usage-label"><span><i class="fas fa-chart-simple"></i> Monthly Data Usage</span><span><strong>${appData.usage.used} GB</strong> / ${appData.usage.total} GB (${Math.round(percent)}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${percent}%"></div></div></div>
      <div class="usage-item"><div class="usage-label"><span><i class="fas fa-moon"></i> Peak Hours (18:00 - 22:00)</span><span><strong>${appData.usage.peakUsed} GB</strong> (${Math.round(peakPercent)}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${peakPercent}%; background: var(--warning)"></div></div></div>
      <div class="usage-item"><div class="usage-label"><span><i class="fas fa-sun"></i> Off-Peak (22:00 - 18:00)</span><span><strong>${appData.usage.offPeakUsed} GB</strong> (${Math.round(offPeakPercent)}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${offPeakPercent}%; background: var(--success)"></div></div></div>
      <div class="usage-item"><div class="usage-label"><span><i class="fas fa-hourglass-half"></i> Remaining Data</span><span><strong>${appData.usage.remaining} GB</strong> (${Math.round(100 - percent)}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${100 - percent}%; background: var(--gray-light)"></div></div></div>
      <div class="usage-item"><div class="usage-label"><span><i class="fas fa-calendar-week"></i> Billing Cycle</span><span>${appData.usage.billingCycleStart} - ${appData.usage.billingCycleEnd}</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${Math.round((new Date() - new Date(appData.usage.billingCycleStart)) / (1000 * 60 * 60 * 24 * 30) * 100)}%; background: var(--info)"></div></div></div>
  `;
  
  if (dailyUsageChart) dailyUsageChart.update();
}

function renderSecurity() {
  document.getElementById('securitySettings').innerHTML = `
      <div class="profile-grid">
          <div class="profile-field"><label>Two-Factor Authentication (2FA)</label><div class="value">${appData.security.twoFactorEnabled ? '<span class="status-paid">Enabled</span>' : '<span class="status-pending">Disabled</span>'} <button class="btn-outline-small" id="toggle2FA" style="margin-left:0.5rem">${appData.security.twoFactorEnabled ? 'Disable' : 'Enable'}</button></div></div>
          <div class="profile-field"><label>Last Password Change</label><div class="value">${appData.security.lastPasswordChange} <button class="btn-outline-small" id="changePasswordBtn" style="margin-left:0.5rem">Change Password</button></div></div>
          <div class="profile-field"><label>Last Login</label><div class="value">${appData.security.lastLogin}</div></div>
          <div class="profile-field"><label>Trusted Devices</label><div class="value">${appData.security.trustedDevices.length} device(s) recognized</div></div>
      </div>
  `;
  
  document.getElementById('loginActivity').innerHTML = `
      <div class="table-responsive">
          <table class="invoice-table">
              <thead><tr><th>Date/Time</th><th>IP Address</th><th>Device</th><th>Browser</th><th>Location</th></tr></thead>
              <tbody>${appData.loginHistory.map(log => `<tr><td>${log.date}</td><td>${log.ip}</td><td>${log.device}</td><td>${log.browser}</td><td>${log.location}</td></tr>`).join('')}</tbody>
          </table>
      </div>
  `;
  
  document.getElementById('toggle2FA')?.addEventListener('click', () => { appData.security.twoFactorEnabled = !appData.security.twoFactorEnabled; renderSecurity(); showToast(`2FA ${appData.security.twoFactorEnabled ? 'enabled' : 'disabled'}`, 'success'); });
  document.getElementById('changePasswordBtn')?.addEventListener('click', () => { document.getElementById('changePasswordModal').classList.add('active'); });
}

function renderReferrals() {
  const referralHistory = document.getElementById('referralHistory');
  referralHistory.innerHTML = `
      <h4 style="margin-bottom:1rem">Referral History</h4>
      <div class="table-responsive">
          <table class="invoice-table">
              <thead><tr><th>Friend's Name</th><th>Date</th><th>Status</th><th>Credit Earned</th></tr></thead>
              <tbody>${appData.referrals.history.map(ref => `<tr><td>${ref.friend}</td><td>${ref.date}</td><td><span class="${ref.status === 'Active' ? 'status-paid' : 'status-pending'}">${ref.status}</span></td><td>${ref.creditEarned > 0 ? formatCurrency(ref.creditEarned) : '-'}</td></tr>`).join('')}</tbody>
          </table>
      </div>
  `;
  document.getElementById('referralLink').value = appData.referrals.link;
}

function renderNetworkStatus() {
  // Update network status in sidebar or header
  const statusDot = document.querySelector('.network-status') || document.createElement('div');
}