import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Database, Globe, Cpu, RefreshCw, Zap, Rocket, Terminal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { useStudyStore } from '../../store/useStudyStore'

interface ProjectIdea {
    id: string
    title: string
    description: string
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    domain: string
    techStack: string[]
    features: string[]
    color: string
}

const domains = [
    { id: 'web', name: 'Web Dev', icon: Globe, color: 'text-cyan-400' },
    { id: 'ai', name: 'AI/ML', icon: Cpu, color: 'text-emerald-400' },
    { id: 'backend', name: 'Backend', icon: Database, color: 'text-pink-400' },
    { id: 'tools', name: 'Tools', icon: Code2, color: 'text-orange-400' },
]

const projectDatabase: Record<string, ProjectIdea[]> = {
    web: [
        {
            id: 'web1',
            title: 'Holographic Portfolio',
            description: 'A personal portfolio website featuring interactive 3D objects using Three.js or Spline.',
            difficulty: 'Intermediate',
            domain: 'Web Dev',
            techStack: ['React', 'Three.js', 'Tailwind', 'Framer Motion'],
            features: ['3D Hero Section', 'Interactive Gallery', 'Contact Form', 'Dark Mode'],
            color: 'from-blue-600 via-cyan-500 to-teal-400'
        },
        {
            id: 'web2',
            title: 'Real-time Collab Board',
            description: 'A shared whiteboard for teams to draw and brainstorm in real-time.',
            difficulty: 'Advanced',
            domain: 'Web Dev',
            techStack: ['Next.js', 'Socket.io', 'Canvas API', 'Redis'],
            features: ['Real-time Sync', 'User Cursors', 'Chat Sidebar', 'Export to Image'],
            color: 'from-indigo-600 via-purple-500 to-pink-500'
        }
    ],
    ai: [
        {
            id: 'ai1',
            title: 'Smart Resume ATS',
            description: 'An AI-powered tool that scores resumes against job descriptions.',
            difficulty: 'Advanced',
            domain: 'AI/ML',
            techStack: ['Python', 'FastAPI', 'OpenAI API', 'React'],
            features: ['Text Extraction', 'Keyword Matching', 'AI Feedback', 'Score Visuals'],
            color: 'from-emerald-600 via-green-500 to-lime-400'
        },
        {
            id: 'ai2',
            title: 'Sentiment Analyzer',
            description: 'Analyze social media posts for brand sentiment in real-time.',
            difficulty: 'Intermediate',
            domain: 'AI/ML',
            techStack: ['Python', 'NLTK', 'Streamlit', 'Twitter API'],
            features: ['Live Feed', 'Sentiment Class', 'Trend Charts', 'Word Cloud'],
            color: 'from-orange-600 via-red-500 to-rose-400'
        }
    ],
    backend: [
        {
            id: 'be1',
            title: 'ScaleURL Shortener',
            description: 'A scalable service to shorten long URLs with analytics.',
            difficulty: 'Beginner',
            domain: 'Backend',
            techStack: ['Node.js', 'Express', 'MongoDB', 'Redis'],
            features: ['Link Gen', 'Click Maps', 'Custom Alias', 'Rate Limiting'],
            color: 'from-fuchsia-600 via-pink-500 to-rose-500'
        }
    ],
    tools: [
        {
            id: 'tool1',
            title: 'CLI File Organizer',
            description: 'A command-line tool to organize messy folders by file type.',
            difficulty: 'Beginner',
            domain: 'Tools',
            techStack: ['Python', 'Typer', 'OS Module'],
            features: ['Recursive Sort', 'Custom Rules', 'Undo Op', 'Activity Log'],
            color: 'from-slate-700 via-gray-600 to-zinc-500'
        }
    ]
}

