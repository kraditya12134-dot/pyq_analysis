# QuizMaster - Online Examination & Assessment Platform

A production-grade, responsive online quiz and assessment web application crafted precisely to the Google Stitch design specifications. QuizMaster delivers an analytical, high-density, distraction-free examination platform featuring role-based authentication, student analytics, timed exams with mark-for-review navigation, untimed practice modes, comprehensive score breakdowns, dynamic leaderboards, and an administrative authoring console.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural parameters have been confirmed through initial clarification:

- **Authentication Flow & Initial State**: Boots on an Auth splash portal with clean tabs for Login and Registration. To ensure friction-free evaluation and college demonstration, instant 1-click **"Demo Student"** and **"Demo Admin"** credentials fill buttons are integrated directly into the login card.
- **Data Persistence Strategy**: High-reliability `localStorage` engine pre-seeded with rich, realistic academic curricula across Computer Science, Data Structures & Algorithms, Web Engineering, and System Architecture. Any admin creations, question edits, quiz attempts, and user registrations persist seamlessly across reloads with an instant "Reset to Syllabus Defaults" utility.
- **Dual Quiz Delivery Modes**: Supports both **Strict Examination Mode** (enforced countdown timer, question palette drawer, flag/mark-for-review, auto-submission upon timeout) and **Interactive Practice Mode** (untimed, instant feedback on selection, rich concept explanations, and step-by-step reasoning).

---

## 1. Overview & Core Concept

### What It Does
QuizMaster provides an end-to-end examination ecosystem tailored for students, educators, and academic administrators. Students can browse categorized academic assessments, take timed tests with real-time progress tracking, analyze post-submission performance with itemized question review, and compete on cohort leaderboards. Administrators gain a complete management dashboard to author quizzes, manage question banks, configure pass thresholds, inspect candidate submission logs, and audit cohort analytics.

### Target Audience & Persona
- **College Students & Candidates**: Seeking a distraction-free, reliable examination environment with real-time feedback, tabular timers, question flagging, and post-test review.
- **Instructors & Administrators**: Needing structured assessment authoring, question categorization (CS, Engineering, Mathematics, Science), time/mark allocation, and candidate attempt analytics.

### Key Value
- **Zero Distraction Testing UI**: Centered 840px container conforming strictly to Google Stitch mechanics (hairline borders `#E2E8F0`, deep indigo `#4338CA`, neutral canvas `#F8FAFC`, tabular typography `tnum`).
- **Complete Feature Fidelity**: All 6 required application modules with 100% active functional handlers (no dead buttons, fake telemetry, or mock placeholders).

---

## 2. User Experience & Visual Design

### Design System & Token Alignment (from Google Stitch Specification)
- **Palette Architecture**:
  - Primary Indigo: `#4338CA` (Hover: `#4F46E5`, Active: `#3730A3`)
  - Secondary Slate: `#1C2541` (Sidebar, structural headers, high-impact buttons)
  - Tertiary Violet / Accent: `#6366F1` (Focus rings, micro-tags, timer badges)
  - Canvas & Surfaces: Base background `#F8FAFC`, Raised surface `#FFFFFF`, Recessed fill `#F1F5F9`, Hairline border `#E2E8F0`
  - Typography Colors: Deep Navy `#0B132B`, Slate Body `#475569`, Muted `#94A3B8`
  - Semantics: Correct `#059669` / `#ECFDF5`, Incorrect `#DC2626` / `#FEF2F2`, Warning `#D97706` / `#FFFBEB`
- **Typography**: Inter with OpenType `tabular-nums` (`font-mono tabular-nums` for timers, score ratios, question counters `Question 14/50`).
- **Radius & Borders**: Hairline `1px solid #E2E8F0`, `rounded-sm` (4px) for controls/tags/inputs, `rounded-lg` (8px) for cards, `rounded-xl` (12px) for modals.

