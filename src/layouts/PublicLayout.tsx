import React, { useState } from 'react';
import { BookOpen, Menu, X, ArrowRight } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  activePath,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0B132B]">
      {/* Public Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-[0_1px_2px_rgba(11,19,43,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-8">
            {/* Zone 1: Brand Wordmark */}
            <button
              onClick={() => onNavigate('/landing')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 rounded bg-[#4338CA] flex items-center justify-center text-white font-bold text-base shadow-sm transition-transform group-hover:scale-105">
                QM
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-[#0B132B] block leading-none">
                  QuizMaster
                </span>
                <span className="text-[10px] font-medium text-[#475569] tracking-wider uppercase block mt-1">
                  Examination Platform
                </span>
              </div>
            </button>

            {/* Zone 2: Public Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569]">
              <button
                onClick={() => onNavigate('/landing')}
                className={`hover:text-[#0B132B] transition-colors whitespace-nowrap ${
                  activePath === '/landing' ? 'text-[#4338CA] font-semibold' : ''
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => onNavigate('/landing#features')}
                className="hover:text-[#0B132B] transition-colors whitespace-nowrap"
              >
                Features
              </button>
              <button
                onClick={() => onNavigate('/landing#curriculum')}
                className="hover:text-[#0B132B] transition-colors whitespace-nowrap"
              >
                Curriculum
              </button>
            </nav>

            {/* Zone 3: Auth Actions */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/login')}
                className="px-4 py-2 text-xs font-semibold text-[#1C2541] hover:text-[#0B132B] hover:bg-[#F1F5F9] rounded border border-[#E2E8F0] transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('/register')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4338CA] hover:bg-[#4F46E5] active:bg-[#3730A3] rounded transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded text-[#475569] hover:bg-[#F1F5F9]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-3 space-y-2">
            <button
              onClick={() => {
                onNavigate('/landing');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#475569] hover:bg-[#F1F5F9] rounded"
            >
              Overview
            </button>
            <button
              onClick={() => {
                onNavigate('/login');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#4338CA] bg-[#EEF2FF] rounded"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onNavigate('/register');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-white bg-[#4338CA] rounded"
            >
              Register Account
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Public Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-8 text-xs text-[#475569]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#4338CA] text-white font-bold text-xs flex items-center justify-center">
              QM
            </div>
            <span className="font-semibold text-[#0B132B]">QuizMaster Assessment Architecture</span>
            <span>·</span>
            <span>Accredited College Examination Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/login')} className="hover:text-[#0B132B]">Sign In</button>
            <button onClick={() => onNavigate('/register')} className="hover:text-[#0B132B]">Register</button>
            <button onClick={() => onNavigate('/forgot-password')} className="hover:text-[#0B132B]">Recovery</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
