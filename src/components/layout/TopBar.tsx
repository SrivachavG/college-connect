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
        <header className="col-start-2 glass rounded-2xl m-2 mb-0 px-8 flex items-center justify-between transition-all duration-300 sticky top-2 z-50">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                        {currentPage}
                    </h1>
                </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <motion.button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 backdrop-blur-sm"
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
                    className="relative p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <motion.span
                        className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </motion.button>

                {/* Profile Avatar (Optional - can add user avatar here) */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${Math.random()}`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}
