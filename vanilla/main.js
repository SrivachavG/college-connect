import { USER_PROFILE } from './data.js';
import * as Screens from './screens.js';

const state = {
    currentScreen: 'dashboard',
    theme: localStorage.getItem('theme') || 'dark',
    searchQuery: '',
    chatHistory: [
        { type: 'bot', text: "Hello Sunny! I'm your Engineering Assistant. How can I help you today? I can summarize lecture notes, provide formulas, or explain complex concepts." }
    ]
};

function applyTheme() {
    if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', state.theme);
    applyTheme();
    renderLayout();
    navigateTo(state.currentScreen);
}

window.toggleTheme = toggleTheme;

window.handleSearch = (query) => {
    state.searchQuery = query.toLowerCase();
    if (['colleges', 'courses', 'materials'].includes(state.currentScreen)) {
        navigateTo(state.currentScreen);
    }
};

const navItems = [
    { id: 'dashboard', label: 'Home', icon: 'home' },
    { id: 'colleges', label: 'Colleges', icon: 'graduation-cap' },
    { id: 'courses', label: 'Courses', icon: 'book-open' },
    { id: 'materials', label: 'Materials', icon: 'file-text' },
    { id: 'chat', label: 'Messages', icon: 'message-square' },
    { id: 'events', label: 'Events', icon: 'calendar' },
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'aiAssistant', label: 'AI Assistant', icon: 'sparkles' },
];

const sidebarExtra = `
    <div class="px-6 pb-6">
        <button onclick="window.openModal('upload')" class="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center space-x-3">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Upload Resource</span>
        </button>
    </div>
`;

function init() {
    applyTheme();
    renderLayout();
    navigateTo('dashboard');
    setupEventListeners();
}

