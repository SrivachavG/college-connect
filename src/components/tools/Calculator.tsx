import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { Delete, Divide } from 'lucide-react'

const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', 'DEL'],
]

const scientificButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['√', 'x²', 'xʸ', 'π'],
]

export default function ScientificCalculator() {
    const [display, setDisplay] = useState('0')
    const [equation, setEquation] = useState('')

    const handleClick = (value: string) => {
        if (value === 'C') {
            setDisplay('0')
            setEquation('')
        } else if (value === 'DEL') {
            setDisplay(display.length > 1 ? display.slice(0, -1) : '0')
        } else if (value === '=') {
            try {
                let result = equation + display
                result = result.replace('÷', '/').replace('×', '*')
                const calculated = eval(result)
                setDisplay(calculated.toString())
                setEquation('')
            } catch {
                setDisplay('Error')
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            setEquation(equation + display + value)
            setDisplay('0')
        } else if (value === '√') {
            setDisplay(Math.sqrt(parseFloat(display)).toString())
        } else if (value === 'x²') {
            setDisplay(Math.pow(parseFloat(display), 2).toString())
        } else if (value === 'π') {
            setDisplay(Math.PI.toString())
        } else if (value === 'sin') {
            setDisplay(Math.sin(parseFloat(display) * Math.PI / 180).toString())
        } else if (value === 'cos') {
            setDisplay(Math.cos(parseFloat(display) * Math.PI / 180).toString())
        } else if (value === 'tan') {
            setDisplay(Math.tan(parseFloat(display) * Math.PI / 180).toString())
        } else if (value === 'log') {
            setDisplay(Math.log10(parseFloat(display)).toString())
        } else {
            setDisplay(display === '0' ? value : display + value)
        }
    }

    return (
        <Card className="p-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Scientific Calculator</h3>

            {/* Display */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
                {equation && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{equation}</div>
                )}
                <div className="text-3xl font-bold text-gray-900 dark:text-white text-right break-all">
                    {display}
                </div>
            </div>

            {/* Scientific Functions */}
            <div className="grid grid-cols-4 gap-2 mb-2">
                {scientificButtons.flat().map((btn) => (
                    <motion.button
                        key={btn}
                        onClick={() => handleClick(btn)}
                        className="bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 py-3 rounded-lg font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {btn}
                    </motion.button>
                ))}
            </div>

            {/* Standard Buttons */}
            <div className="grid grid-cols-4 gap-2">
                {buttons.flat().map((btn) => (
                    <motion.button
                        key={btn}
                        onClick={() => handleClick(btn)}
                        className={`py-4 rounded-lg font-semibold transition-colors ${btn === '='
                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                            : ['C', 'DEL'].includes(btn)
                                ? 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300'
                                : ['+', '-', '*', '/'].includes(btn)
                                    ? 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {btn}
                    </motion.button>
                ))}
            </div>
        </Card>
    )
}
