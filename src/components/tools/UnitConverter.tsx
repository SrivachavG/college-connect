import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { ArrowRight } from 'lucide-react'

const conversions = {
    length: {
        name: 'Length',
        units: { meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 }
    },
    weight: {
        name: 'Weight',
        units: { kilogram: 1, gram: 1000, milligram: 1000000, pound: 2.20462, ounce: 35.274 }
    },
    temperature: {
        name: 'Temperature',
        special: true
    },
    digital: {
        name: 'Digital Storage',
        units: { byte: 1, kilobyte: 0.001, megabyte: 0.000001, gigabyte: 0.000000001, terabyte: 0.000000000001 }
    }
}

export default function UnitConverter() {
    const [category, setCategory] = useState<keyof typeof conversions>('length')
    const [fromValue, setFromValue] = useState('1')
    const [fromUnit, setFromUnit] = useState('meter')
    const [toUnit, setToUnit] = useState('kilometer')

    const convert = () => {
        const value = parseFloat(fromValue) || 0

        if (category === 'temperature') {
            // Temperature conversion logic
            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                return ((value * 9 / 5) + 32).toFixed(2)
            } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                return ((value - 32) * 5 / 9).toFixed(2)
            } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
                return (value + 273.15).toFixed(2)
            } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
                return (value - 273.15).toFixed(2)
            }
            return value.toFixed(2)
        }

        const units = conversions[category].units as Record<string, number>
        const baseValue = value / units[fromUnit]
        const result = baseValue * units[toUnit]
        return result.toFixed(6)
    }

    const getUnits = () => {
        if (category === 'temperature') {
            return ['celsius', 'fahrenheit', 'kelvin']
        }
        return Object.keys(conversions[category].units || {})
    }

    return (
        <Card className="p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Unit Converter</h3>

            {/* Category Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {Object.entries(conversions).map(([key, value]) => (
                    <motion.button
                        key={key}
                        onClick={() => {
                            setCategory(key as keyof typeof conversions)
                            const units = key === 'temperature' ? ['celsius'] : Object.keys(value.units || {})
                            setFromUnit(units[0])
                            setToUnit(units[1] || units[0])
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === key
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {value.name}
                    </motion.button>
                ))}
            </div>

            {/* Conversion Interface */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                {/* From */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
                    <input
                        type="number"
                        value={fromValue}
                        onChange={(e) => setFromValue(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none mb-2"
                    />
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                    >
                        {getUnits().map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center pb-2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>

                {/* To */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                    <div className="w-full px-4 py-3 bg-gray-900 dark:bg-white rounded-lg text-white dark:text-gray-900 font-semibold mb-2 min-h-[52px] flex items-center">
                        {convert()}
                    </div>
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                    >
                        {getUnits().map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
            </div>
        </Card>
    )
}
