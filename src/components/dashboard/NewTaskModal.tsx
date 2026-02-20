import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import { useAcademicStore } from '../../store/useAcademicStore'
import toast from 'react-hot-toast'

interface NewTaskModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function NewTaskModal({ isOpen, onClose }: NewTaskModalProps) {
    const { addAssignment, courses } = useAcademicStore()
    const [title, setTitle] = useState('')
    const [courseId, setCourseId] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [type, setType] = useState<'Assignment' | 'Exam' | 'Project'>('Assignment')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !courseId || !dueDate) {
            toast.error('Please fill in all fields')
            return
        }

        addAssignment({
            courseId,
            title,
            dueDate: new Date(dueDate).toISOString(),
            type
        })

        toast.success('Task added successfully!')
        onClose()
        setTitle('')
        setCourseId('')
        setDueDate('')
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Task</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Complete Lab Report"
                                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-system-blue/50"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course</label>
                                    <select
                                        value={courseId}
                                        onChange={(e) => setCourseId(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-system-blue/50"
                                    >
                                        <option value="">Select Course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.code}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value as any)}
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-system-blue/50"
                                    >
                                        <option value="Assignment">Assignment</option>
                                        <option value="Exam">Exam</option>
                                        <option value="Project">Project</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-system-blue/50"
                                />
                            </div>

                            <div className="pt-2">
                                <Button type="submit" className="w-full justify-center">
                                    Create Task
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
