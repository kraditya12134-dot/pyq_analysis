import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  X, 
  Flag, 
  Lightbulb, 
  HelpCircle 
} from 'lucide-react';

interface AnswerReviewPageProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onBackToResults: () => void;
  onRetake: (quiz: Quiz) => void;
}

export const AnswerReviewPage: React.FC<AnswerReviewPageProps> = ({
  quiz,
  attempt,
  onBackToResults,
  onRetake,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'marked'>('all');
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  let correctCount = 0;
  let incorrectCount = 0;

  quiz.questions.forEach((q, idx) => {
    const userAns = attempt.answers[idx];
    if (userAns === q.correctAnswerIndex) {
      correctCount += 1;
    } else {
      incorrectCount += 1;
    }
  });

  const filteredQuestions = quiz.questions
    .map((question, index) => ({ question, index }))
    .filter(({ question, index }) => {
      const userAns = attempt.answers[index];
      const isCorrect = userAns === question.correctAnswerIndex;
      const isMarked = attempt.markedQuestions?.includes(index);

      if (filter === 'correct') return isCorrect;
      if (filter === 'incorrect') return userAns !== undefined && !isCorrect;
      if (filter === 'marked') return isMarked;
      return true;
    });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <button
          onClick={onBackToResults}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#0B132B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scorecard</span>
        </button>

        <button
          onClick={() => onRetake(quiz)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4338CA] bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] rounded transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Assessment</span>
        </button>
      </div>

      {/* Filter and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0B132B]">
            Itemized Examination Review
          </h1>
          <p className="text-xs text-[#475569]">
            {quiz.title} · Final Score: {attempt.percentage}% ({correctCount}/{quiz.questions.length} correct)
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#E2E8F0] rounded-lg shadow-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              filter === 'all' ? 'bg-[#4338CA] text-white shadow-xs' : 'text-[#475569] hover:text-[#0B132B]'
            }`}
          >
            All ({quiz.questions.length})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              filter === 'correct' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569] hover:text-[#0B132B]'
            }`}
          >
            Correct ({correctCount})
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              filter === 'incorrect' ? 'bg-[#DC2626] text-white shadow-xs' : 'text-[#475569] hover:text-[#0B132B]'
            }`}
          >
            Incorrect ({incorrectCount})
          </button>
          <button
            onClick={() => setFilter('marked')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              filter === 'marked' ? 'bg-[#D97706] text-white shadow-xs' : 'text-[#475569] hover:text-[#0B132B]'
            }`}
          >
            Flagged ({attempt.markedQuestions?.length || 0})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map(({ question, index }) => {
          const userChoice = attempt.answers[index];
          const isCorrect = userChoice === question.correctAnswerIndex;
          const isUnanswered = userChoice === undefined;
          const isMarked = attempt.markedQuestions?.includes(index);

          return (
            <div
              key={question.id || index}
              className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-[0_1px_2px_rgba(11,19,43,0.02)] space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#4338CA] uppercase">
                    Question {index + 1}
                  </span>
                  <span className="text-[#CBD5E1]">·</span>
                  <span className="text-xs text-[#475569] tabular-nums">
                    {question.points || 5} Points
                  </span>
                  {isMarked && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded">
                      <Flag className="w-3 h-3 fill-[#B45309]" />
                      <span>Flagged</span>
                    </span>
                  )}
                </div>

                <div>
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669]">
                      <Check className="w-4 h-4" />
                      <span>Correct (+{question.points || 5} pts)</span>
                    </span>
                  ) : isUnanswered ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#94A3B8]">
                      <HelpCircle className="w-4 h-4" />
                      <span>Unanswered (0 pts)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#DC2626]">
                      <X className="w-4 h-4" />
                      <span>Incorrect (0 pts)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-semibold text-[#0B132B]">
                {question.text}
              </h3>

              {/* Option Cards */}
              <div className="space-y-2">
                {question.options.map((optText, optIdx) => {
                  const isSelectedByUser = userChoice === optIdx;
                  const isTheCorrectAnswer = question.correctAnswerIndex === optIdx;

                  let optionBorder = 'border-[#E2E8F0] bg-white';
                  let tagBg = 'bg-[#F1F5F9] text-[#475569]';

                  if (isTheCorrectAnswer) {
                    optionBorder = 'border-[#059669] bg-[#ECFDF5]';
                    tagBg = 'bg-[#059669] text-white';
                  } else if (isSelectedByUser && !isTheCorrectAnswer) {
                    optionBorder = 'border-[#DC2626] bg-[#FEF2F2]';
                    tagBg = 'bg-[#DC2626] text-white';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded border text-xs font-medium flex items-start gap-3 transition-colors ${optionBorder}`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${tagBg}`}
                      >
                        {optionLetters[optIdx]}
                      </div>
                      <span className="flex-1 leading-relaxed text-[#0B132B]">
                        {optText}
                      </span>
                      {isTheCorrectAnswer && (
                        <span className="text-[11px] font-bold text-[#059669] uppercase shrink-0">
                          Correct Answer
                        </span>
                      )}
                      {isSelectedByUser && !isTheCorrectAnswer && (
                        <span className="text-[11px] font-bold text-[#DC2626] uppercase shrink-0">
                          Your Choice
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Academic Rationale */}
              <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4338CA]">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Academic Rationale</span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
