import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/screens/Dashboard';
import Colleges from './components/screens/Colleges';
import Courses from './components/screens/Courses';
import Chat from './components/screens/Chat';
import Profile from './components/screens/Profile';
import AIAssistant from './components/screens/AIAssistant';
import Events from './components/screens/Events';
import Materials from './components/screens/Materials';
import { SCREEN_TITLES } from './constants';
import { Search, Settings } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [unreadCount] = useState(3);

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" onNavigate={setActiveTab} />;
      case 'colleges':
        return <Colleges key="colleges" onSelectCollege={(id) => console.log('Select college', id)} />;
      case 'courses':
        return <Courses key="courses" onSelectCourse={(id) => console.log('Select course', id)} />;
      case 'chat':
        return <Chat key="chat" onSelectChat={(id) => console.log('Select chat', id)} />;
      case 'aiAssistant':
        return <AIAssistant key="aiAssistant" />;
      case 'profile':
        return <Profile key="profile" />;
      case 'events':
        return <Events key="events" />;
      case 'materials':
        return <Materials key="materials" />;
      case 'notifications':
        return (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/10 mb-6">
              <i className="fas fa-bell text-4xl"></i>
            </div>
            <h3 className="text-2xl font-black text-white">Stay Tuned!</h3>
            <p className="text-slate-400 mt-2 max-w-xs mx-auto">You're all caught up for now. We'll notify you when interesting things happen.</p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all hover:-translate-y-1"
            >
              Back to Home
            </button>
          </motion.div>
        );
      default:
        return <Dashboard key="dashboard" onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex bg-[#020617] min-h-screen text-slate-200">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} unreadCount={unreadCount} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen lg:ml-72 transition-all duration-300">
        {/* Mobile TopBar - Hidden on LG */}
        <div className="lg:hidden">
          <TopBar
            title={SCREEN_TITLES[activeTab] || 'College Connect'}
            onSearchClick={() => console.log('Search clicked')}
            onNotificationsClick={() => setActiveTab('notifications')}
            unreadCount={unreadCount}
          />
        </div>

        {/* Desktop Header - Only on LG */}
        <header className="hidden lg:flex items-center justify-between px-10 py-6 sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md border-b border-slate-900">
          <h1 className="text-3xl font-black text-white tracking-tight">{SCREEN_TITLES[activeTab]}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-12 pr-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl w-64 focus:w-80 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm text-slate-200"
              />
            </div>
            <button className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-blue-400 hover:border-blue-900/50 transition-all shadow-sm">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <main className="flex-grow px-4 lg:px-10 pt-4 pb-32 lg:pb-10 max-w-7xl mx-auto w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Bottom Nav - Hidden on LG */}
        <div className="lg:hidden">
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
