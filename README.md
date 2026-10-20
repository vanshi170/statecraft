# StateCraft — React State Management & Styling Playground

An interactive learning dashboard for mastering React Context API, Prop Drilling tradeoffs, State Management Patterns, and the 3 core styling methodologies (CSS Modules, Tailwind CSS, and styled-components).

Built as a college-level Hack-o-week showcase project for **Week 13–14 React Curriculum**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on v24.15.0)
- **npm**: v9.0.0 or higher

### 2. Installation
Clone or navigate to the project directory:
```bash
cd "c:\Users\VICTUS\Desktop\Desktop Data\HW\statecraft"
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🛠️ Technology Stack

| Technology | Role in Project | Configuration / Details |
| :--- | :--- | :--- |
| **React 19** | Component Architecture & Hooks | `useState`, `useContext`, `createContext`, Functional Updates |
| **Vite 8** | High-performance Bundler & Dev Server | Ultra-fast HMR and native CSS modules bundling |
| **CSS Modules** | Component-Scoped Styling | Native `.module.css` with compiler-hashed class names |
| **Tailwind CSS 3** | Utility-First Styling | Configured with `tailwind.config.js` & `postcss.config.js` |
| **styled-components 6** | CSS-in-JS Component Primitives | Tagged template literals with dynamic transient props (`$variant`, `$accentColor`) |
| **Lucide React** | Clean UI Iconography | Responsive, accessible icons throughout the dashboard |
| **Prism.js** | Syntax Highlighting | Fenced code snippets with 1-click clipboard copying |
| **LocalStorage** | Persistent Browser Storage | Saves counter, user name, accent theme, and learning progress |

---

## 📚 Curriculum Concepts: Where to Find Everything

### 1. React Context API (`src/pages/ContextAPI.jsx`)
- **What it does**: Centralized broadcast channel avoiding intermediate prop tunnels.
- **Key Files**:
  - Provider & Hook: `src/context/AppContext.jsx`, `src/context/useApp.js`
  - Consumer Cards: `ProfileConsumerCard`, `AnalyticsConsumerCard`, `AuditConsumerCard` in `src/pages/ContextAPI.jsx`
- **Interactive Controls**: Shared counter (`+1`, `-1`, `+5`, reset), live name change input, and theme selector.
- **Hierarchy Diagram**: Visual tree showing how `<AppContext.Provider>` wraps components and teleports state directly to subscribers.

### 2. Prop Drilling vs Context API (`src/pages/PropDrilling.jsx`)
- **What it does**: Direct side-by-side comparison across an identical 5-level component tree:
  `App` ➔ `Dashboard` ➔ `ProfilePanel` ➔ `UserCard` ➔ `UserName`
- **Key Files**:
  - Prop Drilling Demo: `src/components/state/PropDrillingDemo.jsx`
  - Context API Demo: `src/components/state/ContextDrillingDemo.jsx`
- **Educational Distinction**: Highlights why prop drilling is NOT always bad (props are clean and explicit for 1–2 levels; Context is appropriate for 3+ levels or cross-cutting data).
- **Matrix**: Detailed comparison table analyzing data flow, maintenance, and refactoring cost.

### 3. State Management Patterns (`src/pages/StateManagement.jsx`)
- **Local State (`useState`)**: Full-featured task manager (`src/components/state/TaskManager.jsx`) with task addition, toggle completion, deletion, priority badges, and filtering (`all`, `active`, `completed`).
- **Derived State**: Calculates `totalTasks`, `completedTasks`, `activeTasks`, and `completionPercentage` dynamically during render without redundant `useState` calls.
- **Immutable Updates Sandbox (`src/components/state/StatePatternSandbox.jsx`)**:
  - Functional updaters: `setCount(prev => prev + 1)` vs stale closures.
  - Immutable objects: Shallow object copying with spread `{ ...prev, role }` and nested updates.
  - Immutable arrays: `[...prev, newItem]`, `.filter()` for removal, `.map()` for updates.

### 4. 3-Way Styling Playground (`src/pages/StylingPlayground.jsx`)
Features the **exact same** reusable showcase card implemented in 3 distinct styling methodologies:
1. **CSS Modules** (`src/components/styling/CssModulesCard.jsx` & `CssModulesCard.module.css`):
   Scoped class names, hashed CSS identifiers, zero global collisions.
2. **Tailwind CSS** (`src/components/styling/TailwindCard.jsx`):
   Utility classes applied directly in JSX, responsive breakpoints, hover/focus rings.
3. **styled-components** (`src/components/styling/StyledComponentsCard.jsx`):
   CSS-in-JS, styled primitives, tagged template literals, dynamic prop interpolation (`$variant`, `$accentColor`).
- **Customizer Toolbar**: Dynamically toggles Card Variant (`Default`, `★ Featured`, `Compact`) and Accent Color (`Indigo`, `Emerald`, `Rose`, `Amber`) across all three cards simultaneously.
- **Side-by-Side Mode**: Inspect all 3 rendered components and their source code simultaneously.

### 5. Viva Examination Guide (`src/pages/VivaPrep.jsx`)
- 12 comprehensive, examiner-aligned questions with concise, memorizable answers.
- Search filter and topic badges covering Context API, Prop Drilling, State Immutability, Derived State, and CSS paradigms.
- Top Examiner Tips for viva scoring.

---

## 📂 Project Architecture

```
statecraft/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CodeExample.jsx        # Prism syntax highlighted code block with copy button
│   │   │   └── ConceptCard.jsx        # Dashboard module card with completion badge
│   │   ├── layout/
│   │   │   ├── Header.jsx             # Top bar with live context controls & theme switcher
│   │   │   ├── Sidebar.jsx            # Persistent desktop sidebar & mobile drawer
│   │   │   └── Layout.jsx             # Main shell wrapper
│   │   ├── state/
│   │   │   ├── ContextDrillingDemo.jsx# 5-level Context teleportation demonstration
│   │   │   ├── PropDrillingDemo.jsx   # 5-level Prop drilling demonstration
│   │   │   ├── StatePatternSandbox.jsx# Interactive immutable update sandbox
│   │   │   └── TaskManager.jsx        # Local state & derived state todo manager
│   │   └── styling/
│   │       ├── CssModulesCard.jsx     # Card styled with CSS Modules
│   │       ├── CssModulesCard.module.css # Scoped CSS Module stylesheet
│   │       ├── TailwindCard.jsx       # Card styled with Tailwind utility classes
│   │       └── StyledComponentsCard.jsx # Card styled with styled-components
│   ├── context/
│   │   ├── AppContext.jsx             # Root AppProvider component
│   │   ├── AppContextInstance.js      # createContext instance definition
│   │   └── useApp.js                  # useApp custom hook
│   ├── pages/
│   │   ├── ContextAPI.jsx             # Context deep dive & independent consumers
│   │   ├── Overview.jsx               # Learning dashboard & curriculum checklist
│   │   ├── PropDrilling.jsx           # Prop drilling vs Context comparison
│   │   ├── StateManagement.jsx        # Local, shared, derived, and immutable state
│   │   ├── StylingPlayground.jsx      # 3 styling approaches comparison
│   │   └── VivaPrep.jsx               # 12 viva questions & answers
│   ├── styles/
│   │   └── index.css                  # Tailwind directives & Prism styling
│   ├── App.jsx                        # Root router and layout integration
│   └── main.jsx                       # Application entry point
├── index.html                         # HTML template with Inter & JetBrains Mono
├── package.json                       # Dependencies & scripts
├── postcss.config.js                  # PostCSS plugins (Tailwind, Autoprefixer)
├── tailwind.config.js                 # Tailwind design tokens & content paths
└── vite.config.js                     # Vite build configuration
```

---

## 💯 viva Quick Review Points
1. **Context API**: `createContext()` initializes the container; `<Provider value={...}>` wraps descendants; `useContext()` reads the value.
2. **Prop Drilling**: Passing data through components that don't need it. Good for 1–2 levels; cumbersome for 3+ levels.
3. **Immutability**: React checks `Object.is(oldState, newState)`. Mutating objects directly leaves memory addresses unchanged, causing React to miss UI updates.
4. **Derived State**: Compute totals, filters, and flags on the fly during render. Avoid storing derived data in `useState` to prevent synchronization bugs.
5. **CSS Approaches**:
   - **CSS Modules**: Traditional CSS syntax with compiler-hashed class names to avoid global collisions.
   - **Tailwind CSS**: Atomic utility classes in JSX with dead-code purging for rapid prototyping.
   - **styled-components**: CSS-in-JS where React props directly drive styles via tagged template literals.
