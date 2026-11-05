import { Quiz, QuizAttempt, User, LeaderboardEntry, CategoryItem } from '../types/quiz';
import { INITIAL_QUIZZES, INITIAL_USERS, INITIAL_LEADERBOARD } from '../data/seedData';

const STORAGE_KEYS = {
  ACTIVE_USER: 'quizmaster_active_user',
  USERS: 'quizmaster_users',
  QUIZZES: 'quizmaster_quizzes',
  ATTEMPTS: 'quizmaster_attempts',
  LEADERBOARD: 'quizmaster_leaderboard',
  CATEGORIES: 'quizmaster_categories',
  SYSTEM_SETTINGS: 'quizmaster_settings',
};

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-dsa',
    name: 'Data Structures & Algorithms',
    code: 'CS-DSA',
    description: 'Trees, graphs, asymptotic analysis, dynamic programming, sorting and searching algorithms.',
    quizCount: 1,
    iconName: 'GitBranch',
  },
  {
    id: 'cat-web',
    name: 'Web Engineering',
    code: 'CS-WEB',
    description: 'Modern full-stack web architecture, event loops, browser security models, and TypeScript.',
    quizCount: 1,
    iconName: 'Globe',
  },
  {
    id: 'cat-db',
    name: 'Database Systems',
    code: 'CS-DBMS',
    description: 'Relational database internals, ACID transactions, WAL logging, B+Tree indexing, and CAP theorem.',
    quizCount: 1,
    iconName: 'Database',
  },
  {
    id: 'cat-cn',
    name: 'Computer Networks',
    code: 'CS-NET',
    description: 'OSI 7-layer stack, TCP/UDP transport protocol mechanics, TLS 1.3 handshake, and IPv4/v6 subnetting.',
    quizCount: 1,
    iconName: 'Network',
  },
  {
    id: 'cat-os',
    name: 'Operating Systems',
    code: 'CS-OS',
    description: 'Process scheduling, virtual memory paging, multithreading synchronization, and deadlocks.',
    quizCount: 0,
    iconName: 'Cpu',
  },
];

const INITIAL_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att-seed-1',
    quizId: 'quiz-cn-401',
    quizTitle: 'Computer Networks: OSI Layer & Transport Protocols',
    category: 'Computer Networks',
    userId: 'user-student-1',
    userName: 'Alex Morgan',
    userEmail: 'alex.morgan@college.edu',
    answers: { 0: 1, 1: 2, 2: 1 },
    markedQuestions: [],
    score: 15,
    maxScore: 15,
    percentage: 100,
    passed: true,
    timeTakenSeconds: 245,
    mode: 'exam',
    completedAt: '2026-02-24T14:20:00Z',
  },
  {
    id: 'att-seed-2',
    quizId: 'quiz-dsa-101',
    quizTitle: 'Data Structures & Algorithms: Trees and Graphs',
    category: 'Data Structures & Algorithms',
    userId: 'user-student-1',
    userName: 'Alex Morgan',
    userEmail: 'alex.morgan@college.edu',
    answers: { 0: 1, 1: 2, 2: 1, 3: 1, 4: 0 },
    markedQuestions: [4],
    score: 20,
    maxScore: 25,
    percentage: 80,
    passed: true,
    timeTakenSeconds: 580,
    mode: 'exam',
    completedAt: '2026-02-26T16:45:00Z',
  },
];

