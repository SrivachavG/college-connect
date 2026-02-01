import { motion } from 'framer-motion'
import { TrendingUp, Users, BookOpen, Calendar, ArrowUpRight, Clock, MoreVertical, X } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const stats = [
    { label: 'Active Courses', value: '8', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', change: '+12%' },
    { label: 'Total Students', value: '2.5K', icon: Users, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', change: '+8%' },
    { label: 'Colleges', value: '45', icon: TrendingUp, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', change: '+5%' },
    { label: 'Events', value: '12', icon: Calendar, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', change: '+3%' },
]

const gradeData = [
    { name: 'Sem 1', gpa: 7.8 },
    { name: 'Sem 2', gpa: 8.2 },
    { name: 'Sem 3', gpa: 8.5 },
    { name: 'Sem 4', gpa: 8.3 },
    { name: 'Sem 5', gpa: 8.9 },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function Dashboard() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Sunny!</h2>
                    <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your courses today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">View Reports</Button>
                    <Button variant="primary">Add Course</Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
            >
                {stats.map((stat, index) => (
                    <motion.div key={stat.label} variants={itemVariants}>
                        <Card hover className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bg} transition-colors`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <motion.span
                                    className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <ArrowUpRight className="w-3 h-3" />
                                    {stat.change}
                                </motion.span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                            <motion.p
                                className="text-3xl font-bold text-gray-900 dark:text-white"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            >
                                {stat.value}
                            </motion.p>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Performance Chart */}
                    <motion.div variants={itemVariants}>
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Academic Performance</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={gradeData}>
                                        <defs>
                                            <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                borderRadius: '8px',
                                                border: 'none',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="gpa" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div variants={itemVariants}>
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                                <button className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline">View All</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: 'New course material uploaded', course: 'Data Structures', time: '2 hours ago', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                                    { title: 'Assignment submitted', course: 'Algorithms', time: '5 hours ago', icon: Calendar, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
                                    { title: 'Class cancelled', course: 'Database Systems', time: '1 day ago', icon: X, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' }
                                ].map((activity, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                    >
                                        <motion.div
                                            className={`w-12 h-12 rounded-xl ${activity.bg} flex items-center justify-center`}
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                        >
                                            <activity.icon className={`w-6 h-6 ${activity.color}`} />
                                        </motion.div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">{activity.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.course} • {activity.time}</p>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Right Sidebar Widgets */}
                <div className="space-y-6">
                    {/* Next Class Widget */}
                    <motion.div variants={itemVariants}>
                        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <Clock className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm opacity-80 mb-1">Next Class starts in</p>
                                <div className="text-4xl font-bold mb-4">45 min</div>
                                <h4 className="text-xl font-bold mb-1">Computer Networks</h4>
                                <p className="text-sm opacity-80 mb-4">Room 302 • Dr. Smith</p>
                                <Button variant="secondary" className="w-full justify-center bg-white/20 dark:bg-black/10 hover:bg-white/30 dark:hover:bg-black/20 border-none text-white dark:text-gray-900">
                                    View Schedule
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Quick Access */}
                    <motion.div variants={itemVariants}>
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Access</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="justify-center h-auto py-4 flex-col gap-2">
                                    <BookOpen className="w-6 h-6 text-purple-600" />
                                    <span className="text-xs">Library</span>
                                </Button>
                                <Button variant="outline" className="justify-center h-auto py-4 flex-col gap-2">
                                    <Users className="w-6 h-6 text-blue-600" />
                                    <span className="text-xs">Clubs</span>
                                </Button>
                                <Button variant="outline" className="justify-center h-auto py-4 flex-col gap-2">
                                    <Calendar className="w-6 h-6 text-green-600" />
                                    <span className="text-xs">Timetable</span>
                                </Button>
                                <Button variant="outline" className="justify-center h-auto py-4 flex-col gap-2">
                                    <TrendingUp className="w-6 h-6 text-orange-600" />
                                    <span className="text-xs">Exams</span>
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
