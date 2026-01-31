import React from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_CHATS } from '../../data';
import { Search, MessageSquare, ChevronRight } from 'lucide-react';

interface ChatProps {
    onSelectChat: (id: string) => void;
}

const Chat: React.FC<ChatProps> = ({ onSelectChat }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            } as const
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col h-full max-w-4xl mx-auto"
        >
            <div className="sticky top-0 z-10 py-2 bg-[#020617]/80 backdrop-blur-md mb-6">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search chats or contacts..."
                        className="w-full pl-12 pr-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm transition-all text-slate-200"
                    />
                </div>
            </div>

            <div className="flex-grow space-y-3 overflow-y-auto pr-2 scrollbar-hide">
                {SAMPLE_CHATS.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <MessageSquare size={48} className="mb-4 opacity-20" />
                        <p className="font-bold">No active chats.</p>
                    </div>
                ) : (
                    SAMPLE_CHATS.map((chat) => (
                        <motion.button
                            key={chat.id}
                            variants={item}
                            whileHover={{ x: 5, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                            onClick={() => onSelectChat(chat.id)}
                            className="flex items-center w-full p-4 text-left glass-card border-white/5 rounded-3xl hover:border-blue-500/30 transition-all group"
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-black text-xl shadow-lg group-hover:scale-105 transition-transform overflow-hidden font-mono">
                                    {chat.avatarSeed}
                                </div>
                                {chat.online && (
                                    <span className="absolute -bottom-1 -right-1 block h-5 w-5 bg-emerald-500 border-4 border-[#020617] rounded-full shadow-sm shadow-emerald-500/20" />
                                )}
                            </div>
                            <div className="flex-grow min-w-0 ml-5">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-black text-white truncate text-lg group-hover:text-blue-400 transition-colors uppercase tracking-tight">{chat.name}</h3>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-400 font-medium truncate w-[85%]">{chat.lastMessage}</p>
                                    {chat.unread > 0 ? (
                                        <span className="flex items-center justify-center bg-blue-600 text-white text-[10px] font-black h-6 w-6 rounded-xl shadow-lg shadow-blue-500/30">
                                            {chat.unread}
                                        </span>
                                    ) : (
                                        <ChevronRight size={16} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>
                            </div>
                        </motion.button>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default Chat;
