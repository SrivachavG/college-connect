import { motion } from 'framer-motion'
import { TrendingUp, Users, BookOpen, Calendar, Clock, MoreVertical, X, Bell, Search, ChevronRight, Star, ArrowUpRight } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Mock Data
const stats = [
    { label: 'Active Courses', value: '8', icon: BookOpen, color: 'text-system-blue', bg: 'bg-system-blue/10', change: '+12%' },
    { label: 'Total Students', value: '2.5K', icon: Users, color: 'text-system-green', bg: 'bg-system-green/10', change: '+8%' },
    { label: 'Colleges', value: '45', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10', change: '+5%' },
    { label: 'Events', value: '12', icon: Calendar, color: 'text-system-orange', bg: 'bg-system-orange/10', change: '+3%' },
]

const gradeData = [
    { name: 'Sem 1', gpa: 7.8 },
    { name: 'Sem 2', gpa: 8.2 },
    { name: 'Sem 3', gpa: 8.5 },
    { name: 'Sem 4', gpa: 8.3 },
    { name: 'Sem 5', gpa: 8.9 },
]

const deadlines = [
    { task: 'Database Schema', course: 'DBMS', date: 'Today', status: 'Urgent', color: 'bg-system-red text-white' },
    { task: 'React Hooks Essay', course: 'Web Dev', date: 'Tomorrow', status: 'Pending', color: 'bg-system-orange text-white' },
    { task: 'AI Ethics Paper', course: 'General', date: 'Feb 15', status: 'Done', color: 'bg-system-green text-white' },
    { task: 'System Design', course: 'Software Eng', date: 'Feb 18', status: 'Pending', color: 'bg-gray-500 text-white' },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
}

export default function Dashboard() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 pb-6"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                    Overview
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Here's what's happening with your academic life today.
                </p>
            </motion.div>

            {/* Top Row: Next Class Widget & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Next Class Widget (Glassmorphic) */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <div className="h-full relative overflow-hidden rounded-[20px] shadow-2xl group">
                        {/* Background Image with Blur */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

                        <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                            <div className="flex justify-between items-start">
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/10">
                                    Next Class
                                </span>
                                <MoreVertical className="w-5 h-5 opacity-80 cursor-pointer hover:opacity-100" />
                            </div>

                            <div className="mt-8">
                                <h2 className="text-3xl font-bold mb-1 tracking-tight">Advanced Python</h2>
                                <p className="text-white/80 font-medium flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> 10:00 AM - 11:30 AM
                                </p>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 bg-gray-300">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full rounded-full" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-white/90">+24 others</span>
                                <Button variant="primary" className="ml-auto bg-white text-black hover:bg-white/90 border-none shadow-none backdrop-blur-none">
                                    Join
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label} variants={itemVariants}>
                            <div className="h-full p-5 rounded-[20px] bg-white/60 dark:bg-[#2C2C2C]/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'text-system-green bg-green-100/50 dark:bg-green-900/20' : 'text-system-red bg-red-100/50'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Row: Table & Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Deadlines Table */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <div className="h-full p-6 rounded-[20px] bg-white/60 dark:bg-[#2C2C2C]/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Deadlines</h3>
                            <Button variant="ghost" className="text-system-blue text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20">View All</Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-200/50 dark:border-white/5">
                                        <th className="pb-3 pl-2">Task</th>
                                        <th className="pb-3">Course</th>
                                        <th className="pb-3">Due Date</th>
                                        <th className="pb-3 text-right pr-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {deadlines.map((item, i) => (
                                        <tr key={i} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                            <td className="py-4 pl-2 font-medium text-gray-900 dark:text-white group-hover:text-system-blue transition-colors">
                                                {item.task}
                                            </td>
                                            <td className="py-4 text-gray-500 dark:text-gray-400">{item.course}</td>
                                            <td className="py-4 text-gray-500 dark:text-gray-400">{item.date}</td>
                                            <td className="py-4 text-right pr-2">
                                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Urgent' ? 'bg-red-100 text-system-red dark:bg-red-900/30' :
                                                        item.status === 'Done' ? 'bg-green-100 text-system-green dark:bg-green-900/30' :
                                                            'bg-orange-100 text-system-orange dark:bg-orange-900/30'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* Mini Performance Chart */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <div className="h-full p-6 rounded-[20px] bg-white/60 dark:bg-[#2C2C2C]/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance</h3>
                        <div className="flex-1 relative min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={gradeData}>
                                    <defs>
                                        <linearGradient id="colorGpaMac" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            fontSize: '12px'
                                        }}
                                        cursor={{ stroke: '#007AFF', strokeWidth: 1 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="gpa"
                                        stroke="#007AFF"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorGpaMac)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-semibold">Current GPA</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">8.9</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-system-blue/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-system-blue" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
