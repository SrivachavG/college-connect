import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { Pen, Eraser, Square, Circle, Download, RotateCcw, Palette } from 'lucide-react'

export default function CollaborationBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen')
    const [color, setColor] = useState('#000000')
    const [brushSize, setBrushSize] = useState(2)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Set proper canvas size
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
        }

        // Handle window resize
        const handleResize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        setIsDrawing(true)
        const rect = canvas.getBoundingClientRect()
        ctx.beginPath()
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    }

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color
        ctx.lineWidth = tool === 'eraser' ? 20 : brushSize
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
        ctx.stroke()
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const downloadCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement('a')
        link.download = 'whiteboard.png'
        link.href = canvas.toDataURL()
        link.click()
    }

    return (
        <Card className="p-4 h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Whiteboard</h3>

                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1.5 rounded-lg">
                    <button
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded-md transition-colors ${tool === 'pen' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-gray-600/50'
                            }`}
                    >
                        <Pen className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-md transition-colors ${tool === 'eraser' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-gray-600/50'
                            }`}
                    >
                        <Eraser className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                    />

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                    <button
                        onClick={clearCanvas}
                        className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors text-gray-700 dark:text-gray-300"
                        title="Clear"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={downloadCanvas}
                        className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors text-gray-700 dark:text-gray-300"
                        title="Download"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-inner cursor-crosshair">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    className="w-full h-full touch-none"
                />
            </div>

            <p className="text-xs text-center text-gray-400 mt-2">
                Click and drag to draw • Use eraser to clear parts • Download to save
            </p>
        </Card>
    )
}
