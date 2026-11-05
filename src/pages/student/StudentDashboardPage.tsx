import React from 'react';
import { Quiz, QuizAttempt, User } from '../../types/quiz';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  Target, 
  ArrowRight, 
  PlayCircle,
  FileText,
  BarChart2,
  Sparkles
} from 'lucide-react';

interface StudentDashboardPageProps {
  currentUser: User;
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  onSelectQuiz: (quiz: Quiz) => void;
  onViewAttempt: (attemptId: string) => void;
  onNavigate: (path: string) => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({
  currentUser,
  quizzes,
  attempts,
  onSelectQuiz,
  onViewAttempt,
  onNavigate,
}) => {
  const userAttempts = attempts.filter((a) => a.userId === currentUser.id);

  const totalCompleted = userAttempts.length;
  const passedCount = userAttempts.filter((a) => a.passed).length;
  const passRate = totalCompleted > 0 ? Math.round((passedCount / totalCompleted) * 100) : 0;
  
  const avgScore = totalCompleted > 0 
    ? Math.round(userAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalCompleted)
    : 0;

  const totalTimeMinutes = Math.round(
    userAttempts.reduce((acc, curr) => acc + curr.timeTakenSeconds, 0) / 60
  );

  const categories = Array.from(new Set(quizzes.map((q) => q.category)));
  const publishedQuizzes = quizzes.filter((q) => q.isPublished);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Hero Glass Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border border-white/80 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[11px] font-bold uppercase tracking-wider text-[#4338CA] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Assessment Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] font-display">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-xs text-[#475569] mt-1 font-medium">
            {currentUser.department || 'Computer Science Department'} · ID: <span className="font-mono">{currentUser.studentId || 'CS-2026-ONLINE'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => onNavigate('/student/explore')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white font-semibold text-xs rounded-lg transition-all shadow-sm hover:shadow-indigo-500/20"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Browse Quizzes</span>
          </button>
          <button
            onClick={() => onNavigate('/student/leaderboard')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-[#1C2541] font-semibold text-xs rounded-lg border border-[#CBD5E1] transition-all shadow-2xs"
          >
            <Trophy className="w-4 h-4 text-[#D97706]" />
            <span>Leaderboard</span>
          </button>
        </div>
      </div>

      {/* 4-Stat Quantitative Glass KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Quizzes Taken</span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4338CA]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {totalCompleted}
          </div>
          <div className="text-xs text-[#475569] mt-1">
            {passedCount} passed successfully
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Score</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {avgScore}%
          </div>
          <div className="text-xs text-[#475569] mt-1">
            Overall assessment accuracy
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pass Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4338CA]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {passRate}%
          </div>
          <div className="text-xs text-[#475569] mt-1">
            Target threshold: 70%+
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5 border border-white/80">
          <div className="flex items-center justify-between text-[#475569] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Study Time</span>
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center text-[#6366F1]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0B132B] tabular-nums font-display">
            {totalTimeMinutes} <span className="text-sm font-normal text-[#475569]">mins</span>
          </div>
          <div className="text-xs text-[#475569] mt-1">
            Proctored examination velocity
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Recommended Quizzes & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Quizzes (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-lg font-bold text-[#0B132B] font-display">
                Recommended Assessments
              </h2>
              <p className="text-xs text-[#475569]">
                High-priority syllabus assessments matching your department
              </p>
            </div>
            <button
              onClick={() => onNavigate('/student/explore')}
              className="text-xs font-bold text-[#4338CA] hover:underline flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {publishedQuizzes.slice(0, 4).map((quiz) => {
              const quizAttempts = userAttempts.filter((a) => a.quizId === quiz.id);
              const latestAttempt = quizAttempts[0];

              return (
                <div
                  key={quiz.id}
                  className="glass-card glass-card-hover rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/85"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2 text-xs text-[#475569]">
                      <span className="font-bold text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">{quiz.category}</span>
                      <span>·</span>
                      <span className="font-medium">{quiz.difficulty}</span>
                      <span>·</span>
                      <span className="tabular-nums">{quiz.questions.length} Items</span>
                      <span>·</span>
                      <span className="tabular-nums">{quiz.durationMinutes}m</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B132B] font-display">
                      {quiz.title}
                    </h3>

                    <p className="text-xs text-[#475569] line-clamp-1 leading-relaxed">
                      {quiz.description}
                    </p>

                    {latestAttempt && (
                      <div className="pt-1 flex items-center gap-2 text-xs">
                        <span className={`font-bold ${latestAttempt.passed ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                          {latestAttempt.passed ? 'Passed' : 'Needs Practice'} ({latestAttempt.percentage}%)
                        </span>
                        <span className="text-[#94A3B8]">·</span>
                        <span className="text-[#475569]">
                          Completed {new Date(latestAttempt.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectQuiz(quiz)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white font-semibold text-xs rounded-lg transition-all shadow-sm hover:shadow-indigo-500/20 shrink-0"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Instructions</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Submissions & Progress */}
        <div className="space-y-6">
          {/* Recent Submissions */}
          <div className="glass-card rounded-xl p-5 border border-white/80">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F1F5F9]">
              <h3 className="text-sm font-bold text-[#0B132B] font-display">
                Recent Quiz History
              </h3>
              <span className="text-xs font-mono text-[#475569] tabular-nums">
                {userAttempts.length} Records
              </span>
            </div>

            {userAttempts.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#475569]">
                <p>No exams attempted yet.</p>
                <p className="text-[#94A3B8] mt-1">Select an assessment to start your learning record.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userAttempts.slice(0, 4).map((attempt) => (
                  <div
                    key={attempt.id}
                    className="p-3 bg-white/60 hover:bg-white rounded-lg border border-[#E2E8F0]/70 transition-all shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-xs font-bold text-[#0B132B] truncate font-display">
                          {attempt.quizTitle}
                        </p>
                        <p className="text-[11px] text-[#475569]">
                          {new Date(attempt.completedAt).toLocaleDateString()} · {Math.round(attempt.timeTakenSeconds / 60)} min
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`text-xs font-bold tabular-nums block ${attempt.passed ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                          {attempt.percentage}%
                        </span>
                        <span className="text-[10px] text-[#475569] uppercase font-mono block">
                          {attempt.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewAttempt(attempt.id)}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold text-[#4338CA] bg-white border border-[#C7D2FE] hover:bg-[#EEF2FF] rounded-lg transition-colors shadow-2xs"
                    >
                      <span>Review Answers</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Curriculum Mastery Progress */}
          <div className="glass-card rounded-xl p-5 border border-white/80">
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 className="w-4 h-4 text-[#4338CA]" />
              <h3 className="text-sm font-bold text-[#0B132B] font-display">
                Curriculum Mastery
              </h3>
            </div>
            <div className="space-y-3">
              {categories.map((cat) => {
                const catQuizzes = quizzes.filter((q) => q.category === cat);
                const catAttempts = userAttempts.filter((a) => a.category === cat);
                const passedInCat = catAttempts.filter((a) => a.passed).length;
                const ratio = catQuizzes.length > 0 ? Math.min(100, Math.round((passedInCat / catQuizzes.length) * 100)) : 0;

                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-[#0B132B]">
                      <span className="truncate max-w-[170px]">{cat}</span>
                      <span className="tabular-nums text-[#475569] font-mono">{ratio}%</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#4338CA] to-[#6366F1] h-full rounded-full transition-all duration-500"
                        style={{ width: `${ratio}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
