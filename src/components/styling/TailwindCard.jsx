import React, { useState } from 'react';
import { Heart, Bookmark, ArrowRight, Zap } from 'lucide-react';

export default function TailwindCard({
  variant = 'default',
  accentColor = 'indigo',
  onAction,
}) {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Color mapping using pure Tailwind utility classes
  const accentStyles = {
    indigo: {
      border: 'border-t-4 border-t-indigo-600',
      iconBg: 'bg-indigo-50 text-indigo-600',
      button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300',
    },
    emerald: {
      border: 'border-t-4 border-t-emerald-500',
      iconBg: 'bg-emerald-50 text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-300',
    },
    rose: {
      border: 'border-t-4 border-t-rose-500',
      iconBg: 'bg-rose-50 text-rose-600',
      button: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-300',
    },
    amber: {
      border: 'border-t-4 border-t-amber-500',
      iconBg: 'bg-amber-50 text-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-300',
    },
  };

  const currentAccent = accentStyles[accentColor] || accentStyles.indigo;

  return (
    <div
      className={`relative bg-white rounded-2xl border border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        currentAccent.border
      } ${
        variant === 'featured'
          ? 'bg-gradient-to-b from-white to-indigo-50/20 border-indigo-300 shadow-md ring-1 ring-indigo-200/50'
          : 'shadow-xs'
      } ${variant === 'compact' ? 'p-4' : 'p-6'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold transition-transform duration-150 hover:scale-105 ${currentAccent.iconBg}`}
        >
          <Zap size={20} />
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {variant === 'featured' ? '★ Featured Module' : 'Tailwind CSS'}
        </span>
      </div>

      {/* Body */}
      <h4 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
        React Architecture Mastery
      </h4>
      <p className="text-sm text-slate-600 leading-relaxed mb-5">
        Styled entirely using utility classes in JSX. No separate stylesheet needed. Fast development and purgeable styles.
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 mb-5 text-center">
        <div>
          <span className="block text-sm font-bold font-mono text-slate-800">12</span>
          <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">Lessons</span>
        </div>
        <div>
          <span className="block text-sm font-bold font-mono text-slate-800">4.9/5</span>
          <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">Rating</span>
        </div>
        <div>
          <span className="block text-sm font-bold font-mono text-slate-800">98%</span>
          <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">Score</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isLiked
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-transparent'
            }`}
            aria-label="Like this card"
          >
            <Heart size={14} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
            <span>{likes}</span>
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`inline-flex items-center p-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-transparent'
            }`}
            aria-label="Bookmark this card"
          >
            <Bookmark size={14} className={isBookmarked ? 'fill-amber-500 text-amber-500' : ''} />
          </button>
        </div>

        <button
          onClick={() => onAction && onAction('Tailwind Card Action')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-xs focus:ring-2 focus:outline-none cursor-pointer ${currentAccent.button}`}
        >
          <span>Explore</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
