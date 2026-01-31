import { Home, University, BookOpen, MessageCircle, User, Bell, Calendar, FileText } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'colleges', label: 'Colleges', icon: University },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'aiAssistant', label: 'AI Hub', icon: MessageCircle },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
];

interface SidebarProps {
    activeTab: string;
    onTabChange: (id: string) => void;
    unreadCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, unreadCount }) => {
    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-slate-950 border-r border-slate-800 p-6 z-50">
            <div className="flex items-center space-x-3 mb-10 px-2 transition-transform hover:scale-105 cursor-pointer">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <University size={24} />
                </div>
                <span className="text-xl font-black tracking-tight text-white">College<span className="text-blue-400">Connect</span></span>
            </div>

            <nav className="flex-grow space-y-1">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={cn(
                                "w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300 group",
                                isActive
                                    ? "bg-blue-500/10 text-blue-400 shadow-sm"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg transition-colors",
                                isActive ? "bg-blue-600 text-white shadow-md shadow-blue-600/40" : "bg-slate-900 text-slate-500 group-hover:bg-slate-800 group-hover:text-slate-300"
                            )}>
                                <Icon size={20} />
                            </div>
                            <span>{item.label}</span>
                            {item.id === 'notifications' && unreadCount > 0 && (
                                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto p-4 bg-slate-900/50 rounded-3xl border border-slate-800">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-slate-800 shadow-sm overflow-hidden">
                        <img src="https://placehold.co/40x40/6366f1/ffffff?text=SS" alt="User" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-200 truncate">Sunny S.</p>
                        <p className="text-[10px] text-slate-500 font-medium">IIT Bombay</p>
                    </div>
                </div>
                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-all">
                    <span>Go Pro</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
