import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid institutional email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_3px_rgba(11,19,43,0.04)] overflow-hidden">
        <div className="p-6 border-b border-[#F1F5F9] text-center">
          <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-[#0B132B]">
            Credential Recovery
          </h1>
          <p className="text-xs text-[#475569] mt-1">
            Reset access to your QuizMaster examination portal
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold text-[#0B132B]">
                Recovery Instructions Dispatched
              </h2>
              <p className="text-xs text-[#475569] leading-relaxed">
                If an institutional profile exists for <span className="font-semibold text-[#0B132B]">{email}</span>, a secure one-time password reset link has been dispatched to your mailbox.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="w-full h-10 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded text-xs text-[#DC2626] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <p className="text-xs text-[#475569] leading-relaxed">
                Enter your registered college email. We will verify your roster status and issue password reset instructions.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex.morgan@college.edu"
                  className="w-full h-10 px-3 text-sm bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors shadow-sm"
              >
                Send Password Reset Link
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-[#475569] hover:text-[#0B132B] pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
