import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import Badge, { GradeBadge } from '../../components/Badge';
import { BookOpen, User, Clock, MapPin } from 'lucide-react';
import { getTeacherById } from '../../data/dummyData';

export default function StudentSubjects() {
  const { currentUser, getStudentSubjects, getStudentGrades } = useApp();

  if (!currentUser) return null;

  const subjects = getStudentSubjects(currentUser.id);
  const allGrades = getStudentGrades(currentUser.id);

  // Calculate average per subject
  const getSubjectAverage = (subjectId) => {
    const subjectGrades = allGrades.filter(g => g.subjectId === subjectId);
    if (subjectGrades.length === 0) return null;
    return subjectGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / subjectGrades.length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Subjects</h1>
        <p className="text-gray-600 mt-1">View all your enrolled subjects and current performance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {subjects.map((subject) => {
          const teacher = getTeacherById(subject.teacherId);
          const average = getSubjectAverage(subject.id);
          const gradeCount = allGrades.filter(g => g.subjectId === subject.id).length;

          return (
            <Card key={subject.id} className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{subject.name}</h2>
                    <p className="text-sm text-gray-500">{subject.code}</p>
                  </div>
                  {average !== null && (
                    <GradeBadge percentage={average} />
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{subject.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400" />
                    <span>{teacher ? `${teacher.firstName} ${teacher.lastName}` : 'TBA'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    <span>{subject.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{subject.room}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <Badge variant="primary">{subject.credits} Credits</Badge>
                  <span className="text-sm text-gray-500">{gradeCount} graded assignments</span>
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">No subjects yet</h3>
            <p className="mt-2 text-gray-500">You haven't been enrolled in any subjects</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
