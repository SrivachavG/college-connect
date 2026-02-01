import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { Search, BookOpen } from 'lucide-react'

const formulas = {
    mathematics: [
        { name: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / 2a', description: 'Solves ax² + bx + c = 0' },
        { name: 'Pythagorean Theorem', formula: 'a² + b² = c²', description: 'For right triangles' },
        { name: 'Circle Area', formula: 'A = πr²', description: 'Area of a circle' },
        { name: 'Distance Formula', formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)', description: 'Distance between two points' },
    ],
    physics: [
        { name: 'Newton\'s Second Law', formula: 'F = ma', description: 'Force equals mass times acceleration' },
        { name: 'Kinetic Energy', formula: 'KE = ½mv²', description: 'Energy of motion' },
        { name: 'Ohm\'s Law', formula: 'V = IR', description: 'Voltage, current, resistance relationship' },
        { name: 'Power', formula: 'P = VI = I²R = V²/R', description: 'Electrical power' },
    ],
    engineering: [
        { name: 'Stress', formula: 'σ = F/A', description: 'Force per unit area' },
        { name: 'Strain', formula: 'ε = ΔL/L', description: 'Change in length over original length' },
        { name: 'Young\'s Modulus', formula: 'E = σ/ε', description: 'Stress-strain ratio' },
        { name: 'Moment', formula: 'M = F × d', description: 'Force times distance' },
    ]
}

export default function FormulaReference() {
    const [category, setCategory] = useState<keyof typeof formulas>('mathematics')
    const [search, setSearch] = useState('')

    const filteredFormulas = formulas[category].filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Formula Reference</h3>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search formulas..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                />
            </div>

            {/* Categories */}
            <div className="flex gap-3 mb-6">
                {Object.keys(formulas).map((cat) => (
                    <motion.button
                        key={cat}
                        onClick={() => setCategory(cat as keyof typeof formulas)}
                        className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${category === cat
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            {/* Formula List */}
            <div className="space-y-4">
                {filteredFormulas.map((formula, index) => (
                    <motion.div
                        key={formula.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{formula.name}</h4>
                                <div className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-2 bg-white dark:bg-gray-800 px-3 py-2 rounded">
                                    {formula.formula}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{formula.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Card>
    )
}
