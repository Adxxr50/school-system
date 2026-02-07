import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Select } from '../../components/Input';
import Button from '../../components/Button';
import Badge, { StatusBadge } from '../../components/Badge';
import { CheckSquare, Calendar, Users, Check, X, Clock } from 'lucide-react';

export default function TeacherAttendance() {
  const {
    currentUser,
    getTeacherSubjects,
    getSubjectStudents,
    recordAttendance,
    attendanceData
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendance, setAttendance] = useState({});

  if (!currentUser) return null;

  const subjects = getTeacherSubjects(currentUser.id);
  const activeSubject = subjects.find(s => s.id === selectedSubject);
  const students = activeSubject ? getSubjectStudents(activeSubject.id) : [];

  const today = new Date().toISOString().split('T')[0];

  // Check if attendance already taken today for this subject
  const todayAttendance = selectedSubject
    ? attendanceData.filter(a => a.subjectId === selectedSubject && a.date === today)
    : [];

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = () => {
    if (!selectedSubject) return;

    const records = students.map(student => ({
      studentId: student.id,
      subjectId: selectedSubject,
      status: attendance[student.id] || 'present'
    }));

    recordAttendance(records);
    setAttendance({});
  };

  const statusOptions = [
    { value: 'present', label: 'Present', color: 'bg-green-500' },
    { value: 'absent', label: 'Absent', color: 'bg-red-500' },
    { value: 'late', label: 'Late', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Take Attendance</h1>
        <p className="text-gray-600 mt-1">Record student attendance for your subjects</p>
      </div>

      {/* Subject selector */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span className="font-medium">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex-1">
              <Select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setAttendance({});
                }}
                options={subjects.map(s => ({ value: s.id, label: `${s.name} (${s.code})` }))}
                placeholder="Select Subject"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Attendance form */}
      {selectedSubject && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                {activeSubject?.name} - Students ({students.length})
              </h2>
              {todayAttendance.length > 0 && (
                <Badge variant="success">Attendance recorded today</Badge>
              )}
            </div>
          </CardHeader>
          <CardBody className="p-0">
            {students.length > 0 ? (
              <>
                <div className="divide-y">
                  {students.map((student) => {
                    const currentStatus = attendance[student.id] || 'present';
                    const existingRecord = todayAttendance.find(a => a.studentId === student.id);

                    return (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{student.id}</p>
                          </div>
                        </div>

                        {existingRecord ? (
                          <StatusBadge status={existingRecord.status} />
                        ) : (
                          <div className="flex gap-2">
                            {statusOptions.map(option => (
                              <button
                                key={option.value}
                                onClick={() => handleStatusChange(student.id, option.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  currentStatus === option.value
                                    ? `${option.color} text-white`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {option.value === 'present' && <Check size={16} className="inline mr-1" />}
                                {option.value === 'absent' && <X size={16} className="inline mr-1" />}
                                {option.value === 'late' && <Clock size={16} className="inline mr-1" />}
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {todayAttendance.length === 0 && (
                  <div className="p-4 border-t bg-gray-50">
                    <Button onClick={handleSubmit} className="w-full" icon={CheckSquare}>
                      Submit Attendance
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No students enrolled in this subject
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Recent attendance records */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Recent Attendance Records</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {attendanceData.slice(-10).reverse().map((record) => {
                  const subject = subjects.find(s => s.id === record.subjectId);

                  return (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.studentId}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{subject?.name || record.subjectId}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{record.date}</td>
                      <td className="px-4 py-3"><StatusBadge status={record.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {attendanceData.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No attendance records yet
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
