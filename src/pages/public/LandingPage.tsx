import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Timer, 
  BarChart3, 
  Award,
  Sparkles,
  Zap,
  Layers
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative space-y-16 py-12 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section with Glassmorphic Card */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-14 lg:p-16 text-center max-w-4xl mx-auto border border-white/90 shadow-xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] border border-[#C7D2FE] text-xs font-bold text-[#4338CA] mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accredited Academic Examination Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B132B] tracking-tight leading-tight font-display">
            High-Density, Distraction-Free Assessments
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            Designed for colleges, universities, and certification authorities. Experience rigorous timed exams, instant itemized feedback, and comprehensive cohort analytics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('/register')}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
            >
              <span>Get Started as Student</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('/login')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/90 hover:bg-white text-[#1C2541] font-semibold text-sm rounded-xl border border-[#CBD5E1] transition-all shadow-2xs"
            >
              Faculty Sign In
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-[#F1F5F9] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-xs">
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">4+</span>
              <span className="text-[#475569] font-medium">Core Academic Domains</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#4338CA] tabular-nums font-display">100%</span>
              <span className="text-[#475569] font-medium">Proctored Timed Delivery</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#059669] tabular-nums font-display">Real-Time</span>
              <span className="text-[#475569] font-medium">Itemized Rationales</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#1C2541] tabular-nums font-display">Live</span>
              <span className="text-[#475569] font-medium">Cohort Leaderboards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] font-display">
            Engineered for Academic Rigor & Precision
          </h2>
          <p className="text-sm text-[#475569] mt-2 max-w-xl mx-auto">
            Everything students and faculty need to administer, complete, and analyze course evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover rounded-2xl p-7 border border-white/90 space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#EEF2FF] to-[#E0E7FF] text-[#4338CA] flex items-center justify-center font-bold shadow-2xs">
              <Timer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B] font-display">
              Dual Delivery Engine
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Toggle seamlessly between high-stakes timed examination mode with auto-submission, and low-stress practice mode with step-by-step reasoning.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-7 border border-white/90 space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#ECFDF5] to-[#D1FAE5] text-[#059669] flex items-center justify-center font-bold shadow-2xs">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B] font-display">
              Granular Scoring & Review
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Every completed attempt includes instant percentage scoring, itemized correct/incorrect cards, and syllabus-grounded academic explanations.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-7 border border-white/90 space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FFFBEB] to-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B] font-display">
              Faculty Item Authoring
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Comprehensive administrative controls to author quizzes, manage 4-choice item banks, configure passing thresholds, and audit submissions.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Strip */}
      <section id="curriculum" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-sidebar text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold text-[#818CF8] uppercase tracking-wider block mb-2 font-mono">
              Accredited Syllabus Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Pre-Seeded with College Curriculum Topics
            </h2>
            <p className="text-xs text-[#CBD5E1] mt-2 leading-relaxed font-normal">
              Computer Science & Engineering curricula including Data Structures & Algorithms, Full-Stack Web Architecture, Relational Databases & Distributed Systems, and OSI Layer Protocols.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="px-3.5 py-1.5 bg-white/10 rounded-lg text-white border border-white/15 backdrop-blur-xs font-medium">Data Structures</span>
              <span className="px-3.5 py-1.5 bg-white/10 rounded-lg text-white border border-white/15 backdrop-blur-xs font-medium">Web Engineering</span>
              <span className="px-3.5 py-1.5 bg-white/10 rounded-lg text-white border border-white/15 backdrop-blur-xs font-medium">Database Systems</span>
              <span className="px-3.5 py-1.5 bg-white/10 rounded-lg text-white border border-white/15 backdrop-blur-xs font-medium">Computer Networks</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
