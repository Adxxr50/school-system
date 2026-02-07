import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Input, Select, Textarea } from '../../components/Input';
import Button from '../../components/Button';
import { GradeBadge } from '../../components/Badge';
import Modal from '../../components/Modal';
import { ClipboardList, Plus, Filter } from 'lucide-react';

export default function TeacherGrades() {
  const {
    currentUser,
    getTeacherSubjects,
    getSubjectStudents,
    gradesData,
    addGrade,
    subjectsData
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('');
  const [formData, setFormData] = useState({
    studentId: '',
    subjectId: '',
    assignment: '',
    score: '',
    maxScore: '100',
    type: 'exam'
  });

  if (!currentUser) return null;

  const subjects = getTeacherSubjects(currentUser.id);

  // Get students for selected subject in form
  const formSubject = subjects.find(s => s.id === formData.subjectId);
  const formStudents = formSubject ? getSubjectStudents(formSubject.id) : [];

  // Filter grades for display
  let displayGrades = gradesData;
  if (selectedSubjectFilter) {
    displayGrades = displayGrades.filter(g => g.subjectId === selectedSubjectFilter);
  }
  // Sort by date (most recent first)
  displayGrades = [...displayGrades].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.subjectId || !formData.assignment || !formData.score) {
      return;
    }

    addGrade({
      studentId: formData.studentId,
      subjectId: formData.subjectId,
      assignment: formData.assignment,
      score: parseInt(formData.score),
      maxScore: parseInt(formData.maxScore),
      type: formData.type
    });

    setShowModal(false);
    setFormData({
      studentId: '',
      subjectId: '',
      assignment: '',
      score: '',
      maxScore: '100',
      type: 'exam'
    });
  };

  const gradeTypes = [
    { value: 'exam', label: 'Exam' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'homework', label: 'Homework' },
    { value: 'project', label: 'Project' },
    { value: 'essay', label: 'Essay' },
    { value: 'practical', label: 'Practical' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grade Students</h1>
          <p className="text-gray-600 mt-1">Add and manage student grades</p>
        </div>
        <Button onClick={() => setShowModal(true)} icon={Plus}>
          Add Grade
        </Button>
      </div>

      {/* Filter */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-4">
            <Filter size={18} className="text-gray-400" />
            <Select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              options={subjects.map(s => ({ value: s.id, label: s.name }))}
              placeholder="All Subjects"
              className="w-48"
            />
          </div>
        </CardBody>
      </Card>

      {/* Grades list */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Recent Grades</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Assignment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {displayGrades.slice(0, 20).map((grade) => {
                  const subject = subjectsData.find(s => s.id === grade.subjectId);
                  const pct = (grade.score / grade.maxScore) * 100;

                  return (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{grade.studentId}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{subject?.name || 'Unknown'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{grade.assignment}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">{grade.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{grade.score}/{grade.maxScore}</td>
                      <td className="px-4 py-3"><GradeBadge percentage={pct} /></td>
                      <td className="px-4 py-3 text-sm text-gray-500">{grade.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {displayGrades.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No grades found
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add grade modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Grade"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Subject"
            required
            value={formData.subjectId}
            onChange={(e) => setFormData({ ...formData, subjectId: e.target.value, studentId: '' })}
            options={subjects.map(s => ({ value: s.id, label: s.name }))}
            placeholder="Select subject..."
          />

          <Select
            label="Student"
            required
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            options={formStudents.map(s => ({
              value: s.id,
              label: `${s.firstName} ${s.lastName} (${s.id})`
            }))}
            placeholder={formData.subjectId ? 'Select student...' : 'Select subject first'}
            disabled={!formData.subjectId}
          />

          <Input
            label="Assignment Name"
            required
            placeholder="e.g., Midterm Exam, Quiz 1"
            value={formData.assignment}
            onChange={(e) => setFormData({ ...formData, assignment: e.target.value })}
          />

          <Select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={gradeTypes}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Score"
              required
              type="number"
              min="0"
              placeholder="Score"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
            />
            <Input
              label="Max Score"
              required
              type="number"
              min="1"
              placeholder="Max"
              value={formData.maxScore}
              onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Grade
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
