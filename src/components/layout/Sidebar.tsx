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
import Logo from '../ui/Logo'

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
        <aside className="h-full sidebar-vibrancy flex flex-col pt-5 pb-6 px-4 transition-all duration-300">
            {/* Logo */}
            <motion.div
                className="mb-8 px-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3">
                    <Logo className="w-10 h-10" />
                    <div>
                        <span className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-glow">
                            College Connect
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.nav
                className="flex-1 space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'text-white shadow-md shadow-primary/25'
                                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light hover:bg-white/50 dark:hover:bg-white/5'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark -z-10"
                                        layoutId="activeTab"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <motion.div
                                    className="flex items-center gap-3 w-full z-10"
                                    variants={itemVariants}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </motion.div>
                            </>
                        )}
                    </NavLink>
                ))}
            </motion.nav>

            {/* Bottom Links */}
            <div className="mt-auto space-y-2 pt-6 border-t border-gray-200/50 dark:border-white/10">
                {bottomItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-white/10 text-primary dark:text-primary-light font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
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
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 w-full group"
                    whileHover={{ x: 4 }}
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-medium">Logout</span>
                </motion.button>
            </div>
        </aside>
    )
}
