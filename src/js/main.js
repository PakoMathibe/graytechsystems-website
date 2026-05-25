// ========== GRAYTECH SYSTEMS - MAIN JAVASCRIPT ==========
(function() {
    'use strict';

    // Current Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // ============================================
    // COVERAGE DATA
    // ============================================
    const coverageLocations = {
        'sandton': { fibre: true, providers: ['OpenServe', 'Vumatel', 'Frogfoot', 'MetroFibre'], maxSpeed: '1Gbps' },
        'fourways': { fibre: true, providers: ['OpenServe', 'Vumatel'], maxSpeed: '500Mbps' },
        'midrand': { fibre: true, providers: ['OpenServe', 'Vumatel'], maxSpeed: '500Mbps' },
        'johannesburg': { fibre: true, providers: ['OpenServe', 'Vumatel', 'Frogfoot', 'Octotel'], maxSpeed: '1Gbps' },
        'pretoria': { fibre: true, providers: ['OpenServe', 'Vumatel', 'Frogfoot'], maxSpeed: '1Gbps' },
        'centurion': { fibre: true, providers: ['OpenServe', 'Vumatel', 'Frogfoot'], maxSpeed: '1Gbps' },
        'cape town': { fibre: true, providers: ['OpenServe', 'Octotel', 'Vumatel', 'Frogfoot'], maxSpeed: '1Gbps' },
        'durban': { fibre: true, providers: ['OpenServe', 'Vumatel', 'Frogfoot'], maxSpeed: '1Gbps' },
        'stellenbosch': { fibre: true, providers: ['OpenServe', 'Octotel', 'Vumatel'], maxSpeed: '1Gbps' }
    };

    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.className = `toast-notification ${type} show`;
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ============================================
    // COVERAGE CHECKER
    // ============================================
    const coverageForm = document.getElementById('connectivityCheckForm');
    if (coverageForm) {
        coverageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const address = document.getElementById('checkAddress').value.trim().toLowerCase();
            if (!address) {
                showToast('Please enter your address or suburb', 'error');
                return;
            }

            const resultDiv = document.getElementById('connectivityResult');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `<div class="text-center p-3"><div class="loading-spinner-small"></div> Checking availability for ${address}...</div>`;
            
            setTimeout(() => {
                let matched = null;
                for (const [key, data] of Object.entries(coverageLocations)) {
                    if (address.includes(key) || key.includes(address)) {
                        matched = { key, ...data };
                        break;
                    }
                }
                
                if (matched) {
                    resultDiv.innerHTML = `
                        <div class="coverage-result-card">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <i class="fas fa-check-circle text-success fa-lg"></i>
                                <strong class="text-success">Fibre Available!</strong>
                            </div>
                            <p class="small mb-2"><strong>${matched.key.charAt(0).toUpperCase() + matched.key.slice(1)}</strong> - Up to ${matched.maxSpeed}</p>
                            <div class="mb-2"><strong>Available providers:</strong><br>${matched.providers.map(p => `<span class="provider-badge">${p}</span>`).join('')}</div>
                            <div class="d-flex gap-2 mt-3">
                                <a href="fibre.html" class="btn btn-sm btn-primary">View Plans</a>
                                <a href="#" class="btn btn-sm btn-outline-primary open-quote-modal">Get Quote</a>
                            </div>
                        </div>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="coverage-result-card">
                            <i class="fas fa-map-marker-alt text-warning"></i>
                            <strong>Fibre coming soon to ${address}!</strong><br>
                            <small>Register your interest and we'll notify you.</small>
                            <div class="mt-2">
                                <a href="#" class="btn btn-sm btn-primary open-quote-modal">Register Interest</a>
                            </div>
                        </div>
                    `;
                }
                document.querySelectorAll('.open-quote-modal').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        document.getElementById('quoteModal').classList.add('active');
                    });
                });
            }, 1500);
        });
    }

    // ============================================
    // QUOTE MODAL
    // ============================================
    const quoteModal = document.getElementById('quoteModal');
    const quoteModalClose = document.querySelector('.quote-modal-close');
    
    if (quoteModalClose) {
        quoteModalClose.addEventListener('click', () => quoteModal.classList.remove('active'));
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === quoteModal) quoteModal.classList.remove('active');
    });
    
    // Open quote modal from various buttons
    const quoteTriggers = ['#openQuoteBtn', '#heroQuoteBtn', '#heroQuoteBtn2', '#ctaQuoteBtn', '#customQuoteBtn'];
    quoteTriggers.forEach(selector => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                quoteModal.classList.add('active');
            });
        }
    });
    
    // Select plan buttons
    document.querySelectorAll('.select-plan-btn, .compare-select').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = btn.dataset.plan;
            const price = btn.dataset.price;
            if (plan && document.getElementById('quoteService')) {
                document.getElementById('quoteService').value = plan.includes('Fibre') ? 'Fibre' : 'LTE/5G';
            }
            quoteModal.classList.add('active');
            if (plan) showToast(`${plan} selected! Complete the form to get started.`, 'success');
        });
    });
    
    // Submit quote form
    const quickQuoteForm = document.getElementById('quickQuoteForm');
    if (quickQuoteForm) {
        quickQuoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('quoteName').value;
            const email = document.getElementById('quoteEmail').value;
            if (!name || !email) {
                showToast('Please fill in required fields', 'error');
                return;
            }
            showToast(`Thank you ${name}! A consultant will contact you within 24 hours.`, 'success');
            quoteModal.classList.remove('active');
            this.reset();
        });
    }

    // ============================================
    // COMPARISON TABLE (appears when pricing section is visible)
    // ============================================
    const comparisonSection = document.getElementById('comparisonSection');
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection && comparisonSection) {
        const pricingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && comparisonSection) {
                    comparisonSection.style.display = 'block';
                }
            });
        }, { threshold: 0.3 });
        pricingObserver.observe(pricingSection);
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));

    // ============================================
    // WOW.JS INITIALIZATION
    // ============================================
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // SPINNER HIDE
    // ============================================
    const spinner = document.getElementById('spinner');
    if (spinner) {
        setTimeout(() => {
            spinner.classList.remove('show');
        }, 500);
    }
})();