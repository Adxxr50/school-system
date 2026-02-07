// ============================================
// DUMMY DATA FOR SCHOOL MANAGEMENT SYSTEM
// ============================================

// School Information
export const schoolInfo = {
  name: "Sunrise Academy",
  address: "123 Education Lane, Knowledge City, KC 54321",
  phone: "(555) 123-4567",
  email: "info@sunriseacademy.edu",
  principal: "Dr. Margaret Williams",
  established: 2005,
  motto: "Enlightening Minds, Shaping Futures"
};

// ============================================
// STUDENTS DATA
// ============================================
export const students = [
  {
    id: "STU001",
    firstName: "Emma",
    lastName: "Johnson",
    email: "emma.johnson@student.sunrise.edu",
    dateOfBirth: "2010-03-15",
    age: 14,
    gender: "Female",
    gradeLevel: 9,
    className: "9-A",
    enrollmentDate: "2019-09-01",
    address: "456 Maple Street, Knowledge City",
    phone: "(555) 234-5678",
    emergencyContact: "Sarah Johnson - (555) 234-5679",
    parentIds: ["PAR001"],
    profileImage: null,
    status: "Active",
    bloodType: "A+",
    allergies: ["Peanuts"],
    attendance: {
      totalDays: 120,
      present: 115,
      absent: 3,
      late: 2,
      percentage: 95.8
    }
  },
  {
    id: "STU002",
    firstName: "Liam",
    lastName: "Smith",
    email: "liam.smith@student.sunrise.edu",
    dateOfBirth: "2010-07-22",
    age: 14,
    gender: "Male",
    gradeLevel: 9,
    className: "9-A",
    enrollmentDate: "2019-09-01",
    address: "789 Oak Avenue, Knowledge City",
    phone: "(555) 345-6789",
    emergencyContact: "Michael Smith - (555) 345-6780",
    parentIds: ["PAR002"],
    profileImage: null,
    status: "Active",
    bloodType: "O+",
    allergies: [],
    attendance: {
      totalDays: 120,
      present: 118,
      absent: 1,
      late: 1,
      percentage: 98.3
    }
  },
  {
    id: "STU003",
    firstName: "Olivia",
    lastName: "Brown",
    email: "olivia.brown@student.sunrise.edu",
    dateOfBirth: "2009-11-08",
    age: 15,
    gender: "Female",
    gradeLevel: 10,
    className: "10-B",
    enrollmentDate: "2018-09-01",
    address: "321 Pine Road, Knowledge City",
    phone: "(555) 456-7890",
    emergencyContact: "Jennifer Brown - (555) 456-7891",
    parentIds: ["PAR003"],
    profileImage: null,
    status: "Active",
    bloodType: "B+",
    allergies: ["Dairy"],
    attendance: {
      totalDays: 120,
      present: 110,
      absent: 8,
      late: 2,
      percentage: 91.7
    }
  },
  {
    id: "STU004",
    firstName: "Noah",
    lastName: "Davis",
    email: "noah.davis@student.sunrise.edu",
    dateOfBirth: "2011-02-28",
    age: 13,
    gender: "Male",
    gradeLevel: 8,
    className: "8-A",
    enrollmentDate: "2020-09-01",
    address: "654 Birch Lane, Knowledge City",
    phone: "(555) 567-8901",
    emergencyContact: "Robert Davis - (555) 567-8902",
    parentIds: ["PAR004"],
    profileImage: null,
    status: "Active",
    bloodType: "AB+",
    allergies: [],
    attendance: {
      totalDays: 120,
      present: 117,
      absent: 2,
      late: 1,
      percentage: 97.5
    }
  },
  {
    id: "STU005",
    firstName: "Sophia",
    lastName: "Martinez",
    email: "sophia.martinez@student.sunrise.edu",
    dateOfBirth: "2010-05-14",
    age: 14,
    gender: "Female",
    gradeLevel: 9,
    className: "9-B",
    enrollmentDate: "2019-09-01",
    address: "987 Cedar Court, Knowledge City",
    phone: "(555) 678-9012",
    emergencyContact: "Maria Martinez - (555) 678-9013",
    parentIds: ["PAR005"],
    profileImage: null,
    status: "Active",
    bloodType: "O-",
    allergies: ["Shellfish"],
    attendance: {
      totalDays: 120,
      present: 119,
      absent: 0,
      late: 1,
      percentage: 99.2
    }
  },
  {
    id: "STU006",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@student.sunrise.edu",
    dateOfBirth: "2009-09-30",
    age: 15,
    gender: "Male",
    gradeLevel: 10,
    className: "10-A",
    enrollmentDate: "2018-09-01",
    address: "147 Elm Street, Knowledge City",
    phone: "(555) 789-0123",
    emergencyContact: "David Wilson - (555) 789-0124",
    parentIds: ["PAR006"],
    profileImage: null,
    status: "Active",
    bloodType: "A-",
    allergies: [],
    attendance: {
      totalDays: 120,
      present: 112,
      absent: 5,
      late: 3,
      percentage: 93.3
    }
  },
  {
    id: "STU007",
    firstName: "Isabella",
    lastName: "Anderson",
    email: "isabella.anderson@student.sunrise.edu",
    dateOfBirth: "2011-12-05",
    age: 13,
    gender: "Female",
    gradeLevel: 8,
    className: "8-B",
    enrollmentDate: "2020-09-01",
    address: "258 Walnut Avenue, Knowledge City",
    phone: "(555) 890-1234",
    emergencyContact: "Lisa Anderson - (555) 890-1235",
    parentIds: ["PAR007"],
    profileImage: null,
    status: "Active",
    bloodType: "B-",
    allergies: ["Gluten"],
    attendance: {
      totalDays: 120,
      present: 116,
      absent: 3,
      late: 1,
      percentage: 96.7
    }
  },
  {
    id: "STU008",
    firstName: "Benjamin",
    lastName: "Taylor",
    email: "benjamin.taylor@student.sunrise.edu",
    dateOfBirth: "2010-08-19",
    age: 14,
    gender: "Male",
    gradeLevel: 9,
    className: "9-A",
    enrollmentDate: "2019-09-01",
    address: "369 Spruce Drive, Knowledge City",
    phone: "(555) 901-2345",
    emergencyContact: "Karen Taylor - (555) 901-2346",
    parentIds: ["PAR001"], // Same parent as Emma (siblings)
    profileImage: null,
    status: "Active",
    bloodType: "A+",
    allergies: [],
    attendance: {
      totalDays: 120,
      present: 114,
      absent: 4,
      late: 2,
      percentage: 95.0
    }
  }
];

