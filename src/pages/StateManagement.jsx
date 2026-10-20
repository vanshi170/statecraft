import React from 'react';
import {
  Sliders,
  Share2,
  Calculator,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/useApp';
import TaskManager from '../components/state/TaskManager';
import StatePatternSandbox from '../components/state/StatePatternSandbox';

export default function StateManagement() {
  const { counter, incrementCounter, userName, theme } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-50 text-violet-700 border border-violet-100">
            Topic 3 • State Architecture
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          React State Management Patterns
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Master the four essential state tiers in React: Local Component State (<code>useState</code>),
          Shared Global State (Context API), Derived Calculated State, and Pure Immutable Updates.
        </p>
      </div>

      {/* Decision Guide Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">1. Local State (useState)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            State that only one component (or its immediate direct children) cares about.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <div>• Form inputs &amp; text fields</div>
            <div>• Dropdown &amp; modal open/close toggles</div>
            <div>• Component-level hover or tab index</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">2. Shared State (Context API)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cross-cutting data needed across multiple distinct branches of the component tree.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <div>• Current authenticated user session</div>
            <div>• Global color theme &amp; accent modes</div>
            <div>• Shopping cart count &amp; notification queues</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">3. Derived State (Computed)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Values calculated on-the-fly from existing state during component rendering.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <div>• Filtered items based on search query</div>
            <div>• Total, completed, and pending counts</div>
            <div>• Percentage progress &amp; sum calculations</div>
          </div>
        </div>
      </section>

      {/* Section A & C: Local State & Derived State Demo (TaskManager) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              A &amp; C. Local Component State + Derived Metrics
            </h2>
            <p className="text-xs text-slate-500">
              Interactive task manager built using <code>useState</code> with zero redundant storage for derived values.
            </p>
          </div>
        </div>

        <TaskManager />
      </section>

      {/* Section B: Shared Application State Live Demo */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <h3 className="text-base font-bold text-slate-800">
                B. Shared Application State in Context
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Notice how this page seamlessly reads the same global state configured on other pages without passing any props.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 font-semibold">
            Context API
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block mb-1">Global User:</span>
            <span className="text-sm font-bold text-slate-900">{userName}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-400 font-medium block mb-1">Global Count:</span>
              <span className="text-sm font-mono font-bold text-indigo-600">{counter}</span>
            </div>
            <button
              onClick={incrementCounter}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 cursor-pointer"
            >
              +1 Increment
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block mb-1">Theme Accent:</span>
            <span className="text-sm font-bold text-slate-900 capitalize">{theme}</span>
          </div>
        </div>
      </section>

      {/* Section D: State Update Patterns Interactive Sandbox */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            D. Pure Immutable State Update Patterns
          </h2>
          <p className="text-xs text-slate-500">
            Test and run functional state updates, immutable object spreading, and immutable array operations.
          </p>
        </div>

        <StatePatternSandbox />
      </section>

      {/* Section E: Architectural Viva Guidance */}
      <section className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 text-xs leading-relaxed">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Core Viva Architecture Principle: "Context is for Distribution, not Mutation"</span>
        </div>
        <p className="text-slate-300">
          A common beginner misconception is assuming Context API is a "state management library" like Redux or Zustand. In reality, Context API only <em>transports</em> state across your component tree. The actual state management is still executed by <code>useState</code> or <code>useReducer</code> inside the Provider!
        </p>
      </section>
    </div>
  );
}
