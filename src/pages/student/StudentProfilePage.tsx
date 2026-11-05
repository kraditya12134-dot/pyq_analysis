import React, { useState } from 'react';
import { User, QuizAttempt } from '../../types/quiz';
import { storageService } from '../../services/storageService';
import { 
  User as UserIcon, 
  Mail, 
  Building2, 
  Hash, 
  Award, 
  Calendar, 
  Save, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface StudentProfilePageProps {
  currentUser: User;
  attempts: QuizAttempt[];
  onUpdateUser: (updated: User) => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({
  currentUser,
  attempts,
  onUpdateUser,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [department, setDepartment] = useState(currentUser.department || 'Computer Science & Engineering');
  const [studentId, setStudentId] = useState(currentUser.studentId || 'CS-2026-0418');
  const [bio, setBio] = useState(currentUser.bio || 'Undergraduate candidate focusing on distributed systems and algorithm complexity analysis.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const userAttempts = attempts.filter((a) => a.userId === currentUser.id);
  const totalCompleted = userAttempts.length;
  const passedCount = userAttempts.filter((a) => a.passed).length;
  const avgScore = totalCompleted > 0
    ? Math.round(userAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalCompleted)
    : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...currentUser,
      name: name.trim(),
      department: department.trim(),
      studentId: studentId.trim(),
      bio: bio.trim(),
    };
    storageService.saveUser(updated);
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0B132B]">
          Candidate Academic Profile
        </h1>
        <p className="text-xs text-[#475569] mt-0.5">
          Verified academic identity, course credentials, and examination badges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center space-y-4 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-[#1C2541] text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-sm">
            {currentUser.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#0B132B]">{currentUser.name}</h2>
            <p className="text-xs text-[#475569]">{currentUser.email}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-[#EEF2FF] text-[#4338CA] text-[10px] font-bold uppercase tracking-wider">
              Enrolled Candidate
            </span>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
              <span className="text-[10px] text-[#475569] uppercase block">Completed</span>
              <span className="text-base font-bold text-[#0B132B] tabular-nums">{totalCompleted}</span>
            </div>
            <div className="p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
              <span className="text-[10px] text-[#475569] uppercase block">Accuracy</span>
              <span className="text-base font-bold text-[#059669] tabular-nums">{avgScore}%</span>
            </div>
          </div>

          {/* Academic Honors Badges */}
          <div className="pt-2 text-left">
            <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
              Earned Badges
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 p-2 bg-[#EEF2FF] border border-[#C7D2FE] rounded text-[#4338CA]">
                <Award className="w-4 h-4" />
                <span className="font-semibold">Syllabus Scholar</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-[#059669]">
                <FileCheck className="w-4 h-4" />
                <span className="font-semibold">Proctored Candidate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="md:col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSave} className="space-y-4">
            {savedSuccess && (
              <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-xs text-[#059669] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Profile credentials updated successfully.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Institutional ID
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Department
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Registered Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[#94A3B8] cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-[#94A3B8] mt-1">
                Institutional email address is bound to your university directory record.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                Academic Statement / Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
