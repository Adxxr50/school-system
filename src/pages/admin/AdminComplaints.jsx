import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Select, Textarea } from '../../components/Input';
import Button from '../../components/Button';
import Badge, { StatusBadge } from '../../components/Badge';
import Modal from '../../components/Modal';
import { FileText, Clock, User, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import { getParentById, getStudentById } from '../../data/dummyData';

export default function AdminComplaints() {
  const { currentUser, complaintsData, updateComplaint, adminsData } = useApp();
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolution, setResolution] = useState('');

  if (!currentUser) return null;

  let filteredComplaints = complaintsData;
  if (statusFilter) {
    filteredComplaints = filteredComplaints.filter(c => c.status === statusFilter);
  }

  // Sort: pending first, then in_progress, then resolved
  const statusOrder = { pending: 0, in_progress: 1, resolved: 2 };
  filteredComplaints = [...filteredComplaints].sort((a, b) =>
    statusOrder[a.status] - statusOrder[b.status]
  );

  const handleAssign = (complaintId) => {
    updateComplaint(complaintId, {
      status: 'in_progress',
      assignedTo: currentUser.id
    });
  };

  const handleResolve = () => {
    if (!selectedComplaint || !resolution) return;

    updateComplaint(selectedComplaint.id, {
      status: 'resolved',
      resolution,
      resolvedAt: new Date().toISOString().split('T')[0]
    });

    setSelectedComplaint(null);
    setResolution('');
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
        <p className="text-gray-600 mt-1">Review and resolve parent complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardBody className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {complaintsData.filter(c => c.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <AlertCircle className="text-yellow-500" size={32} />
            </div>
          </CardBody>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardBody className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {complaintsData.filter(c => c.status === 'in_progress').length}
                </p>
                <p className="text-sm text-gray-500">In Progress</p>
              </div>
              <Clock className="text-blue-500" size={32} />
            </div>
          </CardBody>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardBody className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {complaintsData.filter(c => c.status === 'resolved').length}
                </p>
                <p className="text-sm text-gray-500">Resolved</p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-4">
            <Filter size={18} className="text-gray-400" />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
              ]}
              placeholder="All Status"
              className="w-48"
            />
          </div>
        </CardBody>
      </Card>

      {/* Complaints list */}
      {filteredComplaints.length > 0 ? (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => {
            const parent = getParentById(complaint.parentId);
            const student = getStudentById(complaint.studentId);
            const assignedAdmin = complaint.assignedTo
              ? adminsData.find(a => a.id === complaint.assignedTo)
              : null;

            return (
              <Card key={complaint.id} className={`border-l-4 ${
                complaint.status === 'pending' ? 'border-l-yellow-500' :
                complaint.status === 'in_progress' ? 'border-l-blue-500' : 'border-l-green-500'
              }`}>
                <CardBody>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{complaint.subject}</h3>
                      <p className="text-sm text-gray-500">ID: {complaint.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[complaint.priority]}`}>
                        {complaint.priority.toUpperCase()}
                      </span>
                      <StatusBadge status={complaint.status} />
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{complaint.description}</p>

                  {/* Parent & Student info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={14} className="text-gray-400" />
                      <span>Parent: {parent ? `${parent.firstName} ${parent.lastName}` : complaint.parentId}</span>
                    </div>
                    {student && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={14} className="text-gray-400" />
                        <span>Student: {student.firstName} {student.lastName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      <span>Submitted: {complaint.createdAt}</span>
                    </div>
                  </div>

                  {/* Assigned to */}
                  {assignedAdmin && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Assigned to:</strong> {assignedAdmin.firstName} {assignedAdmin.lastName} ({assignedAdmin.role})
                      </p>
                    </div>
                  )}

                  {/* Resolution */}
                  {complaint.resolution && (
                    <div className="mb-4 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                        <CheckCircle size={16} />
                        Resolution
                      </div>
                      <p className="text-sm text-green-600">{complaint.resolution}</p>
                      <p className="text-xs text-green-500 mt-1">Resolved on: {complaint.resolvedAt}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    {complaint.status === 'pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAssign(complaint.id)}
                      >
                        Assign to Me
                      </Button>
                    )}
                    {complaint.status === 'in_progress' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        Resolve
                      </Button>
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
            <p className="mt-2 text-gray-500">
              {statusFilter ? 'Try adjusting your filter' : 'All complaints have been handled'}
            </p>
          </CardBody>
        </Card>
      )}

      {/* Resolve modal */}
      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => {
          setSelectedComplaint(null);
          setResolution('');
        }}
        title="Resolve Complaint"
      >
        {selectedComplaint && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">{selectedComplaint.subject}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedComplaint.description}</p>
            </div>

            <Textarea
              label="Resolution"
              required
              placeholder="Describe how the complaint was resolved..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              rows={4}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedComplaint(null);
                  setResolution('');
                }}
              >
                Cancel
              </Button>
              <Button variant="success" onClick={handleResolve}>
                Mark as Resolved
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
