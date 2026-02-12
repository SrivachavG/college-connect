import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useThemeStore } from '../store/useThemeStore'
import { Moon, Sun, Bell, Shield, User, Palette, Globe, Lock } from 'lucide-react'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function Settings() {
    const { theme, setTheme } = useThemeStore()

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 max-w-4xl"
        >
            {/* Appearance */}
            <motion.div variants={itemVariants}>
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/20 text-purple-600 dark:text-purple-400 rounded-lg">
                            <Palette className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                                Theme
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <motion.button
                                    onClick={() => setTheme('light')}
                                    className={`p-4 rounded-xl border-2 transition-all ${theme === 'light'
                                        ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-amber-500/10 to-orange-500/20 rounded-lg">
                                            <Sun className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900 dark:text-white">Light</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Bright and clean</p>
                                        </div>
                                    </div>
                                    {theme === 'light' && (
                                        <motion.div
                                            className="mt-3 text-xs font-medium text-gray-900 dark:text-white"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            ✓ Active
                                        </motion.div>
                                    )}
                                </motion.button>

                                <motion.button
                                    onClick={() => setTheme('dark')}
                                    className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark'
                                        ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/20 rounded-lg">
                                            <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900 dark:text-white">Dark</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Easy on eyes</p>
                                        </div>
                                    </div>
                                    {theme === 'dark' && (
                                        <motion.div
                                            className="mt-3 text-xs font-medium text-gray-900 dark:text-white"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            ✓ Active
                                        </motion.div>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={itemVariants}>
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/20 rounded-lg">
                            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'Course Updates', description: 'Get notified about new materials' },
                            { label: 'Assignment Reminders', description: 'Reminders for upcoming deadlines' },
                            { label: 'College News', description: 'Updates from colleges you follow' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                                <motion.button
                                    className="relative w-12 h-6 bg-gray-900 dark:bg-white rounded-full transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-gray-900 rounded-full"
                                        animate={{ x: 24 }}
                                    />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </motion.div>

            {/* Account */}
            <motion.div variants={itemVariants}>
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-green-500/20 rounded-lg">
                            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account</h2>
                    </div>

                    <div className="space-y-3">
                        <Button variant="secondary" className="w-full justify-start">
                            <User className="w-4 h-4" />
                            Edit Profile
                        </Button>
                        <Button variant="secondary" className="w-full justify-start">
                            <Lock className="w-4 h-4" />
                            Change Password
                        </Button>
                        <Button variant="secondary" className="w-full justify-start">
                            <Shield className="w-4 h-4" />
                            Privacy Settings
                        </Button>
                        <Button variant="secondary" className="w-full justify-start">
                            <Globe className="w-4 h-4" />
                            Language Preferences
                        </Button>
                    </div>
                </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div variants={itemVariants}>
                <Button variant="primary" className="w-full justify-center">
                    Save All Changes
                </Button>
            </motion.div>
        </motion.div>
    )
}
