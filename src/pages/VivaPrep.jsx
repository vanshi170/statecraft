import React, { useState } from 'react';
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles
} from 'lucide-react';

const VIVA_QUESTIONS = [
  {
    id: 1,
    topic: 'Context API',
    question: 'What is the React Context API and what fundamental problem does it solve?',
    shortAnswer:
      'Context API is a built-in React feature that allows state to be shared globally across a component tree without having to manually pass props through every intermediate level (solving the "prop drilling" problem).',
    keyTakeaway: 'Think of Context as a teleportation pipe for data directly from parent to child.',
  },
  {
    id: 2,
    topic: 'Context API',
    question: 'What is the difference between createContext() and useContext()?',
    shortAnswer:
      'createContext() creates the Context container object containing Provider and Consumer components. useContext() is a React Hook called inside a functional component to read and subscribe to that Context value.',
    keyTakeaway: 'createContext creates the pipe; useContext opens the faucet to receive data.',
  },
  {
    id: 3,
    topic: 'Context API',
    question: 'What is the role of a Context Provider and what happens when its value changes?',
    shortAnswer:
      'A Context Provider (<MyContext.Provider value={data}>) wraps child components and supplies the shared value. Whenever the Provider value prop changes, all child components subscribed via useContext() automatically re-render with the latest value.',
    keyTakeaway: 'Providers hold the data; updates trigger immediate subscriber re-renders.',
  },
  {
    id: 4,
    topic: 'Prop Drilling',
    question: 'What is "prop drilling" and is it always considered an anti-pattern?',
    shortAnswer:
      'Prop drilling is passing props through intermediate components that do not need the data themselves, merely to deliver it to a deeply nested child. It is NOT always bad: for 1–2 levels, direct props are explicit, easy to debug, and keep components pure.',
    keyTakeaway: 'Use direct props for 1–2 levels. Switch to Context when drilling across 3+ levels.',
  },
  {
    id: 5,
    topic: 'State Management',
    question: 'How do you decide between local state (useState) and global Context?',
    shortAnswer:
      'Use local useState if only one component or its direct children care about the data (e.g. form inputs, accordion toggles). Use Context if multiple unrelated components across different branches need access (e.g. user authentication, theme, cart count).',
    keyTakeaway: 'Keep state as local as possible. Elevate to Context only when sharing is essential.',
  },
  {
    id: 6,
    topic: 'State Management',
    question: 'Why must state in React always be updated immutably?',
    shortAnswer:
      'React relies on shallow reference equality checks (Object.is) to detect state changes. If you mutate an object or array in place (e.g., list.push() or user.name = "X"), the reference memory address remains identical, so React skips re-rendering the UI.',
    keyTakeaway: 'Always create new references using spread operators (...prev) or .map() / .filter().',
  },
  {
    id: 7,
    topic: 'State Management',
    question: 'What is "derived state" and why shouldn\'t it be stored in a separate useState?',
    shortAnswer:
      'Derived state is data that can be calculated synchronously on the fly from existing state (e.g. totalCount = items.length or activeItems = items.filter(...)). Storing it in separate state leads to synchronization bugs where the count and list fall out of sync.',
    keyTakeaway: 'If a value can be computed from existing state or props during render, do NOT put it in useState.',
  },
  {
    id: 8,
    topic: 'Styling',
    question: 'How do CSS Modules prevent class name collisions?',
    shortAnswer:
      'CSS Modules compile standard CSS class names into unique hashed identifiers at build time (e.g. .card becomes ._card_x19d_4). Because every component receives uniquely hashed class names, styling rules in one file cannot accidentally override styles in another.',
    keyTakeaway: 'Normal CSS syntax with compiler-enforced local scoping.',
  },
  {
    id: 9,
    topic: 'Styling',
    question: 'What are the main advantages and tradeoffs of Tailwind CSS?',
    shortAnswer:
      'Advantages: Rapid development directly in JSX, tiny purged production bundle, consistent design tokens, and no naming fatigue. Tradeoffs: Lengthy JSX class attributes and requires learning framework utility abbreviations.',
    keyTakeaway: 'Utility-first styling without context switching between files.',
  },
  {
    id: 10,
    topic: 'Styling',
    question: 'What is styled-components and how does it handle dynamic styling?',
    shortAnswer:
      'styled-components is a CSS-in-JS library that uses tagged template literals to bind styles directly to React components. It handles dynamic styling by allowing functions inside CSS strings that read component props (e.g. color: ${props => props.$active ? "red" : "gray"}).',
    keyTakeaway: 'Components as styling primitives; props directly dictate visual styles.',
  },
  {
    id: 11,
    topic: 'Context API',
    question: 'Does React Context API replace state management libraries like Redux or Zustand?',
    shortAnswer:
      'No. Context API is purely a transport/dependency-injection mechanism for passing data. It does not provide built-in state update logic, middleware, devtools, or fine-grained selector re-rendering optimizations that dedicated state management libraries offer.',
    keyTakeaway: 'Context transports state; it does not manage or optimize complex state logic alone.',
  },
  {
    id: 12,
    topic: 'Optimization',
    question: 'How can you prevent unnecessary re-renders in React Context consumers?',
    shortAnswer:
      '1) Split unrelated data into multiple smaller Contexts (e.g., ThemeContext vs UserAuthContext). 2) Memoize the Provider value object with useMemo. 3) Wrap children in React.memo or split consuming components into focused sub-components.',
    keyTakeaway: 'Keep contexts specialized; avoid monolithic "everything in one context" providers.',
  },
];

