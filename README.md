# 🏋️ FitLog - Workout Library & Planner

## **Modern Workout Discovery & Daily Planning App**

<p align="center">
  <strong>Discover workouts. Build your plan. Track your progress.</strong>
</p>

<p align="center">
  A modern fitness-focused web application built with <strong>Next.js, React, TypeScript & Tailwind CSS</strong>.
</p>

<p align="center">
  <a href="https://sofian-fit-log.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-CCFF00?style=for-the-badge&logoColor=0b0c0e" alt="Live Demo" />
  </a>
  <a href="https://github.com/marleyDip/Programming-Hero_Assignment-06_Fit-Log_NextJS-React-TypeScript-Tailwind-CSS_Milestone-06_Module-37">
    <img src="https://img.shields.io/badge/💻_GitHub-18181B?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
</p>

FitLog helps users discover workouts, search and explore workout details, save workouts for later, build a daily workout plan, track completed workouts, and keep their workout state persisted across page refreshes.

---

## 📖 About The Project

**FitLog** is a modern workout library and personal workout planning application designed to make discovering, organizing, and tracking workouts simple.

Users can explore a collection of workouts, search for specific exercises, view detailed workout information, save workouts for later, create a personalized daily workout plan, and track completed workouts.

The application combines a focused dark interface with a neon-green accent system, responsive layouts, reusable components, persistent local storage, and modern Next.js architecture.

The project was built with a strong focus on:

- Clean and reusable component architecture
- Type-safe development with TypeScript
- Modern Next.js App Router patterns
- Centralized workout state management
- Responsive design
- Persistent client-side data
- Smooth and meaningful user interactions
- Maintainable and scalable code

---

## 🎯 Project Goals

The main goals of FitLog are to provide users with a simple workflow:

***Discover → Explore → Save → Plan → Complete → Track***

### FitLog was built around eight core user experiences

| # | Goal | Description |
| --- | --- | --- |
| 01 | 🏋️ Discover | Explore available workouts |
| 02 | 🔎 Search | Quickly find specific workouts |
| 03 | 📖 Details | View complete workout information |
| 04 | ❤️ Save | Save workouts for later |
| 05 | ➕ Plan | Add workouts to today's plan |
| 06 | 📋 Manage | Organize and manage the workout plan |
| 07 | ✅ Complete | Track completed workouts |
| 08 | 💾 Persist | Keep their workout state after refreshing the page |

