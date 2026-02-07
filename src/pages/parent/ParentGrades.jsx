import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { GradeBadge } from '../../components/Badge';
import { Select } from '../../components/Input';
import { BarChart2, User } from 'lucide-react';
import { getSubjectById } from '../../data/dummyData';

export default function ParentGrades() {
  const { currentUser, getParentChildren, getStudentGrades, getStudentSubjects } = useApp();
  const [selectedChild, setSelectedChild] = useState('');

  if (!currentUser) return null;

  const children = getParentChildren(currentUser.id);

  // Get child to display
  const activeChild = selectedChild
    ? children.find(c => c.id === selectedChild)
    : children[0];

  const grades = activeChild ? getStudentGrades(activeChild.id) : [];
  const subjects = activeChild ? getStudentSubjects(activeChild.id) : [];

  // Sort by date
  const sortedGrades = [...grades].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate overall average
  const overallAvg = grades.length > 0
    ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grades Overview</h1>
          <p className="text-gray-600 mt-1">View your children's academic performance</p>
        </div>

        {children.length > 1 && (
          <Select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            options={children.map(c => ({
              value: c.id,
              label: `${c.firstName} ${c.lastName}`
            }))}
            placeholder="Select child"
            className="w-48"
          />
        )}
      </div>

      {activeChild ? (
        <>
          {/* Child info header */}
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardBody>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  {activeChild.firstName[0]}{activeChild.lastName[0]}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {activeChild.firstName} {activeChild.lastName}
                  </h2>
                  <p className="text-green-100">
                    Grade {activeChild.gradeLevel} | Class {activeChild.className}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{overallAvg.toFixed(1)}%</p>
                  <p className="text-green-100">Overall Average</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Subject breakdown */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Performance by Subject</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {subjects.map((subject) => {
                  const subjectGrades = grades.filter(g => g.subjectId === subject.id);
                  const avg = subjectGrades.length > 0
                    ? subjectGrades.reduce((s, g) => s + (g.score / g.maxScore) * 100, 0) / subjectGrades.length
                    : null;

                  return (
                    <div key={subject.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{subject.name}</span>
                          <span className="text-sm text-gray-500">{subjectGrades.length} grades</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              avg >= 90 ? 'bg-green-500' :
                              avg >= 80 ? 'bg-blue-500' :
                              avg >= 70 ? 'bg-yellow-500' :
                              avg >= 60 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: avg ? `${avg}%` : '0%' }}
                          />
                        </div>
                      </div>
                      <div className="w-24 text-right">
                        {avg !== null ? (
                          <GradeBadge percentage={avg} />
                        ) : (
                          <span className="text-sm text-gray-400">No grades</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* All grades table */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">All Grades</h2>
            </CardHeader>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Assignment</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Score</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Grade</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sortedGrades.map((grade) => {
                      const subject = getSubjectById(grade.subjectId);
                      const pct = (grade.score / grade.maxScore) * 100;

                      return (
                        <tr key={grade.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{grade.assignment}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{subject?.name || 'Unknown'}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">{grade.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{grade.score}/{grade.maxScore}</td>
                          <td className="px-4 py-3"><GradeBadge percentage={pct} /></td>
                          <td className="px-4 py-3 text-sm text-gray-500">{grade.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {sortedGrades.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No grades recorded yet
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <User className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No children linked</h3>
            <p className="mt-2 text-gray-500">Add your children to view their grades</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
