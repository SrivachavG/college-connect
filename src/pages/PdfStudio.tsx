import { motion } from 'framer-motion'
import {
    Merge, Scissors, Image as ImageIcon,
    FileType, Zap, ArrowRight,
    FileCheck, ShieldCheck
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PdfTool {
    id: string
    title: string
    description: string
    icon: any
    color: string
    status: 'ready' | 'beta' | 'coming-soon'
    path: string
}

const tools: PdfTool[] = [
    {
        id: 'jpg-to-pdf',
        title: 'JPG to PDF',
        description: 'Convert images to PDF in seconds. Perfect for notes.',
        icon: ImageIcon,
        color: 'text-amber-500',
        status: 'ready',
        path: '/tools/pdf/image-to-pdf'
    },
    {
        id: 'merge-pdf',
        title: 'Merge PDF',
        description: 'Combine multiple PDFs into one unified document.',
        icon: Merge,
        color: 'text-rose-500',
        status: 'beta',
        path: '/tools/pdf/merge'
    },
    {
        id: 'split-pdf',
        title: 'Split PDF',
        description: 'Extract pages from your PDF files.',
        icon: Scissors,
        color: 'text-cyan-500',
        status: 'ready',
        path: '/tools/pdf/split'
    },
    {
        id: 'compress-pdf',
        title: 'Compress PDF',
        description: 'Reduce file size while optimizing for quality.',
        icon: FileCheck,
        color: 'text-emerald-500',
        status: 'coming-soon',
        path: '/tools/pdf/compress'
    },
    {
        id: 'pdf-to-word',
        title: 'PDF to Word',
        description: 'Convert your PDF to editable Word documents.',
        icon: FileType,
        color: 'text-blue-500',
        status: 'coming-soon',
        path: '/tools/pdf/to-word'
    },
    {
        id: 'sign-pdf',
        title: 'Sign PDF',
        description: 'Sign yourself or request electronic signatures.',
        icon: ShieldCheck,
        color: 'text-purple-500',
        status: 'coming-soon',
        path: '/tools/pdf/sign'
    }
]

export default function PdfStudio() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen p-8 lg:p-12 space-y-16 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-500/5 to-transparent -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            {/* Header */}
            <div className="text-center space-y-6 max-w-3xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-bold backdrop-blur-md shadow-sm"
                >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>DocuMate Engine v1.0</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight"
                >
                    PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Studio</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed"
                >
                    Professional-grade PDF tools running directly in your browser.
                    <br />
                    <span className="text-gray-900 dark:text-white font-medium">No uploads. No limits. 100% Private.</span>
                </motion.p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative z-10">
                {tools.map((tool, index) => (
                    <motion.button
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        onClick={() => navigate(tool.path)}
                        className="group relative p-8 h-full rounded-[2rem] bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 flex flex-col text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 overflow-hidden"
                    >
                        {/* Hover Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/0 dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex-1">
                            <div className="flex justify-between items-start mb-8">
                                <div className={`p-4 rounded-2xl ${tool.color.replace('text-', 'bg-')}/10 ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <tool.icon className="w-8 h-8" />
                                </div>
                                {tool.status !== 'ready' && (
                                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${tool.status === 'beta'
                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>
                                        {tool.status === 'coming-soon' ? 'Soon' : 'Beta'}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                {tool.description}
                            </p>
                        </div>

                        <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            Launch Tool <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Security Banner */}
            <div className="max-w-5xl mx-auto relative mt-8">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl skew-y-1" />
                <div className="relative bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-12 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-500/20 rounded-full blur-[80px]" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 text-red-400 font-bold tracking-wider uppercase text-sm mb-4">
                            <ShieldCheck className="w-5 h-5" />
                            Client-Side Processing
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Your files never leave your device.
                        </h2>
                        <p className="text-gray-400 max-w-lg text-lg">
                            We use advanced WebAssembly technology to process documents directly in your browser.
                            Maximum speed, maximum privacy.
                        </p>
                    </div>

                    <div className="relative z-10 flex gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md shadow-lg border border-white/10">
                                <Zap className="w-8 h-8 text-yellow-400 fill-current" />
                            </div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Fast</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md shadow-lg border border-white/10">
                                <FileCheck className="w-8 h-8 text-green-400" />
                            </div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