// ============================================
// PARENTS DATA
// ============================================
export const parents = [
  {
    id: "PAR001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 234-5679",
    address: "456 Maple Street, Knowledge City",
    occupation: "Software Engineer",
    childrenIds: ["STU001", "STU008"],
    relationship: "Mother",
    profileImage: null,
    pendingChildRequests: []
  },
  {
    id: "PAR002",
    firstName: "Michael",
    lastName: "Smith",
    email: "michael.smith@email.com",
    phone: "(555) 345-6780",
    address: "789 Oak Avenue, Knowledge City",
    occupation: "Accountant",
    childrenIds: ["STU002"],
    relationship: "Father",
    profileImage: null,
    pendingChildRequests: []
  },
  {
    id: "PAR003",
    firstName: "Jennifer",
    lastName: "Brown",
    email: "jennifer.brown@email.com",
    phone: "(555) 456-7891",
    address: "321 Pine Road, Knowledge City",
    occupation: "Doctor",
    childrenIds: ["STU003"],
    relationship: "Mother",
    profileImage: null,
    pendingChildRequests: []
  },
  {
    id: "PAR004",
    firstName: "Robert",
    lastName: "Davis",
    email: "robert.davis@email.com",
    phone: "(555) 567-8902",
    address: "654 Birch Lane, Knowledge City",
    occupation: "Teacher",
    childrenIds: ["STU004"],
    relationship: "Father",
    profileImage: null,
    pendingChildRequests: []
  },
  {
    id: "PAR005",
    firstName: "Maria",
    lastName: "Martinez",
    email: "maria.martinez@email.com",
    phone: "(555) 678-9013",
    address: "987 Cedar Court, Knowledge City",
    occupation: "Nurse",
    childrenIds: ["STU005"],
    relationship: "Mother",
    profileImage: null,
    pendingChildRequests: []
  },
  {
    id: "PAR006",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@email.com",
    phone: "(555) 789-0124",
    address: "147 Elm Street, Knowledge City",
    occupation: "Architect",
    childrenIds: ["STU006"],
    relationship: "Father",
    profileImage: null,
    pendingChildRequests: []
  },
  {
    id: "PAR007",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@email.com",
    phone: "(555) 890-1235",
    address: "258 Walnut Avenue, Knowledge City",
    occupation: "Marketing Manager",
    childrenIds: ["STU007"],
    relationship: "Mother",
    profileImage: null,
    pendingChildRequests: []
  }
];

