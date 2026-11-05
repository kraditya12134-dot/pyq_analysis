import React, { useState } from 'react';
import { User, UserRole, QuizAttempt } from '../../types/quiz';
import { storageService } from '../../services/storageService';
import { Search, Plus, Trash2, Edit3, X, CheckCircle2, Shield, GraduationCap } from 'lucide-react';

interface ManageUsersPageProps {
  users: User[];
  attempts: QuizAttempt[];
  onRefreshUsers: () => void;
}

export const ManageUsersPage: React.FC<ManageUsersPageProps> = ({
  users,
  attempts,
  onRefreshUsers,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'admin'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [department, setDepartment] = useState('Computer Science');
  const [studentId, setStudentId] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const openCreate = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('student');
    setDepartment('Computer Science & Engineering');
    setStudentId(`CS-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setModalOpen(true);
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setDepartment(u.department || 'Computer Science');
    setStudentId(u.studentId || '');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const userToSave: User = {
      id: editingUser ? editingUser.id : `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      department: department.trim(),
      studentId: role === 'student' ? studentId.trim() : undefined,
      createdAt: editingUser ? editingUser.createdAt : new Date().toISOString(),
    };

    storageService.saveUser(userToSave);
    onRefreshUsers();
    setModalOpen(false);
    setMsg(editingUser ? 'User credentials updated.' : 'New academic user created.');
    setTimeout(() => setMsg(null), 2000);
  };

  const handleDelete = (userId: string, userName: string) => {
    if (confirm(`Remove user "${userName}" from the institutional directory?`)) {
      storageService.deleteUser(userId);
      onRefreshUsers();
      setMsg('User removed.');
      setTimeout(() => setMsg(null), 2000);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        (u.department && u.department.toLowerCase().includes(s))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0B132B]">
            Academic User & Candidate Directory
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Manage student registrations, assign administrative privileges, and audit account status
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll New User</span>
        </button>
      </div>

      {msg && (
        <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-xs text-[#059669] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates by name, email..."
            className="w-full h-8 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              roleFilter === 'all' ? 'bg-white text-[#0B132B] shadow-xs' : 'text-[#475569]'
            }`}
          >
            All ({users.length})
          </button>
          <button
            onClick={() => setRoleFilter('student')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              roleFilter === 'student' ? 'bg-white text-[#0B132B] shadow-xs' : 'text-[#475569]'
            }`}
          >
            Students ({users.filter((u) => u.role === 'student').length})
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              roleFilter === 'admin' ? 'bg-white text-[#0B132B] shadow-xs' : 'text-[#475569]'
            }`}
          >
            Admins ({users.filter((u) => u.role === 'admin').length})
          </button>
        </div>
      </div>

      {/* Users High-Density Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Institutional Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department / ID</th>
                <th className="py-3 px-4 text-center">Submissions</th>
                <th className="py-3 px-4 text-right">Enrolled Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredUsers.map((u) => {
                const userAttemptCount = attempts.filter((a) => a.userId === u.id).length;
                return (
                  <tr key={u.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#1C2541] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-[#0B132B]">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#475569]">
                      {u.email}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-[#1C2541] text-white'
                            : 'bg-[#EEF2FF] text-[#4338CA]'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#475569]">
                      <div>{u.department || 'N/A'}</div>
                      {u.studentId && <div className="text-[10px] font-mono text-[#94A3B8]">{u.studentId}</div>}
                    </td>
                    <td className="py-3 px-4 text-center tabular-nums font-semibold">
                      {userAttemptCount}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums text-[#475569]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEdit(u)}
                          className="p-1 text-[#475569] hover:text-[#0B132B] hover:bg-[#F1F5F9] rounded"
                          title="Edit User"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id, u.name)}
                          className="p-1 text-[#DC2626] hover:bg-[#FEF2F2] rounded"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Enroll / Edit User */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E2E8F0] rounded-xl max-w-md w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0B132B]">
                {editingUser ? 'Edit User Credentials' : 'Enroll New Academic User'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-[#475569]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-1.5 text-xs font-semibold rounded border ${
                      role === 'student' ? 'border-[#4338CA] bg-[#EEF2FF] text-[#4338CA]' : 'border-[#E2E8F0]'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-1.5 text-xs font-semibold rounded border ${
                      role === 'admin' ? 'border-[#4338CA] bg-[#EEF2FF] text-[#4338CA]' : 'border-[#E2E8F0]'
                    }`}
                  >
                    Administrator
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Patel"
                  className="w-full h-8 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full h-8 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-8 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              {role === 'student' && (
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full h-8 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] rounded border border-[#E2E8F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#4338CA] hover:bg-[#4F46E5] rounded transition-colors shadow-sm"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
