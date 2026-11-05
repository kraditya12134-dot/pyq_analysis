import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { Search, Filter, TrendingUp, BarChart3, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface AnalyticsPageProps {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  onViewAttempt: (attemptId: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  quizzes,
  attempts,
  onViewAttempt,
}) => {
  const [selectedQuizId, setSelectedQuizId] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [search, setSearch] = useState('');

  const filteredAttempts = attempts.filter((att) => {
    if (selectedQuizId !== 'all' && att.quizId !== selectedQuizId) return false;
    if (statusFilter === 'passed' && !att.passed) return false;
    if (statusFilter === 'failed' && att.passed) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return (
        att.userName.toLowerCase().includes(s) ||
        att.userEmail.toLowerCase().includes(s) ||
        att.quizTitle.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const totalAttempts = attempts.length;
  const passedCount = attempts.filter((a) => a.passed).length;
  const avgPerc = totalAttempts > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0B132B]">
          Assessment Submission Logs & Analytics
        </h1>
        <p className="text-xs text-[#475569] mt-0.5">
          Audit candidate attempt velocity, pass rates, and individual question performance
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#475569] uppercase block mb-1">
            Total Submissions Logged
          </span>
          <span className="text-2xl font-bold text-[#0B132B] tabular-nums">
            {totalAttempts}
          </span>
          <span className="text-[11px] text-[#475569] block mt-1">Across all syllabus modules</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#475569] uppercase block mb-1">
            Cohort Average Score
          </span>
          <span className="text-2xl font-bold text-[#4338CA] tabular-nums">
            {avgPerc}%
          </span>
          <span className="text-[11px] text-[#475569] block mt-1">Mean assessment accuracy</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#475569] uppercase block mb-1">
            Overall Pass Rate
          </span>
          <span className="text-2xl font-bold text-[#059669] tabular-nums">
            {totalAttempts > 0 ? Math.round((passedCount / totalAttempts) * 100) : 0}%
          </span>
          <span className="text-[11px] text-[#475569] block mt-1">{passedCount} successful completions</span>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name or title..."
            className="w-full h-8 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
            className="h-8 px-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
          >
            <option value="all">All Assessments</option>
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>{q.title}</option>
            ))}
          </select>

          <div className="flex items-center gap-1 p-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-1 rounded font-semibold ${
                statusFilter === 'all' ? 'bg-white text-[#0B132B] shadow-xs' : 'text-[#475569]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('passed')}
              className={`px-2 py-1 rounded font-semibold ${
                statusFilter === 'passed' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569]'
              }`}
            >
              Passed
            </button>
            <button
              onClick={() => setStatusFilter('failed')}
              className={`px-2 py-1 rounded font-semibold ${
                statusFilter === 'failed' ? 'bg-[#DC2626] text-white shadow-xs' : 'text-[#475569]'
              }`}
            >
              Failed
            </button>
          </div>
        </div>
      </div>

      {/* High-Density Audit Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Assessment</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Accuracy</th>
                <th className="py-3 px-4 text-center">Format</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Duration</th>
                <th className="py-3 px-4 text-right">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredAttempts.map((att) => (
                <tr key={att.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#0B132B] block">{att.userName}</span>
                    <span className="text-[11px] text-[#475569]">{att.userEmail}</span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-medium text-[#0B132B] block truncate">{att.quizTitle}</span>
                    <span className="text-[11px] text-[#475569]">{att.category}</span>
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums font-semibold">
                    {att.score} / {att.maxScore}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums font-bold text-[#4338CA]">
                    {att.percentage}%
                  </td>
                  <td className="py-3 px-4 text-center uppercase text-[10px] font-mono text-[#475569]">
                    {att.mode}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        att.passed ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FEF2F2] text-[#DC2626]'
                      }`}
                    >
                      {att.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums text-[#475569]">
                    {Math.round(att.timeTakenSeconds / 60)}m {att.timeTakenSeconds % 60}s
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-[#475569]">
                    {new Date(att.completedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
