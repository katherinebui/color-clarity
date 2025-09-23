// Suggestions component that recommends accessible text colors for a chosen background.
// Provides a button to auto-apply the suggested foreground color.

import React from 'react'
import { suggestAccessibleForeground, CONTRAST_THRESHOLDS, evaluateWCAG } from '../utils/contrast'

export default function Suggestions({ bg, fg, onApply }) {
  const suggestedAA = suggestAccessibleForeground(bg, CONTRAST_THRESHOLDS.AA_NORMAL)
  const suggestedAAA = suggestAccessibleForeground(bg, CONTRAST_THRESHOLDS.AAA_NORMAL)

  const current = evaluateWCAG(bg, fg)

  return (
    <div className="rounded-lg border border-gray-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-semibold">Smart suggestions</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
        Suggestions based on your background to help meet WCAG contrast.
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-md border p-2 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium">AA Target</span>
            <span className="h-6 w-6 rounded border" style={{ backgroundColor: suggestedAA }} aria-label={`Suggested AA color ${suggestedAA}`}></span>
            <code className="text-xs">{suggestedAA}</code>
          </div>
          <button
            className="rounded-md border px-2 py-1 text-xs font-semibold hover:bg-gray-50 focus-visible:ring-2 dark:border-neutral-700 dark:hover:bg-neutral-800"
            onClick={() => onApply(suggestedAA)}
          >
            Apply
          </button>
        </div>

        <div className="flex items-center justify-between rounded-md border p-2 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium">AAA Target</span>
            <span className="h-6 w-6 rounded border" style={{ backgroundColor: suggestedAAA }} aria-label={`Suggested AAA color ${suggestedAAA}`}></span>
            <code className="text-xs">{suggestedAAA}</code>
          </div>
          <button
            className="rounded-md border px-2 py-1 text-xs font-semibold hover:bg-gray-50 focus-visible:ring-2 dark:border-neutral-700 dark:hover:bg-neutral-800"
            onClick={() => onApply(suggestedAAA)}
          >
            Apply
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-600 dark:text-neutral-400">
        Current pair: {fg} on {bg}. This pair {current.AA.normal ? 'passes' : 'fails'} AA normal.
      </p>
    </div>
  )
}
