import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Layers, 
  CheckCircle, 
  XCircle, 
  Briefcase, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { 
  selectSelectedDate, 
  selectSelectedSubject, 
  selectSelectedSemester, 
  selectSelectedSection,
  setDate,
  setSubject,
  setSemester,
  setSection
} from '../features/filters/filtersSlice';
import { AVAILABLE_SUBJECTS } from '../services/mockStudents';
import { selectClassAttendanceSummary } from '../features/selectors/attendanceSelectors';

export default function ClassSelectorBar() {
  const dispatch = useDispatch();
  const date = useSelector(selectSelectedDate);
  const subject = useSelector(selectSelectedSubject);
  const semester = useSelector(selectSelectedSemester);
  const section = useSelector(selectSelectedSection);
  const summary = useSelector(selectClassAttendanceSummary);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
      
      {/* Selection Form Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Date Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Attendance Date</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => dispatch(setDate(e.target.value))}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Subject Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academic Subject</span>
          </label>
          <select
            value={subject}
            onChange={(e) => dispatch(setSubject(e.target.value))}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition cursor-pointer"
          >
            {AVAILABLE_SUBJECTS.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Semester Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Semester</span>
          </label>
          <select
            value={semester}
            onChange={(e) => dispatch(setSemester(e.target.value))}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={String(sem)}>Semester {sem}</option>
            ))}
          </select>
        </div>

        {/* Section Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Section</span>
          </label>
          <select
            value={section}
            onChange={(e) => dispatch(setSection(e.target.value))}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition cursor-pointer"
          >
            {['A', 'B', 'C'].map((sec) => (
              <option key={sec} value={sec}>Section {sec}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Real-Time Redux Derived Class Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
        
        {/* Total Registered */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-medium">
            <span>Total Enrolled</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">
            {summary.total}
          </div>
        </div>

        {/* Present (P) */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
          <div className="flex items-center justify-between text-emerald-700 text-[11px] font-semibold">
            <span>Present (P)</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-900 mt-1">
            {summary.present}
          </div>
        </div>

        {/* Absent (A) */}
        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/70">
          <div className="flex items-center justify-between text-rose-700 text-[11px] font-semibold">
            <span>Absent (A)</span>
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-extrabold text-rose-900 mt-1">
            {summary.absent}
          </div>
        </div>

        {/* Internship (PL) */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/70">
          <div className="flex items-center justify-between text-blue-700 text-[11px] font-semibold">
            <span>Internship (PL)</span>
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-extrabold text-blue-900 mt-1">
            {summary.internship}
          </div>
        </div>

        {/* Engagement (E) */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70">
          <div className="flex items-center justify-between text-amber-700 text-[11px] font-semibold">
            <span>Official (E)</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-amber-900 mt-1">
            {summary.engagement}
          </div>
        </div>

        {/* Session Attendance Rate */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/70">
          <div className="flex items-center justify-between text-indigo-700 text-[11px] font-semibold">
            <span>Class Rate</span>
            <span className="text-[10px] font-mono bg-indigo-200/60 px-1 rounded">RTK</span>
          </div>
          <div className="text-xl font-black text-indigo-900 mt-1">
            {summary.classRate}%
          </div>
        </div>

      </div>

    </div>
  );
}

