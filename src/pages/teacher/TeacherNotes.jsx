import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Select, Textarea } from '../../components/Input';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { MessageSquare, Plus, User, BookOpen, Calendar } from 'lucide-react';

export default function TeacherNotes() {
  const {
    currentUser,
    getTeacherSubjects,
    getSubjectStudents,
    notesData,
    addNote,
    subjectsData,
    studentsData
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    subjectId: '',
    note: '',
    type: 'neutral'
  });

  if (!currentUser) return null;

  const subjects = getTeacherSubjects(currentUser.id);

  // Get my notes
  const myNotes = notesData.filter(n => n.teacherId === currentUser.id);

  // Get students for selected subject in form
  const formSubject = subjects.find(s => s.id === formData.subjectId);
  const formStudents = formSubject ? getSubjectStudents(formSubject.id) : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.subjectId || !formData.note) {
      return;
    }

    addNote({
      studentId: formData.studentId,
      subjectId: formData.subjectId,
      teacherId: currentUser.id,
      note: formData.note,
      type: formData.type
    });

    setShowModal(false);
    setFormData({
      studentId: '',
      subjectId: '',
      note: '',
      type: 'neutral'
    });
  };

  const noteTypes = [
    { value: 'positive', label: 'Positive', color: 'bg-green-100 text-green-700' },
    { value: 'neutral', label: 'Neutral', color: 'bg-blue-100 text-blue-700' },
    { value: 'concern', label: 'Concern', color: 'bg-yellow-100 text-yellow-700' },
  ];

  const getTypeConfig = (type) => {
    return noteTypes.find(t => t.value === type) || noteTypes[1];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Notes</h1>
          <p className="text-gray-600 mt-1">Add notes for parents about their children's progress</p>
        </div>
        <Button onClick={() => setShowModal(true)} icon={Plus}>
          Add Note
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-green-600">
              {myNotes.filter(n => n.type === 'positive').length}
            </p>
            <p className="text-sm text-gray-500">Positive</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-blue-600">
              {myNotes.filter(n => n.type === 'neutral').length}
            </p>
            <p className="text-sm text-gray-500">Neutral</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-yellow-600">
              {myNotes.filter(n => n.type === 'concern').length}
            </p>
            <p className="text-sm text-gray-500">Concerns</p>
          </CardBody>
        </Card>
      </div>

      {/* Notes list */}
      {myNotes.length > 0 ? (
        <div className="space-y-4">
          {[...myNotes].reverse().map((note) => {
            const student = studentsData.find(s => s.id === note.studentId);
            const subject = subjectsData.find(s => s.id === note.subjectId);
            const typeConfig = getTypeConfig(note.type);

            return (
              <Card key={note.id}>
                <CardBody>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {student ? `${student.firstName} ${student.lastName}` : note.studentId}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <BookOpen size={14} />
                          {subject?.name || 'Unknown Subject'}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeConfig.color}`}>
                      {typeConfig.label}
                    </span>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    note.type === 'positive' ? 'bg-green-50' :
                    note.type === 'concern' ? 'bg-yellow-50' : 'bg-blue-50'
                  }`}>
                    <p className="text-gray-700">{note.note}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{note.date}</span>
                    </div>
                    <Badge variant={note.isRead ? 'default' : 'primary'}>
                      {note.isRead ? 'Read' : 'Unread'}
                    </Badge>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <MessageSquare className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No notes yet</h3>
            <p className="mt-2 text-gray-500">Add notes to communicate with parents about their children</p>
          </CardBody>
        </Card>
      )}

      {/* Add note modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Student Note"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Note Type</label>
            <div className="flex gap-2">
              {noteTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.type === type.value ? type.color : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            label="Note"
            required
            placeholder="Write your note for the parent..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            rows={4}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Note
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
