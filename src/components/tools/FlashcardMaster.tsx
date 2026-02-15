import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Plus, ChevronRight, Home } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { toast } from 'react-hot-toast'

interface Flashcard {
    id: string
    front: string
    back: string
    confidence?: 'low' | 'medium' | 'high'
}

interface Deck {
    id: string
    title: string
    subject: string
    cards: Flashcard[]
    color: string
}

const initialDecks: Deck[] = [
    {
        id: '1',
        title: 'React Hooks',
        subject: 'Frontend',
        color: 'from-blue-500 to-cyan-500',
        cards: [
            { id: '1a', front: 'useEffect', back: 'Handles side effects like data fetching, subscriptions, or DOM manipulation.' },
            { id: '1b', front: 'useState', back: 'Manages local state within a functional component.' },
            { id: '1c', front: 'useContext', back: 'Accesses context values without passing props down manually.' }
        ]
    },
    {
        id: '2',
        title: 'Data Structures',
        subject: 'CS Fundamentals',
        color: 'from-purple-500 to-pink-500',
        cards: [
            { id: '2a', front: 'Queue', back: 'FIFO (First-In-First-Out) data structure.' },
            { id: '2b', front: 'Stack', back: 'LIFO (Last-In-First-Out) data structure.' },
            { id: '2c', front: 'Binary Search Tree', back: 'Tree mostly used for searching, where left child < root < right child.' }
        ]
    }
]

export default function FlashcardMaster() {
    const [decks, setDecks] = useState<Deck[]>(initialDecks)
    const [activeDeck, setActiveDeck] = useState<Deck | null>(null)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [studyMode, setStudyMode] = useState(false)

    // New Deck State
    const [isCreating, setIsCreating] = useState(false)
    const [newDeckTitle, setNewDeckTitle] = useState('')
    const [newDeckSubject, setNewDeckSubject] = useState('')

    const handleCreateDeck = () => {
        if (!newDeckTitle || !newDeckSubject) return
        const newDeck: Deck = {
            id: Date.now().toString(),
            title: newDeckTitle,
            subject: newDeckSubject,
            color: 'from-indigo-500 to-violet-500',
            cards: []
        }
        setDecks([...decks, newDeck])
        setIsCreating(false)
        setNewDeckTitle('')
        setNewDeckSubject('')
        toast.success('Deck created!')
    }

    const startStudy = (deck: Deck) => {
        if (deck.cards.length === 0) {
            toast.error('Add cards to this deck first!')
            return
        }
        setActiveDeck(deck)
        setStudyMode(true)
        setCurrentCardIndex(0)
        setIsFlipped(false)
    }

    const handleNext = () => {
        setIsFlipped(false)
        setTimeout(() => {
            if (activeDeck && currentCardIndex < activeDeck.cards.length - 1) {
                setCurrentCardIndex(prev => prev + 1)
            } else {
                toast.success('Session Complete! Great job!')
                setStudyMode(false)
                setActiveDeck(null)
            }
        }, 200)
    }

    return (
        <div className="min-h-[600px] p-4">
            {!studyMode ? (
                // Dashboard View
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                                Flashcard Master
                            </h2>
                            <p className="text-gray-500 mt-2">Master concepts with spaced repetition.</p>
                        </div>
                        <Button onClick={() => setIsCreating(true)} className="gap-2">
                            <Plus className="w-4 h-4" /> New Deck
                        </Button>
                    </div>

                    {isCreating && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 glass rounded-2xl border border-white/20 shadow-lg space-y-4 max-w-md"
                        >
                            <h3 className="font-bold text-lg dark:text-white">Create New Deck</h3>
                            <input
                                placeholder="Deck Title (e.g., System Design)"
                                value={newDeckTitle}
                                onChange={e => setNewDeckTitle(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                placeholder="Subject (e.g., Computer Science)"
                                value={newDeckSubject}
                                onChange={e => setNewDeckSubject(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                            />
                            <div className="flex gap-2 justify-end">
                                <Button variant="secondary" onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button variant="primary" onClick={handleCreateDeck}>Create</Button>
                            </div>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {decks.map(deck => (
                            <motion.div
                                key={deck.id}
                                whileHover={{ y: -5 }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${deck.color} opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl blur-xl`} />
                                <Card className="h-full p-6 flex flex-col justify-between border-transparent hover:border-primary/30 transition-colors">
                                    <div>
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${deck.color} flex items-center justify-center mb-4 shadow-lg text-white`}>
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{deck.title}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{deck.subject}</p>
                                    </div>
                                    <div className="mt-8 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                            {deck.cards.length} Cards
                                        </span>
                                        <Button className="py-1 px-3 text-sm" onClick={() => startStudy(deck)}>
                                            Study Now
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                // Study Mode
                <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center py-12">
                    <div className="w-full flex items-center justify-between mb-8">
                        <Button variant="secondary" onClick={() => setStudyMode(false)} className="gap-2">
                            <Home className="w-4 h-4" /> Exit
                        </Button>
                        <div className="text-center">
                            <h3 className="text-xl font-bold dark:text-white">{activeDeck?.title}</h3>
                            <p className="text-sm text-gray-500">Card {currentCardIndex + 1} of {activeDeck?.cards.length}</p>
                        </div>
                        <div className="w-24" /> {/* Spacer */}
                    </div>

                    <div className="relative w-full aspect-[3/2] perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                        <motion.div
                            className="w-full h-full relative preserve-3d transition-all duration-500"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden">
                                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Question</span>
                                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                                        {activeDeck?.cards[currentCardIndex].front}
                                    </h2>
                                    <p className="absolute bottom-8 text-sm text-gray-400 animate-bounce">Click to flip</p>
                                </div>
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180">
                                <div className={`w-full h-full bg-gradient-to-br ${activeDeck?.color} rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center text-center text-white`}>
                                    <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Answer</span>
                                    <h2 className="text-2xl font-medium leading-relaxed">
                                        {activeDeck?.cards[currentCardIndex].back}
                                    </h2>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        <Button
                            variant="secondary"
                            className="w-16 h-16 rounded-full !p-0 flex items-center justify-center border-2 border-red-200 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-all"
                            onClick={handleNext}
                            title="Hard"
                        >
                            <span className="text-2xl">HARD</span>
                        </Button>
                        <Button
                            className="h-16 px-12 rounded-full text-lg shadow-lg shadow-primary/25"
                            onClick={handleNext}
                        >
                            Next Card <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-16 h-16 rounded-full !p-0 flex items-center justify-center border-2 border-green-200 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-green-500 transition-all"
                            onClick={handleNext}
                            title="Easy"
                        >
                            <span className="text-2xl">EASY</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