// ============================================
// TEACHERS DATA
// ============================================
export const teachers = [
  {
    id: "TCH001",
    firstName: "John",
    lastName: "Williams",
    email: "john.williams@sunrise.edu",
    phone: "(555) 111-2222",
    address: "100 Faculty Road, Knowledge City",
    department: "Mathematics",
    qualification: "M.Sc. Mathematics, Ph.D. Applied Mathematics",
    joinDate: "2015-08-15",
    subjectIds: ["SUB001", "SUB002"],
    profileImage: null,
    status: "Active",
    experience: "10 years"
  },
  {
    id: "TCH002",
    firstName: "Emily",
    lastName: "Clark",
    email: "emily.clark@sunrise.edu",
    phone: "(555) 222-3333",
    address: "101 Faculty Road, Knowledge City",
    department: "Science",
    qualification: "M.Sc. Physics, B.Ed.",
    joinDate: "2017-08-20",
    subjectIds: ["SUB003", "SUB004"],
    profileImage: null,
    status: "Active",
    experience: "8 years"
  },
  {
    id: "TCH003",
    firstName: "David",
    lastName: "Thompson",
    email: "david.thompson@sunrise.edu",
    phone: "(555) 333-4444",
    address: "102 Faculty Road, Knowledge City",
    department: "English",
    qualification: "M.A. English Literature",
    joinDate: "2016-08-18",
    subjectIds: ["SUB005", "SUB006"],
    profileImage: null,
    status: "Active",
    experience: "12 years"
  },
  {
    id: "TCH004",
    firstName: "Susan",
    lastName: "Miller",
    email: "susan.miller@sunrise.edu",
    phone: "(555) 444-5555",
    address: "103 Faculty Road, Knowledge City",
    department: "History",
    qualification: "M.A. History, Ph.D. World History",
    joinDate: "2014-08-22",
    subjectIds: ["SUB007"],
    profileImage: null,
    status: "Active",
    experience: "15 years"
  },
  {
    id: "TCH005",
    firstName: "Richard",
    lastName: "Garcia",
    email: "richard.garcia@sunrise.edu",
    phone: "(555) 555-6666",
    address: "104 Faculty Road, Knowledge City",
    department: "Computer Science",
    qualification: "M.Sc. Computer Science",
    joinDate: "2019-08-25",
    subjectIds: ["SUB008"],
    profileImage: null,
    status: "Active",
    experience: "6 years"
  }
];

// ============================================
// ADMINS DATA
// ============================================
export const admins = [
  {
    id: "ADM001",
    firstName: "Margaret",
    lastName: "Williams",
    email: "margaret.williams@sunrise.edu",
    phone: "(555) 100-1000",
    role: "Principal",
    profileImage: null,
    permissions: ["all"]
  },
  {
    id: "ADM002",
    firstName: "Thomas",
    lastName: "Harris",
    email: "thomas.harris@sunrise.edu",
    phone: "(555) 100-2000",
    role: "Vice Principal",
    profileImage: null,
    permissions: ["teachers", "students", "announcements", "complaints"]
  },
  {
    id: "ADM003",
    firstName: "Patricia",
    lastName: "Moore",
    email: "patricia.moore@sunrise.edu",
    phone: "(555) 100-3000",
    role: "Administrative Officer",
    profileImage: null,
    permissions: ["announcements", "complaints"]
  }
];

