---
name: QuizMaster
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9fa'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3ff'
  surface-container: '#ebedff'
  surface-container-high: '#e3e7ff'
  surface-container-highest: '#dbe1ff'
  on-surface: '#131a33'
  on-surface-variant: '#464554'
  inverse-surface: '#282f49'
  inverse-on-surface: '#eff0ff'
  outline: '#777586'
  outline-variant: '#c7c4d7'
  surface-tint: '#5148d7'
  primary: '#2a14b4'
  on-primary: '#ffffff'
  primary-container: '#4338ca'
  on-primary-container: '#c1beff'
  inverse-primary: '#c3c0ff'
  secondary: '#545d7c'
  on-secondary: '#ffffff'
  secondary-container: '#d0d9fd'
  on-secondary-container: '#555e7d'
  tertiary: '#1f1ab3'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b3bc9'
  on-tertiary-container: '#bebfff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#100069'
  on-primary-fixed-variant: '#372abf'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#bdc5e9'
  on-secondary-fixed: '#111a36'
  on-secondary-fixed-variant: '#3d4664'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#faf8ff'
  on-background: '#131a33'
  surface-variant: '#dbe1ff'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  metric-val:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an analytical, high-density, and frictionless assessment experience designed for educators, enterprise talent teams, and certification authorities. Embodying a clean and sophisticated SaaS aesthetic, it merges the crisp typographical structure of documentation tools with the tactile precision of modern productivity software.

The visual style pairs structured data density with generous typographical breathing room. Interfaces communicate rigor and credibility without clinical coldness:
- **Atmosphere:** Focused, academic yet contemporary, premium, and distraction-free.
- **Visual Mechanics:** Layered neutral white cards resting on ultra-subtle slate tints, bounded by razor-thin borders, sharp metric badges, and targeted energetic indigo-violet accents.
- **Emotional Target:** Confidence, cognitive clarity, seamless velocity during authoring, and calm focus during test execution.

## Colors

The palette balances deep navy ink tones with targeted indigo primaries and soft violet atmospheric accents across clean neutral planes.

### Palette Architecture
- **Primary Indigo (`#4338CA` / Hover `#4F46E5`):** Reserved for primary interactive intents, active states, progress indicators, and high-priority CTAs.
- **Secondary Deep Slate (`#1C2541`):** Applied to structural sidebar chrome, dark utility controls, and high-impact navigational elements.
- **Tertiary Soft Violet (`#6366F1` / Tint `#818CF8`):** Serves as contextual feedback, active micro-tags, timer badges, and focus rings.
- **Neutral Canvas & Surface Hierarchy:**
  - Base Background: `#F8FAFC` (Clean slate tint)
  - Surface Card Background: `#FFFFFF` (Pure crisp white)
  - Muted Surface / Recessed Input: `#F1F5F9`
  - Subtle Borders & Separators: `#E2E8F0`
- **Text & Content Hierarchy:**
  - Deep Navy Body/Headers: `#0B132B`
  - Secondary Slate Body: `#475569`
  - Subtle / Placeholder Slate: `#94A3B8`
- **Functional Semantics:**
  - Success / Correct Answer: `#059669` (Emerald 600) with `#ECFDF5` background.
  - Error / Incorrect: `#DC2626` (Rose 600) with `#FEF2F2` background.
  - Warning / Incomplete: `#D97706` (Amber 600) with `#FFFBEB` background.

## Typography

Inter powers the entire type scale across all screen formats, providing high micro-legibility, tabular figure support for timing and scoring, and mechanical precision.

- **Weight Discipline:** Restrict weight variations to `400` (Regular) for flowing text, `500` (Medium) for metadata, `600` (Semi-bold) for interface anchors and section titling, and `700` (Bold) strictly for primary headers and quantitative scores.
- **Tabular Numerals:** All timers, question index badges (e.g., `Question 14/50`), and score percentages must enforce OpenType `tnum` (tabular numbers) to eliminate visual layout shifts.
- **Tracking:** Micro-labels and tags employ slightly expanded tracking (`0.02em` to `0.04em`) with uppercase or semi-bold styling for rapid scanning in dense layouts.

## Layout & Spacing

The system leverages a responsive fluid layout framework constrained by maximum container bounds to prevent optical fatigue during intense test authoring and examination flows.

### Layout Mechanics
- **Desktop (1024px+):** Fixed structural sidebars (240px or 64px collapsed icon rail) with an adaptive central workspace constrained to a maximum content width of 1280px for management consoles, and 840px centered for the dedicated quiz taking experience. 12-column grid with `1.5rem` gutters.
- **Tablet (768px – 1023px):** Sidebars collapse to slide-over drawers; 8-column layout using `1.25rem` gutters and `1.5rem` outer canvas padding.
- **Mobile (< 768px):** Single-column vertical stream with `1rem` safe margins. Bottom-docked sticky action bar for next/previous navigation and answer submission.

