import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, BarChart2, TrendingUp, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';
import { 
  selectStatusDistribution, 
  selectSubjectStatsReport, 
  selectDefaulterStudentsList,
  selectAllStudentStatsMap 
} from '../features/selectors/attendanceSelectors';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectThresholdPercentage } from '../features/filters/filtersSlice';

export default function AttendanceChartsView() {
  const distribution = useSelector(selectStatusDistribution);
  const subjectStats = useSelector(selectSubjectStatsReport);
  const defaulters = useSelector(selectDefaulterStudentsList);
  const allStudents = useSelector(selectAllStudents);
  const statsMap = useSelector(selectAllStudentStatsMap);
  const threshold = useSelector(selectThresholdPercentage);

  const totalRecords = distribution.total || 1;
  const pPct = Math.round((distribution.p / totalRecords) * 100);
  const aPct = Math.round((distribution.a / totalRecords) * 100);
  const plPct = Math.round((distribution.pl / totalRecords) * 100);
  const ePct = Math.round((distribution.e / totalRecords) * 100);

  return (
    <div className="space-y-6">
      
      {/* Top Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: ATTENDANCE STATUS DISTRIBUTION */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-600" />
                Overall Attendance Distribution
              </h3>
              <p className="text-xs text-slate-500">Status proportions across all recorded sessions</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700">
              {distribution.total} Entries
            </span>
          </div>

          {/* Visual Progress Bar Chart */}
          <div className="space-y-4 py-2">
            <div className="w-full h-6 rounded-full overflow-hidden flex shadow-inner bg-slate-100">
              <div 
                style={{ width: `${pPct}%` }} 
                className="bg-emerald-500 h-full transition-all duration-500 hover:opacity-90"
                title={`Present: ${distribution.p} (${pPct}%)`}
              />
              <div 
                style={{ width: `${aPct}%` }} 
                className="bg-rose-500 h-full transition-all duration-500 hover:opacity-90"
                title={`Absent: ${distribution.a} (${aPct}%)`}
              />
              <div 
                style={{ width: `${plPct}%` }} 
                className="bg-blue-500 h-full transition-all duration-500 hover:opacity-90"
                title={`Internship: ${distribution.pl} (${plPct}%)`}
              />
              <div 
                style={{ width: `${ePct}%` }} 
                className="bg-amber-500 h-full transition-all duration-500 hover:opacity-90"
                title={`Engagement: ${distribution.e} (${ePct}%)`}
              />
            </div>

            {/* Legend & Percentages */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Present (P)</span>
                </div>
                <div className="text-lg font-black text-emerald-900">{pPct}%</div>
                <div className="text-[10px] text-emerald-600">{distribution.p} Sessions</div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Absent (A)</span>
                </div>
                <div className="text-lg font-black text-rose-900">{aPct}%</div>
                <div className="text-[10px] text-rose-600">{distribution.a} Sessions</div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-1.5 text-blue-800 font-bold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Internship (PL)</span>
                </div>
                <div className="text-lg font-black text-blue-900">{plPct}%</div>
                <div className="text-[10px] text-blue-600">{distribution.pl} Sessions</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Official (E)</span>
                </div>
                <div className="text-lg font-black text-amber-900">{ePct}%</div>
                <div className="text-[10px] text-amber-600">{distribution.e} Sessions</div>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: SUBJECT-WISE ATTENDANCE PERCENTAGES */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                Subject-wise Attendance Percentages
              </h3>
              <p className="text-xs text-slate-500">Comparative attendance performance per curriculum topic</p>
            </div>
          </div>

          <div className="space-y-3.5 py-1">
            {subjectStats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 truncate max-w-xs">{item.subject}</span>
                  <span className="font-black text-indigo-600 font-mono">{item.rate}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${item.rate}%` }} 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.rate >= 75 ? 'bg-indigo-600' : item.rate >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{item.attended} Attended</span>
                  <span>{item.total} Total Classes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CHART 3: STUDENT ATTENDANCE RANKING & DEFAULTERS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Student Attendance Performance & Threshold Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Benchmark against configurable threshold ({threshold}%)
            </p>
          </div>
          <span className="text-xs text-slate-500">
            {defaulters.length} Defaulters Detected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allStudents.map((s) => {
            const stats = statsMap[s.id] || { percentage: 100, isBelowThreshold: false, attendedSessions: 0, totalSessions: 0 };
            const isBelow = stats.percentage < threshold;

            return (
              <div 
                key={s.id}
                className={`p-3.5 rounded-2xl border transition ${
                  isBelow 
                    ? 'bg-rose-50/60 border-rose-200' 
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 truncate">{s.name}</span>
                  <span 
                    className={`px-2 py-0.5 rounded-full text-xs font-black ${
                      isBelow ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {stats.percentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div 
                    style={{ width: `${stats.percentage}%` }}
                    className={`h-full rounded-full ${isBelow ? 'bg-rose-600' : 'bg-emerald-500'}`}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-mono">
                  <span>ID: {s.id}</span>
                  <span>{stats.attendedSessions}/{stats.totalSessions} sessions</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
