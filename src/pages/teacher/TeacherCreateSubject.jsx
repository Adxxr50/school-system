import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Input, Select, Textarea } from '../../components/Input';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { BookOpen, Plus, Clock, MapPin } from 'lucide-react';

export default function TeacherCreateSubject() {
  const { currentUser, createSubject, getTeacherSubjects } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    gradeLevel: '',
    description: '',
    schedule: '',
    room: '',
    credits: '3'
  });

  if (!currentUser) return null;

  const mySubjects = getTeacherSubjects(currentUser.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.code || !formData.gradeLevel) {
      return;
    }

    createSubject({
      ...formData,
      teacherId: currentUser.id,
      gradeLevel: parseInt(formData.gradeLevel),
      credits: parseInt(formData.credits)
    });

    setFormData({
      name: '',
      code: '',
      gradeLevel: '',
      description: '',
      schedule: '',
      room: '',
      credits: '3'
    });
  };

  const gradeLevels = [
    { value: '7', label: 'Grade 7' },
    { value: '8', label: 'Grade 8' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Subject</h1>
        <p className="text-gray-600 mt-1">Create a new subject for your teaching portfolio</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create form */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">New Subject Details</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Subject Name"
                required
                placeholder="e.g., Advanced Mathematics"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Subject Code"
                  required
                  placeholder="e.g., MATH-11"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />

                <Select
                  label="Grade Level"
                  required
                  value={formData.gradeLevel}
                  onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                  options={gradeLevels}
                  placeholder="Select grade"
                />
              </div>

              <Textarea
                label="Description"
                placeholder="Brief description of the subject content..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Schedule"
                  placeholder="e.g., Mon, Wed - 10:00 AM"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                />

                <Input
                  label="Room"
                  placeholder="e.g., Room 305"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                />
              </div>

              <Input
                label="Credits"
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              />

              <Button type="submit" className="w-full" icon={Plus}>
                Create Subject
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Existing subjects */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">My Subjects ({mySubjects.length})</h2>
          </CardHeader>
          <CardBody>
            {mySubjects.length > 0 ? (
              <div className="space-y-4">
                {mySubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.code}</p>
                      </div>
                      <Badge variant="purple">Grade {subject.gradeLevel}</Badge>
                    </div>

                    {subject.description && (
                      <p className="text-sm text-gray-600 mb-3">{subject.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {subject.schedule && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{subject.schedule}</span>
                        </div>
                      )}
                      {subject.room && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{subject.room}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {subject.studentIds.length} students enrolled
                      </span>
                      <Badge>{subject.credits} credits</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto text-gray-300" size={48} />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No subjects yet</h3>
                <p className="mt-2 text-gray-500">Create your first subject using the form</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
