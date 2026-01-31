import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_MATERIALS } from '../../data';
import { FileText, Download, Search, BookOpen, HardDrive, LayoutGrid, List } from 'lucide-react';

const Materials: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

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
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
    };

    const filteredMaterials = SAMPLE_MATERIALS.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-10"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
                <div>
                    <h2 className="text-3xl font-black text-white">Study Materials</h2>
                    <p className="text-slate-400 font-medium">Download notes, papers & resources</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl w-full lg:w-64 focus:w-80 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm text-slate-200"
                        />
                    </div>
                    <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'PDFs', count: 124, icon: <FileText className="text-red-400" /> },
                    { label: 'Courses', count: 18, icon: <BookOpen className="text-blue-400" /> },
                    { label: 'Downloads', count: '1.2k', icon: <Download className="text-emerald-400" /> },
                    { label: 'Storage', count: '2.5GB', icon: <HardDrive className="text-amber-400" /> },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        className="glass-card rounded-[1.5rem] p-4 flex items-center space-x-4 border-white/5"
                    >
                        <div className="p-3 bg-slate-900 rounded-xl">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-white font-black">{stat.count}</p>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {filteredMaterials.map((material) => (
                        <motion.div
                            key={material.id}
                            variants={item}
                            whileHover={{ scale: 1.02, translateY: -4 }}
                            className="glass-card rounded-[2rem] p-6 flex flex-col group border-white/5"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                    <FileText size={24} />
                                </div>
                                <span className={`px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5`}>
                                    {material.type}
                                </span>
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-lg font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                                    {material.title}
                                </h3>
                                <p className="text-sm font-bold text-blue-500 mt-2">{material.subject}</p>
                                <div className="mt-4 flex items-center space-x-4 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                                    <span className="flex items-center"><HardDrive size={12} className="mr-1" /> {material.size}</span>
                                    <span className="flex items-center"><Download size={12} className="mr-1" /> {material.downloads} downloads</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-blue-600/10 text-blue-400 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all group/dl flex items-center justify-center space-x-2 border border-blue-500/20">
                                <Download size={14} className="group-hover/dl:animate-bounce" />
                                <span>Download</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="glass-card rounded-[2rem] overflow-hidden border-white/5">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Name</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Subject</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Type</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {filteredMaterials.map((material) => (
                                <tr key={material.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <FileText size={18} className="text-slate-500 group-hover:text-blue-400" />
                                            <span className="font-bold text-white text-sm">{material.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-blue-400 font-bold text-xs">{material.subject}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-400 text-xs font-medium">{material.type} • {material.size}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-blue-400 hover:bg-blue-600/10 rounded-lg transition-colors">
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default Materials;
