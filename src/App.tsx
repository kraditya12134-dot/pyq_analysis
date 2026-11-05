import React, { useState, useEffect } from 'react';
import { User, Quiz, QuizAttempt, QuizDeliveryMode } from './types/quiz';
import { storageService } from './services/storageService';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { StudentLayout } from './layouts/StudentLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// Student Pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { ExploreQuizzesPage } from './pages/student/ExploreQuizzesPage';
import { InstructionsPage } from './pages/student/InstructionsPage';
import { ActiveQuizPage } from './pages/student/ActiveQuizPage';
import { ResultsPage } from './pages/student/ResultsPage';
import { AnswerReviewPage } from './pages/student/AnswerReviewPage';
import { LeaderboardPage } from './pages/student/LeaderboardPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentSettingsPage } from './pages/student/StudentSettingsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ManageQuizzesPage } from './pages/admin/ManageQuizzesPage';
import { QuestionBankPage } from './pages/admin/QuestionBankPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { ManageUsersPage } from './pages/admin/ManageUsersPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('/login');

  // Core Data
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Navigation Context States (for active examination & review)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [runningQuizMode, setRunningQuizMode] = useState<QuizDeliveryMode>('exam');
  const [activeAttempt, setActiveAttempt] = useState<QuizAttempt | null>(null);

  // Initialize data on mount
  useEffect(() => {
    refreshAllData();

    const storedUser = storageService.getActiveUser();
    if (storedUser) {
      setCurrentUser(storedUser);
      if (storedUser.role === 'admin') {
        setCurrentPath('/admin/dashboard');
      } else {
        setCurrentPath('/student/dashboard');
      }
    } else {
      setCurrentPath('/login');
    }
  }, []);

  const refreshAllData = () => {
    setQuizzes(storageService.getQuizzes());
    setAttempts(storageService.getAttempts());
    setUsers(storageService.getAllUsers());
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    storageService.setActiveUser(user);
    refreshAllData();
    if (user.role === 'admin') {
      setCurrentPath('/admin/dashboard');
    } else {
      setCurrentPath('/student/dashboard');
    }
  };

  const handleLogout = () => {
    storageService.setActiveUser(null);
    setCurrentUser(null);
    setSelectedQuiz(null);
    setActiveAttempt(null);
    setCurrentPath('/login');
  };

  const handleSwitchRole = () => {
    if (!currentUser) return;
    const newRole = currentUser.role === 'admin' ? 'student' : 'admin';
    const updated: User = {
      ...currentUser,
      role: newRole,
    };
    storageService.saveUser(updated);
    storageService.setActiveUser(updated);
    setCurrentUser(updated);
    refreshAllData();

    if (newRole === 'admin') {
      setCurrentPath('/admin/dashboard');
    } else {
      setCurrentPath('/student/dashboard');
    }
  };

  const handleResetData = () => {
    if (confirm('Reset all QuizMaster data to initial accredited college curriculum defaults?')) {
      storageService.resetToDefaults();
      refreshAllData();
      alert('Data reset to syllabus defaults.');
    }
  };

  // Student Examination Flow
  const handleSelectQuizForInstructions = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentPath('/student/instructions');
  };

  const handleStartExam = (quiz: Quiz, mode: QuizDeliveryMode) => {
    setSelectedQuiz(quiz);
    setRunningQuizMode(mode);
    setCurrentPath('/student/active-quiz');
  };

  const handleExamSubmit = (attempt: QuizAttempt) => {
    storageService.saveAttempt(attempt);
    refreshAllData();
    setActiveAttempt(attempt);
    setCurrentPath('/student/results');
  };

  const handleViewHistoricalAttempt = (attemptId: string) => {
    const attempt = storageService.getAttemptById(attemptId);
    if (!attempt) return;
    const quiz = storageService.getQuizById(attempt.quizId);
    if (!quiz) return;

    setSelectedQuiz(quiz);
    setActiveAttempt(attempt);
    setCurrentPath('/student/results');
  };

  const handleReviewAnswers = (quiz: Quiz, attempt: QuizAttempt) => {
    setSelectedQuiz(quiz);
    setActiveAttempt(attempt);
    setCurrentPath('/student/review');
  };

  // Admin CRUD handlers
  const handleAdminSaveQuiz = (quiz: Quiz) => {
    storageService.saveQuiz(quiz);
    refreshAllData();
  };

  const handleAdminDeleteQuiz = (quizId: string) => {
    storageService.deleteQuiz(quizId);
    refreshAllData();
  };

  const handleAdminTogglePublish = (quizId: string) => {
    storageService.toggleQuizPublish(quizId);
    refreshAllData();
  };

  const handleAdminManageQuestions = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentPath('/admin/questions');
  };

  // ==========================================
  // SECTION 1: PUBLIC ROUTES (No Auth Required)
  // ==========================================
  if (!currentUser) {
    return (
      <PublicLayout activePath={currentPath} onNavigate={handleNavigate}>
        {currentPath === '/landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        {currentPath === '/login' && (
          <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />
        )}
        {currentPath === '/register' && (
          <RegisterPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />
        )}
        {currentPath === '/forgot-password' && (
          <ForgotPasswordPage onNavigate={handleNavigate} />
        )}
        {/* Fallback to login */}
        {currentPath !== '/landing' && currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/forgot-password' && (
          <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />
        )}
      </PublicLayout>
    );
  }

  // ==========================================
  // SECTION 2: ACTIVE QUIZ (Focused 840px Workspace)
  // ==========================================
  if (currentPath === '/student/active-quiz' && selectedQuiz) {
    return (
      <ActiveQuizPage
        quiz={selectedQuiz}
        mode={runningQuizMode}
        currentUser={currentUser}
        onSubmit={handleExamSubmit}
        onExit={() => {
          if (confirm('Exit exam? Progress will not be saved.')) {
            setCurrentPath('/student/dashboard');
          }
        }}
      />
    );
  }

  // ==========================================
  // SECTION 3: STUDENT LAYOUT & SCREENS
  // ==========================================
  if (currentUser.role === 'student') {
    return (
      <StudentLayout
        currentUser={currentUser}
        activePath={currentPath}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        onResetData={handleResetData}
      >
        {currentPath === '/student/dashboard' && (
          <StudentDashboardPage
            currentUser={currentUser}
            quizzes={quizzes}
            attempts={attempts}
            onSelectQuiz={handleSelectQuizForInstructions}
            onViewAttempt={handleViewHistoricalAttempt}
            onNavigate={handleNavigate}
          />
        )}

        {currentPath === '/student/explore' && (
          <ExploreQuizzesPage
            quizzes={quizzes}
            attempts={attempts}
            onSelectQuiz={handleSelectQuizForInstructions}
          />
        )}

        {currentPath === '/student/instructions' && selectedQuiz && (
          <InstructionsPage
            quiz={selectedQuiz}
            onBack={() => handleNavigate('/student/explore')}
            onStartExam={handleStartExam}
          />
        )}

        {currentPath === '/student/results' && selectedQuiz && activeAttempt && (
          <ResultsPage
            quiz={selectedQuiz}
            attempt={activeAttempt}
            onRetake={(q) => handleSelectQuizForInstructions(q)}
            onReviewAnswers={handleReviewAnswers}
            onBackToDashboard={() => handleNavigate('/student/dashboard')}
            onViewLeaderboard={() => handleNavigate('/student/leaderboard')}
          />
        )}

        {currentPath === '/student/review' && selectedQuiz && activeAttempt && (
          <AnswerReviewPage
            quiz={selectedQuiz}
            attempt={activeAttempt}
            onBackToResults={() => handleNavigate('/student/results')}
            onRetake={(q) => handleSelectQuizForInstructions(q)}
          />
        )}

        {currentPath === '/student/leaderboard' && (
          <LeaderboardPage
            entries={storageService.getLeaderboard()}
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        )}

        {currentPath === '/student/profile' && (
          <StudentProfilePage
            currentUser={currentUser}
            attempts={attempts}
            onUpdateUser={(updated) => setCurrentUser(updated)}
          />
        )}

        {currentPath === '/student/settings' && (
          <StudentSettingsPage currentUser={currentUser} />
        )}

        {/* Catch-all for Student */}
        {currentPath !== '/student/dashboard' &&
          currentPath !== '/student/explore' &&
          currentPath !== '/student/instructions' &&
          currentPath !== '/student/results' &&
          currentPath !== '/student/review' &&
          currentPath !== '/student/leaderboard' &&
          currentPath !== '/student/profile' &&
          currentPath !== '/student/settings' && (
            <StudentDashboardPage
              currentUser={currentUser}
              quizzes={quizzes}
              attempts={attempts}
              onSelectQuiz={handleSelectQuizForInstructions}
              onViewAttempt={handleViewHistoricalAttempt}
              onNavigate={handleNavigate}
            />
          )}
      </StudentLayout>
    );
  }

  // ==========================================
  // SECTION 4: ADMIN LAYOUT & SCREENS
  // ==========================================
  return (
    <AdminLayout
      currentUser={currentUser}
      activePath={currentPath}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onSwitchRole={handleSwitchRole}
      onResetData={handleResetData}
    >
      {currentPath === '/admin/dashboard' && (
        <AdminDashboardPage
          quizzes={quizzes}
          attempts={attempts}
          users={users}
          onNavigate={handleNavigate}
          onCreateQuiz={() => handleNavigate('/admin/quizzes')}
        />
      )}

      {currentPath === '/admin/quizzes' && (
        <ManageQuizzesPage
          quizzes={quizzes}
          currentUser={currentUser}
          onSaveQuiz={handleAdminSaveQuiz}
          onDeleteQuiz={handleAdminDeleteQuiz}
          onTogglePublish={handleAdminTogglePublish}
          onPreviewQuiz={handleSelectQuizForInstructions}
          onManageQuestions={handleAdminManageQuestions}
        />
      )}

      {currentPath === '/admin/questions' && (
        <QuestionBankPage
          quizzes={quizzes}
          onSaveQuiz={handleAdminSaveQuiz}
          initialSelectedQuizId={selectedQuiz?.id}
        />
      )}

      {currentPath === '/admin/categories' && (
        <CategoriesPage quizzes={quizzes} />
      )}

      {currentPath === '/admin/users' && (
        <ManageUsersPage
          users={users}
          attempts={attempts}
          onRefreshUsers={refreshAllData}
        />
      )}

      {currentPath === '/admin/analytics' && (
        <AnalyticsPage
          quizzes={quizzes}
          attempts={attempts}
          onViewAttempt={handleViewHistoricalAttempt}
        />
      )}

      {currentPath === '/admin/settings' && (
        <AdminSettingsPage onResetData={handleResetData} />
      )}

      {/* Catch-all for Admin */}
      {currentPath !== '/admin/dashboard' &&
        currentPath !== '/admin/quizzes' &&
        currentPath !== '/admin/questions' &&
        currentPath !== '/admin/categories' &&
        currentPath !== '/admin/users' &&
        currentPath !== '/admin/analytics' &&
        currentPath !== '/admin/settings' && (
          <AdminDashboardPage
            quizzes={quizzes}
            attempts={attempts}
            users={users}
            onNavigate={handleNavigate}
            onCreateQuiz={() => handleNavigate('/admin/quizzes')}
          />
        )}
    </AdminLayout>
  );
}
