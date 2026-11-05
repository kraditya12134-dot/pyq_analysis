import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { Search, Filter, PlayCircle, Clock, Award, BookOpen } from 'lucide-react';

interface ExploreQuizzesPageProps {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  onSelectQuiz: (quiz: Quiz) => void;
}

export const ExploreQuizzesPage: React.FC<ExploreQuizzesPageProps> = ({
  quizzes,
  attempts,
  onSelectQuiz,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = Array.from(new Set(quizzes.map((q) => q.category)));

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (!quiz.isPublished) return false;
    if (selectedCategory !== 'all' && quiz.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && quiz.difficulty !== selectedDifficulty) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        quiz.title.toLowerCase().includes(q) ||
        quiz.description.toLowerCase().includes(q) ||
        quiz.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0B132B]">
            Explore Academic Assessments
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Select an examination topic, review curriculum scope, and begin test delivery
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics, questions, tags..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-white border border-[#E2E8F0] rounded-lg shadow-xs">
        <div className="flex items-center gap-1.5 text-xs text-[#475569] px-2 font-semibold">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
        </div>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
            selectedCategory === 'all'
              ? 'bg-[#4338CA] text-white shadow-xs'
              : 'text-[#475569] hover:bg-[#F1F5F9]'
          }`}
        >
          All Domains
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              selectedCategory === cat
                ? 'bg-[#4338CA] text-white shadow-xs'
                : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="hidden sm:block h-4 w-[1px] bg-[#E2E8F0] mx-1"></div>

        <div className="flex items-center gap-1 text-xs text-[#475569] px-2 font-semibold">
          <span>Level:</span>
        </div>
        {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedDifficulty(lvl)}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              selectedDifficulty === lvl
                ? 'bg-[#F1F5F9] text-[#0B132B] font-bold border border-[#CBD5E1]'
                : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            {lvl === 'all' ? 'All' : lvl}
          </button>
        ))}
      </div>

      {/* Grid of Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredQuizzes.map((quiz) => {
          const quizAttempts = attempts.filter((a) => a.quizId === quiz.id);
          const hasPassed = quizAttempts.some((a) => a.passed);

          return (
            <div
              key={quiz.id}
              className="bg-white border border-[#E2E8F0] hover:border-[#C7D2FE] rounded-xl p-6 transition-all shadow-[0_1px_2px_rgba(11,19,43,0.02)] hover:shadow-[0_4px_8px_rgba(67,56,202,0.06)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4338CA] uppercase tracking-wider">
                    {quiz.category}
                  </span>
                  <span className="text-[11px] font-semibold text-[#475569] bg-[#F1F5F9] px-2 py-0.5 rounded">
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B132B]">
                  {quiz.title}
                </h3>

                <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                  {quiz.description}
                </p>
              </div>

              {/* Specs line */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#475569]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#4338CA]" />
                    <span className="tabular-nums">{quiz.durationMinutes} mins</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#4338CA]" />
                    <span className="tabular-nums">{quiz.questions.length} items</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#059669]" />
                    <span className="tabular-nums">{quiz.passingScorePercentage}% pass</span>
                  </span>
                </div>

                {hasPassed && (
                  <span className="text-[10px] font-bold uppercase text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                    Completed
                  </span>
                )}
              </div>

              <button
                onClick={() => onSelectQuiz(quiz)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#4338CA] hover:bg-[#4F46E5] active:bg-[#3730A3] text-white font-semibold text-xs rounded transition-colors shadow-sm"
              >
                <PlayCircle className="w-4 h-4" />
                <span>View Instructions & Take Quiz</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
