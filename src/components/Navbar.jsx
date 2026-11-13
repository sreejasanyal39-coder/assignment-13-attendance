import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ClipboardCheck, 
  UserPlus, 
  FileText, 
  PieChart, 
  Terminal, 
  CheckCircle2, 
  GraduationCap,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { selectActiveTab, setActiveTab } from '../features/filters/filtersSlice';
import { resetAttendanceToDefault } from '../features/attendance/attendanceSlice';
import { resetStudentsToDefault } from '../features/students/studentsSlice';

export default function Navbar({ onOpenInspector, onOpenTests, onOpenAddStudent }) {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const handleResetData = () => {
    if (window.confirm('Reset student records and attendance to original Techno India University demo dataset?')) {
      dispatch(resetAttendanceToDefault());
      dispatch(resetStudentsToDefault());
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Student Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-900 bg-clip-text text-transparent">
                  AttendDate
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  RTK
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-600" /> Sreeja Sanyal • 231001102019
              </p>
            </div>
          </div>

          {/* Center Tabs: Mark Attendance | Reports | Charts */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/70 text-xs font-bold">
            <button
              onClick={() => dispatch(setActiveTab('mark'))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                activeTab === 'mark'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Mark Attendance</span>
            </button>

            <button
              onClick={() => dispatch(setActiveTab('reports'))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                activeTab === 'reports'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Attendance Reports</span>
            </button>

            <button
              onClick={() => dispatch(setActiveTab('analytics'))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                activeTab === 'analytics'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Visual Charts</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Add Student Button */}
            <button
              onClick={onOpenAddStudent}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Student</span>
            </button>

            {/* Redux Live Inspector */}
            <button
              onClick={onOpenInspector}
              title="Inspect Dispatched Redux Actions & State"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              <span>Redux Live</span>
            </button>

            {/* RTK Tests */}
            <button
              onClick={onOpenTests}
              title="Run Automated Redux Tests"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>RTK Tests</span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={handleResetData}
              title="Reset records to default TIU sample dataset"
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Mobile View Navigation Pills */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => dispatch(setActiveTab('mark'))}
            className={`px-3 py-1.5 rounded-lg ${activeTab === 'mark' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
          >
            Mark
          </button>
          <button
            onClick={() => dispatch(setActiveTab('reports'))}
            className={`px-3 py-1.5 rounded-lg ${activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
          >
            Reports (CSV)
          </button>
          <button
            onClick={() => dispatch(setActiveTab('analytics'))}
            className={`px-3 py-1.5 rounded-lg ${activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
          >
            Charts
          </button>
        </div>

      </div>
    </header>
  );
}
