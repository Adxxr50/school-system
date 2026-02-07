import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { UserPlus, Search, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function ParentAddChild() {
  const { currentUser, requestAddChild, getParentChildren, studentsData } = useApp();
  const [studentId, setStudentId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  if (!currentUser) return null;

  const linkedChildren = getParentChildren(currentUser.id);

  const handleSearch = () => {
    setError('');
    setSearchResult(null);

    if (!studentId.trim()) {
      setError('Please enter a Student ID');
      return;
    }

    const student = studentsData.find(s => s.id.toUpperCase() === studentId.toUpperCase());

    if (!student) {
      setError('Student not found. Please check the ID and try again.');
      return;
    }

    // Check if already linked
    if (linkedChildren.some(c => c.id === student.id)) {
      setError('This child is already linked to your account.');
      return;
    }

    setSearchResult(student);
  };

  const handleSendRequest = () => {
    if (searchResult) {
      requestAddChild(currentUser.id, searchResult.id);
      setStudentId('');
      setSearchResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Child</h1>
        <p className="text-gray-600 mt-1">Link your child's account to monitor their academic progress</p>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardBody>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">How to add your child</h3>
              <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
                <li>Get your child's Student ID from them or the school office</li>
                <li>Enter the ID below and search</li>
                <li>Verify the student information and send a link request</li>
                <li>Your child will receive the request and can approve it from their portal</li>
              </ol>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Search form */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Search for Student</h2>
        </CardHeader>
        <CardBody>
          <div className="flex gap-3">
            <Input
              placeholder="Enter Student ID (e.g., STU001)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              icon={Search}
              className="flex-1"
            />
            <Button onClick={handleSearch} icon={Search}>
              Search
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {searchResult && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" size={20} />
                <span className="font-medium text-green-700">Student found!</span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {searchResult.firstName[0]}{searchResult.lastName[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {searchResult.firstName} {searchResult.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: {searchResult.id} | Grade {searchResult.gradeLevel} | Class {searchResult.className}
                  </p>
                  <p className="text-sm text-gray-500">
                    Age: {searchResult.age} | {searchResult.gender}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="success" onClick={handleSendRequest} icon={UserPlus}>
                  Send Link Request
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Linked children */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Users size={20} className="text-green-600" />
            Linked Children ({linkedChildren.length})
          </h2>
        </CardHeader>
        <CardBody>
          {linkedChildren.length > 0 ? (
            <div className="space-y-3">
              {linkedChildren.map((child) => (
                <div key={child.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {child.firstName[0]}{child.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {child.firstName} {child.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Grade {child.gradeLevel} | Class {child.className}
                    </p>
                  </div>
                  <Badge variant="success">Linked</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="mx-auto mb-3 text-gray-300" size={40} />
              <p>No children linked yet</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Demo hint */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardBody>
          <h3 className="font-medium text-yellow-900 mb-2">Demo: Try these Student IDs</h3>
          <div className="flex flex-wrap gap-2">
            {studentsData.slice(0, 5).map((s) => (
              <button
                key={s.id}
                onClick={() => setStudentId(s.id)}
                className="px-3 py-1 bg-white border border-yellow-300 rounded-full text-sm text-yellow-800 hover:bg-yellow-100"
              >
                {s.id} - {s.firstName}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