function renderLayout() {
    renderSidebar();
    renderTopBar();
    renderBottomNav();
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
        <div class="px-8 py-10 flex items-center space-x-3">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <i data-lucide="cpu" class="w-7 h-7"></i>
            </div>
            <h1 class="text-xl font-black text-white tracking-tight uppercase">Connect</h1>
        </div>
        
        <nav class="flex-1 px-4 space-y-2 mt-4">
            ${navItems.map(item => `
                <button onclick="window.navigateTo('${item.id}')" id="nav-${item.id}" class="nav-btn w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group hover:bg-white/5">
                    <i data-lucide="${item.icon}" class="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors"></i>
                    <span class="text-sm font-bold text-slate-500 group-hover:text-white transition-colors uppercase tracking-widest">${item.label}</span>
                </button>
            `).join('')}
        </nav>
        
        ${sidebarExtra}
        
        <div class="p-6">
            <div class="glass-card rounded-[2rem] p-6 border-white/5 bg-slate-100/50 dark:bg-white/5">
                <p class="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-3">Premium Account</p>
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/5 flex items-center justify-center text-slate-800 dark:text-white font-mono text-xs">SS</div>
                    <div class="flex-1 overflow-hidden">
                        <p class="text-xs font-black text-slate-800 dark:text-white truncate uppercase">${USER_PROFILE.name}</p>
                        <p class="text-[9px] text-slate-500 font-bold truncate">Engineering Hub</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderTopBar() {
    const topbar = document.getElementById('topbar');
    const isDark = state.theme === 'dark';
    topbar.innerHTML = `
        <div class="flex items-center space-x-4">
            <div class="lg:hidden w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <i data-lucide="cpu" class="w-6 h-6"></i>
            </div>
            <h2 id="screen-title" class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest">Dashboard</h2>
        </div>
        
        <div class="flex items-center space-x-4 lg:space-x-8">
            <div class="hidden md:flex items-center bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-2 space-x-3 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
                <i data-lucide="search" class="w-4 h-4 text-slate-500"></i>
                <input type="text" id="global-search" oninput="window.handleSearch(this.value)" placeholder="Global Search..." class="bg-transparent border-none outline-none text-xs font-bold text-slate-600 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 w-48">
            </div>
            
            <button onclick="toggleTheme()" class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors group">
                <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-5 h-5 text-slate-500 group-hover:text-blue-500"></i>
            </button>
            
            <button class="relative w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors group">
                <i data-lucide="bell" class="w-5 h-5 text-slate-500 group-hover:text-blue-500"></i>
                <span class="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            
            <button class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/5 hover:bg-slate-800 transition-colors overflow-hidden">
                <img src="https://placehold.co/48x48/1e293b/FFFFFF?text=SS&font=inter" alt="User">
            </button>
        </div>
    `;
    lucide.createIcons();
}

function renderBottomNav() {
    const bottomNav = document.getElementById('bottom-nav');
    const mobileItems = navItems.slice(0, 4);
    bottomNav.innerHTML = mobileItems.map(item => `
        <button onclick="window.navigateTo('${item.id}')" class="flex flex-col items-center justify-center space-y-1">
            <i data-lucide="${item.icon}" class="w-5 h-5 text-slate-500"></i>
            <span class="text-[8px] font-black uppercase text-slate-500">${item.label}</span>
        </button>
    `).join('');
    lucide.createIcons();
}

window.openModal = (type, data = {}) => {
    const modal = document.getElementById('modal-container');
    const backdrop = document.getElementById('modal-backdrop');
    const content = document.getElementById('modal-content');

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Generate content
    if (type === 'upload') {
        content.innerHTML = `
            <div class="glass-panel rounded-[3rem] p-10 border-slate-200 dark:border-white/10 shadow-2xl">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Upload Resource</h3>
                    <button onclick="closeModal()" class="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
                        <i data-lucide="x" class="w-6 h-6 text-slate-500"></i>
                    </button>
                </div>
                
                <div class="space-y-6">
                    <div class="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] p-12 flex flex-col items-center justify-center group hover:border-blue-500/50 transition-all cursor-pointer bg-slate-50 dark:bg-slate-900/50">
                        <div class="w-20 h-20 rounded-3xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <i data-lucide="upload-cloud" class="w-10 h-10"></i>
                        </div>
                        <p class="text-slate-800 dark:text-white font-black text-xs uppercase tracking-widest">Drop your technical documents here</p>
                        <p class="text-[10px] text-slate-500 font-bold uppercase mt-2 tracking-widest">PDF, DOCX, ZIP (MAX 50MB)</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Subject Category</label>
                            <select class="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all appearance-none cursor-pointer">
                                <option>Computer Science</option>
                                <option>Mechanical Eng.</option>
                                <option>Civil Eng.</option>
                                <option>Aerospace</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Level</label>
                            <select class="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all appearance-none cursor-pointer">
                                <option>Undergraduate</option>
                                <option>Postgraduate</option>
                                <option>PhD / Research</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <button onclick="closeModal()" class="w-full mt-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Submit to Hub</button>
            </div>
        `;
    } else if (type === 'pdf') {
        content.innerHTML = `
            <div class="glass-panel rounded-[3rem] p-4 border-slate-200 dark:border-white/10 shadow-2xl h-[85vh] flex flex-col">
                <div class="flex items-center justify-between p-4 mb-2">
                    <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight truncate max-w-[80%]">${data.title || 'PDF Preview'}</h3>
                    <button onclick="closeModal()" class="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
                        <i data-lucide="x" class="w-6 h-6 text-slate-500"></i>
                    </button>
                </div>
                <iframe src="${data.url}" class="flex-1 rounded-[2rem] bg-white border border-slate-200 dark:border-white/10"></iframe>
            </div>
        `;
    }

    lucide.createIcons();

    // Trigger animations
    setTimeout(() => {
        backdrop.classList.add('opacity-100');
        content.classList.remove('translate-y-20', 'opacity-0', 'scale-95');
        content.classList.add('translate-y-0', 'opacity-100', 'scale-100');
    }, 10);
};

window.closeModal = () => {
    const backdrop = document.getElementById('modal-backdrop');
    const content = document.getElementById('modal-content');

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    content.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
    content.classList.add('translate-y-20', 'opacity-0', 'scale-95');

    setTimeout(() => {
        document.getElementById('modal-container').classList.add('hidden');
        document.getElementById('modal-container').classList.remove('flex');
    }, 500);
};

function navigateTo(screenId) {
    state.currentScreen = screenId;

    // Update UI Active States
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600/10', 'border-l-4', 'border-blue-600');
        const icon = btn.querySelector('i');
        const span = btn.querySelector('span');
        if (icon) {
            icon.classList.remove('text-blue-400');
            icon.classList.add('text-slate-500');
        }
        if (span) {
            span.classList.remove('text-white');
            span.classList.add('text-slate-500');
        }
    });

    const activeBtn = document.getElementById(`nav-${screenId}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-blue-600/10', 'border-l-4', 'border-blue-600');
        const icon = activeBtn.querySelector('i');
        const span = activeBtn.querySelector('span');
        if (icon) {
            icon.classList.remove('text-slate-500');
            icon.classList.add('text-blue-400');
        }
        if (span) {
            span.classList.remove('text-slate-500');
            span.classList.add('text-white');
        }
    }

    document.getElementById('screen-title').textContent = screenId.charAt(0).toUpperCase() + screenId.slice(1);

    const screenContainer = document.getElementById('screen-container');

    // Animate transition out
    gsap.to(screenContainer, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            const screenFn = Screens[screenId] || Screens.dashboard;
            // Inject search query into screen functions
            screenContainer.innerHTML = screenFn(state.searchQuery);
            lucide.createIcons();

            if (screenId === 'aiAssistant') {
                restoreChatHistory();
            }

            // Animate transition in
            gsap.fromTo(screenContainer,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );

            // Animate children
            gsap.fromTo(screenContainer.querySelectorAll('.animate-in'),
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.2
                }
            );
        }
    });
}

function restoreChatHistory() {
    const container = document.querySelector('#chat-container');
    if (!container) return;
    container.innerHTML = state.chatHistory.map(msg => `
        <div class="flex ${msg.type === 'user' ? 'flex-row-reverse space-x-4 space-x-reverse' : 'space-x-4'} animate-in">
            <div class="w-10 h-10 rounded-xl ${msg.type === 'user' ? 'bg-slate-800' : 'bg-blue-600'} flex items-center justify-center text-white shadow-lg">
                <i data-lucide="${msg.type === 'user' ? 'user' : 'bot'}" class="w-6 h-6"></i>
            </div>
            <div class="${msg.type === 'user' ? 'bg-blue-600 text-white' : 'glass-card text-slate-200'} rounded-[2rem] ${msg.type === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} p-5 max-w-[80%]">
                <p class="text-sm ${msg.type === 'user' ? 'font-black uppercase' : 'font-medium'} leading-relaxed">${msg.text}</p>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
    container.scrollTop = container.scrollHeight;
}

