import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Colleges from './pages/Colleges'
import Courses from './pages/Courses'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Tools from './pages/Tools'
import Events from './pages/Events'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={
                            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
                        } />
                        <Route path="/signup" element={
                            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
                        } />

                        {/* Protected Routes */}
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="colleges" element={<Colleges />} />
                            <Route path="courses" element={<Courses />} />
                            <Route path="chat" element={<Chat />} />
                            <Route path="events" element={<Events />} />
                            <Route path="tools" element={<Tools />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        duration: 3000,
                        className: 'dark:bg-gray-800 dark:text-white',
                        style: {
                            background: '#1A202C',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                        },
                    }}
                />
            </div>
        </QueryClientProvider>
    )
}

export default App
