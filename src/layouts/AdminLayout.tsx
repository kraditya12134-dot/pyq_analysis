import React, { useState } from 'react';
import { User } from '../types/quiz';
import { 
  BarChart3, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  RotateCcw, 
  Menu, 
  X,
  UserCheck
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentUser: User;
  activePath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onSwitchRole: () => void;
  onResetData: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentUser,
  activePath,
  onNavigate,
  onLogout,
  onSwitchRole,
  onResetData,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const adminNavItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: BarChart3 },
    { label: 'Manage Quizzes', path: '/admin/quizzes', icon: BookOpen },
    { label: 'Question Bank', path: '/admin/questions', icon: HelpCircle },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Manage Users', path: '/admin/users', icon: Users },
    { label: 'Analytics', path: '/admin/analytics', icon: TrendingUp },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0B132B]">
      {/* Desktop 240px Structural Sidebar (Secondary Deep Slate #1C2541 with glass blur) */}
      <aside className="hidden lg:flex w-60 glass-sidebar text-white flex-col shrink-0 sticky top-0 h-screen z-30">
        {/* Brand Lockup */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2A14B4] to-[#5148D7] flex items-center justify-center text-white font-bold text-base shadow-sm">
            QM
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-none font-display">
              QuizMaster
            </h1>
            <span className="inline-block mt-1 px-1.5 py-0.5 rounded-full bg-[#DC2626]/30 text-[#FCA5A5] text-[10px] font-semibold uppercase tracking-wider border border-red-400/20">
              Faculty / Admin
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path || (item.path === '/admin/dashboard' && activePath === '/admin');
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4338CA] to-[#4F46E5] text-white shadow-md shadow-indigo-950/40'
                    : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#818CF8]'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom User Profile Chrome & Role Switcher */}
        <div className="p-3 border-t border-white/10 space-y-2 bg-[#161D33]/70 backdrop-blur-md">
          {/* Active Admin Card */}
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4338CA] to-[#6366F1] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-[#94A3B8] font-mono truncate">
                {currentUser.department || 'Administrator'}
              </p>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <button
            onClick={onSwitchRole}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-semibold text-[#C3C0FF] bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#818CF8]" />
            <span>Switch to Student View</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-semibold text-[#FCA5A5] hover:bg-[#DC2626]/20 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar with Glassmorphic styling */}
        <header className="sticky top-0 z-20 glass-nav h-14 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-[#475569] hover:bg-white/80 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs font-semibold text-[#475569]">
              <span className="text-[#94A3B8]">Admin Console</span>
              <span className="mx-1.5">/</span>
              <span className="text-[#0B132B] capitalize font-bold">
                {activePath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetData}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#475569] hover:text-[#0B132B] hover:bg-white border border-[#E2E8F0] rounded-lg transition-all shadow-2xs"
              title="Reset data to pristine college syllabus defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            <button
              onClick={() => onNavigate('/admin/settings')}
              className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1C2541] to-[#282F49] text-white font-bold text-xs flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
              title="Admin Settings"
            >
              {currentUser.name.charAt(0)}
            </button>
          </div>
        </header>

        {/* Central Workspace */}
        <main className="flex-1 max-w-[1280px] w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-64 glass-sidebar text-white flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#4338CA] flex items-center justify-center text-white font-bold text-xs">
                  QM
                </div>
                <span className="font-bold text-sm font-display">QuizMaster Admin</span>
              </div>
              <button onClick={() => setMobileDrawerOpen(false)} className="text-[#94A3B8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      onNavigate(item.path);
                      setMobileDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                      isActive ? 'bg-[#4338CA] text-white' : 'text-[#CBD5E1] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  onSwitchRole();
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-1.5 text-xs font-semibold text-[#C3C0FF] bg-white/10 rounded-lg"
              >
                Switch to Student View
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-1.5 text-xs font-semibold text-[#FCA5A5] rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)}></div>
        </div>
      )}
    </div>
  );
};
