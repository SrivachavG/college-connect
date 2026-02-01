import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    GraduationCap,
    BookOpen,
    MessageCircle,
    User,
    Settings,
    LogOut,
    Wrench,
    Calendar
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import toast from 'react-hot-toast'

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/events', icon: Calendar, label: 'Events' },
    { to: '/colleges', icon: GraduationCap, label: 'Colleges' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/chat', icon: MessageCircle, label: 'Chat' },
    { to: '/tools', icon: Wrench, label: 'Tools' },
]

const bottomItems = [
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
}

export default function Sidebar() {
    const { logout, user } = useAuthStore()

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully')
    }

    return (
        <aside className="row-span-2 bg-white dark:bg-black border-r border-gray-200 dark:border-white/10 p-6 flex flex-col transition-colors duration-300">
            {/* Logo */}
            <motion.div
                className="mb-12 px-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <GraduationCap className="w-5 h-5 text-white dark:text-black" />
                    </motion.div>
                    <div>
                        <span className="text-xl font-semibold text-black dark:text-white">CollegeConnect</span>
                        {user && <p className="text-xs text-gray-500 dark:text-gray-400">{user.name}</p>}
                    </div>
                </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.nav
                className="flex-1 space-y-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <motion.div
                                className="flex items-center gap-3 w-full"
                                variants={itemVariants}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        className="ml-auto w-1 h-1 rounded-full bg-current"
                                        layoutId="activeIndicator"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </motion.nav>

            {/* Bottom Links */}
            <div className="mt-auto space-y-1 pt-6 border-t border-gray-100 dark:border-white/10">
                {bottomItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white'
                            }`
                        }
                    >
                        <motion.div
                            className="flex items-center gap-3 w-full"
                            whileHover={{ x: 4 }}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </motion.div>
                    </NavLink>
                ))}

                <motion.button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 w-full"
                    whileHover={{ x: 4 }}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </motion.button>
            </div>
        </aside>
    )
}
