import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import CodeExample from '../common/CodeExample';

export default function StatePatternSandbox() {
  const [activePattern, setActivePattern] = useState('prev-value');

  // State for Pattern 1: Functional Updater
  const [counter, setCounter] = useState(0);

  // State for Pattern 2: Immutable Object
  const [userProfile, setUserProfile] = useState({
    name: 'Morgan Cole',
    role: 'Frontend Apprentice',
    settings: { emailAlerts: true, darkMode: false },
  });

  // State for Pattern 3: Immutable Array
  const [skillList, setSkillList] = useState(['React 19', 'Context API', 'Vite']);
  const [newSkillInput, setNewSkillInput] = useState('');

  // 1. Functional update demo
  const handleTripleIncrement = () => {
    // Correct way: each call uses the fresh previous state
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
  };

  const handleStaleIncrement = () => {
    // Problematic pattern: all 3 refer to the same render-time 'counter' value
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
  };

  // 2. Object update demo
  const handleUpdateRole = (newRole) => {
    setUserProfile((prev) => ({
      ...prev,
      role: newRole,
    }));
  };

  const handleToggleAlerts = () => {
    setUserProfile((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        emailAlerts: !prev.settings.emailAlerts,
      },
    }));
  };

  // 3. Array update demo
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim() || skillList.includes(newSkillInput.trim())) return;
    setSkillList((prev) => [...prev, newSkillInput.trim()]);
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillList((prev) => prev.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-sm space-y-6">
      {/* Pattern Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
        {[
          { id: 'prev-value', label: '1. Previous Value Updaters' },
          { id: 'immutable-object', label: '2. Immutable Objects' },
          { id: 'immutable-array', label: '3. Immutable Arrays' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePattern(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePattern === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pattern 1 Content */}
      {activePattern === 'prev-value' && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Pattern 1: Updating State Based on Previous Value
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When the new state depends on the existing state, always use a callback function <code>(prev =&gt; prev + 1)</code>. This guarantees you are calculating against the latest state, avoiding stale closures during batched renders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interactive Demo */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="text-center py-4 bg-white rounded-xl border border-slate-200/80">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Current State</span>
                <span className="font-mono text-4xl font-extrabold text-indigo-600">{counter}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleTripleIncrement}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Call setCounter(prev =&gt; prev + 1) × 3</span>
                </button>
                <p className="text-[11px] text-emerald-800 text-center font-medium">
                  Result: Correctly adds +3 because each update uses the fresh previous value.
                </p>

                <button
                  onClick={handleStaleIncrement}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer mt-2"
                >
                  <span>Call setCounter(counter + 1) × 3 (Stale)</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center font-medium">
                  Result: Only adds +1 because all three calls read the same snapshot value!
                </p>

                <button
                  onClick={() => setCounter(0)}
                  className="w-full text-center text-xs text-slate-400 hover:text-slate-600 py-1 cursor-pointer"
                >
                  Reset to 0
                </button>
              </div>
            </div>

            {/* Code Snippet */}
            <CodeExample
              title="State Updater Pattern"
              code={`// ✅ CORRECT: Functional state update
setCounter(prev => prev + 1);
setCounter(prev => prev + 1);
// Result: Increases by 2 accurately

// ❌ DANGEROUS: Stale closure hazard
setCounter(counter + 1);
setCounter(counter + 1);
// Result: Increases by only 1 due to batching!`}
              explanation="React batches state updates. Functional updates receive the pending state queue, ensuring calculations are never out of date."
            />
          </div>
        </div>
      )}

      {/* Pattern 2 Content */}
      {activePattern === 'immutable-object' && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Pattern 2: Updating Objects Immutably
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never mutate objects directly in React (e.g. <code>user.role = 'Admin'</code>). Mutating in place fails React's shallow comparison, which means components will not re-render! Always copy existing properties using the spread operator <code>...prev</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interactive Demo */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs space-y-1.5 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2 text-[11px]">User Object Snapshot:</div>
                <div><span className="text-indigo-600">name:</span> "{userProfile.name}"</div>
                <div><span className="text-indigo-600">role:</span> <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">"{userProfile.role}"</span></div>
                <div><span className="text-indigo-600">emailAlerts:</span> <span className="font-bold">{userProfile.settings.emailAlerts ? 'true' : 'false'}</span></div>
              </div>

              <div className="space-y-2">
                <span className="block text-xs font-semibold text-slate-600">Select Role (Object Spread):</span>
                <div className="grid grid-cols-2 gap-2">
                  {['Frontend Apprentice', 'React Specialist', 'State Architect', 'Staff Engineer'].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleUpdateRole(r)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left cursor-pointer transition-colors ${
                        userProfile.role === r
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={handleToggleAlerts}
                    className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer flex items-center justify-between"
                  >
                    <span>Toggle Nested Setting (emailAlerts)</span>
                    <span className="font-mono text-indigo-600">
                      {userProfile.settings.emailAlerts ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <CodeExample
              title="Immutable Object Update Pattern"
              code={`// ✅ CORRECT: Shallow copy with spread
setUserProfile(prev => ({
  ...prev,
  role: 'React Specialist',
  // Deep copy for nested objects:
  settings: {
    ...prev.settings,
    emailAlerts: !prev.settings.emailAlerts
  }
}));

// ❌ WRONG: Mutating state directly
userProfile.role = 'Admin'; // Won't trigger re-render!`}
              explanation="React checks Object.is(oldState, newState). Direct mutation leaves the object reference unchanged, causing React to skip UI updates."
            />
          </div>
        </div>
      )}

      {/* Pattern 3 Content */}
      {activePattern === 'immutable-array' && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Pattern 3: Updating Arrays Immutably
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Do not use mutating array methods like <code>push()</code>, <code>pop()</code>, <code>splice()</code>, or <code>sort()</code>. Instead use immutable methods: <code>[...arr, newItem]</code> for adding, <code>filter()</code> for removing, and <code>map()</code> for updating elements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interactive Demo */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="e.g. Redux Toolkit, Zustand..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 cursor-pointer"
                >
                  + Add via Spread
                </button>
              </form>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {skillList.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                  >
                    <span className="font-medium text-slate-800">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-600 text-[11px] font-semibold cursor-pointer"
                      title="Remove using .filter()"
                    >
                      Delete (.filter)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <CodeExample
              title="Immutable Array Operations"
              code={`// 1. ADD ITEM (Spread operator):
setList(prev => [...prev, newItem]);

// 2. REMOVE ITEM (filter returns new array):
setList(prev => prev.filter(item => item.id !== id));

// 3. UPDATE ITEM (map returns new array):
setList(prev => prev.map(item =>
  item.id === id ? { ...item, done: true } : item
));`}
              explanation="Methods like filter() and map() return brand new array references, preserving purity and triggering predictable React renders."
            />
          </div>
        </div>
      )}
    </div>
  );
}
