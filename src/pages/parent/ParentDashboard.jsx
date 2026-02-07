import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader, StatCard } from '../../components/Card';
import { GradeBadge } from '../../components/Badge';
import { Users, Bell, MessageSquare, TrendingUp, ChevronRight, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTeacherById, getSubjectById } from '../../data/dummyData';

export default function ParentDashboard() {
  const { currentUser, getParentChildren, getStudentGrades, getStudentNotes, getFilteredAnnouncements } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const children = getParentChildren(currentUser.id);
  const announcements = getFilteredAnnouncements('parents').slice(0, 3);

  const allNotes = children.flatMap(child => getStudentNotes(child.id));
  const unreadNotes = allNotes.filter(n => !n.isRead);

  const childrenWithStats = children.map(child => {
    const grades = getStudentGrades(child.id);
    const avg = grades.length > 0
      ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length
      : 0;
    return { ...child, avg, gradeCount: grades.length };
  });

  const overallAvg = childrenWithStats.length > 0
    ? childrenWithStats.reduce((s, c) => s + c.avg, 0) / childrenWithStats.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-emerald-200 text-sm">Parent Portal</p>
            <h1 className="text-2xl font-bold mt-1">Welcome, {currentUser.firstName}!</h1>
            <p className="text-emerald-100 mt-1">
              Monitor your children's academic progress and stay connected with teachers
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/20 rounded-lg px-4 py-3 text-center">
              <div className="text-2xl font-bold">{children.length}</div>
              <div className="text-xs text-emerald-100">Children</div>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-3 text-center">
              <div className="text-2xl font-bold">{unreadNotes.length}</div>
              <div className="text-xs text-emerald-100">New Notes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Children" value={children.length} color="green" />
        <StatCard icon={MessageSquare} label="Unread Notes" value={unreadNotes.length} color="yellow" />
        <StatCard icon={Bell} label="Announcements" value={announcements.length} color="blue" />
        <StatCard icon={TrendingUp} label="Avg Performance" value={`${overallAvg.toFixed(0)}%`} color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Children Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Users size={18} className="text-emerald-600" />
                My Children
              </h2>
              <button
                onClick={() => navigate('/parent/children')}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </CardHeader>
          <CardBody>
            {children.length > 0 ? (
              <div className="space-y-3">
                {childrenWithStats.map((child) => (
                  <div
                    key={child.id}
                    onClick={() => navigate('/parent/children')}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {child.firstName[0]}{child.lastName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {child.firstName} {child.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Grade {child.gradeLevel} | Class {child.className}
                      </p>
                    </div>
                    <div className="text-right">
                      <GradeBadge percentage={child.avg} />
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${child.attendance.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{child.attendance.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserPlus className="mx-auto mb-3 text-gray-300" size={40} />
                <h3 className="font-semibold text-gray-900">No children linked</h3>
                <p className="text-gray-500 text-sm mt-1">Add your children using their Student ID</p>
                <button
                  onClick={() => navigate('/parent/add-child')}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Child
                </button>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Bell size={18} className="text-amber-600" />
              Announcements
            </h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {announcements.map((ann) => (
                <div key={ann.id} className="px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900 text-sm">{ann.title}</h3>
                    {ann.priority === 'high' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-medium flex-shrink-0">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{ann.createdAt}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Teacher Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare size={18} className="text-purple-600" />
              Recent Teacher Notes
              {unreadNotes.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                  {unreadNotes.length} new
                </span>
              )}
            </h2>
            <button
              onClick={() => navigate('/parent/notes')}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {allNotes.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {allNotes.slice(0, 4).map((note) => {
                const child = children.find(c => c.id === note.studentId);
                const teacher = getTeacherById(note.teacherId);
                const subject = getSubjectById(note.subjectId);

                return (
                  <div
                    key={note.id}
                    className={`px-5 py-4 ${!note.isRead ? 'bg-blue-50/50' : ''} hover:bg-gray-50`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {child?.firstName} {child?.lastName}
                          </h3>
                          {!note.isRead && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs font-medium">New</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {subject?.name} - {teacher?.firstName} {teacher?.lastName}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        note.type === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                        note.type === 'concern' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{note.note}</p>
                    <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="mx-auto mb-2 text-gray-300" size={32} />
              <p>No teacher notes yet</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
