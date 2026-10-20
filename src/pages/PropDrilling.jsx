import React, { useState } from 'react';
import {
  Table,
  HelpCircle
} from 'lucide-react';
import PropDrillingDemo from '../components/state/PropDrillingDemo';
import ContextDrillingDemo from '../components/state/ContextDrillingDemo';
import CodeExample from '../components/common/CodeExample';

export default function PropDrilling() {
  const [activeTab, setActiveTab] = useState('side-by-side'); // 'side-by-side' | 'prop-drilling' | 'context-api'
  const sharedInitialName = 'Jordan Rivera';

  const comparisonData = [
    {
      feature: 'Data Sharing Mechanism',
      propDrilling: 'Passed manually down every child component via props',
      contextApi: 'Teleported directly to consumers from nearest Provider',
    },
    {
      feature: 'Intermediate Components',
      propDrilling: 'Forced to accept and pass along props they do not use (Prop Tunnels)',
      contextApi: 'Completely unbothered; zero props in intermediate signatures',
    },
    {
      feature: 'Code Complexity & Refactoring',
      propDrilling: 'Renaming a prop or adding data requires modifying every level in between',
      contextApi: 'Modifications happen only at the Provider and Consumer components',
    },
    {
      feature: 'Best Use Case',
      propDrilling: '1–2 component levels deep; isolated parent-child components',
      contextApi: '3+ levels deep; cross-cutting data (themes, auth, cart, notifications)',
    },
    {
      feature: 'Performance & Renders',
      propDrilling: 'Straightforward; only explicitly passed components re-render',
      contextApi: 'All consumers re-render unless memoized or split into smaller contexts',
    },
    {
      feature: 'Maintainability',
      propDrilling: 'Becomes fragile and tedious as component trees grow deeper',
      contextApi: 'High maintainability for global state, but overusing it makes tests harder',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            Topic 2 • Architecture Comparison
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Prop Drilling vs React Context API
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Compare passing data down 5 nested tiers with props versus reading directly from Context.
          Understand why props are great for simple hierarchies while Context shines for cross-cutting global data.
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('side-by-side')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'side-by-side'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Side-by-Side Comparison
        </button>
        <button
          onClick={() => setActiveTab('prop-drilling')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'prop-drilling'
              ? 'bg-white text-amber-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Prop Drilling Only
        </button>
        <button
          onClick={() => setActiveTab('context-api')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'context-api'
              ? 'bg-white text-emerald-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Context API Only
        </button>
      </div>

      {/* Interactive Demonstrations */}
      <div className={`grid gap-6 ${activeTab === 'side-by-side' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {(activeTab === 'side-by-side' || activeTab === 'prop-drilling') && (
          <PropDrillingDemo initialName={sharedInitialName} />
        )}

        {(activeTab === 'side-by-side' || activeTab === 'context-api') && (
          <ContextDrillingDemo initialName={sharedInitialName} />
        )}
      </div>

      {/* Balanced Explanation Callout */}
      <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            <h4 className="font-bold text-sm text-indigo-900">
              Is Prop Drilling Always Bad? (Crucial Viva Point)
            </h4>
          </div>
          <p className="text-indigo-800 leading-relaxed max-w-3xl">
            <strong>No!</strong> Prop drilling is NOT an anti-pattern for simple 1-to-2 level hierarchies. Direct props are explicit, easy to trace, and keep components pure and independently testable. Context is only justified when data is needed by many components at different nesting levels.
          </p>
        </div>
      </div>

      {/* Comprehensive Comparison Table */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-800">
            Feature Comparison Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="py-3 px-4 font-bold text-slate-700">Feature</th>
                <th className="py-3 px-4 font-bold text-amber-900 bg-amber-50/50">Prop Drilling</th>
                <th className="py-3 px-4 font-bold text-emerald-900 bg-emerald-50/50">Context API</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 bg-amber-50/20">
                    {row.propDrilling}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 bg-emerald-50/20">
                    {row.contextApi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Snippets Comparison */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeExample
          title="Prop Drilling Code Chain"
          code={`// Level 1: App holds state
function App() {
  const [user, setUser] = useState("Jordan");
  return <Dashboard user={user} />;
}

// Level 2 & 3: Intermediates pass it along
function Dashboard({ user }) {
  return <ProfilePanel user={user} />;
}

function ProfilePanel({ user }) {
  return <UserCard user={user} />;
}

// Level 5: Target component consumes it
function UserName({ user }) {
  return <span>{user}</span>;
}`}
          explanation="Notice how Dashboard, ProfilePanel, and UserCard have their props interfaces polluted just to deliver data to UserName."
        />

        <CodeExample
          title="Context API Direct Consumption"
          code={`// 1. Context wraps the tree at Level 1
function App() {
  const [user, setUser] = useState("Jordan");
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

// 2. Intermediates require ZERO props!
function Dashboard() { return <ProfilePanel />; }
function ProfilePanel() { return <UserCard />; }
function UserCard() { return <UserName />; }

// 3. Level 5 consumes directly
function UserName() {
  const user = useContext(UserContext);
  return <span>{user}</span>;
}`}
          explanation="Zero prop pollution. Intermediates remain decoupled and can be moved or refactored without breaking data flow."
        />
      </section>
    </div>
  );
}
