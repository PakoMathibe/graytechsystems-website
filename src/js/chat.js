// ========== GRAYTECH AI CHAT ASSISTANT ==========

class GrayTechChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.agentAvatar = 'fas fa-robot';
        this.init();
    }
    
    init() {
        this.createChatWidget();
        this.loadMessages();
        this.setupEventListeners();
    }
    
    createChatWidget() {
        if (document.querySelector('.chat-widget')) return;
        
        const chatHTML = `
            <div class="chat-widget">
                <div class="chat-button" id="chatButton">
                    <i class="fas fa-comment-dots"></i>
                    <span class="chat-badge">1</span>
                </div>
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar">
                                <i class="${this.agentAvatar}"></i>
                            </div>
                            <div class="chat-header-text">
                                <h4>GrayTech Support</h4>
                                <p><span class="status-dot"></span> AI Assistant • Online 24/7</p>
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
                                <div class="message-text">
                                    Hello! 👋 I'm GrayBot, your AI assistant.<br>
                                    How can I help you with your fibre internet today?
                                </div>
                                <div class="quick-replies">
                                    <button class="quick-reply" data-msg="fibre packages">💰 View Packages</button>
                                    <button class="quick-reply" data-msg="check coverage">🗺️ Check Coverage</button>
                                    <button class="quick-reply" data-msg="installation">🔧 Installation</button>
                                    <button class="quick-reply" data-msg="support">🛠️ Support</button>
                                </div>
                                <span class="message-time">Just now</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-suggestions">
                        <span class="suggestion-chip" data-msg="fibre packages">💰 Packages</span>
                        <span class="suggestion-chip" data-msg="check coverage">🗺️ Coverage</span>
                        <span class="suggestion-chip" data-msg="installation">⏱️ Installation</span>
                        <span class="suggestion-chip" data-msg="load shedding">⚡ Load Shedding</span>
                        <span class="suggestion-chip" data-msg="business fibre">🏢 Business</span>
                        <span class="suggestion-chip" data-msg="router included">📡 Router</span>
                    </div>
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <textarea class="chat-input" id="chatInput" placeholder="Type your message..." rows="1"></textarea>
                            <button class="chat-send" id="chatSend">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div class="chat-footer-note">
                            <i class="fas fa-lock"></i> Secure • <i class="fas fa-clock"></i> Quick response
                        </div>
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
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Auto-resize textarea
            chatInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 80) + 'px';
            });
        }
        
        // Quick reply and suggestion buttons
        document.querySelectorAll('.quick-reply, .suggestion-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                const msg = btn.dataset.msg;
                if (msg) {
                    const input = document.getElementById('chatInput');
                    if (input) input.value = msg;
                    this.sendMessage();
                }
            });
        });
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatBadge = document.querySelector('.chat-badge');
        
        if (chatWindow) {
            this.isOpen = !this.isOpen;
            chatWindow.classList.toggle('open', this.isOpen);
            
            if (this.isOpen && chatBadge) {
                chatBadge.style.display = 'none';
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
        const message = input?.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        input.style.height = 'auto';
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getBotResponse(message);
            this.addMessage(response, 'system');
        }, 800);
    }
    
    getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // Package info
        if (lowerMsg.includes('package') || lowerMsg.includes('price') || lowerMsg.includes('cost')) {
            return "💰 **Our Packages**\n\n• **LTE Starter:** R459/month (200GB)\n• **LTE Pro:** R699/month (400GB)\n• **Fibre 100:** R899/month (1TB)\n• **Fibre 500:** R1,299/month (Unlimited)\n\nAll plans include free installation and router! Which one interests you?";
        }
        
        // Coverage
        if (lowerMsg.includes('coverage') || lowerMsg.includes('available')) {
            return "🗺️ **Check Your Coverage**\n\nPlease tell me your suburb or city (e.g., 'Sandton', 'Cape Town', 'Durban') and I'll check which providers are available in your area.\n\nOr use our coverage checker on the homepage!";
        }
        
        // Installation
        if (lowerMsg.includes('installation')) {
            return "🔧 **Installation Process**\n\n1️⃣ Confirmation email within minutes\n2️⃣ Installation scheduled within 24 hours\n3️⃣ Technician visits within 3-5 business days\n4️⃣ Free router installation included\n\nReady to get started?";
        }
        
        // Support
        if (lowerMsg.includes('support') || lowerMsg.includes('help')) {
            return "🛠️ **Need Support?**\n\n📞 Call us: 087 701 9055\n📧 Email: support@graytechsystems.co.za\n💬 Live chat: Available 8am-8pm\n\nHow can I assist further?";
        }
        
        // Load shedding
        if (lowerMsg.includes('load shedding') || lowerMsg.includes('backup')) {
            return "⚡ **Load Shedding Solutions**\n\n• Most exchanges have backup power (8+ hours)\n• LTE works during power outages\n• UPS solutions from R1,299\n• Backup generators for businesses\n\nWould you like a quote?";
        }
        
        // Business
        if (lowerMsg.includes('business') || lowerMsg.includes('company')) {
            return "🏢 **Business Solutions**\n\n• Dedicated fibre (99.99% uptime)\n• VoIP systems (save 60% on calls)\n• Network security (24/7 monitoring)\n• IT support (on-site & remote)\n\nRequest a business quote for custom pricing!";
        }
        
        // Router
        if (lowerMsg.includes('router')) {
            return "📡 **Free Router Included!**\n\n• LTE plans: Free 4G router\n• 100Mbps+: Free standard router\n• 500Mbps+: Free mesh router system\n\nNeed help with setup? I can guide you!";
        }
        
        // Greeting
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
            return "Hey there! 👋 I'm GrayBot, your AI assistant. How can I help with your fibre internet needs today?";
        }
        
        // Thank you
        if (lowerMsg.includes('thank')) {
            return "You're very welcome! 😊\n\nIs there anything else I can help with? You can also call 087 701 9055 for immediate assistance.";
        }
        
        // Default
        return "Thanks for your message! 📡\n\nI can help with:\n💰 Packages & pricing\n🗺️ Coverage checking\n🔧 Installation process\n🛠️ Support & troubleshooting\n\nCould you rephrase your question or select one of the options below?";
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (sender === 'system') {
            messageDiv.innerHTML = `
                <div class="message-avatar"><i class="${this.agentAvatar}"></i></div>
                <div class="message-content">
                    <div class="message-text">${this.formatMessage(text)}</div>
                    <span class="message-time">${time}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${this.formatMessage(text)}</div>
                    <span class="message-time">${time}</span>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.saveMessages();
    }
    
    formatMessage(text) {
        // Convert markdown-style bold
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert newlines to <br>
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message system';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="${this.agentAvatar}"></i></div>
            <div class="typing-indicator"><span></span><span></span><span></span></div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) typingDiv.remove();
    }
    
    saveMessages() {
        const messages = [];
        document.querySelectorAll('#chatMessages .message').forEach(msg => {
            if (!msg.id) {
                const text = msg.querySelector('.message-text')?.innerHTML || '';
                const sender = msg.classList.contains('user') ? 'user' : 'system';
                if (text) messages.push({ text, sender });
            }
        });
        localStorage.setItem('graytech_chat_messages', JSON.stringify(messages.slice(-30)));
    }
    
    loadMessages() {
        const saved = localStorage.getItem('graytech_chat_messages');
        if (saved) {
            const messages = JSON.parse(saved);
            if (messages.length > 0 && messages.length < 8) {
                messages.forEach(msg => {
                    this.addMessage(msg.text, msg.sender);
                });
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.grayTechChat = new GrayTechChat();
});