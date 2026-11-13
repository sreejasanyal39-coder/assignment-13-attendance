import { createSlice } from '@reduxjs/toolkit';
import { AVAILABLE_SUBJECTS } from '../../services/mockStudents';
import { loadStoredData, saveConfig } from '../../services/localStorage';

const stored = loadStoredData();
const savedConfig = stored.config || {};

const todayStr = "2026-11-13"; // current date in context

const initialState = {
  // Class selection
  date: savedConfig.date || todayStr,
  subject: savedConfig.subject || AVAILABLE_SUBJECTS[0],
  semester: savedConfig.semester || '4',
  section: savedConfig.section || 'A',
  department: savedConfig.department || 'BCA',

  // Filtering criteria
  searchQuery: '',
  filterDepartment: 'all',
  filterSemester: 'all',
  filterSection: 'all',
  statusFilter: 'all', // 'all' | 'P' | 'A' | 'PL' | 'E'
  showDefaultersOnly: false,

  // Configurable Attendance Threshold (default 45%)
  thresholdPercentage: savedConfig.thresholdPercentage !== undefined ? savedConfig.thresholdPercentage : 45,
  
  // Active View Tab: 'mark' | 'reports' | 'analytics'
  activeTab: 'mark',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
      saveConfig({ ...state, date: action.payload });
    },
    setSubject(state, action) {
      state.subject = action.payload;
      saveConfig({ ...state, subject: action.payload });
    },
    setSemester(state, action) {
      state.semester = action.payload;
      saveConfig({ ...state, semester: action.payload });
    },
    setSection(state, action) {
      state.section = action.payload;
      saveConfig({ ...state, section: action.payload });
    },
    setDepartment(state, action) {
      state.department = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilterDepartment(state, action) {
      state.filterDepartment = action.payload;
    },
    setFilterSemester(state, action) {
      state.filterSemester = action.payload;
    },
    setFilterSection(state, action) {
      state.filterSection = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setShowDefaultersOnly(state, action) {
      state.showDefaultersOnly = action.payload;
    },
    setThresholdPercentage(state, action) {
      state.thresholdPercentage = Number(action.payload);
      saveConfig({ ...state, thresholdPercentage: Number(action.payload) });
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = '';
      state.filterDepartment = 'all';
      state.filterSemester = 'all';
      state.filterSection = 'all';
      state.statusFilter = 'all';
      state.showDefaultersOnly = false;
    }
  }
});

export const {
  setDate,
  setSubject,
  setSemester,
  setSection,
  setDepartment,
  setSearchQuery,
  setFilterDepartment,
  setFilterSemester,
  setFilterSection,
  setStatusFilter,
  setShowDefaultersOnly,
  setThresholdPercentage,
  setActiveTab,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilters = (state) => state.filters;
export const selectActiveTab = (state) => state.filters.activeTab;
export const selectSelectedDate = (state) => state.filters.date;
export const selectSelectedSubject = (state) => state.filters.subject;
export const selectSelectedSemester = (state) => state.filters.semester;
export const selectSelectedSection = (state) => state.filters.section;
export const selectSelectedDepartment = (state) => state.filters.department;
export const selectSearchQuery = (state) => state.filters.searchQuery;
export const selectThresholdPercentage = (state) => state.filters.thresholdPercentage;
export const selectShowDefaultersOnly = (state) => state.filters.showDefaultersOnly;
export const selectStatusFilter = (state) => state.filters.statusFilter;
