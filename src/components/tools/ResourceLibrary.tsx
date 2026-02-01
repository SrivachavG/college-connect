import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { Search, Book, Video, FileText, ExternalLink, PlayCircle } from 'lucide-react'

const resources = [
    {
        category: 'Mathematics',
        items: [
            { id: 1, title: 'Calculus 1 Full Course', type: 'video', author: 'Professor Leonard', duration: '12h', url: '#' },
            { id: 2, title: 'Linear Algebra Cheat Sheet', type: 'pdf', author: 'Paul\'s Notes', size: '1.2MB', url: '#' },
            { id: 3, title: 'Differential Equations Intro', type: 'article', author: 'Khan Academy', readTime: '15 min', url: '#' },
        ]
    },
    {
        category: 'Physics',
        items: [
            { id: 4, title: 'Physics for Engineers', type: 'video', author: 'MIT OpenCourseWare', duration: '45m', url: '#' },
            { id: 5, title: 'Thermodynamics Tables', type: 'pdf', author: 'NIST', size: '3.5MB', url: '#' },
        ]
    },
    {
        category: 'Programming',
        items: [
            { id: 6, title: 'Data Algorithm Visualizations', type: 'article', author: 'VisuAlgo', readTime: 'Interactive', url: '#' },
            { id: 7, title: 'Clean Code Principles', type: 'pdf', author: 'Robert C. Martin', size: '5.1MB', url: '#' },
            { id: 8, title: 'System Design Interview Guide', type: 'video', author: 'Exponent', duration: '1.5h', url: '#' },
        ]
    }
]

export default function ResourceLibrary() {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredResources = resources.flatMap(cat =>
        cat.items.map(item => ({ ...item, category: cat.category }))
    ).filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.author.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <Card className="p-6 h-[600px] flex flex-col">
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resource Library</h3>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search resources, tutorials, papers..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Mathematics', 'Physics', 'Programming'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Resource Grid */}
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredResources.map((resource, index) => (
                        <motion.div
                            key={resource.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group p-4 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 rounded-xl transition-all hover:shadow-md bg-white dark:bg-gray-800"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg ${resource.type === 'video' ? 'bg-red-100 text-red-600' :
                                        resource.type === 'pdf' ? 'bg-blue-100 text-blue-600' :
                                            'bg-green-100 text-green-600'
                                    }`}>
                                    {resource.type === 'video' ? <Video className="w-5 h-5" /> :
                                        resource.type === 'pdf' ? <Book className="w-5 h-5" /> :
                                            <FileText className="w-5 h-5" />}
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
                                    {resource.category}
                                </span>
                            </div>

                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {resource.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                by {resource.author}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{resource.duration || resource.size || resource.readTime}</span>
                                <a href="#" className="flex items-center gap-1 font-medium hover:underline">
                                    View <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
