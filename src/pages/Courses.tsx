import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import { BookOpen, Clock, User, PlayCircle } from 'lucide-react'
import Button from '../components/ui/Button'

const courses = [
    { id: 1, name: 'Data Structures & Algorithms', instructor: 'Dr. Smith', duration: '12 weeks', enrolled: true, progress: 75 },
    { id: 2, name: 'Machine Learning Fundamentals', instructor: 'Prof. Johnson', duration: '10 weeks', enrolled: true, progress: 40 },
    { id: 3, name: 'Web Development', instructor: 'Dr. Williams', duration: '8 weeks', enrolled: true, progress: 90 },
    { id: 4, name: 'Computer Networks', instructor: 'Prof. Brown', duration: '10 weeks', enrolled: false, progress: 0 },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
}

export default function Courses() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            <p className="text-sm text-gray-500 dark:text-gray-400">
                You are enrolled in {courses.filter(c => c.enrolled).length} courses
            </p>

            <motion.div
                className="grid grid-cols-1 gap-4"
                variants={containerVariants}
            >
                {courses.map((course) => (
                    <motion.div key={course.id} variants={itemVariants}>
                        <Card hover className="p-6 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                        {course.name}
                                    </h3>
                                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>{course.instructor}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.enrolled
                                            ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                        }`}>
                                        {course.enrolled ? 'Enrolled' : 'Not Enrolled'}
                                    </span>

                                    {course.enrolled && (
                                        <motion.button
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <PlayCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>

                            {course.enrolled && (
                                <motion.div
                                    className="space-y-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                                        <motion.span
                                            className="font-medium text-gray-900 dark:text-white"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            {course.progress}%
                                        </motion.span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.progress}%` }}
                                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {!course.enrolled && (
                                <Button variant="primary" className="mt-2">
                                    Enroll Now
                                </Button>
                            )}
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}
