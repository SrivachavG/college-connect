import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Bookmark, Settings, Moon, Sun, Minimize2 } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'
import { Book } from '../../services/mockBackend'

interface ReaderModalProps {
    book: Book
    onClose: () => void
    onUpdateProgress: (progress: number) => void
}

export default function ReaderModal({ book, onClose, onUpdateProgress }: ReaderModalProps) {
    const [page, setPage] = useState(Math.floor((book.progress / 100) * 50) || 1) // Simulate pages
    const [totalPages] = useState(50) // Mock total pages
    const [darkMode, setDarkMode] = useState(true)
    const [fontSize, setFontSize] = useState(16)

    const handleNext = () => {
        if (page < totalPages) {
            const newPage = page + 1
            setPage(newPage)
            onUpdateProgress((newPage / totalPages) * 100)
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
        >
            {/* Toolbar */}
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#111]">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                        <Minimize2 className="w-5 h-5" />
                    </button>
                    <h3 className="text-sm font-medium text-white/90 max-w-[200px] truncate">
                        {book.title}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-black/50 rounded-lg border border-white/10 p-1 mr-4">
                        <button
                            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                            className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                        >
                            <span className="text-xs">A-</span>
                        </button>
                        <span className="text-xs text-gray-500 w-8 text-center">{fontSize}px</span>
                        <button
                            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                            className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                        >
                            <span className="text-sm">A+</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                        <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-auto flex justify-center p-8 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'}`}>
                <motion.div
                    layout
                    className={`w-full max-w-3xl min-h-[1200px] shadow-2xl p-12 C ${darkMode ? 'bg-[#222] text-gray-300' : 'bg-white text-gray-800'}`}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    <div className="text-center mb-12 pb-8 border-b border-gray-700/50">
                        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                        <p className="opacity-60">Chapter {Math.ceil(page / 5)}: Introduction to Advanced Concepts</p>
                    </div>

                    <div className="space-y-6 leading-relaxed">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className={`h-64 rounded-xl my-8 flex items-center justify-center ${darkMode ? 'bg-black/30' : 'bg-gray-100'}`}>
                            <p className="opacity-40 italic">Figure {page}.1 - Schematic Diagram</p>
                        </div>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <p className="font-mono text-sm p-4 rounded-lg bg-black/20 border border-white/5">
                            function example() {'{'}
                            {'\n'}  return "Code block simulation";
                            {'\n'}{'}'}
                        </p>
                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                            qui ratione voluptatem sequi nesciunt.
                        </p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-700/50 flex justify-between text-sm opacity-50">
                        <span>Page {page} of {totalPages}</span>
                        <span>{book.author}</span>
                    </div>
                </motion.div>
            </div>

            {/* Footer Navigation */}
            <div className="h-16 border-t border-white/10 bg-[#111] flex items-center justify-center gap-8 relative">
                <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="text-white hover:bg-white/10"
                >
                    <ChevronLeft className="w-5 h-5 mr-2" /> Previous
                </Button>

                <div className="w-96 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(page / totalPages) * 100}%` }}
                    />
                </div>

                <Button
                    variant="ghost"
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="text-white hover:bg-white/10"
                >
                    Next <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </motion.div>
    )
}
