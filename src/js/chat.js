// ========== AI CHAT ASSISTANT ==========
class GrayTechChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.agentName = 'GrayBot';
        this.agentAvatar = 'fas fa-robot';
        
        // Chat knowledge base
        this.knowledgeBase = {
            greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
            pricing: ['price', 'cost', 'how much', 'package', 'plan', 'pricing', 'rates', 'monthly', 'subscription'],
            coverage: ['coverage', 'available', 'area', 'location', 'fibre map', 'check availability', 'can i get'],
            speed: ['speed', 'fast', 'mbps', 'gigabit', 'slow', 'download', 'upload', 'performance'],
            support: ['support', 'help', 'issue', 'problem', 'not working', 'down', 'complaint', 'ticket'],
            installation: ['install', 'installation', 'setup', 'technician', 'appointment', 'schedule'],
            billing: ['bill', 'invoice', 'payment', 'pay', 'debit order', 'eft', 'credit card', 'refund'],
            contract: ['contract', 'cancel', 'terminate', 'notice', 'month to month', '12 months', '24 months'],
            order: ['order', 'sign up', 'register', 'buy', 'purchase', 'get connected'],
            router: ['router', 'wifi', 'device', 'modem', 'settings', 'connection'],
            loadShedding: ['load shedding', 'power', 'backup', 'ups', 'battery', 'eskom'],
            business: ['business', 'company', 'office', 'commercial', 'corporate'],
            home: ['home', 'residential', 'house', 'apartment', 'flat'],
            providers: ['openserve', 'vumatel', 'octotel', 'frogfoot', 'metrofibre', 'vodacom', 'mtn', 'provider']
        };
        
        this.responses = {
            greeting: "Hey there! 👋 I'm GrayBot, your AI assistant. How can I help you with your fibre internet needs today?",
            pricing: "Our fibre packages start from R459/month. Here are our popular plans:\n\n• LTE Starter: R459/month (200GB)\n• LTE Pro: R699/month (400GB)\n• Fibre 100: R899/month (1TB)\n• Fibre 500: R1,299/month (Unlimited)\n\nWould you like me to check which packages are available in your area?",
            coverage: "I can help you check fibre availability! 🔍\n\nJust tell me your suburb or city name (e.g., 'Sandton', 'Cape Town', 'Durban', 'Fourways'), or use our coverage checker on this page.\n\nWould you like me to check for you?",
            speed: "Our fibre speeds range from 50Mbps to 1Gbps depending on your area and provider:\n\n• 50Mbps: Perfect for streaming & browsing\n• 100Mbps: Great for families & WFH\n• 200Mbps: Ideal for gamers & 4K streaming\n• 500Mbps: Power user / small business\n• 1Gbps: Enterprise / heavy usage\n\nWhat speed are you interested in?",
            support: "I'm sorry to hear you're having an issue. 😟\n\nOur support team is available 24/7. You can:\n\n1. Call us: 087 701 9055\n2. Email: support@graytechsystems.co.za\n3. Create a support ticket in your customer portal\n\nWould you like me to help you create a ticket?",
            installation: "Great news! 🎉\n\nHere's what happens after you sign up:\n\n1️⃣ Confirmation email within minutes\n2️⃣ Installation scheduled within 24 hours\n3️⃣ Technician visits within 3-5 business days\n4️⃣ Free router installation included\n\nReady to get started? I can help you sign up right now!",
            billing: "For billing inquiries, you can:\n\n• Pay online via our customer portal\n• Set up debit order (DebiCheck)\n• Call our finance team: 087 701 9056\n\nIs there a specific invoice or payment issue I can help with?",
            contract: "All our fibre packages come with a 12-month contract. LTE plans offer month-to-month options.\n\nNeed to cancel? Please give 30 days written notice to support@graytechsystems.co.za",
            order: "Awesome! Let's get you connected. 🚀\n\nJust click the 'Check Coverage' button on this page, enter your address, and you'll see available providers and packages. Then you can complete your order online in minutes.\n\nWould you like me to guide you through the process?",
            router: "All our fibre packages include a FREE high-quality router! 🎁\n\n• LTE plans: Free 4G/LTE router\n• 100Mbps+: Free standard router\n• 500Mbps+: Free mesh router\n\nNeed help with router configuration? I can assist!",
            loadShedding: "We've got you covered during load shedding! 💡\n\n• Most exchanges have backup power\n• We offer UPS solutions for your home/office\n• Our LTE packages work during power outages\n\nWould you like to learn about our backup power solutions?",
            business: "For business solutions, we offer:\n\n• Dedicated business fibre (SLA-backed)\n• VoIP phone systems (save up to 60%)\n• Network security & monitoring\n• IT maintenance & support\n\nWould you like me to connect you with our business team?",
            home: "For home users, we have:\n\n• Fibre packages from 50Mbps to 1Gbps\n• LTE/5G for reliable backup\n• Smart home security solutions\n\nWhat's your primary use? Streaming, gaming, working from home?",
            providers: "We work with multiple providers to give you the best coverage:\n\n• OpenServe (largest network)\n• Vumatel (major metros)\n• Octotel (Western Cape)\n• Frogfoot (growing network)\n• MetroFibre (premium areas)\n• Vodacom & MTN (selected areas)\n\nCheck your area to see available providers!",
            default: "Thanks for your message! 📡\n\nI'm still learning, but I can help with:\n• Fibre packages & pricing 💰\n• Coverage checking 🗺️\n• Installation process 🔧\n• Support & troubleshooting 🛠️\n• Billing & payments 💳\n\nCould you rephrase your question or select one of the suggestions below?"
        };
        
        this.init();
    }
    
    init() {
        this.createChatWidget();
        this.loadMessages();
        this.setupEventListeners();
    }
    
    createChatWidget() {
        // Check if chat widget already exists
        if (document.querySelector('.chat-widget')) return;
        
        const chatHTML = `
            <div class="chat-widget">
                <div class="chat-button" id="chatButton">
                    <i class="fas fa-comment-dots"></i>
                    <span class="notification-badge">1</span>
                </div>
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar">
                                <i class="${this.agentAvatar}"></i>
                            </div>
                            <div class="chat-header-text">
                                <h4>GrayTech Support</h4>
                                <p><span class="status-dot"></span> AI Assistant • Online</p>
                            </div>
                        </div>
                        <button class="chat-close" id="chatClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="message system">
                            <div class="message-avatar">
                                <i class="${this.agentAvatar}"></i>
                            </div>
                            <div class="message-content">
                                Hello! 👋 I'm GrayBot, your AI assistant.<br>
                                How can I help you with your fibre internet today?
                                <span class="message-time">Just now</span>
                                <div class="quick-replies">
                                    <button class="quick-reply" data-query="fibre packages">💰 View Packages</button>
                                    <button class="quick-reply" data-query="check coverage">🗺️ Check Coverage</button>
                                    <button class="quick-reply" data-query="installation">🔧 Installation Process</button>
                                    <button class="quick-reply" data-query="support">🛠️ Get Support</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-suggestions">
                        <span class="suggestion-chip" data-query="fibre packages">💰 Fibre Packages</span>
                        <span class="suggestion-chip" data-query="check coverage">🗺️ Check Coverage</span>
                        <span class="suggestion-chip" data-query="installation time">⏱️ Installation Time</span>
                        <span class="suggestion-chip" data-query="load shedding">⚡ Load Shedding</span>
                        <span class="suggestion-chip" data-query="business fibre">🏢 Business Fibre</span>
                        <span class="suggestion-chip" data-query="router included">📡 Router Included</span>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
                        <button class="chat-send" id="chatSend">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
    
    setupEventListeners() {
        const chatButton = document.getElementById('chatButton');
        const chatWindow = document.getElementById('chatWindow');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        
        if (chatButton) {
            chatButton.addEventListener('click', () => this.toggleChat());
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', () => this.closeChat());
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', () => this.sendMessage());
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
        
        // Quick reply buttons
        document.querySelectorAll('.quick-reply, .suggestion-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                if (query) {
                    document.getElementById('chatInput').value = query;
                    this.sendMessage();
                }
            });
        });
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (chatWindow) {
            this.isOpen = !this.isOpen;
            chatWindow.classList.toggle('open', this.isOpen);
            
            if (this.isOpen && notificationBadge) {
                notificationBadge.style.display = 'none';
            }
            
            if (this.isOpen) {
                document.getElementById('chatInput')?.focus();
            }
        }
    }
    
    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            this.isOpen = false;
            chatWindow.classList.remove('open');
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process and respond after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addMessage(response, 'system');
        }, 800 + Math.random() * 500);
    }
    
    processMessage(message) {
        const lowerMsg = message.toLowerCase();
        
        // Check for coverage request (includes suburb/city mention)
        const locationMatch = lowerMsg.match(/\b(sandton|johannesburg|pretoria|capetown|cape town|durban|fourways|midrand|centurion|randburg|roodepoort|bryanston|rosebank|menlyn|waterkloof|claremont|stellenbosch|paarl|bellville|umhlanga|ballito)\b/i);
        if ((lowerMsg.includes('coverage') || lowerMsg.includes('available') || lowerMsg.includes('area')) && locationMatch) {
            const city = locationMatch[0];
            return `I'm checking availability in ${city}... 🗺️\n\nGreat news! Fibre is available in ${city} through multiple providers like OpenServe, Vumatel, and Octotel. Speeds range from 50Mbps to 1Gbps starting from R599/month.\n\nWould you like me to check which specific packages are available in your exact address?`;
        }
        
        // Check for specific package request
        if (lowerMsg.includes('package') || lowerMsg.includes('plan') || (lowerMsg.includes('fibre') && (lowerMsg.includes('price') || lowerMsg.includes('cost')))) {
            return this.responses.pricing;
        }
        
        // Check for price/cost
        if (this.matchesAny(lowerMsg, this.knowledgeBase.pricing)) {
            return this.responses.pricing;
        }
        
        // Check for coverage
        if (this.matchesAny(lowerMsg, this.knowledgeBase.coverage)) {
            return this.responses.coverage;
        }
        
        // Check for speed
        if (this.matchesAny(lowerMsg, this.knowledgeBase.speed)) {
            return this.responses.speed;
        }
        
        // Check for support
        if (this.matchesAny(lowerMsg, this.knowledgeBase.support)) {
            return this.responses.support;
        }
        
        // Check for installation
        if (this.matchesAny(lowerMsg, this.knowledgeBase.installation)) {
            return this.responses.installation;
        }
        
        // Check for billing
        if (this.matchesAny(lowerMsg, this.knowledgeBase.billing)) {
            return this.responses.billing;
        }
        
        // Check for order/signup
        if (this.matchesAny(lowerMsg, this.knowledgeBase.order)) {
            return this.responses.order;
        }
        
        // Check for router
        if (this.matchesAny(lowerMsg, this.knowledgeBase.router)) {
            return this.responses.router;
        }
        
        // Check for load shedding
        if (this.matchesAny(lowerMsg, this.knowledgeBase.loadShedding)) {
            return this.responses.loadShedding;
        }
        
        // Check for business
        if (this.matchesAny(lowerMsg, this.knowledgeBase.business)) {
            return this.responses.business;
        }
        
        // Check for home/residential
        if (this.matchesAny(lowerMsg, this.knowledgeBase.home)) {
            return this.responses.home;
        }
        
        // Check for providers
        if (this.matchesAny(lowerMsg, this.knowledgeBase.providers)) {
            return this.responses.providers;
        }
        
        // Check for greeting
        if (this.matchesAny(lowerMsg, this.knowledgeBase.greetings)) {
            return this.responses.greeting;
        }
        
        // Default response
        return this.responses.default;
    }
    
    matchesAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (sender === 'system') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="${this.agentAvatar}"></i>
                </div>
                <div class="message-content">
                    ${this.formatMessage(text)}
                    <span class="message-time">${time}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${this.formatMessage(text)}
                    <span class="message-time">${time}</span>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Save to localStorage
        this.saveMessages();
    }
    
    formatMessage(text) {
        // Convert newlines to <br>
        return text.replace(/\n/g, '<br>');
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message system typing-message';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="${this.agentAvatar}"></i>
            </div>
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) {
            typingDiv.remove();
        }
        this.isTyping = false;
    }
    
    saveMessages() {
        const messages = [];
        document.querySelectorAll('#chatMessages .message').forEach(msg => {
            if (!msg.classList.contains('typing-message')) {
                messages.push({
                    text: msg.querySelector('.message-content')?.innerText || '',
                    sender: msg.classList.contains('user') ? 'user' : 'system'
                });
            }
        });
        localStorage.setItem('graytech_chat_messages', JSON.stringify(messages.slice(-50)));
    }
    
    loadMessages() {
        const saved = localStorage.getItem('graytech_chat_messages');
        if (saved) {
            const messages = JSON.parse(saved);
            const messagesContainer = document.getElementById('chatMessages');
            if (messagesContainer && messages.length > 0) {
                messagesContainer.innerHTML = '';
                messages.forEach(msg => {
                    this.addMessage(msg.text, msg.sender);
                });
            }
        }
    }// ========== AI CHAT ASSISTANT ==========
class GrayTechChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.agentName = 'GrayBot';
        this.agentAvatar = 'fas fa-robot';
        
        // Chat knowledge base
        this.knowledgeBase = {
            greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
            pricing: ['price', 'cost', 'how much', 'package', 'plan', 'pricing', 'rates', 'monthly', 'subscription'],
            coverage: ['coverage', 'available', 'area', 'location', 'fibre map', 'check availability', 'can i get'],
            speed: ['speed', 'fast', 'mbps', 'gigabit', 'slow', 'download', 'upload', 'performance'],
            support: ['support', 'help', 'issue', 'problem', 'not working', 'down', 'complaint', 'ticket'],
            installation: ['install', 'installation', 'setup', 'technician', 'appointment', 'schedule'],
            billing: ['bill', 'invoice', 'payment', 'pay', 'debit order', 'eft', 'credit card', 'refund'],
            contract: ['contract', 'cancel', 'terminate', 'notice', 'month to month', '12 months', '24 months'],
            order: ['order', 'sign up', 'register', 'buy', 'purchase', 'get connected'],
            router: ['router', 'wifi', 'device', 'modem', 'settings', 'connection'],
            loadShedding: ['load shedding', 'power', 'backup', 'ups', 'battery', 'eskom'],
            business: ['business', 'company', 'office', 'commercial', 'corporate'],
            home: ['home', 'residential', 'house', 'apartment', 'flat'],
            providers: ['openserve', 'vumatel', 'octotel', 'frogfoot', 'metrofibre', 'vodacom', 'mtn', 'provider']
        };
        
        this.responses = {
            greeting: "Hey there! 👋 I'm GrayBot, your AI assistant. How can I help you with your fibre internet needs today?",
            pricing: "Our fibre packages start from R459/month. Here are our popular plans:\n\n• LTE Starter: R459/month (200GB)\n• LTE Pro: R699/month (400GB)\n• Fibre 100: R899/month (1TB)\n• Fibre 500: R1,299/month (Unlimited)\n\nWould you like me to check which packages are available in your area?",
            coverage: "I can help you check fibre availability! 🔍\n\nJust tell me your suburb or city name (e.g., 'Sandton', 'Cape Town', 'Durban', 'Fourways'), or use our coverage checker on this page.\n\nWould you like me to check for you?",
            speed: "Our fibre speeds range from 50Mbps to 1Gbps depending on your area and provider:\n\n• 50Mbps: Perfect for streaming & browsing\n• 100Mbps: Great for families & WFH\n• 200Mbps: Ideal for gamers & 4K streaming\n• 500Mbps: Power user / small business\n• 1Gbps: Enterprise / heavy usage\n\nWhat speed are you interested in?",
            support: "I'm sorry to hear you're having an issue. 😟\n\nOur support team is available 24/7. You can:\n\n1. Call us: 087 701 9055\n2. Email: support@graytechsystems.co.za\n3. Create a support ticket in your customer portal\n\nWould you like me to help you create a ticket?",
            installation: "Great news! 🎉\n\nHere's what happens after you sign up:\n\n1️⃣ Confirmation email within minutes\n2️⃣ Installation scheduled within 24 hours\n3️⃣ Technician visits within 3-5 business days\n4️⃣ Free router installation included\n\nReady to get started? I can help you sign up right now!",
            billing: "For billing inquiries, you can:\n\n• Pay online via our customer portal\n• Set up debit order (DebiCheck)\n• Call our finance team: 087 701 9056\n\nIs there a specific invoice or payment issue I can help with?",
            contract: "All our fibre packages come with a 12-month contract. LTE plans offer month-to-month options.\n\nNeed to cancel? Please give 30 days written notice to support@graytechsystems.co.za",
            order: "Awesome! Let's get you connected. 🚀\n\nJust click the 'Check Coverage' button on this page, enter your address, and you'll see available providers and packages. Then you can complete your order online in minutes.\n\nWould you like me to guide you through the process?",
            router: "All our fibre packages include a FREE high-quality router! 🎁\n\n• LTE plans: Free 4G/LTE router\n• 100Mbps+: Free standard router\n• 500Mbps+: Free mesh router\n\nNeed help with router configuration? I can assist!",
            loadShedding: "We've got you covered during load shedding! 💡\n\n• Most exchanges have backup power\n• We offer UPS solutions for your home/office\n• Our LTE packages work during power outages\n\nWould you like to learn about our backup power solutions?",
            business: "For business solutions, we offer:\n\n• Dedicated business fibre (SLA-backed)\n• VoIP phone systems (save up to 60%)\n• Network security & monitoring\n• IT maintenance & support\n\nWould you like me to connect you with our business team?",
            home: "For home users, we have:\n\n• Fibre packages from 50Mbps to 1Gbps\n• LTE/5G for reliable backup\n• Smart home security solutions\n\nWhat's your primary use? Streaming, gaming, working from home?",
            providers: "We work with multiple providers to give you the best coverage:\n\n• OpenServe (largest network)\n• Vumatel (major metros)\n• Octotel (Western Cape)\n• Frogfoot (growing network)\n• MetroFibre (premium areas)\n• Vodacom & MTN (selected areas)\n\nCheck your area to see available providers!",
            default: "Thanks for your message! 📡\n\nI'm still learning, but I can help with:\n• Fibre packages & pricing 💰\n• Coverage checking 🗺️\n• Installation process 🔧\n• Support & troubleshooting 🛠️\n• Billing & payments 💳\n\nCould you rephrase your question or select one of the suggestions below?"
        };
        
        this.init();
    }
    
    init() {
        this.createChatWidget();
        this.loadMessages();
        this.setupEventListeners();
    }
    
    createChatWidget() {
        // Check if chat widget already exists
        if (document.querySelector('.chat-widget')) return;
        
        const chatHTML = `
            <div class="chat-widget">
                <div class="chat-button" id="chatButton">
                    <i class="fas fa-comment-dots"></i>
                    <span class="notification-badge">1</span>
                </div>
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar">
                                <i class="${this.agentAvatar}"></i>
                            </div>
                            <div class="chat-header-text">
                                <h4>GrayTech Support</h4>
                                <p><span class="status-dot"></span> AI Assistant • Online</p>
                            </div>
                        </div>
                        <button class="chat-close" id="chatClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="message system">
                            <div class="message-avatar">
                                <i class="${this.agentAvatar}"></i>
                            </div>
                            <div class="message-content">
                                Hello! 👋 I'm GrayBot, your AI assistant.<br>
                                How can I help you with your fibre internet today?
                                <span class="message-time">Just now</span>
                                <div class="quick-replies">
                                    <button class="quick-reply" data-query="fibre packages">💰 View Packages</button>
                                    <button class="quick-reply" data-query="check coverage">🗺️ Check Coverage</button>
                                    <button class="quick-reply" data-query="installation">🔧 Installation Process</button>
                                    <button class="quick-reply" data-query="support">🛠️ Get Support</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-suggestions">
                        <span class="suggestion-chip" data-query="fibre packages">💰 Fibre Packages</span>
                        <span class="suggestion-chip" data-query="check coverage">🗺️ Check Coverage</span>
                        <span class="suggestion-chip" data-query="installation time">⏱️ Installation Time</span>
                        <span class="suggestion-chip" data-query="load shedding">⚡ Load Shedding</span>
                        <span class="suggestion-chip" data-query="business fibre">🏢 Business Fibre</span>
                        <span class="suggestion-chip" data-query="router included">📡 Router Included</span>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
                        <button class="chat-send" id="chatSend">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
    
    setupEventListeners() {
        const chatButton = document.getElementById('chatButton');
        const chatWindow = document.getElementById('chatWindow');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        
        if (chatButton) {
            chatButton.addEventListener('click', () => this.toggleChat());
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', () => this.closeChat());
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', () => this.sendMessage());
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
        
        // Quick reply buttons
        document.querySelectorAll('.quick-reply, .suggestion-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                if (query) {
                    document.getElementById('chatInput').value = query;
                    this.sendMessage();
                }
            });
        });
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (chatWindow) {
            this.isOpen = !this.isOpen;
            chatWindow.classList.toggle('open', this.isOpen);
            
            if (this.isOpen && notificationBadge) {
                notificationBadge.style.display = 'none';
            }
            
            if (this.isOpen) {
                document.getElementById('chatInput')?.focus();
            }
        }
    }
    
    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            this.isOpen = false;
            chatWindow.classList.remove('open');
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process and respond after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addMessage(response, 'system');
        }, 800 + Math.random() * 500);
    }
    
    processMessage(message) {
        const lowerMsg = message.toLowerCase();
        
        // Check for coverage request (includes suburb/city mention)
        const locationMatch = lowerMsg.match(/\b(sandton|johannesburg|pretoria|capetown|cape town|durban|fourways|midrand|centurion|randburg|roodepoort|bryanston|rosebank|menlyn|waterkloof|claremont|stellenbosch|paarl|bellville|umhlanga|ballito)\b/i);
        if ((lowerMsg.includes('coverage') || lowerMsg.includes('available') || lowerMsg.includes('area')) && locationMatch) {
            const city = locationMatch[0];
            return `I'm checking availability in ${city}... 🗺️\n\nGreat news! Fibre is available in ${city} through multiple providers like OpenServe, Vumatel, and Octotel. Speeds range from 50Mbps to 1Gbps starting from R599/month.\n\nWould you like me to check which specific packages are available in your exact address?`;
        }
        
        // Check for specific package request
        if (lowerMsg.includes('package') || lowerMsg.includes('plan') || (lowerMsg.includes('fibre') && (lowerMsg.includes('price') || lowerMsg.includes('cost')))) {
            return this.responses.pricing;
        }
        
        // Check for price/cost
        if (this.matchesAny(lowerMsg, this.knowledgeBase.pricing)) {
            return this.responses.pricing;
        }
        
        // Check for coverage
        if (this.matchesAny(lowerMsg, this.knowledgeBase.coverage)) {
            return this.responses.coverage;
        }
        
        // Check for speed
        if (this.matchesAny(lowerMsg, this.knowledgeBase.speed)) {
            return this.responses.speed;
        }
        
        // Check for support
        if (this.matchesAny(lowerMsg, this.knowledgeBase.support)) {
            return this.responses.support;
        }
        
        // Check for installation
        if (this.matchesAny(lowerMsg, this.knowledgeBase.installation)) {
            return this.responses.installation;
        }
        
        // Check for billing
        if (this.matchesAny(lowerMsg, this.knowledgeBase.billing)) {
            return this.responses.billing;
        }
        
        // Check for order/signup
        if (this.matchesAny(lowerMsg, this.knowledgeBase.order)) {
            return this.responses.order;
        }
        
        // Check for router
        if (this.matchesAny(lowerMsg, this.knowledgeBase.router)) {
            return this.responses.router;
        }
        
        // Check for load shedding
        if (this.matchesAny(lowerMsg, this.knowledgeBase.loadShedding)) {
            return this.responses.loadShedding;
        }
        
        // Check for business
        if (this.matchesAny(lowerMsg, this.knowledgeBase.business)) {
            return this.responses.business;
        }
        
        // Check for home/residential
        if (this.matchesAny(lowerMsg, this.knowledgeBase.home)) {
            return this.responses.home;
        }
        
        // Check for providers
        if (this.matchesAny(lowerMsg, this.knowledgeBase.providers)) {
            return this.responses.providers;
        }
        
        // Check for greeting
        if (this.matchesAny(lowerMsg, this.knowledgeBase.greetings)) {
            return this.responses.greeting;
        }
        
        // Default response
        return this.responses.default;
    }
    
    matchesAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (sender === 'system') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="${this.agentAvatar}"></i>
                </div>
                <div class="message-content">
                    ${this.formatMessage(text)}
                    <span class="message-time">${time}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${this.formatMessage(text)}
                    <span class="message-time">${time}</span>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Save to localStorage
        this.saveMessages();
    }
    
    formatMessage(text) {
        // Convert newlines to <br>
        return text.replace(/\n/g, '<br>');
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message system typing-message';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="${this.agentAvatar}"></i>
            </div>
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) {
            typingDiv.remove();
        }
        this.isTyping = false;
    }
    
    saveMessages() {
        const messages = [];
        document.querySelectorAll('#chatMessages .message').forEach(msg => {
            if (!msg.classList.contains('typing-message')) {
                messages.push({
                    text: msg.querySelector('.message-content')?.innerText || '',
                    sender: msg.classList.contains('user') ? 'user' : 'system'
                });
            }
        });
        localStorage.setItem('graytech_chat_messages', JSON.stringify(messages.slice(-50)));
    }
    
    loadMessages() {
        const saved = localStorage.getItem('graytech_chat_messages');
        if (saved) {
            const messages = JSON.parse(saved);
            const messagesContainer = document.getElementById('chatMessages');
            if (messagesContainer && messages.length > 0) {
                messagesContainer.innerHTML = '';
                messages.forEach(msg => {
                    this.addMessage(msg.text, msg.sender);
                });
            }
        }
    }
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.grayTechChat = new GrayTechChat();
});
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.grayTechChat = new GrayTechChat();
});