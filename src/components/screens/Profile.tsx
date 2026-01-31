import React from 'react';
import { motion } from 'framer-motion';
import { USER_PROFILE } from '../../data';
import { User, Bell, FolderOpen, Settings, ShieldCheck, LogOut, ChevronRight, Award, Flame, Zap, Camera, CreditCard } from 'lucide-react';

const Profile: React.FC = () => {
    const container = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
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
            className="max-w-4xl mx-auto space-y-8 pb-10"
        >
            {/* Premium Profile Header */}
            <motion.div
                variants={item}
                className="relative pt-20 pb-16 overflow-hidden rounded-[3.5rem] mesh-gradient-header shadow-2xl shadow-indigo-500/40 border border-white/10"
            >
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-64 h-64 -ml-20 -mb-20 bg-black/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />

                <div className="relative flex flex-col items-center text-center px-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-blue-500 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                        <img
                            src={`https://placehold.co/160x160/1e293b/FFFFFF?text=SS&font=inter`}
                            alt="User"
                            className="relative w-40 h-40 rounded-[3rem] border-4 border-white/20 backdrop-blur-md shadow-2xl object-cover bg-slate-800"
                        />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-2xl border-4 border-slate-900 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                            <Camera size={20} />
                        </div>
                    </motion.div>

                    <h2 className="text-4xl font-black text-white mt-8 leading-tight tracking-tight drop-shadow-md">
                        {USER_PROFILE.name}
                    </h2>

                    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                        <span className="bg-white/10 backdrop-blur-md text-white/90 text-[10px] font-black px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-[0.2em] shadow-sm">
                            Premium Student
                        </span>
                        <div className="flex items-center text-white/80 font-bold text-sm bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                            <Zap size={14} className="mr-2 text-yellow-400" />
                            Level 12 Explorer
                        </div>
                    </div>

                    <p className="mt-4 text-white/70 text-base font-medium max-w-sm mx-auto">
                        {USER_PROFILE.major} @ <span className="text-white font-bold">{USER_PROFILE.university}</span>
                    </p>
                </div>
            </motion.div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Courses', value: '8', icon: Award, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Study Resources', value: '150', icon: FolderOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Day Streak', value: '12', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass-card rounded-[2.5rem] p-8 flex flex-col items-center text-center border-white/5"
                    >
                        <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color} mb-5 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                            <stat.icon size={28} />
                        </div>
                        <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Settings Menu */}
            <motion.div
                variants={item}
                className="glass-card rounded-[3rem] overflow-hidden border-white/5 p-3"
            >
                <div className="px-6 py-4 mb-2 flex items-center justify-between border-b border-slate-800/50">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Account Settings</h3>
                    <Settings size={16} className="text-slate-500" />
                </div>
                {[
                    { icon: User, label: 'Edit Profile', color: 'bg-blue-500/10 text-blue-400' },
                    { icon: Bell, label: 'Notifications', color: 'bg-yellow-500/10 text-yellow-400' },
                    { icon: CreditCard, label: 'Subscription Plan', color: 'bg-purple-500/10 text-purple-400' },
                    { icon: ShieldCheck, label: 'Security & Privacy', color: 'bg-emerald-500/10 text-emerald-400' },
                    { icon: LogOut, label: 'Sign Out', color: 'bg-red-500/10 text-red-400', dangerous: true },
                ].map((menuItem, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                        className="flex items-center w-full px-6 py-5 transition-all rounded-[2rem] group"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${menuItem.color} flex items-center justify-center mr-5 shadow-sm transition-transform group-hover:scale-110`}>
                            <menuItem.icon size={20} />
                        </div>
                        <span className={`font-black text-sm tracking-tight ${menuItem.dangerous ? 'text-red-400' : 'text-slate-200'}`}>{menuItem.label}</span>
                        <div className="ml-auto w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-600 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all border border-white/5">
                            <ChevronRight size={18} strokeWidth={3} />
                        </div>
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Profile;
