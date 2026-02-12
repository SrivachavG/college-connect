import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    name: string
    email: string
    role: 'student' | 'teacher'
}

interface AuthStore {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    signup: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>
    logout: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (email, password) => {
                // Mock login logic
                if (email && password) {
                    set({
                        user: {
                            id: '1',
                            name: 'Test Student',
                            email: email,
                            role: 'student'
                        },
                        isAuthenticated: true
                    })
                    return true
                }
                return false
            },

            signup: async (name, email, password, role) => {
                // Mock signup logic
                set({
                    user: {
                        id: '1',
                        name: name,
                        email: email,
                        role: role
                    },
                    isAuthenticated: true
                })
                return true
            },

            logout: () => {
                set({ user: null, isAuthenticated: false })
            }
        }),
        {
            name: 'auth-storage', // unique name for localStorage key
        }
    )
)
