import React from 'react';
import { Quiz, QuizAttempt, User } from '../../types/quiz';
import { 
  BookOpen, 
  Users, 
  CheckCircle2, 
  BarChart3, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

interface AdminDashboardPageProps {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  users: User[];
  onNavigate: (path: string) => void;
  onCreateQuiz: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  quizzes,
  attempts,
  users,
  onNavigate,
  onCreateQuiz,
}) => {
  const totalQuizzes = quizzes.length;
  const publishedQuizzes = quizzes.filter((q) => q.isPublished).length;
  const totalStudents = users.filter((u) => u.role === 'student').length;
  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((a) => a.passed).length;
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Glass Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm border border-white/80 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[11px] font-bold uppercase tracking-wider text-[#4338CA] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Faculty Operations Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] font-display">
            Assessment Executive Overview
          </h1>
          <p className="text-xs text-[#475569] mt-1 font-medium">
            Real-time assessment governance, syllabus monitoring, and candidate submission analytics
          </p>
        </div>

        <button
          onClick={onCreateQuiz}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white font-semibold text-xs rounded-lg transition-all shadow-sm hover:shadow-indigo-500/20 shrink-0 relative z-10"
        >
          <Plus className="w-4 h-4" />
          <span>Author New Assessment</span>
        </button>
      </div>

      {/* 4-Stat Administrative Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Quizzes</span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4338CA]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {totalQuizzes}
          </div>
          <div className="text-xs text-[#475569] mt-1">
            {publishedQuizzes} published live
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Enrolled Candidates</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {totalStudents}
          </div>
          <div className="text-xs text-[#475569] mt-1">
            Registered student accounts
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Submissions</span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4338CA]">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {totalAttempts}
          </div>
          <div className="text-xs text-[#475569] mt-1">
            Completed examinations
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cohort Pass Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {passRate}%
          </div>
          <div className="text-xs text-[#475569] mt-1">
            {passedAttempts} passing submissions
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Active Quizzes & Recent Candidate Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Managed Quizzes Summary */}
        <div className="lg:col-span-2 glass-card rounded-2xl shadow-sm border border-white/90 overflow-hidden">
          <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between bg-white/50">
            <div>
              <h2 className="text-base font-bold text-[#0B132B] font-display">
                Active Syllabus Assessments
              </h2>
              <p className="text-[11px] text-[#475569]">
                Live examinations available to candidate cohorts
              </p>
            </div>
            <button
              onClick={() => onNavigate('/admin/quizzes')}
              className="text-xs font-bold text-[#4338CA] hover:underline flex items-center gap-1 group"
            >
              <span>Manage Quizzes</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC]/80 border-b border-[#E2E8F0] text-[#475569] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Questions</th>
                  <th className="py-3 px-4 text-center">Pass %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {quizzes.slice(0, 5).map((q) => (
                  <tr key={q.id} className="hover:bg-white/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          q.isPublished ? 'bg-[#ECFDF5] text-[#059669] border border-emerald-200' : 'bg-[#FEF2F2] text-[#DC2626] border border-red-200'
                        }`}
                      >
                        {q.isPublished ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0B132B] truncate max-w-xs font-display">
                      {q.title}
                    </td>
                    <td className="py-3.5 px-4 text-[#475569]">
                      {q.category}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-mono">
                      {q.questions.length}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-bold text-[#059669] font-mono">
                      {q.passingScorePercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Recent Submissions Audit */}
        <div className="glass-card rounded-2xl shadow-sm border border-white/90 overflow-hidden">
          <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between bg-white/50">
            <h2 className="text-base font-bold text-[#0B132B] font-display">
              Latest Submissions
            </h2>
            <button
              onClick={() => onNavigate('/admin/analytics')}
              className="text-xs font-bold text-[#4338CA] hover:underline"
            >
              All Logs
            </button>
          </div>

          <div className="divide-y divide-[#F1F5F9]">
            {attempts.slice(0, 5).map((att) => (
              <div key={att.id} className="p-3.5 space-y-1 hover:bg-white/80 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0B132B] truncate max-w-[150px] font-display">
                    {att.userName}
                  </span>
                  <span
                    className={`text-xs font-bold tabular-nums font-mono ${
                      att.passed ? 'text-[#059669]' : 'text-[#DC2626]'
                    }`}
                  >
                    {att.percentage}%
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] truncate">
                  {att.quizTitle}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                  <span>{new Date(att.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="uppercase font-mono font-semibold">{att.passed ? 'PASSED' : 'FAILED'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
