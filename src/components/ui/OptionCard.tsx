import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface OptionCardProps {
  letter: string;
  text: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  showFeedback?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  letter,
  text,
  isSelected = false,
  isCorrect = false,
  isIncorrect = false,
  showFeedback = false,
  onClick,
  disabled = false,
}) => {
  let cardStyle = 'bg-white border-[#E2E8F0] text-[#0B132B] hover:border-[#C7D2FE] hover:bg-[#F8FAFC]';
  let tagStyle = 'bg-[#F1F5F9] text-[#475569]';

  if (isSelected) {
    cardStyle = 'border-[1.5px] border-[#4338CA] bg-[#EEF2FF] shadow-[0_4px_6px_rgba(67,56,202,0.06)]';
    tagStyle = 'bg-[#4338CA] text-white';
  }

  if (showFeedback) {
    if (isCorrect) {
      cardStyle = 'border-[1.5px] border-[#059669] bg-[#ECFDF5]';
      tagStyle = 'bg-[#059669] text-white';
    } else if (isIncorrect) {
      cardStyle = 'border-[1.5px] border-[#DC2626] bg-[#FEF2F2]';
      tagStyle = 'bg-[#DC2626] text-white';
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3.5 ${cardStyle} ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <div
        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${tagStyle}`}
      >
        {letter}
      </div>
      <span className="text-sm font-medium leading-relaxed pt-0.5">
        {text}
      </span>
      {showFeedback && isCorrect && (
        <CheckCircle2 className="w-5 h-5 text-[#059669] ml-auto shrink-0 mt-0.5" />
      )}
      {showFeedback && isIncorrect && (
        <XCircle className="w-5 h-5 text-[#DC2626] ml-auto shrink-0 mt-0.5" />
      )}
    </button>
  );
};
