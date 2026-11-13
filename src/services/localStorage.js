const STUDENTS_KEY = 'assignment13_students';
const ATTENDANCE_KEY = 'assignment13_attendance';
const CONFIG_KEY = 'assignment13_config';

export const loadStoredData = () => {
  try {
    const students = localStorage.getItem(STUDENTS_KEY);
    const attendance = localStorage.getItem(ATTENDANCE_KEY);
    const config = localStorage.getItem(CONFIG_KEY);

    return {
      students: students ? JSON.parse(students) : null,
      attendance: attendance ? JSON.parse(attendance) : null,
      config: config ? JSON.parse(config) : null,
    };
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
    return { students: null, attendance: null, config: null };
  }
};

export const saveStudents = (students) => {
  try {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  } catch (e) {}
};

export const saveAttendance = (attendance) => {
  try {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
  } catch (e) {}
};

export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {}
};
