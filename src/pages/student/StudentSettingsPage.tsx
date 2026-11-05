import React, { useState } from 'react';
import { User } from '../../types/quiz';
import { Bell, Lock, Shield, CheckCircle2 } from 'lucide-react';

interface StudentSettingsPageProps {
  currentUser: User;
}

export const StudentSettingsPage: React.FC<StudentSettingsPageProps> = ({ currentUser }) => {
  const [notifyResults, setNotifyResults] = useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [autoSubmitTimeout, setAutoSubmitTimeout] = useState(true);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass.trim() || newPass.length < 6) {
      setStatusMsg('New password must contain at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setStatusMsg('Passwords do not match.');
      return;
    }
    setStatusMsg('Security credentials updated successfully.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0B132B]">
          Candidate Preferences & Settings
        </h1>
        <p className="text-xs text-[#475569] mt-0.5">
          Configure notification dispatch, examination behaviors, and authentication credentials
        </p>
      </div>

      <div className="space-y-6">
        {/* Assessment Preferences */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-3">
            <Bell className="w-4 h-4 text-[#4338CA]" />
            <h2 className="text-sm font-bold text-[#0B132B]">
              Examination & Notification Preferences
            </h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyResults}
                onChange={(e) => setNotifyResults(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#4338CA] rounded"
              />
              <div>
                <span className="text-xs font-semibold text-[#0B132B] block">
                  Email Score Dispatches
                </span>
                <span className="text-[11px] text-[#475569]">
                  Automatically receive an itemized grade report via email upon exam submission.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyDeadlines}
                onChange={(e) => setNotifyDeadlines(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#4338CA] rounded"
              />
              <div>
                <span className="text-xs font-semibold text-[#0B132B] block">
                  Assessment Deadline Reminders
                </span>
                <span className="text-[11px] text-[#475569]">
                  Receive notification alerts 24 hours prior to published test closing dates.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSubmitTimeout}
                onChange={(e) => setAutoSubmitTimeout(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#4338CA] rounded"
              />
              <div>
                <span className="text-xs font-semibold text-[#0B132B] block">
                  Enforce Strict Auto-Submit on Timeout
                </span>
                <span className="text-[11px] text-[#475569]">
                  Immediately freeze selections and commit exam papers when timer hits 00:00.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Security & Password */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-3">
            <Lock className="w-4 h-4 text-[#4338CA]" />
            <h2 className="text-sm font-bold text-[#0B132B]">
              Change Access Password
            </h2>
          </div>

          {statusMsg && (
            <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-xs text-[#059669] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors shadow-sm"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
