import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeExample({
  code,
  language = 'jsx',
  title,
  explanation,
  className = '',
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-700/60 bg-[#0f172a] shadow-md my-4 ${className}`}>
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono font-medium text-slate-300">
            {title || `${language.toUpperCase()} Snippet`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-medium cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-sm leading-relaxed">
        <pre className={`language-${language} !bg-transparent !p-0 !m-0`}>
          <code className={`language-${language}`}>{code.trim()}</code>
        </pre>
      </div>

      {/* Explanation Footer */}
      {explanation && (
        <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
          <span className="text-indigo-400 font-semibold select-none">💡 Note:</span>
          <span className="leading-relaxed">{explanation}</span>
        </div>
      )}
    </div>
  );
}