### Module-by-Module Walkthrough

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QuizMaster Main Workflows                       │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Auth Portal   --> Login / Register / Role Toggle / Demo Fill        │
│ 2. Student Hub   --> KPI Cards / Categories / Recents / Recommended   │
│ 3. Quiz Lobby    --> Quiz Details / Rules / Mode Pick (Exam / Practice)│
│ 4. Quiz Arena    --> 840px Container / Tabular Timer / Question Grid   │
│ 5. Results Hub   --> Grade Circular Badge / Score Matrix / Review Mode │
│ 6. Leaderboard   --> Weekly & All-Time Rankings / User Rank Highlight  │
│ 7. Admin Console --> Quiz CRUD / Question Bank / Category & User Logs │
└────────────────────────────────────────────────────────────────────────┘
```

#### 1. Authentication (Login / Register)
- Dual-tab card centered on neutral `#F8FAFC` background.
- Clean validation for email, password, full name, and role selector (Student / Admin).
- One-click quick login presets: `Student: alex@student.edu` and `Admin: prof.smith@college.edu`.
- Error and success alerts with clear dismissible banners.

#### 2. Student Dashboard
- **Top Bar**: Minimal 3-zone header with brand wordmark `QuizMaster`, role indicator, active student avatar, and quick logout / switch role affordance.
- **Metric Cards (3-column KPI strip)**: Total Quizzes Completed, Average Score %, Global Percentile Rank, Total Study Time.
- **Active / Recommended Quizzes Grid**: Filterable by category (Data Structures, Web Tech, Database Systems, Computer Networks) and difficulty (Beginner, Intermediate, Advanced) with point values and duration chips.
- **Recent Performance Table**: Date, Quiz Title, Score, Accuracy bar, and "Review Submission" quick link.

#### 3. Quiz Arena (Exam & Practice Delivery)
- Dedicated 840px centered exam runner eliminating header clutter.
- **Top Exam Bar**: Quiz title, Question count indicator (`Question 04 / 20`), and Tabular Countdown Timer with amber warning when under 2 minutes.
- **Action Toolbar**: "Mark for Review" flag button, "Question Palette" drawer toggle, and "Submit Exam" primary CTA.
- **Question Body**:
  - Alphanumeric Multiple Choice Cards (A, B, C, D) using Stitch specs: 24x24px recessed tag `#F1F5F9`, `#4338CA` border when selected, subtle hover transitions.
  - In **Practice Mode**: Immediate answer validation, green/red feedback cards, and comprehensive explanation drawer.
  - In **Exam Mode**: Unbiased selection, clear answer button, jump to next/previous, auto-submit confirmation modal.
- **Question Palette Drawer**: Interactive grid of question numbers colored by state: *Answered (Indigo)*, *Unanswered (Muted outline)*, *Marked for Review (Amber flag)*.

#### 4. Results & Detailed Analysis
- **Hero Performance Card**: Overall score percentage, Passed/Failed status chip, correct vs incorrect tallies, total time taken.
- **Filterable Question Review Pane**: Tabs to view *All Questions*, *Correct Only*, *Incorrect Only*, or *Marked for Review*. Each item displays candidate selection, verified answer, and full rational explanation.
- Action buttons: "Retake Quiz", "View Cohort Leaderboard", "Back to Dashboard".

#### 5. Leaderboard
- Toggle between **Weekly Sprint** and **All-Time Rankings**.
- Top 3 Podium Cards with custom badges and score statistics.
- Ranked tabular roster showing position, avatar, student name, quizzes completed, average score, and total points earned.
- Sticky user card showing current user's exact standing relative to the cohort.

#### 6. Admin Panel
- **Quiz Management**: Table of all quizzes with status (Draft / Published), difficulty, category, question count, and action dropdowns (Edit, Delete, Preview, Add Questions).
- **Interactive Quiz Builder**: Modal to set title, description, category, time limit (minutes), passing mark (%), and difficulty.
- **Question Bank Manager**: Add multiple-choice questions with 4 options, designate correct key, add explanation notes, and reorder.
- **Candidate Submission Logs**: View all student exam submissions, scores, timestamps, and pass/fail audit logs.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side State Machine with LocalStorage Sync**
  - *Chosen Approach*: React state wrapped in a centralized storage manager with automated pre-seeding and storage synchronization.
  - *Why*: Guarantees instant response times, zero server dependencies during project evaluation, zero network latency for exam timers, and preservation of created quizzes across page refreshes.
