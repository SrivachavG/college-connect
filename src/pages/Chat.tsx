import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Smile, Hash, Users, Settings as SettingsIcon } from 'lucide-react'
import Card from '../components/ui/Card'
import { formatDistance } from 'date-fns'

interface Message {
    id: string
    user: string
    avatar: string
    content: string
    timestamp: Date
    isMe: boolean
}

const channels = [
    { id: '1', name: 'general', members: 142 },
    { id: '2', name: 'study-group', members: 28 },
    { id: '3', name: 'project-discussion', members: 15 },
    { id: '4', name: 'doubt-clearing', members: 89 },
]

const initialMessages: Message[] = [
    {
        id: '1',
        user: 'Sarah Chen',
        avatar: 'SC',
        content: 'Hey everyone! Has anyone started working on the DSA assignment?',
        timestamp: new Date(Date.now() - 3600000),
        isMe: false
    },
    {
        id: '2',
        user: 'You',
        avatar: 'ME',
        content: 'Yes! I finished the first two problems. The dynamic programming one is tricky though.',
        timestamp: new Date(Date.now() - 3000000),
        isMe: true
    },
    {
        id: '3',
        user: 'Mike Ross',
        avatar: 'MR',
        content: 'Same here. Anyone wants to discuss the approach?',
        timestamp: new Date(Date.now() - 2400000),
        isMe: false
    },
]

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [newMessage, setNewMessage] = useState('')
    const [selectedChannel, setSelectedChannel] = useState(channels[0])
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = () => {
        if (!newMessage.trim()) return

        const message: Message = {
            id: Date.now().toString(),
            user: 'You',
            avatar: 'ME',
            content: newMessage,
            timestamp: new Date(),
            isMe: true
        }

        setMessages([...messages, message])
        setNewMessage('')

        // Simulate typing indicator
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            // Simulate response
            const response: Message = {
                id: (Date.now() + 1).toString(),
                user: 'Sarah Chen',
                avatar: 'SC',
                content: 'That\'s helpful! Thanks for sharing!',
                timestamp: new Date(),
                isMe: false
            }
            setMessages(prev => [...prev, response])
        }, 2000)
    }

    return (
        <div className="h-[calc(100vh-7rem)] flex gap-6">
            {/* Channels Sidebar */}
            <Card className="w-64 p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Channels</h2>
                    <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                <div className="space-y-1 flex-1 overflow-y-auto">
                    {channels.map((channel) => (
                        <motion.button
                            key={channel.id}
                            onClick={() => setSelectedChannel(channel)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-200 ${selectedChannel.id === channel.id
                                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 font-medium'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                                }`}
                            whileHover={{ x: 2 }}
                        >
                            <Hash className="w-4 h-4" />
                            <span className="flex-1 text-sm font-medium">{channel.name}</span>
                            <span className="text-xs opacity-70">{channel.members}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{selectedChannel.members} members online</span>
                    </div>
                </div>
            </Card>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <Card className="p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Hash className="w-5 h-5" />
                                {selectedChannel.name}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Study and collaborate with peers</p>
                        </div>
                    </div>
                </Card>

                {/* Messages */}
                <Card className="flex-1 p-4 overflow-y-auto mb-4">
                    <div className="space-y-4">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${message.isMe
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                        }`}>
                                        {message.avatar}
                                    </div>
                                    <div className={`flex-1 max-w-[70%] ${message.isMe ? 'flex flex-col items-end' : ''}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {message.user}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatDistance(message.timestamp, new Date(), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <div className={`px-4 py-2 rounded-2xl shadow-sm ${message.isMe
                                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm'
                                            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white rounded-tl-sm'
                                            }`}>
                                            <p className="text-sm">{message.content}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    SC
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl rounded-tl-sm">
                                    <div className="flex gap-1">
                                        <motion.div
                                            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6 }}
                                        />
                                        <motion.div
                                            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                        />
                                        <motion.div
                                            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </Card>

                {/* Message Input */}
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={`Message #${selectedChannel.name}`}
                            className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                        />
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Smile className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <motion.button
                            onClick={handleSend}
                            className="p-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Send className="w-5 h-5" />
                        </motion.button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
