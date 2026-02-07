import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { StatusBadge } from '../../components/Badge';
import Badge from '../../components/Badge';
import { Select } from '../../components/Input';
import { MessageSquare, User, BookOpen, Calendar, Filter } from 'lucide-react';
import { getTeacherById, getSubjectById } from '../../data/dummyData';

export default function ParentNotes() {
  const { currentUser, getParentChildren, getStudentNotes } = useApp();
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedType, setSelectedType] = useState('');

  if (!currentUser) return null;

  const children = getParentChildren(currentUser.id);

  // Get all notes
  let allNotes = children.flatMap(child => {
    const notes = getStudentNotes(child.id);
    return notes.map(note => ({ ...note, child }));
  });

  // Filter by child
  if (selectedChild) {
    allNotes = allNotes.filter(n => n.studentId === selectedChild);
  }

  // Filter by type
  if (selectedType) {
    allNotes = allNotes.filter(n => n.type === selectedType);
  }

  // Sort by date (most recent first)
  allNotes = [...allNotes].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Count by type
  const positivCount = allNotes.filter(n => n.type === 'positive').length;
  const neutralCount = allNotes.filter(n => n.type === 'neutral').length;
  const concernCount = allNotes.filter(n => n.type === 'concern').length;
  const unreadCount = allNotes.filter(n => !n.isRead).length;

  const typeConfig = {
    positive: { bg: 'bg-green-50', border: 'border-l-green-500', icon: 'text-green-600' },
    neutral: { bg: 'bg-blue-50', border: 'border-l-blue-500', icon: 'text-blue-600' },
    concern: { bg: 'bg-yellow-50', border: 'border-l-yellow-500', icon: 'text-yellow-600' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Notes</h1>
        <p className="text-gray-600 mt-1">Feedback and observations from your children's teachers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
            <p className="text-sm text-gray-500">Unread</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-green-600">{positivCount}</p>
            <p className="text-sm text-gray-500">Positive</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-gray-600">{neutralCount}</p>
            <p className="text-sm text-gray-500">Neutral</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-yellow-600">{concernCount}</p>
            <p className="text-sm text-gray-500">Concerns</p>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter size={18} />
              <span className="font-medium">Filters:</span>
            </div>
            <Select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              options={children.map(c => ({
                value: c.id,
                label: `${c.firstName} ${c.lastName}`
              }))}
              placeholder="All Children"
              className="w-48"
            />
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={[
                { value: 'positive', label: 'Positive' },
                { value: 'neutral', label: 'Neutral' },
                { value: 'concern', label: 'Concerns' },
              ]}
              placeholder="All Types"
              className="w-40"
            />
          </div>
        </CardBody>
      </Card>

      {/* Notes list */}
      {allNotes.length > 0 ? (
        <div className="space-y-4">
          {allNotes.map((note) => {
            const teacher = getTeacherById(note.teacherId);
            const subject = getSubjectById(note.subjectId);
            const config = typeConfig[note.type] || typeConfig.neutral;

            return (
              <Card
                key={note.id}
                className={`overflow-hidden border-l-4 ${config.border} ${!note.isRead ? 'ring-2 ring-blue-200' : ''}`}
              >
                <CardBody>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {note.child.firstName} {note.child.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {subject?.name} - {teacher?.firstName} {teacher?.lastName}
                          </p>
                        </div>
                      </div>

                      {/* Note content */}
                      <div className={`p-4 rounded-lg ${config.bg}`}>
                        <p className="text-gray-700">{note.note}</p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>{note.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {!note.isRead && (
                            <Badge variant="primary">New</Badge>
                          )}
                          <Badge variant={note.type === 'positive' ? 'success' : note.type === 'concern' ? 'warning' : 'default'}>
                            {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">No notes found</h3>
            <p className="mt-2 text-gray-500">
              {selectedChild || selectedType
                ? 'Try adjusting your filters'
                : 'Teachers haven\'t added any notes yet'
              }
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
