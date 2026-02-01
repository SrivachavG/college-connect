import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Plus, Clock, MapPin, Calendar as CalendarIcon, X } from 'lucide-react'
import 'react-calendar/dist/Calendar.css'

interface Event {
    id: string
    title: string
    date: Date
    type: 'exam' | 'assignment' | 'event' | 'holiday'
    location?: string
    time?: string
}

const eventColors = {
    exam: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    assignment: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    event: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    holiday: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
}

export default function Events() {
    const [date, setDate] = useState<Date>(new Date())
    const [showAddModal, setShowAddModal] = useState(false)
    const [events, setEvents] = useState<Event[]>([
        { id: '1', title: 'Data Structures Mid-Sem', date: new Date(2024, 1, 15), type: 'exam', time: '10:00 AM', location: 'Hall A1' },
        { id: '2', title: 'Project Submission', date: new Date(2024, 1, 20), type: 'assignment', time: '11:59 PM' },
        { id: '3', title: 'Tech Fest 2024', date: new Date(2024, 1, 25), type: 'event', location: 'Auditorium' },
    ])

    // New Event Form State
    const [newEvent, setNewEvent] = useState<Partial<Event>>({ type: 'event', date: new Date() })

    const handleAddEvent = () => {
        if (!newEvent.title) return
        const event: Event = {
            id: Date.now().toString(),
            title: newEvent.title,
            date: newEvent.date || new Date(),
            type: newEvent.type || 'event',
            time: newEvent.time,
            location: newEvent.location
        }
        setEvents([...events, event])
        setShowAddModal(false)
        setNewEvent({ type: 'event', date: new Date() })
    }

    const selectedDateEvents = events.filter(event =>
        event.date.toDateString() === date.toDateString()
    )

    const upcomingEvents = events
        .filter(event => event.date >= new Date())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 3)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Section */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Calendar</h2>
                        <p className="text-gray-500 dark:text-gray-400">Manage your schedule and deadlines</p>
                    </div>
                    <Button variant="primary" onClick={() => setShowAddModal(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Event
                    </Button>
                </div>

                <Card className="p-6">
                    <div className="calendar-wrapper">
                        <Calendar
                            onChange={(value) => setDate(value as Date)}
                            value={date}
                            className="w-full border-none font-sans"
                            tileClassName={({ date }) => {
                                const hasEvent = events.some(e => e.date.toDateString() === date.toDateString())
                                return hasEvent ? 'has-event' : ''
                            }}
                        />
                    </div>
                </Card>

                {/* Selected Date Events */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Events for {format(date, 'MMMM d, yyyy')}
                    </h3>
                    <div className="space-y-3">
                        {selectedDateEvents.length > 0 ? (
                            selectedDateEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-4 rounded-lg border flex items-center justify-between ${eventColors[event.type]}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <CalendarIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{event.title}</h4>
                                            <div className="flex items-center gap-3 text-sm opacity-90">
                                                {event.time && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {event.time}
                                                    </span>
                                                )}
                                                {event.location && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {event.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold uppercase px-2 py-1 bg-white/20 rounded">
                                        {event.type}
                                    </span>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">No events scheduled for this day</p>
                        )}
                    </div>
                </Card>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
                {/* Upcoming Deadlines */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h3>
                    <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                                <div className="flex-col items-center text-center min-w-[3rem]">
                                    <span className="text-xs font-bold text-red-500 uppercase block">
                                        {format(event.date, 'MMM')}
                                    </span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white block">
                                        {format(event.date, 'dd')}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                                        {event.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)} • {format(event.date, 'EEEE')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                    <h3 className="font-semibold mb-1">Study Streak</h3>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-4xl font-bold">12</span>
                        <span className="text-sm opacity-80 mb-1">days</span>
                    </div>
                    <p className="text-sm opacity-90">Keep it up! You're on fire 🔥</p>
                </Card>
            </div>

            {/* Add Event Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                        >
                            <Card className="p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Event</h3>
                                    <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Title</label>
                                        <input
                                            type="text"
                                            value={newEvent.title || ''}
                                            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                                            placeholder="e.g. Math Exam"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Type</label>
                                            <select
                                                value={newEvent.type}
                                                onChange={e => setNewEvent({ ...newEvent, type: e.target.value as any })}
                                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                                            >
                                                <option value="exam">Exam</option>
                                                <option value="assignment">Assignment</option>
                                                <option value="event">Event</option>
                                                <option value="holiday">Holiday</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Date</label>
                                            <input
                                                type="date"
                                                value={newEvent.date ? format(newEvent.date, 'yyyy-MM-dd') : ''}
                                                onChange={e => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Time</label>
                                            <input
                                                type="time"
                                                value={newEvent.time || ''}
                                                onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Location</label>
                                            <input
                                                type="text"
                                                value={newEvent.location || ''}
                                                onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>

                                    <Button variant="primary" onClick={handleAddEvent} className="w-full justify-center mt-2">
                                        Add {newEvent.title ? `"${newEvent.title}"` : 'Event'}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
        .calendar-wrapper .react-calendar {
          background: transparent;
          width: 100%;
          border: none;
          font-family: inherit;
        }
        .calendar-wrapper .react-calendar__tile {
          padding: 1rem 0.5rem;
          border-radius: 0.5rem;
        }
        .calendar-wrapper .react-calendar__tile:enabled:hover,
        .calendar-wrapper .react-calendar__tile:enabled:focus {
          background-color: #f3f4f6;
        }
        .dark .calendar-wrapper .react-calendar__tile:enabled:hover,
        .dark .calendar-wrapper .react-calendar__tile:enabled:focus {
          background-color: #374151;
        }
        .calendar-wrapper .react-calendar__tile--now {
          background: #eff6ff;
          color: #2563eb;
        }
        .dark .calendar-wrapper .react-calendar__tile--now {
          background: rgba(37, 99, 235, 0.2);
          color: #60a5fa;
        }
        .calendar-wrapper .react-calendar__tile--active {
          background: #111827 !important;
          color: white !important;
        }
        .dark .calendar-wrapper .react-calendar__tile--active {
          background: #ffffff !important;
          color: #111827 !important;
        }
        .dark .calendar-wrapper .react-calendar__navigation button {
          color: white;
        }
        .dark .calendar-wrapper .react-calendar__month-view__weekdays__weekday {
          color: #9ca3af;
        }
        .dark .calendar-wrapper .react-calendar__month-view__days__day {
          color: #e5e7eb;
        }
        .dark .calendar-wrapper .react-calendar__month-view__days__day--neighboringMonth {
          color: #4b5563;
        }
        .has-event {
          position: relative;
        }
        .has-event::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: #8b5cf6;
          border-radius: 50%;
        }
      `}</style>
        </div>
    )
}
