/**
 * Store.js - Centralized Observable State Management
 * Senior-level pattern for decouping state from UI.
 */
const Store = {
    state: {
        user: null,
        theme: 'light',
        courses: [],
        enrolled_ids: [],
        activity: [],
        notifications: [],
        recommendations: [],
        settings: { privacy: true, notifications: true },
        isLoading: false
    },

    subscribers: [],

    init() {
        const savedUser = JSON.parse(localStorage.getItem('cc_r_user'));
        const savedTheme = localStorage.getItem('cc_r_theme') || 'light';
        const savedEnrolled = JSON.parse(localStorage.getItem('cc_r_enrolled_ids')) || [];
        const savedActivity = JSON.parse(localStorage.getItem('cc_r_activity')) || [];
        const savedRecs = JSON.parse(localStorage.getItem('cc_r_recommendations')) || [];

        this.state = {
            ...this.state,
            user: savedUser,
            theme: savedTheme,
            enrolled_ids: savedEnrolled,
            activity: savedActivity,
            recommendations: savedRecs
        };

        if (this.state.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        console.log("Senior Store Initialized");
        this.notify();
    },

    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.persist();
        this.notify();
    },

    async dispatch(action, payload) {
        this.setState({ isLoading: true });
        try {
            await action(payload);
        } catch (error) {
            console.error("Store Dispatch Error:", error);
        } finally {
            this.setState({ isLoading: false });
        }
    },

    persist() {
        Object.keys(this.state).forEach(key => {
            if (key !== 'isLoading') {
                localStorage.setItem(`cc_r_${key}`, JSON.stringify(this.state[key]));
            }
        });
    },

    subscribe(callback) {
        this.subscribers.push(callback);
    },

    notify() {
        this.subscribers.forEach(cb => cb(this.state));
    },

    logout() {
        localStorage.removeItem('cc_r_user');
        this.setState({ user: null });
        window.location.hash = 'login';
    },

    addActivity(item) {
        const activity = [item, ...this.state.activity].slice(0, 10);
        this.setState({ activity });
    }
};

window.Store = Store;
Store.init();

