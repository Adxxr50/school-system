import { createContext, useContext, useState, useCallback } from 'react';
import {
  students, parents, teachers, admins, subjects, grades,
  teacherNotes, announcements, complaints, attendanceRecords,
  getStudentById, getParentById, getTeacherById, getAdminById
} from '../data/dummyData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Current user state
  const [userType, setUserType] = useState(null); // 'student', 'parent', 'teacher', 'admin'
  const [currentUser, setCurrentUser] = useState(null);

  // Data state (simulating database)
  const [studentsData, setStudentsData] = useState(students);
  const [parentsData, setParentsData] = useState(parents);
  const [teachersData, setTeachersData] = useState(teachers);
  const [adminsData, setAdminsData] = useState(admins);
  const [subjectsData, setSubjectsData] = useState(subjects);
  const [gradesData, setGradesData] = useState(grades);
  const [notesData, setNotesData] = useState(teacherNotes);
  const [announcementsData, setAnnouncementsData] = useState(announcements);
  const [complaintsData, setComplaintsData] = useState(complaints);
  const [attendanceData, setAttendanceData] = useState(attendanceRecords);

  // Pending parent-child link requests
  const [pendingRequests, setPendingRequests] = useState([]);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Login as a specific user type (bypass for prototype)
  const loginAs = useCallback((type, userId = null) => {
    setUserType(type);

    // Set default user for each type
    switch (type) {
      case 'student':
        setCurrentUser(userId ? getStudentById(userId) : studentsData[0]);
        break;
      case 'parent':
        setCurrentUser(userId ? getParentById(userId) : parentsData[0]);
        break;
      case 'teacher':
        setCurrentUser(userId ? getTeacherById(userId) : teachersData[0]);
        break;
      case 'admin':
        setCurrentUser(userId ? getAdminById(userId) : adminsData[0]);
        break;
      default:
        setCurrentUser(null);
    }
  }, [studentsData, parentsData, teachersData, adminsData]);

  const logout = useCallback(() => {
    setUserType(null);
    setCurrentUser(null);
  }, []);

  // Toast notification system
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  // Student functions
  const getStudentSubjects = useCallback((studentId) => {
    return subjectsData.filter(s => s.studentIds.includes(studentId));
  }, [subjectsData]);

  const getStudentGrades = useCallback((studentId) => {
    return gradesData.filter(g => g.studentId === studentId);
  }, [gradesData]);

  const getStudentNotes = useCallback((studentId) => {
    return notesData.filter(n => n.studentId === studentId);
  }, [notesData]);

  // Parent functions
  const getParentChildren = useCallback((parentId) => {
    const parent = parentsData.find(p => p.id === parentId);
    if (!parent) return [];
    return parent.childrenIds.map(id => studentsData.find(s => s.id === id)).filter(Boolean);
  }, [parentsData, studentsData]);

  const requestAddChild = useCallback((parentId, studentId) => {
    // Check if student exists
    const student = studentsData.find(s => s.id === studentId);
    if (!student) {
      showToast('Student ID not found', 'error');
      return false;
    }

    // Check if already linked
    const parent = parentsData.find(p => p.id === parentId);
    if (parent?.childrenIds.includes(studentId)) {
      showToast('This child is already linked to your account', 'error');
      return false;
    }

    // Check if request already pending
    const existingRequest = pendingRequests.find(
      r => r.parentId === parentId && r.studentId === studentId
    );
    if (existingRequest) {
      showToast('Request already pending', 'error');
      return false;
    }

    // Add pending request
    const newRequest = {
      id: `REQ${Date.now()}`,
      parentId,
      studentId,
      parentName: parent ? `${parent.firstName} ${parent.lastName}` : 'Unknown',
      createdAt: new Date().toISOString()
    };
    setPendingRequests(prev => [...prev, newRequest]);
    showToast('Request sent! Waiting for student approval.', 'success');
    return true;
  }, [studentsData, parentsData, pendingRequests, showToast]);

  const approveParentRequest = useCallback((requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request) return;

    // Add child to parent
    setParentsData(prev => prev.map(p =>
      p.id === request.parentId
        ? { ...p, childrenIds: [...p.childrenIds, request.studentId] }
        : p
    ));

    // Remove request
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    showToast('Parent linked successfully!', 'success');
  }, [pendingRequests, showToast]);

  const rejectParentRequest = useCallback((requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    showToast('Request rejected', 'info');
  }, [showToast]);

  // Teacher functions
  const getTeacherSubjects = useCallback((teacherId) => {
    return subjectsData.filter(s => s.teacherId === teacherId);
  }, [subjectsData]);

  const getSubjectStudents = useCallback((subjectId) => {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return [];
    return subject.studentIds.map(id => studentsData.find(s => s.id === id)).filter(Boolean);
  }, [subjectsData, studentsData]);

  const addGrade = useCallback((gradeData) => {
    const newGrade = {
      id: `GRD${Date.now()}`,
      ...gradeData,
      date: new Date().toISOString().split('T')[0]
    };
    setGradesData(prev => [...prev, newGrade]);
    showToast('Grade added successfully!', 'success');
    return newGrade;
  }, [showToast]);

  const addNote = useCallback((noteData) => {
    const newNote = {
      id: `NOTE${Date.now()}`,
      ...noteData,
      date: new Date().toISOString().split('T')[0],
      isRead: false
    };
    setNotesData(prev => [...prev, newNote]);
    showToast('Note added successfully!', 'success');
    return newNote;
  }, [showToast]);

  const recordAttendance = useCallback((attendanceList) => {
    const newRecords = attendanceList.map((a, i) => ({
      id: `ATT${Date.now()}${i}`,
      ...a,
      date: new Date().toISOString().split('T')[0]
    }));
    setAttendanceData(prev => [...prev, ...newRecords]);
    showToast('Attendance recorded!', 'success');
    return newRecords;
  }, [showToast]);

  const createSubject = useCallback((subjectData) => {
    const newSubject = {
      id: `SUB${Date.now()}`,
      ...subjectData,
      studentIds: []
    };
    setSubjectsData(prev => [...prev, newSubject]);
    showToast('Subject created successfully!', 'success');
    return newSubject;
  }, [showToast]);

  const addStudentToSubject = useCallback((subjectId, studentId) => {
    setSubjectsData(prev => prev.map(s =>
      s.id === subjectId && !s.studentIds.includes(studentId)
        ? { ...s, studentIds: [...s.studentIds, studentId] }
        : s
    ));
    showToast('Student added to subject!', 'success');
  }, [showToast]);

  // Admin functions
  const createAnnouncement = useCallback((announcementData) => {
    const newAnnouncement = {
      id: `ANN${Date.now()}`,
      ...announcementData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAnnouncementsData(prev => [newAnnouncement, ...prev]);
    showToast('Announcement published!', 'success');
    return newAnnouncement;
  }, [showToast]);

  const updateComplaint = useCallback((complaintId, updates) => {
    setComplaintsData(prev => prev.map(c =>
      c.id === complaintId ? { ...c, ...updates } : c
    ));
    showToast('Complaint updated!', 'success');
  }, [showToast]);

  const getFilteredAnnouncements = useCallback((audience) => {
    return announcementsData.filter(a =>
      a.targetAudience.includes(audience) || a.targetAudience.includes('all')
    );
  }, [announcementsData]);

  // Get pending requests for a student
  const getStudentPendingRequests = useCallback((studentId) => {
    return pendingRequests.filter(r => r.studentId === studentId);
  }, [pendingRequests]);

  const value = {
    // User state
    userType,
    currentUser,
    loginAs,
    logout,

    // Data
    studentsData,
    parentsData,
    teachersData,
    adminsData,
    subjectsData,
    gradesData,
    notesData,
    announcementsData,
    complaintsData,
    attendanceData,
    pendingRequests,

    // Student functions
    getStudentSubjects,
    getStudentGrades,
    getStudentNotes,
    getStudentPendingRequests,
    approveParentRequest,
    rejectParentRequest,

    // Parent functions
    getParentChildren,
    requestAddChild,

    // Teacher functions
    getTeacherSubjects,
    getSubjectStudents,
    addGrade,
    addNote,
    recordAttendance,
    createSubject,
    addStudentToSubject,

    // Admin functions
    createAnnouncement,
    updateComplaint,
    getFilteredAnnouncements,

    // Utils
    toasts,
    showToast
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
