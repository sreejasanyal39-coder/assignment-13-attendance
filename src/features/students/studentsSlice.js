import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { INITIAL_STUDENTS } from '../../services/mockStudents';
import { loadStoredData, saveStudents } from '../../services/localStorage';

const stored = loadStoredData();

// Async Thunk: Fetch students from API with simulated delay
export const fetchStudentsAsync = createAsyncThunk(
  'students/fetchStudentsAsync',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network request latency (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
      return stored.students || INITIAL_STUDENTS;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch student records');
    }
  }
);

// Async Thunk: Save students to remote API simulation
export const saveStudentsAsync = createAsyncThunk(
  'students/saveStudentsAsync',
  async (studentsList, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      saveStudents(studentsList);
      return studentsList;
    } catch (err) {
      return rejectWithValue('Failed to sync student data');
    }
  }
);

const initialState = {
  list: stored.students || INITIAL_STUDENTS,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent(state, action) {
      const newStudent = action.payload;
      // Prevent duplicate student IDs
      const exists = state.list.some((s) => s.id === newStudent.id);
      if (!exists) {
        state.list.unshift(newStudent);
        saveStudents(state.list);
      }
    },
    editStudent(state, action) {
      const updated = action.payload;
      const index = state.list.findIndex((s) => s.id === updated.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updated };
        saveStudents(state.list);
      }
    },
    deleteStudent(state, action) {
      const idToDelete = action.payload;
      state.list = state.list.filter((s) => s.id !== idToDelete);
      saveStudents(state.list);
    },
    resetStudentsToDefault(state) {
      state.list = INITIAL_STUDENTS;
      saveStudents(state.list);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudentsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchStudentsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load students';
      })
      .addCase(saveStudentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveStudentsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      });
  }
});

export const { 
  addStudent, 
  editStudent, 
  deleteStudent, 
  resetStudentsToDefault 
} = studentsSlice.actions;

export default studentsSlice.reducer;

export const selectAllStudents = (state) => state.students.list;
export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsError = (state) => state.students.error;

