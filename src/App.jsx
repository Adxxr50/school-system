import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentSubjects from './pages/student/StudentSubjects';
import StudentGrades from './pages/student/StudentGrades';
import StudentSchedule from './pages/student/StudentSchedule';
import StudentProfile from './pages/student/StudentProfile';
import StudentParentRequests from './pages/student/StudentParentRequests';

// Parent pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentChildren from './pages/parent/ParentChildren';
import ParentGrades from './pages/parent/ParentGrades';
import ParentNotes from './pages/parent/ParentNotes';
import ParentAddChild from './pages/parent/ParentAddChild';
import ParentComplaints from './pages/parent/ParentComplaints';

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherSubjects from './pages/teacher/TeacherSubjects';
import TeacherGrades from './pages/teacher/TeacherGrades';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherNotes from './pages/teacher/TeacherNotes';
import TeacherCreateSubject from './pages/teacher/TeacherCreateSubject';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminSubjects from './pages/admin/AdminSubjects';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminStudents from './pages/admin/AdminStudents';

// Protected route wrapper
function ProtectedRoute({ children, allowedRole }) {
  const { userType } = useApp();

  if (!userType) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userType !== allowedRole) {
    return <Navigate to={`/${userType}`} replace />;
  }

  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomePage />} />

      {/* Student routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/subjects"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentSubjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/grades"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentGrades />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/schedule"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/requests"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentParentRequests />
          </ProtectedRoute>
        }
      />

      {/* Parent routes */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute allowedRole="parent">
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/children"
        element={
          <ProtectedRoute allowedRole="parent">
            <ParentChildren />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/grades"
        element={
          <ProtectedRoute allowedRole="parent">
            <ParentGrades />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/notes"
        element={
          <ProtectedRoute allowedRole="parent">
            <ParentNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/add-child"
        element={
          <ProtectedRoute allowedRole="parent">
            <ParentAddChild />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/complaints"
        element={
          <ProtectedRoute allowedRole="parent">
            <ParentComplaints />
          </ProtectedRoute>
        }
      />

      {/* Teacher routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/subjects"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherSubjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/grades"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherGrades />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/attendance"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/notes"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/create-subject"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherCreateSubject />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminAnnouncements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/teachers"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminTeachers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/subjects"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminSubjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminStudents />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
