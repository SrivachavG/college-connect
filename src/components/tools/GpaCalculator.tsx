import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { Plus, Trash2 } from 'lucide-react'

interface Course {
    id: string
    name: string
    credits: number
    grade: string
}

const gradePoints: Record<string, number> = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
}

export default function GpaCalculator() {
    const [courses, setCourses] = useState<Course[]>([
        { id: '1', name: 'Data Structures', credits: 4, grade: 'A' },
        { id: '2', name: 'Computer Networks', credits: 3, grade: 'B+' },
    ])

    const addCourse = () => {
        setCourses([...courses, {
            id: Date.now().toString(),
            name: '',
            credits: 3,
            grade: 'A'
        }])
    }

    const removeCourse = (id: string) => {
        setCourses(courses.filter(c => c.id !== id))
    }

    const updateCourse = (id: string, field: keyof Course, value: string | number) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c))
    }

    const calculateGPA = () => {
        if (courses.length === 0) return 0
        const totalPoints = courses.reduce((sum, course) => {
            return sum + (gradePoints[course.grade] || 0) * course.credits
        }, 0)
        const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
    }

    return (
        <Card className="p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">GPA Calculator</h3>
                <motion.button
                    onClick={addCourse}
                    className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Plus className="w-4 h-4" />
                    Add Course
                </motion.button>
            </div>

            {/* Courses Table */}
            <div className="space-y-3 mb-6">
                {courses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-center"
                    >
                        <input
                            type="text"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                            placeholder="Course name"
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                        />
                        <input
                            type="number"
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                            min="1"
                            max="10"
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                        />
                        <select
                            value={course.grade}
                            onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none"
                        >
                            {Object.keys(gradePoints).map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                        <motion.button
                            onClick={() => removeCourse(course.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            {/* GPA Result */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 rounded-xl p-6 text-center">
                <p className="text-white dark:text-gray-900 text-sm font-medium mb-2">Your GPA</p>
                <motion.p
                    key={calculateGPA()}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-white dark:text-gray-900 text-5xl font-bold"
                >
                    {calculateGPA()}
                </motion.p>
                <p className="text-white/80 dark:text-gray-800 text-sm mt-2">
                    {courses.reduce((sum, c) => sum + c.credits, 0)} total credits
                </p>
            </div>
        </Card>
    )
}