### Spacing Discipline
All component layouts adhere to an 8-point base increment, utilizing `0.25rem` (4px) only for tight element bindings (such as between an icon and its text label or badge inner padding).

## Elevation & Depth

Visual hierarchy relies on crisp edge definition through hairline borders complemented by diffuse, low-opacity micro-shadows. Surfaces never look floating or disconnected; they remain grounded and tactile.

- **Surface Layering:**
  - Base Plane: `#F8FAFC`
  - Raised Surface: Pure `#FFFFFF` encapsulated by a 1px solid border of `#E2E8F0`.
- **Shadow Scale:**
  - **Flat / Recessed:** 0px shadow. Used for form inputs and unselected question options with `border: 1px solid #E2E8F0`.
  - **Resting Card:** `0 1px 2px 0 rgba(11, 19, 43, 0.04), 0 1px 3px 0 rgba(11, 19, 43, 0.02)`.
  - **Interactive Hover / Option Select:** `0 4px 6px -1px rgba(67, 56, 202, 0.06), 0 2px 4px -2px rgba(67, 56, 202, 0.04)`.
  - **Overlay / Modal / Flyout:** `0 10px 15px -3px rgba(11, 19, 43, 0.08), 0 4px 6px -4px rgba(11, 19, 43, 0.04)`.
- **Focus States:** 2px ring offset by 2px white space, colored in Tertiary Indigo (`#6366F1`) with opacity 0.5.

## Shapes

The geometric framework employs a structured `Soft` radius architecture (`roundedness: 1`), conveying modern precision, discipline, and efficient screen economy.

- **Component Corners:**
  - Inputs, Buttons, Option Badges, and Metrics Tags: `0.25rem` (4px).
  - Cards, Containers, and Data Panels: `0.5rem` (8px, `rounded-lg`).
  - Modals and Overlay Sheets: `0.75rem` (12px, `rounded-xl`).
  - Indicator Dots and Status Avatars: Full circular radius (`9999px`).
- **Borders:** Consistent `1px` structural stroke width on all containers, dividers, and default input states. Never use heavy outlines.

## Components

### Buttons
- **Primary:** Background `#4338CA`, text `#FFFFFF`, font-weight 600, radius `0.25rem`. Hover: `#4F46E5`. Active: `#3730A3`. Inset micro-shadow: `inset 0 1px 0 rgba(255, 255, 255, 0.15)`.
- **Secondary:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#1C2541`. Hover: background `#F8FAFC`, border `#CBD5E1`.
- **Ghost / Utility:** Transparent background, text `#475569`. Hover: background `#F1F5F9`, text `#0B132B`.

### Quiz Option Cards (Multiple Choice)
- **Default:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#0B132B`, flex row layout, left-aligned alphanumeric indicator (`A`, `B`, `C`, `D`) set inside a `24x24px` recessed container (`#F1F5F9`).
- **Hover:** Border `#C7D2FE`, background `#F8FAFC`.
- **Selected:** Border `1.5px solid #4338CA`, background `#EEF2FF`, indicator changes to primary fill `#4338CA` with `#FFFFFF` text.
- **Correct State:** Border `1.5px solid #059669`, background `#ECFDF5`.
- **Incorrect State:** Border `1.5px solid #DC2626`, background `#FEF2F2`.

### Metrics & Status Chips
- Height `22px` to `24px`, radius `0.25rem`, padding `0 0.5rem`, typography `label-sm`.
- **Neutral Tag:** `#F1F5F9` background, `#475569` text, `#E2E8F0` border.
- **Accent Tag (e.g., "75% Pass Rate"):** `#EEF2FF` background, `#4338CA` text, `#C7D2FE` border.
- **Timer Badge:** Monospaced numerical display, `#FEF3C7` background, `#B45309` text, with an inline animated pulse icon.

### Form Inputs
- Background `#FFFFFF`, border `1px solid #E2E8F0`, height `38px`, padding `0 0.75rem`, text `body-md` (`#0B132B`).
- Focus state: Border `#6366F1`, box-shadow `0 0 0 3px rgba(99, 102, 241, 0.15)`.
- Inner placeholder color: `#94A3B8`.

### Checkboxes & Radios
- Size `16x16px`, radius `4px` for checkboxes and `9999px` for radios.
- Unchecked: `1px solid #CBD5E1` border, white fill.
- Checked: `#4338CA` solid fill with centered white check or dot icon.

### Cards & Question Panes
- Surface white `#FFFFFF`, border `1px solid #E2E8F0`, corner radius `0.5rem` (`rounded-lg`), elevation resting micro-shadow.
- Card Header: Separated by a bottom border `1px solid #F1F5F9`, padded with `1rem 1.25rem`. Contains step sequence, question category tag, and available point values.