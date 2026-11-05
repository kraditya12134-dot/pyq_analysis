import React from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  FileText,
  Trophy,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ResultsPageProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetake: (quiz: Quiz) => void;
  onReviewAnswers: (quiz: Quiz, attempt: QuizAttempt) => void;
  onBackToDashboard: () => void;
  onViewLeaderboard: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  quiz,
  attempt,
  onRetake,
  onReviewAnswers,
  onBackToDashboard,
  onViewLeaderboard,
}) => {
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  quiz.questions.forEach((q, idx) => {
    const userAns = attempt.answers[idx];
    if (userAns === undefined) {
      unattemptedCount += 1;
    } else if (userAns === q.correctAnswerIndex) {
      correctCount += 1;
    } else {
      incorrectCount += 1;
    }
  });

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top action */}
      <button
        onClick={onBackToDashboard}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#0B132B] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Student Dashboard</span>
      </button>

      {/* Main Scorecard Glass Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-md border border-white/90 space-y-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#F1F5F9] relative z-10">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#4338CA] uppercase tracking-wider">
              <span>{quiz.category}</span>
              <span>·</span>
              <span>{quiz.difficulty} Level</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] font-display">
              {quiz.title}
            </h1>
            <p className="text-xs text-[#475569]">
              Assessment completed on {new Date(attempt.completedAt).toLocaleString()} ({attempt.mode === 'exam' ? 'Proctored Exam' : 'Practice Mode'})
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                attempt.passed
                  ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                  : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
              }`}
            >
              {attempt.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>{attempt.passed ? 'Assessment Passed' : 'Needs Practice'}</span>
            </div>
            <div className="text-5xl font-extrabold text-[#0B132B] tabular-nums mt-2 font-display">
              {attempt.percentage}%
            </div>
            <p className="text-xs text-[#475569] font-medium">
              Passing threshold: {quiz.passingScorePercentage}%
            </p>
          </div>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
          <div className="p-4 bg-white/70 border border-[#E2E8F0] rounded-xl text-center shadow-2xs">
            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-1">
              Score Earned
            </span>
            <span className="text-xl font-bold text-[#0B132B] tabular-nums font-display">
              {attempt.score} / {attempt.maxScore}
            </span>
          </div>

          <div className="p-4 bg-white/70 border border-[#E2E8F0] rounded-xl text-center shadow-2xs">
            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-1">
              Correct Answers
            </span>
            <span className="text-xl font-bold text-[#059669] tabular-nums font-display">
              {correctCount} <span className="text-xs font-normal text-[#475569]">items</span>
            </span>
          </div>

          <div className="p-4 bg-white/70 border border-[#E2E8F0] rounded-xl text-center shadow-2xs">
            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-1">
              Incorrect / Missed
            </span>
            <span className="text-xl font-bold text-[#DC2626] tabular-nums font-display">
              {incorrectCount + unattemptedCount} <span className="text-xs font-normal text-[#475569]">items</span>
            </span>
          </div>

          <div className="p-4 bg-white/70 border border-[#E2E8F0] rounded-xl text-center shadow-2xs">
            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-1">
              Time Taken
            </span>
            <span className="text-xl font-bold text-[#0B132B] tabular-nums font-display">
              {formatTime(attempt.timeTakenSeconds)}
            </span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3 relative z-10">
          <button
            onClick={() => onReviewAnswers(quiz, attempt)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white font-semibold text-xs rounded-lg transition-all shadow-sm hover:shadow-indigo-500/20"
          >
            <FileText className="w-4 h-4" />
            <span>Detailed Question Review</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRetake(quiz)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#1C2541] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg transition-all shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onViewLeaderboard}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#4338CA] bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] rounded-lg transition-all shadow-2xs"
            >
              <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Cohort Standings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
