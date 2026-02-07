import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import Badge, { StatusBadge } from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { Users, Mail, Phone, BookOpen, Calendar, Eye, Edit, Search } from 'lucide-react';
import { Input } from '../../components/Input';

export default function AdminTeachers() {
  const { teachersData, getTeacherSubjects } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = teachersData.filter(teacher =>
    `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Teachers</h1>
          <p className="text-gray-600 mt-1">View and manage teacher accounts</p>
        </div>
        <Button icon={Users} variant="secondary">
          Add Teacher (Demo)
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardBody>
          <Input
            placeholder="Search by name, department, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </CardBody>
      </Card>

      {/* Teachers grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => {
          const subjects = getTeacherSubjects(teacher.id);

          return (
            <Card key={teacher.id} className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600" />
              <CardBody>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl font-bold">
                    {teacher.firstName[0]}{teacher.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{teacher.department}</p>
                    <StatusBadge status={teacher.status.toLowerCase()} />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen size={14} className="text-gray-400" />
                    <span>{subjects.length} subjects</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    <span>Joined: {teacher.joinDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <Badge variant="purple">{teacher.experience}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => setSelectedTeacher(teacher)}
                  >
                    View
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {filteredTeachers.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Users className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No teachers found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search</p>
          </CardBody>
        </Card>
      )}

      {/* Teacher details modal */}
      <Modal
        isOpen={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
        title="Teacher Details"
        size="lg"
      >
        {selectedTeacher && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold">
                {selectedTeacher.firstName[0]}{selectedTeacher.lastName[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedTeacher.firstName} {selectedTeacher.lastName}
                </h2>
                <p className="text-gray-500">{selectedTeacher.department} Department</p>
                <div className="flex gap-2 mt-2">
                  <StatusBadge status={selectedTeacher.status.toLowerCase()} />
                  <Badge variant="purple">{selectedTeacher.experience}</Badge>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Email:</span> {selectedTeacher.email}</p>
                  <p><span className="text-gray-500">Phone:</span> {selectedTeacher.phone}</p>
                  <p><span className="text-gray-500">Address:</span> {selectedTeacher.address}</p>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Professional Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">ID:</span> {selectedTeacher.id}</p>
                  <p><span className="text-gray-500">Qualification:</span> {selectedTeacher.qualification}</p>
                  <p><span className="text-gray-500">Join Date:</span> {selectedTeacher.joinDate}</p>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Assigned Subjects</h3>
              <div className="space-y-2">
                {getTeacherSubjects(selectedTeacher.id).map(subject => (
                  <div key={subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{subject.name}</p>
                      <p className="text-sm text-gray-500">{subject.code} | Grade {subject.gradeLevel}</p>
                    </div>
                    <Badge>{subject.studentIds.length} students</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="secondary" onClick={() => setSelectedTeacher(null)}>
                Close
              </Button>
              <Button icon={Edit}>
                Edit Teacher (Demo)
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
