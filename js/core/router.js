/**
 * Router.js - Decoupled Navigation Engine
 */
const Router = {
    routes: {},
    currentRoute: null,

    define(routes) {
        this.routes = routes;
        window.onhashchange = () => this.handle();
    },

    handleNavigate(path) {
        window.location.hash = path;
    },

    handle() {
        const fullPath = window.location.hash.slice(1) || 'dashboard';
        const [path, param] = fullPath.split(':');

        if (!Store.state.user && !['login', 'signup'].includes(path)) {
            window.location.hash = 'login';
            return;
        }

        if (this.routes[path]) {
            this.navigate(path, param);
        } else {
            console.error(`Route ${path} not found.`);
            this.navigate('dashboard');
        }
    },

    navigate(path, param = null) {
        this.currentRoute = path;
        const viewport = document.getElementById('main-viewport');
        const activeScreen = viewport.querySelector('.screen.active');

        if (activeScreen) {
            activeScreen.classList.add('exiting');
            setTimeout(() => activeScreen.remove(), 400); // Wait for exit animation
        }

        const newScreen = document.createElement('div');
        newScreen.id = `screen-${path}`;
        newScreen.className = 'screen';
        viewport.appendChild(newScreen);

        const titleEl = document.getElementById('currentScreenTitle');
        if (titleEl) titleEl.textContent = path.charAt(0).toUpperCase() + path.slice(1);

        setTimeout(() => {
            this.routes[path](newScreen, param);
            newScreen.classList.add('active');
            this.syncNav(path);
        }, 50);
    },


    syncNav(path) {
        document.querySelectorAll('.nav-item, .nav-link').forEach(el => {
            const match = el.dataset.screen === path || el.dataset.page === path;
            el.classList.toggle('active', match);
        });
    }
};

window.Router = Router;
