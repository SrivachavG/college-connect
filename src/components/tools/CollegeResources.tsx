import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, Eye, Upload, Search, Filter, Star, ThumbsUp } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import toast from 'react-hot-toast'

interface Resource {
    id: number
    title: string
    type: 'pdf' | 'doc' | 'ppt'
    author: string
    pages: number
    size: string
    downloads: number
    rating: number
    preview: string // Color class for preview
}

const dummyResources: Resource[] = [
    { id: 1, title: 'Engineering Mathematics III Notes', type: 'pdf', author: 'Prof. Sharma', pages: 45, size: '2.4 MB', downloads: 1240, rating: 4.8, preview: 'bg-red-100 dark:bg-red-900/30 text-red-600' },
    { id: 2, title: 'Data Structures Algo Cheat Sheet', type: 'pdf', author: 'Topper Student', pages: 12, size: '1.1 MB', downloads: 3500, rating: 4.9, preview: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    { id: 3, title: 'Circuit Theory Presentation', type: 'ppt', author: 'Dr. Emily', pages: 30, size: '5.6 MB', downloads: 890, rating: 4.5, preview: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
    { id: 4, title: 'Mechanics Lab Report Template', type: 'doc', author: 'Dept. of Mech', pages: 5, size: '0.5 MB', downloads: 2100, rating: 4.2, preview: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
    { id: 5, title: 'Python Programming Guide', type: 'pdf', author: 'CS Department', pages: 120, size: '8.2 MB', downloads: 5600, rating: 4.9, preview: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
]

interface CollegeResourcesProps {
    collegeName: string
    onClose: () => void
}

export default function CollegeResources({ collegeName, onClose }: CollegeResourcesProps) {
    const [resources, setResources] = useState(dummyResources)
    const [search, setSearch] = useState('')
    const [viewingDoc, setViewingDoc] = useState<Resource | null>(null)

    const handleUpload = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.pdf,.doc,.docx,.ppt,.pptx'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                toast.loading('Uploading document...', { duration: 2000 })
                setTimeout(() => {
                    toast.success('Document uploaded successfully!')
                    const newResource: Resource = {
                        id: Date.now(),
                        title: file.name,
                        type: 'pdf',
                        author: 'You',
                        pages: Math.floor(Math.random() * 50) + 1,
                        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                        downloads: 0,
                        rating: 0,
                        preview: 'bg-gray-100 dark:bg-gray-700 text-gray-600'
                    }
                    setResources([newResource, ...resources])
                }, 2000)
            }
        }
        input.click()
    }

    const handleDownload = (resource: Resource) => {
        toast.success(`Downloading ${resource.title}...`)
        // Simulation
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <FileText className="w-6 h-6 text-purple-600" />
                            {collegeName} Documents
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Access lecture notes, past papers, and project reports
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                        />
                    </div>
                    <Button variant="primary" onClick={handleUpload} className="w-full md:w-auto gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Document
                    </Button>
                </div>

                {/* Content Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-black/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase())).map((resource) => (
                            <motion.div
                                key={resource.id}
                                layoutId={`resource-${resource.id}`}
                                className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
                            >
                                {/* Preview Thumbnail (Scribd style) */}
                                <div className={`aspect-[3/4] ${resource.preview} flex items-center justify-center relative overflow-hidden`}>
                                    <FileText className="w-16 h-16 opacity-50" />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                        <Button
                                            variant="secondary"
                                            className="bg-white/90 dark:bg-gray-900/90 hover:bg-white text-gray-900 border-none"
                                            onClick={() => setViewingDoc(resource)}
                                        >
                                            <Eye className="w-4 h-4 mr-2" /> Read
                                        </Button>
                                    </div>

                                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                                        {resource.pages} pages
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1" title={resource.title}>
                                        {resource.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                        Uploaded by <span className="text-purple-600 dark:text-purple-400 font-medium">{resource.author}</span>
                                    </p>

                                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3" /> {resource.rating}
                                            </span>
                                            <span>•</span>
                                            <span>{resource.downloads} reads</span>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(resource)}
                                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Document Viewer Modal (Simulation) */}
            <AnimatePresence>
                {viewingDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 bg-gray-900 text-white border-b border-gray-800">
                            <h3 className="font-medium truncate max-w-lg">{viewingDoc.title}</h3>
                            <div className="flex items-center gap-4">
                                <Button variant="primary" onClick={() => handleDownload(viewingDoc)} className="gap-2">
                                    <Download className="w-4 h-4" /> Download
                                </Button>
                                <button onClick={() => setViewingDoc(null)} className="p-2 hover:bg-white/10 rounded-lg">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-gray-800 flex items-center justify-center p-8 overflow-y-auto">
                            <div className="bg-white w-full max-w-3xl min-h-screen shadow-2xl p-12 text-gray-900">
                                <div className="text-center border-b border-gray-200 pb-8 mb-8">
                                    <h1 className="text-3xl font-bold mb-4">{viewingDoc.title}</h1>
                                    <p className="text-gray-500">Prepared by {viewingDoc.author}</p>
                                </div>
                                <div className="space-y-4 text-gray-600">
                                    <p>This is a simulated preview of the document. In a real application, the PDF content would be rendered here.</p>
                                    <div className="h-64 bg-gray-100 rounded-lg"></div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <div className="h-32 bg-gray-100 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
