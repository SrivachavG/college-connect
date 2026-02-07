import { useLocation } from 'react-router-dom'
import { Bell, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '../../store/useThemeStore'

const pageNames: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/colleges': 'Colleges',
    '/courses': 'My Courses',
    '/chat': 'Chat',
    '/profile': 'Profile',
    '/settings': 'Settings',
}

export default function Topbar() {
    const location = useLocation()
    const currentPage = pageNames[location.pathname] || 'Dashboard'
    const { theme, toggleTheme } = useThemeStore()

    return (
        <header className="col-start-2 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-8 flex items-center justify-between transition-colors duration-300">
            <AnimatePresence mode="wait">
                <motion.h1
                    key={currentPage}
                    className="text-2xl font-semibold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    {currentPage}
                </motion.h1>
            </AnimatePresence>

            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <motion.button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <AnimatePresence mode="wait">
                        {theme === 'light' ? (
                            <motion.div
                                key="moon"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Sun className="w-5 h-5 text-yellow-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Notification Bell */}
                <motion.button
                    className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <motion.span
                        className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </motion.button>
            </div>
        </header>
    )
}
