import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { GradeBadge } from '../../components/Badge';
import { Select } from '../../components/Input';
import { BarChart2, TrendingUp, Award, Filter } from 'lucide-react';

export default function StudentGrades() {
  const { currentUser, getStudentSubjects, getStudentGrades, subjectsData } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');

  if (!currentUser) return null;

  const subjects = getStudentSubjects(currentUser.id);
  const allGrades = getStudentGrades(currentUser.id);

  // Filter grades
  let filteredGrades = allGrades;
  if (selectedSubject) {
    filteredGrades = filteredGrades.filter(g => g.subjectId === selectedSubject);
  }
  if (selectedType) {
    filteredGrades = filteredGrades.filter(g => g.type === selectedType);
  }

  // Sort by date (most recent first)
  filteredGrades = [...filteredGrades].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate overall stats
  const overallAvg = allGrades.length > 0
    ? allGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / allGrades.length
    : 0;

  // Get subject averages
  const subjectAverages = subjects.map(subject => {
    const subjectGrades = allGrades.filter(g => g.subjectId === subject.id);
    const avg = subjectGrades.length > 0
      ? subjectGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / subjectGrades.length
      : null;
    return { subject, avg, count: subjectGrades.length };
  });

  // Get unique assignment types
  const types = [...new Set(allGrades.map(g => g.type))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Grades</h1>
        <p className="text-gray-600 mt-1">View your academic performance across all subjects</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center">
            <BarChart2 className="mx-auto text-blue-600" size={32} />
            <p className="mt-2 text-2xl font-bold text-gray-900">{overallAvg.toFixed(1)}%</p>
            <p className="text-sm text-gray-500">Overall Average</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <Award className="mx-auto text-yellow-600" size={32} />
            <p className="mt-2 text-2xl font-bold text-gray-900">{allGrades.length}</p>
            <p className="text-sm text-gray-500">Total Grades</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <TrendingUp className="mx-auto text-green-600" size={32} />
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {allGrades.filter(g => (g.score / g.maxScore) >= 0.9).length}
            </p>
            <p className="text-sm text-gray-500">90+ Scores</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <Filter className="mx-auto text-purple-600" size={32} />
            <p className="mt-2 text-2xl font-bold text-gray-900">{subjects.length}</p>
            <p className="text-sm text-gray-500">Subjects</p>
          </CardBody>
        </Card>
      </div>

      {/* Subject averages */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Subject Performance</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {subjectAverages.map(({ subject, avg, count }) => (
              <div key={subject.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{subject.name}</span>
                    <span className="text-sm text-gray-500">{count} grades</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
                <div className="w-20 text-right">
                  {avg !== null ? (
                    <GradeBadge percentage={avg} />
                  ) : (
                    <span className="text-sm text-gray-400">No grades</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Filters and grades list */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <h2 className="font-semibold text-gray-900 flex-1">All Grades</h2>
            <div className="flex gap-3">
              <Select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                placeholder="All Subjects"
                options={subjects.map(s => ({ value: s.id, label: s.name }))}
                className="w-40"
              />
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                placeholder="All Types"
                options={types.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
                className="w-36"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Assignment</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Subject</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Score</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Grade</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredGrades.map((grade) => {
                  const subject = subjectsData.find(s => s.id === grade.subjectId);
                  const percentage = (grade.score / grade.maxScore) * 100;
                  return (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{grade.assignment}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{subject?.name || 'Unknown'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">{grade.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {grade.score}/{grade.maxScore}
                      </td>
                      <td className="px-4 py-3">
                        <GradeBadge percentage={percentage} />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{grade.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredGrades.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No grades found matching your filters
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
