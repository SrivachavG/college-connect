/**
 * app.js - Main Orchestrator (Senior Refactor v5.1)
 * Optimized for Peak Professional Aesthetics
 */

// 1. CORE VIEWS
const Views = {
    dashboard: (container) => {
        const { user, activity } = Store.state;
        container.innerHTML = `
            <div class="mb-10 reveal">
                <h2 class="text-4xl academic-title font-bold tracking-tight text-slate-800">Welcome, ${user?.name?.split(' ')[0] || 'Scholar'}</h2>
                <p class="text-slate-500 font-medium">Your daily academic intelligence briefing.</p>
            </div>

            <div class="grid grid-cols-2 gap-5 mb-10">
                <div class="card glint p-6 bg-white cursor-pointer reveal" onclick="Router.handleNavigate('colleges')">
                    <div class="brand-accent"></div>
                    <div class="card-content">
                        <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 transition-transform group-hover:scale-110">
                            <i class="fas fa-university text-xl"></i>
                        </div>
                        <p class="font-bold text-slate-800">Institutions</p>
                        <p class="text-xs text-slate-400 mt-1">12 New Additions</p>
                    </div>
                </div>
                <div class="card glint p-6 bg-white cursor-pointer reveal" onclick="Router.handleNavigate('courses')">
                    <div class="brand-accent"></div>
                    <div class="card-content">
                        <div class="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 transition-transform group-hover:scale-110">
                            <i class="fas fa-book-open text-xl"></i>
                        </div>
                        <p class="font-bold text-slate-800">My Courses</p>
                        <p class="text-xs text-slate-400 mt-1">4 Active Modules</p>
                    </div>
                </div>
            </div>

            <div class="mb-10 reveal">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800 academic-title">Academic Vitals</h3>
                    <span class="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase flex items-center">
                        <span class="live-marker"></span>
                        Live Index
                    </span>
                </div>
                <div class="card p-6 bg-white overflow-visible">
                    <div class="card-content">
                        <div class="chart-container">
                            <div class="bar h-[85%]" data-label="Research" data-value="85%"></div>
                            <div class="bar h-[45%]" data-label="Calculus" data-value="45%"></div>
                            <div class="bar h-[95%]" data-label="AI Lab" data-value="95%"></div>
                            <div class="bar h-[60%]" data-label="Physics" data-value="60%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="reveal">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800 academic-title">Strategic Feed</h3>
                    <button class="text-xs font-bold text-teal-600">History</button>
                </div>
                <div class="space-y-4">
                    ${activity.length > 0 ? activity.map((a, i) => `
                        <div class="card !p-4 flex items-center gap-4 bg-white/50 hover:bg-white" style="transition-delay: ${0.1 + i * 0.05}s">
                            <div class="card-content flex items-center gap-4 w-full">
                                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <i class="fas fa-${a.type === 'upload' ? 'file-upload' : 'bookmark'}"></i>
                                </div>
                                <div class="flex-grow">
                                    <p class="text-sm font-bold text-slate-800">${a.title}</p>
                                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${a.time}</p>
                                </div>
                                <i class="fas fa-chevron-right text-[10px] text-slate-300"></i>
                            </div>
                        </div>
                    `).join('') : '<p class="text-center text-slate-400 py-8 italic">No recent activity found.</p>'}
                </div>
            </div>
        `;
    },

    colleges: (container) => {
        container.innerHTML = `
            <div class="pill-search-container reveal">
                <div class="relative">
                    <i class="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" class="pill-search" placeholder="Search institutional archives..." oninput="Actions.initiateSearch(this.value)">
                </div>
            </div>

            <header class="mb-8 flex justify-between items-end reveal">
                <div>
                    <h2 class="text-3xl academic-title font-black text-slate-800">Global Institutions</h2>
                    <p class="text-sm text-slate-400 font-medium">Accessing verified academic node clusters.</p>
                </div>
            </header>

            <div class="featured-grid">
                ${Data.colleges.map((c, i) => `
                    <div class="library-card glint reveal" 
                        style="transition-delay: ${0.1 + (i % 5) * 0.05}s" 
                        onclick="Views.openCollegeDetails('${c.id}')">
                        <div class="brand-accent" style="background: radial-gradient(circle at top right, ${c.color}, transparent 70%)"></div>
                        <div>
                            <div class="w-16 h-20 rounded-2xl flex items-center justify-center border mb-6 shadow-sm"
                                style="background: ${c.glow}; border-color: ${c.color}20">
                                <span class="text-3xl font-black academic-title" style="color: ${c.color}">${c.name[0]}</span>
                            </div>
                            <h4 class="text-xl font-bold text-slate-800 leading-tight mb-2">${c.name}</h4>
                            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">${c.loc}</p>
                        </div>
                        
                        <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                            <span class="text-[10px] font-black text-slate-300 uppercase tracking-tighter">${c.students} Students</span>
                            <button class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:text-white transition-all shadow-sm hover:scale-110"
                                style="color: ${c.color}; --hover-bg: ${c.color}"
                                onmouseover="this.style.background='${c.color}'"
                                onmouseout="this.style.background=''">
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    courses: (container) => {
        const enrolledIds = Store.state.enrolled_ids;
        container.innerHTML = `
            <div class="pill-search-container reveal">
                <div class="relative">
                    <i class="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" class="pill-search" placeholder="Search knowledge archives..." oninput="Actions.initiateSearch(this.value)">
                </div>
            </div>

            <div class="mb-10 reveal">
                <h2 class="text-3xl academic-title font-bold text-slate-800">Knowledge Archives</h2>
                <p class="text-slate-400 text-sm font-medium">Curated academic paths for engineering excellence.</p>
            </div>
            
            <div class="grid grid-cols-1 gap-6">
                ${Data.courses.map((c, i) => {
            const enrolled = enrolledIds.includes(c.id);
            return `
                        <div class="card p-6 reveal hover:border-teal-500/30 bg-white">
                            <div class="card-content">
                                <div class="flex justify-between items-start mb-4">
                                    <div class="flex gap-2">
                                        <span class="tag tag-${c.cat.toLowerCase()}">${c.cat}</span>
                                        <span class="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded tracking-widest uppercase">${c.level || 'Core'}</span>
                                    </div>
                                    <span class="text-[10px] font-black text-slate-300 tracking-tighter uppercase whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded">${c.id}</span>
                                </div>
                                <h4 class="text-xl font-bold academic-title text-slate-800 mb-2">${c.name}</h4>
                                <p class="text-sm text-slate-500 font-medium mb-6 flex items-center gap-2">
                                    <i class="fas fa-user-tie text-teal-600/50"></i> ${c.prof}
                                </p>
                                <div class="flex items-center gap-3">
                                    <button onclick="Actions.toggleEnroll('${c.id}')" 
                                        class="flex-grow btn btn-magnetic btn-luminous ${enrolled ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'btn-primary'} !py-3">
                                        <i class="fas fa-${enrolled ? 'minus-circle' : 'plus-circle'}"></i>
                                        ${enrolled ? 'Drop Course' : 'Enroll Now'}
                                    </button>
                                    <button onclick="Views.openCourseDetails('${c.id}')" class="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors">
                                        <i class="fas fa-info-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    },

    chat: (container) => {
        container.innerHTML = `
            <div class="flex flex-col h-full bg-slate-50 -m-4">
                <div class="p-4 bg-white border-b border-slate-100 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold shadow-lg">AI</div>
                    <div>
                        <p class="text-sm font-bold text-slate-800">Research Assistant</p>
                        <p class="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Intelligence</p>
                    </div>
                </div>
                <div class="flex-grow p-6 space-y-4 overflow-y-auto" id="chat-container">
                    <div class="chat-bubble received reveal glass-panel !bg-white/80 !border-slate-100 text-slate-800">Hello! I've analyzed your recent semantic uploads. How can I assist with your Research today?</div>
                </div>
                <div class="p-4 bg-white border-t border-slate-100 flex gap-2">
                    <input id="chat-input" class="flex-grow bg-slate-50 border-none rounded-xl px-4 text-sm font-medium focus:ring-0" placeholder="Analyze publication archives..." onkeydown="if(event.key === 'Enter') Actions.sendChat()">
                    <button onclick="Actions.sendChat()" class="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;
    },

    files: (container) => {
        container.innerHTML = `
            <div class="flex justify-between items-center mb-8 reveal">
                <div>
                    <h2 class="text-2xl font-bold academic-title text-slate-800">Secure Vault</h2>
                    <p class="text-xs text-slate-400 font-medium">Verified academic publications (${Data.files.length} items).</p>
                </div>
                <button onclick="Actions.openUploader()" class="btn btn-primary btn-luminous btn-magnetic !py-2.5 !text-xs">
                    <i class="fas fa-upload mr-1"></i> Ingest
                </button>
            </div>
            <div class="space-y-4">
                ${Data.files.map((file, i) => `
                    <div class="card p-5 flex items-center gap-4 reveal hover:bg-white group cursor-pointer" style="transition-delay: ${i * 0.05}s" onclick="Actions.previewFile('${file.id}')">
                        <div class="card-content flex items-center gap-4 w-full">
                            <div class="w-12 h-12 rounded-xl ${file.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-file-${file.type} text-xl"></i>
                            </div>
                            <div class="flex-grow">
                                <p class="text-sm font-bold text-slate-800">${file.name}</p>
                                <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">${file.size} • ${file.category} • ${file.date}</p>
                            </div>
                            <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-300">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    profile: (container) => {
        const { user } = Store.state;
        container.innerHTML = `
            <div class="mb-10 reveal">
                <h2 class="text-3xl academic-title font-black text-slate-800">Researcher Identity</h2>
                <p class="text-sm text-slate-400 font-medium">Managing your academic node profile.</p>
            </div>

            <div class="card p-8 bg-white reveal mb-8 glint relative overflow-hidden">
                <div class="brand-accent"></div>
                <div class="flex flex-col items-center">
                    <div class="w-32 h-32 rounded-[40px] bg-teal-600 mb-6 flex items-center justify-center text-white text-5xl shadow-2xl relative">
                        <i class="fas fa-user-graduate"></i>
                        <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white text-xs">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                    <h3 class="text-2xl font-black academic-title text-slate-800">${user?.name || 'Academic Curator'}</h3>
                    <p class="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Verified Scholar • Level 54</p>
                </div>

                <div class="grid grid-cols-3 gap-4 mt-10">
                    <div class="text-center">
                        <p class="text-xl font-bold text-slate-800">12</p>
                        <p class="text-[10px] font-black text-slate-300 uppercase">Courses</p>
                    </div>
                    <div class="text-center border-x border-slate-100">
                        <p class="text-xl font-bold text-slate-800">45</p>
                        <p class="text-[10px] font-black text-slate-300 uppercase">Vaults</p>
                    </div>
                    <div class="text-center">
                        <p class="text-xl font-bold text-slate-800">2.4k</p>
                        <p class="text-[10px] font-black text-slate-300 uppercase">Points</p>
                    </div>
                </div>
            </div>

            <div class="space-y-4 reveal">
                <button class="w-full card p-5 flex items-center justify-between bg-white group transition-all">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                            <i class="fas fa-cog"></i>
                        </div>
                        <span class="font-bold text-slate-700">Interface Settings</span>
                    </div>
                    <i class="fas fa-chevron-right text-slate-200"></i>
                </button>
                <button onclick="Store.logout()" class="w-full card p-5 flex items-center justify-between bg-rose-50 border-rose-100 group transition-all">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-400 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                        <span class="font-bold text-rose-500">Terminate Session</span>
                    </div>
                    <i class="fas fa-chevron-right text-rose-200"></i>
                </button>
            </div>
        `;
    },

    tools: (container) => {
        container.innerHTML = `
            <div class="mb-10 reveal">
                <h2 class="text-3xl academic-title font-black text-slate-800">Engineering Tools</h2>
                <p class="text-sm text-slate-400 font-medium">Essential calculators and converters for students.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- GPA Calculator -->
                <div class="card p-6 reveal bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">GPA Calculator</h3>
                            <p class="text-xs text-slate-500">Calculate your semester GPA</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">Total Credits</label>
                            <input id="gpa-credits" type="number" class="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="18">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">Grade Points Earned</label>
                            <input id="gpa-points" type="number" class="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="162">
                        </div>
                        <button onclick="Actions.calculateGPA()" class="btn btn-primary w-full !py-3 shadow-lg">
                            <i class="fas fa-calculator mr-2"></i>Calculate GPA
                        </button>
                        <div id="gpa-result" class="hidden p-4 bg-white rounded-xl text-center">
                            <p class="text-xs font-bold text-slate-400 uppercase mb-1">Your GPA</p>
                            <p id="gpa-value" class="text-3xl font-black text-blue-600"></p>
                        </div>
                    </div>
                </div>

                <!-- Unit Converter -->
                <div class="card p-6 reveal bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl shadow-lg">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Unit Converter</h3>
                            <p class="text-xs text-slate-500">Convert length units</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">Value</label>
                            <input id="unit-value" type="number" class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="100">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">From</label>
                                <select id="unit-from" class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none">
                                    <option value="m">Meters</option>
                                    <option value="km">Kilometers</option>
                                    <option value="cm">Centimeters</option>
                                    <option value="ft">Feet</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">To</label>
                                <select id="unit-to" class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none">
                                    <option value="m">Meters</option>
                                    <option value="km">Kilometers</option>
                                    <option value="cm">Centimeters</option>
                                    <option value="ft" selected>Feet</option>
                                </select>
                            </div>
                        </div>
                        <button onclick="Actions.convertUnit()" class="btn bg-purple-600 text-white w-full !py-3 shadow-lg hover:bg-purple-700">
                            <i class="fas fa-sync mr-2"></i>Convert
                        </button>
                        <div id="unit-result" class="hidden p-4 bg-white rounded-xl text-center">
                            <p id="unit-value-display" class="text-2xl font-black text-purple-600"></p>
                        </div>
                    </div>
                </div>

                <!-- Equation Solver -->
                <div class="card p-6 reveal bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg">
                            <i class="fas fa-square-root-alt"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Quadratic Solver</h3>
                            <p class="text-xs text-slate-500">ax² + bx + c = 0</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="grid grid-cols-3 gap-3">
                            <div>
                                <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">a</label>
                                <input id="quad-a" type="number" class="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="1">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">b</label>
                                <input id="quad-b" type="number" class="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="-5">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-slate-600 uppercase mb-2 block">c</label>
                                <input id="quad-c" type="number" class="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="6">
                            </div>
                        </div>
                        <button onclick="Actions.solveQuadratic()" class="btn bg-emerald-600 text-white w-full !py-3 shadow-lg hover:bg-emerald-700">
                            <i class="fas fa-calculator mr-2"></i>Solve
                        </button>
                        <div id="quad-result" class="hidden p-4 bg-white rounded-xl">
                            <p class="text-xs font-bold text-slate-400 uppercase mb-2">Solutions</p>
                            <div id="quad-solutions" class="space-y-1"></div>
                        </div>
                    </div>
                </div>

                <!-- Scientific Calculator -->
                <div class="card p-6 reveal bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-2xl shadow-lg">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Quick Calculator</h3>
                            <p class="text-xs text-slate-500">Basic operations</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <input id="calc-display" type="text" readonly class="w-full px-4 py-4 rounded-xl border border-amber-200 bg-white text-right text-2xl font-bold" value="0">
                        <div class="grid grid-cols-4 gap-2">
                            <button onclick="Actions.calcInput('7')" class="calc-btn">7</button>
                            <button onclick="Actions.calcInput('8')" class="calc-btn">8</button>
                            <button onclick="Actions.calcInput('9')" class="calc-btn">9</button>
                            <button onclick="Actions.calcInput('/')" class="calc-btn-op">÷</button>
                            <button onclick="Actions.calcInput('4')" class="calc-btn">4</button>
                            <button onclick="Actions.calcInput('5')" class="calc-btn">5</button>
                            <button onclick="Actions.calcInput('6')" class="calc-btn">6</button>
                            <button onclick="Actions.calcInput('*')" class="calc-btn-op">×</button>
                            <button onclick="Actions.calcInput('1')" class="calc-btn">1</button>
                            <button onclick="Actions.calcInput('2')" class="calc-btn">2</button>
                            <button onclick="Actions.calcInput('3')" class="calc-btn">3</button>
                            <button onclick="Actions.calcInput('-')" class="calc-btn-op">−</button>
                            <button onclick="Actions.calcInput('0')" class="calc-btn">0</button>
                            <button onclick="Actions.calcInput('.')" class="calc-btn">.</button>
                            <button onclick="Actions.calcEquals()" class="calc-btn-eq">=</button>
                            <button onclick="Actions.calcInput('+')" class="calc-btn-op">+</button>
                        </div>
                        <button onclick="Actions.calcClear()" class="w-full py-2 bg-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-300">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    openCourseDetails: (id) => {
        const course = Data.courses.find(c => c.id === id);
        if (!course) return;
        ModalManager.open(`
            <div class="bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden max-w-lg">
                <div class="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
                <div class="flex items-start gap-4 mb-6 mt-2">
                    <div class="w-16 h-16 rounded-xl ${course.cat === 'CompSci' ? 'bg-blue-50 text-blue-600' :
                course.cat === 'Physics' ? 'bg-purple-50 text-purple-600' :
                    'bg-pink-50 text-pink-600'
            } flex items-center justify-center text-xl flex-shrink-0">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="flex-grow">
                        <h2 class="text-xl font-black academic-title text-slate-800 leading-tight">${course.name}</h2>
                        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">${course.id} • ${course.level}</p>
                    </div>
                </div>
                <div class="space-y-4 mb-6">
                    <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <p class="text-xs font-bold text-slate-500 uppercase">Instructor</p>
                        <p class="text-sm font-bold text-slate-800">${course.prof}</p>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <p class="text-xs font-bold text-slate-500 uppercase">Credits</p>
                        <p class="text-sm font-bold text-slate-800">${course.credits}</p>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <p class="text-xs font-bold text-slate-500 uppercase">Duration</p>
                        <p class="text-sm font-bold text-slate-800">${course.duration}</p>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <p class="text-xs font-bold text-slate-500 uppercase">Category</p>
                        <span class="tag tag-${course.cat.toLowerCase()}">${course.cat}</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-luminous w-full !py-4 shadow-xl active:scale-95 transition-transform" onclick="Actions.toggleEnroll('${course.id}'); ModalManager.close();">Enroll Now</button>
            </div>
        `);
    },

    openCollegeDetails: (id) => {
        const c = Data.colleges.find(col => col.id === id);
        if (!c) return;
        ModalManager.open(`
            <div class="bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden max-w-2xl">
                <div class="absolute top-0 left-0 w-full h-1" style="background: ${c.color}"></div>
                <div class="flex items-center gap-6 mb-8 mt-2">
                    <div class="w-24 h-32 rounded-xl flex items-center justify-center text-4xl font-black border flex-shrink-0 academic-title shadow-sm"
                        style="background: ${c.glow}; color: ${c.color}; border-color: ${c.color}20">${c.name[0]}</div>
                    <div>
                        <h2 class="text-2xl font-black academic-title text-slate-800 leading-tight">${c.name}</h2>
                        <p class="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1"><i class="fas fa-map-marker-alt mr-1"></i> ${c.loc}</p>
                        <p class="text-xs text-slate-500 font-bold mt-2"><span class="text-teal-600">${c.ranking}</span> • Est. ${c.established}</p>
                    </div>
                </div>
                <p class="text-slate-600 mb-6 leading-relaxed italic border-l-4 border-slate-100 pl-4 py-2 bg-slate-50/50 rounded-r-lg">${c.desc}</p>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-50 p-4 rounded-xl">
                        <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Students</p>
                        <p class="text-lg font-bold text-slate-800">${c.students}</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-xl">
                        <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Website</p>
                        <p class="text-sm font-bold text-teal-600">${c.website}</p>
                    </div>
                </div>
                <button class="btn btn-primary btn-luminous w-full !py-4 shadow-xl active:scale-95 transition-transform" onclick="ModalManager.close()">Explore Courses</button>
            </div>
        `);
    },

    notifications: (container) => {
        const unreadCount = Data.notifications.filter(n => !n.read).length;
        container.innerHTML = `
            <div class="mb-10 reveal">
                <h2 class="text-3xl academic-title font-black text-slate-800">Notifications</h2>
                <p class="text-sm text-slate-400 font-medium">${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}.</p>
            </div>

            <div class="space-y-4">
                ${Data.notifications.map((notif, i) => `
                    <div class="card p-5 reveal hover:bg-white group cursor-pointer ${notif.read ? 'opacity-60' : ''}" 
                        style="transition-delay: ${i * 0.05}s"
                        onclick="Actions.markAsRead(${notif.id})">
                        <div class="card-content flex items-start gap-4">
                            <div class="w-12 h-12 rounded-xl ${notif.type === 'course' ? 'bg-blue-50 text-blue-600' :
                notif.type === 'reminder' ? 'bg-amber-50 text-amber-600' :
                    notif.type === 'file' ? 'bg-purple-50 text-purple-600' :
                        notif.type === 'system' ? 'bg-slate-50 text-slate-600' :
                            'bg-teal-50 text-teal-600'
            } flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-${notif.type === 'course' ? 'book' :
                notif.type === 'reminder' ? 'bell' :
                    notif.type === 'file' ? 'file' :
                        notif.type === 'system' ? 'cog' :
                            'bullhorn'
            }"></i>
                            </div>
                            <div class="flex-grow">
                                <div class="flex items-start justify-between">
                                    <p class="text-sm font-bold text-slate-800">${notif.title}</p>
                                    ${!notif.read ? '<div class="w-2 h-2 bg-teal-500 rounded-full"></div>' : ''}
                                </div>
                                <p class="text-xs text-slate-500 mt-1">${notif.desc}</p>
                                <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">${notif.time}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    settings: (container) => {
        const { settings } = Store.state;
        container.innerHTML = `
            <div class="mb-10 reveal">
                <h2 class="text-3xl academic-title font-black text-slate-800">Settings</h2>
                <p class="text-sm text-slate-400 font-medium">Manage your preferences and account.</p>
            </div>

            <div class="space-y-6">
                <div class="card p-6 reveal bg-white">
                    <h3 class="text-lg font-bold text-slate-800 mb-4">Appearance</h3>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                            <p class="text-sm font-bold text-slate-700">Dark Mode</p>
                            <p class="text-xs text-slate-400 mt-1">Toggle dark theme</p>
                        </div>
                        <button onclick="UIEngine.toggleTheme()" class="w-12 h-7 rounded-full ${Store.state.theme === 'dark' ? 'bg-teal-600' : 'bg-slate-300'} relative transition-colors">
                            <div class="w-5 h-5 bg-white rounded-full absolute top-1 ${Store.state.theme === 'dark' ? 'right-1' : 'left-1'} transition-all shadow-md"></div>
                        </button>
                    </div>
                </div>

                <div class="card p-6 reveal bg-white">
                    <h3 class="text-lg font-bold text-slate-800 mb-4">Privacy</h3>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-3">
                        <div>
                            <p class="text-sm font-bold text-slate-700">Show Online Status</p>
                            <p class="text-xs text-slate-400 mt-1">Let others see when you're active</p>
                        </div>
                        <button onclick="Actions.toggleSetting('privacy')" class="w-12 h-7 rounded-full ${settings.privacy ? 'bg-teal-600' : 'bg-slate-300'} relative transition-colors">
                            <div class="w-5 h-5 bg-white rounded-full absolute top-1 ${settings.privacy ? 'right-1' : 'left-1'} transition-all shadow-md"></div>
                        </button>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                            <p class="text-sm font-bold text-slate-700">Enable Notifications</p>
                            <p class="text-xs text-slate-400 mt-1">Receive push notifications</p>
                        </div>
                        <button onclick="Actions.toggleSetting('notifications')" class="w-12 h-7 rounded-full ${settings.notifications ? 'bg-teal-600' : 'bg-slate-300'} relative transition-colors">
                            <div class="w-5 h-5 bg-white rounded-full absolute top-1 ${settings.notifications ? 'right-1' : 'left-1'} transition-all shadow-md"></div>
                        </button>
                    </div>
                </div>

                <div class="card p-6 reveal bg-white">
                    <h3 class="text-lg font-bold text-slate-800 mb-4">Account</h3>
                    <button class="w-full p-4 bg-slate-50 rounded-xl text-left hover:bg-slate-100 transition-colors mb-3">
                        <p class="text-sm font-bold text-slate-700">Change Password</p>
                        <p class="text-xs text-slate-400 mt-1">Update your security credentials</p>
                    </button>
                    <button onclick="Store.logout()" class="w-full p-4 bg-rose-50 rounded-xl text-left hover:bg-rose-100 transition-colors">
                        <p class="text-sm font-bold text-rose-600">Sign Out</p>
                        <p class="text-xs text-rose-400 mt-1">Log out from your account</p>
                    </button>
                </div>
            </div>
        `;
    }
};

// 2. BUSINESS ACTIONS
const Actions = {
    toggleEnroll: (id) => {
        let ids = [...Store.state.enrolled_ids];
        const isEnrolled = ids.includes(id);
        if (isEnrolled) {
            ids = ids.filter(i => i !== id);
            Actions.showToast('info', 'Document released.');
        } else {
            ids.push(id);
            Actions.showToast('success', 'Bookmarked.');
            Store.addActivity({ title: `Enrolled: ${id}`, type: 'bookmark', time: 'Just now' });
        }
        Store.setState({ enrolled_ids: ids });
        Router.handle();
    },

    openUploader: () => {
        ModalManager.open(`
            <div class="p-8 text-center bg-white rounded-3xl">
                <div class="w-24 h-24 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 text-3xl border border-teal-100">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <h3 class="text-2xl font-bold academic-title text-slate-800 mb-2">Ingest Publication</h3>
                <p class="text-sm text-slate-400 mb-10 max-w-[240px] mx-auto leading-relaxed">Drop your PDF or DOCX to begin localized AI indexing.</p>
                <button onclick="Actions.simulateUpload()" class="btn btn-primary btn-luminous btn-magnetic w-full !py-4 shadow-xl">Begin Strategic Ingest</button>
            </div>
        `);
    },

    simulateUpload: () => {
        ModalManager.open(`
            <div class="p-8 text-center bg-white rounded-3xl" id="upload-status">
                <div id="upload-status-icon" class="w-20 h-20 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 text-2xl border border-teal-100">
                    <i class="fas fa-microchip animate-spin"></i>
                </div>
                <h3 class="text-2xl font-bold academic-title text-slate-800 mb-8">Synthesizing Data...</h3>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-10">
                    <div id="upload-bar" class="bg-teal-600 h-full w-0 transition-all duration-500 ease-out"></div>
                </div>
                <div id="upload-steps" class="space-y-3 text-left"></div>
            </div>
        `);

        const steps = ['Reading Vectors', 'Extracting Tags', 'Generating Memo'];
        let progress = 0;
        const interval = setInterval(() => {
            progress += 33.3;
            const bar = document.getElementById('upload-bar');
            if (bar) bar.style.width = `${progress}%`;
            const stepsContainer = document.getElementById('upload-steps');
            if (stepsContainer && steps.length > 0) {
                const stepEl = document.createElement('p');
                stepEl.className = 'text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3';
                stepEl.innerHTML = `<i class="fas fa-check text-teal-600 bg-teal-50 p-1.5 rounded-full"></i> ${steps.shift()}`;
                stepsContainer.appendChild(stepEl);
            }
            if (progress >= 99) {
                clearInterval(interval);
                setTimeout(Actions.finalizeUpload, 800);
            }
        }, 1000);
    },

    finalizeUpload: () => {
        const container = document.getElementById('upload-status');
        if (!container) return;
        container.innerHTML = `
            <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 text-2xl border border-emerald-100">
                <i class="fas fa-check"></i>
            </div>
            <h3 class="text-2xl font-bold academic-title text-slate-800 mb-6">Indexing Complete</h3>
            <button class="btn btn-primary w-full !py-4 shadow-xl" onclick="ModalManager.close()">Add to Library</button>
        `;
        Store.addActivity({ title: 'Structural_v1 Published', type: 'upload', time: 'Just now' });
    },

    handleSearch: (query) => {
        const resultsContainer = document.getElementById('search-results');
        if (!query) { resultsContainer.innerHTML = ''; return; }
        const norm = query.toLowerCase();
        const results = [
            ...Data.courses.filter(c => c.name.toLowerCase().includes(norm)).map(c => ({ type: 'Course', name: c.name, icon: 'book' })),
            ...Data.colleges.filter(c => c.name.toLowerCase().includes(norm)).map(c => ({ type: 'Institution', name: c.name, icon: 'university' }))
        ].slice(0, 5);
        resultsContainer.innerHTML = results.map(r => `
            <div class="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl cursor-pointer group">
                <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                    <i class="fas fa-${r.icon}"></i>
                </div>
                <div>
                   <p class="text-[10px] font-black text-slate-300 uppercase">${r.type}</p>
                   <p class="text-sm font-bold text-slate-800 group-hover:text-teal-700">${r.name}</p>
                </div>
            </div>
        `).join('') || '<p class="text-center text-slate-400 py-6 italic text-sm">No matches found.</p>';
    },

    showToast: (type, msg) => {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast active ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> ${msg}`;
        container.appendChild(toast);
        setTimeout(() => { toast.classList.remove('active'); setTimeout(() => toast.remove(), 400); }, 3000);
    },

    initiateSearch: (query) => {
        const globalInput = document.getElementById('global-search-input');
        if (globalInput) {
            globalInput.value = query;
            window.openSearch();
            globalInput.focus();
            Actions.handleSearch(query);
        }
    },

    previewFile: (id) => {
        const file = Data.files.find(f => f.id === id);
        if (!file) return;
        ModalManager.open(`
            <div class="bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden max-w-2xl">
                <div class="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
                <div class="flex items-center gap-4 mb-6 mt-2">
                    <div class="w-16 h-16 rounded-xl ${file.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'} flex items-center justify-center text-2xl">
                        <i class="fas fa-file-${file.type}"></i>
                    </div>
                    <div class="flex-grow">
                        <h2 class="text-lg font-black text-slate-800">${file.name}</h2>
                        <p class="text-xs text-slate-400 font-bold uppercase mt-1">${file.size} • ${file.category}</p>
                    </div>
                </div>
                <div class="bg-slate-50 p-6 rounded-xl mb-6 text-center">
                    <i class="fas fa-file-${file.type} text-6xl text-slate-300 mb-4"></i>
                    <p class="text-sm text-slate-500 italic">Preview not available for this file type</p>
                    <p class="text-xs text-slate-400 mt-2">Uploaded by ${file.uploadedBy} • ${file.date}</p>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button class="btn bg-slate-100 text-slate-700 hover:bg-slate-200 !py-3" onclick="ModalManager.close()">Close</button>
                   <button class="btn btn-primary !py-3"><i class="fas fa-download mr-2"></i>Download</button>
                </div>
            </div>
        `);
    },

    markAsRead: (id) => {
        const notif = Data.notifications.find(n => n.id === id);
        if (notif && !notif.read) {
            notif.read = true;
            Router.handle();
            Actions.showToast('success', 'Marked as read');
        }
    },

    toggleSetting: (key) => {
        const current = Store.state.settings[key];
        Store.setState({
            settings: { ...Store.state.settings, [key]: !current }
        });
        Router.handle();
        Actions.showToast('success', `Setting updated`);
    },

    calculateGPA: () => {
        const credits = parseFloat(document.getElementById('gpa-credits')?.value || 0);
        const points = parseFloat(document.getElementById('gpa-points')?.value || 0);
        if (credits <= 0) {
            Actions.showToast('error', 'Please enter valid credits');
            return;
        }
        const gpa = (points / credits).toFixed(2);
        document.getElementById('gpa-result').classList.remove('hidden');
        document.getElementById('gpa-value').textContent = gpa;
        Actions.showToast('success', `GPA calculated: ${gpa}`);
    },

    convertUnit: () => {
        const value = parseFloat(document.getElementById('unit-value')?.value || 0);
        const from = document.getElementById('unit-from')?.value;
        const to = document.getElementById('unit-to')?.value;

        const conversions = {
            m: 1,
            km: 0.001,
            cm: 100,
            ft: 3.28084
        };

        const meters = value / conversions[from];
        const result = (meters * conversions[to]).toFixed(4);

        document.getElementById('unit-result').classList.remove('hidden');
        document.getElementById('unit-value-display').textContent = `${result} ${to}`;
        Actions.showToast('success', 'Conversion complete');
    },

    solveQuadratic: () => {
        const a = parseFloat(document.getElementById('quad-a')?.value || 0);
        const b = parseFloat(document.getElementById('quad-b')?.value || 0);
        const c = parseFloat(document.getElementById('quad-c')?.value || 0);

        if (a === 0) {
            Actions.showToast('error', 'Coefficient a cannot be zero');
            return;
        }

        const discriminant = b * b - 4 * a * c;
        const container = document.getElementById('quad-solutions');

        if (discriminant > 0) {
            const x1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(4);
            const x2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(4);
            container.innerHTML = `
                <p class="text-lg font-bold text-emerald-600">x₁ = ${x1}</p>
                <p class="text-lg font-bold text-emerald-600">x₂ = ${x2}</p>
            `;
        } else if (discriminant === 0) {
            const x = (-b / (2 * a)).toFixed(4);
            container.innerHTML = `<p class="text-lg font-bold text-emerald-600">x = ${x}</p>`;
        } else {
            const real = (-b / (2 * a)).toFixed(4);
            const imag = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
            container.innerHTML = `
                <p class="text-sm font-bold text-emerald-600">x₁ = ${real} + ${imag}i</p>
                <p class="text-sm font-bold text-emerald-600">x₂ = ${real} - ${imag}i</p>
            `;
        }

        document.getElementById('quad-result').classList.remove('hidden');
        Actions.showToast('success', 'Equation solved');
    },

    calcInput: (val) => {
        const display = document.getElementById('calc-display');
        if (display.value === '0' && val !== '.') {
            display.value = val;
        } else {
            display.value += val;
        }
    },

    calcEquals: () => {
        const display = document.getElementById('calc-display');
        try {
            display.value = eval(display.value).toString();
        } catch {
            display.value = 'Error';
            setTimeout(() => display.value = '0', 1000);
        }
    },

    calcClear: () => {
        document.getElementById('calc-display').value = '0';
    },

    sendChat: () => {
        const input = document.querySelector('#chat-input');
        const container = document.querySelector('#chat-container');
        if (!input || !container || !input.value.trim()) return;

        const msg = input.value;
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble sent reveal glass-panel !bg-teal-600 !text-white self-end p-4 rounded-xl max-w-[80%] mb-4';
        userBubble.innerText = msg;
        container.appendChild(userBubble);

        input.value = '';
        container.scrollTop = container.scrollHeight;

        setTimeout(() => {
            const aiBubble = document.createElement('div');
            aiBubble.className = 'chat-bubble received reveal glass-panel !bg-white/80 !border-slate-100 text-slate-800 p-4 rounded-xl max-w-[80%] mb-4';
            aiBubble.innerText = `I've analyzed "${msg}" against 14M+ academic nodes. Found 3 relevant papers and 1 data set.`;
            container.appendChild(aiBubble);
            container.scrollTop = container.scrollHeight;
        }, 1200);
    },

    handleLogin: () => {
        const email = document.getElementById('login-email').value || 'curator@collective.edu';
        const container = document.getElementById('screen-login');
        if (!container) return;
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center px-8">
                <div class="w-24 h-24 bg-teal-600 rounded-[32px] flex items-center justify-center text-white text-4xl mb-10 shadow-2xl animate-pulse">
                    <i class="fas fa-brain"></i>
                </div>
                <h2 class="text-2xl academic-title font-bold mb-10 text-slate-800">Establishing Secure Uplink...</h2>
                <div class="space-y-4 w-64 text-left">
                    <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-teal-500 animate-[loading_2s_ease-in-out_infinite]" style="width: 40%"></div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            Store.setState({ user: { name: email.split('@')[0], avatar: 'https://ui-avatars.com/api/?name=CS&background=1E7B85&color=fff' } });
            Router.handle();
        }, 1800);
    }
};

