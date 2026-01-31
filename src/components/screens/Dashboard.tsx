import React from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_RECENT_ACTIVITY } from '../../data';
import { GraduationCap, BookOpen, FileText, MessageSquare, Bell, Zap, Target, ArrowUpRight, Sparkles } from 'lucide-react';

interface DashboardProps {
    onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8 pb-10"
        >
            {/* Welcome Header - Mobile Only */}
            <motion.div variants={item} className="lg:hidden mb-6">
                <h2 className="text-3xl font-black text-white">Hello, Sunny!</h2>
                <p className="text-slate-400 font-medium">Ready for another day of learning?</p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[180px]">

                {/* Status Widget - Large */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.01 }}
                    className="md:col-span-2 lg:col-span-2 row-span-2 glass-card rounded-[2.5rem] p-8 mesh-gradient-header text-white flex flex-col justify-between overflow-hidden group border-none"
                >
                    <div className="relative z-10">
                        <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            <Zap size={24} fill="white" />
                        </div>
                        <h3 className="text-3xl font-black mb-2 leading-tight">Your streak is<br />on fire! 🔥</h3>
                        <p className="text-white/80 font-medium">12 days consistently active. Keep pushing toward your goals.</p>
                    </div>

                    <div className="relative z-10 flex items-center space-x-4 mt-6">
                        <button className="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-900/20 hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap">
                            View Analytics
                        </button>
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm shadow-sm" />
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold shadow-sm">+5</div>
                        </div>
                    </div>
                </motion.div>

                {/* AI Assistant Call to Action - NEW */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    onClick={() => onNavigate('aiAssistant')}
                    className="md:col-span-1 lg:col-span-1 glass-card rounded-[2rem] p-6 bg-blue-500/10 border-blue-500/20 flex flex-col items-start justify-between group overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                        <Sparkles size={100} className="text-blue-400" />
                    </div>
                    <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform relative z-10">
                        <Sparkles size={28} />
                    </div>
                    <div className="relative z-10">
                        <span className="block text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">AI Powered</span>
                        <span className="block text-xl font-black text-white">Ask Anything</span>
                    </div>
                </motion.button>

                {/* Quick Navigate - Courses */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    onClick={() => onNavigate('courses')}
                    className="md:col-span-1 lg:col-span-1 glass-card rounded-[2rem] p-6 bg-emerald-500/10 border-emerald-500/20 flex flex-col items-start justify-between group"
                >
                    <div className="bg-emerald-500 text-white p-4 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                        <BookOpen size={28} />
                    </div>
                    <div>
                        <span className="block text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">Learning</span>
                        <span className="block text-xl font-black text-white">My Courses</span>
                    </div>
                </motion.button>

                {/* Mini Widget - Next Exam */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    className="lg:col-span-1 glass-card rounded-[2rem] p-6 bg-amber-500/5 border-amber-500/20 flex flex-col justify-between"
                >
                    <div className="flex items-center space-x-2 text-amber-400">
                        <Target size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">Next Goal</span>
                    </div>
                    <div>
                        <span className="block text-lg font-black text-white">Physics Quiz</span>
                        <span className="text-xs text-slate-400 font-medium">Tomorrow, 10:00 AM</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        />
                    </div>
                </motion.div>

                {/* Recent Activity Section */}
                <motion.div variants={item} className="md:col-span-3 lg:col-span-2 row-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-white flex items-center">
                            <Sparkles size={20} className="mr-2 text-blue-500" />
                            Smart Feed
                        </h3>
                        <button className="text-blue-400 text-sm font-bold flex items-center hover:translate-x-1 transition-transform">
                            View All <ArrowUpRight size={16} className="ml-1" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {SAMPLE_RECENT_ACTIVITY.map((activity, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ x: 5 }}
                                className="glass-card rounded-2xl p-4 flex items-center space-x-4 border-white/5 hover:border-blue-500/30"
                            >
                                <div className={`p-3 rounded-xl text-white shadow-md ${activity.type === 'pdf' ? 'bg-red-500 shadow-red-500/20' :
                                    activity.type === 'comment' ? 'bg-blue-500 shadow-blue-500/20' :
                                        'bg-orange-500 shadow-orange-500/20'
                                    }`}>
                                    {activity.icon === 'file-text' && <FileText size={18} />}
                                    {activity.icon === 'message-square' && <MessageSquare size={18} />}
                                    {activity.icon === 'megaphone' && <Bell size={18} />}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="font-bold text-slate-200 text-sm truncate">{activity.title}</p>
                                    <p className="text-[11px] text-slate-400 font-medium truncate">
                                        In <span className="text-blue-400 font-bold">{activity.source}</span>
                                    </p>
                                </div>
                                <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">{activity.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Dashboard;
