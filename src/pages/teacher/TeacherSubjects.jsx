import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { Input, Select } from '../../components/Input';
import { BookOpen, Users, Clock, MapPin, Plus, User, UserPlus } from 'lucide-react';

export default function TeacherSubjects() {
  const {
    currentUser,
    getTeacherSubjects,
    getSubjectStudents,
    studentsData,
    addStudentToSubject,
    showToast
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  if (!currentUser) return null;

  const subjects = getTeacherSubjects(currentUser.id);

  const handleAddStudent = () => {
    if (!selectedSubject || !selectedStudentId) {
      showToast('Please select a student', 'error');
      return;
    }

    addStudentToSubject(selectedSubject.id, selectedStudentId);
    setShowAddModal(false);
    setSelectedStudentId('');
  };

  const openAddStudentModal = (subject) => {
    setSelectedSubject(subject);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Subjects</h1>
        <p className="text-gray-600 mt-1">Manage your subjects and enrolled students</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {subjects.map((subject) => {
          const students = getSubjectStudents(subject.id);

          return (
            <Card key={subject.id} className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600" />
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{subject.name}</h2>
                    <p className="text-sm text-gray-500">{subject.code}</p>
                  </div>
                  <Badge variant="purple">Grade {subject.gradeLevel}</Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4">{subject.description}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{subject.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{subject.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span>{students.length} students enrolled</span>
                  </div>
                </div>

                {/* Enrolled students */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Enrolled Students</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={UserPlus}
                      onClick={() => openAddStudentModal(subject)}
                    >
                      Add
                    </Button>
                  </div>

                  {students.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{student.id}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No students enrolled yet
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {subjects.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <BookOpen className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No subjects assigned</h3>
            <p className="mt-2 text-gray-500">You haven't been assigned any subjects yet</p>
          </CardBody>
        </Card>
      )}

      {/* Add student modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={`Add Student to ${selectedSubject?.name || 'Subject'}`}
      >
        <div className="space-y-4">
          <Select
            label="Select Student"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            options={studentsData
              .filter(s => !selectedSubject?.studentIds.includes(s.id))
              .map(s => ({
                value: s.id,
                label: `${s.firstName} ${s.lastName} (${s.id}) - Grade ${s.gradeLevel}`
              }))}
            placeholder="Choose a student..."
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStudent} icon={UserPlus}>
              Add Student
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
