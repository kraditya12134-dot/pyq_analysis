/**
 * Core domain types for QuizMaster Examination & Assessment Platform
 */

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  studentId?: string;
  bio?: string;
  phone?: string;
  notificationsEnabled?: boolean;
  theme?: 'light' | 'dark' | 'system';
  createdAt: string;
}

export type QuizDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuizDifficulty;
  durationMinutes: number;
  passingScorePercentage: number;
  questions: Question[];
  isPublished: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
  attemptsCount?: number;
  averageScore?: number;
}

export type QuizDeliveryMode = 'exam' | 'practice';

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  category: string;
  userId: string;
  userName: string;
  userEmail: string;
  answers: Record<number, number>; // questionIndex -> selectedOptionIndex
  markedQuestions: number[]; // questionIndices
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  timeTakenSeconds: number;
  mode: QuizDeliveryMode;
  completedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userRole: UserRole;
  department: string;
  quizzesTaken: number;
  passedCount: number;
  averagePercentage: number;
  totalPoints: number;
  streakDays: number;
  badge: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  code: string;
  description: string;
  quizCount: number;
  iconName: string;
}
