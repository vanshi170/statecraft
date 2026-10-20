import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

// Dedicated Context for this 5-tier demonstration
const DemoUserContext = createContext(null);

// Level 5: Direct Consumer (Calls useContext)
function UserNameConsumer() {
  const { name } = useContext(DemoUserContext);

  return (
    <div className="p-3 bg-indigo-50 border-2 border-indigo-600 rounded-xl">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-mono font-bold text-indigo-700">Level 5: &lt;UserName /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-medium text-[10px] flex items-center gap-1">
          <Zap className="w-2.5 h-2.5" /> Direct useContext()
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Read from Context:</span>
          <span className="text-sm font-bold text-slate-900">{name || 'Empty'}</span>
        </div>
      </div>
    </div>
  );
}

// Level 4: Intermediate UserCard (No props needed!)
function UserCard() {
  return (
    <div className="p-3.5 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold text-emerald-900">Level 4: &lt;UserCard /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Clean (No Props)
        </span>
      </div>
      <p className="text-[11px] text-emerald-800">
        Completely unaware of user name. Does not forward or touch any props.
      </p>
      <div className="pl-3 border-l-2 border-emerald-300">
        <UserNameConsumer />
      </div>
    </div>
  );
}

// Level 3: Intermediate ProfilePanel (No props needed!)
function ProfilePanel() {
  return (
    <div className="p-3.5 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold text-emerald-900">Level 3: &lt;ProfilePanel /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Clean (No Props)
        </span>
      </div>
      <p className="text-[11px] text-emerald-800">
        Intermediate container with decoupled props API.
      </p>
      <div className="pl-3 border-l-2 border-emerald-300">
        <UserCard />
      </div>
    </div>
  );
}

// Level 2: Intermediate Dashboard (No props needed!)
function Dashboard() {
  return (
    <div className="p-3.5 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold text-emerald-900">Level 2: &lt;Dashboard /&gt;</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Clean (No Props)
        </span>
      </div>
      <p className="text-[11px] text-emerald-800">
        Does not receive or pass any user prop.
      </p>
      <div className="pl-3 border-l-2 border-emerald-300">
        <ProfilePanel />
      </div>
    </div>
  );
}

// Level 1: App with Context Provider
export default function ContextDrillingDemo({ initialName = 'Jordan Rivera' }) {
  const [name, setName] = useState(initialName);

  return (
    <DemoUserContext.Provider value={{ name, setName }}>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        {/* Top Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h4 className="font-bold text-slate-800 text-sm">
                React Context API Architecture
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                0 Prop Tunnels
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Broadcasts data to any subtree component directly via <code>useContext()</code>.
            </p>
          </div>

          {/* Live Input to update Context */}
          <div className="flex items-center gap-2">
            <label htmlFor="context-drilling-name" className="text-xs font-semibold text-slate-600">Update Name:</label>
            <input
              id="context-drilling-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type name..."
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        {/* Visual Context Broadcast Diagram */}
        <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-800">
              Level 1: &lt;DemoUserContext.Provider value={`{ name: "${name}" }`}&gt;
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
              Context Provider
            </span>
          </div>

          <div className="pl-3 border-l-2 border-emerald-300">
            <Dashboard />
          </div>
        </div>

        {/* Code Trail */}
        <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-slate-300 space-y-1">
          <div className="text-[11px] text-slate-400 font-sans font-semibold mb-1">
            Context Teleportation Flow:
          </div>
          <div className="text-emerald-400">
            Provider(name) ➔➔ [Bypasses Dashboard, ProfilePanel, UserCard] ➔➔ &lt;UserName /&gt; via useContext()
          </div>
          <div className="text-[11px] text-slate-400 font-sans mt-1">
            ✨ Intermediates stay clean, modular, and can be refactored freely.
          </div>
        </div>
      </div>
    </DemoUserContext.Provider>
  );
}