// ============================================
// SUBJECTS DATA
// ============================================
export const subjects = [
  {
    id: "SUB001",
    name: "Mathematics",
    code: "MATH-9",
    gradeLevel: 9,
    teacherId: "TCH001",
    description: "Algebra, Geometry, and Problem Solving",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 101",
    studentIds: ["STU001", "STU002", "STU005", "STU008"],
    credits: 4
  },
  {
    id: "SUB002",
    name: "Advanced Mathematics",
    code: "MATH-10",
    gradeLevel: 10,
    teacherId: "TCH001",
    description: "Calculus and Advanced Algebra",
    schedule: "Tue, Thu - 10:00 AM",
    room: "Room 101",
    studentIds: ["STU003", "STU006"],
    credits: 4
  },
  {
    id: "SUB003",
    name: "Physics",
    code: "PHY-9",
    gradeLevel: 9,
    teacherId: "TCH002",
    description: "Mechanics, Thermodynamics, Waves",
    schedule: "Mon, Wed - 11:00 AM",
    room: "Lab 201",
    studentIds: ["STU001", "STU002", "STU005", "STU008"],
    credits: 4
  },
  {
    id: "SUB004",
    name: "Chemistry",
    code: "CHEM-10",
    gradeLevel: 10,
    teacherId: "TCH002",
    description: "Organic and Inorganic Chemistry",
    schedule: "Tue, Thu - 11:00 AM",
    room: "Lab 202",
    studentIds: ["STU003", "STU006"],
    credits: 4
  },
  {
    id: "SUB005",
    name: "English Literature",
    code: "ENG-9",
    gradeLevel: 9,
    teacherId: "TCH003",
    description: "Classic and Modern Literature",
    schedule: "Mon, Wed, Fri - 1:00 PM",
    room: "Room 301",
    studentIds: ["STU001", "STU002", "STU005", "STU008"],
    credits: 3
  },
  {
    id: "SUB006",
    name: "English Composition",
    code: "ENG-8",
    gradeLevel: 8,
    teacherId: "TCH003",
    description: "Essay Writing and Grammar",
    schedule: "Tue, Thu - 1:00 PM",
    room: "Room 301",
    studentIds: ["STU004", "STU007"],
    credits: 3
  },
  {
    id: "SUB007",
    name: "World History",
    code: "HIST-9",
    gradeLevel: 9,
    teacherId: "TCH004",
    description: "Ancient Civilizations to Modern Era",
    schedule: "Tue, Thu - 2:00 PM",
    room: "Room 401",
    studentIds: ["STU001", "STU002", "STU005", "STU008"],
    credits: 3
  },
  {
    id: "SUB008",
    name: "Computer Science",
    code: "CS-9",
    gradeLevel: 9,
    teacherId: "TCH005",
    description: "Programming Fundamentals and Web Development",
    schedule: "Mon, Wed - 3:00 PM",
    room: "Computer Lab",
    studentIds: ["STU001", "STU002", "STU005", "STU008"],
    credits: 3
  }
];