export default function ProjectNexus() {
    const [selectedDomain, setSelectedDomain] = useState('web')
    const [currentProject, setCurrentProject] = useState<ProjectIdea | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    // Integration Hook
    const { startMission } = useStudyStore()
    const navigate = useNavigate()

    const generateProject = () => {
        setIsGenerating(true)
        setCurrentProject(null)
        setTimeout(() => {
            const ideas = projectDatabase[selectedDomain]
            const randomIdea = ideas[Math.floor(Math.random() * ideas.length)]
            setCurrentProject(randomIdea)
            setIsGenerating(false)
        }, 1200)
    }

    const handleInitializeMission = () => {
        if (currentProject) {
            startMission(
                {
                    id: currentProject.id,
                    title: currentProject.title,
                    description: currentProject.description,
                    color: currentProject.color
                },
                currentProject.features // Auto-populate goals
            )
            navigate('/study-room')
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] w-full">

            {/* Left Panel: Controls */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <Card className="p-1 border-0 bg-transparent shadow-none relative overflow-visible group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl transition-opacity opacity-50 group-hover:opacity-100" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <Rocket className="w-8 h-8 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white font-display">Project Nexus</h2>
                                <p className="text-blue-200/60 text-sm">Engineering Idea Generator</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-blue-300 uppercase tracking-widest ml-1">
                                Select Domain
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                                {domains.map(domain => (
                                    <button
                                        key={domain.id}
                                        onClick={() => setSelectedDomain(domain.id)}
                                        className={`relative p-4 rounded-xl text-left transition-all overflow-hidden group ${selectedDomain === domain.id
                                            ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                            } border`}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-3">
                                                <domain.icon className={`w-5 h-5 ${domain.color}`} />
                                                <span className={`font-medium ${selectedDomain === domain.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                    {domain.name}
                                                </span>
                                            </div>
                                            {selectedDomain === domain.id && <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />}
                                        </div>
                                        {selectedDomain === domain.id && (
                                            <motion.div
                                                layoutId="activeGlow"
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button
                                onClick={generateProject}
                                disabled={isGenerating}
                                className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-0 shadow-lg shadow-blue-500/25 relative overflow-hidden group"
                            >
                                <span className={`flex items-center gap-2 relative z-10 ${isGenerating ? 'animate-pulse' : ''}`}>
                                    {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Terminal className="w-5 h-5" />}
                                    {isGenerating ? 'Compiling Idea...' : 'Initialize Generator'}
                                </span>
                                {/* Glitch Effect Layer */}
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Right Panel: Holographic Display */}
            <div className="lg:col-span-8 relative perspective-1000">
                <AnimatePresence mode="wait">
                    {currentProject ? (
                        <motion.div
                            key={currentProject.id}
                            initial={{ opacity: 0, rotateX: 10, scale: 0.9 }}
                            animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                            exit={{ opacity: 0, rotateX: -10, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="h-full"
                        >
                            <div className="relative h-full bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                {/* Ambient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-20`} />
                                <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/30 blur-[100px] rounded-full mix-blend-screen" />
                                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/30 blur-[100px] rounded-full mix-blend-screen" />

                                <div className="relative p-10 h-full flex flex-col z-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-mono text-blue-300 mb-2 uppercase tracking-widest">
                                                Class: {currentProject.difficulty} // Protocol: {currentProject.domain}
                                            </span>
                                            <h3 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                                                {currentProject.title}
                                            </h3>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                            <Code2 className="w-8 h-8 text-blue-400" />
                                        </div>
                                    </div>

                                    <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mb-12">
                                        {currentProject.description}
                                    </p>

                                    {/* Grid Layout for details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-auto">
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
                                                System Requirements
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {currentProject.techStack.map(tech => (
                                                    <span key={tech} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-200 rounded text-xs font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
                                                Mission Objectives
                                            </h4>
                                            <ul className="space-y-2">
                                                {currentProject.features.map(feature => (
                                                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Footer Action */}
                                    <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                                        <Button
                                            onClick={handleInitializeMission}
                                            className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-bold tracking-wide rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
                                        >
                                            INITIALIZE MISSION
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full min-h-[500px] flex items-center justify-center relative rounded-3xl border border-white/5 bg-black/20 overflow-hidden">
                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 animate-pulse">
                                    <Database className="w-10 h-10 text-white/20" />
                                </div>
                                <h3 className="text-2xl font-bold text-white/50 mb-2 font-display">System Idle</h3>
                                <p className="text-white/30 text-sm">Waiting for input stream...</p>
                            </div>

                            {/* Matrix Rain Effect Placeholder (Simple) */}
                            {isGenerating && (
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                                    <div className="text-center">
                                        <div className="text-green-500 font-mono text-xs mb-2">ACCESSING MAINFRAME...</div>
                                        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-green-500"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
