import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

// 5. Level 5: Target Component
function UserName({ name }) {
  return (
    <div className="p-3 bg-indigo-50 border-2 border-indigo-500 rounded-xl">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-mono font-bold text-indigo-700">Level 5: &lt;UserName /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-medium text-[10px]">
          Target Consumer
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Rendered via Props:</span>
          <span className="text-sm font-bold text-slate-900">{name || 'Empty'}</span>
        </div>
      </div>
    </div>
  );
}

// 4. Level 4: Intermediate UserCard
function UserCard({ name }) {
  return (
    <div className="p-3.5 bg-amber-50/50 border border-amber-300 rounded-xl space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold text-amber-900">Level 4: &lt;UserCard name={'{name}'} /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-medium flex items-center gap-1">
          <AlertTriangle className="w-2.5 h-2.5" /> Forwarding Prop
        </span>
      </div>
      <p className="text-[11px] text-amber-800">
        Takes <code>name</code> from ProfilePanel and hands it to UserName.
      </p>
      <div className="pl-3 border-l-2 border-amber-400">
        <UserName name={name} />
      </div>
    </div>
  );
}

// 3. Level 3: Intermediate ProfilePanel
function ProfilePanel({ name }) {
  return (
    <div className="p-3.5 bg-amber-50/50 border border-amber-300 rounded-xl space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold text-amber-900">Level 3: &lt;ProfilePanel name={'{name}'} /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-medium flex items-center gap-1">
          <AlertTriangle className="w-2.5 h-2.5" /> Forwarding Prop
        </span>
      </div>
      <p className="text-[11px] text-amber-800">
        Doesn't need <code>name</code> for its own UI. Only exists in props to pass downward.
      </p>
      <div className="pl-3 border-l-2 border-amber-400">
        <UserCard name={name} />
      </div>
    </div>
  );
}

// 2. Level 2: Intermediate Dashboard
function Dashboard({ name }) {
  return (
    <div className="p-3.5 bg-amber-50/50 border border-amber-300 rounded-xl space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold text-amber-900">Level 2: &lt;Dashboard name={'{name}'} /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-medium flex items-center gap-1">
          <AlertTriangle className="w-2.5 h-2.5" /> Forwarding Prop
        </span>
      </div>
      <p className="text-[11px] text-amber-800">
        Dashboard receives <code>name</code> prop and forwards it to ProfilePanel.
      </p>
      <div className="pl-3 border-l-2 border-amber-400">
        <ProfilePanel name={name} />
      </div>
    </div>
  );
}

// 1. Level 1: Root App Component
export default function PropDrillingDemo({ initialName = 'Jordan Rivera' }) {
  const [userName, setUserName] = useState(initialName);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h4 className="font-bold text-slate-800 text-sm">
              Prop Drilling Architecture
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              4 Prop Tunnels
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Data is passed manually through 3 intermediate components that don't need it.
          </p>
        </div>

        {/* Live Input to demonstrate prop updates */}
        <div className="flex items-center gap-2">
          <label htmlFor="prop-drilling-name" className="text-xs font-semibold text-slate-600">Update Name:</label>
          <input
            id="prop-drilling-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Type name..."
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>
      </div>

      {/* Visual Prop Tunnel Diagram */}
      <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono font-bold text-slate-800">
            Level 1: &lt;App /&gt; (Holds State: <code>userName = "{userName}"</code>)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
            State Origin
          </span>
        </div>

        <div className="pl-3 border-l-2 border-slate-300">
          <Dashboard name={userName} />
        </div>
      </div>

      {/* Code Trail */}
      <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-slate-300 space-y-1">
        <div className="text-[11px] text-slate-400 font-sans font-semibold mb-1">
          Prop Journey Chain:
        </div>
        <div className="text-amber-400">
          App(state) ➔ &lt;Dashboard name={'{name}'}/&gt; ➔ &lt;ProfilePanel name={'{name}'}/&gt; ➔ &lt;UserCard name={'{name}'}/&gt; ➔ &lt;UserName name={'{name}'}/&gt;
        </div>
        <div className="text-[11px] text-slate-400 font-sans mt-1">
          ⚠️ 3 components had their props API polluted solely to bridge the gap.
        </div>
      </div>
    </div>
  );
}