// ============================================
// GRADES DATA
// ============================================
export const grades = [
  // Emma Johnson (STU001) grades
  { id: "GRD001", studentId: "STU001", subjectId: "SUB001", assignment: "Midterm Exam", score: 92, maxScore: 100, date: "2024-10-15", type: "exam" },
  { id: "GRD002", studentId: "STU001", subjectId: "SUB001", assignment: "Homework 1", score: 18, maxScore: 20, date: "2024-09-20", type: "homework" },
  { id: "GRD003", studentId: "STU001", subjectId: "SUB001", assignment: "Quiz 1", score: 9, maxScore: 10, date: "2024-09-30", type: "quiz" },
  { id: "GRD004", studentId: "STU001", subjectId: "SUB003", assignment: "Lab Report", score: 88, maxScore: 100, date: "2024-10-10", type: "project" },
  { id: "GRD005", studentId: "STU001", subjectId: "SUB003", assignment: "Midterm Exam", score: 85, maxScore: 100, date: "2024-10-15", type: "exam" },
  { id: "GRD006", studentId: "STU001", subjectId: "SUB005", assignment: "Essay 1", score: 45, maxScore: 50, date: "2024-10-05", type: "essay" },
  { id: "GRD007", studentId: "STU001", subjectId: "SUB005", assignment: "Book Report", score: 92, maxScore: 100, date: "2024-10-20", type: "project" },
  { id: "GRD008", studentId: "STU001", subjectId: "SUB007", assignment: "Research Paper", score: 88, maxScore: 100, date: "2024-10-12", type: "project" },
  { id: "GRD009", studentId: "STU001", subjectId: "SUB008", assignment: "Coding Project", score: 95, maxScore: 100, date: "2024-10-18", type: "project" },

  // Liam Smith (STU002) grades
  { id: "GRD010", studentId: "STU002", subjectId: "SUB001", assignment: "Midterm Exam", score: 78, maxScore: 100, date: "2024-10-15", type: "exam" },
  { id: "GRD011", studentId: "STU002", subjectId: "SUB001", assignment: "Homework 1", score: 16, maxScore: 20, date: "2024-09-20", type: "homework" },
  { id: "GRD012", studentId: "STU002", subjectId: "SUB003", assignment: "Lab Report", score: 82, maxScore: 100, date: "2024-10-10", type: "project" },
  { id: "GRD013", studentId: "STU002", subjectId: "SUB005", assignment: "Essay 1", score: 38, maxScore: 50, date: "2024-10-05", type: "essay" },
  { id: "GRD014", studentId: "STU002", subjectId: "SUB007", assignment: "Research Paper", score: 75, maxScore: 100, date: "2024-10-12", type: "project" },
  { id: "GRD015", studentId: "STU002", subjectId: "SUB008", assignment: "Coding Project", score: 88, maxScore: 100, date: "2024-10-18", type: "project" },

  // Olivia Brown (STU003) grades
  { id: "GRD016", studentId: "STU003", subjectId: "SUB002", assignment: "Midterm Exam", score: 95, maxScore: 100, date: "2024-10-15", type: "exam" },
  { id: "GRD017", studentId: "STU003", subjectId: "SUB004", assignment: "Lab Practical", score: 90, maxScore: 100, date: "2024-10-10", type: "practical" },

  // Noah Davis (STU004) grades
  { id: "GRD018", studentId: "STU004", subjectId: "SUB006", assignment: "Essay Writing", score: 85, maxScore: 100, date: "2024-10-08", type: "essay" },
  { id: "GRD019", studentId: "STU004", subjectId: "SUB006", assignment: "Grammar Test", score: 42, maxScore: 50, date: "2024-10-15", type: "exam" },

  // Sophia Martinez (STU005) grades
  { id: "GRD020", studentId: "STU005", subjectId: "SUB001", assignment: "Midterm Exam", score: 98, maxScore: 100, date: "2024-10-15", type: "exam" },
  { id: "GRD021", studentId: "STU005", subjectId: "SUB003", assignment: "Lab Report", score: 96, maxScore: 100, date: "2024-10-10", type: "project" },
  { id: "GRD022", studentId: "STU005", subjectId: "SUB005", assignment: "Essay 1", score: 48, maxScore: 50, date: "2024-10-05", type: "essay" },
  { id: "GRD023", studentId: "STU005", subjectId: "SUB007", assignment: "Research Paper", score: 94, maxScore: 100, date: "2024-10-12", type: "project" },
  { id: "GRD024", studentId: "STU005", subjectId: "SUB008", assignment: "Coding Project", score: 100, maxScore: 100, date: "2024-10-18", type: "project" },

  // Benjamin Taylor (STU008) grades
  { id: "GRD025", studentId: "STU008", subjectId: "SUB001", assignment: "Midterm Exam", score: 72, maxScore: 100, date: "2024-10-15", type: "exam" },
  { id: "GRD026", studentId: "STU008", subjectId: "SUB003", assignment: "Lab Report", score: 78, maxScore: 100, date: "2024-10-10", type: "project" },
  { id: "GRD027", studentId: "STU008", subjectId: "SUB005", assignment: "Essay 1", score: 35, maxScore: 50, date: "2024-10-05", type: "essay" },
];

