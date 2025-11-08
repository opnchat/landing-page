// Menu Mobile Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Anima o botão do menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Fecha o menu mobile se estiver aberto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Header fixo com mudança de estilo no scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        header.style.padding = '1rem 0';
    }
    
    lastScroll = currentScroll;
});

// Animação de entrada dos elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards de features
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Contador de mensagens simulado no chat
let messageCount = 0;
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.send-btn');

function addMessage(text, type = 'sent') {
    messageCount++;
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    messageDiv.innerHTML = `
        <div class="message-bubble">${text}</div>
        <span class="message-time">${time}</span>
    `;
    
    if (chatMessages) {
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'sent');
            chatInput.value = '';
            
            // Simula resposta automática
            setTimeout(() => {
                const responses = [
                    'Entendi! Como posso ajudar com isso?',
                    'Ótima pergunta! Vou verificar para você.',
                    'Claro! Posso auxiliar nisso.',
                    'Vou processar essa informação agora.',
                    'Perfeito! Deixa comigo.'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'received');
            }, 1000 + Math.random() * 2000);
        }
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
}

// Simulação de conversas no sidebar
const conversations = document.querySelectorAll('.conversation-item');

conversations.forEach(conv => {
    conv.addEventListener('click', () => {
        conversations.forEach(c => c.classList.remove('active'));
        conv.classList.add('active');
        
        // Limpa e adiciona mensagem inicial baseado na conversa selecionada
        if (chatMessages) {
            const name = conv.querySelector('.name').textContent;
            const preview = conv.querySelector('.message-preview').textContent;
            
            chatMessages.innerHTML = `
                <div class="message received">
                    <div class="message-bubble">${preview}</div>
                    <span class="message-time">16:57</span>
                </div>
            `;
        }
        
        // Atualiza header do chat
        const chatHeader = document.querySelector('.chat-user-info h4');
        if (chatHeader) {
            chatHeader.textContent = conv.querySelector('.name').textContent;
        }
    });
});

// Animação do logo no scroll
const logo = document.querySelector('.logo');
let logoRotation = 0;

window.addEventListener('scroll', () => {
    logoRotation += 0.5;
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon && window.pageYOffset > 50) {
        logoIcon.style.transform = `rotate(${logoRotation}deg)`;
    }
});

// Efeito parallax nos círculos flutuantes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.float-circle');
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Adiciona classe de carregamento inicial
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animação inicial do hero
    const heroElements = document.querySelectorAll('.badge, .hero-title, .hero-subtitle, .btn-cta');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Adiciona efeito de hover nos dispositivos
const laptop = document.querySelector('.laptop');
const mobile = document.querySelector('.mobile');

if (laptop) {
    laptop.addEventListener('mouseenter', () => {
        laptop.style.transform = 'scale(1.05)';
        laptop.style.transition = 'transform 0.3s ease';
    });
    
    laptop.addEventListener('mouseleave', () => {
        laptop.style.transform = 'scale(1)';
    });
}

if (mobile) {
    mobile.addEventListener('mouseenter', () => {
        mobile.style.transform = 'translateY(-5px) rotate(-2deg) scale(1.05)';
        mobile.style.transition = 'transform 0.3s ease';
    });
    
    mobile.addEventListener('mouseleave', () => {
        mobile.style.transform = 'translateY(0) rotate(-2deg)';
    });
}

// Contador de estatísticas animado
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observa a seção de estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const stats = entry.target.querySelectorAll('.stat h3');
            // Aqui você pode adicionar contadores se necessário
        }
    });
}, { threshold: 0.5 });

const opensourceSection = document.querySelector('.opensource-section');
if (opensourceSection) {
    statsObserver.observe(opensourceSection);
}

// Adiciona efeito de digitação no placeholder do chat
const placeholders = [
    'Digite uma mensagem',
    'Como posso ajudar?',
    'Envie sua mensagem...',
    'Pergunte algo...'
];

let currentPlaceholder = 0;
setInterval(() => {
    if (chatInput && !document.activeElement === chatInput) {
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
        chatInput.placeholder = placeholders[currentPlaceholder];
    }
}, 3000);

// Adiciona efeito de hover nas logos trusted
const trustedLogos = document.querySelectorAll('.trusted-logo');
trustedLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1)';
        logo.style.opacity = '1';
        logo.style.transition = 'all 0.3s ease';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
        logo.style.opacity = '0.4';
    });
});

// Feedback visual ao clicar nos botões
document.querySelectorAll('button, .btn-primary, .btn-cta, .btn-github, .btn-primary-large, .btn-secondary-large').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.left = e.clientX - this.offsetLeft - 50 + 'px';
        ripple.style.top = e.clientY - this.offsetTop - 50 + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Adiciona estilo para a animação de ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Log de inicialização
console.log('%c OpnChat Landing Page ', 'background: #4C63D2; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Desenvolvido com ❤️ para a comunidade open source ', 'color: #4C63D2; font-size: 14px;');
console.log('%c GitHub: github.com/opnchat/opnchat/ ', 'color: #666; font-size: 12px;');