import React from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_COLLEGES } from '../../data';
import { MapPin, ChevronRight, Star, GraduationCap } from 'lucide-react';

interface CollegesProps {
    onSelectCollege: (id: string) => void;
}

const Colleges: React.FC<CollegesProps> = ({ onSelectCollege }) => {
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
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        show: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            <div className="flex items-center justify-between pb-2">
                <div className="hidden lg:block">
                    <h2 className="text-3xl font-black text-white">Engineering Hub</h2>
                    <p className="text-slate-400 font-medium">Find your dream institution</p>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-2xl border border-blue-500/20 shadow-sm">
                    <GraduationCap size={16} className="text-blue-400" />
                    <p className="text-sm font-bold text-slate-300">
                        <span className="text-blue-400">{SAMPLE_COLLEGES.length}</span> Institutions
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_COLLEGES.map((college) => (
                    <motion.div
                        key={college.id}
                        variants={item}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group cursor-pointer border-white/5"
                        onClick={() => onSelectCollege(college.id)}
                    >
                        {/* College Cover/Header */}
                        <div className="h-40 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-0 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 mesh-gradient-header opacity-60 z-0 group-hover:rotate-12 transition-transform duration-700" />

                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white z-10 border border-white/10 shadow-lg">
                                <Star size={18} fill="white" className="group-hover:rotate-12 transition-transform" />
                            </div>
                            <div className="absolute -bottom-10 left-8 z-10">
                                <motion.img
                                    whileHover={{ scale: 1.1, rotate: 3 }}
                                    src={`https://placehold.co/100x100/1e293b/ffffff?text=${college.logo}&font=inter`}
                                    alt={college.name}
                                    className="w-24 h-24 rounded-[1.75rem] border-4 border-slate-900 shadow-2xl object-cover bg-slate-800"
                                />
                            </div>
                        </div>

                        <div className="p-8 pt-14 flex-grow flex flex-col">
                            <div className="flex-grow">
                                <h3 className="text-2xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                                    {college.name}
                                </h3>
                                <p className="flex items-center mt-3 text-sm text-slate-400 font-medium">
                                    <MapPin size={14} className="mr-1.5 text-blue-500" />
                                    {college.location}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-base">{college.courses}</span>
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Programs</span>
                                    </div>
                                    <div className="w-px h-8 bg-slate-800" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-base">{college.students}+</span>
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Students</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg border border-white/5">
                                    <ChevronRight size={24} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Colleges;