// ============================================
// TEACHER NOTES (for parents to see)
// ============================================
export const teacherNotes = [
  {
    id: "NOTE001",
    studentId: "STU001",
    subjectId: "SUB001",
    teacherId: "TCH001",
    note: "Emma shows exceptional problem-solving skills. She consistently helps classmates understand difficult concepts.",
    type: "positive",
    date: "2024-10-20",
    isRead: false
  },
  {
    id: "NOTE002",
    studentId: "STU001",
    subjectId: "SUB003",
    teacherId: "TCH002",
    note: "Good participation in lab activities. Could improve on turning in lab reports on time.",
    type: "neutral",
    date: "2024-10-18",
    isRead: true
  },
  {
    id: "NOTE003",
    studentId: "STU002",
    subjectId: "SUB001",
    teacherId: "TCH001",
    note: "Liam needs to focus more during class. Recommend additional practice with algebraic equations.",
    type: "concern",
    date: "2024-10-19",
    isRead: false
  },
  {
    id: "NOTE004",
    studentId: "STU002",
    subjectId: "SUB008",
    teacherId: "TCH005",
    note: "Excellent creativity in coding projects! Liam has a natural talent for programming.",
    type: "positive",
    date: "2024-10-21",
    isRead: false
  },
  {
    id: "NOTE005",
    studentId: "STU005",
    subjectId: "SUB001",
    teacherId: "TCH001",
    note: "Sophia is an outstanding student. Perfect attendance and always prepared for class.",
    type: "positive",
    date: "2024-10-22",
    isRead: false
  },
  {
    id: "NOTE006",
    studentId: "STU008",
    subjectId: "SUB001",
    teacherId: "TCH001",
    note: "Benjamin has been struggling with recent material. I recommend scheduling a meeting to discuss tutoring options.",
    type: "concern",
    date: "2024-10-23",
    isRead: false
  },
  {
    id: "NOTE007",
    studentId: "STU008",
    subjectId: "SUB005",
    teacherId: "TCH003",
    note: "Great improvement in essay writing! Benjamin's latest assignment showed significant progress.",
    type: "positive",
    date: "2024-10-21",
    isRead: true
  }
];

// ============================================
// ANNOUNCEMENTS
// ============================================
export const announcements = [
  {
    id: "ANN001",
    title: "Winter Break Schedule",
    content: "School will be closed from December 20th to January 3rd for winter break. Classes resume January 4th. Have a safe and happy holiday season!",
    author: "ADM001",
    targetAudience: ["students", "teachers", "parents"],
    priority: "high",
    createdAt: "2024-10-25",
    expiresAt: "2024-12-20"
  },
  {
    id: "ANN002",
    title: "Parent-Teacher Conference",
    content: "Parent-teacher conferences will be held on November 15th from 4:00 PM to 8:00 PM. Please sign up for your preferred time slot through the parent portal.",
    author: "ADM002",
    targetAudience: ["parents", "teachers"],
    priority: "high",
    createdAt: "2024-10-20",
    expiresAt: "2024-11-15"
  },
  {
    id: "ANN003",
    title: "Science Fair Registration Open",
    content: "The annual science fair is coming! Students interested in participating should register by November 1st. See Ms. Clark for more details.",
    author: "ADM003",
    targetAudience: ["students", "parents"],
    priority: "medium",
    createdAt: "2024-10-18",
    expiresAt: "2024-11-01"
  },
  {
    id: "ANN004",
    title: "New Library Hours",
    content: "Starting next week, the library will have extended hours: Monday-Thursday 7:30 AM - 6:00 PM, Friday 7:30 AM - 4:00 PM.",
    author: "ADM003",
    targetAudience: ["students", "teachers"],
    priority: "low",
    createdAt: "2024-10-15",
    expiresAt: "2024-12-31"
  },
  {
    id: "ANN005",
    title: "Sports Day Announcement",
    content: "Annual Sports Day will be held on November 25th. All students are encouraged to participate. Sign-up sheets are available in the gym.",
    author: "ADM002",
    targetAudience: ["students", "parents", "teachers"],
    priority: "medium",
    createdAt: "2024-10-22",
    expiresAt: "2024-11-25"
  }
];

