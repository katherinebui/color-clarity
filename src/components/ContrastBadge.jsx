// Badge that displays WCAG AA/AAA pass/fail for normal and large text
// Uses simple text and icons to avoid relying on color alone.

import React from 'react'
import { formatRatio, evaluateWCAG } from '../utils/contrast'

function StatusPill({ label, ok, id }) {
  return (
    <div
      role="status"
      id={id}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border ${
        ok
          ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-700'
          : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-700'
      }`}
      aria-live="polite"
    >
      <span aria-hidden="true" className="inline-block">
        {ok ? (
          // Check icon
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
        ) : (
          // X icon
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42 6.29-6.3 6.29 6.3 1.42-1.42-6.3-6.29 6.3-6.29z"/></svg>
        )}
      </span>
      <span>{label}</span>
    </div>
  )
}

export default function ContrastBadge({ bg, fg, className = '' }) {
  const wcag = evaluateWCAG(bg, fg)
  const r = formatRatio(wcag.ratio)
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium" aria-label={`Contrast ratio ${r}:1`}>
        Ratio: <span className="tabular-nums">{r}:1</span>
      </span>
      <StatusPill label="AA Normal" ok={wcag.AA.normal} id="aa-normal" />
      <StatusPill label="AA Large" ok={wcag.AA.large} id="aa-large" />
      <StatusPill label="AAA Normal" ok={wcag.AAA.normal} id="aaa-normal" />
      <StatusPill label="AAA Large" ok={wcag.AAA.large} id="aaa-large" />
    </div>
  )
}
