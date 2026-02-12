import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Ruler, Code, BookOpen, GraduationCap, Clock, Folder, PenTool, Library } from 'lucide-react'
import Card from '../components/ui/Card'
import ScientificCalculator from '../components/tools/Calculator'
import UnitConverter from '../components/tools/UnitConverter'
import CodeEditor from '../components/tools/CodeEditor'
import FormulaReference from '../components/tools/FormulaReference'
import GpaCalculator from '../components/tools/GpaCalculator'
import PomodoroTimer from '../components/tools/PomodoroTimer'
import FileManager from '../components/tools/FileManager'
import CollaborationBoard from '../components/tools/CollaborationBoard'
import ResourceLibrary from '../components/tools/ResourceLibrary'

const tools = [
    { id: 'calculator', name: 'Scientific Calculator', icon: Calculator, color: 'blue' },
    { id: 'converter', name: 'Unit Converter', icon: Ruler, color: 'green' },
    { id: 'editor', name: 'Code Editor', icon: Code, color: 'purple' },
    { id: 'formulas', name: 'Formula Reference', icon: BookOpen, color: 'orange' },
    { id: 'gpa', name: 'GPA Calculator', icon: GraduationCap, color: 'pink' },
    { id: 'pomodoro', name: 'Study Timer', icon: Clock, color: 'indigo' },
    { id: 'files', name: 'File Manager', icon: Folder, color: 'yellow' },
    { id: 'whiteboard', name: 'Whiteboard', icon: PenTool, color: 'cyan' },
    { id: 'library', name: 'Resource Library', icon: Library, color: 'rose' },
]

const colorClasses: Record<string, string> = {
    blue: 'bg-gradient-to-br from-blue-500/10 to-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/50',
    green: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/50',
    purple: 'bg-gradient-to-br from-purple-500/10 to-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-700/50',
    orange: 'bg-gradient-to-br from-orange-500/10 to-orange-600/20 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-700/50',
    pink: 'bg-gradient-to-br from-pink-500/10 to-pink-600/20 text-pink-600 dark:text-pink-400 border border-pink-200/50 dark:border-pink-700/50',
    indigo: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-700/50',
    yellow: 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200/50 dark:border-yellow-700/50',
    cyan: 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-700/50',
    rose: 'bg-gradient-to-br from-rose-500/10 to-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-700/50',
}

export default function Tools() {
    const [activeTool, setActiveTool] = useState<string | null>(null)

    const renderTool = () => {
        switch (activeTool) {
            case 'calculator':
                return <ScientificCalculator />
            case 'converter':
                return <UnitConverter />
            case 'editor':
                return <CodeEditor />
            case 'formulas':
                return <FormulaReference />
            case 'gpa':
                return <GpaCalculator />
            case 'pomodoro':
                return <PomodoroTimer />
            case 'files':
                return <FileManager />
            case 'whiteboard':
                return <CollaborationBoard />
            case 'library':
                return <ResourceLibrary />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Engineering Tools</h2>
                <p className="text-gray-600 dark:text-gray-400">Essential tools for engineering students</p>
            </div>

            {!activeTool ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                hover
                                className="p-6 cursor-pointer group"
                                onClick={() => setActiveTool(tool.id)}
                            >
                                <div className={`w-14 h-14 rounded-xl ${colorClasses[tool.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <tool.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {tool.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Click to open
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div>
                    <motion.button
                        onClick={() => setActiveTool(null)}
                        className="mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        ← Back to Tools
                    </motion.button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {renderTool()}
                    </motion.div>
                </div>
            )}
        </div>
    )
}
