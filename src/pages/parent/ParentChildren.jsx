import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { GradeBadge, StatusBadge } from '../../components/Badge';
import Badge from '../../components/Badge';
import {
  User, Mail, Phone, Calendar, BookOpen, BarChart2,
  Clock, ChevronDown, ChevronUp
} from 'lucide-react';
import { getSubjectById } from '../../data/dummyData';

export default function ParentChildren() {
  const { currentUser, getParentChildren, getStudentGrades, getStudentSubjects } = useApp();
  const [expandedChild, setExpandedChild] = useState(null);

  if (!currentUser) return null;

  const children = getParentChildren(currentUser.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Children</h1>
        <p className="text-gray-600 mt-1">View detailed information about your children's academic progress</p>
      </div>

      {children.length > 0 ? (
        <div className="space-y-6">
          {children.map((child) => {
            const grades = getStudentGrades(child.id);
            const subjects = getStudentSubjects(child.id);
            const isExpanded = expandedChild === child.id;

            // Calculate overall average
            const avg = grades.length > 0
              ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length
              : 0;

            // Group grades by subject
            const gradesBySubject = subjects.map(subject => {
              const subjectGrades = grades.filter(g => g.subjectId === subject.id);
              const subjectAvg = subjectGrades.length > 0
                ? subjectGrades.reduce((s, g) => s + (g.score / g.maxScore) * 100, 0) / subjectGrades.length
                : null;
              return { subject, grades: subjectGrades, avg: subjectAvg };
            });

            return (
              <Card key={child.id}>
                {/* Header - Always visible */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedChild(isExpanded ? null : child.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {child.firstName[0]}{child.lastName[0]}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {child.firstName} {child.lastName}
                      </h2>
                      <p className="text-gray-500">
                        ID: {child.id} | Grade {child.gradeLevel} | Class {child.className}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <GradeBadge percentage={avg} />
                        <Badge variant={child.attendance.percentage >= 90 ? 'success' : 'warning'}>
                          {child.attendance.percentage}% Attendance
                        </Badge>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t">
                    {/* Quick stats */}
                    <div className="p-4 bg-gray-50 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{subjects.length}</p>
                        <p className="text-sm text-gray-500">Subjects</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{grades.length}</p>
                        <p className="text-sm text-gray-500">Graded Items</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{child.attendance.present}</p>
                        <p className="text-sm text-gray-500">Days Present</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{child.attendance.absent}</p>
                        <p className="text-sm text-gray-500">Days Absent</p>
                      </div>
                    </div>

                    {/* Personal info */}
                    <div className="p-4 border-t">
                      <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-gray-600">{child.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-gray-600">{child.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-600">
                            Born: {new Date(child.dateOfBirth).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User size={16} className="text-gray-400" />
                          <span className="text-gray-600">{child.gender}, {child.age} years old</span>
                        </div>
                      </div>
                    </div>

                    {/* Subject performance */}
                    <div className="p-4 border-t">
                      <h3 className="font-semibold text-gray-900 mb-3">Subject Performance</h3>
                      <div className="space-y-3">
                        {gradesBySubject.map(({ subject, grades: subjGrades, avg: subjAvg }) => (
                          <div key={subject.id} className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900">{subject.name}</span>
                                <span className="text-sm text-gray-500">{subjGrades.length} grades</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    subjAvg >= 90 ? 'bg-green-500' :
                                    subjAvg >= 80 ? 'bg-blue-500' :
                                    subjAvg >= 70 ? 'bg-yellow-500' :
                                    subjAvg >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: subjAvg ? `${subjAvg}%` : '0%' }}
                                />
                              </div>
                            </div>
                            <div className="w-24 text-right">
                              {subjAvg !== null ? (
                                <GradeBadge percentage={subjAvg} />
                              ) : (
                                <span className="text-sm text-gray-400">No grades</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent grades */}
                    <div className="p-4 border-t">
                      <h3 className="font-semibold text-gray-900 mb-3">Recent Grades</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-gray-600">Assignment</th>
                              <th className="px-3 py-2 text-left text-gray-600">Subject</th>
                              <th className="px-3 py-2 text-left text-gray-600">Score</th>
                              <th className="px-3 py-2 text-left text-gray-600">Grade</th>
                              <th className="px-3 py-2 text-left text-gray-600">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {grades.slice(0, 5).map((grade) => {
                              const subject = getSubjectById(grade.subjectId);
                              const pct = (grade.score / grade.maxScore) * 100;
                              return (
                                <tr key={grade.id}>
                                  <td className="px-3 py-2 text-gray-900">{grade.assignment}</td>
                                  <td className="px-3 py-2 text-gray-600">{subject?.name}</td>
                                  <td className="px-3 py-2 text-gray-900">{grade.score}/{grade.maxScore}</td>
                                  <td className="px-3 py-2"><GradeBadge percentage={pct} /></td>
                                  <td className="px-3 py-2 text-gray-500">{grade.date}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <User className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No children linked</h3>
            <p className="mt-2 text-gray-500">Add your children using their Student ID to view their progress</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
