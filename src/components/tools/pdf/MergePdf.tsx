import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { PDFDocument } from 'pdf-lib'
import {
    Upload, FileText, ArrowRight,
    Download, CheckCircle, RefreshCcw,
    Trash2, GripVertical, Merge
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import toast from 'react-hot-toast'
import PdfToolLayout from './PdfToolLayout'

interface PdfFile extends File {
    id: string
}

export default function MergePdf() {
    const navigate = useNavigate()
    const [files, setFiles] = useState<PdfFile[]>([])
    const [isMerging, setIsMerging] = useState(false)
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => Object.assign(file, {
            id: Math.random().toString(36).substr(2, 9)
        }))
        setFiles(prev => [...prev, ...newFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        }
    })

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    const moveFile = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === files.length - 1)
        ) return

        const newFiles = [...files]
        const targetIndex = direction === 'up' ? index - 1 : index + 1
            ;[newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
        setFiles(newFiles)
    }

    const mergePdfs = async () => {
        if (files.length < 2) {
            toast.error('Please select at least 2 PDFs to merge')
            return
        }

        setIsMerging(true)
        try {
            const mergedPdf = await PDFDocument.create()

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer()
                const pdf = await PDFDocument.load(arrayBuffer)
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
                copiedPages.forEach((page) => mergedPdf.addPage(page))
            }

            const pdfBytes = await mergedPdf.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            setMergedPdfUrl(url)
            toast.success('PDFs Merged Successfully!')
        } catch (error) {
            console.error(error)
            toast.error('Failed to merge PDFs')
        } finally {
            setIsMerging(false)
        }
    }

    const downloadPdf = () => {
        if (mergedPdfUrl) {
            const link = document.createElement('a')
            link.href = mergedPdfUrl
            link.download = 'DocuMate_Merged.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const reset = () => {
        setFiles([])
        setMergedPdfUrl(null)
    }

    return (
        <PdfToolLayout
            title="Merge PDF"
            description="Combine multiple PDF files into one unified document."
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px]">
                {/* Left Area: Upload / Success */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <AnimatePresence mode="wait">
                        {!mergedPdfUrl ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="h-full"
                            >
                                <div
                                    {...getRootProps()}
                                    className={`h-full border-2 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isDragActive
                                        ? 'border-rose-500 bg-rose-500/5 scale-[0.98]'
                                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-rose-500/30 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-rose-500/10">
                                        <Upload className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Drop PDFs here
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                                        Combine multiple PDFs into one.
                                        <br />
                                        Drag & drop or click to browse.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col"
                            >
                                <Card className="h-full flex flex-col items-center justify-center text-center p-8 bg-green-500/5 border-green-500/20">
                                    <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        Merged!
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
                                        Your documents have been joined.
                                    </p>
                                    <div className="space-y-4 w-full max-w-xs">
                                        <Button onClick={downloadPdf} className="w-full py-4 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/20 border-0 text-lg">
                                            <Download className="w-5 h-5 mr-2" /> Download PDF
                                        </Button>
                                        <Button variant="secondary" onClick={reset} className="w-full py-4">
                                            <RefreshCcw className="w-4 h-4 mr-2" /> Merge New
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Area: File Management */}
                <div className="lg:col-span-7 flex flex-col h-full bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-100/50 dark:shadow-black/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 rounded-full bg-rose-500" />
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Selected Documents</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{files.length} files selected</p>
                            </div>
                        </div>
                        {files.length > 0 && (
                            <button
                                onClick={() => setFiles([])}
                                className="text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {files.map((file, index) => (
                                <motion.div
                                    key={file.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                    className="group relative flex items-center gap-4 p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-rose-500/30 transition-all duration-200"
                                >
                                    <div className="flex flex-col items-center gap-1 text-gray-300">
                                        <button onClick={() => moveFile(index, 'up')} disabled={index === 0} className="hover:text-gray-900 disabled:opacity-0 p-1">
                                            <GripVertical className="w-3 h-3 rotate-90" />
                                        </button>
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <button onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1} className="hover:text-gray-900 disabled:opacity-0 p-1">
                                            <GripVertical className="w-3 h-3 rotate-90" />
                                        </button>
                                    </div>


                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {files.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-300 dark:text-gray-600 opacity-60">
                                <Merge className="w-16 h-16 mb-4" />
                                <p className="text-sm font-medium">No PDFs selected yet</p>
                            </div>
                        )}
                    </div>

                    {/* Action Bar */}
                    <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
                        <Button
                            onClick={mergePdfs}
                            disabled={files.length < 2 || isMerging || !!mergedPdfUrl}
                            className={`w-full py-5 text-xl font-bold shadow-2xl transition-all duration-300 ${files.length >= 2
                                ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-1'
                                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                } border-0 rounded-2xl`}
                        >
                            {isMerging ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Merging...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Merge PDFs <ArrowRight className="w-6 h-6" />
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </PdfToolLayout>
    )
}
