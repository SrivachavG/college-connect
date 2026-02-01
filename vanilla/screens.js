import { SAMPLE_COLLEGES, SAMPLE_COURSES, SAMPLE_MATERIALS, SAMPLE_EVENTS, SAMPLE_CHATS, USER_PROFILE, CATEGORY_COLORS, EXTERNAL_RESOURCES } from './data.js';

export function dashboard() {
    return `
        <div class="space-y-10">
            <!-- Hero Stats Segment -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${[
            { label: 'Enrolled Courses', value: '8', icon: 'book-open', color: 'blue' },
            { label: 'Upcoming Deadlines', value: '4', icon: 'clock', color: 'rose' },
            { label: 'Available Materials', value: '150', icon: 'folder-open', color: 'emerald' },
            { label: 'Connections', value: '1.2k', icon: 'users', color: 'purple' },
        ].map((stat, i) => `
                    <div class="glass-card animate-in rounded-[2.5rem] p-8 flex flex-col group">
                        <div class="w-14 h-14 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            <i data-lucide="${stat.icon}" class="w-7 h-7"></i>
                        </div>
                        <p class="animate-in text-4xl font-black text-slate-800 dark:text-white tracking-tighter">${stat.value}</p>
                        <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 mt-2">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <!-- Smart Feed Section -->
                <div class="xl:col-span-2 space-y-8">
                    <div class="flex items-center justify-between px-2">
                        <h3 class="text-xl font-black text-slate-800 dark:text-white uppercase tracking-widest">Smart Activity Feed</h3>
                        <button class="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">View History</button>
                    </div>
                    
                    <div class="space-y-4">
                        ${[1, 2, 3].map(i => `
                            <div class="glass-card animate-in rounded-[2rem] p-6 flex items-center space-x-6">
                                <div class="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/5">
                                    <i data-lucide="file-text" class="w-6 h-6"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-sm font-black text-slate-800 dark:text-white leading-tight">New Materials Released: Classical Mechanics Week ${i + 4}</h4>
                                    <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">Physics 101 • 2 hours ago</p>
                                </div>
                                <button class="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-blue-600 transition-all border border-slate-300 dark:border-white/5">
                                    <i data-lucide="chevron-right" class="w-5 h-5"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Quick Access Sidebar -->
                <div class="space-y-10">
                    <div class="glass-panel animate-in rounded-[3rem] p-10 relative overflow-hidden group border-slate-200 dark:border-white/5">
                        <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                        <h3 class="text-2xl font-black text-slate-800 dark:text-white leading-tight relative z-10">AI Assistant<br/><span class="text-blue-600 dark:text-blue-400">Knowledge Hub</span></h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-4 relative z-10 font-medium leading-relaxed">Get instant summaries and answers for your engineering queries.</p>
                        <button onclick="window.navigateTo('aiAssistant')" class="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 shadow-xl shadow-blue-500/20 active:scale-95 border border-blue-400/20 relative z-10">
                            <span>Launch Assistant</span>
                            <i data-lucide="sparkles" class="w-4 h-4"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-6">
                        <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-[.3em] px-2">Recent Chats</h3>
                        <div class="space-y-3">
                            ${SAMPLE_CHATS.map(chat => `
                                <button onclick="window.navigateTo('chat')" class="w-full glass-card rounded-3xl p-4 flex items-center space-x-4 hover:border-blue-500/30">
                                    <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-sm border border-slate-200 dark:border-white/5 font-mono">
                                        ${chat.avatarSeed}
                                    </div>
                                    <div class="flex-1 text-left overflow-hidden">
                                        <p class="text-sm font-black text-slate-800 dark:text-white truncate uppercase tracking-tight">${chat.name}</p>
                                        <p class="text-[10px] text-slate-500 font-bold truncate">${chat.lastMessage}</p>
                                    </div>
                                    ${chat.unread > 0 ? `<span class="bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-lg">${chat.unread}</span>` : ''}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function colleges(query = '') {
    const filtered = query ? SAMPLE_COLLEGES.filter(c => c.name.toLowerCase().includes(query) || c.location.toLowerCase().includes(query)) : SAMPLE_COLLEGES;
    return `
        <div class="space-y-10">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
                <div>
                    <h2 class="animate-in text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Engineering Institutions</h2>
                    <p class="text-slate-500 dark:text-slate-400 font-medium">Explore top-tier technical universities</p>
                </div>
                <div class="bg-blue-500/10 px-6 py-3 rounded-2xl border border-blue-500/20 flex items-center space-x-3">
                    <i data-lucide="graduation-cap" class="text-blue-400 w-5 h-5"></i>
                    <p class="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest"><span class="text-blue-400 font-black">${filtered.length}</span> Results Found</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${filtered.map(college => `
                    <div class="glass-card animate-in rounded-[2.5rem] overflow-hidden flex flex-col group">
                        <div class="h-44 relative bg-slate-900">
                            <div class="absolute inset-0 mesh-gradient-header opacity-60 transition-transform duration-700 group-hover:scale-110"></div>
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                            <img src="https://placehold.co/120x120/${college.logo}" alt="${college.name}" class="absolute -bottom-10 left-8 w-24 h-24 rounded-3xl border-4 border-slate-50 dark:border-slate-950 shadow-2xl object-cover bg-slate-800 transition-transform group-hover:scale-105 group-hover:rotate-3 leading-none overflow-hidden">
                        </div>
                        
                        <div class="p-8 pt-16 flex-1 flex flex-col">
                            <h3 class="text-2xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-blue-500 transition-colors uppercase tracking-tight">${college.name}</h3>
                            <div class="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold mt-4">
                                <i data-lucide="map-pin" class="w-4 h-4 mr-2 text-blue-500"></i>
                                ${college.location}
                            </div>
                            
                            <div class="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                                <div class="flex items-center space-x-6">
                                    <div class="flex flex-col">
                                        <span class="text-slate-800 dark:text-white font-black text-lg leading-none">${college.courses}</span>
                                        <span class="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Programs</span>
                                    </div>
                                    <div class="w-px h-8 bg-slate-200 dark:bg-white/5"></div>
                                    <div class="flex flex-col">
                                        <span class="text-slate-800 dark:text-white font-black text-lg leading-none">${college.students}</span>
                                        <span class="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Students</span>
                                    </div>
                                </div>
                                <button class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
                                    <i data-lucide="chevron-right" class="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

export function courses(query = '') {
    const filtered = query ? SAMPLE_COURSES.filter(c => c.name.toLowerCase().includes(query) || c.subject.toLowerCase().includes(query)) : SAMPLE_COURSES;
    return `
        <div class="space-y-10">
             <div class="flex items-center justify-between pb-4">
                <div>
                    <h2 class="animate-in text-3xl font-black text-slate-800 dark:text-white uppercase">Your Curriculum</h2>
                    <p class="text-slate-500 dark:text-slate-400 font-medium">${filtered.length} Active Modules</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${filtered.map(course => {
        const colors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.Default;
        return `
                        <div class="glass-card animate-in rounded-[2.5rem] p-8 flex flex-col group relative overflow-hidden">
                            <div class="flex items-start justify-between mb-8 relative z-10">
                                <div class="w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6">
                                    <i data-lucide="book-open" class="w-8 h-8"></i>
                                </div>
                                <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[.2em] ${colors.bg} ${colors.text} border border-slate-200 dark:border-white/5">${course.category}</span>
                            </div>
                            
                            <div class="flex-1 relative z-10">
                                <h3 class="text-2xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-blue-500 transition-colors uppercase tracking-tight">${course.name}</h3>
                                <p class="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wide">Prof. ${course.instructor}</p>
                            </div>
                            
                            <div class="mt-8 grid grid-cols-2 gap-4 py-6 border-y border-slate-200 dark:border-white/5 relative z-10">
                                <div class="flex flex-col">
                                    <span class="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">Schedule</span>
                                    <span class="text-xs font-black text-slate-600 dark:text-slate-300 mt-1.5 uppercase">${course.schedule}</span>
                                </div>
                                <div class="flex flex-col text-right">
                                    <span class="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">Resources</span>
                                    <span class="text-xs font-black text-slate-600 dark:text-slate-300 mt-1.5 uppercase">${course.files} Modules</span>
                                </div>
                            </div>
                            
                            <button class="w-full mt-8 py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-xl rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center space-x-3">
                                <span>Continue Session</span>
                                <i data-lucide="play" class="w-4 h-4 fill-current"></i>
                            </button>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}

export function materials(query = '') {
    const filtered = query ? SAMPLE_MATERIALS.filter(m => m.title.toLowerCase().includes(query) || m.subject.toLowerCase().includes(query)) : SAMPLE_MATERIALS;
    return `
        <div class="space-y-12 pb-20">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4">
                <div>
                    <h2 class="animate-in text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Resource Hub</h2>
                    <p class="text-slate-500 dark:text-slate-400 font-medium">${filtered.length} Engineering Reference Materials Available</p>
                </div>
            </div>

            <!-- External Reference Databases -->
            <div class="space-y-6">
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-8 bg-blue-500 rounded-full"></div>
                    <h3 class="text-xs font-black text-slate-500 uppercase tracking-[.3em]">Engineering Archives</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${EXTERNAL_RESOURCES.map(res => `
                        <a href="${res.url}" target="_blank" class="glass-card animate-in rounded-[2rem] p-6 flex items-center space-x-5 group hover:border-blue-400/30">
                            <div class="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                                <i data-lucide="${res.icon}" class="w-7 h-7"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">${res.type}</p>
                                <h4 class="font-black text-slate-800 dark:text-white uppercase group-hover:text-blue-500 transition-colors">${res.name}</h4>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Direct PDF Resources -->
            <div class="space-y-8">
                 <div class="flex items-center space-x-3">
                    <div class="w-2 h-8 bg-emerald-500 rounded-full"></div>
                    <h3 class="text-xs font-black text-slate-500 uppercase tracking-[.3em]">Direct PDF Repository</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${filtered.map(material => `
                        <div class="glass-card animate-in rounded-[2.5rem] p-8 flex flex-col group relative overflow-hidden">
                            <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                                <i data-lucide="sparkles" class="w-24 h-24 text-slate-400"></i>
                            </div>
                            
                            <div class="flex items-start justify-between mb-8 relative z-10">
                                <div class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                    <i data-lucide="file-text" class="w-8 h-8"></i>
                                </div>
                                <span class="px-5 py-2 bg-slate-100 dark:bg-slate-900 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/5 leading-none">
                                    ${material.type}
                                </span>
                            </div>
                            
                            <div class="flex-1 relative z-10">
                                <h3 class="text-2xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-blue-500 transition-colors uppercase tracking-tight">${material.title}</h3>
                                <div class="flex items-center mt-3 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                    ${material.subject}
                                </div>
                            </div>
                            
                            <div class="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest relative z-10 leading-none">
                                <span>${material.size}</span>
                                <span>${material.downloads} Downloads</span>
                            </div>
                            
                            <button onclick="window.openModal('pdf', { url: '${material.url}', title: '${material.title}' })" class="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 shadow-xl shadow-blue-500/20 active:scale-95 border border-blue-400/20 relative z-10">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                                <span class="tracking-[.2em]">Preview Document</span>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

export function aiAssistant() {
    return `
        <div class="flex flex-col h-[75vh] max-w-4xl mx-auto space-y-6">
            <div class="text-center pb-4">
                <h2 class="animate-in text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">AI Knowledge Hub</h2>
                <p class="text-slate-500 font-bold uppercase text-[10px] tracking-[.3em] mt-2">Smarter Learning for Engineering Students</p>
            </div>
            
            <!-- Chat Container -->
            <div class="flex-1 glass-panel rounded-[3rem] p-10 flex flex-col space-y-6 overflow-hidden relative">
                <div id="chat-container" class="flex-1 overflow-y-auto space-y-6 scrollbar-hide py-4">
                    <!-- Chat history will be restored here -->
                </div>
                
                <!-- Input Area -->
                <div class="relative mt-4">
                    <input type="text" id="chat-input" placeholder="Ask anything about your courses..." class="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl pl-6 pr-20 py-5 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner" onkeypress="if(event.key==='Enter') window.sendMessage()">
                    <button id="send-btn" onclick="window.sendMessage()" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all">
                        <i data-lucide="send" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function chat() {
    return `
        <div class="flex flex-col h-[75vh] max-w-4xl mx-auto space-y-6">
            <div class="sticky top-0 z-10 py-2">
                <div class="relative group">
                    <i data-lucide="search" class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 transition-colors w-5 h-5"></i>
                    <input type="text" placeholder="Search conversations..." class="w-full pl-16 pr-8 py-5 bg-slate-900 border border-white/5 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white font-bold placeholder:text-slate-600 transition-all">
                </div>
            </div>
            
            <div class="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                ${SAMPLE_CHATS.map(chat => `
                    <button class="w-full glass-card rounded-[2.5rem] p-6 flex items-center space-x-6 hover:border-blue-400/30 group">
                        <div class="relative">
                            <div class="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-blue-400 font-mono text-xl shadow-xl group-hover:scale-105 transition-transform overflow-hidden">${chat.avatarSeed}</div>
                            ${chat.online ? `<span class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-slate-950 rounded-full"></span>` : ''}
                        </div>
                        <div class="flex-1 text-left min-w-0">
                            <div class="flex justify-between items-center mb-1">
                                <h4 class="text-lg font-black text-white uppercase tracking-tight truncate">${chat.name}</h4>
                                <span class="text-[9px] text-slate-500 font-black uppercase tracking-widest">${chat.time}</span>
                            </div>
                            <p class="text-sm font-medium text-slate-500 truncate truncate pr-8">${chat.lastMessage}</p>
                        </div>
                        <i data-lucide="chevron-right" class="w-6 h-6 text-slate-600 group-hover:text-white transition-colors"></i>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

export function profile() {
    return `
        <div class="max-w-4xl mx-auto space-y-10 pb-20">
            <!-- Premium Profile Header -->
            <div class="relative pt-24 pb-20 overflow-hidden rounded-[4rem] mesh-gradient-header shadow-2xl shadow-indigo-500/20 border border-slate-200 dark:border-white/5">
                <div class="absolute inset-0 bg-black/10"></div>
                
                <div class="relative flex flex-col items-center text-center px-10">
                    <div class="relative group mb-8">
                        <div class="absolute inset-0 bg-blue-500 rounded-[3.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                        <img src="https://placehold.co/200x200/1e293b/FFFFFF?text=SS&font=inter" alt="User" class="relative w-48 h-48 rounded-[3.5rem] border-4 border-white/20 shadow-2xl object-cover bg-slate-800 transition-transform group-hover:scale-[1.02]">
                        <div class="absolute -bottom-3 -right-3 w-14 h-14 bg-blue-600 rounded-2xl border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                            <i data-lucide="camera" class="w-6 h-6"></i>
                        </div>
                    </div>
                    
                    <h2 class="animate-in text-5xl font-black text-white leading-tight uppercase tracking-tighter">${USER_PROFILE.name}</h2>
                    
                    <div class="flex flex-wrap items-center justify-center gap-4 mt-6">
                        <span class="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-6 py-2 rounded-full border border-white/20 uppercase tracking-[.25em]">Premium Explorer</span>
                        <div class="flex items-center text-amber-300 font-black text-xs bg-black/20 px-6 py-2 rounded-full border border-amber-400/10">
                            <i data-lucide="zap" class="w-4 h-4 mr-2"></i>
                            LEVEL 24 ENGINEERING VETERAN
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${[
            { label: 'Courses', value: '12', icon: 'award', color: 'blue' },
            { label: 'Resources', value: '84', icon: 'folder-open', color: 'emerald' },
            { label: 'Streak', value: '15', icon: 'flame', color: 'orange' },
        ].map(stat => `
                    <div class="glass-card animate-in rounded-[3rem] p-10 flex flex-col items-center text-center group">
                        <div class="w-16 h-16 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                            <i data-lucide="${stat.icon}" class="w-8 h-8"></i>
                        </div>
                        <p class="animate-in text-4xl font-black text-slate-800 dark:text-white tracking-widest leading-none">${stat.value}</p>
                        <p class="text-[10px] uppercase tracking-[.3em] font-black text-slate-500 mt-4">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

export function events() {
    return `
        <div class="space-y-10">
            <div class="flex items-center justify-between pb-4">
                <div>
                    <h2 class="animate-in text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Campus Timeline</h2>
                    <p class="text-slate-500 dark:text-slate-400 font-medium">Important dates and academic schedule</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${SAMPLE_EVENTS.map(event => `
                    <div class="glass-card animate-in rounded-[2.5rem] p-10 flex flex-col group relative overflow-hidden">
                        <div class="absolute top-8 right-10">
                            <span class="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${event.type === 'deadline' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/10' : 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/10'}">
                                ${event.type}
                            </span>
                        </div>
                        
                        <div class="flex items-start space-x-6 mb-8">
                            <div class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${event.type === 'deadline' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-500' : 'bg-blue-500/10 text-blue-600 dark:text-blue-500'}">
                                <i data-lucide="${event.type === 'deadline' ? 'bell' : 'calendar'}" class="w-8 h-8"></i>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-2xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">${event.title}</h3>
                                <p class="text-blue-600 dark:text-amber-400/80 mt-2 font-black text-[10px] uppercase tracking-[.2em]">${event.category}</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-6 py-8 border-y border-slate-200 dark:border-white/5">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <i data-lucide="calendar" class="w-5 h-5"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Date</span>
                                    <span class="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">${event.date}</span>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <i data-lucide="clock" class="w-5 h-5"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Time</span>
                                    <span class="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">${event.time}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-8 flex items-center justify-between">
                            <div class="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                <i data-lucide="map-pin" class="w-4 h-4 mr-2"></i>
                                ${event.location}
                            </div>
                            <button class="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[.2em] hover:translate-x-1 transition-transform">
                                <span>Set Reminder</span>
                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
