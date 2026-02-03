import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Editor from '@monaco-editor/react'
import { useThemeStore } from '../../store/useThemeStore'
import { Download, Play, Terminal, Loader2, RotateCcw } from 'lucide-react'

const languages = ['javascript', 'python', 'java', 'cpp', 'html', 'css']

export default function CodeEditor() {
    const theme = useThemeStore((state) => state.theme)
    const [language, setLanguage] = useState('javascript')
    const [code, setCode] = useState(`// Welcome to Code Editor
function hello() {
  console.log("Hello, Engineer!");
}

hello();`)
    const [output, setOutput] = useState<string[]>(['// Output will appear here...'])
    const [isRunning, setIsRunning] = useState(false)

    const handleDownload = () => {
        const extensions: Record<string, string> = {
            javascript: 'js',
            python: 'py',
            java: 'java',
            cpp: 'cpp',
            html: 'html',
            css: 'css'
        }

        const blob = new Blob([code], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `code.${extensions[language]}`
        a.click()
        URL.revokeObjectURL(url)
    }

    const runCode = async () => {
        setIsRunning(true)
        setOutput(['Running...'])

        // Mapping for Piston API
        const runtimeMap: Record<string, { language: string, version: string }> = {
            javascript: { language: 'javascript', version: '18.15.0' },
            python: { language: 'python', version: '3.10.0' },
            java: { language: 'java', version: '15.0.2' },
            cpp: { language: 'c++', version: '10.2.0' },
        }

        const runtime = runtimeMap[language]

        if (!runtime) {
            setOutput(['// Execution not supported for this language in browser.', '// Please download to run locally.'])
            setIsRunning(false)
            return
        }

        try {
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: runtime.language,
                    version: runtime.version,
                    files: [{ content: code }]
                })
            })

            const data = await response.json()

            if (data.run) {
                const combinedOutput = (data.run.stdout || '') + (data.run.stderr || '')
                setOutput(combinedOutput ? combinedOutput.split('\n') : ['// Execution completed with no output'])
            } else {
                setOutput(['// Error executing code: ' + (data.message || 'Unknown error')])
            }
        } catch (error) {
            setOutput(['// Failed to connect to compiler service', '// Please check your internet connection'])
        } finally {
            setIsRunning(false)
        }
    }

    const clearOutput = () => {
        setOutput(['// Output will appear here...'])
    }

    return (
        <Card className="p-6 h-[800px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    Code Editor
                </h3>
                <div className="flex items-center gap-3">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                        ))}
                    </select>

                    <motion.button
                        onClick={runCode}
                        disabled={isRunning}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        Run
                    </motion.button>

                    <motion.button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Download className="w-4 h-4" />
                        Download
                    </motion.button>
                </div>
            </div>

            <div className="flex-1 grid grid-rows-[2fr_1fr] gap-4 min-h-0">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            roundedSelection: true,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 16 }
                        }}
                    />
                </div>

                {/* Terminal / Output */}
                <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                        <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                            <Terminal className="w-4 h-4" />
                            Console Output
                        </div>
                        <button
                            onClick={clearOutput}
                            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                            title="Clear Output"
                        >
                            <RotateCcw className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="flex-1 p-4 overflow-auto font-mono text-sm text-gray-300">
                        {output.map((line, i) => (
                            <div key={i} className="whitespace-pre-wrap break-all">{line}</div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}
