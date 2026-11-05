import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { Settings, Shield, RotateCcw, CheckCircle2, Save } from 'lucide-react';

interface AdminSettingsPageProps {
  onResetData: () => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onResetData }) => {
  const [settings, setSettings] = useState(storageService.getSystemSettings());
  const [instName, setInstName] = useState((settings as any).institutionName || 'Apex Institute of Technology');
  const [passThreshold, setPassThreshold] = useState((settings as any).defaultPassThreshold || 70);
  const [allowRetakes, setAllowRetakes] = useState((settings as any).allowPracticeRetakes ?? true);
  const [autoSubmit, setAutoSubmit] = useState((settings as any).autoSubmitOnTimeout ?? true);
  const [leaderboardMode, setLeaderboardMode] = useState((settings as any).leaderboardVisibility || 'Public');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      institutionName: instName,
      defaultPassThreshold: Number(passThreshold),
      allowPracticeRetakes: allowRetakes,
      autoSubmitOnTimeout: autoSubmit,
      leaderboardVisibility: leaderboardMode,
    };
    storageService.saveSystemSettings(updated);
    setSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0B132B]">
          Institutional & Examination Settings
        </h1>
        <p className="text-xs text-[#475569] mt-0.5">
          Configure default examination thresholds, proctoring policies, and syllabus reset controls
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Settings Form */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
          {savedSuccess && (
            <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-xs text-[#059669] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Institutional configuration saved.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Institution / Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Default Passing Mark Threshold (%)
                </label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={passThreshold}
                  onChange={(e) => setPassThreshold(Number(e.target.value))}
                  className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Leaderboard Privacy Policy
                </label>
                <select
                  value={leaderboardMode}
                  onChange={(e) => setLeaderboardMode(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                >
                  <option value="Public">Public (Visible to All Enrolled Candidates)</option>
                  <option value="FacultyOnly">Faculty Only (Restricted to Administrators)</option>
                  <option value="Anonymous">Anonymous Pseudonyms (Diamond Scholar, etc.)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Examination Auto-Submit Policy
                </label>
                <select
                  value={autoSubmit ? 'enforced' : 'manual'}
                  onChange={(e) => setAutoSubmit(e.target.value === 'enforced')}
                  className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                >
                  <option value="enforced">Enforce Immediate Auto-Submit on 00:00</option>
                  <option value="manual">Allow 60-Second Grace Period</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowRetakes}
                  onChange={(e) => setAllowRetakes(e.target.checked)}
                  className="w-4 h-4 text-[#4338CA] rounded"
                />
                <span className="text-xs text-[#0B132B] font-semibold">
                  Allow candidates unlimited practice session retakes for accredited modules
                </span>
              </label>
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save System Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* Database & Demo Reset Zone */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#D97706]" />
            <h2 className="text-sm font-bold text-[#92400E]">
              Demonstration & College Presentation Reset
            </h2>
          </div>
          <p className="text-xs text-[#B45309] leading-relaxed">
            Restore all quizzes, questions, mock attempts, and registered users to clean accredited college curriculum defaults.
          </p>
          <div>
            <button
              type="button"
              onClick={onResetData}
              className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-xs rounded transition-colors shadow-xs"
            >
              Reset to Factory Curriculum Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
