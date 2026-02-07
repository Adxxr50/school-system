import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import Badge, { StatusBadge, GradeBadge } from '../../components/Badge';
import Button from '../../components/Button';
import { Input, Select } from '../../components/Input';
import Modal from '../../components/Modal';
import { GraduationCap, Search, Filter, Eye, Mail, Phone, Calendar, User } from 'lucide-react';

export default function AdminStudents() {
  const { studentsData, getStudentGrades, getStudentSubjects } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  let filteredStudents = studentsData.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (gradeFilter) {
    filteredStudents = filteredStudents.filter(s => s.gradeLevel.toString() === gradeFilter);
  }

  const grades = [...new Set(studentsData.map(s => s.gradeLevel))].sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
          <p className="text-gray-600 mt-1">View all registered students</p>
        </div>
        <Button icon={GraduationCap} variant="secondary">
          Add Student (Demo)
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              className="flex-1"
            />
            <Select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              options={grades.map(g => ({ value: g.toString(), label: `Grade ${g}` }))}
              placeholder="All Grades"
              className="w-40"
            />
          </div>
        </CardBody>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-blue-600">{studentsData.length}</p>
            <p className="text-sm text-gray-500">Total Students</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-green-600">
              {studentsData.filter(s => s.status === 'Active').length}
            </p>
            <p className="text-sm text-gray-500">Active</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-purple-600">{grades.length}</p>
            <p className="text-sm text-gray-500">Grade Levels</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-yellow-600">
              {(studentsData.reduce((sum, s) => sum + s.attendance.percentage, 0) / studentsData.length).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-500">Avg Attendance</p>
          </CardBody>
        </Card>
      </div>

      {/* Students table */}
      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Class</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Attendance</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{student.id}</td>
                    <td className="px-4 py-3">
                      <Badge variant="primary">Grade {student.gradeLevel}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{student.className}</td>
                    <td className="px-4 py-3">
                      <Badge variant={student.attendance.percentage >= 90 ? 'success' : student.attendance.percentage >= 75 ? 'warning' : 'danger'}>
                        {student.attendance.percentage}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={student.status.toLowerCase()} />
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedStudent(student)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No students found matching your criteria
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Student details modal */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title="Student Details"
        size="lg"
      >
        {selectedStudent && (
          <StudentDetailsContent
            student={selectedStudent}
            getStudentGrades={getStudentGrades}
            getStudentSubjects={getStudentSubjects}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function StudentDetailsContent({ student, getStudentGrades, getStudentSubjects, onClose }) {
  const grades = getStudentGrades(student.id);
  const subjects = getStudentSubjects(student.id);

  const overallAvg = grades.length > 0
    ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
          {student.firstName[0]}{student.lastName[0]}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-gray-500">ID: {student.id}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="primary">Grade {student.gradeLevel}</Badge>
            <Badge variant="success">Class {student.className}</Badge>
            <StatusBadge status={student.status.toLowerCase()} />
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xl font-bold text-blue-600">{subjects.length}</p>
          <p className="text-xs text-gray-500">Subjects</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xl font-bold text-green-600">{overallAvg.toFixed(0)}%</p>
          <p className="text-xs text-gray-500">Average</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xl font-bold text-purple-600">{student.attendance.percentage}%</p>
          <p className="text-xs text-gray-500">Attendance</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-400" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-400" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-gray-400" />
              <span>{student.address}</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Personal Information</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Date of Birth:</span> {student.dateOfBirth}</p>
            <p><span className="text-gray-500">Age:</span> {student.age} years</p>
            <p><span className="text-gray-500">Gender:</span> {student.gender}</p>
            <p><span className="text-gray-500">Blood Type:</span> {student.bloodType}</p>
          </div>
        </div>
      </div>

      {/* Attendance breakdown */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Attendance Record</h3>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{student.attendance.totalDays}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="p-2 bg-green-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">{student.attendance.present}</p>
            <p className="text-xs text-gray-500">Present</p>
          </div>
          <div className="p-2 bg-red-50 rounded-lg">
            <p className="text-lg font-bold text-red-600">{student.attendance.absent}</p>
            <p className="text-xs text-gray-500">Absent</p>
          </div>
          <div className="p-2 bg-yellow-50 rounded-lg">
            <p className="text-lg font-bold text-yellow-600">{student.attendance.late}</p>
            <p className="text-xs text-gray-500">Late</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
