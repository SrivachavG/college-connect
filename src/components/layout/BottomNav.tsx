import React from 'react';
import { Home, BookOpen, MessageCircle, User, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'aiAssistant', label: 'AI Hub', icon: Sparkles },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
];

interface BottomNavProps {
    activeTab: string;
    onTabChange: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-[100]">
            <div className="flex items-center justify-around p-2 bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-full">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={cn(
                                "group relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                                isActive ? "bg-blue-600 text-white shadow-lg scale-110 -translate-y-1" : "text-slate-500 hover:text-blue-400"
                            )}
                        >
                            <Icon size={isActive ? 20 : 22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={cn(
                                "absolute -bottom-6 text-[10px] font-bold transition-opacity duration-300 whitespace-nowrap",
                                isActive ? "opacity-100" : "opacity-0"
                            )}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
