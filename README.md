# Assignment 13: Student Attendance Management System

**🌐 Live Demo:** [https://assignment-13-attendance-coral.vercel.app](https://assignment-13-attendance-coral.vercel.app)  
**📦 GitHub Repository:** [https://github.com/sreejasanyal39-coder/assignment-13-attendance](https://github.com/sreejasanyal39-coder/assignment-13-attendance)  

**Submitted By:** Sreeja Sanyal  
**Student ID:** 231001102019  
**Program:** BCA(H)  
**Institution:** Techno India University, West Bengal  
**Contact:** 7003021997  
**Valid Till:** 15/09/2026  

---

## 🚀 Features & Redux Toolkit Architecture

This project strictly implements every single requirement outlined in **Assignment 13**:

1. **`configureStore()`**: Configures centralized root application store integrating `students`, `attendance`, and `filters` slices alongside custom action logging middleware.
2. **`createSlice()`**:
   - `studentsSlice`: Manages CRUD student records (ID, name, department, semester, section, email, phone).
   - `attendanceSlice`: Centrally manages daily attendance records with atomic updates.
   - `filtersSlice`: Manages active class selection (date, subject, semester, section), search queries, status filters, and configurable attendance threshold.
3. **Atomic Duplicate Prevention**:
   - Attendance entries are indexed via a composite key: `(studentId, subject, date)`. This strictly guarantees no duplicate attendance entries exist for the same student on the same date and subject.
4. **Attendance Status States**:
   - `Present (P)`
   - `Absent (A)`
   - `Internship Placed (PL)` (counts as positive attendance)
   - `Official Engagement (E)` (counts as university duty)
5. **Memoized Selectors (`createSelector`)**:
   - `selectFilteredClassStudents`: Filters students by class session, search query, and defaulter status.
   - `selectClassAttendanceSummary`: Computes real-time class metrics (Total, Present, Absent, PL, E, Class Attendance Rate).
   - `selectAllStudentStatsMap`: Computes individual student attendance percentages across all sessions.
   - `selectDefaulterStudentsList`: Dynamically isolates all students falling below the user-configured threshold (default 45%).
6. **Configurable Low-Attendance Warning Threshold**:
   - Real-time slider allowing professors to configure warning thresholds (e.g., 45%, 60%, 75%) with instant visual indicators and defaulter badges.
7. **Attendance Reports & CSV Export**:
   - Daily and monthly consolidated reporting.
   - Native browser-side CSV export tool generating structured downloadable CSV files.
8. **Interactive Visual Charts**:
   - Responsive charts illustrating status distribution (P vs A vs PL vs E) and subject-wise attendance comparison.
9. **Automated RTK Testing Suite**:
   - In-app test runner executing unit assertions for reducers, duplicate prevention, and percentage calculations with 100% pass status.
10. **Student Identity & Verified Footer**:
    - Dedicated footer displaying Sreeja Sanyal's credentials, university identity, contact, and clickable modal preview of the verified Student ID card.

---

## 🛠️ Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

