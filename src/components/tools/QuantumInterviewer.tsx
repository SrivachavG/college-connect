import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareCode, Send, User, Bot, Award, RefreshCcw } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface Message {
    id: string
    text: string
    sender: 'user' | 'ai'
    timestamp: Date
}

interface InterviewMode {
    id: string
    title: string
    description: string
    initialQuestion: string
    color: string
}

const modes: InterviewMode[] = [
    {
        id: 'hr',
        title: 'HR Round',
        description: 'Behavioral questions about your background and strengths.',
        initialQuestion: "Tell me about yourself. What brings you to this role?",
        color: 'from-blue-500 to-indigo-500'
    },
    {
        id: 'technical',
        title: 'Technical (React)',
        description: 'Deep dive into React, Hooks, and State Management.',
        initialQuestion: "Explain the Virtual DOM and how it improves performance.",
        color: 'from-cyan-500 to-teal-500'
    },
    {
        id: 'system',
        title: 'System Design',
        description: 'Architecting scalable systems (e.g., URL Shortener).',
        initialQuestion: "How would you design a scalable URL shortening service like Bit.ly?",
        color: 'from-purple-500 to-pink-500'
    }
]

export default function QuantumInterviewer() {
    const [activeMode, setActiveMode] = useState<InterviewMode | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputText, setInputText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [sessionComplete, setSessionComplete] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const startInterview = (mode: InterviewMode) => {
        setActiveMode(mode)
        setMessages([
            {
                id: '1',
                text: `Welcome to the ${mode.title}. I am Quantum, your AI interviewer today. Let's begin.`,
                sender: 'ai',
                timestamp: new Date()
            },
            {
                id: '2',
                text: mode.initialQuestion,
                sender: 'ai',
                timestamp: new Date()
            }
        ])
        setSessionComplete(false)
    }

    const handleSendMessage = () => {
        if (!inputText.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, newMessage])
        setInputText('')
        setIsTyping(true)

        // Simulate AI Response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateResponse(inputText, activeMode?.id || 'hr'),
                sender: 'ai',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiResponse])
            setIsTyping(false)

            // Auto-end session after 5 exchanges for demo
            if (messages.length > 8) {
                setSessionComplete(true)
            }
        }, 1500 + Math.random() * 1000)
    }

    const generateResponse = (input: string, modeId: string): string => {
        // Simple keywords based simulation for the demo
        const lowerInput = input.toLowerCase()

        if (modeId === 'technical') {
            if (lowerInput.includes('virtual dom') || lowerInput.includes('diff')) {
                return "Good explanation of the reconciliation process. Now, can you explain useEffect?"
            }
            if (lowerInput.includes('side effect') || lowerInput.includes('lifecycle')) {
                return "Correct. How would you handle cleanup in useEffect?"
            }
        }

        if (modeId === 'hr') {
            if (lowerInput.length < 20) {
                return "That answer was a bit short. Can you elaborate on a specific example?"
            }
            return "That's a strong point. How do you handle conflict in a team setting?"
        }

        return "Interesting perspective. Let's move to the next question. What are your thoughts on scalability constraints?"
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="h-[600px] flex gap-6">
            {/* Sidebar / Mode Selection */}
            <div className="w-1/3 space-y-4">
                <Card className="p-6 h-full flex flex-col">
                    <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <MessageSquareCode className="w-6 h-6 text-primary" />
                        Select Interview
                    </h2>

                    <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                        {modes.map(mode => (
                            <button
                                key={mode.id}
                                onClick={() => startInterview(mode)}
                                className={`w-full p-4 rounded-xl text-left border transition-all relative overflow-hidden group ${activeMode?.id === mode.id
                                    ? 'border-primary bg-primary/5 shadow-glow'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 bg-white dark:bg-gray-800'
                                    }`}
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${mode.color}`} />
                                <h3 className="font-bold text-gray-900 dark:text-white">{mode.title}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{mode.description}</p>

                                {activeMode?.id === mode.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Chat Interface */}
            <div className="flex-1">
                <Card className="h-full flex flex-col overflow-hidden relative">
                    {!activeMode ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                            <Bot className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quantum Interviewer</h3>
                            <p className="text-gray-500 max-w-sm">Select an interview mode from the left to begin your AI-powered mock interview session.</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activeMode.color} flex items-center justify-center text-white text-xs font-bold`}>
                                        AI
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{activeMode.title}</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs text-gray-500">Live Simulation</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="secondary"
                                    onClick={() => setActiveMode(null)}
                                    className="text-gray-400 hover:text-red-500 py-1 px-2 text-xs"
                                >
                                    End Session
                                </Button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-black/20">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user'
                                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                            : `bg-gradient-to-br ${activeMode.color} text-white`
                                            }`}>
                                            {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tr-none'
                                            : 'bg-primary/10 text-gray-900 dark:text-white rounded-tl-none border border-primary/10'
                                            }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                            <span className="text-[10px] text-gray-400 mt-2 block opacity-70">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-3"
                                    >
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activeMode.color} text-white flex items-center justify-center`}>
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-primary/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-1">
                                            <motion.div className="w-2 h-2 rounded-full bg-primary/40" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                                            <motion.div className="w-2 h-2 rounded-full bg-primary/40" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} />
                                            <motion.div className="w-2 h-2 rounded-full bg-primary/40" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                                {sessionComplete ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
                                    >
                                        <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                        <h3 className="font-bold text-green-700 dark:text-green-300">Interview Complete!</h3>
                                        <p className="text-sm text-green-600 dark:text-green-400 mb-4">You demonstrated strong technical knowledge.</p>
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white border-none py-1 px-3 text-sm"
                                            onClick={() => startInterview(activeMode)}
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" /> Restart Session
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="relative flex items-end gap-2">
                                        <textarea
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder="Type your answer here..."
                                            className="w-full p-4 pr-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[60px] max-h-[120px]"
                                            disabled={isTyping}
                                        />
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!inputText.trim() || isTyping}
                                            className="absolute right-2 bottom-3 h-9 w-9 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg shadow-primary/30 p-0 flex items-center justify-center"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    )
}
