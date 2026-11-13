import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  Check, 
  X, 
  Briefcase, 
  Clock, 
  CheckCheck, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  ShieldAlert, 
  Save 
} from 'lucide-react';
import { 
  selectFilteredClassStudents, 
  selectAllStudentStatsMap 
} from '../features/selectors/attendanceSelectors';
import { 
  selectAttendanceRecords, 
  markAttendance, 
  bulkMarkAttendance, 
  syncAttendanceAsync,
  selectSyncStatus,
  selectLastSyncTime
} from '../features/attendance/attendanceSlice';
import { 
  selectSelectedDate, 
  selectSelectedSubject, 
  selectSelectedSemester, 
  selectSelectedSection, 
  selectSearchQuery, 
  setSearchQuery, 
  selectThresholdPercentage,
  selectStatusFilter,
  setStatusFilter,
  resetFilters
} from '../features/filters/filtersSlice';

export default function AttendanceTable({ onEditStudent }) {
  const dispatch = useDispatch();
  const students = useSelector(selectFilteredClassStudents);
  const statsMap = useSelector(selectAllStudentStatsMap);
  const records = useSelector(selectAttendanceRecords);
  
  const date = useSelector(selectSelectedDate);
  const subject = useSelector(selectSelectedSubject);
  const semester = useSelector(selectSelectedSemester);
  const section = useSelector(selectSelectedSection);
  const searchQuery = useSelector(selectSearchQuery);
  const statusFilter = useSelector(selectStatusFilter);
  const threshold = useSelector(selectThresholdPercentage);
  const syncStatus = useSelector(selectSyncStatus);
  const lastSyncTime = useSelector(selectLastSyncTime);

  const handleMark = (student, status) => {
    dispatch(markAttendance({
      studentId: student.id,
      studentName: student.name,
      subject,
      date,
      status,
      semester,
      section,
    }));
  };

  const handleMarkAllPresent = () => {
    dispatch(bulkMarkAttendance({
      students,
      subject,
      date,
      status: 'P',
      semester,
      section,
    }));
  };

  const handleSyncToReduxStore = () => {
    dispatch(syncAttendanceAsync(records));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4 p-6">
      
      {/* Table Toolbar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students by Name or ID..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter by status & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Quick Filter */}
          <select
            value={statusFilter}
            onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="P">Present (P) Only</option>
            <option value="A">Absent (A) Only</option>
            <option value="PL">Internship (PL) Only</option>
            <option value="E">Official (E) Only</option>
            <option value="UNMARKED">Unmarked Only</option>
          </select>

          {/* Mark All Present */}
          <button
            onClick={handleMarkAllPresent}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm active:scale-95"
            title="Mark all registered students in this session as Present"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Present</span>
          </button>

          {/* Save/Sync Centrally */}
          <button
            onClick={handleSyncToReduxStore}
            disabled={syncStatus === 'syncing'}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
            title="Centrally save & sync attendance records via Redux Toolkit AsyncThunk"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Sync Centrally'}</span>
          </button>

        </div>

      </div>

      {/* Main Students Roster Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Student Details</th>
              <th className="p-3.5">Student ID</th>
              <th className="p-3.5">Dept / Sem / Sec</th>
              <th className="p-3.5 text-center">Attendance %</th>
              <th className="p-3.5 text-center">Mark Status for {date}</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">
                  No students found matching current filters for Semester {semester}, Section {section}.
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const key = `${student.id}_${subject}_${date}`;
                const currentStatus = records[key]?.status || null;
                const stats = statsMap[student.id] || { percentage: 100, isBelowThreshold: false, totalSessions: 0 };
                const isBelow = stats.percentage < threshold;

                return (
                  <tr 
                    key={student.id} 
                    className="hover:bg-slate-50/70 transition"
                  >
                    {/* Student Name & Avatar */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 flex-shrink-0">
                          {student.id === "231001102019" ? (
                            <img src="/student-id.jpg" alt="Sreeja Sanyal" className="w-full h-full object-cover" />
                          ) : (
                            student.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            {student.name}
                            {student.id === "231001102019" && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-indigo-100 text-indigo-700 uppercase">
                                Assignment Author
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{student.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td className="p-3.5 font-mono font-bold text-slate-700">
                      {student.id}
                    </td>

                    {/* Dept / Sem / Sec */}
                    <td className="p-3.5 text-slate-600 font-medium">
                      {student.department} • Sem {student.semester} • Sec {student.section}
                    </td>

                    {/* Attendance Percentage Badge */}
                    <td className="p-3.5 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <span 
                          className={`px-2.5 py-1 rounded-full text-xs font-black shadow-xs ${
                            isBelow
                              ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {stats.percentage}%
                        </span>
                        {isBelow && (
                          <span title={`Attendance is below ${threshold}% threshold!`}>
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Attendance Marking Buttons (P, A, PL, E) */}
                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Present (P) */}
                        <button
                          onClick={() => handleMark(student, 'P')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                            currentStatus === 'P'
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                          title="Mark Present"
                        >
                          <Check className="w-3 h-3" />
                          <span>P</span>
                        </button>

                        {/* Absent (A) */}
                        <button
                          onClick={() => handleMark(student, 'A')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                            currentStatus === 'A'
                              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700'
                          }`}
                          title="Mark Absent"
                        >
                          <X className="w-3 h-3" />
                          <span>A</span>
                        </button>

                        {/* Internship Placed (PL) */}
                        <button
                          onClick={() => handleMark(student, 'PL')}
                          className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                            currentStatus === 'PL'
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                          }`}
                          title="Mark Internship Placed (counts as positive attendance)"
                        >
                          <Briefcase className="w-3 h-3" />
                          <span>PL</span>
                        </button>

                        {/* Official Engagement (E) */}
                        <button
                          onClick={() => handleMark(student, 'E')}
                          className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                            currentStatus === 'E'
                              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-700'
                          }`}
                          title="Mark Official Engagement / University Duty"
                        >
                          <Clock className="w-3 h-3" />
                          <span>E</span>
                        </button>
                      </div>
                    </td>

                    {/* Edit Student Details */}
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onEditStudent(student)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                        title="Edit student record"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 px-1">
        <span>Duplicate prevention: composite key <code>(studentId, subject, date)</code> strictly maintained.</span>
        <span>Centrally saved in Redux Toolkit state • Last Synced: {lastSyncTime}</span>
      </div>

    </div>
  );
}
