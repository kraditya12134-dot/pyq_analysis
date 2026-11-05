import React, { useState } from 'react';
import { Quiz, Question } from '../../types/quiz';
import { Plus, Edit3, Trash2, CheckCircle2, Layers, Lightbulb, AlertCircle } from 'lucide-react';

interface QuestionBankPageProps {
  quizzes: Quiz[];
  onSaveQuiz: (quiz: Quiz) => void;
  initialSelectedQuizId?: string;
}

export const QuestionBankPage: React.FC<QuestionBankPageProps> = ({
  quizzes,
  onSaveQuiz,
  initialSelectedQuizId,
}) => {
  const [selectedQuizId, setSelectedQuizId] = useState(
    initialSelectedQuizId || (quizzes[0]?.id || '')
  );

  const selectedQuiz = quizzes.find((q) => q.id === selectedQuizId) || quizzes[0];

  // Question Form State
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const resetForm = () => {
    setEditingQuestion(null);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectIndex(0);
    setExplanation('');
    setPoints(5);
  };

  const handleEdit = (q: Question) => {
    setEditingQuestion(q);
    setQuestionText(q.text);
    setOptions([...q.options]);
    setCorrectIndex(q.correctAnswerIndex);
    setExplanation(q.explanation);
    setPoints(q.points || 5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuiz || !questionText.trim()) return;

    const trimmedOptions = options.map((opt, i) => opt.trim() || `Option ${String.fromCharCode(65 + i)}`);

    let updatedQuestions = [...selectedQuiz.questions];

    if (editingQuestion) {
      updatedQuestions = updatedQuestions.map((q) =>
        q.id === editingQuestion.id
          ? {
              ...q,
              text: questionText.trim(),
              options: trimmedOptions,
              correctAnswerIndex: correctIndex,
              explanation: explanation.trim() || 'Verified standard academic rationale.',
              points: Number(points) || 5,
            }
          : q
      );
      setFeedbackMsg('Question updated successfully.');
    } else {
      const newQuestion: Question = {
        id: `q-${Date.now()}`,
        text: questionText.trim(),
        options: trimmedOptions,
        correctAnswerIndex: correctIndex,
        explanation: explanation.trim() || 'Verified standard academic rationale.',
        points: Number(points) || 5,
      };
      updatedQuestions.push(newQuestion);
      setFeedbackMsg('New question added to assessment bank.');
    }

    const updatedQuiz: Quiz = {
      ...selectedQuiz,
      questions: updatedQuestions,
    };

    onSaveQuiz(updatedQuiz);
    resetForm();
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const handleDelete = (qId: string) => {
    if (!selectedQuiz) return;
    if (selectedQuiz.questions.length <= 1) {
      alert('An assessment must contain at least one question.');
      return;
    }
    const updatedQuiz: Quiz = {
      ...selectedQuiz,
      questions: selectedQuiz.questions.filter((q) => q.id !== qId),
    };
    onSaveQuiz(updatedQuiz);
    setFeedbackMsg('Question removed from assessment.');
    setTimeout(() => setFeedbackMsg(null), 2000);
  };

  if (!selectedQuiz) {
    return (
      <div className="p-8 text-center text-xs text-[#475569]">
        No assessments available. Please create an assessment first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0B132B]">
            Question Item Bank
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Author multiple-choice questions, configure verified answers, and write academic explanations
          </p>
        </div>

        {/* Assessment Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#475569]">Assessment:</span>
          <select
            value={selectedQuizId}
            onChange={(e) => {
              setSelectedQuizId(e.target.value);
              resetForm();
            }}
            className="h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B] font-semibold"
          >
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title} ({q.questions.length} items)
              </option>
            ))}
          </select>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-xs text-[#059669] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* 2-Column Layout: Form (Left) & Existing Items List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Authoring Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <h2 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
              {editingQuestion ? 'Edit Question Item' : 'Add New Question Item'}
            </h2>
            {editingQuestion && (
              <button
                type="button"
                onClick={resetForm}
                className="text-[11px] text-[#4338CA] hover:underline"
              >
                Clear / New Item
              </button>
            )}
          </div>

          <form onSubmit={handleSaveQuestion} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Question Text
              </label>
              <textarea
                rows={3}
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="State the problem or conceptual question..."
                className="w-full p-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
              />
            </div>

            {/* 4 Options */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#0B132B]">
                Options (Select radio for correct answer)
              </label>
              {options.map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctRadio"
                    checked={correctIndex === optIdx}
                    onChange={() => setCorrectIndex(optIdx)}
                    className="w-4 h-4 text-[#4338CA] focus:ring-[#4338CA]"
                  />
                  <span className="w-5 text-xs font-bold text-[#475569]">
                    {String.fromCharCode(65 + optIdx)}:
                  </span>
                  <input
                    type="text"
                    required
                    value={opt}
                    onChange={(e) => {
                      const next = [...options];
                      next[optIdx] = e.target.value;
                      setOptions(next);
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                    className="flex-1 h-8 px-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Academic Rationale
                </label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Why Option is correct..."
                  className="w-full h-8 px-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Points
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-full h-8 px-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors shadow-sm"
            >
              {editingQuestion ? 'Update Question' : 'Add to Item Bank'}
            </button>
          </form>
        </div>

        {/* Existing Items List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#0B132B]">
              Questions in "{selectedQuiz.title}" ({selectedQuiz.questions.length})
            </h2>
            <span className="text-xs text-[#475569]">
              Total Points: {selectedQuiz.questions.reduce((sum, q) => sum + (q.points || 5), 0)} pts
            </span>
          </div>

          <div className="space-y-3">
            {selectedQuiz.questions.map((q, idx) => (
              <div
                key={q.id || idx}
                className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded">
                      Q{idx + 1}
                    </span>
                    <h3 className="text-xs font-semibold text-[#0B132B] leading-snug">
                      {q.text}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleEdit(q)}
                      className="p-1.5 text-[#475569] hover:text-[#0B132B] hover:bg-[#F1F5F9] rounded"
                      title="Edit Question"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 text-[#DC2626] hover:bg-[#FEF2F2] rounded"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4 Choices */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-1.5 rounded border ${
                        q.correctAnswerIndex === optIdx
                          ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669] font-semibold'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                      }`}
                    >
                      <span className="font-bold mr-1">{String.fromCharCode(65 + optIdx)}:</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                {/* Rationale line */}
                <p className="text-[11px] text-[#475569] bg-[#F8FAFC] p-2 rounded border border-[#F1F5F9] italic">
                  Rationale: {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
