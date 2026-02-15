import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play, Pause, RotateCcw,
    Music, Volume2, VolumeX,
    CheckCircle2, Plus, X,
    Brain, CloudRain, Wind, Radio, Moon, Zap, Waves, Rocket, Trash2
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { ambiencePresets } from '../data/ambiencePresets'
import { AudioEngine } from '../utils/audioEngine'
import { useStudyStore } from '../store/useStudyStore'

// Theme definition
interface Theme {
    id: string
    name: string
    bg: string
    text: string
    accent: string
    cardBg: string
}

const themes: Theme[] = [
    {
        id: 'focus',
        name: 'Deep Focus',
        bg: 'from-gray-900 via-slate-900 to-black',
        text: 'text-white',
        accent: 'bg-indigo-500',
        cardBg: 'bg-gray-800/40'
    },
    {
        id: 'cyber',
        name: 'Cyberpunk',
        bg: 'from-slate-900 via-purple-900 to-slate-900',
        text: 'text-cyan-50',
        accent: 'bg-cyan-500',
        cardBg: 'bg-slate-800/40'
    },
    {
        id: 'nature',
        name: 'Zen Garden',
        bg: 'from-emerald-900/40 to-teal-900/40',
        text: 'text-emerald-50',
        accent: 'bg-emerald-500',
        cardBg: 'bg-emerald-900/20'
    }
]