export default function VivaPrep() {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState([1, 2]); // default first 2 open

  const topics = ['All', 'Context API', 'Prop Drilling', 'State Management', 'Styling', 'Optimization'];

  const toggleQuestion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenIds(VIVA_QUESTIONS.map((q) => q.id));
  const collapseAll = () => setOpenIds([]);

  const filteredQuestions = VIVA_QUESTIONS.filter((q) => {
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white">
            Viva &amp; Exam Prep
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Viva Examination Master Guide: 12 Core Questions
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Concise, accurate, and examiner-tested answers covering Week 13–14 syllabus: Context API,
          prop drilling tradeoffs, immutable updates, derived state, and the 3 CSS methodologies.
        </p>
      </div>

      {/* Controls Bar: Topic Filters + Search + Expand All */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Topic Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedTopic === t
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Expand / Collapse All */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAll}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={collapseAll}
              className="text-slate-500 font-semibold hover:underline cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search viva questions by keywords (e.g. 'immutably', 'createContext', 'purged')..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-slate-50/50"
          />
        </div>
      </section>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            No questions matched your search criteria.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isOpen = openIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-indigo-300 shadow-md ring-1 ring-indigo-100'
                    : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full p-4 md:p-5 flex items-start justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {q.topic}
                        </span>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-4 md:px-5 pb-5 pt-1 border-t border-slate-100 space-y-3 animate-fadeIn">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs leading-relaxed text-slate-700">
                      <span className="font-bold text-slate-900 block mb-1">
                        Examiner Answer:
                      </span>
                      {q.shortAnswer}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs flex items-start gap-2 text-emerald-950">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Key Takeaway to Memorize: </span>
                        <span>{q.keyTakeaway}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Quick Viva Checklist Footer */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-3 text-xs leading-relaxed">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
          <GraduationCap className="w-5 h-5" />
          <span>Top Viva Tips from Examiners</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 pt-1">
          <div>
            <strong className="text-white block mb-0.5">1. Speak in terms of Props:</strong>
            Explain Context as an alternative to props when trees get deep, not a wholesale replacement for props.
          </div>
          <div>
            <strong className="text-white block mb-0.5">2. Remember Immutability:</strong>
            Explain that React compares memory addresses. Mutating objects in-place never triggers renders.
          </div>
          <div>
            <strong className="text-white block mb-0.5">3. Know the CSS Differences:</strong>
            Be prepared to explain hashed class names in CSS Modules vs purgeable atomic classes in Tailwind vs props in styled-components.
          </div>
        </div>
      </section>
    </div>
  );
}
