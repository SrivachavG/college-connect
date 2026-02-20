import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Award, Server, Brain, Layout } from 'lucide-react'
import Card from '../ui/Card'


interface Skill {
    id: string
    name: string
    description: string
    links: { title: string; url: string }[]
    completed: boolean
}

interface CareerPath {
    id: string
    title: string
    description: string
    icon: any
    color: string
    steps: {
        title: string
        skills: Skill[]
    }[]
}

const careerPaths: CareerPath[] = [
    {
        id: 'frontend',
        title: 'Frontend Developer',
        description: 'Build beautiful, interactive user interfaces for the web.',
        icon: Layout,
        color: 'text-blue-500',
        steps: [
            {
                title: 'Foundations',
                skills: [
                    { id: 'html', name: 'HTML5', description: 'Semantic structure of web pages', links: [{ title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }], completed: false },
                    { id: 'css', name: 'CSS3', description: 'Styling and layout (Flexbox, Grid)', links: [{ title: 'CSS Tricks', url: 'https://css-tricks.com/' }], completed: false },
                    { id: 'js', name: 'JavaScript (ES6+)', description: 'Dynamic logic and DOM manipulation', links: [{ title: 'JavaScript.info', url: 'https://javascript.info/' }], completed: false },
                ]
            },
            {
                title: 'Modern Frameworks',
                skills: [
                    { id: 'react', name: 'React', description: 'Component-based architecture', links: [], completed: false },
                    { id: 'tailwind', name: 'Tailwind CSS', description: 'Utility-first styling', links: [], completed: false },
                ]
            },
            {
                title: 'Advanced',
                skills: [
                    { id: 'ts', name: 'TypeScript', description: 'Type safety for JavaScript', links: [], completed: false },
                    { id: 'next', name: 'Next.js', description: 'Server-side rendering and static generation', links: [], completed: false },
                ]
            }
        ]
    },
    {
        id: 'backend',
        title: 'Backend Developer',
        description: 'Design robust APIs, databases, and server-side logic.',
        icon: Server,
        color: 'text-green-500',
        steps: [
            {
                title: 'Server Basics',
                skills: [
                    { id: 'node', name: 'Node.js', description: 'JavaScript runtime for server-side', links: [], completed: false },
                    { id: 'express', name: 'Express.js', description: 'Minimalist web framework', links: [], completed: false },
                ]
            },
            {
                title: 'Databases',
                skills: [
                    { id: 'sql', name: 'PostgreSQL', description: 'Relational database management', links: [], completed: false },
                    { id: 'mongo', name: 'MongoDB', description: 'NoSQL document database', links: [], completed: false },
                ]
            }
        ]
    },
    {
        id: 'ai',
        title: 'AI Engineer',
        description: 'Build intelligent systems using Machine Learning and LLMs.',
        icon: Brain,
        color: 'text-purple-500',
        steps: [
            {
                title: 'Mathematics',
                skills: [
                    { id: 'linear-alg', name: 'Linear Algebra', description: 'Vectors, Matrices, Transformations', links: [], completed: false },
                    { id: 'calc', name: 'Calculus', description: 'Derivatives, Gradients for backprop', links: [], completed: false },
                    { id: 'prob', name: 'Probability & Stats', description: 'Distributions, Hypothesis testing', links: [], completed: false },
                ]
            },
            {
                title: 'Machine Learning',
                skills: [
                    { id: 'python', name: 'Python', description: 'Primary language for AI/ML', links: [], completed: false },
                    { id: 'scikit', name: 'Scikit-Learn', description: 'Classic ML algorithms', links: [], completed: false },
                    { id: 'pytorch', name: 'PyTorch', description: 'Deep Learning framework', links: [], completed: false },
                ]
            },
            {
                title: 'Agentic AI',
                skills: [
                    { id: 'llms', name: 'LLM Function Calling', description: 'Integrating models with tools', links: [], completed: false },
                    { id: 'rag', name: 'RAG', description: 'Retrieval Augmented Generation', links: [], completed: false },
                    { id: 'agents', name: 'Multi-Agent Systems', description: 'Orchestrating autonomous agents', links: [], completed: false },
                ]
            }
        ]
    }
]

export default function CareerRoadmap() {
    const [selectedPath, setSelectedPath] = useState<CareerPath>(careerPaths[0])
    // Initialize completed skills state
    const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>({})

    const toggleSkill = (skillId: string) => {
        setCompletedSkills(prev => ({
            ...prev,
            [skillId]: !prev[skillId]
        }))
    }

    const calculateProgress = (path: CareerPath) => {
        const totalSkills = path.steps.reduce((acc, step) => acc + step.skills.length, 0)
        const completedCount = path.steps.reduce((acc, step) =>
            acc + step.skills.filter(s => completedSkills[s.id]).length, 0
        )
        return Math.round((completedCount / totalSkills) * 100)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
            {/* Sidebar: Path Selector */}
            <div className="lg:col-span-1 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-1">Career Paths</h3>
                {careerPaths.map(path => (
                    <motion.button
                        key={path.id}
                        onClick={() => setSelectedPath(path)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedPath.id === path.id
                            ? 'bg-white dark:bg-gray-800 shadow-md border-l-4 border-blue-500'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                            }`}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={`p-2 rounded-lg ${selectedPath.id === path.id ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            <path.icon className={`w-5 h-5 ${path.color}`} />
                        </div>
                        <div className="text-left">
                            <p className={`font-medium ${selectedPath.id === path.id ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                {path.title}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Main Content: Map */}
            <div className="lg:col-span-3 flex flex-col h-full">
                <Card className="flex-1 p-0 overflow-hidden flex flex-col relative">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                {selectedPath.title}
                                <span className="text-sm font-normal px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                    {calculateProgress(selectedPath)}% Complete
                                </span>
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                {selectedPath.description}
                            </p>
                        </div>
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${calculateProgress(selectedPath)}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 overflow-y-auto p-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[3.25rem] top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />

                        <div className="space-y-10">
                            {selectedPath.steps.map((step, stepIndex) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: stepIndex * 0.1 }}
                                    className="relative pl-20"
                                >
                                    {/* Step Indicator */}
                                    <div className="absolute left-10 -translate-x-1/2 flex flex-col items-center">
                                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold border-4 border-white dark:border-[#1C1C1E] z-10 shadow-sm">
                                            {stepIndex + 1}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                        {step.title}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {step.skills.map(skill => {
                                            const isCompleted = completedSkills[skill.id]
                                            return (
                                                <motion.div
                                                    key={skill.id}
                                                    whileHover={{ y: -2 }}
                                                    onClick={() => toggleSkill(skill.id)}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${isCompleted
                                                        ? 'bg-green-50 dark:bg-green-900/10 border-green-500/50'
                                                        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className={`font-semibold ${isCompleted ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                                            {skill.name}
                                                        </h4>
                                                        {isCompleted
                                                            ? <CheckCircle className="w-5 h-5 text-green-500" />
                                                            : <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                                                        }
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                        {skill.description}
                                                    </p>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            ))}

                            {/* End Node */}
                            <div className="relative pl-20 pt-4">
                                <div className="absolute left-10 -translate-x-1/2 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-600 flex items-center justify-center border-4 border-white dark:border-[#1C1C1E] z-10">
                                        <Award className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-100 dark:border-blue-900/30 text-gray-600 dark:text-gray-300 italic">
                                    Complete all skills to master this path!
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
