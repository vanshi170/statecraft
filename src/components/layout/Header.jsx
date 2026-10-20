import React from 'react';
import {
  Menu,
  GraduationCap,
  Plus,
  Minus,
  Palette
} from 'lucide-react';
import { useApp } from '../../context/useApp';

export default function Header({ onMenuClick }) {
  const {
    activePage,
    userName,
    counter,
    incrementCounter,
    decrementCounter,
    theme,
    setTheme,
    navigateTo,
  } = useApp();

  const pageTitles = {
    overview: 'Overview Dashboard',
    'context-api': 'React Context API',
    'prop-drilling': 'Prop Drilling vs Context API',
    'state-management': 'State Management Patterns',
    'styling-playground': 'Styling Playground: 3 Approaches',
    'viva-prep': 'Viva Examination Prep',
  };

  const themeOptions = [
    { id: 'indigo', name: 'Indigo', color: '#4f46e5' },
    { id: 'emerald', name: 'Emerald', color: '#10b981' },
    { id: 'violet', name: 'Violet', color: '#8b5cf6' },
    { id: 'amber', name: 'Amber', color: '#f59e0b' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>StateCraft</span>
            <span>/</span>
            <span className="text-indigo-600 font-semibold capitalize">
              {activePage.replace('-', ' ')}
            </span>
          </div>
          <h1 className="text-base md:text-lg font-bold text-slate-900">
            {pageTitles[activePage] || 'Dashboard'}
          </h1>
        </div>
      </div>

      {/* Right: Live Context Widgets & Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Quick Theme Switcher */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
          <Palette className="w-3.5 h-3.5 text-slate-500 ml-1" />
          <div className="flex items-center gap-1">
            {themeOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={`Switch theme accent to ${t.name}`}
                className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                  theme === t.id ? 'scale-125 ring-2 ring-offset-1 ring-slate-400' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.color }}
              />
            ))}
          </div>
        </div>

        {/* Global Counter Badge with live Context buttons */}
        <div className="flex items-center bg-indigo-50 border border-indigo-200/80 rounded-xl px-2.5 py-1 text-xs">
          <span className="text-indigo-700 font-medium mr-2 hidden md:inline">
            Global Count:
          </span>
          <span className="font-mono font-extrabold text-indigo-700 min-w-5 text-center mr-2">
            {counter}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={decrementCounter}
              aria-label="Decrement global counter"
              className="w-5 h-5 rounded flex items-center justify-center bg-white text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200 transition-colors shadow-xs cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={incrementCounter}
              aria-label="Increment global counter"
              className="w-5 h-5 rounded flex items-center justify-center bg-white text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200 transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* User Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="font-medium text-slate-700 max-w-[120px] truncate">
            {userName}
          </span>
        </div>

        {/* Viva Prep Shortcut Button */}
        {activePage !== 'viva-prep' && (
          <button
            onClick={() => navigateTo('viva-prep')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Viva Q&amp;A</span>
          </button>
        )}
      </div>
    </header>
  );
}
