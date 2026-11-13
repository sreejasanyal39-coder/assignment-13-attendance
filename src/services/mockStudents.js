export const INITIAL_STUDENTS = [
  {
    id: "231001102019",
    name: "SREEJA SANYAL",
    department: "BCA",
    semester: "4",
    section: "A",
    email: "sreeja.sanyal@technoindia.edu.in",
    phone: "7003021997"
  },
  {
    id: "231001102001",
    name: "Aarav Mukherjee",
    department: "BCA",
    semester: "4",
    section: "A",
    email: "aarav.m@technoindia.edu.in",
    phone: "9830112233"
  },
  {
    id: "231001102002",
    name: "Ananya Ghosh",
    department: "BCA",
    semester: "4",
    section: "A",
    email: "ananya.g@technoindia.edu.in",
    phone: "9830223344"
  },
  {
    id: "231001102003",
    name: "Debanjan Das",
    department: "BCA",
    semester: "4",
    section: "A",
    email: "debanjan.d@technoindia.edu.in",
    phone: "9830334455"
  },
  {
    id: "231001102004",
    name: "Ishita Banerjee",
    department: "BCA",
    semester: "4",
    section: "A",
    email: "ishita.b@technoindia.edu.in",
    phone: "9830445566"
  },
  {
    id: "231001102005",
    name: "Pritam Sen",
    department: "BCA",
    semester: "4",
    section: "A",
    email: "pritam.s@technoindia.edu.in",
    phone: "9830556677"
  },
  {
    id: "231001102006",
    name: "Rohan Chakraborty",
    department: "BCA",
    semester: "4",
    section: "B",
    email: "rohan.c@technoindia.edu.in",
    phone: "9830667788"
  },
  {
    id: "231001102007",
    name: "Sneha Roy",
    department: "BCA",
    semester: "4",
    section: "B",
    email: "sneha.r@technoindia.edu.in",
    phone: "9830778899"
  },
  {
    id: "231001102008",
    name: "Sourav Ganguly",
    department: "BCA",
    semester: "4",
    section: "B",
    email: "sourav.g@technoindia.edu.in",
    phone: "9830889900"
  },
  {
    id: "231001102009",
    name: "Trisha Paul",
    department: "BCA",
    semester: "4",
    section: "B",
    email: "trisha.p@technoindia.edu.in",
    phone: "9830990011"
  }
];

export const AVAILABLE_SUBJECTS = [
  "Advanced Web Development",
  "Cloud Computing & DevOps",
  "Database Management Systems",
  "Data Structures & Algorithms",
  "Object Oriented Programming (Java)",
  "Software Engineering"
];

// Pre-seeded attendance records for several past dates so reports & charts are populated
export const generateInitialAttendance = () => {
  const records = {};
  const dates = ["2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13"];
  const subjects = AVAILABLE_SUBJECTS.slice(0, 3);

  dates.forEach((date) => {
    subjects.forEach((subject) => {
      INITIAL_STUDENTS.forEach((student) => {
        const key = `${student.id}_${subject}_${date}`;
        let status = 'P';
        
        // Sreeja has high attendance (P or PL)
        if (student.id === "231001102019") {
          status = date === "2026-11-12" ? 'PL' : 'P';
        } else if (student.id === "231001102003" || student.id === "231001102008") {
          // A couple of students have low attendance to test < 45% threshold
          status = date === "2026-11-10" ? 'P' : 'A';
        } else if (student.id === "231001102005") {
          status = 'E'; // Official Engagement
        } else {
          status = Math.random() > 0.25 ? 'P' : 'A';
        }

        records[key] = {
          studentId: student.id,
          studentName: student.name,
          subject,
          date,
          status, // 'P' | 'A' | 'PL' | 'E'
          semester: student.semester,
          section: student.section,
          updatedAt: new Date().toISOString()
        };
      });
    });
  });

  return records;
};

