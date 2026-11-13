import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { X, Terminal, Activity, Database, Layers, Copy, Check } from 'lucide-react';
import { actionLogs, subscribeToActions } from '../middleware/attendanceLoggerMiddleware';

export default function ReduxInspectorModal({ isOpen, onClose }) {
  const state = useSelector((s) => s);
  const [logs, setLogs] = useState([...actionLogs]);
  const [activeTab, setActiveTab] = useState('actions');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsub = subscribeToActions(() => {
      setLogs([...actionLogs]);
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const handleCopyState = () => {
    navigator.clipboard.writeText(JSON.stringify(state, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-slate-950 text-slate-100 shadow-2xl flex flex-col font-mono text-xs">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  Redux Live State & Middleware Inspector
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-[11px] text-slate-400">Assignment 13 Redux Toolkit Architecture</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex border-b border-slate-800 bg-slate-900/50 px-4 gap-4">
            <button
              onClick={() => setActiveTab('actions')}
              className={`py-2.5 px-2 border-b-2 font-bold transition flex items-center gap-1.5 ${
                activeTab === 'actions'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Dispatched Actions ({logs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('state')}
              className={`py-2.5 px-2 border-b-2 font-bold transition flex items-center gap-1.5 ${
                activeTab === 'state'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Full Store Tree</span>
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`py-2.5 px-2 border-b-2 font-bold transition flex items-center gap-1.5 ${
                activeTab === 'docs'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Assignment 13 Rubric</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === 'actions' && (
              <div className="space-y-2">
                {logs.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    Mark attendance or update student records to see live dispatched actions recorded here.
                  </div>
                ) : (
                  logs.map((log) => (
                    <div 
                      key={log.id}
                      className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 hover:border-indigo-500/50 transition font-mono text-[11px]"
                    >
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="text-indigo-400 font-bold">{log.type}</span>
                        <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                      </div>
                      {log.payload !== undefined && (
                        <div className="mt-1 p-2 bg-slate-950 rounded-lg text-slate-300 overflow-x-auto border border-slate-800">
                          <span className="text-slate-500 select-none">payload: </span>
                          <pre className="inline">{JSON.stringify(log.payload, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'state' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-slate-400 text-xs">Root Redux Store Snapshot</span>
                  <button
                    onClick={handleCopyState}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto text-[11px]">
                  <pre className="text-indigo-300">{JSON.stringify(state, null, 2)}</pre>
                </div>
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="space-y-3 text-slate-300 font-sans text-xs leading-relaxed">
                <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/30">
                  <h4 className="font-bold text-indigo-400 text-sm mb-1">Assignment 13 Implementation Specs</h4>
                  <p className="text-slate-400 text-[11px]">Student: Sreeja Sanyal (ID: 231001102019), Techno India University, West Bengal</p>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">1. Multiple Slices:</span> Slices cleanly split into `students`, `attendance`, and `filters` slices.
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">2. Duplicate Prevention:</span> Unique composite key index `(studentId_subject_date)` prevents collision and ensures deterministic attendance idempotency.
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">3. Memoized Derived Selectors:</span> Calculates individual attendance percentages, subject distribution, and identifies students below configurable threshold (e.g. 45%).
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">4. CSV Export & Charts:</span> Native export tool and responsive SVG charts displaying real-time academic distribution.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
