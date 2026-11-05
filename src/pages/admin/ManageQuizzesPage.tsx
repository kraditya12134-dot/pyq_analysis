import React, { useState } from 'react';
import { Quiz, QuizDifficulty, User } from '../../types/quiz';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Layers, 
  X,
  Filter
} from 'lucide-react';

interface ManageQuizzesPageProps {
  quizzes: Quiz[];
  currentUser: User;
  onSaveQuiz: (quiz: Quiz) => void;
  onDeleteQuiz: (quizId: string) => void;
  onTogglePublish: (quizId: string) => void;
  onPreviewQuiz: (quiz: Quiz) => void;
  onManageQuestions: (quiz: Quiz) => void;
}

export const ManageQuizzesPage: React.FC<ManageQuizzesPageProps> = ({
  quizzes,
  currentUser,
  onSaveQuiz,
  onDeleteQuiz,
  onTogglePublish,
  onPreviewQuiz,
  onManageQuestions,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Data Structures & Algorithms');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('Intermediate');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [passingScorePercentage, setPassingScorePercentage] = useState(70);

  const categories = Array.from(new Set(quizzes.map((q) => q.category)));

  const openCreateModal = () => {
    setEditingQuiz(null);
    setTitle('');
    setDescription('');
    setCategory('Computer Science & Engineering');
    setDifficulty('Intermediate');
    setDurationMinutes(15);
    setPassingScorePercentage(70);
    setModalOpen(true);
  };

  const openEditModal = (q: Quiz) => {
    setEditingQuiz(q);
    setTitle(q.title);
    setDescription(q.description);
    setCategory(q.category);
    setDifficulty(q.difficulty);
    setDurationMinutes(q.durationMinutes);
    setPassingScorePercentage(q.passingScorePercentage);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim()) return;

    if (editingQuiz) {
      const updated: Quiz = {
        ...editingQuiz,
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        difficulty,
        durationMinutes: Number(durationMinutes) || 15,
        passingScorePercentage: Number(passingScorePercentage) || 70,
      };
      onSaveQuiz(updated);
    } else {
      const created: Quiz = {
        id: `quiz-custom-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        difficulty,
        durationMinutes: Number(durationMinutes) || 15,
        passingScorePercentage: Number(passingScorePercentage) || 70,
        questions: [
          {
            id: `q-${Date.now()}-1`,
            text: 'Initial assessment item:',
            options: ['Option Alpha', 'Option Beta', 'Option Gamma', 'Option Delta'],
            correctAnswerIndex: 0,
            explanation: 'Verified syllabus rationale.',
            points: 5,
          },
        ],
        isPublished: true,
        authorId: currentUser.id,
        authorName: currentUser.name,
        createdAt: new Date().toISOString(),
        attemptsCount: 0,
        averageScore: 0,
      };
      onSaveQuiz(created);
    }

    setModalOpen(false);
    setEditingQuiz(null);
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return (
        q.title.toLowerCase().includes(s) ||
        q.description.toLowerCase().includes(s) ||
        q.category.toLowerCase().includes(s)
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
            Assessment Catalog Management
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Create, configure duration, publish, and manage questions for syllabus evaluations
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#4338CA] hover:bg-[#4F46E5] active:bg-[#3730A3] text-white font-semibold text-xs rounded transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assessments..."
            className="w-full h-8 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-[#475569]">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-8 px-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
          >
            <option value="all">All Domains ({quizzes.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* High-Density Quizzes Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4 text-center">Questions</th>
                <th className="py-3 px-4 text-center">Duration</th>
                <th className="py-3 px-4 text-center">Pass %</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredQuizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onTogglePublish(quiz.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        quiz.isPublished
                          ? 'bg-[#ECFDF5] text-[#059669] hover:bg-[#D1FAE5]'
                          : 'bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2]'
                      }`}
                    >
                      {quiz.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-semibold text-[#0B132B] block truncate">
                      {quiz.title}
                    </span>
                    <span className="text-[11px] text-[#475569] truncate block">
                      {quiz.description}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#475569]">
                    {quiz.category}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[#0B132B] font-medium">{quiz.difficulty}</span>
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums font-semibold">
                    {quiz.questions.length}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums text-[#475569]">
                    {quiz.durationMinutes}m
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums font-semibold text-[#059669]">
                    {quiz.passingScorePercentage}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onPreviewQuiz(quiz)}
                        className="p-1.5 text-[#475569] hover:text-[#0B132B] hover:bg-[#F1F5F9] rounded transition-colors"
                        title="Preview Assessment"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onManageQuestions(quiz)}
                        className="p-1.5 text-[#4338CA] hover:bg-[#EEF2FF] rounded transition-colors"
                        title="Question Bank"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(quiz)}
                        className="p-1.5 text-[#475569] hover:text-[#0B132B] hover:bg-[#F1F5F9] rounded transition-colors"
                        title="Edit Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${quiz.title}"?`)) {
                            onDeleteQuiz(quiz.id);
                          }
                        }}
                        className="p-1.5 text-[#DC2626] hover:bg-[#FEF2F2] rounded transition-colors"
                        title="Delete Quiz"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Edit / Create Quiz Metadata */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E2E8F0] rounded-xl max-w-xl w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B132B]">
                {editingQuiz ? 'Edit Assessment Parameters' : 'Create New Assessment'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded text-[#475569] hover:bg-[#F1F5F9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Assessment Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Database Architecture"
                  className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Description & Scope
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Syllabus topics tested..."
                  className="w-full p-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                    Subject Category
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as QuizDifficulty)}
                    className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                    Passing Threshold (%)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={passingScorePercentage}
                    onChange={(e) => setPassingScorePercentage(Number(e.target.value))}
                    className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] rounded border border-[#E2E8F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#4338CA] hover:bg-[#4F46E5] active:bg-[#3730A3] rounded transition-colors shadow-sm"
                >
                  Save Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