// ============================================
// COMPLAINTS
// ============================================
export const complaints = [
  {
    id: "CMP001",
    parentId: "PAR001",
    studentId: "STU001",
    subject: "Cafeteria Food Quality",
    description: "The quality of food served in the cafeteria has declined recently. My daughter has been complaining about the lack of healthy options.",
    status: "pending",
    priority: "medium",
    createdAt: "2024-10-20",
    assignedTo: null,
    resolution: null,
    resolvedAt: null
  },
  {
    id: "CMP002",
    parentId: "PAR002",
    studentId: "STU002",
    subject: "Homework Load",
    description: "My son has been receiving excessive homework, especially on weekends. It's affecting his sleep and family time.",
    status: "in_progress",
    priority: "high",
    createdAt: "2024-10-18",
    assignedTo: "ADM002",
    resolution: null,
    resolvedAt: null
  },
  {
    id: "CMP003",
    parentId: "PAR003",
    studentId: "STU003",
    subject: "Bus Route Delay",
    description: "The school bus for route 5 has been consistently late for the past two weeks, causing my daughter to miss morning announcements.",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-10-10",
    assignedTo: "ADM003",
    resolution: "Spoke with transportation department. Route schedule has been adjusted. Please monitor and report if issues persist.",
    resolvedAt: "2024-10-15"
  },
  {
    id: "CMP004",
    parentId: "PAR006",
    studentId: "STU006",
    subject: "Bullying Concern",
    description: "My son mentioned being teased by some classmates during lunch. I would like this matter to be investigated discreetly.",
    status: "in_progress",
    priority: "high",
    createdAt: "2024-10-22",
    assignedTo: "ADM001",
    resolution: null,
    resolvedAt: null
  }
];

// ============================================
// ATTENDANCE RECORDS
// ============================================
export const attendanceRecords = [
  // Recent attendance for various students
  { id: "ATT001", studentId: "STU001", date: "2024-10-25", status: "present", subjectId: "SUB001" },
  { id: "ATT002", studentId: "STU001", date: "2024-10-25", status: "present", subjectId: "SUB003" },
  { id: "ATT003", studentId: "STU001", date: "2024-10-24", status: "present", subjectId: "SUB005" },
  { id: "ATT004", studentId: "STU001", date: "2024-10-24", status: "late", subjectId: "SUB007" },
  { id: "ATT005", studentId: "STU002", date: "2024-10-25", status: "present", subjectId: "SUB001" },
  { id: "ATT006", studentId: "STU002", date: "2024-10-25", status: "absent", subjectId: "SUB003" },
  { id: "ATT007", studentId: "STU005", date: "2024-10-25", status: "present", subjectId: "SUB001" },
  { id: "ATT008", studentId: "STU005", date: "2024-10-25", status: "present", subjectId: "SUB003" },
  { id: "ATT009", studentId: "STU008", date: "2024-10-25", status: "late", subjectId: "SUB001" },
  { id: "ATT010", studentId: "STU008", date: "2024-10-24", status: "absent", subjectId: "SUB005" },
];

