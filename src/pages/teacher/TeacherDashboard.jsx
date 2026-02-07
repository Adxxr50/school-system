import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader, StatCard } from '../../components/Card';
import Badge, { StatusBadge } from '../../components/Badge';
import { BookOpen, Users, ClipboardList, MessageSquare, Calendar, Sparkles, ChevronRight, Pen, CheckSquare, FileEdit, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const {
    currentUser,
    getTeacherSubjects,
    getSubjectStudents,
    gradesData,
    notesData,
    attendanceData,
    getFilteredAnnouncements
  } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const subjects = getTeacherSubjects(currentUser.id);
  const announcements = getFilteredAnnouncements('teachers').slice(0, 3);

  // Calculate total students across all subjects
  const allStudentIds = new Set(subjects.flatMap(s => s.studentIds));
  const totalStudents = allStudentIds.size;

  // Get grades added by this teacher (simplified for demo)
  const recentGrades = gradesData.slice(-5);

  // Get notes by this teacher
  const myNotes = notesData.filter(n => n.teacherId === currentUser.id);

  // Today's classes
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Subject colors
  const subjectColors = [
    'from-purple-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-600 rounded-2xl p-6 md:p-8 text-white">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-100 text-sm mb-2">
              <GraduationCap size={16} />
              <span>Teacher Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome, {currentUser.firstName}!</h1>
            <p className="text-purple-100 mt-2">
              {currentUser.department} Department | {currentUser.experience} experience
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold">{subjects.length}</div>
              <div className="text-xs text-purple-100 mt-1">Subjects</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold">{totalStudents}</div>
              <div className="text-xs text-purple-100 mt-1">Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="My Subjects"
          value={subjects.length}
          color="purple"
        />
        <StatCard
          icon={Users}
          label="Total Students"
          value={totalStudents}
          color="blue"
        />
        <StatCard
          icon={ClipboardList}
          label="Grades Given"
          value={gradesData.length}
          color="green"
        />
        <StatCard
          icon={MessageSquare}
          label="Notes Written"
          value={myNotes.length}
          color="yellow"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Subjects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen size={18} className="text-purple-600" />
                </div>
                My Subjects
              </h2>
              <button
                onClick={() => navigate('/teacher/subjects')}
                className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium group"
              >
                View All
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {subjects.map((subject, idx) => {
                const studentCount = subject.studentIds.length;
                const colorClass = subjectColors[idx % subjectColors.length];

                return (
                  <div
                    key={subject.id}
                    className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/30 rounded-xl cursor-pointer hover:from-purple-50 hover:to-purple-100/30 transition-all duration-300 hover:shadow-md"
                    onClick={() => navigate('/teacher/subjects')}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      <BookOpen size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">{subject.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {subject.code} | Grade {subject.gradeLevel}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        <Users size={14} />
                        {studentCount}
                      </span>
                      <p className="text-xs text-gray-500 mt-2">{subject.schedule}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-purple-500 transition-colors" />
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Calendar size={18} className="text-amber-600" />
              </div>
              Announcements
            </h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {announcements.map((ann) => (
                <div key={ann.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">{ann.title}</h3>
                    {ann.priority === 'high' && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-medium">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{ann.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{ann.createdAt}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card
          hover
          className="cursor-pointer group"
          onClick={() => navigate('/teacher/grades')}
        >
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                <ClipboardList className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">Grade Students</h3>
                <p className="text-sm text-gray-500">Add or update student grades</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </CardBody>
        </Card>

        <Card
          hover
          className="cursor-pointer group"
          onClick={() => navigate('/teacher/attendance')}
        >
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <CheckSquare className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Take Attendance</h3>
                <p className="text-sm text-gray-500">Record student attendance</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
          </CardBody>
        </Card>

        <Card
          hover
          className="cursor-pointer group"
          onClick={() => navigate('/teacher/notes')}
        >
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                <FileEdit className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">Student Notes</h3>
                <p className="text-sm text-gray-500">Add notes for parents</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-amber-500 transition-colors" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Notes */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MessageSquare size={18} className="text-amber-600" />
            </div>
            My Recent Notes
          </h2>
        </CardHeader>
        <CardBody className="p-0">
          {myNotes.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {myNotes.slice(0, 4).map((note) => {
                const noteTypeColors = {
                  positive: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-l-emerald-500' },
                  concern: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-l-amber-500' },
                  neutral: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-l-gray-400' },
                };
                const colors = noteTypeColors[note.type] || noteTypeColors.neutral;

                return (
                  <div key={note.id} className={`px-6 py-4 border-l-4 ${colors.border} hover:bg-gray-50/50 transition-colors`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Student: {note.studentId}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{note.note}</p>
                    <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-500 font-medium">No notes added yet</p>
              <p className="text-sm text-gray-400 mt-1">Start adding notes for your students</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
