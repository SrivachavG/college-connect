import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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

            login: async (email: string, password: string) => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Demo login - accept any credentials
                const user: User = {
                    id: '1',
                    name: 'SRI VACHAV',
                    email,
                    role: 'student'
                }

                set({ user, isAuthenticated: true })
                return true
            },

            signup: async (name: string, email: string, password: string, role: 'student' | 'teacher') => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                const user: User = {
                    id: Date.now().toString(),
                    name,
                    email,
                    role
                }

                set({ user, isAuthenticated: true })
                return true
            },

            logout: () => {
                set({ user: null, isAuthenticated: false })
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
