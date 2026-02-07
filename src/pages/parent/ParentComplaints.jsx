import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Input, Textarea, Select } from '../../components/Input';
import Button from '../../components/Button';
import { StatusBadge } from '../../components/Badge';
import Modal from '../../components/Modal';
import { FileText, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ParentComplaints() {
  const { currentUser, complaintsData, getParentChildren, showToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    childId: '',
    description: ''
  });

  if (!currentUser) return null;

  const children = getParentChildren(currentUser.id);
  const myComplaints = complaintsData.filter(c => c.parentId === currentUser.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.description) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // In a real app, this would add to the database
    showToast('Complaint submitted successfully! (Demo)', 'success');
    setShowModal(false);
    setFormData({ subject: '', childId: '', description: '' });
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-600 mt-1">Submit and track complaints or concerns</p>
        </div>
        <Button onClick={() => setShowModal(true)} icon={Plus}>
          New Complaint
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-yellow-600">
              {myComplaints.filter(c => c.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-500">Pending</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-blue-600">
              {myComplaints.filter(c => c.status === 'in_progress').length}
            </p>
            <p className="text-sm text-gray-500">In Progress</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-green-600">
              {myComplaints.filter(c => c.status === 'resolved').length}
            </p>
            <p className="text-sm text-gray-500">Resolved</p>
          </CardBody>
        </Card>
      </div>

      {/* Complaints list */}
      {myComplaints.length > 0 ? (
        <div className="space-y-4">
          {myComplaints.map((complaint) => {
            const child = children.find(c => c.id === complaint.studentId);

            return (
              <Card key={complaint.id}>
                <CardBody>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{complaint.subject}</h3>
                      {child && (
                        <p className="text-sm text-gray-500">
                          Regarding: {child.firstName} {child.lastName}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[complaint.priority]}`}>
                        {complaint.priority.toUpperCase()}
                      </span>
                      <StatusBadge status={complaint.status} />
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{complaint.description}</p>

                  {complaint.resolution && (
                    <div className="p-3 bg-green-50 rounded-lg mb-4">
                      <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                        <CheckCircle size={16} />
                        Resolution
                      </div>
                      <p className="text-sm text-green-600">{complaint.resolution}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Submitted: {complaint.createdAt}</span>
                    </div>
                    {complaint.resolvedAt && (
                      <span>Resolved: {complaint.resolvedAt}</span>
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <FileText className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints</h3>
            <p className="mt-2 text-gray-500">You haven't submitted any complaints yet</p>
          </CardBody>
        </Card>
      )}

      {/* New complaint modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Submit New Complaint"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Subject"
            required
            placeholder="Brief description of your concern"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />

          <Select
            label="Related Child (Optional)"
            value={formData.childId}
            onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
            options={children.map(c => ({
              value: c.id,
              label: `${c.firstName} ${c.lastName}`
            }))}
            placeholder="Select if complaint is about a specific child"
          />

          <Textarea
            label="Description"
            required
            placeholder="Please provide detailed information about your concern..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Complaint
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
