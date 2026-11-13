import React, { useState } from 'react';
import { Award, GraduationCap, Phone, Calendar, ShieldCheck, ExternalLink, X, Heart } from 'lucide-react';

export default function StudentFooter() {
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  return (
    <>
      <footer className="mt-20 border-t border-slate-200 bg-white/80 backdrop-blur-md text-slate-700 shadow-inner">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Student ID Card Preview Card */}
            <div className="md:col-span-4 flex items-center gap-4 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition">
              <div 
                className="relative cursor-pointer group flex-shrink-0"
                onClick={() => setShowIdCardModal(true)}
                title="Click to view verified Student ID Card"
              >
                <img 
                  src="/student-id.jpg" 
                  alt="Sreeja Sanyal Student ID" 
                  className="w-20 h-28 object-cover rounded-xl border-2 border-indigo-500 shadow-md group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-indigo-900/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition">
                  Enlarge
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                  <Award className="w-3.5 h-3.5" /> Verified Assignment
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                  SREEJA SANYAL
                </h3>
                <p className="text-xs font-semibold text-indigo-700">
                  Techno India University, West Bengal
                </p>
                <div className="text-xs text-slate-600 space-y-0.5 pt-1">
                  <p><span className="font-semibold text-slate-700">Program:</span> BCA(H)</p>
                  <p><span className="font-semibold text-slate-700">Student ID:</span> 231001102019</p>
                  <p><span className="font-semibold text-slate-700">Contact:</span> 7003021997</p>
                </div>
              </div>
            </div>

            {/* Academic & Assignment Details */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-wide uppercase">
                <GraduationCap className="w-4 h-4" />
                Assignment 13 : Student Attendance Management
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Centralized state architecture built with Redux Toolkit managing student records, duplicate-safe daily attendance, configurable low-attendance threshold warnings, CSV reporting, and visual charts.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Redux Toolkit 2.x
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> Valid Till: 15/09/2026
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  CSV Export & Visual Charts
                </span>
              </div>
            </div>

            {/* University Link & Modal trigger */}
            <div className="md:col-span-3 flex flex-col sm:items-end justify-center gap-3">
              <button 
                onClick={() => setShowIdCardModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                View Student ID Card
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              
              <a 
                href="https://www.technoindiauniversity.ac.in" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium transition"
              >
                technoindiauniversity.ac.in
              </a>
              
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Academic Submission
              </div>
            </div>

          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Sreeja Sanyal (ID: 231001102019) • Techno India University, West Bengal • Department of Computer Applications
          </div>
        </div>
      </footer>

      {/* ID Card Modal */}
      {showIdCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-slate-200 animate-scale-up">
            <button 
              onClick={() => setShowIdCardModal(false)}
              className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-3">
              <h4 className="font-bold text-slate-900">Student Identity Verification</h4>
              <p className="text-xs text-slate-500">Techno India University, West Bengal</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex justify-center">
              <img 
                src="/student-id.jpg" 
                alt="Sreeja Sanyal ID Card" 
                className="w-full max-h-[460px] object-contain rounded-xl shadow-inner"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold text-slate-700">Sreeja Sanyal • BCA(H) • 231001102019</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

