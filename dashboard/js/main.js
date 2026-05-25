// ========== MAIN APPLICATION LOGIC ==========

// Section Switching
function switchSection(section) {
    document.querySelectorAll('[id$="Section"]').forEach(el => el.style.display = 'none');
    document.getElementById(`${section}Section`).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${section}"]`).classList.add('active');
    
    const titles = { overview: 'Dashboard', usage: 'Data Usage', billing: 'Billing', support: 'Support Tickets', profile: 'Profile', services: 'Services', security: 'Security', referrals: 'Referrals' };
    document.querySelector('.page-title h1').textContent = titles[section] || 'Dashboard';
    
    // Render section-specific content
    if (section === 'overview') renderOverview();
    if (section === 'billing') renderAllInvoices();
    if (section === 'support') renderAllTickets();
    if (section === 'profile') renderProfile();
    if (section === 'services') renderServices();
    if (section === 'usage') renderUsageDetails();
    if (section === 'security') renderSecurity();
    if (section === 'referrals') renderReferrals();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast-notification ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// Modal Functions
function openPaymentModal(invoiceId, amount) {
    document.getElementById('modalInvoiceAmount').innerHTML = formatCurrency(parseFloat(amount));
    document.getElementById('paymentModal').classList.add('active');
    window.currentPaymentInvoice = invoiceId;
}

function openOrderModal(serviceName, price) {
    document.getElementById('orderServiceName').textContent = serviceName;
    document.getElementById('orderServicePrice').textContent = formatCurrency(price);
    document.getElementById('orderModal').classList.add('active');
    window.currentOrderService = { name: serviceName, price: price };
}

function openNewTicketModal() {
    document.getElementById('ticketModal').classList.add('active');
}

function openTicketDetail(ticketId) {
    const ticket = appData.tickets.find(t => t.id === ticketId);
    if (ticket) showToast(`Ticket #${ticketId}: ${ticket.title} - Status: ${ticket.status}`, 'info');
}

function openEditProfileModal() {
    document.getElementById('editFullName').value = appData.user.name;
    document.getElementById('editEmail').value = appData.user.email;
    document.getElementById('editPhone').value = appData.user.phone;
    document.getElementById('editProfileModal').classList.add('active');
}

function openEditAddressModal() {
    document.getElementById('editStreet').value = appData.address.street;
    document.getElementById('editCity').value = appData.address.city;
    document.getElementById('editPostalCode').value = appData.address.postalCode;
    document.getElementById('editAddressModal').classList.add('active');
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// Event Listeners Setup
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Confirm Payment
    document.getElementById('confirmPaymentBtn')?.addEventListener('click', () => {
        const card = document.getElementById('paymentCard')?.value;
        if (!card || card.length < 10) {
            showToast('Please enter a valid card number', 'error');
            return;
        }
        
        const invoice = appData.invoices.find(i => i.id === window.currentPaymentInvoice);
        if (invoice) {
            invoice.status = 'paid';
            invoice.paidDate = new Date().toLocaleDateString('en-GB');
            invoice.paymentMethod = 'Credit Card';
            updateStats();
            if (document.getElementById('billingSection').style.display !== 'none') renderAllInvoices();
            if (document.getElementById('overviewSection').style.display !== 'none') renderOverview();
            showToast(`Payment of ${formatCurrency(invoice.amount)} successful! Receipt sent to ${appData.user.email}`, 'success');
        }
        closeAllModals();
    });
    
    // Confirm Order
    document.getElementById('confirmOrderBtn')?.addEventListener('click', () => {
        showToast(`Upgrade to ${window.currentOrderService?.name} confirmed! Our team will contact you within 24 hours.`, 'success');
        closeAllModals();
    });
    
    // Submit Ticket
    document.getElementById('submitTicketBtn')?.addEventListener('click', () => {
        const subject = document.getElementById('ticketSubject')?.value;
        const message = document.getElementById('ticketMessage')?.value;
        
        if (!subject || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        const newTicket = {
            id: appData.tickets.length + 1,
            title: subject,
            message: message,
            status: 'open',
            date: new Date().toLocaleDateString('en-GB'),
            lastUpdate: 'Just now',
            priority: document.getElementById('ticketPriority')?.value || 'Normal',
            category: document.getElementById('ticketCategory')?.value || 'General',
            assignedTo: 'Unassigned',
            responses: []
        };
        
        appData.tickets.unshift(newTicket);
        
        if (document.getElementById('supportSection').style.display !== 'none') renderAllTickets();
        if (document.getElementById('overviewSection').style.display !== 'none') renderOverview();
        
        showToast(`Ticket #${newTicket.id} created successfully! We'll respond within 24 hours.`, 'success');
        closeAllModals();
        
        // Clear form fields
        document.getElementById('ticketSubject').value = '';
        document.getElementById('ticketMessage').value = '';
    });
    
    // Save Profile
    document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
        appData.user.name = document.getElementById('editFullName')?.value || appData.user.name;
        appData.user.email = document.getElementById('editEmail')?.value || appData.user.email;
        appData.user.phone = document.getElementById('editPhone')?.value || appData.user.phone;
        
        renderProfile();
        document.querySelector('.user-name').textContent = appData.user.name.split(' ')[0];
        document.getElementById('userAvatar').textContent = appData.user.name.split(' ').map(n => n[0]).join('');
        
        showToast('Profile updated successfully!', 'success');
        closeAllModals();
    });
    
    // Save Address
    document.getElementById('saveAddressBtn')?.addEventListener('click', () => {
        appData.address.street = document.getElementById('editStreet')?.value || appData.address.street;
        appData.address.city = document.getElementById('editCity')?.value || appData.address.city;
        appData.address.postalCode = document.getElementById('editPostalCode')?.value || appData.address.postalCode;
        
        renderProfile();
        showToast('Billing address updated successfully!', 'success');
        closeAllModals();
    });
    
    // Save Password
    document.getElementById('savePasswordBtn')?.addEventListener('click', () => {
        const newPassword = document.getElementById('newPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        
        if (!newPassword || newPassword !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            showToast('Password must be at least 8 characters', 'error');
            return;
        }
        
        appData.security.lastPasswordChange = new Date().toLocaleDateString('en-GB');
        renderSecurity();
        showToast('Password changed successfully!', 'success');
        closeAllModals();
        
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    });
    
    // Download Statement
    document.getElementById('downloadStatementBtn')?.addEventListener('click', () => {
        showToast('Statement downloaded. Check your downloads folder.', 'success');
    });
    
    // Copy Referral Link
    document.getElementById('copyReferralBtn')?.addEventListener('click', () => {
        const linkInput = document.getElementById('referralLink');
        linkInput.select();
        document.execCommand('copy');
        showToast('Referral link copied to clipboard!', 'success');
    });
    
    // Notifications
    document.getElementById('notificationBell')?.addEventListener('click', () => {
        showToast('You have 3 unread notifications: New invoice available, Service upgrade reminder, Support ticket update', 'info');
    });
    
    // Edit Buttons
    document.getElementById('editProfileBtn')?.addEventListener('click', openEditProfileModal);
    document.getElementById('editAddressBtn')?.addEventListener('click', openEditAddressModal);
    document.getElementById('newTicketBtn')?.addEventListener('click', openNewTicketModal);
    
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        showToast('Logged out successfully. Redirecting...', 'info');
        setTimeout(() => window.location.href = '../index.html', 1500);
    });
    
    document.getElementById('dropdownLogoutBtn')?.addEventListener('click', () => {
        showToast('Logged out successfully. Redirecting...', 'info');
        setTimeout(() => window.location.href = '../index.html', 1500);
    });
    
    // User Dropdown
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    userMenuBtn?.addEventListener('click', () => {
        userDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!userMenuBtn?.contains(e.target)) {
            userDropdown?.classList.remove('show');
        }
    });
}

// Sidebar Toggle
function setupSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    menuToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });
    
    overlay?.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection(item.dataset.section);
            if (window.innerWidth <= 992) {
                document.getElementById('sidebar')?.classList.remove('open');
                document.getElementById('sidebarOverlay')?.classList.remove('active');
            }
        });
    });
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    renderOverview();
    setupEventListeners();
    setupSidebar();
    setupNavigation();
    
    // Update user avatar and name
    const userNameElement = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    if (userNameElement) userNameElement.textContent = appData.user.name.split(' ')[0];
    if (userAvatar) userAvatar.textContent = appData.user.name.split(' ').map(n => n[0]).join('');
    
    console.log('Dashboard initialized', new Date().toLocaleString());
});