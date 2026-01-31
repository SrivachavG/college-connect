import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SAMPLE_MATERIALS, EXTERNAL_RESOURCES } from '../../data';
import { FileText, Download, Search, Globe, Book, MessageSquare, Sparkles, LayoutGrid, List, ExternalLink } from 'lucide-react';

const Materials: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            } as const
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24
            } as const
        }
    };

    const filteredMaterials = SAMPLE_MATERIALS.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'book': return <Book size={20} />;
            case 'file-text': return <FileText size={20} />;
            case 'university': return <Globe size={20} />;
            case 'message-square': return <MessageSquare size={20} />;
            default: return <ExternalLink size={20} />;
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 pb-20"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4">
                <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Engineering Hub</h2>
                    <p className="text-slate-400 font-medium mt-1">Access curated engineering resources and reference materials</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter materials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-6 py-3.5 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl w-full lg:w-72 focus:w-80 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-slate-200"
                        />
                    </div>
                    <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Reference Resources Section */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <div className="w-2 h-8 bg-blue-500 rounded-full" />
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase text-sm">External Reference Archives</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {EXTERNAL_RESOURCES.map((res) => (
                        <motion.a
                            key={res.id}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={item}
                            whileHover={{ scale: 1.05, translateY: -5 }}
                            className="glass-card rounded-3xl p-6 border-white/5 flex items-center space-x-4 group hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-xl">
                                {getIcon(res.icon)}
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{res.type}</p>
                                <h4 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">{res.name}</h4>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Core Materials Section */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                        <h3 className="text-2xl font-black text-white tracking-tight uppercase text-sm text-emerald-400">Course Materials</h3>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'grid' ? (
                        <motion.div
                            key="grid"
                            variants={container}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        >
                            {filteredMaterials.map((material) => (
                                <motion.div
                                    key={material.id}
                                    variants={item}
                                    whileHover={{ scale: 1.02, translateY: -8 }}
                                    className="glass-card rounded-[2.5rem] p-8 flex flex-col group border-white/5 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] group-hover:scale-150 transition-all duration-700">
                                        <Sparkles size={120} />
                                    </div>

                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl">
                                            <FileText size={32} />
                                        </div>
                                        <span className="px-5 py-2 bg-slate-900 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/5">
                                            {material.type}
                                        </span>
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                                            {material.title}
                                        </h3>
                                        <div className="flex items-center mt-3 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                                            {material.subject}
                                        </div>

                                        <div className="mt-8 grid grid-cols-2 gap-4 py-6 border-y border-slate-800/50">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Size</span>
                                                <span className="text-sm font-black text-slate-200">{material.size}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Downloads</span>
                                                <span className="text-sm font-black text-slate-200">{material.downloads}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full mt-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.1em] hover:bg-blue-500 hover:scale-[1.02] transition-all group/dl flex items-center justify-center space-x-3 shadow-xl shadow-blue-500/20 active:scale-95 border border-blue-400/20">
                                        <Download size={20} className="group-hover/dl:animate-bounce" />
                                        <span>Download Paper</span>
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card rounded-[2.5rem] overflow-hidden border-white/5"
                        >
                            <table className="w-full text-left">
                                <thead className="bg-slate-950/50 border-b border-slate-800">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Material Name</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Engineering Branch</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Metadata</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {filteredMaterials.map((material) => (
                                        <tr key={material.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                                                        <FileText size={20} />
                                                    </div>
                                                    <span className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">{material.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-emerald-400 font-bold text-sm tracking-wide bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">{material.subject}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-200 text-sm font-bold uppercase tracking-tighter">{material.type} • {material.size}</span>
                                                    <span className="text-slate-500 text-[10px] font-bold">{material.downloads} students downloaded</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-3 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-lg active:scale-95">
                                                    <Download size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Materials;
