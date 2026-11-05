import React, { useState } from 'react';
import { User, UserRole } from '../../types/quiz';
import { storageService } from '../../services/storageService';
import { Shield, GraduationCap, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface RegisterPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid institutional email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    const users = storageService.getAllUsers();
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('An account with this email already exists. Please sign in.');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      department: department.trim(),
      studentId: role === 'student' ? `CS-2026-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      createdAt: new Date().toISOString(),
    };

    storageService.saveUser(newUser);
    storageService.setActiveUser(newUser);
    setSuccess('Registration confirmed! Directing to workspace...');
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 600);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center p-4 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card rounded-2xl shadow-xl border border-white/90 overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]/70 bg-white/50 backdrop-blur-sm text-center">
            <h1 className="text-xl font-bold text-[#0B132B] font-display">
              Create Academic Profile
            </h1>
            <p className="text-xs text-[#475569] mt-0.5">
              Enroll in institutional courses and examinations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-[#FEF2F2]/90 backdrop-blur-sm border border-[#FECACA] rounded-lg text-xs text-[#DC2626] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-[#ECFDF5]/90 backdrop-blur-sm border border-[#A7F3D0] rounded-lg text-xs text-[#059669] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Role Switcher */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                Account Category
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F1F5F9]/80 rounded-xl border border-[#E2E8F0]/60">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    role === 'student'
                      ? 'bg-white text-[#4338CA] shadow-sm font-bold'
                      : 'text-[#475569] hover:text-[#0B132B]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    role === 'admin'
                      ? 'bg-white text-[#4338CA] shadow-sm font-bold'
                      : 'text-[#475569] hover:text-[#0B132B]'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Administrator</span>
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
                className="w-full h-10 px-3.5 text-sm glass-input border border-[#E2E8F0] rounded-lg focus:outline-none text-[#0B132B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Academic Department
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Computer Science & Engineering"
                className="w-full h-10 px-3.5 text-sm glass-input border border-[#E2E8F0] rounded-lg focus:outline-none text-[#0B132B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.edu"
                className="w-full h-10 px-3.5 text-sm glass-input border border-[#E2E8F0] rounded-lg focus:outline-none text-[#0B132B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full h-10 px-3.5 text-sm glass-input border border-[#E2E8F0] rounded-lg focus:outline-none text-[#0B132B]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white font-semibold text-sm rounded-lg transition-all shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <span>Complete Enrollment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="p-4 bg-white/40 border-t border-[#E2E8F0]/70 text-center text-xs text-[#475569]">
            Already enrolled?{' '}
            <button
              onClick={() => onNavigate('/login')}
              className="font-bold text-[#4338CA] hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
