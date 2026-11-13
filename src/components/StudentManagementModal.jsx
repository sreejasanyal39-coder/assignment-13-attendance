import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, UserPlus, Edit3, Trash2, ShieldCheck, GraduationCap } from 'lucide-react';
import { addStudent, editStudent, deleteStudent } from '../features/students/studentsSlice';

export default function StudentManagementModal({ isOpen, onClose, editingStudent }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: 'BCA',
    semester: '4',
    section: 'A',
    email: '',
    phone: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({
        id: '23100110' + Math.floor(2010 + Math.random() * 80),
        name: '',
        department: 'BCA',
        semester: '4',
        section: 'A',
        email: '',
        phone: '',
      });
    }
    setError('');
  }, [editingStudent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.id.trim()) {
      setError('Student Name and ID are required.');
      return;
    }

    if (editingStudent) {
      dispatch(editStudent(formData));
    } else {
      dispatch(addStudent(formData));
    }

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${formData.name} (${formData.id})?`)) {
      dispatch(deleteStudent(formData.id));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            {editingStudent ? <Edit3 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              {editingStudent ? 'Edit Student Record' : 'Add New Student Record'}
            </h3>
            <p className="text-xs text-slate-500">
              Techno India University • Student Registry (Redux Slice)
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Student ID</label>
              <input
                type="text"
                value={formData.id}
                disabled={!!editingStudent}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-indigo-500 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Priyanshu Roy"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold"
              >
                <option value="BCA">BCA (Computer Applications)</option>
                <option value="B.Tech CSE">B.Tech CSE</option>
                <option value="MCA">MCA</option>
                <option value="B.Sc IT">B.Sc IT</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold"
              >
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <option key={s} value={String(s)}>Semester {s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Section</label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold"
              >
                {['A', 'B', 'C'].map((sec) => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Contact Phone</label>
              <input
                type="text"
                placeholder="e.g. 9830112233"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="student@technoindia.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {editingStudent ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Delete Student
              </button>
            ) : <div />}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-md shadow-indigo-500/20"
              >
                {editingStudent ? 'Save Changes' : 'Add to Roster'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