export default function StudyRoom() {
    // Store State
    const {
        activeMission, goals,
        selectedPreset, volume,
        addGoal, toggleGoal, removeGoal, clearMission,
        setAmbience, setVolume
    } = useStudyStore()

    // Local UI State
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const [newGoalInput, setNewGoalInput] = useState('')
    const [currentTheme, setCurrentTheme] = useState(themes[0])

    // Engine Ref
    const audioEngine = useRef<AudioEngine>(new AudioEngine())

    // Effect: Handle Preset Change
    useEffect(() => {
        if (selectedPreset) {
            const preset = ambiencePresets.find(p => p.id === selectedPreset)
            if (preset) {
                audioEngine.current.play(preset)
                audioEngine.current.setVolume(volume)
            }
        } else {
            audioEngine.current.stop()
        }
    }, [selectedPreset])

    // Effect: Handle Volume
    useEffect(() => {
        audioEngine.current.setVolume(volume)
    }, [volume])

    // Cleanup Effect
    useEffect(() => {
        const engine = audioEngine.current
        return () => {
            engine.stop()
        }
    }, [])

    // Effect: Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsActive(false)
                        new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3').play().catch(() => { })
                        if (!isBreak) {
                            setIsBreak(true)
                            setMinutes(5)
                        } else {
                            setIsBreak(false)
                            setMinutes(25)
                        }
                    } else {
                        setMinutes(m => m - 1)
                        setSeconds(59)
                    }
                } else {
                    setSeconds(s => s - 1)
                }
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, minutes, seconds, isBreak])

    // Handlers
    const toggleTimer = () => setIsActive(!isActive)
    const resetTimer = () => {
        setIsActive(false)
        setMinutes(25)
        setSeconds(0)
        setIsBreak(false)
    }

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault()
        if (newGoalInput.trim()) {
            addGoal(newGoalInput)
            setNewGoalInput('')
        }
    }

    // Helper: Category Icon
    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case 'Nature': return <CloudRain className="w-4 h-4" />
            case 'Atmosphere': return <Wind className="w-4 h-4" />
            case 'Music': return <Radio className="w-4 h-4" />
            default: return <Waves className="w-4 h-4" />
        }
    }

    return (
        <div className={`min-h-[calc(100vh-2rem)] rounded-3xl transition-all duration-700 bg-gradient-to-br ${currentTheme.bg} p-8 flex flex-col`}>

            {/* Header / Theme Switcher */}
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${currentTheme.accent} bg-opacity-20 backdrop-blur-md`}>
                        <Brain className={`w-8 h-8 ${currentTheme.text}`} />
                    </div>
                    <div>
                        <h1 className={`text-3xl font-display font-bold ${currentTheme.text}`}>
                            Study Room
                        </h1>
                        <p className={`text-sm opacity-70 ${currentTheme.text}`}>
                            Your personal focus space
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 bg-black/20 p-2 rounded-xl backdrop-blur-sm">
                    {themes.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => setCurrentTheme(theme)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentTheme.id === theme.id
                                ? `bg-white/20 text-white shadow-sm`
                                : 'text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {theme.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">

                {/* Left: Ambience Library */}
                <div className="lg:col-span-4 space-y-6 flex flex-col items-center">
                    <Card className={`p-6 border-0 ${currentTheme.cardBg} backdrop-blur-md w-full h-[600px] flex flex-col shadow-2xl`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-lg font-semibold flex items-center gap-2 ${currentTheme.text}`}>
                                <Music className="w-5 h-5" /> Soundscapes
                            </h3>
                            {selectedPreset && (
                                <button onClick={() => setAmbience(null)} className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded hover:bg-red-500/30">
                                    Silence
                                </button>
                            )}
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center gap-4 mb-6">
                            <VolumeX className={`w-4 h-4 ${currentTheme.text} opacity-50`} />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                            />
                            <Volume2 className={`w-4 h-4 ${currentTheme.text} opacity-50`} />
                        </div>

                        {/* Preset Grid */}
                        <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 space-y-6">
                            {Array.from(new Set(ambiencePresets.map(p => p.category))).map(category => (
                                <div key={category}>
                                    <h4 className={`text-xs font-bold uppercase tracking-wider opacity-50 mb-3 ${currentTheme.text}`}>{category}</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {ambiencePresets.filter(p => p.category === category).map(preset => (
                                            <button
                                                key={preset.id}
                                                onClick={() => setAmbience(preset.id === selectedPreset ? null : preset.id)}
                                                className={`p-3 rounded-lg text-left transition-all ${selectedPreset === preset.id
                                                        ? 'bg-white text-gray-900 shadow-lg scale-[1.02]'
                                                        : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-white'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    {getCategoryIcon(preset.category)}
                                                    <span className="font-semibold text-sm truncate">{preset.name}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] opacity-70 uppercase">{preset.type}</span>
                                                    {selectedPreset === preset.id && (
                                                        <div className="flex gap-1">
                                                            <span className="w-1 h-3 bg-indigo-500 animate-pulse rounded-full" />
                                                            <span className="w-1 h-3 bg-indigo-500 animate-pulse rounded-full delay-75" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Center: Timer */}
                <div className="lg:col-span-4 flex flex-col justify-center items-center">
                    <motion.div
                        className="relative"
                        animate={{ scale: isActive ? [1, 1.02, 1] : 1 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Timer Circle */}
                        <div className={`w-80 h-80 rounded-full border-8 border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/5 relative shadow-2xl`}>
                            <motion.div
                                className="absolute inset-0 rounded-full border-8 border-transparent border-t-white/30"
                                animate={{ rotate: isActive ? 360 : 0 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="text-center z-10">
                                <div className={`text-7xl font-bold font-mono tracking-tighter ${currentTheme.text} mb-4`}>
                                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                                </div>
                                <div className={`text-lg uppercase tracking-widest font-medium opacity-60 ${currentTheme.text}`}>
                                    {isBreak ? 'Unwind' : 'Focus'} Mode
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex gap-6 mt-12">
                        <Button
                            variant="secondary"
                            onClick={toggleTimer}
                            className={`h-16 w-16 rounded-full flex items-center justify-center !p-0 ${isActive ? 'bg-red-500/20 text-red-200 hover:bg-red-500/30' : 'bg-white/20 text-white hover:bg-white/30'} backdrop-blur-md border-0 shadow-xl`}
                        >
                            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={resetTimer}
                            className="h-16 w-16 rounded-full flex items-center justify-center !p-0 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border-0 shadow-xl"
                        >
                            <RotateCcw className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                {/* Right: Goals & Active Mission */}
                <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">
                    <Card className={`p-6 border-0 ${currentTheme.cardBg} backdrop-blur-md flex-1 h-[600px] flex flex-col shadow-2xl relative overflow-hidden`}>
                        {/* Active Mission Banner */}
                        {activeMission && (
                            <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-r ${activeMission.color} flex items-center justify-between`}>
                                <div className="flex items-center gap-2 text-white">
                                    <Rocket className="w-5 h-5" />
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Active Mission</div>
                                        <div className="font-bold text-sm leading-none">{activeMission.title}</div>
                                    </div>
                                </div>
                                <button onClick={clearMission} className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className={`mt-16 flex-1 flex flex-col`}>
                            <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${currentTheme.text}`}>
                                <Brain className="w-5 h-5" /> Session Goals
                            </h3>

                            <form onSubmit={handleAddGoal} className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newGoalInput}
                                    onChange={(e) => setNewGoalInput(e.target.value)}
                                    placeholder="Add a goal..."
                                    className="flex-1 bg-black/20 border-0 rounded-xl px-4 py-2 text-white placeholder-white/30 focus:ring-1 focus:ring-white/50"
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </form>

                            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                <AnimatePresence>
                                    {goals.map(goal => (
                                        <motion.div
                                            key={goal.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className={`p-3 rounded-xl flex items-center gap-3 group transition-colors ${goal.completed ? 'bg-white/5' : 'bg-black/10'
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleGoal(goal.id)}
                                                className={`transition-colors ${goal.completed ? 'text-green-400' : 'text-white/30 hover:text-white/70'
                                                    }`}
                                            >
                                                <CheckCircle2 className="w-5 h-5" />
                                            </button>
                                            <span className={`flex-1 text-sm ${goal.completed ? 'text-white/30 line-through' : 'text-white'
                                                }`}>
                                                {goal.text}
                                            </span>
                                            <button
                                                onClick={() => removeGoal(goal.id)}
                                                className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-200 transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                    {goals.length === 0 && (
                                        <div className="text-center text-white/30 text-sm py-8 italic">
                                            No goals yet. Set a target!
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
