import React from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_EVENTS } from '../../data';
import { Calendar, Clock, MapPin, Bell, ChevronRight, Sparkles } from 'lucide-react';

const Events: React.FC = () => {
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
            className="space-y-8 pb-10"
        >
            <div className="flex items-center justify-between pb-2">
                <div>
                    <h2 className="text-3xl font-black text-white">Upcoming Events</h2>
                    <p className="text-slate-400 font-medium">Academic deadlines & campus activities</p>
                </div>
                <div className="flex items-center space-x-2 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/20 shadow-sm">
                    <Calendar size={16} className="text-amber-400" />
                    <p className="text-sm font-bold text-slate-300">
                        <span className="text-amber-400">{SAMPLE_EVENTS.length}</span> Total Events
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {SAMPLE_EVENTS.map((event) => (
                    <motion.div
                        key={event.id}
                        variants={item}
                        whileHover={{ scale: 1.02, translateY: -4 }}
                        className="glass-card rounded-[2.5rem] p-8 flex flex-col group border-white/5 relative overflow-hidden"
                    >
                        {/* Status Tag */}
                        <div className="absolute top-6 right-8">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${event.type === 'deadline' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                {event.type}
                            </span>
                        </div>

                        <div className="flex items-start space-x-6 mb-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${event.type === 'deadline' ? 'bg-red-500/10 text-red-500 shadow-red-500/10' : 'bg-blue-500/10 text-blue-500 shadow-blue-500/10'
                                }`}>
                                {event.type === 'deadline' ? <Bell size={32} /> : <Sparkles size={32} />}
                            </div>
                            <div className="flex-grow pt-1">
                                <h3 className="text-2xl font-black text-white leading-tight group-hover:text-amber-400 transition-colors">
                                    {event.title}
                                </h3>
                                <div className="mt-2 flex items-center text-slate-400 text-sm font-medium">
                                    <span className="text-amber-400/80 mr-2 font-bold">{event.category}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-800/50">
                            <div className="flex items-center space-x-3 text-slate-300">
                                <div className="p-2 bg-slate-900 rounded-lg">
                                    <Calendar size={16} className="text-blue-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Date</span>
                                    <span className="text-sm font-bold">{event.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-300">
                                <div className="p-2 bg-slate-900 rounded-lg">
                                    <Clock size={16} className="text-emerald-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Time</span>
                                    <span className="text-sm font-bold">{event.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center text-slate-400 text-sm font-medium">
                                <MapPin size={16} className="mr-2 text-slate-500" />
                                <span>{event.location}</span>
                            </div>
                            <button className="flex items-center space-x-2 text-blue-400 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform">
                                <span>Remind Me</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Events;
