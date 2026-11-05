import React, { useState } from 'react';
import { LeaderboardEntry, User } from '../../types/quiz';
import { Trophy, Flame, ArrowLeft, Award, Sparkles } from 'lucide-react';

interface LeaderboardPageProps {
  entries: LeaderboardEntry[];
  currentUser: User;
  onNavigate: (path: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  entries,
  currentUser,
  onNavigate,
}) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'alltime'>('alltime');

  const sortedEntries = [...entries].sort((a, b) => b.totalPoints - a.totalPoints);
  const topThree = sortedEntries.slice(0, 3);
  const currentUserEntry = sortedEntries.find((e) => e.userId === currentUser.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] font-display">
            Cohort Academic Honors & Standings
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Rankings calculated from proctored examination marks, consistency streaks, and curriculum mastery.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-white/80 glass-card rounded-xl shadow-2xs border border-[#E2E8F0]">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              timeframe === 'weekly'
                ? 'bg-gradient-to-r from-[#4338CA] to-[#4F46E5] text-white shadow-xs'
                : 'text-[#475569] hover:text-[#0B132B]'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setTimeframe('alltime')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              timeframe === 'alltime'
                ? 'bg-gradient-to-r from-[#4338CA] to-[#4F46E5] text-white shadow-xs'
                : 'text-[#475569] hover:text-[#0B132B]'
            }`}
          >
            All-Time Honors
          </button>
        </div>
      </div>

      {/* Top 3 Podium Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Rank 2 (Silver) */}
        {topThree[1] && (
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center relative order-2 md:order-1 border border-white/90">
            <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#475569] font-bold text-xs flex items-center justify-center mx-auto mb-3 shadow-2xs">
              #2
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1C2541] to-[#3D4664] text-white font-bold text-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              {topThree[1].userName.charAt(0)}
            </div>
            <h3 className="text-base font-bold text-[#0B132B] font-display">
              {topThree[1].userName}
            </h3>
            <p className="text-xs text-[#475569] truncate mb-4">
              {topThree[1].department}
            </p>
            <div className="p-3 bg-white/70 border border-[#E2E8F0] rounded-xl flex justify-around text-xs shadow-2xs">
              <div>
                <span className="text-[10px] text-[#475569] uppercase block font-semibold">POINTS</span>
                <span className="font-extrabold text-[#0B132B] tabular-nums font-display">{topThree[1].totalPoints}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#475569] uppercase block font-semibold">ACCURACY</span>
                <span className="font-extrabold text-[#059669] tabular-nums font-display">{topThree[1].averagePercentage}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Rank 1 (Gold Valedictorian) */}
        {topThree[0] && (
          <div className="glass-card glass-card-hover rounded-2xl p-7 text-center relative order-1 md:order-2 border-2 border-[#4338CA]/40 shadow-xl bg-white/90">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] border border-[#C7D2FE] rounded-full text-xs font-bold text-[#4338CA] mb-3 uppercase tracking-wider shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Valedictorian Rank 1</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#2A14B4] to-[#6366F1] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg ring-4 ring-indigo-100">
              {topThree[0].userName.charAt(0)}
            </div>
            <h3 className="text-lg font-extrabold text-[#0B132B] font-display">
              {topThree[0].userName}
            </h3>
            <p className="text-xs text-[#475569] truncate mb-4 font-medium">
              {topThree[0].department}
            </p>
            <div className="p-3.5 bg-gradient-to-r from-[#EEF2FF]/90 to-[#E0E7FF]/70 border border-[#C7D2FE] rounded-xl flex justify-around text-xs shadow-xs">
              <div>
                <span className="text-[10px] text-[#475569] uppercase block font-bold">TOTAL SCORE</span>
                <span className="font-extrabold text-[#4338CA] text-base tabular-nums font-display">{topThree[0].totalPoints} pts</span>
              </div>
              <div>
                <span className="text-[10px] text-[#475569] uppercase block font-bold">ACCURACY</span>
                <span className="font-extrabold text-[#059669] text-base tabular-nums font-display">{topThree[0].averagePercentage}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#475569] uppercase block font-bold">STREAK</span>
                <span className="font-extrabold text-[#D97706] text-base tabular-nums flex items-center justify-center gap-0.5 font-display">
                  <Flame className="w-3.5 h-3.5 fill-[#D97706]" />
                  <span>{topThree[0].streakDays}d</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {topThree[2] && (
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center relative order-3 border border-white/90">
            <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#475569] font-bold text-xs flex items-center justify-center mx-auto mb-3 shadow-2xs">
              #3
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3D4664] to-[#545D7C] text-white font-bold text-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              {topThree[2].userName.charAt(0)}
            </div>
            <h3 className="text-base font-bold text-[#0B132B] font-display">
              {topThree[2].userName}
            </h3>
            <p className="text-xs text-[#475569] truncate mb-4">
              {topThree[2].department}
            </p>
            <div className="p-3 bg-white/70 border border-[#E2E8F0] rounded-xl flex justify-around text-xs shadow-2xs">
              <div>
                <span className="text-[10px] text-[#475569] uppercase block font-semibold">POINTS</span>
                <span className="font-extrabold text-[#0B132B] tabular-nums font-display">{topThree[2].totalPoints}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#475569] uppercase block font-semibold">ACCURACY</span>
                <span className="font-extrabold text-[#059669] tabular-nums font-display">{topThree[2].averagePercentage}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cohort Roster Table */}
      <div className="glass-card rounded-2xl shadow-sm border border-white/90 overflow-hidden">
        <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between bg-white/50">
          <h2 className="text-sm font-bold text-[#0B132B] font-display">
            All Enrolled Candidates ({sortedEntries.length})
          </h2>
          <span className="text-xs text-[#475569]">
            Live scoring calculation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC]/80 border-b border-[#E2E8F0] text-[#475569] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4 hidden sm:table-cell">Academic Dept</th>
                <th className="py-3 px-4 text-center">Quizzes</th>
                <th className="py-3 px-4 text-center">Avg Accuracy</th>
                <th className="py-3 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {sortedEntries.map((entry, idx) => {
                const isCurrentUser = entry.userId === currentUser.id;
                return (
                  <tr
                    key={entry.userId || idx}
                    className={`hover:bg-white/80 transition-colors ${
                      isCurrentUser ? 'bg-[#EEF2FF]/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 tabular-nums">
                      {idx === 0 ? (
                        <span className="w-6 h-6 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold flex items-center justify-center shadow-2xs">1</span>
                      ) : idx === 1 ? (
                        <span className="w-6 h-6 rounded-full bg-[#F1F5F9] text-[#475569] font-bold flex items-center justify-center shadow-2xs">2</span>
                      ) : idx === 2 ? (
                        <span className="w-6 h-6 rounded-full bg-[#FEF2F2] text-[#991B1B] font-bold flex items-center justify-center shadow-2xs">3</span>
                      ) : (
                        <span className="text-[#475569] font-medium pl-1.5">{idx + 1}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1C2541] to-[#3D4664] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                          {entry.userName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-[#0B132B] block font-display">
                            {entry.userName}
                            {isCurrentUser && (
                              <span className="ml-2 text-[10px] font-bold uppercase text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded-full border border-indigo-200">
                                You
                              </span>
                            )}
                          </span>
                          <span className="text-[11px] text-[#475569] sm:hidden block">
                            {entry.department}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#475569] hidden sm:table-cell">
                      {entry.department}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums text-[#0B132B] font-mono">
                      {entry.quizzesTaken}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-bold text-[#059669] font-mono">
                      {entry.averagePercentage}%
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-bold text-[#0B132B] font-mono">
                      {entry.totalPoints} pts
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Standing Sticky Bar */}
      {currentUserEntry && (
        <div className="glass-sidebar text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4338CA] to-[#6366F1] font-bold text-sm flex items-center justify-center shadow-md">
              #{currentUserEntry.rank}
            </div>
            <div>
              <p className="text-[11px] text-[#C3C0FF] uppercase tracking-wider font-semibold">Your Current Standing</p>
              <h3 className="text-sm font-bold text-white font-display">{currentUserEntry.userName} · {currentUserEntry.department}</h3>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs">
            <div>
              <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Quizzes</span>
              <span className="font-bold tabular-nums text-white text-sm font-mono">{currentUserEntry.quizzesTaken}</span>
            </div>
            <div>
              <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Accuracy</span>
              <span className="font-bold tabular-nums text-[#34D399] text-sm font-mono">{currentUserEntry.averagePercentage}%</span>
            </div>
            <div>
              <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Total Points</span>
              <span className="font-bold tabular-nums text-white text-base font-display">{currentUserEntry.totalPoints} pts</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
