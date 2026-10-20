import React from 'react';
import {
  LayoutDashboard,
  Layers,
  GitFork,
  Sliders,
  Palette,
  GraduationCap,
  Sparkles,
  RotateCcw,
  User,
  Hash
} from 'lucide-react';
import { useApp } from '../../context/useApp';

export default function Sidebar({ isOpen, onClose }) {
  const {
    activePage,
    navigateTo,
    visitedSections,
    userName,
    counter,
    resetAllProgress,
  } = useApp();

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: 'Start',
    },
    {
      id: 'context-api',
      label: 'Context API',
      icon: Layers,
      badge: 'Core',
    },
    {
      id: 'prop-drilling',
      label: 'Prop Drilling vs Context',
      icon: GitFork,
      badge: 'Compare',
    },
    {
      id: 'state-management',
      label: 'State Management',
      icon: Sliders,
      badge: 'Patterns',
    },
    {
      id: 'styling-playground',
      label: 'Styling Playground',
      icon: Palette,
      badge: '3-Ways',
    },
    {
      id: 'viva-prep',
      label: 'Viva Preparation',
      icon: GraduationCap,
      badge: 'Q&A',
    },
  ];

  // Calculate learning progress (excluding viva-prep from base 5 or including all)
  const corePages = ['overview', 'context-api', 'prop-drilling', 'state-management', 'styling-playground'];
  const completedCoreCount = corePages.filter(p => visitedSections.includes(p)).length;
  const progressPercent = Math.round((completedCoreCount / corePages.length) * 100);

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* StateCraft Logo & Subtitle */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  State<span className="text-indigo-600">Craft</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                React State &amp; Styling Lab
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Curriculum
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const isVisited = visitedSections.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isVisited && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Explored" />
                  )}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                      isActive
                        ? 'bg-indigo-700/60 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Learning Progress Widget */}
        <div className="p-4 mx-3 mb-3 bg-gradient-to-br from-slate-50 to-indigo-50/50 rounded-2xl border border-indigo-100/70">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700">Course Progress</span>
            <span className="font-mono font-bold text-indigo-600">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span>{completedCoreCount} of {corePages.length} Topics</span>
            {completedCoreCount === corePages.length ? (
              <span className="text-emerald-600 font-medium">All completed!</span>
            ) : (
              <span>In progress</span>
            )}
          </div>
        </div>

        {/* Global State Live Mini-Preview */}
        <div className="p-3.5 border-t border-slate-100 bg-white">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2 px-1 flex items-center justify-between">
            <span>Live Context State</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                <User className="w-3 h-3 text-indigo-500" />
                <span>User</span>
              </div>
              <p className="font-semibold text-slate-800 truncate" title={userName}>
                {userName}
              </p>
            </div>

            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                <Hash className="w-3 h-3 text-violet-500" />
                <span>Counter</span>
              </div>
              <p className="font-mono font-bold text-indigo-600">
                {counter}
              </p>
            </div>
          </div>

          <button
            onClick={resetAllProgress}
            className="w-full mt-2.5 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Reset storage to default initial state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </aside>
    </>
  );
}
