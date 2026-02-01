import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import { Mail, MapPin, Calendar } from 'lucide-react'
import Button from '../components/ui/Button'
import { useAuthStore } from '../store/useAuthStore'

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

export default function Profile() {
    const user = useAuthStore((state) => state.user)

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            {/* Profile Header */}
            <motion.div variants={itemVariants}>
                <Card className="p-8">
                    <div className="flex items-center gap-6">
                        <motion.div
                            className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 rounded-full flex items-center justify-center text-white dark:text-gray-900 text-2xl font-bold"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            SV
                        </motion.div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user?.name || 'SRI VACHAV'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">Student at Annamacharya college</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">B.Tech Computer Science & Engineering</p>
                        </div>
                        <Button variant="primary">Edit Profile</Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 grid grid-cols-3 gap-4 text-sm">
                        <motion.div
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                            whileHover={{ x: 4 }}
                        >
                            <Mail className="w-4 h-4" />
                            <span>{user?.email || 'srivachav@example.com'}</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                            whileHover={{ x: 4 }}
                        >
                            <MapPin className="w-4 h-4" />
                            <span>Andhra Pradesh, India</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                            whileHover={{ x: 4 }}
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Joined Jan 2024</span>
                        </motion.div>
                    </div>
                </Card>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Academic Stats</h3>
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {[
                            { value: 8, label: 'Active Courses', color: 'text-blue-600 dark:text-blue-400' },
                            { value: 150, label: 'Files Uploaded', color: 'text-green-600 dark:text-green-400' },
                            { value: '88%', label: 'Avg. Attendance', color: 'text-purple-600 dark:text-purple-400' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                            >
                                <motion.p
                                    className={`text-3xl font-bold ${stat.color} mb-1`}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {stat.value}
                                </motion.p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    )
}
