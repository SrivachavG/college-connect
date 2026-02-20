import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    MessageSquareCode, Mic, MicOff, Video, VideoOff,
    PhoneOff, Monitor, Volume2, User
} from 'lucide-react'
import Card from '../ui/Card'
import useMediaStream from '../../hooks/useMediaStream'
import useSpeech from '../../hooks/useSpeech'
import AudioVisualizer from '../ui/AudioVisualizer'

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

    // Custom Hooks
    const { stream, initStream, isVideoEnabled, isAudioEnabled, toggleVideo, toggleAudio } = useMediaStream()
    const { speak, isSpeaking, startListening, stopListening, transcript, resetTranscript, isListening } = useSpeech()

    const userVideoRef = useRef<HTMLVideoElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)


    // Sync media stream to video element
    useEffect(() => {
        if (userVideoRef.current && stream) {
            userVideoRef.current.srcObject = stream
        }
    }, [stream, activeMode])

    // Auto-scroll chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Speech-to-Text Integration
    useEffect(() => {
        if (transcript && !isSpeaking) {
            // Debounce or wait for pause to send? For now, let's keep it manual or simple
            // In a real app, we'd detect silence. Here, let's just show what's being heard.
        }
    }, [transcript])

    const startInterview = async (mode: InterviewMode) => {
        setActiveMode(mode)
        await initStream()

        const initialMsg: Message = {
            id: '1',
            text: `Welcome to the ${mode.title}. I am Quantum, your AI interviewer today. Let's begin. ${mode.initialQuestion}`,
            sender: 'ai',
            timestamp: new Date()
        }

        setMessages([initialMsg])
        speak(initialMsg.text)
        startListening()
    }

    const endSession = () => {
        stopListening()
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
        }
        setActiveMode(null)
        setMessages([])
        resetTranscript()
    }

    const handleSendResponse = () => {
        if (!transcript) return

        const userMsg: Message = {
            id: Date.now().toString(),
            text: transcript,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMsg])
        resetTranscript()
        stopListening()

        // Simulate AI Processing
        setTimeout(() => {
            const aiResponseText = "That's a great point. Can you elaborate further on the scalability aspects?"
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponseText,
                sender: 'ai',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMsg])
            speak(aiResponseText)
            startListening()
        }, 1500)
    }

    // Early Return for Mode Selection
    if (!activeMode) {
        return (
            <div className="h-[700px] flex gap-6">
                <div className="w-1/3">
                    <Card className="p-6 h-full flex flex-col bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-white/20">
                        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <MessageSquareCode className="w-6 h-6 text-cyan-500" />
                            Select Interview
                        </h2>
                        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                            {modes.map(mode => (
                                <button
                                    key={mode.id}
                                    onClick={() => startInterview(mode)}
                                    className="group w-full p-5 rounded-2xl text-left border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${mode.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{mode.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{mode.description}</p>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem] bg-gray-50/50 dark:bg-gray-900/20">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 mb-8 animate-pulse">
                        <Monitor className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                        Quantum Interviewer 2.0
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        AI-powered mock interviews with real-time video analysis and voice interaction.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-[800px] flex gap-6">
            {/* Left: AI & Chat */}
            <div className="w-1/2 flex flex-col gap-6">
                {/* AI Visualizer */}
                <Card className="h-1/3 relative overflow-hidden bg-black flex items-center justify-center border-gray-800">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    {/* Animated Avatar Placeholder */}
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${activeMode.color} p-1 shadow-2xl shadow-cyan-500/20`}>
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                                {isSpeaking ? (
                                    <AudioVisualizer isActive={true} /> // Show waveform when AI speaks
                                ) : (
                                    <MessageSquareCode className="w-10 h-10 text-white/50" />
                                )}
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-white font-bold text-lg">Quantum AI</h3>
                            <p className="text-gray-400 text-xs uppercase tracking-widest">Interviewer Active</p>
                        </div>
                    </div>
                </Card>

                {/* Chat Transcript */}
                <Card className="flex-1 flex flex-col overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-cyan-500 text-white'
                                    }`}>
                                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <MessageSquareCode className="w-4 h-4" />}
                                </div>
                                <div className={`p-4 rounded-2xl max-w-[85%] ${msg.sender === 'user'
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tr-none'
                                    : 'bg-cyan-50 dark:bg-cyan-900/20 text-gray-900 dark:text-blue-100 border border-cyan-100 dark:border-cyan-800 rounded-tl-none'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Live Transcript Preview */}
                    {transcript && (
                        <div className="p-4 bg-gray-50 dark:bg-black/40 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Live Transcript</p>
                            <p className="text-gray-600 dark:text-gray-300 italic">{transcript}...</p>
                            <div className="mt-3 flex justify-end">
                                <button
                                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors"
                                    onClick={handleSendResponse}
                                >Send Response</button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            {/* Right: User Video */}
            <div className="w-1/2 flex flex-col gap-6">
                <Card className="flex-1 relative overflow-hidden bg-gray-900 shadow-2xl border-gray-800 group">
                    <video
                        ref={userVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover transform scale-x-[-1]"
                    />

                    {/* Controls Overlay */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 p-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <button
                            onClick={toggleAudio}
                            className={`p-4 rounded-full transition-colors ${isAudioEnabled ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 text-white'}`}
                        >
                            {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={toggleVideo}
                            className={`p-4 rounded-full transition-colors ${isVideoEnabled ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 text-white'}`}
                        >
                            {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={endSession}
                            className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                            <PhoneOff className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Status Indicators */}
                    <div className="absolute top-6 right-6 flex items-center gap-3">
                        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                            <span className="text-xs font-bold text-white tracking-wide">
                                {isListening ? 'LISTENING' : 'ANALYZING'}
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Feedback / Notes Area */}
                <Card className="h-1/3 bg-white dark:bg-gray-900 border-dashed border-2 border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500 flex items-center justify-center mb-4">
                        <Volume2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Speak Clearly</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs text-sm">
                        Quantum is listening. Speak naturally to answer the question.
                        Your response will be transcribed automatically.
                    </p>
                </Card>
            </div>
        </div>
    )
}
