import React from 'react';
import { Clock } from 'lucide-react';

interface TimerBadgeProps {
  seconds: number;
  isLowTime?: boolean;
}

export const TimerBadge: React.FC<TimerBadgeProps> = ({ seconds, isLowTime = false }) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const formatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs font-bold tabular-nums border ${
        isLowTime
          ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA] animate-pulse'
          : 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
      }`}
    >
      <Clock className="w-3.5 h-3.5" />
      <span>{formatted}</span>
    </div>
  );
};
