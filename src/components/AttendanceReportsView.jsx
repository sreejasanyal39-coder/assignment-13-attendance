import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Download, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Calendar, 
  Layers, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectAttendanceRecords } from '../features/attendance/attendanceSlice';
import { selectThresholdPercentage } from '../features/filters/filtersSlice';
import { AVAILABLE_SUBJECTS } from '../services/mockStudents';

export default function AttendanceReportsView() {
  const students = useSelector(selectAllStudents);
  const records = useSelector(selectAttendanceRecords);
  const threshold = useSelector(selectThresholdPercentage);

  const [filterStudent, setFilterStudent] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [reportType, setReportType] = useState('all'); // 'all' | 'daily' | 'monthly'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Extract all record values as an array
  const rawList = Object.values(records);

  // Filter records
  const filteredRecords = rawList.filter((r) => {
    if (filterStudent !== 'all' && r.studentId !== filterStudent) return false;
    if (filterSubject !== 'all' && r.subject !== filterSubject) return false;
    if (filterSemester !== 'all' && r.semester !== filterSemester) return false;
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    return true;
  }).sort((a, b) => b.date.localeCompare(a.date));

  // Export to CSV function (Requirement: "Export reports to CSV")
  const exportToCSV = () => {
    if (filteredRecords.length === 0) {
      alert('No records to export with current filters.');
      return;
    }

    const headers = [
      'Date',
      'Student ID',
      'Student Name',
      'Subject',
      'Semester',
      'Section',
      'Attendance Status',
      'Status Full Description',
      'Updated At'
    ];

    const getStatusLabel = (code) => {
      if (code === 'P') return 'Present';
      if (code === 'A') return 'Absent';
      if (code === 'PL') return 'Internship Placed';
      if (code === 'E') return 'Official Engagement';
      return 'Unknown';
    };

    const rows = filteredRecords.map((r) => [
      `"${r.date}"`,
      `"${r.studentId}"`,
      `"${r.studentName}"`,
      `"${r.subject}"`,
      `"Sem ${r.semester}"`,
      `"${r.section}"`,
      `"${r.status}"`,
      `"${getStatusLabel(r.status)}"`,
      `"${r.updatedAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TIU_Attendance_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      
      {/* Header and Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            Attendance Reports & CSV Export
          </h2>
          <p className="text-xs text-slate-500">
            Daily and monthly consolidated attendance logs with multi-dimensional filtering
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-600/20"
        >
          <Download className="w-4 h-4" />
          <span>Export Reports to CSV</span>
        </button>
      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        
        {/* Student Filter */}
        <div>
          <label className="block text-slate-600 font-bold mb-1">Filter by Student</label>
          <select
            value={filterStudent}
            onChange={(e) => setFilterStudent(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
          >
            <option value="all">All Students ({students.length})</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block text-slate-600 font-bold mb-1">Filter by Subject</label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
          >
            <option value="all">All Subjects</option>
            {AVAILABLE_SUBJECTS.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-slate-600 font-bold mb-1">Semester</label>
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={String(sem)}>Semester {sem}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-slate-600 font-bold mb-1">From Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-slate-600 font-bold mb-1">To Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
          />
        </div>

      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Student</th>
              <th className="p-3.5">Student ID</th>
              <th className="p-3.5">Subject</th>
              <th className="p-3.5">Sem / Sec</th>
              <th className="p-3.5 text-center">Status</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">
                  No attendance records found matching selected filter criteria.
                </td>
              </tr>
            ) : (
              filteredRecords.slice(0, 100).map((record, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="p-3.5 font-mono text-slate-600 font-semibold">
                    {record.date}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">
                    {record.studentName}
                  </td>
                  <td className="p-3.5 font-mono text-slate-600">
                    {record.studentId}
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">
                    {record.subject}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    Sem {record.semester} • {record.section}
                  </td>
                  <td className="p-3.5 text-center">
                    <span 
                      className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                        record.status === 'P'
                          ? 'bg-emerald-100 text-emerald-800'
                          : record.status === 'A'
                          ? 'bg-rose-100 text-rose-800'
                          : record.status === 'PL'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {record.status === 'P' && 'Present (P)'}
                      {record.status === 'A' && 'Absent (A)'}
                      {record.status === 'PL' && 'Internship (PL)'}
                      {record.status === 'E' && 'Official (E)'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
        <span>Showing {filteredRecords.length} records in current report</span>
        <span>Ready for CSV download</span>
      </div>

    </div>
  );
}
