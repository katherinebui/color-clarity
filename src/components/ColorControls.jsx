// ColorControls: a combined HEX input + color picker with labels and keyboard support
// Uses react-colorful HexColorPicker for visual picking and a text input for direct HEX entry.
// We avoid relying on color alone by always rendering the current hex value and semantic labels.

import React, { useId } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function ColorControls({ label, color, onChange }) {
  const inputId = useId()
  const pickerId = useId()

  function handleInput(e) {
    const val = e.target.value.trim()
    // Basic normalization to #RRGGBB if possible
    if (/^#?[0-9a-fA-F]{6}$/.test(val)) {
      const hex = val.startsWith('#') ? val : `#${val}`
      onChange(hex)
    } else {
      // Allow user to type; only update state when valid to avoid jitter
    }
  }

  return (
    <div className="flex flex-col gap-2 flex items-center" aria-labelledby={pickerId}>
      <label id={pickerId} htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="text"
          inputMode="text"
          spellCheck={false}
          aria-describedby={`${pickerId}-desc`}
          defaultValue={color}
          onBlur={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleInput(e)
          }}
          className="w-36 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
          placeholder="#000000"
        />
        <div
          className="h-6 w-6 rounded border border-gray-300 shadow-sm dark:border-neutral-700"
          style={{ backgroundColor: color }}
          aria-label={`Current color swatch ${color}`}
          role="img"
        />
      </div>
      <p id={`${pickerId}-desc`} className="sr-only">
        Use the color picker below or type a hex value like #1e90ff.
      </p>
      {/* Visual color picker with full keyboard support */}
      <HexColorPicker color={color} onChange={onChange} aria-label={`${label} color picker`} />
    </div>
  )
}
