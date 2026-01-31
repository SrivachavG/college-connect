import React from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_RECENT_ACTIVITY, SAMPLE_EVENTS } from '../../data';
import { BookOpen, FileText, MessageSquare, Bell, Zap, Target, ArrowUpRight, Sparkles, Calendar, ChevronRight, GraduationCap } from 'lucide-react';

interface DashboardProps {
    onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 200, damping: 20 }
        }
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            className="space-y-10 pb-20"
        >
            {/* Welcome Header - Mobile Only */}
            <motion.div variants={item} className="lg:hidden mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white leading-none">Hello, Sunny!</h2>
                        <p className="text-slate-400 font-medium mt-1">Your engineering journey continues.</p>
                    </div>
                </div>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">

                {/* Status Widget - Large */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.01, translateY: -5 }}
                    className="md:col-span-2 lg:col-span-2 row-span-2 glass-card rounded-[3rem] p-10 mesh-gradient-header text-white flex flex-col justify-between overflow-hidden group border-none shadow-2xl shadow-blue-500/20"
                >
                    <div className="relative z-10">
                        <motion.div
                            animate={floatingAnimation}
                            className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center backdrop-blur-xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xl"
                        >
                            <Zap size={32} fill="white" />
                        </motion.div>
                        <h3 className="text-4xl font-black mb-4 leading-tight tracking-tight">Your streak is<br />on fire! 🔥</h3>
                        <p className="text-white/80 font-medium text-lg max-w-sm">12 days consistently active. You're in the top 5% of engineering students this week.</p>
                    </div>

                    <div className="relative z-10 flex items-center space-x-6 mt-8">
                        <button className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-sm shadow-2xl shadow-indigo-950/20 hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap uppercase tracking-widest">
                            Growth Stats
                        </button>
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md shadow-lg overflow-hidden">
                                    <img src={`https://placehold.co/48x48/6366f1/ffffff?text=${i}`} alt="user" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-2 border-white/40 bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-black shadow-lg">+12</div>
                        </div>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                </motion.div>

                {/* AI Assistant Call to Action */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.05, translateY: -8 }}
                    onClick={() => onNavigate('aiAssistant')}
                    className="md:col-span-1 lg:col-span-1 glass-card rounded-[2.5rem] p-8 bg-blue-500/10 border-blue-500/20 flex flex-col items-start justify-between group overflow-hidden relative shadow-xl"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                        <Sparkles size={120} className="text-blue-400" />
                    </div>
                    <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-2xl shadow-blue-500/30 group-hover:rotate-12 transition-transform relative z-10">
                        <Sparkles size={32} />
                    </div>
                    <div className="relative z-10 text-left">
                        <span className="block text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Gen AI Assistant</span>
                        <span className="block text-2xl font-black text-white leading-tight">Solve Complex Equations</span>
                    </div>
                </motion.button>

                {/* Quick Navigate - Materials */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.05, translateY: -8 }}
                    onClick={() => onNavigate('materials')}
                    className="md:col-span-1 lg:col-span-1 glass-card rounded-[2.5rem] p-8 bg-emerald-500/10 border-emerald-500/20 flex flex-col items-start justify-between group overflow-hidden relative shadow-xl"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-150 transition-transform duration-1000 rotate-45">
                        <FileText size={120} className="text-emerald-400" />
                    </div>
                    <div className="bg-emerald-500 text-white p-5 rounded-2xl shadow-2xl shadow-emerald-500/30 group-hover:-rotate-12 transition-transform relative z-10">
                        <BookOpen size={32} />
                    </div>
                    <div className="relative z-10 text-left">
                        <span className="block text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Resource Vault</span>
                        <span className="block text-2xl font-black text-white leading-tight">Scribd Archives</span>
                    </div>
                </motion.button>

                {/* Upcoming Events Mini Widget */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.05, translateY: -8 }}
                    onClick={() => onNavigate('events')}
                    className="lg:col-span-1 glass-card rounded-[2.5rem] p-8 bg-amber-500/10 border-amber-500/20 flex flex-col justify-between group relative overflow-hidden shadow-xl"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2 text-amber-500">
                            <Calendar size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deadlines</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <div className="text-left relative z-10">
                        <span className="block text-xl font-black text-white leading-tight mb-1 truncate">{SAMPLE_EVENTS[0].title}</span>
                        <div className="flex items-center text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                            <span className="text-amber-400 mr-2">Feb 15</span>
                            <span>• {SAMPLE_EVENTS[0].location}</span>
                        </div>
                    </div>
                </motion.button>

                {/* Mini Widget - Next Exam */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05, translateY: -8 }}
                    className="lg:col-span-1 glass-card rounded-[2.5rem] p-8 bg-rose-500/5 border-rose-500/20 flex flex-col justify-between relative overflow-hidden shadow-xl"
                >
                    <div className="flex items-center space-x-2 text-rose-500 mb-4">
                        <Target size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Priority Goal</span>
                    </div>
                    <div className="text-left">
                        <span className="block text-xl font-black text-white leading-tight">Physics Quiz</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">Tomorrow, 10:00 AM</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full mt-6 overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                            className="h-full bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                        />
                    </div>
                </motion.div>

                {/* Smart Feed Section */}
                <motion.div variants={item} className="md:col-span-3 lg:col-span-2 row-span-2 space-y-6 pt-4">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <h3 className="text-2xl font-black text-white flex items-center tracking-tight">
                            <Sparkles size={24} className="mr-3 text-blue-500" />
                            Smart Feed
                        </h3>
                        <button className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">
                            View Story <ArrowUpRight size={18} className="ml-2" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {SAMPLE_RECENT_ACTIVITY.map((activity, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ x: 10, scale: 1.02 }}
                                className="glass-card rounded-3xl p-5 flex items-center space-x-5 border-white/5 hover:border-blue-500/40 hover:bg-white/[0.02] transition-all shadow-lg"
                            >
                                <div className={cn(
                                    "p-4 rounded-2xl text-white shadow-xl transition-transform group-hover:scale-110",
                                    activity.type === 'pdf' ? 'bg-rose-500 shadow-rose-500/20' :
                                        activity.type === 'comment' ? 'bg-blue-600 shadow-blue-600/20' :
                                            'bg-amber-500 shadow-amber-500/20'
                                )}>
                                    {activity.icon === 'file-text' && <FileText size={20} />}
                                    {activity.icon === 'message-square' && <MessageSquare size={20} />}
                                    {activity.icon === 'megaphone' && <Bell size={20} />}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="font-black text-slate-100 text-sm truncate uppercase tracking-tight">{activity.title}</p>
                                    <div className="flex items-center mt-1">
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                            In <span className="text-blue-400">{activity.source}</span>
                                        </p>
                                        <div className="w-1 h-1 rounded-full bg-slate-700 mx-3" />
                                        <span className="text-[9px] text-slate-600 font-bold uppercase">{activity.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Dashboard;

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
