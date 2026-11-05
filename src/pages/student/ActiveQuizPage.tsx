import React, { useState, useEffect, useRef } from 'react';
import { Quiz, QuizDeliveryMode, QuizAttempt, User } from '../../types/quiz';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Send, 
  Lightbulb,
  Grid,
  AlertCircle
} from 'lucide-react';

interface ActiveQuizPageProps {
  quiz: Quiz;
  mode: QuizDeliveryMode;
  currentUser: User;
  onSubmit: (attempt: QuizAttempt) => void;
  onExit: () => void;
}

export const ActiveQuizPage: React.FC<ActiveQuizPageProps> = ({
  quiz,
  mode,
  currentUser,
  onSubmit,
  onExit,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [revealedInPractice, setRevealedInPractice] = useState<Record<number, boolean>>({});

  const totalDurationSeconds = quiz.durationMinutes * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(totalDurationSeconds);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (mode !== 'exam') return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    if (mode === 'exam' && remainingSeconds === 0 && !hasAutoSubmitted) {
      setHasAutoSubmitted(true);
      finalizeSubmission(true);
    }
  }, [remainingSeconds, mode, hasAutoSubmitted]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
    if (mode === 'practice') {
      setRevealedInPractice((prev) => ({
        ...prev,
        [currentQuestionIndex]: true,
      }));
    }
  };

  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestionIndex];
      return next;
    });
    if (mode === 'practice') {
      setRevealedInPractice((prev) => ({
        ...prev,
        [currentQuestionIndex]: false,
      }));
    }
  };

  const handleToggleMark = () => {
    setMarkedQuestions((prev) =>
      prev.includes(currentQuestionIndex)
        ? prev.filter((i) => i !== currentQuestionIndex)
        : [...prev, currentQuestionIndex]
    );
  };

  const finalizeSubmission = (isTimeout = false) => {
    const elapsedSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    const timeTaken = mode === 'exam' ? Math.min(totalDurationSeconds, elapsedSeconds) : elapsedSeconds;

    let totalScore = 0;
    let maxScore = 0;

    quiz.questions.forEach((q, idx) => {
      const qPoints = q.points || 5;
      maxScore += qPoints;
      if (answers[idx] === q.correctAnswerIndex) {
        totalScore += qPoints;
      }
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    const passed = percentage >= quiz.passingScorePercentage;

    const attempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      category: quiz.category,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      answers,
      markedQuestions,
      score: totalScore,
      maxScore,
      percentage,
      passed,
      timeTakenSeconds: timeTaken,
      mode,
      completedAt: new Date().toISOString(),
    };

    onSubmit(attempt);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds < 120 && mode === 'exam';
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = quiz.questions.length - answeredCount;
  const isMarked = markedQuestions.includes(currentQuestionIndex);
  const selectedAnswer = answers[currentQuestionIndex];
  const isRevealed = mode === 'practice' && revealedInPractice[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-16 text-[#0B132B]">
      {/* Top Proctored Exam Bar with Frosted Glass */}
      <div className="sticky top-0 z-30 glass-nav shadow-sm">
        <div className="max-w-[840px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="p-1.5 rounded-lg text-[#475569] hover:text-[#0B132B] hover:bg-white/80 transition-colors"
              title="Exit Assessment"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-[#0B132B] truncate max-w-xs md:max-w-md font-display">
                {quiz.title}
              </h1>
              <p className="text-[11px] text-[#475569]">
                {quiz.category} · {mode === 'exam' ? 'Examination Mode' : 'Practice Mode'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-xs font-semibold text-[#475569] bg-white/80 px-2.5 py-1.5 rounded-lg tabular-nums border border-[#E2E8F0] shadow-2xs">
              Item {currentQuestionIndex + 1} / {quiz.questions.length}
            </div>

            {/* Timer Badge */}
            {mode === 'exam' ? (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold tabular-nums border shadow-2xs ${
                  isLowTime
                    ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA] animate-pulse'
                    : 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(remainingSeconds)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE] text-xs font-semibold shadow-2xs">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Untimed Practice</span>
              </div>
            )}

            <button
              onClick={() => setPaletteOpen(!paletteOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#1C2541] bg-white/90 border border-[#E2E8F0] hover:bg-white rounded-lg transition-all shadow-2xs"
              title="Toggle Question Palette"
            >
              <Grid className="w-3.5 h-3.5 text-[#4338CA]" />
              <span className="hidden sm:inline">Palette</span>
            </button>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-indigo-500/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Global Gradient Progress Bar */}
        <div className="w-full bg-[#E2E8F0]/70 h-1">
          <div
            className="bg-gradient-to-r from-[#4338CA] to-[#6366F1] h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Centered 840px Workspace */}
      <main className="max-w-[840px] mx-auto px-4 pt-8">
        {/* Question Palette Drawer */}
        {paletteOpen && (
          <div className="mb-6 glass-card rounded-xl p-4 shadow-md border border-white/90 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
              <span className="text-xs font-bold text-[#0B132B] uppercase tracking-wider font-display">
                Question Navigator
              </span>
              <div className="flex items-center gap-3 text-[11px] text-[#475569]">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4338CA]"></span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
                  <span>Flagged ({markedQuestions.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]"></span>
                  <span>Unanswered ({unansweredCount})</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
              {quiz.questions.map((_, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = answers[idx] !== undefined;
                const isMarkedItem = markedQuestions.includes(idx);

                let btnStyle = 'bg-white/80 border-[#E2E8F0] text-[#0B132B] hover:border-[#CBD5E1]';
                if (isAnswered) btnStyle = 'bg-gradient-to-r from-[#4338CA] to-[#4F46E5] border-transparent text-white shadow-2xs';
                if (isMarkedItem) btnStyle = 'bg-[#FFFBEB] border-[#D97706] text-[#B45309] font-bold';

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setPaletteOpen(false);
                    }}
                    className={`h-9 rounded-lg text-xs font-semibold tabular-nums border transition-all flex items-center justify-center relative hover:scale-105 ${btnStyle} ${
                      isCurrent ? 'ring-2 ring-[#6366F1] ring-offset-1' : ''
                    }`}
                  >
                    {idx + 1}
                    {isMarkedItem && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D97706] ring-2 ring-white"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary Question Pane with Glass styling */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/90 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between gap-4 bg-white/50 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#4338CA] tracking-wider uppercase">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <span className="text-[#CBD5E1]">·</span>
              <span className="text-xs text-[#475569] tabular-nums font-mono">
                {currentQuestion.points || 5} Points
              </span>
            </div>

            <button
              onClick={handleToggleMark}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isMarked
                  ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A] shadow-2xs'
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isMarked ? 'fill-[#B45309] text-[#B45309]' : ''}`} />
              <span>{isMarked ? 'Flagged for Review' : 'Mark for Review'}</span>
            </button>
          </div>

          {/* Question Text Body */}
          <div className="p-6 md:p-8 space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-[#0B132B] leading-relaxed font-display">
              {currentQuestion.text}
            </h2>

            {/* Multiple Choice Option Cards with Glassmorphism */}
            <div className="space-y-3">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = currentQuestion.correctAnswerIndex === optIdx;

                let cardStyle = 'bg-white/80 border-[#E2E8F0] text-[#0B132B] hover:border-[#C7D2FE] hover:bg-white';
                let tagStyle = 'bg-[#F1F5F9] text-[#475569]';

                if (isSelected) {
                  cardStyle = 'border-[1.5px] border-[#4338CA] bg-[#EEF2FF] shadow-[0_4px_12px_rgba(67,56,202,0.08)]';
                  tagStyle = 'bg-[#4338CA] text-white shadow-xs';
                }

                if (isRevealed) {
                  if (isCorrect) {
                    cardStyle = 'border-[1.5px] border-[#059669] bg-[#ECFDF5]';
                    tagStyle = 'bg-[#059669] text-white';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'border-[1.5px] border-[#DC2626] bg-[#FEF2F2]';
                    tagStyle = 'bg-[#DC2626] text-white';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 hover:translate-x-0.5 ${cardStyle}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${tagStyle}`}
                    >
                      {optionLetters[optIdx]}
                    </div>
                    <span className="text-sm font-medium leading-relaxed pt-0.5">
                      {optionText}
                    </span>
                    {isRevealed && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[#059669] ml-auto shrink-0 mt-0.5" />
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-[#DC2626] ml-auto shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice Mode Rationale */}
            {isRevealed && (
              <div className="p-4 bg-white/70 border border-[#CBD5E1] rounded-xl space-y-2 backdrop-blur-xs shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4338CA] uppercase tracking-wider font-display">
                  <Lightbulb className="w-4 h-4" />
                  <span>Academic Explanation & Rationale</span>
                </div>
                <p className="text-xs text-[#0B132B] leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Desktop Footer Controls */}
          <div className="hidden md:flex p-4 bg-white/40 border-t border-[#E2E8F0] items-center justify-between gap-3">
            <div>
              {selectedAnswer !== undefined && (
                <button
                  onClick={handleClearAnswer}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#475569] hover:text-[#0B132B] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#E2E8F0]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Selection</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0B132B] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:pointer-events-none rounded-lg transition-colors shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] rounded-lg transition-all shadow-sm"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] rounded-lg transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Complete Assessment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 glass-nav p-3 md:hidden z-30 shadow-xl flex items-center justify-between gap-2 border-t border-[#E2E8F0]">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          className="flex-1 py-2 text-xs font-semibold text-[#0B132B] bg-white border border-[#E2E8F0] rounded-lg disabled:opacity-40 flex items-center justify-center gap-1 shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            className="flex-1 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#4338CA] to-[#4F46E5] rounded-lg shadow-sm flex items-center justify-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex-1 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#059669] to-[#10B981] rounded-lg shadow-sm flex items-center justify-center gap-1"
          >
            <span>Submit</span>
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Submit Confirmation Modal with Glass Backdrop */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-card rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-white/95 animate-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-lg font-bold text-[#0B132B] font-display">
                Submit Assessment?
              </h3>
              <p className="text-xs text-[#475569] mt-1">
                Please review your progress before finalizing submission.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-[#EEF2FF]/80 border border-[#C7D2FE] rounded-xl">
                <div className="text-xl font-bold text-[#4338CA] tabular-nums font-display">{answeredCount}</div>
                <div className="text-[11px] text-[#475569] font-medium">Answered</div>
              </div>
              <div className="p-3 bg-[#FFFBEB]/80 border border-[#FDE68A] rounded-xl">
                <div className="text-xl font-bold text-[#B45309] tabular-nums font-display">{markedQuestions.length}</div>
                <div className="text-[11px] text-[#475569] font-medium">Flagged</div>
              </div>
              <div className="p-3 bg-[#FEF2F2]/80 border border-[#FECACA] rounded-xl">
                <div className="text-xl font-bold text-[#DC2626] tabular-nums font-display">{unansweredCount}</div>
                <div className="text-[11px] text-[#475569] font-medium">Unanswered</div>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 bg-[#FFFBEB]/90 border border-[#FDE68A] rounded-lg text-xs text-[#92400E] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#D97706]" />
                <span>
                  You have {unansweredCount} unanswered questions.
                </span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-white rounded-lg border border-[#E2E8F0]"
              >
                Back to Exam
              </button>
              <button
                type="button"
                onClick={() => finalizeSubmission(false)}
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] rounded-lg shadow-sm"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