- **Decision 2: Modeless Dual-Experience Engine (Exam vs Practice)**
  - *Chosen Approach*: Single unified question runner component toggled by mode flag (`isPracticeMode`), dynamically showing either real-time explanations or strict proctored timer controls.
  - *Why*: Eliminates code duplication while providing both intense examination realism and low-stress study utility.
- **Decision 3: Zero-Pill & Tabular Typography Discipline**
  - *Chosen Approach*: Conforms to the Stitch design markdown and system frontend guidelines by replacing candy pills with unboxed typographic metadata, and enforcing `tabular-nums` on all countdowns and scores.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Technical Architecture                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                         QuizMasterApp                          │   │
│   │             (Active User Context + Global Router)              │   │
│   └───────────────┬────────────────────────────────┬───────────────┘   │
│                   │                                │                   │
│        [Auth State: null]             [Auth State: Authenticated]      │
│                   │                                │                   │
│         ┌─────────▼────────┐           ┌───────────▼────────────┐      │
│         │    AuthPortal    │           │    AppHeader & Nav     │      │
│         │ (Login/Register) │           └─────┬────────────┬─────┘      │
│         └──────────────────┘                 │            │            │
│                       ┌──────────────────────┘            └─────┐      │
│                       ▼                                         ▼      │
│       ┌────────────────────────────────┐       ┌──────────────────────┐│
│       │        Student Views           │       │     Admin Views      ││
│       ├────────────────────────────────┤       ├──────────────────────┤│
│       │ • StudentDashboard             │       │ • AdminQuizList      ││
│       │ • QuizDetailModal              │       │ • QuizEditorModal    ││
│       │ • QuizRunner (Exam / Practice) │       │ • QuestionBankEditor ││
│       │ • QuizResultsView              │       │ • SubmissionAuditLog ││
│       │ • LeaderboardView              │       │ • CategoryManager    ││
│       └────────────────────────────────┘       └──────────────────────┘│
│                       ▲                                         ▲      │
│                       └──────────────────────┬──────────────────┘      │
│                                              │                         │
│                                 ┌────────────▼───────────┐             │
│                                 │   Storage Service      │             │
│                                 │ (localStorage + Seed)  │             │
│                                 └────────────────────────┘             │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Data Models
- **`User`**: `id`, `name`, `email`, `role ('student' | 'admin')`, `avatar`, `joinedDate`
- **`Question`**: `id`, `text`, `options: string[]`, `correctAnswerIndex: number`, `explanation: string`, `points: number`
- **`Quiz`**: `id`, `title`, `description`, `category`, `difficulty ('Beginner' | 'Intermediate' | 'Advanced')`, `durationMinutes`, `passingScorePercentage`, `questions: Question[]`, `isPublished: boolean`, `createdAt`
- **`QuizAttempt`**: `id`, `quizId`, `userId`, `answers: Record<number, number>`, `markedQuestions: number[]`, `score: number`, `totalQuestions: number`, `percentage: number`, `passed: boolean`, `timeTakenSeconds: number`, `completedAt: string`, `mode ('exam' | 'practice')`
- **`LeaderboardEntry`**: `rank`, `userId`, `userName`, `avatar`, `quizzesTaken`, `avgScore`, `totalPoints`

### Verification Strategy
1. **Compilation Check**: Run `compile_applet` to guarantee type safety across all React modules and components.
2. **Interactive Handlers Audit**: Test login/registration with demo autofill, student dashboard filtering, starting both Exam and Practice modes, countdown timer ticking and auto-submit, manual submit with confirm modal, question review analysis, leaderboard tab switching, and admin CRUD (creating, editing, and deleting a quiz).
3. **Viewport & Responsive Layout**: Verify desktop (1440px), tablet (768px), and mobile (375px) layouts.
