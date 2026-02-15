import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Book, Clock, Library, Upload, MoreVertical,
    FileText, Headphones, Folder,
    ChevronRight, Search, Plus
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { mockBackend, Book as BookType, Resource } from '../services/mockBackend'
import ReaderModal from '../components/smart-study/ReaderModal'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function SmartStudyDashboard() {
    const { user } = useAuthStore()
    const [recentBooks, setRecentBooks] = useState<BookType[]>([])
    const [myLibrary, setMyLibrary] = useState<BookType[]>([])
    const [semesterResources, setSemesterResources] = useState<Resource[]>([])
    const [selectedSemester, setSelectedSemester] = useState(3) // Default to Sem 3
    const [readingBook, setReadingBook] = useState<BookType | null>(null)

    // Load Data
    useEffect(() => {
        const loadData = async () => {
            const userId = user?.id || '1' // Fallback to mock ID

            const [recent, library, semester] = await Promise.all([
                mockBackend.getRecentBooks(userId),
                mockBackend.getBooks(userId),
                mockBackend.getSemesterResources(selectedSemester)
            ])

            setRecentBooks(recent)
            setMyLibrary(library)
            setSemesterResources(semester)
        }
        loadData()
    }, [user, selectedSemester])

    const handleUpload = async () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.pdf,.epub'
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const toastId = toast.loading('Uploading to library...')
                const newBook = await mockBackend.uploadBook(file, user?.id || '1')
                setMyLibrary([newBook, ...myLibrary])
                toast.success('Book uploaded!', { id: toastId })
            }
        }
        input.click()
    }

    const openBook = (book: BookType) => {
        setReadingBook(book)
    }

    const updateProgress = (progress: number) => {
        if (readingBook) {
            mockBackend.updateProgress(readingBook.id, progress)
            // Update local state references
            setRecentBooks(prev => prev.map(b => b.id === readingBook.id ? { ...b, progress } : b))
            setMyLibrary(prev => prev.map(b => b.id === readingBook.id ? { ...b, progress } : b))
        }
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
                        Smart Study Room
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Your academic control center.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="gap-2">
                        <Clock className="w-4 h-4" /> History
                    </Button>
                    <Link to="/study-room">
                        <Button variant="primary" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                            <Headphones className="w-4 h-4" /> Enter Focus Mode
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Continue Reading Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Book className="w-5 h-5 text-indigo-500" /> Continue Reading
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentBooks.map(book => (
                        <motion.div
                            key={book.id}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer"
                            onClick={() => openBook(book)}
                        >
                            <Card className="h-full border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
                                    <div
                                        className="h-full bg-indigo-500"
                                        style={{ width: `${book.progress}%` }}
                                    />
                                </div>
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl ${book.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-400">{book.progress}%</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{book.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{book.author}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-400">
                                        <span>Last read today</span>
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                    {recentBooks.length === 0 && (
                        <div className="col-span-full py-8 text-center text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                            No recent books. Open one from your library!
                        </div>
                    )}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* My Library */}
                <section className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Library className="w-5 h-5 text-emerald-500" /> My Personal Library
                        </h2>
                        <Button variant="ghost" onClick={handleUpload} className="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                            <Plus className="w-4 h-4 mr-2" /> Upload New
                        </Button>
                    </div>
                    <Card className="min-h-[400px]">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search your notes..."
                                    className="w-full pl-9 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {myLibrary.map(book => (
                                <div key={book.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => openBook(book)}>
                                        <div className={`p-2 rounded-lg ${book.type === 'folder' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {book.type === 'folder' ? <Folder className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">{book.title}</h4>
                                            <p className="text-xs text-gray-500">{book.author} • {book.items ? `${book.items} items` : '2.4 MB'}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all">
                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>

                {/* Semester Content (Admin Controlled Mock) */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Folder className="w-5 h-5 text-blue-500" /> Semester Content
                        </h2>
                        <select
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(Number(e.target.value))}
                            className="bg-transparent text-sm font-medium text-blue-600 focus:outline-none cursor-pointer"
                        >
                            <option value="3">Sem 3</option>
                            <option value="4">Sem 4</option>
                        </select>
                    </div>
                    <Card className="h-[400px] overflow-y-auto">
                        <div className="p-4 grid gap-4">
                            {user?.role === 'teacher' && (
                                <div className="p-4 border-2 border-dashed border-blue-200 dark:border-blue-900 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    <Upload className="w-6 h-6 text-blue-500 mb-2" />
                                    <p className="text-xs font-medium text-blue-600">Upload Semester Content</p>
                                </div>
                            )}
                            {semesterResources.map(resource => (
                                <div key={resource.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 shadow-sm transition-all cursor-pointer">
                                    <div className="p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm text-blue-500">
                                        <Folder className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate text-gray-900 dark:text-white">{resource.title}</h4>
                                        <p className="text-xs text-gray-500 truncate">{resource.items} Resources</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>

            {/* Reading Modal */}
            <AnimatePresence>
                {readingBook && (
                    <ReaderModal
                        book={readingBook}
                        onClose={() => setReadingBook(null)}
                        onUpdateProgress={updateProgress}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
