import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from '../../store/useThemeStore'
import Sidebar from './Sidebar'
import Topbar from './TopBar'
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout() {
    const theme = useThemeStore((state) => state.theme)
    const location = useLocation()

    useEffect(() => {
        // Apply theme to document
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)

        // Also set data attribute for better compatibility
        root.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <div className="min-h-screen grid grid-cols-[280px_1fr] grid-rows-[70px_1fr] transition-all duration-500">
            {/* Sidebar */}
            <Sidebar />

            {/* Topbar */}
            <Topbar />

            {/* Main Content with Page Transitions */}
            <main className="col-start-2 row-start-2 overflow-y-auto p-8">
                <div className="max-w-[1600px] mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
