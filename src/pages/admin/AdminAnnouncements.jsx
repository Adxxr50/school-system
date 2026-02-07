import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Input, Select, Textarea } from '../../components/Input';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { Bell, Plus, Calendar, Users, Eye } from 'lucide-react';

export default function AdminAnnouncements() {
  const { currentUser, announcementsData, createAnnouncement } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: [],
    priority: 'medium',
    expiresAt: ''
  });

  if (!currentUser) return null;

  const handleAudienceChange = (audience) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter(a => a !== audience)
        : [...prev.targetAudience, audience]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || formData.targetAudience.length === 0) {
      return;
    }

    createAnnouncement({
      ...formData,
      author: currentUser.id
    });

    setShowModal(false);
    setFormData({
      title: '',
      content: '',
      targetAudience: [],
      priority: 'medium',
      expiresAt: ''
    });
  };

  const audiences = ['students', 'teachers', 'parents'];
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-700' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1">Create and manage school-wide announcements</p>
        </div>
        <Button onClick={() => setShowModal(true)} icon={Plus}>
          New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-blue-600">{announcementsData.length}</p>
            <p className="text-sm text-gray-500">Total</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-red-600">
              {announcementsData.filter(a => a.priority === 'high').length}
            </p>
            <p className="text-sm text-gray-500">High Priority</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-green-600">
              {announcementsData.filter(a => new Date(a.expiresAt) > new Date()).length}
            </p>
            <p className="text-sm text-gray-500">Active</p>
          </CardBody>
        </Card>
      </div>

      {/* Announcements list */}
      {announcementsData.length > 0 ? (
        <div className="space-y-4">
          {announcementsData.map((announcement) => {
            const priorityConfig = priorities.find(p => p.value === announcement.priority);
            const isExpired = new Date(announcement.expiresAt) < new Date();

            return (
              <Card key={announcement.id} className={isExpired ? 'opacity-60' : ''}>
                <CardBody>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Bell className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-500">ID: {announcement.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig?.color}`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                      {isExpired && (
                        <Badge variant="default">Expired</Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{announcement.content}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users size={14} />
                        <span>
                          {announcement.targetAudience.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={14} />
                        <span>Created: {announcement.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Eye size={14} />
                      <span>Expires: {announcement.expiresAt}</span>
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
            <Bell className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No announcements</h3>
            <p className="mt-2 text-gray-500">Create your first announcement to notify users</p>
          </CardBody>
        </Card>
      )}

      {/* Create announcement modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Announcement"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            required
            placeholder="Announcement title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Textarea
            label="Content"
            required
            placeholder="Write your announcement..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {audiences.map(audience => (
                <button
                  key={audience}
                  type="button"
                  onClick={() => handleAudienceChange(audience)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.targetAudience.includes(audience)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {audience.charAt(0).toUpperCase() + audience.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex gap-3">
              {priorities.map(priority => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: priority.value })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.priority === priority.value
                      ? priority.color
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Expiration Date"
            type="date"
            value={formData.expiresAt}
            onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Publish Announcement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
