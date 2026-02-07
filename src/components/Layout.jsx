import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, User, BookOpen, Users, FileText, Bell,
  LogOut, GraduationCap, ClipboardList, MessageSquare,
  Calendar, BarChart2, UserPlus, CheckSquare
} from 'lucide-react';
import Toast from './Toast';

const navigationItems = {
  student: [
    { path: '/student', icon: Home, label: 'Home' },
    { path: '/student/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/student/grades', icon: BarChart2, label: 'Grades' },
    { path: '/student/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/student/profile', icon: User, label: 'Profile' },
  ],
  parent: [
    { path: '/parent', icon: Home, label: 'Home' },
    { path: '/parent/children', icon: Users, label: 'Children' },
    { path: '/parent/grades', icon: BarChart2, label: 'Grades' },
    { path: '/parent/notes', icon: MessageSquare, label: 'Notes' },
    { path: '/parent/complaints', icon: FileText, label: 'Complaints' },
  ],
  teacher: [
    { path: '/teacher', icon: Home, label: 'Home' },
    { path: '/teacher/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/teacher/grades', icon: ClipboardList, label: 'Grades' },
    { path: '/teacher/attendance', icon: CheckSquare, label: 'Attendance' },
    { path: '/teacher/notes', icon: MessageSquare, label: 'Notes' },
  ],
  admin: [
    { path: '/admin', icon: Home, label: 'Home' },
    { path: '/admin/announcements', icon: Bell, label: 'Announce' },
    { path: '/admin/teachers', icon: Users, label: 'Teachers' },
    { path: '/admin/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/admin/complaints', icon: FileText, label: 'Complaints' },
  ],
};

const roleConfig = {
  student: {
    headerBg: 'bg-slate-800',
    accentColor: 'text-sky-500',
    activeColor: 'text-sky-600',
    activeBg: 'bg-sky-50',
    label: 'Student',
  },
  parent: {
    headerBg: 'bg-slate-800',
    accentColor: 'text-teal-500',
    activeColor: 'text-teal-600',
    activeBg: 'bg-teal-50',
    label: 'Parent',
  },
  teacher: {
    headerBg: 'bg-slate-800',
    accentColor: 'text-indigo-500',
    activeColor: 'text-indigo-600',
    activeBg: 'bg-indigo-50',
    label: 'Teacher',
  },
  admin: {
    headerBg: 'bg-slate-800',
    accentColor: 'text-amber-500',
    activeColor: 'text-amber-600',
    activeBg: 'bg-amber-50',
    label: 'Admin',
  },
};

export default function Layout({ children }) {
  const { userType, currentUser, logout, toasts } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = navigationItems[userType] || [];
  const config = roleConfig[userType] || roleConfig.student;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header - Clean dark design */}
      <header className={`${config.headerBg} px-5 sm:px-8 lg:px-12 py-4 sticky top-0 z-30`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <GraduationCap size={20} className={config.accentColor} />
            </div>
            <div>
              <h1 className="font-semibold text-white text-base">Sunrise Academy</h1>
              <p className={`text-xs ${config.accentColor}`}>{config.label}</p>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-sm text-white">{currentUser.firstName} {currentUser.lastName}</p>
                <p className="text-xs text-gray-400">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                title="Switch Account"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '20px 16px 100px 16px', maxWidth: '700px', margin: '0 auto' }}>
        {children}
      </main>

      {/* Bottom Navigation - Clean white design */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-1.5 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? `${config.activeColor} ${config.activeBg}`
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toast notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
