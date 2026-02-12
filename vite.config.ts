import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? '/college-connect/' : '/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve('./src'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
}))