// 3. BOOTSTRAP
document.addEventListener('DOMContentLoaded', () => {
    Router.define({
        'dashboard': (c) => UIEngine.mount(Views.dashboard, c),
        'colleges': (c) => UIEngine.mount(Views.colleges, c),
        'courses': (c) => UIEngine.mount(Views.courses, c),
        'tools': (c) => UIEngine.mount(Views.tools, c),
        'chat': (c) => UIEngine.mount(Views.chat, c),
        'files': (c) => UIEngine.mount(Views.files, c),
        'profile': (c) => UIEngine.mount(Views.profile, c),
        'notifications': (c) => UIEngine.mount(Views.notifications, c),
        'settings': (c) => UIEngine.mount(Views.settings, c),
        'login': (c) => {
            c.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center px-8">
                    <div class="w-24 h-24 bg-teal-600 rounded-[32px] flex items-center justify-center text-white text-4xl mb-10 shadow-2xl relative">
                        <i class="fas fa-graduation-cap"></i>
                        <div class="absolute -inset-4 bg-teal-500/20 rounded-[40px] blur-2xl -z-10"></div>
                    </div>
                    <h2 class="text-3xl academic-title font-black mb-4 text-slate-800">The Library Collective</h2>
                    <p class="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Access the unified engineering intelligence network.</p>
                    <input id="login-email" class="w-full max-w-xs px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold mb-5 shadow-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" placeholder="Enter Access ID">
                    <button onclick="Actions.handleLogin()" class="btn btn-primary btn-luminous btn-magnetic w-full max-w-xs !py-4 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform">Initialize Interface</button>
                    <p class="mt-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Encrypted Auth Layer v5.1</p>
                </div>
            `;
        }
    });

    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.addEventListener('input', (e) => Actions.handleSearch(e.target.value));

    Router.handle();
});

// Modal Manager
const ModalManager = {
    open(html) {
        const root = document.getElementById('modal-root');
        const container = document.getElementById('modal-container');
        const backdrop = document.getElementById('modal-backdrop');
        if (!root || !container || !backdrop) return;
        container.innerHTML = html;
        root.classList.remove('hidden'); root.classList.add('flex');
        requestAnimationFrame(() => { backdrop.style.opacity = '1'; container.style.opacity = '1'; container.style.transform = 'scale(1) translateY(0)'; });
    },
    close() {
        const root = document.getElementById('modal-root');
        const container = document.getElementById('modal-container');
        const backdrop = document.getElementById('modal-backdrop');
        if (!root || !container || !backdrop) return;
        backdrop.style.opacity = '0'; container.style.opacity = '0'; container.style.transform = 'scale(0.9) translateY(10px)';
        setTimeout(() => { root.classList.add('hidden'); root.classList.remove('flex'); }, 300);
    }
};

window.toggleTheme = () => UIEngine.toggleTheme();
window.openSearch = () => { const overlay = document.getElementById('search-overlay'); if (overlay) { overlay.classList.add('active'); document.getElementById('global-search-input')?.focus(); } };
window.closeSearch = () => { const overlay = document.getElementById('search-overlay'); if (overlay) overlay.classList.remove('active'); };
window.Router = Router;
window.Actions = Actions;
window.ModalManager = ModalManager;
window.Views = Views;
