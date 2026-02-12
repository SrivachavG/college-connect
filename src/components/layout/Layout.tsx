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
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        root.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-cover bg-center transition-all duration-500">
            {/* Background Pattern - Mesh Gradient from body will show through or we can enhance it here */}

            {/* Full Screen Layout */}
            <div className="min-h-screen w-full grid grid-cols-[260px_1fr] overflow-hidden">
                {/* Sidebar */}
                <div className="relative z-20 h-full border-r border-white/10 dark:border-white/5">
                    <Sidebar />
                </div>

                {/* Main Content Area */}
                <main className="relative z-10 h-full flex flex-col bg-white/80 dark:bg-[#1E1E1E]/90 backdrop-blur-3xl transition-colors duration-300">
                    {/* Topbar */}
                    <div className="h-16 flex items-center px-8 border-b border-black/5 dark:border-white/5 backdrop-blur-md sticky top-0 z-30">
                        <Topbar />
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="max-w-[1200px] mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={location.pathname}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <Outlet />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
