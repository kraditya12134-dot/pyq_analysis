import React, { useState } from 'react';
import { Quiz, QuizDeliveryMode } from '../../types/quiz';
import { 
  ArrowLeft, 
  Clock, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  Timer, 
  BookOpen, 
  AlertTriangle,
  Play
} from 'lucide-react';

interface InstructionsPageProps {
  quiz: Quiz;
  onBack: () => void;
  onStartExam: (quiz: Quiz, mode: QuizDeliveryMode) => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({
  quiz,
  onBack,
  onStartExam,
}) => {
  const [selectedMode, setSelectedMode] = useState<QuizDeliveryMode>('exam');

  const totalPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 5), 0);
  const passingPoints = Math.ceil((totalPoints * quiz.passingScorePercentage) / 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#0B132B] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Assessments</span>
      </button>

      {/* Main Instructions Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,19,43,0.03)] space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4338CA] uppercase tracking-wider mb-1">
            <span>{quiz.category}</span>
            <span>·</span>
            <span>{quiz.difficulty} Level</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B132B]">
            {quiz.title}
          </h1>
          <p className="text-xs text-[#475569] mt-1">
            Official Course Examination · Author: {quiz.authorName}
          </p>
        </div>

        <p className="text-sm text-[#475569] leading-relaxed">
          {quiz.description}
        </p>

        {/* 3-Card Assessment Overview Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center gap-1.5 text-xs text-[#475569] mb-1">
              <Clock className="w-4 h-4 text-[#4338CA]" />
              <span className="font-semibold uppercase tracking-wider">Duration</span>
            </div>
            <div className="text-xl font-bold text-[#0B132B] tabular-nums">
              {quiz.durationMinutes} Minutes
            </div>
            <span className="text-[11px] text-[#475569] mt-0.5 block">
              Enforced countdown in Exam Mode
            </span>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center gap-1.5 text-xs text-[#475569] mb-1">
              <HelpCircle className="w-4 h-4 text-[#4338CA]" />
              <span className="font-semibold uppercase tracking-wider">Item Count</span>
            </div>
            <div className="text-xl font-bold text-[#0B132B] tabular-nums">
              {quiz.questions.length} Questions
            </div>
            <span className="text-[11px] text-[#475569] mt-0.5 block">
              Multiple Choice (A, B, C, D)
            </span>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center gap-1.5 text-xs text-[#475569] mb-1">
              <Award className="w-4 h-4 text-[#059669]" />
              <span className="font-semibold uppercase tracking-wider">Passing Mark</span>
            </div>
            <div className="text-xl font-bold text-[#0B132B] tabular-nums">
              {quiz.passingScorePercentage}%
            </div>
            <span className="text-[11px] text-[#475569] mt-0.5 block">
              Requires {passingPoints} of {totalPoints} points
            </span>
          </div>
        </div>

        {/* Examination Rules & Protocol */}
        <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-3">
          <h3 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
            Important Examination Guidelines
          </h3>
          <ul className="text-xs text-[#475569] space-y-2 list-disc pl-4 leading-relaxed">
            <li>Ensure you have a stable network connection before launching the examination session.</li>
            <li>In <strong>Examination Mode</strong>, the countdown timer begins immediately upon clicking Start. If the timer reaches 00:00, all currently selected answers are automatically submitted.</li>
            <li>You may flag questions using <strong>Mark for Review</strong> to quickly revisit them using the Question Navigator palette.</li>
            <li>Unanswered questions receive zero points; no penalty is deducted for incorrect guesses.</li>
            <li>In <strong>Practice Mode</strong>, there is no time limit and detailed answer rationales are revealed instantly.</li>
          </ul>
        </div>

        {/* Delivery Mode Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider">
            Select Your Delivery Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedMode('exam')}
              className={`p-5 rounded-lg text-left border transition-all ${
                selectedMode === 'exam'
                  ? 'border-[#4338CA] bg-[#EEF2FF] ring-2 ring-[#4338CA]/20'
                  : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Timer className={`w-5 h-5 ${selectedMode === 'exam' ? 'text-[#4338CA]' : 'text-[#475569]'}`} />
                  <span className="text-sm font-bold text-[#0B132B]">Examination Mode</span>
                </div>
                {selectedMode === 'exam' && <CheckCircle2 className="w-4 h-4 text-[#4338CA]" />}
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Strict timed assessment with live countdown timer, question palette, flag-for-review, and automatic submission.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('practice')}
              className={`p-5 rounded-lg text-left border transition-all ${
                selectedMode === 'practice'
                  ? 'border-[#4338CA] bg-[#EEF2FF] ring-2 ring-[#4338CA]/20'
                  : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className={`w-5 h-5 ${selectedMode === 'practice' ? 'text-[#4338CA]' : 'text-[#475569]'}`} />
                  <span className="text-sm font-bold text-[#0B132B]">Practice Mode</span>
                </div>
                {selectedMode === 'practice' && <CheckCircle2 className="w-4 h-4 text-[#4338CA]" />}
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Untimed study environment with immediate feedback, green/red highlight validation, and academic rationales.
              </p>
            </button>
          </div>
        </div>

        {selectedMode === 'exam' && (
          <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded flex items-center gap-2.5 text-xs text-[#92400E]">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97706]" />
            <span>
              The {quiz.durationMinutes}-minute examination timer will begin immediately upon launching.
            </span>
          </div>
        )}

        {/* Start Button */}
        <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] rounded border border-[#E2E8F0]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onStartExam(quiz, selectedMode)}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#4338CA] hover:bg-[#4F46E5] active:bg-[#3730A3] rounded transition-colors shadow-sm flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Begin {selectedMode === 'exam' ? 'Timed Examination' : 'Practice Session'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
