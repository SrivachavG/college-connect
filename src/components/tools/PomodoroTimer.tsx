import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'

export default function PomodoroTimer() {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const [completedSessions, setCompletedSessions] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer completed
                        setIsActive(false)
                        if (!isBreak) {
                            setCompletedSessions(prev => prev + 1)
                            setIsBreak(true)
                            setMinutes(5)
                        } else {
                            setIsBreak(false)
                            setMinutes(25)
                        }
                        setSeconds(0)
                        // Play notification sound (browser notification)
                        new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDKNzuivkzIHGGKy5emecQg=').play().catch(() => { })
                    } else {
                        setMinutes(minutes - 1)
                        setSeconds(59)
                    }
                } else {
                    setSeconds(seconds - 1)
                }
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, minutes, seconds, isBreak])

    const toggleTimer = () => {
        setIsActive(!isActive)
    }

    const resetTimer = () => {
        setIsActive(false)
        setIsBreak(false)
        setMinutes(25)
        setSeconds(0)
    }

    const progress = isBreak
        ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
        : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100

    return (
        <Card className="p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Pomodoro Study Timer</h3>

            {/* Timer Display */}
            <div className="relative mb-8">
                <svg className="w-full" viewBox="0 0 200 200">
                    {/* Background Circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-gray-700"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={isBreak ? 'text-green-500' : 'text-gray-900 dark:text-white'}
                        strokeDasharray={565.48}
                        strokeDashoffset={565.48 - (565.48 * progress) / 100}
                        transform="rotate(-90 100 100)"
                        initial={{ strokeDashoffset: 565.48 }}
                        animate={{ strokeDashoffset: 565.48 - (565.48 * progress) / 100 }}
                        transition={{ duration: 0.5 }}
                    />
                </svg>

                {/* Time */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        key={`${minutes}:${seconds}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-bold text-gray-900 dark:text-white"
                    >
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </motion.div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
                        {isBreak ? 'Break Time' : 'Focus Time'}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-6">
                <motion.button
                    onClick={toggleTimer}
                    className="p-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </motion.button>
                <motion.button
                    onClick={resetTimer}
                    className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <RotateCcw className="w-6 h-6" />
                </motion.button>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Coffee className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Sessions</span>
                </div>
                <motion.p
                    key={completedSessions}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                >
                    {completedSessions}
                </motion.p>
            </div>
        </Card>
    )
}
