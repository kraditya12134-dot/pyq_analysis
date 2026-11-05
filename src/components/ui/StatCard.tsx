import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  iconColor?: string;
  unit?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor = 'text-[#4338CA]',
  unit,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-[0_1px_2px_rgba(11,19,43,0.02)]">
      <div className="flex items-center justify-between text-[#475569] mb-2">
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
        {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
      </div>
      <div className="text-2xl font-bold text-[#0B132B] tabular-nums">
        {value} {unit && <span className="text-sm font-normal text-[#475569]">{unit}</span>}
      </div>
      {subtext && <div className="text-xs text-[#475569] mt-1">{subtext}</div>}
    </div>
  );
};
