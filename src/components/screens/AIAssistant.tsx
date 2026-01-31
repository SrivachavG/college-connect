import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, BookOpen, GraduationCap, Info } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const SUGGESTIONS = [
    { icon: GraduationCap, text: 'Top engineering colleges in India' },
    { icon: BookOpen, text: 'Best resources for learning Calculus' },
    { icon: Info, text: 'How to prepare for placement interviews?' },
];

const AIAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your College Connect AI assistant. Ask me anything about colleges, courses, or career paths.",
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Based on recent rankings, IIT Bombay, IIT Delhi, and IIT Madras consistently lead the engineering field in India.",
                "For Calculus, I highly recommend checking out 3Blue1Brown's 'Essence of Calculus' series on YouTube for visual intuition.",
                "Placement prep should focus on 3 pillars: Data Structures & Algorithms, Core CS subjects, and Soft Skills.",
                "That's a great question! Engineering students often find internship opportunities through platforms like Internshala or directly via college TPO portals.",
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
            {/* Suggestions for empty state */}
            {messages.length === 1 && !isTyping && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                >
                    {SUGGESTIONS.map((suggestion, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSend(suggestion.text)}
                            className="p-6 glass-card rounded-3xl text-left hover:border-blue-500/50 group transition-all"
                        >
                            <suggestion.icon className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                            <p className="text-sm font-semibold text-slate-300">{suggestion.text}</p>
                        </button>
                    ))}
                </motion.div>
            )}

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto pr-4 space-y-6 scrollbar-hide">
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "flex w-full mb-4",
                                message.sender === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "flex max-w-[80%] items-start space-x-3",
                                message.sender === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row"
                            )}>
                                <div className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                                    message.sender === 'user' ? "bg-blue-600" : "bg-slate-800 border border-slate-700"
                                )}>
                                    {message.sender === 'user' ? <User size={20} /> : <Bot size={20} className="text-blue-400" />}
                                </div>
                                <div className={cn(
                                    "p-4 rounded-3xl",
                                    message.sender === 'user'
                                        ? "bg-blue-600 text-white rounded-tr-none shadow-blue-500/20 shadow-xl"
                                        : "bg-slate-800/50 backdrop-blur-md border border-slate-700 text-slate-200 rounded-tl-none"
                                )}>
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start items-center space-x-3"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                                <Bot size={20} className="text-blue-400" />
                            </div>
                            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-4 rounded-3xl rounded-tl-none">
                                <Loader2 className="animate-spin text-blue-500" size={20} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="mt-8 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
                <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-[2rem] p-2 pr-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask AI anything..."
                        className="flex-grow bg-transparent border-none focus:ring-0 text-slate-200 px-6 py-3 placeholder:text-slate-500"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-800 text-white rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper function locally for the component since we don't want to import it everywhere if possible
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

export default AIAssistant;
