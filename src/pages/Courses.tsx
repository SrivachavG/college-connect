import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import { Clock, User, PlayCircle, CheckCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

interface Video {
    id: number
    title: string
    duration: string
    completed: boolean
}

interface Course {
    id: number
    name: string
    instructor: string
    duration: string
    enrolled: boolean
    progress: number
    videos?: Video[]
}

const courses: Course[] = [
    {
        id: 1,
        name: 'Data Structures & Algorithms',
        instructor: 'Dr. Smith',
        duration: '12 weeks',
        enrolled: true,
        progress: 75,
        videos: [
            { id: 101, title: 'Introduction to Arrays', duration: '15:30', completed: true },
            { id: 102, title: 'Linked Lists Fundamentals', duration: '22:15', completed: true },
            { id: 103, title: 'Stack and Queues', duration: '18:45', completed: true },
            { id: 104, title: 'Binary Trees', duration: '25:10', completed: false },
            { id: 105, title: 'Graph Algorithms', duration: '30:00', completed: false },
        ]
    },
    {
        id: 2,
        name: 'Machine Learning Fundamentals',
        instructor: 'Prof. Johnson',
        duration: '10 weeks',
        enrolled: true,
        progress: 40,
        videos: [
            { id: 201, title: 'What is Machine Learning?', duration: '12:00', completed: true },
            { id: 202, title: 'Linear Regression', duration: '20:45', completed: true },
            { id: 203, title: 'Logistic Regression', duration: '18:30', completed: false },
            { id: 204, title: 'Neural Networks Intro', duration: '28:15', completed: false },
        ]
    },
    {
        id: 3,
        name: 'Web Development',
        instructor: 'Dr. Williams',
        duration: '8 weeks',
        enrolled: true,
        progress: 90,
        videos: [
            { id: 301, title: 'HTML5 & CSS3 Basics', duration: '45:00', completed: true },
            { id: 302, title: 'JavaScript ES6+', duration: '55:20', completed: true },
            { id: 303, title: 'React Hooks Deep Dive', duration: '40:15', completed: true },
            { id: 304, title: 'State Management', duration: '35:10', completed: true },
            { id: 305, title: 'Deployment Strategies', duration: '25:00', completed: false },
        ]
    },
    {
        id: 4,
        name: 'Computer Networks',
        instructor: 'Prof. Brown',
        duration: '10 weeks',
        enrolled: false,
        progress: 0,
        videos: []
    },
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
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

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
                                    <h3
                                        className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                                        onClick={() => course.enrolled && setSelectedCourse(course)}
                                    >
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
                                            onClick={() => setSelectedCourse(course)}
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

            <Modal
                isOpen={!!selectedCourse}
                onClose={() => setSelectedCourse(null)}
                title={selectedCourse?.name || 'Course Content'}
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Duration</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedCourse?.duration}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Course Progress</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white text-right">
                                {selectedCourse?.progress}%
                            </p>
                        </div>
                    </div>

                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                        Course Modules
                    </h4>

                    <div className="space-y-2">
                        {selectedCourse?.videos?.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${video.completed
                                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                        }`}>
                                        {video.completed ? <CheckCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {video.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Module {index + 1}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500 font-mono">
                                        {video.duration}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <Button
                            variant="primary"
                            onClick={() => setSelectedCourse(null)}
                        >
                            Continue Learning
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    )
}
