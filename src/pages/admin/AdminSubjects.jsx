import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { Input, Select } from '../../components/Input';
import { BookOpen, Users, Clock, MapPin, Search, Filter, User } from 'lucide-react';
import { getTeacherById } from '../../data/dummyData';

export default function AdminSubjects() {
  const { subjectsData, getSubjectStudents } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');

  let filteredSubjects = subjectsData.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (gradeFilter) {
    filteredSubjects = filteredSubjects.filter(s => s.gradeLevel.toString() === gradeFilter);
  }

  const grades = [...new Set(subjectsData.map(s => s.gradeLevel))].sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Subjects</h1>
          <p className="text-gray-600 mt-1">View and manage school subjects</p>
        </div>
        <Button icon={BookOpen} variant="secondary">
          Add Subject (Demo)
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search subjects..."
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
            <p className="text-2xl font-bold text-green-600">{subjectsData.length}</p>
            <p className="text-sm text-gray-500">Total Subjects</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-blue-600">{grades.length}</p>
            <p className="text-sm text-gray-500">Grade Levels</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-purple-600">
              {[...new Set(subjectsData.map(s => s.teacherId))].length}
            </p>
            <p className="text-sm text-gray-500">Teachers</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-yellow-600">
              {subjectsData.reduce((sum, s) => sum + s.credits, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Credits</p>
          </CardBody>
        </Card>
      </div>

      {/* Subjects table */}
      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Teacher</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Schedule</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Room</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Students</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSubjects.map((subject) => {
                  const teacher = getTeacherById(subject.teacherId);
                  const studentCount = subject.studentIds.length;

                  return (
                    <tr key={subject.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="text-green-600" size={16} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{subject.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{subject.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{subject.code}</td>
                      <td className="px-4 py-3">
                        <Badge variant="primary">Grade {subject.gradeLevel}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'TBA'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock size={14} className="text-gray-400" />
                          <span>{subject.schedule || 'TBA'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin size={14} className="text-gray-400" />
                          <span>{subject.room || 'TBA'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users size={14} className="text-gray-400" />
                          <span>{studentCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge>{subject.credits}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredSubjects.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No subjects found matching your criteria
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