The application uses **React Context API** for centralized workout state management and **LocalStorage** for client-side persistence, allowing the user's workout state to survive browser refreshes without requiring authentication or a database.

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Key Features](#-key-features)
- [Technologies Used](#️-technologies-used)
- [Design System](#-design-system)
- [Application Pages](#️-application-pages)
- [Application Flow](#-application-flow)
- [State Management](#-state-management)
- [Local Storage](#-local-storage)
- [API Integration](#-api-integration)
- [Search & Sorting](#-search--sorting)
- [Workout Plan](#-workout-plan)
- [Workout Metrics](#-workout-metrics)
- [Responsive Design](#-responsive-design)
- [Component Architecture](#-component-architecture)
- [Next.js Architecture](#-nextjs-architecture)
- [Server & Client Responsibilities](#-server--client-responsibilities)
- [Project Structure](#-project-structure)
- [Performance & Code Quality](#-performance--code-quality)
- [User Experience](#-user-experience)
- [Empty & Loading States](#-empty--loading-states)
- [Important Implementation Details](#-important-implementation-details)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Git Workflow](#-git-workflow)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Production Checklist](#-production-checklist)
- [Author](#-author)
- [Contributing](#-contributing)
- [Acknowledgements](#-acknowledgements)

---
# 🚀 Live Demo

## 🌐 Live Project

<p align="center">

### 🚀 **[Open FitLog →](https://sofian-fit-log.vercel.app/)**

Explore workouts, build today's plan, save exercises, and track completion.

<br />

**[💻 View Source Code](https://github.com/marleyDip/Programming-Hero_Assignment-06_Fit-Log_NextJS-React-TypeScript-Tailwind-CSS_Milestone-06_Module-37)**

</p>

---

# **✨ Key Features**

## **1. 🏋️ Workout Library**

FitLog provides a dedicated workout library where users can explore available exercises.

Each workout can provide information such as:

- 🏷️ Workout name
- 📝 Description
- 💪 Muscle groups
- 🧰 Equipment
- 📊 Difficulty
- ⏱️ Duration
- 🔥 Estimated calories burned

The workout library provides a clean browsing experience across mobile, tablet, and desktop devices.

---

## **2. 🔎 Search & Sort**

Users can quickly find workouts without manually browsing the entire library.

The search system supports searching by:

- Workout name
- Muscle group

The workout collection can also be sorted using reusable sorting logic.

Available sorting options include:

- Workout duration
- Workout name

Search and sorting are applied to the currently selected workout collection.

---

## **3. 📋 Personalized Workout Plan**

Users can create their own daily workout plan by adding workouts from the library.

FitLog allows a maximum of **5 active workouts** at a time.

```text
┌─────────────────────────┐
│   MAXIMUM: 5 ACTIVE     │
│       WORKOUTS          │
└─────────────────────────┘
```

Completed workouts remain in the plan but no longer count toward the active workout limit.

For example:

```text
5 Active Workouts
        ↓
Complete 1 Workout
        ↓
4 Active + 1 Completed
        ↓
1 New Workout Slot Available
```

This keeps the daily plan focused while allowing users to maintain their workout history.

The plan dynamically calculates:

```text
🏋️ Total Exercises

⏱️ Total Duration

🔥 Estimated Calories
```

---

## **4. ❤️ Save Workouts**

Users can save workouts that they may want to use later.

Saved workouts are stored separately from the active workout plan.

This allows users to maintain:

```text
┌──────────────────────┐
│     TODAY'S PLAN     │
│   5 ACTIVE MAXIMUM   │
└──────────────────────┘

           +

┌──────────────────────┐
│    SAVED WORKOUTS    │
│      For Later       │
└──────────────────────┘
```

without mixing the two collections.

---

## **5. ✅ Workout Completion Tracking**

Users can mark workouts in their daily plan as completed.

Completed workouts receive a visually distinct state so users can easily identify their progress.

Completed workouts remain in the plan but are removed from the active workout count.

Users can also reopen a completed workout if they accidentally marked it as completed.

---

## **6. 🧠 Smart Workout Plan Capacity**

FitLog intelligently manages the active workout limit based on workout completion.

The plan does not simply limit the total number of stored workouts. Instead, it tracks **active workouts separately from completed workouts**.

```text
┌────────────────────────────────┐
│        ACTIVE WORKOUTS         │
│            MAX: 5              │
└────────────────────────────────┘
              │
              ▼
        Complete Workout
              │
              ▼
     Active Slot Becomes Free
              │
              ▼
       Add New Workout
```

If all 5 active slots are occupied, attempting to add another workout provides a clear **"Plan is full"** notification.

If a completed workout is reopened and the active limit has already been reached, FitLog prevents the plan from exceeding the 5-active-workout limit.

This provides predictable workout-plan behavior while preserving completed workout history.

---

## **7. 💾 Persistent User State**

FitLog uses browser `localStorage` to persist workout-related state.

The following information remains available after refreshing the browser:

- Added workouts
- Saved workouts
- Completed workouts

```text
📋 Plan
❤️ Saved
✅ Completed
```

Storage key:

```text
fitlog-store-v1
```

Refreshing the page does not reset the user's workout state.

This creates a realistic application experience without requiring a backend database for personal workout state.

---

## **8. 🔔 Interactive Feedback**

FitLog provides toast notifications after important user actions.

Examples include:

- ✓ Workout added
- ✓ Workout removed
- ✓ Workout saved
- ⚠️ Workout already saved
- ✓ Workout completed
- ✓ Workout reopened
- ⚠️ Plan is full

Different toast styles are used to distinguish successful actions, warnings, information, and errors.

---

## **9. 📱 Fully Responsive Interface**

FitLog is designed for:

- 📱 Mobile devices
- 📲 Tablets
- 💻 Laptops
- 🖥️ Desktop screens

Responsive behavior is applied to:

- Navigation
- Workout cards
- Search controls
- Sorting controls
- Workout details
- Plan layout
- Metrics
- Buttons
- Spacing
- Typography

---

# 🛠️ Technologies Used

## Frontend

| Technology | Purpose |
| --- | --- |
| **Next.js** | React framework and application architecture |
| **React** | Component-based UI development |
| **TypeScript** | Static typing and type safety |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | UI icons |
| **Sonner** | Toast notifications |

## State & Data

| Technology | Purpose |
| --- | --- |
| **React Context API** | Centralized workout state |
| **LocalStorage** | Client-side state persistence |
| **REST API** | Workout data source |

## Development & Deployment

| Tool | Purpose |
| --- | --- |
| **Git** | Version control |
| **GitHub** | Source code management |
| **ESLint** | Code quality and linting |
| **Vercel** | Deployment |

---

# 🎨 Design System

FitLog uses a dark, modern, fitness-focused visual language.

## 🎨 Color Palette

| Color | Value | Usage |
| --- | --- | --- |
| 🌑 Background | `#0b0c0e` | Main application background |
| 🤍 Text | `#f5f6f2` | Primary text |
| 🟢 Primary | `#ccff00` | Primary interactive accent |

The neon-lime primary color is used selectively for:

- Active navigation
- Primary buttons
- Completion states
- Important highlights
- Counters
- Interactive hover states

---

# 🔤 Typography

FitLog uses two fonts with clearly defined responsibilities.

## Inter

Inter is used throughout the main application content:

- Headings
- Paragraphs
- Body text
- Labels
- Buttons
- General UI

## Oswald

Oswald is used selectively for:

- Navigation
- Display elements
- Special headings
- Visual emphasis

This creates a clear hierarchy while keeping the majority of the interface readable.

---

# 🖥️ Application Pages

## 🏠 Home / Workout Library

The main page allows users to:

- Browse workouts
- Search workouts
- Explore workout information
- Open workout details
- Add workouts to their plan
- Save workouts

---

## 📄 Workout Details

Each workout has a dedicated details page.

The details view provides more information about the selected workout and allows users to interact directly with it.

Users can:

- Read workout information
- View workout details
- Save the workout
- Add it to today's plan
- Navigate back to the library

Dynamic route:

```text
/workout/[id]
```

Typical actions include:

```text
Add to Plan
Save Workout
```

The page also provides navigation back to the workout library.

---

## 📋 My Plan

The **My Plan** page is the primary workout management area.

It contains two main collections:

```text
┌─────────────────────────────┐
│           My Plan           │
├─────────────────────────────┤
│      Plan       Saved       │
├─────────────────────────────┤
│     Search      Sort        │
├─────────────────────────────┤
│                             │
│       Workout Cards         │
│                             │
└─────────────────────────────┘
```

### Plan Tab

Displays workouts currently included in the user's daily workout plan.

### Saved Tab

Displays workouts saved for later.

Both collections support:

- 🔎 Search
- ↕ Sorting
- 🗑️ Removing workouts
- 📱 Responsive interaction

The Saved tab can also be opened directly using:

```text
/my-plan?tab=saved
```

---

# 🔄 Application Flow / Architecture

The overall application workflow can be represented as:

```text
                    ┌──────────────────┐
                    │    Workout API   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Workout Library  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        View Details     Save Workout    Add to Plan
              │              │              │
              │              │              ▼
              │              │       ┌──────────────┐
              │              │       │    My Plan   │
              │              │       └──────┬───────┘
              │              │              │
              │              │       ┌──────┴──────┐
              │              │       ▼             ▼
              │              │   Complete       Remove
              │              │       │             │
              └──────────────┴───────┼─────────────┘
                                     ▼
                               LocalStorage
```

---

# 🧠 State Management

FitLog uses the **React Context API** to centralize workout state and business logic.

The application maintains three primary pieces of state:

```ts
{
  plan: [],
  saved: [],
  done: []
}
```

## State Responsibilities

| State | Responsibility |
| --- | --- |
| `plan` | Workouts in today's plan |
| `saved` | Workouts saved for later |
| `done` | IDs of completed workouts |


## Plan

Stores workouts currently added to the user's daily workout plan.

## Saved

Stores workouts saved for later.

## Done

Stores the IDs of workouts marked as completed.

---

## Context Actions

The FitLog context exposes reusable actions such as:

```ts
addToPlan()
removeFromPlan()

savedWorkout()
removeSaved()

toggleDone()

isInPlan()
isSaved()
```

Centralizing these actions prevents different components from implementing duplicate workout-state logic.

---

# 💾 Local Storage

FitLog persists workout state using browser `localStorage`.

```text
React Context
      │
      ▼
Workout State
      │
      ▼
LocalStorage
      │
      ▼
Browser Refresh
      │
      ▼
Restore State
```

## Storage Key

```text
fitlog-store-v1
```

## Stored State

The persisted state follows this general structure:

```ts
{
  plan: Workout[],
  saved: Workout[],
  done: number[]
}
```

This allows FitLog to restore the user's workout state after refreshing the page.

### Persisted Data

```text
Workout Plan
Saved Workouts
Completed Workouts
```

The application also handles invalid or unavailable stored data safely rather than assuming that previously stored data is always valid.

---

# 🌐 API Integration

FitLog retrieves workout information from the provided REST API.

## Base Endpoint

```text
https://api.abcz.workers.dev/api/fitlog
```

## Workout Details Endpoint

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

The API provides workout information used throughout the application.

The application consumes data such as:

- Workout information
- Muscle groups
- Duration
- Calories
- Equipment
- Difficulty
- Workout details

---

# 🔎 Search & Sorting

Search and sorting logic is kept reusable instead of being duplicated inside individual page components.

The workout processing flow is:

```text
Original Workouts
       │
       ▼
Search Filter
       │
       ▼
Sorting
       │
       ▼
Filtered & Sorted Workouts
       │
       ▼
Render Cards
```

This logic can be reused across:

```text
Workout Library
Today's Plan
Saved Workouts
```

Search can match:

```text
Workout Name
Muscle Group
```

The same reusable behavior can be applied to:

```text
Plan
Saved
```

collections.

---

# 📋 Workout Plan

The daily workout plan has a maximum capacity of:

```text
5 workouts
```

The application handles three primary button states.

### Workout Already Exists

```text
Already in plan
```

### Plan Is Full

```text
Plan is full
```

### Workout Can Be Added

```text
Add to today's plan
```

This makes the current plan state clear to the user.

---

# 📊 Workout Metrics

The My Plan page dynamically calculates useful workout metrics.

## Exercises

The number of workouts currently included in the plan.

## Minutes

The total duration of all workouts in the plan.

Conceptually:

```ts
plan.reduce(
  (total, workout) => total + workout.duration,
  0
);
```

## Calories

The estimated calories burned across the current plan.

Conceptually:

```ts
plan.reduce(
  (total, workout) => total + workout.caloriesBurned,
  0
);
```

These metrics automatically update whenever workouts are added or removed.

---

# 📱 Responsive Design

FitLog follows a mobile-first responsive approach.

## 📱 Mobile

The interface prioritizes:

- Compact navigation
- Stacked workout content
- Touch-friendly buttons
- Responsive cards
- Simplified controls

## 📲 Tablet

The layout expands to provide:

- More horizontal space
- Multi-column content
- Comfortable spacing

## 🖥️ Desktop

The desktop layout provides:

- Wider content containers
- Multi-column workout cards
- Expanded navigation
- More breathing room
- Larger visual hierarchy

---

# 🧱 Component Architecture

FitLog follows a reusable component architecture.

Instead of placing every UI element inside page components, repeated functionality is separated into dedicated components.

Examples include:

```text
Navbar
MobileMenu
WorkoutCard
PlanCard
SearchInput
SortDropdown
WorkoutDetails
EmptyState
Metric
Brand
```

This approach makes the project easier to:

- ♻️ Reusability
- 🧹 Maintainability
- 🐛 Debugging
- 📈 Scalability / Extend
- 📖 Code readability / Understand

---

# 🧭 Next.js Architecture

FitLog uses the **Next.js App Router**.

The application separates server responsibilities from interactive client responsibilities.

For example, the My Plan route follows this structure:

```text
app/my-plan/
│
├── page.tsx
│
└── MyPlanClient.tsx
```

The server page reads the URL search parameter:

```text
/my-plan?tab=saved
```

and passes the initial tab value to the Client Component.

The flow is:

```text
URL
 │
 ▼
page.tsx
 │
 │ searchParams
 ▼
MyPlanClient.tsx
 │
 ▼
Client State
 │
 ▼
Interactive UI
```

This keeps URL parameter handling on the server side while allowing the interactive workout management interface to remain client-side.

---

# 🧩 Server & Client Responsibilities

## Server Component

The server-side page is responsible for:

- Reading search parameters
- Preparing initial page data
- Rendering the client entry point

## Client Component

The client-side component handles:

- React state
- Context access
- Search
- Sorting
- Tabs
- Interactive buttons
- Workout completion
- Toast notifications

This separation keeps the application architecture easier to reason about.

---

# 📂 Project Structure

The project follows a feature-oriented component structure.

```text
fitlog/
│
├── app/
│   ├── my-plan/
│   │   ├── page.tsx
│   │   └── MyPlanClient.tsx
│   │
│   ├── workout/
│   │   └── [workoutId]/
|   |       ├── loading.tsx
│   │       └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
|   ├── not-found.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   ├── InteractiveBanner.tsx
│   │
│   ├── my-plan/
│   │   └── PlanCard.tsx
│   │
│   ├── workout/
│   │   ├── LibrarySection.tsx
│   │   ├── WorkoutActions.tsx
│   │   ├── WorkoutCard.tsx
│   │   ├── WorkoutCardSkeleton.tsx
│   │   ├── WorkoutLibrary.tsx
│   │   ├── WorkoutLibraryError.tsx
│   │   └── WorkoutLibraryLoading.tsx
│   │
│   └── shared/
│       ├── Brand.tsx
│       ├── SearchInput.tsx
│       ├── SortDropdown.tsx
│       └── icons.ts
│
├── context/
│   └── fitlog-context.tsx
|
├── hooks/
│   └── useActiveNav.ts
│
├── lib/
│   ├── api.ts
│   ├── types.ts
│   └── workout-utils.ts
│
├── public/
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

---

# ⚡ Performance & Code Quality

FitLog uses several techniques to keep the application maintainable and efficient.

## `useMemo`

`useMemo` is used for derived values such as:

- Filtered workouts
- Sorted workouts
- Calculated metrics

Example:

```tsx
const filteredWorkouts = useMemo(
  () => filterAndSortWorkouts(list, search, sort),
  [list, search, sort]
);
```

This avoids recalculating derived values when their dependencies have not changed.

---

## `useCallback`

Context actions are memoized with `useCallback` to maintain stable function references.

Examples include:

```text
addToPlan
removeFromPlan
savedWorkout
removeSaved
toggleDone
```

---

## Memoized Context Value

The Context API value is memoized using `useMemo`.

This helps avoid unnecessarily creating a new context value when its dependencies have not changed.

---

## TypeScript

TypeScript is used throughout the project to provide:

- Type-safe workout data
- Typed component props
- Typed context values
- Typed state
- Safer function parameters
- Better development-time feedback

---

## Reusable Utilities

Search and sorting logic is extracted into reusable utilities rather than being duplicated across components.

This keeps page components focused primarily on UI composition.

---

# 🔄 Empty & Loading States

FitLog handles different UI states instead of showing the same message for every situation.

## Empty Plan

```text
Your plan is empty.

Add workouts to start building today's plan.
```

## Empty Saved List

```text
No saved workouts yet.

Save workouts to find them here later.
```

## No Search Results

```text
No workouts found.

Try a different search term.
```

Providing state-specific feedback makes the interface easier to understand.

---

# 🔔 User Experience

FitLog includes small interaction details to create a polished experience.

## Toast Notifications

Users receive feedback after actions such as:

```text
Workout added
Workout removed
Workout saved
Workout completed
Workout reopened
```

## Hover Interactions

Interactive elements use subtle:

- Transitions
- Scale effects
- Glow effects
- Border changes
- Background changes

## Completion State

Completed workouts receive a visually distinct state.

## Plan Capacity

The interface clearly communicates when the five-workout plan limit has been reached.

---

# 📌 Important Implementation Details

## Maximum Plan Capacity

The daily plan allows a maximum of five workouts.

Conceptually:

```ts
if (prev.plan.length >= 5) {
  return prev;
}
```

---

## Duplicate Prevention

Before adding a workout, the application checks whether the workout already exists in the plan.

```ts
prev.plan.some(
  (item) => item.id === workout.id
);
```

This prevents duplicate workouts from being added.

---

## Saved Workout Prevention

The same workout cannot be saved multiple times.

```ts
prev.saved.some(
  (item) => item.id === workout.id
);
```

---

## Completion Cleanup

When a workout is removed from the plan, its completed state is also removed.

This keeps the application state consistent.

---

## URL-Based My Plan Tabs

The My Plan page supports opening the Saved tab directly through:

```text
/my-plan?tab=saved
```

The server page reads the search parameter and passes the initial tab to the client component.

---

# 🚦 Application State Rules

FitLog follows several simple state rules to keep the application predictable.

| Action | Result |
| --- | --- |
| Add workout | Workout is added to Plan |
| Add duplicate | Existing Plan state remains unchanged |
| Add when Plan is full | Workout is not added |
| Save workout | Workout is added to Saved |
| Save duplicate | Existing Saved state remains unchanged |
| Remove from Plan | Workout is removed from Plan |
| Remove saved workout | Workout is removed from Saved |
| Complete workout | Workout ID is added to Done |
| Reopen workout | Workout ID is removed from Done |
| Remove completed workout | Workout is removed from Done as well |
| Refresh page | State is restored from LocalStorage |

---

# 🚀 Getting Started

Follow these steps to run FitLog locally.

## 1. Clone the Repository

```bash
git clone https://github.com/marleyDip/Programming-Hero_Assignment-06_Fit-Log_NextJS-React-TypeScript-Tailwind-CSS_Milestone-06_Module-37.git
```

---

## 2. Navigate to the Project

```bash
cd Programming-Hero_Assignment-06_Fit-Log_NextJS-React-TypeScript-Tailwind-CSS_Milestone-06_Module-37
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start the Development Server

```bash
npm run dev
```

---

## 5. Open the Application

Visit:

```text
http://localhost:3000
```

---

# 📦 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Development

```bash
npm run dev
```

Starts the Next.js development server.

---

## Production Build

```bash
npm run build
```

Creates an optimized production build.

---

## Production Server

```bash
npm run start
```

Starts the application in production mode.

---

## Lint

```bash
npm run lint
```

Checks the codebase for ESLint issues.

---

# 🔐 Environment Variables

FitLog currently uses a public API endpoint and does not require private environment variables for its core functionality.

If you want to make the API URL configurable, create:

```text
.env.local
```

Then add:

```env
NEXT_PUBLIC_API_URL=https://api.abcz.workers.dev/api/fitlog
```

The application can then access the API URL with:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

> ⚠️ Never commit private API keys, credentials, or secrets to GitHub.
---

# 🔀 Git Workflow

The project was developed using Git for version control.

The workflow focuses on small, meaningful commits such as:

```text
feat: add workout state management context

feat: enhance My Plan workout management

fix: handle my plan search params safely
```

This keeps the project history understandable and makes individual changes easier to track.

---

# 🔮 Future Improvements

The current version focuses on the core workout discovery and planning experience.

Potential future improvements include:

- 🔐 User authentication
- ☁️ Cloud-based profiles
- 🗄️ Database-backed workout plans
- 📚 Workout history
- 📅 Weekly progress tracking
- 🔥 Workout streaks
- 🎯 Personal fitness goals
- 🔎 Advanced workout filtering
- 🏷️ Workout categories
- ✏️ Custom workout creation
- ↕️ Drag-and-drop ordering
- 📊 Progress charts
- 📈 Personal statistics dashboard
- 🤖 Workout recommendations
- 📡 Offline/PWA support
- 🎨 Theme customization

---

# 📈 Learning Outcomes

Building FitLog strengthened practical knowledge of modern frontend development.

## Next.js

- App Router
- Layouts
- Dynamic routes
- Server Components
- Client Components
- Search parameters
- Production builds

## React

- Components
- Props
- State
- Context API
- Hooks
- `useMemo`
- `useCallback`
- Conditional rendering
- Event handling

## TypeScript

- Interfaces
- Type aliases
- Typed props
- Typed state
- Typed functions
- API data types

## Tailwind CSS

- Responsive utilities
- Custom theme values
- Layout systems
- Flexbox
- CSS Grid
- Transitions
- Responsive design

## Application Development

- REST API integration
- LocalStorage persistence
- Search and sorting
- State synchronization
- UI feedback
- Component architecture
- Git workflow

---

# 🧪 Production Checklist

Before deployment, verify the following:

- [x] Responsive layout
- [x] Workout library
- [x] Workout details
- [x] Search
- [x] Sorting
- [x] Add to plan
- [x] Remove from plan
- [x] Save workout
- [x] Remove saved workout
- [x] Mark workout completed
- [x] Reopen completed workout
- [x] LocalStorage persistence
- [x] Toast feedback
- [x] Empty states
- [x] My Plan tabs
- [x] URL-based Saved tab
- [x] Production build
- [x] ESLint checks

---

# 👨‍💻 Author

<div align="center">

  <h2>✨ Md. Sofian Hasan ✨</h2>

  <p>
    <strong>Software Engineer | Full-Stack (MERN / PERN) Developer</strong>
  </p>

  <p align="center">

[![🌐 Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Website-0A0A0A?style=for-the-badge)](https://marleydip.netlify.app/)
&nbsp;
[![💻 GitHub](https://img.shields.io/badge/💻_GitHub-View_Profile-181717?style=for-the-badge&logo=github)](https://github.com/marleyDip)

</p>

</div>

<p align="center">
  Passionate about building <strong>modern, scalable, and user-focused web applications</strong> while continuously strengthening <b><i>JavaScript, TypeScript, problem-solving, and full-stack development skills</i></b>.
</p>

### 🚀 Tech Focus

<div align="center">

<img src="https://skillicons.dev/icons?i=js,ts,react,nextjs,tailwind,nodejs,express,nestjs,mongodb,postgres" alt="Tech Stack" />

<br /><br />

<img src="https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge" alt="MERN Stack" />
<img src="https://img.shields.io/badge/PERN-Stack-336791?style=for-the-badge" alt="PERN Stack" />

</div>

---

# 🤝 Contributing

FitLog was created as a learning and portfolio project.

If you would like to experiment with the project:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push your branch
6. Open a pull request

Example:

```bash
git checkout -b feature/new-feature

git add .

git commit -m "feat: add new feature"

git push origin feature/new-feature
```

---

# 🙏 Acknowledgements

Special thanks to the technologies and learning resources that helped make this project possible.

- **Programming Hero** — Learning resources and project guidance
- **Next.js** — Application framework
- **React** — UI library
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling system
- **Lucide React** — Icon library
- **Sonner** — Toast notification system

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Your support helps motivate continued learning, experimentation, and improvement.

<p align="center">
  <a href="https://github.com/marleyDip/Programming-Hero_Assignment-06_Fit-Log_NextJS-React-TypeScript-Tailwind-CSS_Milestone-06_Module-37">
    ⭐ Star this repository
  </a>
</p>

---

<p align="center">
  <strong>Built with ❤️ using Next.js, React, TypeScript, Tailwind CSS, & Sonner</strong>
</p>

<p align="center">
  © 2026 Md Sofian Hasan
</p>
