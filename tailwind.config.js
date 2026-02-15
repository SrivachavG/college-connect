/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Cosmic Glass Theme
                glass: {
                    100: 'rgba(255, 255, 255, 0.05)',
                    200: 'rgba(255, 255, 255, 0.1)',
                    300: 'rgba(255, 255, 255, 0.2)',
                    400: 'rgba(255, 255, 255, 0.3)',
                    dark: 'rgba(15, 23, 42, 0.6)',
                },
                pastel: {
                    purple: '#E0C3FC',
                    blue: '#8EC5FC',
                    pink: '#FF9A9E',
                    cream: '#FAD0C4',
                    mint: '#B5FFFC',
                },
                background: {
                    DEFAULT: '#ffffff',
                    dark: '#020617', // Deep cosmic slate
                    card: '#ffffff',
                    'card-dark': '#0f172a',
                },
                primary: {
                    DEFAULT: '#4f46e5', // Electric Indigo
                    dark: '#4338ca',
                    light: '#818cf8',
                    glow: '#6366f1',
                },
                secondary: {
                    DEFAULT: '#06b6d4', // Cyan
                    dark: '#0891b2',
                    glow: '#22d3ee',
                },
                accent: {
                    purple: '#d8b4fe',
                    pink: '#f9a8d4',
                    orange: '#fdba74',
                },
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'neon-blue': '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
                'neon-purple': '0 0 10px rgba(124, 58, 237, 0.5), 0 0 20px rgba(124, 58, 237, 0.3)',
                'glow': '0 0 15px rgba(99, 102, 241, 0.5)',
                // macOS System Colors
                'system-gray': {
                    light: '#F5F5F5',
                    dark: '#1E1E1E',
                    border: '#D1D1D1',
                    'border-dark': '#333333',
                },
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'clsx', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-in': 'slideIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'spin-slow': 'spin 3s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': "url('/patterns/grid.svg')",
            },
        },
    },
    plugins: [],
}
