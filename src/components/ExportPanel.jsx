// ExportPanel lets users export their current color pair as CSS variables,
// a Tailwind snippet, or JSON design tokens. Provides copy-to-clipboard buttons
// with ARIA live confirmation.

import React, { useRef, useState } from 'react'
import { toCSSVars, toTailwindConfig, toJSONTokens } from '../utils/tokens'

function TextBlock({ label, value }) {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <button
          className="rounded-md border px-2 py-1 text-xs font-semibold hover:bg-gray-50 focus-visible:ring-2 dark:border-neutral-700 dark:hover:bg-neutral-800"
          onClick={copy}
          aria-live="polite"
          aria-label={`Copy ${label}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <textarea
        ref={ref}
        readOnly
        rows={6}
        className="w-full resize-y rounded-md border bg-white p-2 text-xs font-mono shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
        value={value}
      />
    </div>
  )
}

export default function ExportPanel({ bg, fg }) {
  const css = toCSSVars({ bg, fg })
  const tw = toTailwindConfig({ bg, fg })
  const json = toJSONTokens({ bg, fg })

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-semibold">Export design tokens</h3>
      <TextBlock label="CSS variables" value={css} />
      <TextBlock label="Tailwind config snippet" value={tw} />
      <TextBlock label="JSON design tokens" value={json} />
    </div>
  )
}