function setupEventListeners() {
    window.navigateTo = navigateTo;

    // AI Assistant Logic
    document.addEventListener('click', (e) => {
        if (e.target.closest('button') && e.target.closest('button').textContent.trim() === 'Launch Assistant') {
            navigateTo('aiAssistant');
        }
    });

    // Simple AI Chat Simulation
    window.sendMessage = () => {
        const input = document.querySelector('#chat-input');
        if (!input || !input.value.trim()) return;

        const userMsg = input.value;
        input.value = '';

        state.chatHistory.push({ type: 'user', text: userMsg });
        restoreChatHistory();

        // Show thinking state
        const container = document.querySelector('#chat-container');
        const botId = 'bot-' + Date.now();
        const botHtml = `
            <div id="${botId}" class="flex space-x-4 animate-in">
                <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg"><i data-lucide="bot" class="w-6 h-6"></i></div>
                <div class="glass-card rounded-[2rem] rounded-tl-none p-5 shadow-xl">
                    <div class="flex space-x-2">
                        <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', botHtml);
        lucide.createIcons();
        container.scrollTop = container.scrollHeight;

        // Reply after delay
        setTimeout(() => {
            const reply = `That's an interesting question about "${userMsg}". Bernoulli's principle states that an increase in the speed of a fluid occurs simultaneously with a decrease in static pressure. This is fundamental for wing design in aerospace engineering!`;
            state.chatHistory.push({ type: 'bot', text: reply });
            restoreChatHistory();
        }, 1500);
    };
}

document.addEventListener('DOMContentLoaded', init);
