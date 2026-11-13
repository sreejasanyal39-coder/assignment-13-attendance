import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Award, 
  Sparkles, 
  ClipboardCheck, 
  FileSpreadsheet, 
  PieChart, 
  Layers 
} from 'lucide-react';

import { selectActiveTab, setActiveTab } from './features/filters/filtersSlice';

import Navbar from './components/Navbar';
import ClassSelectorBar from './components/ClassSelectorBar';
import ThresholdConfigBar from './components/ThresholdConfigBar';
import AttendanceTable from './components/AttendanceTable';
import AttendanceReportsView from './components/AttendanceReportsView';
import AttendanceChartsView from './components/AttendanceChartsView';
import StudentManagementModal from './components/StudentManagementModal';
import ReduxInspectorModal from './components/ReduxInspectorModal';
import TestSuiteModal from './components/TestSuiteModal';
import StudentFooter from './components/StudentFooter';

export default function App() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsAddStudentOpen(true);
  };

  const handleCloseStudentModal = () => {
    setIsAddStudentOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Academic Notification Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-2 px-4 text-center font-medium shadow-sm flex items-center justify-center gap-2">
        <Award className="w-3.5 h-3.5 text-amber-400" />
        <span>
          Techno India University • Redux Toolkit Assignment 13 • Student: <strong className="font-extrabold text-amber-300">Sreeja Sanyal (BCA)</strong> • ID: 231001102019
        </span>
      </div>

      {/* Main Navbar */}
      <Navbar 
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenTests={() => setIsTestsOpen(true)}
        onOpenAddStudent={() => setIsAddStudentOpen(true)}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Redux Toolkit Centralized Attendance System</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Student Attendance & Academic Intelligence
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Managing roster states, atomic duplicate prevention for <code className="text-indigo-300 font-mono bg-white/10 px-1 py-0.5 rounded">(studentId, subject, date)</code>, multi-criteria memoized selectors, low-attendance threshold warnings, CSV exports, and visual charts.
            </p>
          </div>

          {/* Student Profile Quick Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 max-w-sm w-full shadow-2xl">
            <img 
              src="/student-id.jpg" 
              alt="Sreeja Sanyal" 
              className="w-16 h-20 object-cover rounded-xl border-2 border-indigo-300 shadow-md flex-shrink-0" 
            />
            <div className="text-left text-xs space-y-1">
              <span className="px-2 py-0.5 bg-indigo-500/40 rounded text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                Assignment 13
              </span>
              <h4 className="font-extrabold text-white text-sm">Sreeja Sanyal</h4>
              <p className="text-indigo-200 font-medium text-[11px]">BCA(H) • ID: 231001102019</p>
              <p className="text-indigo-300 text-[10px]">Techno India University, WB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Class Selection & Quick Stats Row */}
        <ClassSelectorBar />

        {/* Configurable Threshold Bar (Assignment 13 requirement) */}
        <ThresholdConfigBar />

        {/* View Switcher Content */}
        {activeTab === 'mark' && (
          <AttendanceTable onEditStudent={handleEditStudent} />
        )}

        {activeTab === 'reports' && (
          <AttendanceReportsView />
        )}

        {activeTab === 'analytics' && (
          <AttendanceChartsView />
        )}

      </main>

      {/* Modals & Drawers */}
      <StudentManagementModal
        isOpen={isAddStudentOpen}
        onClose={handleCloseStudentModal}
        editingStudent={editingStudent}
      />

      <ReduxInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      <TestSuiteModal
        isOpen={isTestsOpen}
        onClose={() => setIsTestsOpen(false)}
      />

      {/* Verified Student Footer */}
      <StudentFooter />
    </div>
  );
}

