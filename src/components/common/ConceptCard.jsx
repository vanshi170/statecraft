import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ConceptCard({
  icon: Icon,
  title,
  description,
  badgeText,
  pageId,
  isVisited = false,
  onExplore,
  highlights = [],
}) {
  return (
    <div
      onClick={() => onExplore(pageId)}
      className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-400/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          
          <div className="flex items-center gap-1.5">
            {isVisited ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Explored
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {badgeText || 'Ready'}
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Highlights List */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {highlights.map((item, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60 font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
        <span>Explore playground</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
