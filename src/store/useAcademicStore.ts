import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Course {
    id: string
    code: string
    name: string
    professor: string
    schedule: string // e.g. "Mon, Wed 10:00 AM"
    color: string
    progress: number
}

export interface Assignment {
    id: string
    courseId: string
    title: string
    dueDate: string // ISO date string
    status: 'Pending' | 'Urgent' | 'Done'
    type: 'Assignment' | 'Exam' | 'Project'
}

export interface SemesterGrade {
    semester: string
    gpa: number
}

interface AcademicState {
    // State
    courses: Course[]
    assignments: Assignment[]
    grades: SemesterGrade[]
    currentGpa: number

    // Actions
    addAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void
    toggleAssignmentStatus: (id: string) => void
    removeAssignment: (id: string) => void
    updateGpa: (grade: SemesterGrade) => void
}

export const useAcademicStore = create<AcademicState>()(
    persist(
        (set) => ({
            // Initial Mock Data
            courses: [
                { id: 'c1', code: 'CS301', name: 'Advanced Python', professor: 'Dr. Smith', schedule: 'Mon, Wed 10:00 AM', color: 'bg-blue-500', progress: 75 },
                { id: 'c2', code: 'CS302', name: 'Database Management', professor: 'Prof. Johnson', schedule: 'Tue, Thu 02:00 PM', color: 'bg-green-500', progress: 60 },
                { id: 'c3', code: 'CS303', name: 'Web Development', professor: 'Dr. Williams', schedule: 'Fri 11:00 AM', color: 'bg-purple-500', progress: 90 },
            ],
            assignments: [
                { id: 'a1', courseId: 'c2', title: 'Database Schema', dueDate: new Date(Date.now() + 86400000).toISOString(), status: 'Urgent', type: 'Project' },
                { id: 'a2', courseId: 'c3', title: 'React Hooks Essay', dueDate: new Date(Date.now() + 172800000).toISOString(), status: 'Pending', type: 'Assignment' },
                { id: 'a3', courseId: 'c1', title: 'AI Ethics Paper', dueDate: new Date(Date.now() - 86400000).toISOString(), status: 'Done', type: 'Assignment' },
            ],
            grades: [
                { semester: 'Sem 1', gpa: 7.8 },
                { semester: 'Sem 2', gpa: 8.2 },
                { semester: 'Sem 3', gpa: 8.5 },
                { semester: 'Sem 4', gpa: 8.3 },
                { semester: 'Sem 5', gpa: 8.9 },
            ],
            currentGpa: 8.9,

            // Actions
            addAssignment: (assignment) => set((state) => ({
                assignments: [...state.assignments, {
                    ...assignment,
                    id: Date.now().toString(),
                    status: 'Pending'
                }]
            })),

            toggleAssignmentStatus: (id) => set((state) => ({
                assignments: state.assignments.map(a =>
                    a.id === id
                        ? { ...a, status: a.status === 'Done' ? 'Pending' : 'Done' }
                        : a
                )
            })),

            removeAssignment: (id) => set((state) => ({
                assignments: state.assignments.filter(a => a.id !== id)
            })),

            updateGpa: (grade) => set((state) => {
                const existing = state.grades.findIndex(g => g.semester === grade.semester)
                let newGrades = [...state.grades]
                if (existing >= 0) {
                    newGrades[existing] = grade
                } else {
                    newGrades.push(grade)
                }
                return { grades: newGrades, currentGpa: grade.gpa } // Simplified current GPA
            })

        }),
        {
            name: 'academic-storage',
        }
    )
)
