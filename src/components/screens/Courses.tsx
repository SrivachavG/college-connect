import React from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_COURSES } from '../../data';
import { CATEGORY_COLORS } from '../../constants';
import { MinusCircle, BookOpen, Play, Clock, Users, FileText } from 'lucide-react';

interface CoursesProps {
    onSelectCourse: (id: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
    const enrolledCourses = SAMPLE_COURSES.filter(c => c.isEnrolled);

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
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
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
                    <h2 className="text-3xl font-black text-white">Your Curriculum</h2>
                    <p className="text-slate-400 font-medium">Continue where you left off</p>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-2xl border border-blue-500/20 shadow-sm">
                    <BookOpen size={16} className="text-blue-400" />
                    <p className="text-sm font-bold text-slate-300">
                        <span className="text-blue-400">{enrolledCourses.length}</span> Active Courses
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => {
                    const colors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.Default;

                    return (
                        <motion.div
                            key={course.id}
                            variants={item}
                            whileHover={{ scale: 1.02, translateY: -4 }}
                            className="glass-card rounded-[2.5rem] p-8 flex flex-col group cursor-pointer border-white/5"
                            onClick={() => onSelectCourse(course.id)}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-110 group-hover:rotate-6 transition-transform opacity-90`}>
                                    <BookOpen size={28} />
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${colors.bg} ${colors.text} opacity-80`}>
                                    {course.category}
                                </span>
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-2xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                                    {course.name}
                                </h3>
                                <p className="text-sm text-slate-400 font-medium mt-2">Prof. {course.instructor}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-y border-slate-800/50">
                                <div className="text-center">
                                    <div className="flex justify-center mb-1 text-slate-500 group-hover:text-blue-400 transition-colors">
                                        <Users size={14} />
                                    </div>
                                    <p className="text-white font-black text-sm">{course.students}</p>
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Peers</p>
                                </div>
                                <div className="text-center border-x border-slate-800/50">
                                    <div className="flex justify-center mb-1 text-slate-500 group-hover:text-emerald-400 transition-colors">
                                        <FileText size={14} />
                                    </div>
                                    <p className="text-white font-black text-sm">{course.files}</p>
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Files</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex justify-center mb-1 text-slate-500 group-hover:text-amber-400 transition-colors">
                                        <Clock size={14} />
                                    </div>
                                    <p className="text-white font-black text-sm">{course.schedule.split(' ')[0]}</p>
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Next</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-8">
                                <button
                                    className="flex items-center px-4 py-2 text-xs font-black text-slate-500 hover:text-red-400 transition-colors group/deregister"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <MinusCircle size={16} className="mr-2 group-hover/deregister:rotate-90 transition-transform" />
                                    <span>Withdraw</span>
                                </button>
                                <button
                                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-500/20 hover:bg-blue-500 hover:scale-105 transition-all active:scale-95 group/resume"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectCourse(course.id);
                                    }}
                                >
                                    <Play size={14} fill="white" className="group-hover/resume:translate-x-0.5 transition-transform" />
                                    <span>Continue</span>
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Courses;
