import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sliders, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { 
  selectThresholdPercentage, 
  setThresholdPercentage, 
  selectShowDefaultersOnly, 
  setShowDefaultersOnly 
} from '../features/filters/filtersSlice';
import { selectDefaulterStudentsList } from '../features/selectors/attendanceSelectors';

export default function ThresholdConfigBar() {
  const dispatch = useDispatch();
  const threshold = useSelector(selectThresholdPercentage);
  const showDefaultersOnly = useSelector(selectShowDefaultersOnly);
  const defaulters = useSelector(selectDefaulterStudentsList);

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-300/60 rounded-3xl p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Threshold Slider control */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Academic Attendance Warning Threshold:</span>
              <span className="text-amber-700 font-black text-sm bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                {threshold}%
              </span>
            </span>
            <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">
              (Assignment Requirement: Configurable Threshold, e.g. 45%)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-500">20%</span>
            <input
              type="range"
              min="20"
              max="85"
              step="5"
              value={threshold}
              onChange={(e) => dispatch(setThresholdPercentage(e.target.value))}
              className="flex-1 accent-amber-600 h-2 bg-amber-200/50 rounded-lg cursor-pointer"
            />
            <span className="text-[11px] font-mono text-slate-500">85%</span>
          </div>
        </div>

        {/* Defaulter Counter & Filter Toggle */}
        <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-xs text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-slate-700">Under-Threshold:</span>
            <span className="px-1.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-700">
              {defaulters.length} Students
            </span>
          </div>

          <button
            onClick={() => dispatch(setShowDefaultersOnly(!showDefaultersOnly))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
              showDefaultersOnly
                ? 'bg-rose-600 text-white shadow-rose-500/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{showDefaultersOnly ? 'Showing Defaulters Only' : 'Filter Defaulters'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

