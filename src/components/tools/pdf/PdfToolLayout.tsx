import { motion } from 'framer-motion'
import { MoveLeft, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PdfToolLayoutProps {
    title: string
    description?: string
    icon?: any
    color?: string
    children: React.ReactNode
}

export default function PdfToolLayout({
    title,
    description,
    icon: Icon,
    color = "text-gray-900",
    children
}: PdfToolLayoutProps) {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-black selection:bg-red-500/30">
            <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
                {/* Header Section */}
                <header className="mb-12 lg:mb-16">
                    <button
                        onClick={() => navigate('/tools/pdf-studio')}
                        className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-6"
                    >
                        <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                            <MoveLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        Back to Studio
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
                            >
                                {title}
                            </motion.h1>
                            {description && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed"
                                >
                                    {description}
                                </motion.p>
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider self-start md:self-center"
                        >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            Local Processing
                        </motion.div>
                    </div>
                </header>

                {/* Main Content */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
