export interface Book {
    id: string
    title: string
    author: string
    items?: number
    progress: number
    cover?: string
    type: 'pdf' | 'epub' | 'folder'
    userId: string
    semester?: number
    subject?: string
    lastOpened?: Date
}

export interface Resource extends Book {
    downloads: number
    rating: number
}

// Mock Data Store
let books: Book[] = [
    { id: '1', title: 'Data Structures', author: 'Prof. Cormen', progress: 45, type: 'pdf', userId: '1', lastOpened: new Date() },
    { id: '2', title: 'Circuit Theory', author: 'Boylestad', progress: 12, type: 'pdf', userId: '1', lastOpened: new Date(Date.now() - 86400000) },
    { id: '3', title: 'My Notes', author: 'Me', items: 12, progress: 0, type: 'folder', userId: '1' },
    { id: '4', title: 'Algorithm Design', author: 'Kleinberg', progress: 0, type: 'epub', userId: '1' }
]

let semesterResources: Resource[] = [
    { id: '101', title: 'Engineering Maths III', author: 'Dept. of Math', progress: 0, type: 'folder', userId: 'system', semester: 3, items: 5, downloads: 120, rating: 4.5 },
    { id: '102', title: 'Digital Logic', author: 'Dept. of ECE', progress: 0, type: 'folder', userId: 'system', semester: 3, items: 8, downloads: 85, rating: 4.2 },
    { id: '103', title: 'Signals & Systems', author: 'Dept. of ECE', progress: 0, type: 'folder', userId: 'system', semester: 3, items: 10, downloads: 200, rating: 4.8 },
]

// Service
export const mockBackend = {
    getBooks: async (userId: string): Promise<Book[]> => {
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network
        return books.filter(b => b.userId === userId)
    },

    getRecentBooks: async (userId: string): Promise<Book[]> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        return books
            .filter(b => b.userId === userId && b.lastOpened)
            .sort((a, b) => (b.lastOpened?.getTime() || 0) - (a.lastOpened?.getTime() || 0))
            .slice(0, 5)
    },

    getSemesterResources: async (semester: number): Promise<Resource[]> => {
        await new Promise(resolve => setTimeout(resolve, 600))
        return semesterResources.filter(r => r.semester === semester)
    },

    uploadBook: async (file: File, userId: string): Promise<Book> => {
        await new Promise(resolve => setTimeout(resolve, 1500))
        const newBook: Book = {
            id: Math.random().toString(36).substr(2, 9),
            title: file.name.replace(/\.[^/.]+$/, ""),
            author: 'Unknown',
            progress: 0,
            type: 'pdf',
            userId,
            lastOpened: new Date()
        }
        books = [newBook, ...books]
        return newBook
    },

    updateProgress: async (bookId: string, progress: number): Promise<void> => {
        books = books.map(b => b.id === bookId ? { ...b, progress, lastOpened: new Date() } : b)
    },

    deleteBook: async (bookId: string): Promise<void> => {
        books = books.filter(b => b.id !== bookId)
    }
}
