import React, { useState } from 'react';
import {
  CheckCircle,
  Circle,
  Trash2,
  Plus,
  ListFilter,
  AlertCircle
} from 'lucide-react';

const INITIAL_TASKS = [
  { id: 1, text: 'Review createContext() and useContext() hooks', completed: true, priority: 'High', category: 'Context' },
  { id: 2, text: 'Map out 5-level component tree for prop drilling viva', completed: true, priority: 'Medium', category: 'Props' },
  { id: 3, text: 'Compare CSS Modules vs Tailwind vs styled-components', completed: false, priority: 'High', category: 'Styling' },
  { id: 4, text: 'Understand why derived state should not be in useState', completed: false, priority: 'Low', category: 'State' },
];

export default function TaskManager() {
  // Local state with useState
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // 1. Immutable State Update: Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
      priority,
      category: 'General',
    };

    // Immutable array addition using spread operator
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setInputText('');
  };

  // 2. Immutable State Update: Toggle Complete
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 3. Immutable State Update: Delete Task
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  // 4. DERIVED STATE (Calculated on the fly from `tasks` - NOT stored in redundant state)
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filtered list (Derived State)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const priorityColors = {
    High: 'bg-rose-50 text-rose-700 border-rose-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-sm">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h3 className="text-base font-bold text-slate-800">
              Interactive Task Manager
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono">
              useState Demo
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Manages local list state while deriving statistics without redundant useState variables.
          </p>
        </div>

        {/* Live Derived State Badges */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[70px]">
            <span className="block text-xs font-semibold text-slate-400 uppercase">Total</span>
            <span className="font-mono font-bold text-sm text-slate-800">{totalTasks}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center min-w-[70px]">
            <span className="block text-xs font-semibold text-emerald-600 uppercase">Done</span>
            <span className="font-mono font-bold text-sm text-emerald-700">{completedTasks}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-center min-w-[70px]">
            <span className="block text-xs font-semibold text-indigo-600 uppercase">Active</span>
            <span className="font-mono font-bold text-sm text-indigo-700">{activeTasks}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar (Derived State) */}
      <div className="mt-4 mb-5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
          <span>Completion Progress (Derived from tasks array)</span>
          <span className="text-indigo-600 font-mono">{completionPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Add Task Input Form */}
      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new study or state craft task..."
          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
        />

        <div className="flex items-center gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </form>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                filter === f
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f} ({f === 'all' ? totalTasks : f === 'active' ? activeTasks : completedTasks})
            </button>
          ))}
        </div>

        <span className="text-slate-400 text-[11px] hidden sm:inline">
          Showing {filteredTasks.length} item{filteredTasks.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="py-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
            <ListFilter className="w-6 h-6 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No tasks found in this view</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200/90 text-slate-700 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => handleToggleTask(task.id)}
                  aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
                  className="shrink-0 cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="min-w-0">
                  <span
                    className={`text-sm font-medium block truncate ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    priorityColors[task.priority] || priorityColors.Medium
                  }`}
                >
                  {task.priority}
                </span>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="Delete task"
                  className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Derived State Architectural Callout */}
      <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Why Derived State Matters:</span>
          <span className="ml-1 text-amber-800">
            Notice that <code>totalTasks</code>, <code>completedTasks</code>, and <code>completionPercentage</code> are NOT stored in separate <code>useState</code> variables. They are computed dynamically during render from <code>tasks</code>. Storing them in separate state leads to synchronization bugs where the count and task array fall out of sync!
          </span>
        </div>
      </div>
    </div>
  );
}
