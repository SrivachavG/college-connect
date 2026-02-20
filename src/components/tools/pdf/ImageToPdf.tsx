import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { jsPDF } from 'jspdf'
import {
    Upload, FileImage, ArrowRight,
    Download, CheckCircle, RefreshCcw,
    Trash2, GripVertical
} from 'lucide-react'

import Button from '../../ui/Button'
import Card from '../../ui/Card'
import PdfToolLayout from './PdfToolLayout'

interface ImageFile {
    id: string
    file: File
    preview: string
    name: string
    size: number
}

export default function ImageToPdf() {

    const [images, setImages] = useState<ImageFile[]>([])
    const [isConverting, setIsConverting] = useState(false)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: URL.createObjectURL(file), // Create preview URL
            name: file.name,
            size: file.size
        }))
        setImages(prev => [...prev, ...newImages])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id))
    }

    const reset = () => {
        setImages([])
        setPdfUrl(null)
    }

    const convertToPdf = async () => {
        if (images.length === 0) return

        setIsConverting(true)

        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800))

        const doc = new jsPDF()

        for (let i = 0; i < images.length; i++) {
            const img = images[i]
            if (i > 0) doc.addPage()

            const imgProps = doc.getImageProperties(img.preview)
            const pdfWidth = doc.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

            doc.addImage(img.preview, 'JPEG', 0, 0, pdfWidth, pdfHeight)
        }

        const pdfBlob = doc.output('blob')
        const url = URL.createObjectURL(pdfBlob)
        setPdfUrl(url)
        setIsConverting(false)
    }

    const downloadPdf = () => {
        if (pdfUrl) {
            const link = document.createElement('a')
            link.href = pdfUrl
            link.download = 'DocuMate_Converted.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <PdfToolLayout
            title="JPG to PDF"
            description="Convert images to PDF in seconds. Support for JPG and PNG."
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px]">
                {/* Left Area: Upload / Success */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <AnimatePresence mode="wait">
                        {!pdfUrl ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="h-full"
                            >
                                <div
                                    {...getRootProps()}
                                    className={`h-full border-2 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isDragActive
                                        ? 'border-amber-500 bg-amber-500/5 scale-[0.98]'
                                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-amber-500/30 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/20 text-amber-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-amber-500/10">
                                        <Upload className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Drop images here
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                                        Support for JPG and PNG.
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
                                        Ready!
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
                                        Your images have been successfully processed.
                                    </p>
                                    <div className="space-y-4 w-full max-w-xs">
                                        <Button onClick={downloadPdf} className="w-full py-4 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/20 border-0 text-lg">
                                            <Download className="w-5 h-5 mr-2" /> Download PDF
                                        </Button>
                                        <Button variant="secondary" onClick={reset} className="w-full py-4">
                                            <RefreshCcw className="w-4 h-4 mr-2" /> Convert New
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
                            <div className="w-2 h-8 rounded-full bg-amber-500" />
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Selected Files</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{images.length} images ready to merge</p>
                            </div>
                        </div>
                        {images.length > 0 && (
                            <button
                                onClick={() => setImages([])}
                                className="text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {images.map((img, _index) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group relative flex items-center gap-4 p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-amber-500/30 transition-all duration-200"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                        <GripVertical className="w-4 h-4" />
                                    </div>

                                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 relative">
                                        <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <FileImage className="w-6 h-6 text-white/80" />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                                            {img.name}
                                        </p>
                                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                                            {(img.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeImage(img.id)}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {images.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-300 dark:text-gray-600 opacity-60">
                                <FileImage className="w-16 h-16 mb-4" />
                                <p className="text-sm font-medium">No images selected yet</p>
                            </div>
                        )}
                    </div>

                    {/* Action Bar */}
                    <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
                        <Button
                            onClick={convertToPdf}
                            disabled={images.length === 0 || isConverting || !!pdfUrl}
                            className={`w-full py-5 text-xl font-bold shadow-2xl transition-all duration-300 ${images.length > 0
                                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-1'
                                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                } border-0 rounded-2xl`}
                        >
                            {isConverting ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Convert to PDF <ArrowRight className="w-6 h-6" />
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </PdfToolLayout>
    )
}
