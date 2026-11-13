import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents } from '../students/studentsSlice';
import { selectAttendanceRecords } from '../attendance/attendanceSlice';
import { 
  selectSelectedDate, 
  selectSelectedSubject, 
  selectSelectedSemester, 
  selectSelectedSection, 
  selectSearchQuery, 
  selectThresholdPercentage,
  selectShowDefaultersOnly,
  selectStatusFilter
} from '../filters/filtersSlice';

// 1. Selector: Students registered for the currently selected class (Semester & Section)
export const selectClassStudents = createSelector(
  [selectAllStudents, selectSelectedSemester, selectSelectedSection],
  (students, semester, section) => {
    return students.filter(
      (s) => s.semester === semester && s.section === section
    );
  }
);

// 2. Selector: Individual student stats calculator across all recorded sessions
export const selectAllStudentStatsMap = createSelector(
  [selectAllStudents, selectAttendanceRecords, selectThresholdPercentage],
  (students, records, threshold) => {
    const statsMap = {};
    const recordList = Object.values(records);

    students.forEach((student) => {
      // Find all records for this student
      const studentRecords = recordList.filter((r) => r.studentId === student.id);
      const totalSessions = studentRecords.length;
      
      // Present (P), Internship Placed (PL), Official Engagement (E) count towards positive attendance
      // Absent (A) is not attended
      const attendedSessions = studentRecords.filter(
        (r) => r.status === 'P' || r.status === 'PL' || r.status === 'E'
      ).length;

      const percentage = totalSessions === 0 ? 100 : Math.round((attendedSessions / totalSessions) * 100);
      const isBelowThreshold = percentage < threshold;

      statsMap[student.id] = {
        totalSessions,
        attendedSessions,
        percentage,
        isBelowThreshold,
      };
    });

    return statsMap;
  }
);

// 3. Selector: Filtered students in current class with search and status filters
export const selectFilteredClassStudents = createSelector(
  [
    selectClassStudents, 
    selectAttendanceRecords, 
    selectAllStudentStatsMap, 
    selectSelectedSubject, 
    selectSelectedDate, 
    selectSearchQuery, 
    selectStatusFilter, 
    selectShowDefaultersOnly
  ],
  (students, records, statsMap, subject, date, query, statusFilter, showDefaultersOnly) => {
    return students.filter((student) => {
      // Search by ID or Name
      if (query.trim() !== '') {
        const q = query.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(q);
        const matchesId = student.id.toLowerCase().includes(q);
        if (!matchesName && !matchesId) return false;
      }

      // Check threshold defaulter filter
      const stats = statsMap[student.id] || { percentage: 100, isBelowThreshold: false };
      if (showDefaultersOnly && !stats.isBelowThreshold) {
        return false;
      }

      // Check status filter for active class session
      const key = `${student.id}_${subject}_${date}`;
      const record = records[key];
      const studentStatus = record ? record.status : 'UNMARKED';

      if (statusFilter !== 'all' && studentStatus !== statusFilter) {
        return false;
      }

      return true;
    });
  }
);

// 4. Selector: Summary stats for the current selected class session (Present, Absent, PL, E, Unmarked)
export const selectClassAttendanceSummary = createSelector(
  [selectClassStudents, selectAttendanceRecords, selectSelectedSubject, selectSelectedDate],
  (students, records, subject, date) => {
    let present = 0;
    let absent = 0;
    let internship = 0;
    let engagement = 0;
    let unmarked = 0;

    students.forEach((student) => {
      const key = `${student.id}_${subject}_${date}`;
      const record = records[key];
      if (!record) {
        unmarked++;
      } else if (record.status === 'P') {
        present++;
      } else if (record.status === 'A') {
        absent++;
      } else if (record.status === 'PL') {
        internship++;
      } else if (record.status === 'E') {
        engagement++;
      }
    });

    const total = students.length;
    const markedTotal = total - unmarked;
    const effectiveAttended = present + internship + engagement;
    const classRate = markedTotal === 0 ? 0 : Math.round((effectiveAttended / markedTotal) * 100);

    return {
      total,
      present,
      absent,
      internship,
      engagement,
      unmarked,
      markedTotal,
      classRate,
    };
  }
);

// 5. Selector: Overall List of Defaulter Students (< configurable threshold)
export const selectDefaulterStudentsList = createSelector(
  [selectAllStudents, selectAllStudentStatsMap],
  (students, statsMap) => {
    return students
      .filter((s) => statsMap[s.id]?.isBelowThreshold)
      .map((s) => ({
        ...s,
        stats: statsMap[s.id],
      }));
  }
);

// 6. Selector: Subject-wise Attendance Distribution
export const selectSubjectStatsReport = createSelector(
  [selectAttendanceRecords],
  (records) => {
    const recordList = Object.values(records);
    const subjectMap = {};

    recordList.forEach((r) => {
      if (!subjectMap[r.subject]) {
        subjectMap[r.subject] = { total: 0, attended: 0, absent: 0 };
      }
      subjectMap[r.subject].total++;
      if (r.status === 'P' || r.status === 'PL' || r.status === 'E') {
        subjectMap[r.subject].attended++;
      } else {
        subjectMap[r.subject].absent++;
      }
    });

    return Object.keys(subjectMap).map((subject) => {
      const data = subjectMap[subject];
      const rate = data.total === 0 ? 0 : Math.round((data.attended / data.total) * 100);
      return {
        subject,
        total: data.total,
        attended: data.attended,
        absent: data.absent,
        rate,
      };
    });
  }
);

// 7. Selector: Status Breakdown (for pie / doughnut chart)
export const selectStatusDistribution = createSelector(
  [selectAttendanceRecords],
  (records) => {
    const list = Object.values(records);
    let p = 0, a = 0, pl = 0, e = 0;
    list.forEach((r) => {
      if (r.status === 'P') p++;
      else if (r.status === 'A') a++;
      else if (r.status === 'PL') pl++;
      else if (r.status === 'E') e++;
    });
    return { p, a, pl, e, total: list.length };
  }
);
