import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { School, Users, MapPin, Star, BookOpen } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import CollegeResources from '../components/tools/CollegeResources'

const colleges = [
    { id: 1, name: 'IIT Bombay', location: 'Mumbai, Maharashtra', students: 11000, courses: 150, rating: 4.8 },
    { id: 2, name: 'IIT Delhi', location: 'New Delhi', students: 9500, courses: 140, rating: 4.7 },
    { id: 3, name: 'Anna University', location: 'Chennai, Tamil Nadu', students: 10000, courses: 145, rating: 4.9 },
    { id: 4, name: 'NIT Trichy', location: 'Tiruchirappalli, Tamil Nadu', students: 8500, courses: 120, rating: 4.5 },
    { id: 5, name: 'BITS Pilani', location: 'Pilani, Rajasthan', students: 7000, courses: 110, rating: 4.6 },
    { id: 6, name: 'IIT Kanpur', location: 'Kanpur, Uttar Pradesh', students: 9000, courses: 135, rating: 4.7 },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function Colleges() {
    const [selectedCollege, setSelectedCollege] = useState<string | null>(null)

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Colleges & Resources</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Browse colleges and access their study materials</p>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
            >
                {colleges.map((college) => (
                    <motion.div key={college.id} variants={itemVariants}>
                        <Card hover className="p-6 cursor-pointer group h-full flex flex-col">
                            <motion.div
                                className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <School className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </motion.div>

                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                    {college.name}
                                </h3>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-medium">{college.rating}</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
                                <motion.div
                                    className="flex items-center gap-2"
                                    whileHover={{ x: 4 }}
                                >
                                    <MapPin className="w-4 h-4" />
                                    <span>{college.location}</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center gap-2"
                                    whileHover={{ x: 4 }}
                                >
                                    <Users className="w-4 h-4" />
                                    <span>{college.students.toLocaleString()} students</span>
                                </motion.div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full justify-center gap-2 group-hover:bg-gray-100 dark:group-hover:bg-gray-700"
                                onClick={() => setSelectedCollege(college.name)}
                            >
                                <BookOpen className="w-4 h-4" />
                                View Resources
                            </Button>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedCollege && (
                    <CollegeResources
                        collegeName={selectedCollege}
                        onClose={() => setSelectedCollege(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}
