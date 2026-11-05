import React, { useState } from 'react';
import { User, UserRole } from '../../types/quiz';
import { storageService } from '../../services/storageService';
import { Shield, GraduationCap, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState<string | null>(null);

  const handleQuickStudent = () => {
    setEmail('alex.morgan@college.edu');
    setPassword('student123');
    setRole('student');
    setError(null);
  };

  const handleQuickAdmin = () => {
    setEmail('prof.reynolds@college.edu');
    setPassword('admin123');
    setRole('admin');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide your institutional email and password.');
      return;
    }

    const users = storageService.getAllUsers();
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existing) {
      const loggedIn: User = { ...existing, role };
      storageService.saveUser(loggedIn);
      storageService.setActiveUser(loggedIn);
      onLoginSuccess(loggedIn);
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email.trim().toLowerCase(),
        role,
        department: role === 'student' ? 'Computer Science' : 'Department of Computing',
        studentId: role === 'student' ? `CS-2026-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
        createdAt: new Date().toISOString(),
      };
      storageService.saveUser(newUser);
      storageService.setActiveUser(newUser);
      onLoginSuccess(newUser);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center p-4 overflow-hidden">
      {/* Luminous Ambient Background Glow Orbs for Glassmorphism Depth */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-1/3 w-64 h-64 bg-blue-300/15 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-[#2A14B4] to-[#5148D7] text-white font-bold text-xl shadow-md mb-2.5">
            QM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight font-display">
            Welcome to QuizMaster
          </h1>
          <p className="text-xs text-[#475569] mt-1 font-medium">
            Accredited Online Examination & Assessment Ecosystem
          </p>
        </div>

        {/* Quick Demo Pre-fill Pill Bar */}
        <div className="mb-4 glass-card rounded-xl p-3 shadow-sm border border-white/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#4338CA] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Evaluation Presets</span>
            </span>
            <span className="text-[10px] text-[#94A3B8]">Instant demo fill</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickStudent}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4338CA] bg-white/80 hover:bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg transition-all shadow-2xs hover:shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Demo Student</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1C2541] bg-white/80 hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg transition-all shadow-2xs hover:shadow-xs"
            >
              <Shield className="w-3.5 h-3.5 text-[#4338CA]" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Main Glassmorphic Login Card */}
        <div className="glass-card rounded-2xl shadow-xl border border-white/90 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E2E8F0]/70 bg-white/50 backdrop-blur-sm">
            <h2 className="text-base font-bold text-[#0B132B] font-display">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-[#475569]">
              Enter credentials to access examination rooms or faculty console
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-[#FEF2F2]/90 backdrop-blur-sm border border-[#FECACA] rounded-lg text-xs text-[#DC2626] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Role Switcher with sleek pill background */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                Portal Mode
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
                Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex.morgan@college.edu"
                className="w-full h-10 px-3.5 text-sm glass-input border border-[#E2E8F0] rounded-lg focus:outline-none text-[#0B132B]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#0B132B]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('/forgot-password')}
                  className="text-xs text-[#4338CA] hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3.5 text-sm glass-input border border-[#E2E8F0] rounded-lg focus:outline-none text-[#0B132B]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white font-semibold text-sm rounded-lg transition-all shadow-md hover:shadow-indigo-500/20 mt-2 flex items-center justify-center gap-2"
            >
              <span>Access {role === 'admin' ? 'Faculty Admin' : 'Student Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="p-4 bg-white/40 border-t border-[#E2E8F0]/70 text-center text-xs text-[#475569]">
            New candidate or instructor?{' '}
            <button
              onClick={() => onNavigate('/register')}
              className="font-bold text-[#4338CA] hover:underline"
            >
              Enroll Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
