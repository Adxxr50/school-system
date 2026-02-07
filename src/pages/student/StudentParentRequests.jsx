import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { UserPlus, Check, X, Users, Clock } from 'lucide-react';

export default function StudentParentRequests() {
  const {
    currentUser,
    getStudentPendingRequests,
    approveParentRequest,
    rejectParentRequest
  } = useApp();

  if (!currentUser) return null;

  const pendingRequests = getStudentPendingRequests(currentUser.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Parent Link Requests</h1>
        <p className="text-gray-600 mt-1">
          Review and approve requests from parents who want to link to your account
        </p>
      </div>

      {/* Info card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardBody>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">How it works</h3>
              <p className="text-sm text-blue-700 mt-1">
                When a parent wants to link their account to yours, you'll receive a request here.
                You can approve or reject the request. Once approved, the parent will be able to
                view your grades, attendance, and receive teacher notes about your progress.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Pending requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Pending Requests</h2>
            <Badge variant={pendingRequests.length > 0 ? 'warning' : 'default'}>
              {pendingRequests.length} pending
            </Badge>
          </div>
        </CardHeader>
        <CardBody>
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <UserPlus className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{request.parentName}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={14} />
                        Requested on {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      icon={Check}
                      onClick={() => approveParentRequest(request.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={X}
                      onClick={() => rejectParentRequest(request.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <UserPlus className="mx-auto text-gray-300" size={48} />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No pending requests</h3>
              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                You don't have any pending parent link requests. When a parent tries to
                link to your account using your Student ID, you'll see the request here.
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Your ID card */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Your Student ID</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
            <div>
              <p className="text-sm text-gray-500">Share this ID with your parent</p>
              <p className="text-2xl font-mono font-bold text-gray-900">{currentUser.id}</p>
              <p className="text-sm text-gray-500 mt-1">
                {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Your parent can use this ID to request a link to your account from their Parent Portal.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
