/**
 * UIEngine.js - Advanced Post-Rendering Effects
 */
const UIEngine = {
    init() {
        // Global Theme Management
        this.applyTheme(Store.state.theme);
        Store.subscribe((state) => this.applyTheme(state.theme));
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) {
            themeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    },

    toggleTheme() {
        const next = Store.state.theme === 'light' ? 'dark' : 'light';
        Store.setState({ theme: next });
    },

    // Component Lifecycle Utilities
    mount(componentFunc, container, param = null) {
        container.innerHTML = `<div class="p-8 text-center"><i class="fas fa-spinner fa-spin text-2xl text-teal-600"></i></div>`;
        setTimeout(() => {
            componentFunc(container, param);
            this.postRender(container);
        }, 100);
    },

    postRender(container) {
        // 3D Tilt Logic
        const cards = container.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.applyTilt(e, card));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });

        // Magnetic Button Logic
        const magneticBtns = container.querySelectorAll('.btn-magnetic');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.applyMagnetic(e, btn));
            btn.addEventListener('mouseleave', () => this.resetMagnetic(btn));
        });

        // Reveal Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    },

    applyTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },

    resetTilt(card) {
        card.style.transform = '';
    },

    applyMagnetic(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    },

    resetMagnetic(btn) {
        btn.style.transform = '';
    }
};

window.UIEngine = UIEngine;
UIEngine.init();
