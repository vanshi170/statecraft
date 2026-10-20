import React from 'react';
import {
  RotateCcw,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/useApp';
import CodeExample from '../components/common/CodeExample';

// ----------------------------------------------------------------------
// Sub-Consumer 1: Profile Preview Card (Reads context directly)
// ----------------------------------------------------------------------
function ProfileConsumerCard() {
  const { userName, theme, counter } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-slate-700">Consumer Component A</span>
        <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
          ProfileCard
        </span>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-200">
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Display Name from Context:</span>
          <span className="text-base font-bold text-slate-900">{userName || 'Anonymous'}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span>Active Theme: <strong className="capitalize text-slate-800">{theme}</strong></span>
        <span>Observed Count: <strong className="font-mono text-indigo-600">{counter}</strong></span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-Consumer 2: Analytics Mini-Tile (Reads context directly)
// ----------------------------------------------------------------------
function AnalyticsConsumerCard() {
  const { counter, theme } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-slate-700">Consumer Component B</span>
        <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 text-[10px] font-semibold border border-violet-100">
          AnalyticsTile
        </span>
      </div>

      <div>
        <span className="text-[11px] text-slate-400 block font-medium">Synchronized Global Counter:</span>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-extrabold text-violet-600">{counter}</span>
          <span className="text-xs text-slate-500">
            {counter % 2 === 0 ? '(Even Number)' : '(Odd Number)'}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span>Theme: <strong className="capitalize text-slate-800">{theme}</strong></span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live Synced" />
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-Consumer 3: Audit Badge (Reads context directly)
// ----------------------------------------------------------------------
function AuditConsumerCard() {
  const { userName, counter, theme } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-slate-700">Consumer Component C</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100">
          ActivityBadge
        </span>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
        <div className="text-slate-600">
          <strong>Authorized User:</strong> {userName}
        </div>
        <div className="text-slate-600">
          <strong>Session Events:</strong> {counter} actions triggered
        </div>
        <div className="text-slate-600">
          <strong>Active Theme:</strong> <span className="capitalize">{theme}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span>Zero Props Injected</span>
        <span className="text-emerald-600 font-semibold text-[11px]">Direct Stream</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main ContextAPI Page
// ----------------------------------------------------------------------
export default function ContextAPI() {
  const {
    counter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    adjustCounter,
    userName,
    setUserName,
    theme,
    setTheme,
  } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
            Topic 1 • Global State
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          React Context API: Broadcasting State to Consumers
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Learn how React Context API solves the prop-passing dilemma by creating a centralized
          teleportation channel from which any child component can read and subscribe directly.
        </p>
      </div>

      {/* Explanatory Concept Cards (Simple Language) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="font-bold text-indigo-600 text-sm block">1. What is Context API?</span>
          <p className="text-slate-600 leading-relaxed">
            Context provides a way to pass data through the component tree without having to pass props down manually at every level.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="font-bold text-indigo-600 text-sm block">2. What is createContext()?</span>
          <p className="text-slate-600 leading-relaxed">
            A built-in React function that returns a Context object. It creates the data container that holds both the <code>&lt;Provider&gt;</code> and consumer logic.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="font-bold text-indigo-600 text-sm block">3. What is a Provider?</span>
          <p className="text-slate-600 leading-relaxed">
            A special wrapper component (<code>&lt;MyContext.Provider value={'{...}'}&gt;</code>) that accepts a <code>value</code> prop and broadcasts it to every descendant component.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="font-bold text-indigo-600 text-sm block">4. What is useContext()?</span>
          <p className="text-slate-600 leading-relaxed">
            A hook called inside any functional component to subscribe to the nearest matching Provider's value and automatically re-render when that value changes.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="font-bold text-emerald-600 text-sm block">5. When to Use Context</span>
          <p className="text-slate-600 leading-relaxed">
            Ideal for "global" data: current authenticated user, UI theme accent, preferred locale/language, shopping cart items, or toast notifications.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="font-bold text-amber-600 text-sm block">6. When NOT to Use Context</span>
          <p className="text-slate-600 leading-relaxed">
            Avoid for simple parent-to-child data flow (use standard props) or high-frequency state updates like mouse positions, which can cause excessive consumer re-renders.
          </p>
        </div>
      </div>

      {/* Interactive Demonstration Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-800">
                Live Interactive Context Demonstration
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Modify the shared state below. Notice how Consumers A, B, and C update immediately with zero prop passing!
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 font-semibold">
            Live Count: {counter}
          </span>
        </div>

        {/* Global Controls Panel */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Context Provider State Controls
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control 1: Counter */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-semibold text-slate-600 block">
                Counter Controls
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={decrementCounter}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  -1
                </button>
                <button
                  onClick={incrementCounter}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer shadow-xs"
                >
                  +1
                </button>
                <button
                  onClick={() => adjustCounter(5)}
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold cursor-pointer"
                >
                  +5
                </button>
                <button
                  onClick={resetCounter}
                  title="Reset counter"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer ml-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Control 2: Display Name */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <label htmlFor="context-user-input" className="text-xs font-semibold text-slate-600 block">
                User Display Name
              </label>
              <input
                id="context-user-input"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter display name..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Control 3: Theme Toggle */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-semibold text-slate-600 block">
                Theme Accent
              </span>
              <div className="flex items-center gap-2">
                {[
                  { id: 'indigo', name: 'Indigo' },
                  { id: 'emerald', name: 'Emerald' },
                  { id: 'violet', name: 'Violet' },
                  { id: 'amber', name: 'Amber' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer border transition-colors ${
                      theme === t.id
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Consumer Components Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Independent Consumers in Component Tree</span>
            <span className="text-indigo-600">No Props Passed Between These Cards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProfileConsumerCard />
            <AnalyticsConsumerCard />
            <AuditConsumerCard />
          </div>
        </div>
      </section>

      {/* Visual Component Tree Hierarchy Diagram */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Visual Component Hierarchy &amp; Provider Tree
        </h3>
        <p className="text-xs text-slate-500">
          This architectural diagram illustrates how <code>&lt;AppContext.Provider&gt;</code> wraps the application and teleports data straight to consumers without intermediary prop forwarding.
        </p>

        {/* Tree flow diagram */}
        <div className="p-6 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs space-y-3 border border-slate-800">
          {/* Root Provider */}
          <div className="p-3 bg-indigo-900/60 border border-indigo-500 rounded-xl max-w-xl">
            <div className="flex items-center justify-between text-indigo-300 font-bold mb-1">
              <span>&lt;AppContext.Provider value={'{ counter, userName, theme }'}&gt;</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-700 text-white">Top Level Provider</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Holds single source of truth and distributes updates to all subscriber components.
            </p>
          </div>

          {/* Branch Down */}
          <div className="pl-6 border-l-2 border-indigo-500/50 space-y-3">
            <div className="text-slate-400 text-[11px] font-sans flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              <span>&lt;Layout&gt; (Passes zero props down)</span>
            </div>

            <div className="pl-6 border-l-2 border-indigo-500/40 space-y-3">
              {/* Branch to Consumers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-indigo-400 block font-bold">&lt;ProfileConsumer /&gt;</span>
                  <span className="text-[10px] text-slate-400 font-sans">Calls useContext() directly</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-violet-400 block font-bold">&lt;AnalyticsConsumer /&gt;</span>
                  <span className="text-[10px] text-slate-400 font-sans">Calls useContext() directly</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-emerald-400 block font-bold">&lt;AuditConsumer /&gt;</span>
                  <span className="text-[10px] text-slate-400 font-sans">Calls useContext() directly</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conceptual Flow Diagram */}
        <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-950 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">1</span>
            <span>Context Provider</span>
          </div>
          <ArrowRight className="w-4 h-4 text-indigo-400 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">2</span>
            <span>Shared React State</span>
          </div>
          <ArrowRight className="w-4 h-4 text-indigo-400 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">3</span>
            <span>Consumer Components (useContext)</span>
          </div>
        </div>
      </section>

      {/* Code Snippet & "Why Does This Work?" Explanation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <CodeExample
          title="React Context Setup & Usage"
          code={`import { createContext, useContext, useState } from 'react';

// 1. Create the Context object
const AppContext = createContext(null);

// 2. Define the Provider wrapper
export function AppProvider({ children }) {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState('Alex');

  return (
    <AppContext.Provider value={{ counter, setCounter, userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
}

// 3. Consume in any descendant component
export function CounterBadge() {
  const { counter, setCounter } = useContext(AppContext);
  return (
    <button onClick={() => setCounter(c => c + 1)}>
      Count: {counter}
    </button>
  );
}`}
          explanation="createContext creates the pipe, Provider supplies the water (state value), and useContext turns on the tap in any room (component)."
        />

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-800">
              Why Does This Work?
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              Under the hood, React maintains an internal link between every <code>useContext()</code> call and the nearest parent <code>&lt;Provider&gt;</code> that matches that Context.
            </p>
            <p>
              When the state inside the Provider updates (e.g. via <code>setCounter</code>), React triggers a re-render for all components that subscribed to that Context. The intermediate components that do NOT consume the context do not even need to be aware of the data!
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-800 block">Key Viva Takeaway:</span>
              <p className="text-slate-600">
                Context is NOT an external store like Redux or Zustand. It is an internal dependency-injection and broadcast mechanism built directly into React's fiber reconciliation engine.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
