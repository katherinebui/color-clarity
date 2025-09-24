import { useMemo, useRef, useState } from 'react';
import './App.css';
import './index.css';
import ColorControls from './components/ColorControls';
import AccessiblePreview from './components/AccessiblePreview';
import Suggestions from './components/Suggestions';
import ExportPanel from './components/ExportPanel';
import { evaluateWCAG, suggestAccessibleForeground, CONTRAST_THRESHOLDS } from './utils/contrast';

function randomHex() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`;
}

function generateAccessiblePair() {
  // Generate a random background color
  const bg = randomHex();
  
  // Use our smart suggestion function to get an accessible foreground
  const fg = suggestAccessibleForeground(bg, CONTRAST_THRESHOLDS.AA_NORMAL);
  
  return { bg, fg };
}

function App() {
  // Default to a high-contrast pair
  const [bg, setBg] = useState('#0f172a'); // slate-900
  const [fg, setFg] = useState('#ffffff');

  // Live region to announce pass/fail status
  const liveRef = useRef(null);

  const wcag = useMemo(() => evaluateWCAG(bg, fg), [bg, fg]);

  function announceStatus() {
    const msg = `Contrast ${wcag.ratio.toFixed(2)} to 1. ` +
      `AA normal ${wcag.AA.normal ? 'passes' : 'fails'}. ` +
      `AAA normal ${wcag.AAA.normal ? 'passes' : 'fails'}.`;
    if (liveRef.current) {
      liveRef.current.textContent = msg;
    }
  }

  function randomizePair() {
    const { bg: newBg, fg: newFg } = generateAccessiblePair();
    setBg(newBg);
    setFg(newFg);
    // Defer announce to next tick so wcag recomputes
    setTimeout(announceStatus, 0);
  }

  return (
    <div className="min-h-screen">
      {/* App header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/80 dark:supports-[backdrop-filter]:bg-neutral-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold tracking-tight">Color Clarity</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={randomizePair}
              className="rounded-md border px-3 py-1.5 text-sm font-semibold hover:bg-gray-50 focus-visible:ring-2 dark:border-neutral-700 dark:hover:bg-neutral-800"
              aria-label="Generate random colors"
            >
              Randomize
            </button>
            <a
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 focus-visible:ring-2 dark:border-neutral-700 dark:hover:bg-neutral-800"
              href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer"
            >
              WCAG 2.2
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 xl:grid-cols-3">
        {/* Color Controls Panel */}
        <section className="xl:col-span-1" aria-label="Color pair picker">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3">
              <h2 className="text-base font-semibold">Choose colors</h2>
              <p className="text-sm text-gray-600 dark:text-neutral-400">Pick colors and see contrast.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ColorControls label="Background" color={bg} onChange={setBg} />
              <ColorControls label="Text" color={fg} onChange={setFg} />
            </div>
          </div>
        </section>

        {/* Preview Panel and Suggestions*/}
        <section className="xl:col-span-1 space-y-4" aria-label="Smart suggestions and ccessibility preview">
          <AccessiblePreview bg={bg} fg={fg} />
          <Suggestions bg={bg} fg={fg} onApply={setFg} />
        </section>

        {/* Export Panel */}
        <section className="xl:col-span-1" aria-label="Export">
          <ExportPanel bg={bg} fg={fg} />
        </section>
      </main>

      {/* ARIA live region for updates (invisible) */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" ref={liveRef} />
    </div>
  );
}

export default App;
