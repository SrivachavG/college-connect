import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BookOpen, Calendar, Clock, MoreVertical, Plus, CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button'
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'
import { useAcademicStore } from '../store/useAcademicStore'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import NewTaskModal from '../components/dashboard/NewTaskModal'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
}

export default function Dashboard() {
    const { courses, assignments, grades, currentGpa, toggleAssignmentStatus } = useAcademicStore()
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

    // Derived Stats
    const activeCoursesCount = courses.length
    const pendingAssignments = assignments.filter(a => a.status !== 'Done').length
    const upcomingExams = assignments.filter(a => a.type === 'Exam' && new Date(a.dueDate) > new Date()).length

    // Sort assignments by due date
    const sortedAssignments = [...assignments].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

    // Determine Next Class (Simple Logic for Demo)
    const nextClass = courses.length > 0 ? courses[0] : { name: 'Free Time', schedule: 'Relax' }

    const stats = [
        { label: 'Active Courses', value: activeCoursesCount.toString(), icon: BookOpen, color: 'text-system-blue', bg: 'bg-system-blue/10', change: 'On Track' },
        { label: 'Assignments', value: pendingAssignments.toString(), icon: Calendar, color: 'text-system-orange', bg: 'bg-system-orange/10', change: `${pendingAssignments} Due` },
        { label: 'Current GPA', value: currentGpa.toString(), icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10', change: '+0.4' },
        { label: 'Upcoming Exams', value: upcomingExams.toString(), icon: Clock, color: 'text-system-red', bg: 'bg-system-red/10', change: 'Prepare' },
    ]

    const handleJoinClass = () => {
        toast.success(`Joining ${nextClass.name} Session...`)
    }

    const handleToggleAssignment = (id: string, title: string) => {
        toggleAssignmentStatus(id)
        toast.success(`Updated status for: ${title}`)
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 pb-6"
        >
            <NewTaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />

            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Welcome back! You have <span className="text-system-blue font-bold">{pendingAssignments} tasks</span> pending.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary">
                        <Calendar className="w-4 h-4 mr-2" /> Schedule
                    </Button>
                    <Button onClick={() => setIsTaskModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> New Task
                    </Button>
                </div>
            </motion.div>

            {/* Top Row: Next Class Widget & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Next Class Widget (Glassmorphic) */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <div className="h-full relative overflow-hidden rounded-[20px] shadow-2xl group cursor-pointer" onClick={handleJoinClass}>
                        {/* Background Image with Blur */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm group-hover:bg-black/30 transition-colors"></div>

                        <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                            <div className="flex justify-between items-start">
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/10 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    Live Now
                                </span>
                                <MoreVertical className="w-5 h-5 opacity-80 cursor-pointer hover:opacity-100" />
                            </div>

                            <div className="mt-8">
                                <h2 className="text-3xl font-bold mb-1 tracking-tight">{nextClass.name}</h2>
                                <p className="text-white/80 font-medium flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {nextClass.schedule}
                                </p>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 bg-gray-300">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="Student" className="w-full h-full rounded-full" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-white/90">+24 classmates</span>
                                <Button variant="primary" className="ml-auto bg-white text-black hover:bg-white/90 border-none shadow-none backdrop-blur-none" onClick={(e) => { e.stopPropagation(); handleJoinClass(); }}>
                                    Join Class
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stats.map((stat) => (
                        <motion.div key={stat.label} variants={itemVariants}>
                            <div className="h-full p-5 rounded-[20px] bg-white/60 dark:bg-[#2C2C2C]/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                                <div className="flex justify-between items-start">
                                    <div className={`p-2.5 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.color.includes('green') ? 'text-system-green bg-green-100/50 dark:bg-green-900/20' : 'text-gray-500 bg-gray-100/50 dark:bg-gray-700/30'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
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
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                Upcoming Deadlines
                            </h3>
                            <Button variant="ghost" className="text-system-blue text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20">View All</Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-200/50 dark:border-white/5">
                                        <th className="pb-3 pl-2">Status</th>
                                        <th className="pb-3">Task</th>
                                        <th className="pb-3">Course</th>
                                        <th className="pb-3">Due Date</th>
                                        <th className="pb-3 text-right pr-2">Priority</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {sortedAssignments.map((item) => {
                                        const course = courses.find(c => c.id === item.courseId)
                                        return (
                                            <tr key={item.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => handleToggleAssignment(item.id, item.title)}>
                                                <td className="py-4 pl-2">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${item.status === 'Done' ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-system-blue'}`}>
                                                        {item.status === 'Done' && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                    </div>
                                                </td>
                                                <td className={`py-4 font-medium transition-colors ${item.status === 'Done' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white group-hover:text-system-blue'}`}>
                                                    {item.title}
                                                </td>
                                                <td className="py-4 text-gray-500 dark:text-gray-400">
                                                    <span className={`px-2 py-0.5 rounded text-xs ${course?.color.replace('bg-', 'text-').replace('500', '600')} bg-opacity-10 bg-gray-100`}>
                                                        {course?.code}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-gray-500 dark:text-gray-400">
                                                    {format(new Date(item.dueDate), 'MMM dd')}
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Done' ? 'bg-gray-100 text-gray-500 dark:bg-gray-800' :
                                                            item.status === 'Urgent' ? 'bg-red-100 text-system-red dark:bg-red-900/30' :
                                                                'bg-orange-100 text-system-orange dark:bg-orange-900/30'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* Mini Performance Chart */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <div className="h-full p-6 rounded-[20px] bg-white/60 dark:bg-[#2C2C2C]/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance Trend</h3>
                        <div className="flex-1 relative min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={grades}>
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
                                            fontSize: '12px',
                                            color: '#000'
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
                                <p className="text-xs text-gray-400 uppercase font-semibold">Overall GPA</p>
                                <p className="text-3xl font-bold text-system-blue dark:text-blue-400">{currentGpa}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-system-blue/10 flex items-center justify-center animate-pulse">
                                <TrendingUp className="w-6 h-6 text-system-blue" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
