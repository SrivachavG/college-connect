import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Editor from '@monaco-editor/react'
import { useThemeStore } from '../../store/useThemeStore'
import { Download, Play } from 'lucide-react'

const languages = ['javascript', 'python', 'java', 'cpp', 'html', 'css']

export default function CodeEditor() {
    const theme = useThemeStore((state) => state.theme)
    const [language, setLanguage] = useState('javascript')
    const [code, setCode] = useState(`// Welcome to Code Editor
function hello() {
  console.log("Hello, Engineer!");
}

hello();`)

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

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Code Editor</h3>
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

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <Editor
                    height="500px"
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
                    }}
                />
            </div>
        </Card>
    )
}
