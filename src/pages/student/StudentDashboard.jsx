import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader, StatCard } from '../../components/Card';
import { GradeBadge } from '../../components/Badge';
import { BookOpen, BarChart2, Calendar, Bell, Clock, TrendingUp, ChevronRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { schedule } from '../../data/dummyData';

export default function StudentDashboard() {
  const { currentUser, getStudentSubjects, getStudentGrades, getFilteredAnnouncements } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const subjects = getStudentSubjects(currentUser.id);
  const grades = getStudentGrades(currentUser.id);
  const announcements = getFilteredAnnouncements('students').slice(0, 3);

  const overallAvg = grades.length > 0
    ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length
    : 0;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = schedule[currentUser.className]?.find(s => s.day === today)?.periods || [];

  return (
    <div className="space-y-5">
      {/* Welcome section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Welcome back, {currentUser.firstName}!</h1>
        <p className="text-sm text-gray-500 mt-1">
          Class {currentUser.className} · Grade {currentUser.gradeLevel}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={BookOpen} label="Subjects" value={subjects.length} color="blue" />
        <StatCard icon={BarChart2} label="Average" value={overallAvg.toFixed(0)} color="green" />
        <StatCard icon={Calendar} label="Attendance" value={`${currentUser.attendance.percentage}%`} color="purple" />
        <StatCard icon={TrendingUp} label="Present" value={`${currentUser.attendance.present}/${currentUser.attendance.totalDays}`} color="yellow" />
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900 flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              Today's Schedule
            </h2>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{today}</span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {todaySchedule.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {todaySchedule.map((period, idx) => (
                <div key={idx} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
                  <div className="w-14 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-900">{period.time.split('-')[0]}</span>
                    <span className="block text-xs text-gray-400">{period.time.split('-')[1]}</span>
                  </div>
                  <div className="w-0.5 h-8 bg-sky-400 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{period.subject}</p>
                    <p className="text-xs text-gray-500">{period.room} · {period.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Calendar className="mx-auto mb-2 text-gray-300" size={28} />
              <p className="text-sm">No classes scheduled for today</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <h2 className="font-medium text-gray-900 flex items-center gap-2">
            <Bell size={16} className="text-gray-400" />
            Announcements
          </h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-100">
            {announcements.map((ann) => (
              <div key={ann.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-900 text-sm">{ann.title}</h3>
                  {ann.priority === 'high' && (
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-medium flex-shrink-0">
                      Important
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                <p className="text-xs text-gray-400 mt-1.5">{ann.createdAt}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Grades */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900 flex items-center gap-2">
              <Award size={16} className="text-gray-400" />
              Recent Grades
            </h2>
            <button
              onClick={() => navigate('/student/grades')}
              className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-100">
            {grades.slice(0, 5).map((grade) => {
              const subject = subjects.find(s => s.id === grade.subjectId);
              const percentage = (grade.score / grade.maxScore) * 100;
              return (
                <div key={grade.id} className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm">{grade.assignment}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{subject?.name || 'Unknown'} · {grade.date}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-3">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">{grade.score}</span>
                        <span className="text-gray-400">/{grade.maxScore}</span>
                      </span>
                      <GradeBadge percentage={percentage} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
