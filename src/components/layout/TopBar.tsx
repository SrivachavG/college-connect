import React from 'react';
import { Search, Bell } from 'lucide-react';

interface TopBarProps {
    title: string;
    onSearchClick: () => void;
    onNotificationsClick: () => void;
    unreadCount?: number;
}

const TopBar: React.FC<TopBarProps> = ({ title, onSearchClick, onNotificationsClick, unreadCount = 0 }) => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-sm">
            <h1 className="text-xl font-black text-white tracking-tight transition-all duration-300">{title}</h1>
            <div className="flex items-center space-x-3">
                <button
                    onClick={onSearchClick}
                    className="p-2 text-slate-400 transition-colors rounded-full hover:bg-slate-800 hover:text-blue-400 focus:outline-none"
                    aria-label="Search"
                >
                    <Search size={22} />
                </button>
                <button
                    onClick={onNotificationsClick}
                    className="relative p-2 text-slate-400 transition-colors rounded-full hover:bg-slate-800 hover:text-blue-400 focus:outline-none"
                    aria-label="Notifications"
                >
                    <Bell size={22} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 block h-3 w-3 rounded-full bg-red-500 border-2 border-slate-950" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default TopBar;
