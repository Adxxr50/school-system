import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader, StatCard } from '../../components/Card';
import { StatusBadge } from '../../components/Badge';
import { Users, BookOpen, GraduationCap, Bell, FileText, AlertCircle, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { currentUser, studentsData, teachersData, subjectsData, announcementsData, complaintsData } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const pendingComplaints = complaintsData.filter(c => c.status === 'pending');
  const recentAnnouncements = announcementsData.slice(0, 3);

  const resolvedCount = complaintsData.filter(c => c.status === 'resolved').length;
  const resolutionRate = complaintsData.length > 0 ? Math.round((resolvedCount / complaintsData.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-rose-200 text-sm">Admin Portal</p>
            <h1 className="text-2xl font-bold mt-1">Welcome, {currentUser.firstName}!</h1>
            <p className="text-rose-100 mt-1">
              {currentUser.role} | Sunrise Academy Administration
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/20 rounded-lg px-4 py-3 text-center">
              <div className="text-2xl font-bold">{pendingComplaints.length}</div>
              <div className="text-xs text-rose-100">Pending Issues</div>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-3 text-center">
              <div className="text-2xl font-bold">{resolutionRate}%</div>
              <div className="text-xs text-rose-100">Resolution Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Total Students" value={studentsData.length} color="blue" />
        <StatCard icon={Users} label="Teachers" value={teachersData.length} color="purple" />
        <StatCard icon={BookOpen} label="Subjects" value={subjectsData.length} color="green" />
        <StatCard icon={AlertCircle} label="Pending Issues" value={pendingComplaints.length} color="yellow" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Quick Actions</h2>
          </CardHeader>
          <CardBody>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/admin/announcements')}
                className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Bell className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Create Announcement</h3>
                  <p className="text-sm text-gray-500">Notify students, teachers, and parents</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/complaints')}
                className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <FileText className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Handle Complaints</h3>
                  <p className="text-sm text-gray-500">{pendingComplaints.length} pending complaints</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/teachers')}
                className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Teachers</h3>
                  <p className="text-sm text-gray-500">{teachersData.length} teachers registered</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/subjects')}
                className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Subjects</h3>
                  <p className="text-sm text-gray-500">{subjectsData.length} active subjects</p>
                </div>
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Bell size={18} className="text-blue-600" />
              Recent Announcements
            </h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {recentAnnouncements.map((ann) => (
                <div key={ann.id} className="px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900 text-sm">{ann.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                      ann.priority === 'high' ? 'bg-red-100 text-red-600' :
                      ann.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {ann.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{ann.createdAt}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Pending Complaints */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileText size={18} className="text-amber-600" />
              Pending Complaints
              {pendingComplaints.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full text-xs font-semibold">
                  {pendingComplaints.length}
                </span>
              )}
            </h2>
            <button
              onClick={() => navigate('/admin/complaints')}
              className="text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {pendingComplaints.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {pendingComplaints.slice(0, 5).map((complaint) => (
                <div key={complaint.id} className="px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{complaint.subject}</h3>
                      <p className="text-sm text-gray-500">Parent ID: {complaint.parentId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        complaint.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {complaint.priority}
                      </span>
                      <StatusBadge status={complaint.status} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{complaint.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{complaint.createdAt}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <AlertCircle className="mx-auto mb-2 text-gray-300" size={32} />
              <p>No pending complaints</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-600" />
            System Overview
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{studentsData.length}</div>
              <div className="text-sm text-gray-600 mt-1">Active Students</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{teachersData.length}</div>
              <div className="text-sm text-gray-600 mt-1">Faculty Members</div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-3xl font-bold text-emerald-600">{announcementsData.length}</div>
              <div className="text-sm text-gray-600 mt-1">Announcements</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-3xl font-bold text-amber-600">{resolvedCount}/{complaintsData.length}</div>
              <div className="text-sm text-gray-600 mt-1">Issues Resolved</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
