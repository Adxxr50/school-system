import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import Badge from '../../components/Badge';
import {
  User, Mail, Phone, MapPin, Calendar, Heart, AlertCircle,
  GraduationCap, BookOpen, Clock
} from 'lucide-react';

export default function StudentProfile() {
  const { currentUser, getStudentSubjects, getStudentGrades } = useApp();

  if (!currentUser) return null;

  const subjects = getStudentSubjects(currentUser.id);
  const grades = getStudentGrades(currentUser.id);

  // Calculate overall stats
  const overallAvg = grades.length > 0
    ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length
    : 0;

  const getLetterGrade = (avg) => {
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    if (avg >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">View and manage your student information</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card className="lg:col-span-1">
          <CardBody className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {currentUser.firstName} {currentUser.lastName}
            </h2>
            <p className="text-gray-500">Student ID: {currentUser.id}</p>
            <div className="mt-4 flex justify-center gap-2">
              <Badge variant="primary">Grade {currentUser.gradeLevel}</Badge>
              <Badge variant="success">Class {currentUser.className}</Badge>
            </div>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{subjects.length}</p>
                <p className="text-xs text-gray-500">Subjects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{getLetterGrade(overallAvg)}</p>
                <p className="text-xs text-gray-500">Grade</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{currentUser.attendance.percentage}%</p>
                <p className="text-xs text-gray-500">Attendance</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Personal Information</h2>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-2 gap-6">
              <InfoItem icon={Mail} label="Email" value={currentUser.email} />
              <InfoItem icon={Phone} label="Phone" value={currentUser.phone} />
              <InfoItem icon={MapPin} label="Address" value={currentUser.address} />
              <InfoItem
                icon={Calendar}
                label="Date of Birth"
                value={new Date(currentUser.dateOfBirth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
              <InfoItem icon={User} label="Gender" value={currentUser.gender} />
              <InfoItem icon={User} label="Age" value={`${currentUser.age} years old`} />
              <InfoItem icon={Heart} label="Blood Type" value={currentUser.bloodType} />
              <InfoItem
                icon={AlertCircle}
                label="Allergies"
                value={currentUser.allergies.length > 0 ? currentUser.allergies.join(', ') : 'None'}
              />
            </div>
          </CardBody>
        </Card>

        {/* Academic Information */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Academic Information</h2>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-4 gap-6">
              <InfoItem
                icon={GraduationCap}
                label="Grade Level"
                value={`Grade ${currentUser.gradeLevel}`}
              />
              <InfoItem
                icon={BookOpen}
                label="Class"
                value={currentUser.className}
              />
              <InfoItem
                icon={Calendar}
                label="Enrollment Date"
                value={new Date(currentUser.enrollmentDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
              <InfoItem
                icon={User}
                label="Status"
                value={currentUser.status}
              />
            </div>
          </CardBody>
        </Card>

        {/* Attendance Summary */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Attendance Summary</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{currentUser.attendance.totalDays}</p>
                <p className="text-sm text-gray-500">Total Days</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{currentUser.attendance.present}</p>
                <p className="text-sm text-gray-500">Present</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{currentUser.attendance.absent}</p>
                <p className="text-sm text-gray-500">Absent</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{currentUser.attendance.late}</p>
                <p className="text-sm text-gray-500">Late</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{currentUser.attendance.percentage}%</p>
                <p className="text-sm text-gray-500">Attendance Rate</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Attendance Progress</span>
                <span className="text-sm font-medium text-gray-900">{currentUser.attendance.percentage}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  style={{ width: `${currentUser.attendance.percentage}%` }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Emergency Contact */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Emergency Contact</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="text-red-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{currentUser.emergencyContact}</p>
                <p className="text-sm text-gray-500">Emergency Contact</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon size={18} className="text-gray-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
