import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { PDFDocument } from 'pdf-lib'
import {
    Upload, FileText, Scissors,
    Download, CheckCircle, RefreshCcw,
    GripVertical
} from 'lucide-react'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import toast from 'react-hot-toast'
import PdfToolLayout from './PdfToolLayout'

export default function SplitPdf() {
    const [file, setFile] = useState<File | null>(null)
    const [pageCount, setPageCount] = useState<number>(0)
    const [splitRange, setSplitRange] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null)

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0]
        if (selectedFile) {
            setFile(selectedFile)
            // Load PDF to get page count
            try {
                const arrayBuffer = await selectedFile.arrayBuffer()
                const pdf = await PDFDocument.load(arrayBuffer)
                setPageCount(pdf.getPageCount())
                toast.success(`Loaded ${pdf.getPageCount()} pages`)
            } catch (error) {
                console.error(error)
                toast.error('Failed to load PDF')
                setFile(null)
            }
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1
    })

    const splitPdf = async () => {
        if (!file || !splitRange) return

        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const srcPdf = await PDFDocument.load(arrayBuffer)
            const newPdf = await PDFDocument.create()

            // Parse range "1-3, 5, 7-9"
            const pagesToKeep = new Set<number>()
            const parts = splitRange.split(',').map(p => p.trim())

            for (const part of parts) {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(n => parseInt(n))
                    if (!isNaN(start) && !isNaN(end)) {
                        for (let i = start; i <= end; i++) pagesToKeep.add(i)
                    }
                } else {
                    const page = parseInt(part)
                    if (!isNaN(page)) pagesToKeep.add(page)
                }
            }

            // Copy pages (0-indexed logic)
            const indices = Array.from(pagesToKeep)
                .map(p => p - 1)
                .filter(idx => idx >= 0 && idx < srcPdf.getPageCount())
                .sort((a, b) => a - b)

            if (indices.length === 0) {
                toast.error('Invalid page range')
                setIsProcessing(false)
                return
            }

            const copiedPages = await newPdf.copyPages(srcPdf, indices)
            copiedPages.forEach(page => newPdf.addPage(page))

            const pdfBytes = await newPdf.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            setSplitPdfUrl(url)
            toast.success('PDF Split Successfully!')
        } catch (error) {
            console.error(error)
            toast.error('Failed to split PDF')
        } finally {
            setIsProcessing(false)
        }
    }

    const downloadPdf = () => {
        if (splitPdfUrl) {
            const link = document.createElement('a')
            link.href = splitPdfUrl
            link.download = `DocuMate_Split_${splitRange}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const reset = () => {
        setFile(null)
        setPageCount(0)
        setSplitRange('')
        setSplitPdfUrl(null)
    }

    return (
        <PdfToolLayout
            title="Split PDF"
            description="Extract specific pages or ranges from your PDF documents."
        >
            <div className="min-h-[600px]">
                <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden p-8 max-w-5xl mx-auto">
                    {!splitPdfUrl ? (
                        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Upload Area */}
                            {!file ? (
                                <div
                                    {...getRootProps()}
                                    className={`col-span-2 h-full border-2 border-dashed rounded-[2rem] p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isDragActive
                                        ? 'border-cyan-500 bg-cyan-500/5 scale-[0.98]'
                                        : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-cyan-500/30 hover:bg-white dark:hover:bg-gray-900'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="w-24 h-24 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/10">
                                        <Upload className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Drop PDF here
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                                        Extract pages from your document.
                                        <br />
                                        Drag & drop or click to browse.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col justify-center items-center text-center space-y-6 lg:border-r border-gray-100 dark:border-gray-800 lg:pr-12">
                                        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                                            <FileText className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {file.name}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <button
                                            onClick={reset}
                                            className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            Change File
                                        </button>
                                    </div>

                                    <div className="flex flex-col justify-center space-y-8">
                                        <div className="space-y-4">
                                            <label className="block text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                                Select Pages to Extract
                                            </label>
                                            <input
                                                type="text"
                                                value={splitRange}
                                                onChange={(e) => setSplitRange(e.target.value)}
                                                placeholder="e.g., 1-5, 8, 11-13"
                                                className="w-full px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-lg font-mono"
                                            />
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                Use commas for individual pages (e.g. 1, 5)
                                                <br />and hyphens for ranges (e.g. 1-5).
                                            </p>
                                        </div>

                                        <Button
                                            onClick={splitPdf}
                                            disabled={!splitRange || isProcessing}
                                            className="w-full py-5 text-lg bg-cyan-500 hover:bg-cyan-600 shadow-xl shadow-cyan-500/20 border-0 rounded-xl"
                                        >
                                            {isProcessing ? 'Extracting...' : 'Extract Pages'}
                                            {!isProcessing && <Scissors className="w-5 h-5 ml-2" />}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Extraction Complete!
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
                                Your selected pages have been saved as a new PDF.
                            </p>
                            <div className="space-y-4 w-full max-w-xs">
                                <Button onClick={downloadPdf} className="w-full py-4 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/20 border-0 text-lg">
                                    <Download className="w-5 h-5 mr-2" /> Download PDF
                                </Button>
                                <Button variant="secondary" onClick={reset} className="w-full py-4">
                                    <RefreshCcw className="w-4 h-4 mr-2" /> Split New
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PdfToolLayout>
    )
}
