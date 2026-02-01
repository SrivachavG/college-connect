import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../ui/Card'
import { Folder, FileText, Upload, MoreVertical, Trash2, Download, Search } from 'lucide-react'
import Button from '../ui/Button'
import { format } from 'date-fns'

interface File {
    id: string
    name: string
    type: string
    size: string
    date: Date
}

export default function FileManager() {
    const [files, setFiles] = useState<File[]>([
        { id: '1', name: 'Data Structures Notes.pdf', type: 'pdf', size: '2.4 MB', date: new Date('2024-02-01') },
        { id: '2', name: 'Circuit Diagram.png', type: 'image', size: '1.8 MB', date: new Date('2024-01-28') },
        { id: '3', name: 'Project Report.docx', type: 'doc', size: '4.2 MB', date: new Date('2024-01-25') },
    ])
    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Handle file upload simulation
            const newFiles = Array.from(e.dataTransfer.files).map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                type: file.type.split('/')[1] || 'file',
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                date: new Date()
            }))
            setFiles([...files, ...newFiles])
        }
    }

    const deleteFile = (id: string) => {
        setFiles(files.filter(f => f.id !== id))
    }

    return (
        <Card className="p-6 h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">File Manager</h3>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search files..."
                            className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                        />
                    </div>
                    <Button variant="primary" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                    </Button>
                </div>
            </div>

            {/* Drag & Drop Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6 ${dragActive
                        ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
            >
                <Folder className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">Drag & drop files here</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">or click to browse</p>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                    {files.map((file) => (
                        <motion.div
                            key={file.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {file.size} • {format(file.date, 'MMM d, yyyy')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-400 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => deleteFile(file.id)}
                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </Card>
    )
}
