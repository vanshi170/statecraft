import React from 'react';
import {
  Layers,
  GitFork,
  Sliders,
  Palette,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/useApp';
import ConceptCard from '../components/common/ConceptCard';

export default function Overview() {
  const {
    counter,
    incrementCounter,
    decrementCounter,
    userName,
    setUserName,
    theme,
    setTheme,
    visitedSections,
    navigateTo,
  } = useApp();

  const concepts = [
    {
      id: 'context-api',
      title: 'React Context API',
      description: 'Broadcast global state to deeply nested consumers without passing props down intermediate components.',
      icon: Layers,
      badgeText: 'Topic 1',
      highlights: ['createContext', 'useContext', 'Provider Tree', 'Global Store'],
    },
    {
      id: 'prop-drilling',
      title: 'Prop Drilling vs Context',
      description: 'Examine when direct props are clean versus when they become cumbersome across a 5-tier component chain.',
      icon: GitFork,
      badgeText: 'Topic 2',
      highlights: ['5-Level Demo', 'Prop Forwarding', 'Tradeoff Analysis', 'Refactoring'],
    },
    {
      id: 'state-management',
      title: 'State Management Patterns',
      description: 'Master local useState, derived state computation, and pure immutable update techniques for arrays and objects.',
      icon: Sliders,
      badgeText: 'Topic 3',
      highlights: ['useState', 'Derived State', 'Object Immutability', 'Array Spreads'],
    },
    {
      id: 'styling-playground',
      title: 'Styling: 3 Core Approaches',
      description: 'Compare CSS Modules, Tailwind CSS utility classes, and styled-components on the identical live component.',
      icon: Palette,
      badgeText: 'Topic 4',
      highlights: ['CSS Modules', 'Tailwind CSS', 'styled-components', 'Real Comparison'],
    },
  ];

  // Determine the next unvisited section for "Continue Learning"
  const order = ['context-api', 'prop-drilling', 'state-management', 'styling-playground', 'viva-prep'];
  const nextSection = order.find((sec) => !visitedSections.includes(sec)) || 'context-api';
  const nextSectionLabels = {
    'context-api': 'Context API Demonstration',
    'prop-drilling': 'Prop Drilling vs Context',
    'state-management': 'State Management Patterns',
    'styling-playground': 'Styling Playground',
    'viva-prep': 'Viva Examination Prep',
  };

  const totalCore = 4;
  const visitedCore = ['context-api', 'prop-drilling', 'state-management', 'styling-playground'].filter(
    (id) => visitedSections.includes(id)
  ).length;
  const progressPercent = Math.round((visitedCore / totalCore) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl border border-indigo-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Interactive Week 13–14 React Lab</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Understand React State, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-pink-300">
              Visually &amp; Practically.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            StateCraft is a hands-on developer dashboard crafted to demystify React Context API,
            diagnose prop drilling bottlenecks, compare immutable state patterns, and test
            CSS Modules, Tailwind CSS, and styled-components on genuine interactive components.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => navigateTo(nextSection)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-950/50 cursor-pointer"
            >
              <span>Continue Learning: {nextSectionLabels[nextSection]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('viva-prep')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-sm font-medium border border-white/10 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-indigo-300" />
              <span>Viva Preparation Guide (10+ Q&amp;A)</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -top-20 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Progress & Live Context Demo Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Tracker Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Course Progress
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold">
                {progressPercent}% Complete
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Curriculum Checklist
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Explore all four concept sandboxes to complete your syllabus prep.
            </p>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-2 text-xs">
              {[
                { id: 'context-api', name: 'React Context API' },
                { id: 'prop-drilling', name: 'Prop Drilling vs Context' },
                { id: 'state-management', name: 'State Management Patterns' },
                { id: 'styling-playground', name: '3-Way Styling Playground' },
              ].map((item) => {
                const done = visitedSections.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${done ? 'text-emerald-500' : 'text-slate-300'}`}
                      />
                      <span className={done ? 'text-slate-800 font-medium' : 'text-slate-500'}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-indigo-600 font-semibold hover:underline">
                      {done ? 'Review' : 'Start'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{visitedCore} of {totalCore} Modules explored</span>
            <button
              onClick={() => navigateTo(nextSection)}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              Resume &rarr;
            </button>
          </div>
        </div>

        {/* Global Context Live Interactive Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-800">
                  Global Context Live Sandbox
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono">
                  useContext()
                </span>
              </div>
              <p className="text-xs text-slate-500">
                This widget shares real state with the header, sidebar, and all dashboard pages.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">AppContext.Provider</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Global User Name Control */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <label htmlFor="global-student-name" className="text-xs font-semibold text-slate-600 block mb-1.5">
                Shared User Name
              </label>
              <input
                id="global-student-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Synchronized across all components
              </span>
            </div>

            {/* Shared Counter Control */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-600 block">
                Shared Global Counter
              </span>
              <div className="font-mono text-3xl font-extrabold text-indigo-600 py-1">
                {counter}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={decrementCounter}
                  aria-label="Decrease shared count"
                  className="px-3 py-1 rounded bg-white hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  -1
                </button>
                <button
                  onClick={incrementCounter}
                  aria-label="Increase shared count"
                  className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                >
                  +1
                </button>
              </div>
            </div>

            {/* Theme Accent Control */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-600 block mb-1">
                Accent Theme
              </span>
              <div className="grid grid-cols-2 gap-1.5 my-1">
                {[
                  { id: 'indigo', name: 'Indigo' },
                  { id: 'emerald', name: 'Emerald' },
                  { id: 'violet', name: 'Violet' },
                  { id: 'amber', name: 'Amber' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id)}
                    className={`py-1 px-2 rounded text-xs font-semibold capitalize cursor-pointer border transition-colors ${
                      theme === th.id
                        ? 'bg-indigo-600 text-white border-indigo-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {th.name}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 block">
                Active Theme: <span className="font-mono font-bold capitalize text-slate-700">{theme}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Concept Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Core Curriculum Concepts
          </h2>
          <p className="text-xs text-slate-500">
            Click any concept card to jump into the dedicated interactive playground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              icon={concept.icon}
              title={concept.title}
              description={concept.description}
              badgeText={concept.badgeText}
              pageId={concept.id}
              isVisited={visitedSections.includes(concept.id)}
              onExplore={navigateTo}
              highlights={concept.highlights}
            />
          ))}
        </div>
      </section>

      {/* Technology Stack Specifications */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-800">
            Configured Technology Stack
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
            <span className="font-bold text-slate-800 block mb-0.5">React 19</span>
            <span className="text-slate-500 text-[11px]">Hooks &amp; JSX</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
            <span className="font-bold text-slate-800 block mb-0.5">Vite 8</span>
            <span className="text-slate-500 text-[11px]">Fast Dev Server</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
            <span className="font-bold text-slate-800 block mb-0.5">Context API</span>
            <span className="text-slate-500 text-[11px]">useContext()</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
            <span className="font-bold text-slate-800 block mb-0.5">CSS Modules</span>
            <span className="text-slate-500 text-[11px]">Scoped Hashed CSS</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
            <span className="font-bold text-slate-800 block mb-0.5">Tailwind CSS 3</span>
            <span className="text-slate-500 text-[11px]">Utility Architecture</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
            <span className="font-bold text-slate-800 block mb-0.5">styled-components</span>
            <span className="text-slate-500 text-[11px]">CSS-in-JS Engine</span>
          </div>
        </div>
      </section>
    </div>
  );
}
