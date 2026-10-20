import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Code2,
  Paintbrush,
  CheckCircle2,
  AlertCircle,
  LayoutGrid
} from 'lucide-react';
import CssModulesCard from '../components/styling/CssModulesCard';
import TailwindCard from '../components/styling/TailwindCard';
import StyledComponentsCard from '../components/styling/StyledComponentsCard';
import CodeExample from '../components/common/CodeExample';

export default function StylingPlayground() {
  const [activeApproach, setActiveApproach] = useState('css-modules'); // 'css-modules' | 'tailwind' | 'styled-components' | 'all-three'
  const [selectedVariant, setSelectedVariant] = useState('default'); // 'default' | 'featured' | 'compact'
  const [selectedAccent, setSelectedAccent] = useState('indigo'); // 'indigo' | 'emerald' | 'rose' | 'amber'
  const [actionNotice, setActionNotice] = useState(null);

  const handleCardAction = (source) => {
    setActionNotice(`Triggered action from: ${source}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const approachDetails = {
    'css-modules': {
      title: 'CSS Modules',
      subtitle: 'Locally Scoped Styles with Automatic Class Hashing',
      icon: Code2,
      color: 'text-indigo-600',
      badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      explanation:
        'CSS Modules are CSS files where all class and animation names are scoped locally by default. During compilation, Vite/Webpack transforms class names (like .card) into unique hashes (like ._cardContainer_x73k1_1), completely eliminating class name collisions across your application.',
      advantages: [
        'Zero learning curve if you already know standard CSS',
        'Scoped styles prevent accidental global style overwrites',
        'Full support for all standard CSS features, pseudo-classes, and keyframe animations',
        'Zero JavaScript runtime penalty — compiled into static CSS stylesheets',
      ],
      limitations: [
        'Requires creating a separate .module.css file for every component',
        'Dynamic styling based on React props requires mapping multiple CSS classes',
        'Can lead to larger bundle sizes if many repeated rules are written manually',
      ],
      suitableUseCase:
        'Component libraries, enterprise design systems where developers prefer traditional CSS separation, and applications requiring zero runtime styling overhead.',
      codeSnippet: `// 1. In CssModulesCard.module.css:
.cardContainer {
  background-color: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
}
.accentIndigo { border-top: 4px solid #4f46e5; }
.cardFeatured { box-shadow: 0 4px 14px rgba(99, 102, 241, 0.12); }

// 2. In CssModulesCard.jsx:
import styles from './CssModulesCard.module.css';

export default function Card({ variant, accent }) {
  const classNames = [
    styles.cardContainer,
    styles[\`accent\${accent}\`],
    variant === 'featured' ? styles.cardFeatured : ''
  ].join(' ');

  return <div className={classNames}>...</div>;
}`,
    },
    'tailwind': {
      title: 'Tailwind CSS',
      subtitle: 'Utility-First Framework for Rapid UI Composition',
      icon: Zap,
      color: 'text-sky-600',
      badgeBg: 'bg-sky-50 border-sky-200 text-sky-700',
      explanation:
        'Tailwind CSS provides low-level utility classes (e.g. flex, pt-4, text-center, rotate-90) that you apply directly in your JSX markup. You build completely custom designs without leaving your HTML, and the production build scans your code and purges unused styles.',
      advantages: [
        'Extremely rapid prototyping — no context-switching between JSX and CSS files',
        'Tiny production bundle — only classes actually used in your JSX are included',
        'Consistent design tokens for spacing, typography, and color palette out of the box',
        'No naming fatigue — you never have to invent class names like .card-wrapper-inner',
      ],
      limitations: [
        'JSX class strings can become lengthy and cluttered',
        'Requires learning Tailwind-specific abbreviations and class names',
        'Dynamic class name construction requires careful handling (avoid string interpolation like text-[color]-500 which breaks purging)',
      ],
      suitableUseCase:
        'Modern startups, fast-paced feature development, dashboards, responsive web apps, and teams that want speed and design consistency.',
      codeSnippet: `// In TailwindCard.jsx (No external CSS file needed):
export default function TailwindCard({ variant, accentColor }) {
  const accentBorder = {
    indigo: 'border-t-4 border-t-indigo-600',
    emerald: 'border-t-4 border-t-emerald-500',
  }[accentColor];

  return (
    <div className={\`bg-white rounded-2xl border p-6 transition-all hover:shadow-lg \${accentBorder} \${
      variant === 'featured' ? 'shadow-md border-indigo-300' : 'shadow-xs'
    }\`}>
      <h4 className="text-lg font-bold text-slate-900">React Architecture</h4>
      <p className="text-sm text-slate-600 mt-2">Utility styled!</p>
    </div>
  );
}`,
    },
    'styled-components': {
      title: 'styled-components',
      subtitle: 'CSS-in-JS Component Primitives with Dynamic Props',
      icon: Paintbrush,
      color: 'text-pink-600',
      badgeBg: 'bg-pink-50 border-pink-200 text-pink-700',
      explanation:
        'styled-components utilizes ES6 tagged template literals to write actual CSS code directly inside your JavaScript files. It binds styles directly to React components and can execute JavaScript functions inside CSS to seamlessly adapt styles based on component props.',
      advantages: [
        'First-class prop support: pass props directly to styled components to alter colors, sizes, or variants dynamically',
        'Component colocation: components and their styles live together in the same file',
        'Eliminates class name mapping logic: React props directly drive styling rules',
        'Theme provider integration: built-in ThemeProvider allows seamless dark/light mode switching',
      ],
      limitations: [
        'Small runtime performance overhead: styles are evaluated and injected into the DOM head at runtime',
        'Increases JavaScript bundle size compared to utility CSS or CSS Modules',
        'Transient props ($prop) syntax needed to avoid leaking custom props to the underlying HTML element',
      ],
      suitableUseCase:
        'Highly dynamic applications with rich theming, complex prop-dependent styling logic, and teams that prefer pure JavaScript/CSS-in-JS ergonomics.',
      codeSnippet: `import styled, { css } from 'styled-components';

// Dynamic styled div accepting transient props:
const CardContainer = styled.div\`
  background-color: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: \${props => props.$variant === 'compact' ? '1rem' : '1.5rem'};
  border-top: 4px solid \${props => props.$accentColor === 'indigo' ? '#4f46e5' : '#10b981'};

  \${props => props.$variant === 'featured' && css\`
    box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.15);
    border-color: #818cf8;
  \`}
\`;

export default function StyledCard({ variant, accentColor }) {
  return (
    <CardContainer $variant={variant} $accentColor={accentColor}>
      <h4>React Architecture</h4>
    </CardContainer>
  );
}`,
    },
  };

  const currentInfo = approachDetails[activeApproach] || approachDetails['css-modules'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
            Topic 4 • CSS Architecture
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Styling Playground: Three Modern React Approaches
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Compare <strong>CSS Modules</strong>, <strong>Tailwind CSS</strong>, and <strong>styled-components</strong>.
          All three implementations render the exact same component specification, so you can evaluate syntax,
          scoping, dynamic prop handling, and maintainability.
        </p>
      </div>

      {/* Interactive Experiment Controls Bar */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Interactive Component Customizer
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Updates all styling versions simultaneously
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Variant Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">
              Card Variant ($variant)
            </label>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'default', label: 'Default' },
                { id: 'featured', label: '★ Featured' },
                { id: 'compact', label: 'Compact' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedVariant === v.id
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">
              Accent Color ($accentColor)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'indigo', label: 'Indigo', color: '#4f46e5' },
                { id: 'emerald', label: 'Emerald', color: '#10b981' },
                { id: 'rose', label: 'Rose', color: '#f43f5e' },
                { id: 'amber', label: 'Amber', color: '#f59e0b' },
              ].map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setSelectedAccent(acc.id)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedAccent === acc.id
                      ? 'border-slate-800 bg-slate-50 font-bold ring-2 ring-slate-400 ring-offset-1'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: acc.color }}
                  />
                  <span>{acc.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action notification feedback */}
          <div className="flex items-center justify-center sm:justify-start lg:justify-end">
            {actionNotice ? (
              <div className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 animate-pulse">
                ✓ {actionNotice}
              </div>
            ) : (
              <span className="text-xs text-slate-400 italic">
                Click buttons inside cards to test local interactivity
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Approach Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'css-modules', label: 'CSS Modules', icon: Code2 },
          { id: 'tailwind', label: 'Tailwind CSS', icon: Zap },
          { id: 'styled-components', label: 'styled-components', icon: Paintbrush },
          { id: 'all-three', label: 'Side-by-Side (All 3)', icon: LayoutGrid },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeApproach === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveApproach(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Mode 1: Individual Deep Dive */}
      {activeApproach !== 'all-three' && (
        <div className="space-y-6">
          {/* Top Panel: Working Example + Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Live Component Preview Column */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Working Live Component:</span>
                <span className="font-mono text-indigo-600">{currentInfo.title}</span>
              </div>

              {activeApproach === 'css-modules' && (
                <CssModulesCard
                  variant={selectedVariant}
                  accentColor={selectedAccent}
                  onAction={handleCardAction}
                />
              )}
              {activeApproach === 'tailwind' && (
                <TailwindCard
                  variant={selectedVariant}
                  accentColor={selectedAccent}
                  onAction={handleCardAction}
                />
              )}
              {activeApproach === 'styled-components' && (
                <StyledComponentsCard
                  variant={selectedVariant}
                  accentColor={selectedAccent}
                  onAction={handleCardAction}
                />
              )}

              <p className="text-[11px] text-slate-400 text-center">
                Interactions (like, bookmark, and buttons) function directly inside each card.
              </p>
            </div>

            {/* Analysis & Details Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${currentInfo.badgeBg}`}>
                    {currentInfo.title}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {currentInfo.subtitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {currentInfo.explanation}
                </p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-100">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Advantages</span>
                  </div>
                  <ul className="space-y-1.5 text-emerald-950 text-[11px] list-disc list-inside">
                    {currentInfo.advantages.map((adv, idx) => (
                      <li key={idx} className="leading-relaxed">{adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Limitations</span>
                  </div>
                  <ul className="space-y-1.5 text-amber-950 text-[11px] list-disc list-inside">
                    {currentInfo.limitations.map((lim, idx) => (
                      <li key={idx} className="leading-relaxed">{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suitable Use Case */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-800">Ideal Use Case: </span>
                <span className="text-slate-600">{currentInfo.suitableUseCase}</span>
              </div>
            </div>
          </div>

          {/* Source Code Example */}
          <CodeExample
            title={`${currentInfo.title} Source Implementation`}
            code={currentInfo.codeSnippet}
            explanation={`Examine how ${currentInfo.title} connects styles with the component's JSX markup.`}
          />
        </div>
      )}

      {/* Render Mode 2: Side-by-Side Comparison of All 3 */}
      {activeApproach === 'all-three' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Displaying identical card specs rendered by all 3 styling methodologies:</span>
            <span className="font-mono text-indigo-600">Variant: {selectedVariant} • Accent: {selectedAccent}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* CSS Modules Version */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> 1. CSS Modules
                </span>
                <span className="text-[10px] font-mono text-slate-400">Scoped Hashed CSS</span>
              </div>
              <CssModulesCard
                variant={selectedVariant}
                accentColor={selectedAccent}
                onAction={handleCardAction}
              />
            </div>

            {/* Tailwind Version */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> 2. Tailwind CSS
                </span>
                <span className="text-[10px] font-mono text-slate-400">Utility Classes</span>
              </div>
              <TailwindCard
                variant={selectedVariant}
                accentColor={selectedAccent}
                onAction={handleCardAction}
              />
            </div>

            {/* styled-components Version */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                  <Paintbrush className="w-3.5 h-3.5" /> 3. styled-components
                </span>
                <span className="text-[10px] font-mono text-slate-400">CSS-in-JS (Props)</span>
              </div>
              <StyledComponentsCard
                variant={selectedVariant}
                accentColor={selectedAccent}
                onAction={handleCardAction}
              />
            </div>
          </div>
        </div>
      )}

      {/* Comparison Matrix Table */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Cross-Approach Architecture Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-3 px-3 font-bold text-slate-700">Criteria</th>
                <th className="py-3 px-3 font-bold text-indigo-700">CSS Modules</th>
                <th className="py-3 px-3 font-bold text-sky-700">Tailwind CSS</th>
                <th className="py-3 px-3 font-bold text-pink-700">styled-components</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-3 font-semibold text-slate-800">Syntax Format</td>
                <td className="py-3 px-3 text-slate-600">Standard CSS files (.module.css)</td>
                <td className="py-3 px-3 text-slate-600">Atomic utility strings in JSX className</td>
                <td className="py-3 px-3 text-slate-600">ES6 Tagged template literals in JS</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-3 font-semibold text-slate-800">Scoping Mechanism</td>
                <td className="py-3 px-3 text-slate-600">Build-time hashed class names</td>
                <td className="py-3 px-3 text-slate-600">Global utilities, scoped by usage in JSX</td>
                <td className="py-3 px-3 text-slate-600">Generated hash attached to React component</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-3 font-semibold text-slate-800">Dynamic Props</td>
                <td className="py-3 px-3 text-slate-600">Conditional className mapping</td>
                <td className="py-3 px-3 text-slate-600">Template string conditionals in className</td>
                <td className="py-3 px-3 text-slate-600">Native props interpolation in CSS string</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-3 font-semibold text-slate-800">Runtime Cost</td>
                <td className="py-3 px-3 text-emerald-700 font-semibold">Zero runtime cost (pure CSS)</td>
                <td className="py-3 px-3 text-emerald-700 font-semibold">Zero runtime cost (pure CSS)</td>
                <td className="py-3 px-3 text-amber-700 font-semibold">Low runtime cost (CSS generation in JS)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-3 font-semibold text-slate-800">Vite Build Setup</td>
                <td className="py-3 px-3 text-slate-600">Built into Vite out of the box</td>
                <td className="py-3 px-3 text-slate-600">PostCSS + Tailwind config</td>
                <td className="py-3 px-3 text-slate-600">npm install styled-components</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
