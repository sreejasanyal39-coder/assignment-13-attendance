import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import filtersReducer from '../features/filters/filtersSlice';
import { attendanceLoggerMiddleware } from '../middleware/attendanceLoggerMiddleware';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    attendance: attendanceReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attendanceLoggerMiddleware),
});

export default store;