export const storageService = {
  // Session & Users
  getActiveUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setActiveUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(user));
    }
  },

  getAllUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_USERS;
    }
  },

  saveUser(newUser: User): void {
    const users = this.getAllUsers();
    const existingIndex = users.findIndex((u) => u.id === newUser.id || u.email.toLowerCase() === newUser.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...newUser };
    } else {
      users.push(newUser);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Update active user if same ID
    const active = this.getActiveUser();
    if (active && active.id === newUser.id) {
      this.setActiveUser({ ...active, ...newUser });
    }
  },

  deleteUser(userId: string): void {
    const users = this.getAllUsers().filter((u) => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Categories CRUD
  getCategories(): CategoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CATEGORIES;
    }
  },

  saveCategory(cat: CategoryItem): void {
    const cats = this.getCategories();
    const idx = cats.findIndex((c) => c.id === cat.id);
    if (idx >= 0) {
      cats[idx] = cat;
    } else {
      cats.push(cat);
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cats));
  },

  deleteCategory(catId: string): void {
    const cats = this.getCategories().filter((c) => c.id !== catId);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cats));
  },

  // Quizzes CRUD
  getQuizzes(): Quiz[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
        return INITIAL_QUIZZES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_QUIZZES;
    }
  },

  getQuizById(id: string): Quiz | undefined {
    return this.getQuizzes().find((q) => q.id === id);
  },

  saveQuiz(quiz: Quiz): Quiz {
    const quizzes = this.getQuizzes();
    const index = quizzes.findIndex((q) => q.id === quiz.id);
    if (index >= 0) {
      quizzes[index] = quiz;
    } else {
      quizzes.unshift(quiz);
    }
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
    return quiz;
  },

  deleteQuiz(id: string): void {
    const quizzes = this.getQuizzes().filter((q) => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  },

  toggleQuizPublish(id: string): Quiz | undefined {
    const quizzes = this.getQuizzes();
    const quiz = quizzes.find((q) => q.id === id);
    if (quiz) {
      quiz.isPublished = !quiz.isPublished;
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
      return quiz;
    }
    return undefined;
  },

  // Attempts Management
  getAttempts(): QuizAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(INITIAL_ATTEMPTS));
        return INITIAL_ATTEMPTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ATTEMPTS;
    }
  },

  getAttemptsForUser(userId: string): QuizAttempt[] {
    return this.getAttempts().filter((a) => a.userId === userId);
  },

  getAttemptById(id: string): QuizAttempt | undefined {
    return this.getAttempts().find((a) => a.id === id);
  },

  saveAttempt(attempt: QuizAttempt): void {
    const attempts = this.getAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

    // Update quiz attempts count and average score
    const quizzes = this.getQuizzes();
    const targetQuiz = quizzes.find((q) => q.id === attempt.quizId);
    if (targetQuiz) {
      const quizAttempts = attempts.filter((a) => a.quizId === attempt.quizId);
      targetQuiz.attemptsCount = quizAttempts.length;
      const totalScoreSum = quizAttempts.reduce((acc, curr) => acc + curr.percentage, 0);
      targetQuiz.averageScore = Math.round(totalScoreSum / quizAttempts.length);
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
    }
  },

  // Leaderboard Calculation
  getLeaderboard(): LeaderboardEntry[] {
    try {
      const baseLeaderboard = INITIAL_LEADERBOARD;
      const attempts = this.getAttempts();
      const users = this.getAllUsers();

      const studentMap = new Map<string, { quizzes: number; passed: number; totalPerc: number; points: number }>();

      attempts.forEach((att) => {
        const current = studentMap.get(att.userId) || { quizzes: 0, passed: 0, totalPerc: 0, points: 0 };
        current.quizzes += 1;
        if (att.passed) current.passed += 1;
        current.totalPerc += att.percentage;
        current.points += att.score * 10;
        studentMap.set(att.userId, current);
      });

      const updatedList: LeaderboardEntry[] = baseLeaderboard.map((entry) => {
        const stats = studentMap.get(entry.userId);
        if (stats) {
          const combinedQuizzes = Math.max(entry.quizzesTaken, stats.quizzes);
          const combinedPoints = Math.max(entry.totalPoints, stats.points);
          const avg = Math.round(stats.totalPerc / stats.quizzes);
          return {
            ...entry,
            quizzesTaken: combinedQuizzes,
            totalPoints: combinedPoints,
            averagePercentage: avg,
          };
        }
        return entry;
      });

      studentMap.forEach((stats, uid) => {
        if (!updatedList.some((e) => e.userId === uid)) {
          const user = users.find((u) => u.id === uid);
          if (user) {
            updatedList.push({
              rank: updatedList.length + 1,
              userId: user.id,
              userName: user.name,
              userRole: user.role,
              department: user.department || 'Undergraduate',
              quizzesTaken: stats.quizzes,
              passedCount: stats.passed,
              averagePercentage: Math.round(stats.totalPerc / stats.quizzes),
              totalPoints: stats.points,
              streakDays: 1,
              badge: 'Scholar',
            });
          }
        }
      });

      return updatedList
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((item, idx) => ({ ...item, rank: idx + 1 }));
    } catch {
      return INITIAL_LEADERBOARD;
    }
  },

  // Settings
  getSystemSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SYSTEM_SETTINGS);
      return data
        ? JSON.parse(data)
        : {
            institutionName: 'Apex Institute of Technology',
            proctoringStrictness: 'Standard',
            allowPracticeRetakes: true,
            emailNotifications: true,
            leaderboardVisibility: 'Public',
            defaultPassThreshold: 70,
            autoSubmitOnTimeout: true,
          };
    } catch {
      return {
        institutionName: 'Apex Institute of Technology',
        proctoringStrictness: 'Standard',
        allowPracticeRetakes: true,
        emailNotifications: true,
        leaderboardVisibility: 'Public',
        defaultPassThreshold: 70,
        autoSubmitOnTimeout: true,
      };
    }
  },

  saveSystemSettings(settings: Record<string, unknown>) {
    localStorage.setItem(STORAGE_KEYS.SYSTEM_SETTINGS, JSON.stringify(settings));
  },

  // Reset to college syllabus defaults
  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(INITIAL_ATTEMPTS));
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_LEADERBOARD));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  },
};
