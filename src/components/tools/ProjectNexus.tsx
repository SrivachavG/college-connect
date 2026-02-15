import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Code2, Database, Globe, Cpu, RefreshCw, Save, Check } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'

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
    { id: 'web', name: 'Web Dev', icon: Globe },
    { id: 'ai', name: 'AI/ML', icon: Cpu },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'tools', name: 'Tools', icon: Code2 },
]

const projectDatabase: Record<string, ProjectIdea[]> = {
    web: [
        {
            id: 'web1',
            title: 'Portfolio with 3D Elements',
            description: 'A personal portfolio website featuring interactive 3D objects using Three.js or Spline.',
            difficulty: 'Intermediate',
            domain: 'Web Dev',
            techStack: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
            features: ['3D Hero Section', 'Interactive Project Gallery', 'Contact Form with EmailJS', 'Dark/Light Mode'],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'web2',
            title: 'Real-time Collab Board',
            description: 'A shared whiteboard for teams to draw and brainstorm in real-time.',
            difficulty: 'Advanced',
            domain: 'Web Dev',
            techStack: ['Next.js', 'Socket.io', 'Canvas API', 'Redis'],
            features: ['Real-time drawing sync', 'User cursors', 'Chat sidebar', 'Export to Image'],
            color: 'from-indigo-500 to-purple-500'
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
            features: ['PDF Text Extraction', 'Keyword Matching', 'AI Feedback Generation', 'Score Visualization'],
            color: 'from-emerald-500 to-teal-500'
        },
        {
            id: 'ai2',
            title: 'Sentiment Analysis Dashboard',
            description: 'Analyze social media posts for brand sentiment in real-time.',
            difficulty: 'Intermediate',
            domain: 'AI/ML',
            techStack: ['Python', 'NLTK', 'Streamlit', 'Twitter API'],
            features: ['Live Data Feed', 'Sentiment Classification', 'Trend Charts', 'Keyword Cloud'],
            color: 'from-orange-500 to-red-500'
        }
    ],
    backend: [
        {
            id: 'be1',
            title: 'Custom URL Shortener',
            description: 'A scalable service to shorten long URLs with analytics.',
            difficulty: 'Beginner',
            domain: 'Backend',
            techStack: ['Node.js', 'Express', 'MongoDB', 'Redis'],
            features: ['Short Link Generation', 'Click Analytics', 'Custom Alias', 'Rate Limiting'],
            color: 'from-pink-500 to-rose-500'
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
            features: ['Recursive Sorting', 'Custom Rules', 'Undo Operation', 'Logging'],
            color: 'from-gray-600 to-gray-800'
        }
    ]
}

export default function ProjectNexus() {
    const [selectedDomain, setSelectedDomain] = useState('web')
    const [currentProject, setCurrentProject] = useState<ProjectIdea | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [savedProjects, setSavedProjects] = useState<string[]>([])

    const generateProject = () => {
        setIsGenerating(true)
        setCurrentProject(null)

        // Simulate "AI" generation delay
        setTimeout(() => {
            const ideas = projectDatabase[selectedDomain]
            const randomIdea = ideas[Math.floor(Math.random() * ideas.length)]
            setCurrentProject(randomIdea)
            setIsGenerating(false)
        }, 1500)
    }

    const toggleSave = (id: string) => {
        setSavedProjects(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="p-6 h-full flex flex-col justify-between overflow-visible relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl -z-10" />

                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <Lightbulb className="w-6 h-6 text-yellow-500" />
                            Project Nexus
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                            Generate unique engineering project ideas to build your portfolio.
                        </p>

                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Select Domain
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {domains.map(domain => (
                                    <motion.button
                                        key={domain.id}
                                        onClick={() => setSelectedDomain(domain.id)}
                                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${selectedDomain === domain.id
                                                ? 'bg-primary/10 border-primary text-primary dark:text-primary-light shadow-glow'
                                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <domain.icon className="w-6 h-6" />
                                        <span className="text-sm font-medium">{domain.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        onClick={generateProject}
                        disabled={isGenerating}
                        className="w-full mt-8 py-4 text-lg shadow-lg shadow-primary/25 relative overflow-hidden group"
                    >
                        {isGenerating ? (
                            <div className="flex items-center gap-2">
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                Generating...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5" />
                                Generate Idea
                            </div>
                        )}
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </Button>
                </Card>
            </div>

            {/* Display Area */}
            <div className="lg:col-span-2 relative">
                <AnimatePresence mode="wait">
                    {currentProject ? (
                        <motion.div
                            key={currentProject.id}
                            initial={{ opacity: 0, x: 20, rotateY: 90 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -20, rotateY: -90 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="h-full perspective-1000"
                        >
                            <div className={`h-full rounded-2xl p-1 bg-gradient-to-br ${currentProject.color} shadow-2xl`}>
                                <div className="h-full bg-white dark:bg-gray-900 rounded-xl p-8 flex flex-col relative overflow-hidden">
                                    {/* Background decorative blob */}
                                    <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${currentProject.color} opacity-20 blur-3xl rounded-full`} />

                                    <div className="flex justify-between items-start mb-6 z-10">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${currentProject.color} text-white shadow-sm`}>
                                            {currentProject.difficulty}
                                        </span>
                                        <button
                                            onClick={() => toggleSave(currentProject.id)}
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            {savedProjects.includes(currentProject.id)
                                                ? <Check className="w-6 h-6 text-green-500" />
                                                : <Save className="w-6 h-6 text-gray-400" />
                                            }
                                        </button>
                                    </div>

                                    <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 z-10">
                                        {currentProject.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 z-10 leading-relaxed">
                                        {currentProject.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                                <Cpu className="w-4 h-4" /> Tech Stack
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {currentProject.techStack.map(tech => (
                                                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                                <Check className="w-4 h-4" /> Key Features
                                            </h4>
                                            <ul className="space-y-2">
                                                {currentProject.features.map(feature => (
                                                    <li key={feature} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${currentProject.color}`} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
                                <Lightbulb className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Ready to Build?
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Select a domain and click "Generate Idea" to get your next engineering challenge.
                            </p>
                            {isGenerating && (
                                <motion.div
                                    className="mt-8 flex gap-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {[0, 1, 2].map(i => (
                                        <motion.div
                                            key={i}
                                            className="w-3 h-3 rounded-full bg-primary"
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
