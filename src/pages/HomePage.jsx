import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, Users, BookOpen, Shield, ArrowRight, Zap } from 'lucide-react';

const roles = [
  {
    type: 'student',
    title: 'Student',
    description: 'View your subjects, grades, schedule, and academic progress',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-blue-600',
    bgHover: 'hover:bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    type: 'parent',
    title: 'Parent',
    description: "Monitor your children's performance, grades, and teacher feedback",
    icon: Users,
    gradient: 'from-emerald-500 to-emerald-600',
    bgHover: 'hover:bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    type: 'teacher',
    title: 'Teacher',
    description: 'Manage subjects, grade students, record attendance, and add notes',
    icon: BookOpen,
    gradient: 'from-violet-500 to-violet-600',
    bgHover: 'hover:bg-violet-50',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-200',
  },
  {
    type: 'admin',
    title: 'Administrator',
    description: 'Manage announcements, teachers, subjects, and handle complaints',
    icon: Shield,
    gradient: 'from-rose-500 to-rose-600',
    bgHover: 'hover:bg-rose-50',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { loginAs } = useApp();

  const handleRoleSelect = (roleType) => {
    loginAs(roleType);
    navigate(`/${roleType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="pt-16 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white" size={32} />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900">Sunrise Academy</h1>
              <p className="text-purple-600 font-medium">School Management System</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome to Your Learning Portal
          </h2>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            Select your account type to access your personalized dashboard.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Role selection cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {roles.map((role) => (
              <button
                key={role.type}
                onClick={() => handleRoleSelect(role.type)}
                className={`group relative bg-white border-2 ${role.borderColor} rounded-xl p-6 text-left transition-all duration-200 hover:shadow-lg ${role.bgHover}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${role.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                    <role.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      {role.title}
                      <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${role.textColor}`} />
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{role.description}</p>
                    <div className={`mt-3 inline-flex items-center gap-1 text-sm font-medium ${role.textColor}`}>
                      <Zap size={14} />
                      Click to continue
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Students', value: '8', color: 'blue' },
              { label: 'Teachers', value: '5', color: 'purple' },
              { label: 'Subjects', value: '8', color: 'emerald' },
              { label: 'Parents', value: '7', color: 'orange' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Demo notice */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <p className="text-amber-700 text-sm">
                <strong>Demo Mode</strong> — Authentication bypassed for testing
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
