import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateInitialAttendance } from '../../services/mockStudents';
import { loadStoredData, saveAttendance } from '../../services/localStorage';

const stored = loadStoredData();
const initialRecords = stored.attendance || generateInitialAttendance();

// Async Thunk: Sync attendance to API simulation
export const syncAttendanceAsync = createAsyncThunk(
  'attendance/syncAttendanceAsync',
  async (records, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      saveAttendance(records);
      return records;
    } catch (err) {
      return rejectWithValue('Failed to sync attendance records to server');
    }
  }
);

const initialState = {
  records: initialRecords, // Record map keyed by `${studentId}_${subject}_${date}`
  syncStatus: 'idle', // 'idle' | 'syncing' | 'succeeded' | 'failed'
  lastSyncTime: new Date().toLocaleTimeString(),
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    // Single attendance mark or update (prevents duplicate entries via composite key)
    markAttendance(state, action) {
      const { studentId, studentName, subject, date, status, semester, section } = action.payload;
      const key = `${studentId}_${subject}_${date}`;
      
      // Update or create record
      state.records[key] = {
        studentId,
        studentName,
        subject,
        date,
        status, // 'P' | 'A' | 'PL' | 'E'
        semester,
        section,
        updatedAt: new Date().toISOString(),
      };

      saveAttendance(state.records);
    },

    // Bulk mark all students in the active class
    bulkMarkAttendance(state, action) {
      const { students, subject, date, status, semester, section } = action.payload;
      
      students.forEach((student) => {
        const key = `${student.id}_${subject}_${date}`;
        state.records[key] = {
          studentId: student.id,
          studentName: student.name,
          subject,
          date,
          status,
          semester,
          section,
          updatedAt: new Date().toISOString(),
        };
      });

      saveAttendance(state.records);
    },

    // Delete an individual attendance entry
    deleteAttendanceRecord(state, action) {
      const { studentId, subject, date } = action.payload;
      const key = `${studentId}_${subject}_${date}`;
      if (state.records[key]) {
        delete state.records[key];
        saveAttendance(state.records);
      }
    },

    // Reset records to sample default
    resetAttendanceToDefault(state) {
      const fresh = generateInitialAttendance();
      state.records = fresh;
      saveAttendance(fresh);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAttendanceAsync.pending, (state) => {
        state.syncStatus = 'syncing';
        state.error = null;
      })
      .addCase(syncAttendanceAsync.fulfilled, (state, action) => {
        state.syncStatus = 'succeeded';
        state.records = action.payload;
        state.lastSyncTime = new Date().toLocaleTimeString();
      })
      .addCase(syncAttendanceAsync.rejected, (state, action) => {
        state.syncStatus = 'failed';
        state.error = action.payload || 'Sync failed';
      });
  }
});

export const {
  markAttendance,
  bulkMarkAttendance,
  deleteAttendanceRecord,
  resetAttendanceToDefault,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;

export const selectAttendanceRecords = (state) => state.attendance.records;
export const selectSyncStatus = (state) => state.attendance.syncStatus;
export const selectLastSyncTime = (state) => state.attendance.lastSyncTime;