// ============================================
// SCHEDULE / TIMETABLE
// ============================================
export const schedule = {
  "9-A": [
    { day: "Monday", periods: [
      { time: "9:00-10:00", subject: "Mathematics", room: "101", teacher: "Mr. Williams" },
      { time: "10:00-11:00", subject: "English Literature", room: "301", teacher: "Mr. Thompson" },
      { time: "11:00-12:00", subject: "Physics", room: "Lab 201", teacher: "Ms. Clark" },
      { time: "12:00-1:00", subject: "Lunch", room: "Cafeteria", teacher: "-" },
      { time: "1:00-2:00", subject: "World History", room: "401", teacher: "Ms. Miller" },
      { time: "2:00-3:00", subject: "Computer Science", room: "Computer Lab", teacher: "Mr. Garcia" },
    ]},
    { day: "Tuesday", periods: [
      { time: "9:00-10:00", subject: "Physics", room: "Lab 201", teacher: "Ms. Clark" },
      { time: "10:00-11:00", subject: "Mathematics", room: "101", teacher: "Mr. Williams" },
      { time: "11:00-12:00", subject: "English Literature", room: "301", teacher: "Mr. Thompson" },
      { time: "12:00-1:00", subject: "Lunch", room: "Cafeteria", teacher: "-" },
      { time: "1:00-2:00", subject: "World History", room: "401", teacher: "Ms. Miller" },
      { time: "2:00-3:00", subject: "Physical Education", room: "Gym", teacher: "Coach Adams" },
    ]},
    { day: "Wednesday", periods: [
      { time: "9:00-10:00", subject: "Mathematics", room: "101", teacher: "Mr. Williams" },
      { time: "10:00-11:00", subject: "Computer Science", room: "Computer Lab", teacher: "Mr. Garcia" },
      { time: "11:00-12:00", subject: "Physics", room: "Lab 201", teacher: "Ms. Clark" },
      { time: "12:00-1:00", subject: "Lunch", room: "Cafeteria", teacher: "-" },
      { time: "1:00-2:00", subject: "English Literature", room: "301", teacher: "Mr. Thompson" },
      { time: "2:00-3:00", subject: "Art", room: "Art Studio", teacher: "Ms. Rivera" },
    ]},
    { day: "Thursday", periods: [
      { time: "9:00-10:00", subject: "World History", room: "401", teacher: "Ms. Miller" },
      { time: "10:00-11:00", subject: "Mathematics", room: "101", teacher: "Mr. Williams" },
      { time: "11:00-12:00", subject: "English Literature", room: "301", teacher: "Mr. Thompson" },
      { time: "12:00-1:00", subject: "Lunch", room: "Cafeteria", teacher: "-" },
      { time: "1:00-2:00", subject: "Physics", room: "Lab 201", teacher: "Ms. Clark" },
      { time: "2:00-3:00", subject: "Music", room: "Music Room", teacher: "Mr. Lee" },
    ]},
    { day: "Friday", periods: [
      { time: "9:00-10:00", subject: "Mathematics", room: "101", teacher: "Mr. Williams" },
      { time: "10:00-11:00", subject: "Computer Science", room: "Computer Lab", teacher: "Mr. Garcia" },
      { time: "11:00-12:00", subject: "English Literature", room: "301", teacher: "Mr. Thompson" },
      { time: "12:00-1:00", subject: "Lunch", room: "Cafeteria", teacher: "-" },
      { time: "1:00-2:00", subject: "Assembly", room: "Auditorium", teacher: "-" },
      { time: "2:00-3:00", subject: "Club Activities", room: "Various", teacher: "-" },
    ]},
  ]
};

// ============================================
// PENDING PARENT REQUESTS (for student approval)
// ============================================
export const pendingParentRequests = [
  // This would be populated when a parent tries to add a child
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getStudentById = (id) => students.find(s => s.id === id);
export const getParentById = (id) => parents.find(p => p.id === id);
export const getTeacherById = (id) => teachers.find(t => t.id === id);
export const getAdminById = (id) => admins.find(a => a.id === id);
export const getSubjectById = (id) => subjects.find(s => s.id === id);

export const getStudentGrades = (studentId) => grades.filter(g => g.studentId === studentId);
export const getStudentSubjects = (studentId) => subjects.filter(s => s.studentIds.includes(studentId));
export const getStudentNotes = (studentId) => teacherNotes.filter(n => n.studentId === studentId);
export const getParentChildren = (parentId) => {
  const parent = getParentById(parentId);
  if (!parent) return [];
  return parent.childrenIds.map(id => getStudentById(id)).filter(Boolean);
};
export const getTeacherSubjects = (teacherId) => subjects.filter(s => s.teacherId === teacherId);
export const getSubjectStudents = (subjectId) => {
  const subject = getSubjectById(subjectId);
  if (!subject) return [];
  return subject.studentIds.map(id => getStudentById(id)).filter(Boolean);
};

export const calculateGPA = (studentId) => {
  const studentGrades = getStudentGrades(studentId);
  if (studentGrades.length === 0) return 0;
  const totalPercentage = studentGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0);
  return (totalPercentage / studentGrades.length).toFixed(1);
};

export const getLetterGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

export const getGradeColor = (percentage) => {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 80) return 'text-blue-600';
  if (percentage >= 70) return 'text-yellow-600';
  if (percentage >= 60) return 'text-orange-600';
  return 'text-red-600';
};
