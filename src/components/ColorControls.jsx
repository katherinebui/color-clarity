// ColorControls: a combined HEX input + color picker with labels and keyboard support
// Uses react-colorful HexColorPicker for visual picking and a text input for direct HEX entry.
// We avoid relying on color alone by always rendering the current hex value and semantic labels.

import React, { useId, useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function ColorControls({ label, color, onChange }) {
  const inputId = useId()
  const pickerId = useId()
  const errorId = useId()
  const [inputValue, setInputValue] = useState(color)
  const [error, setError] = useState('')

  // Sync input value when color prop changes (e.g., from color picker or suggestions)
  useEffect(() => {
    setInputValue(color)
    setError('') // Clear error when color changes externally
  }, [color])

  function handleInputChange(e) {
    const val = e.target.value
    setInputValue(val) // Always update local state to allow typing
    
    // Clear error while typing to avoid distracting feedback
    if (error) {
      setError('')
    }
  }

  function handleInputCommit(e) {
    const val = e.target.value.trim()
    // Basic normalization to #RRGGBB if possible
    if (/^#?[0-9a-fA-F]{6}$/.test(val)) {
      const hex = val.startsWith('#') ? val : `#${val}`
      onChange(hex)
      setInputValue(hex) // Normalize the display value
      setError('') // Clear any existing error
    } else if (val === '') {
      // Empty input - revert to current color without error
      setInputValue(color)
      setError('')
    } else {
      // Invalid input - show error and revert
      setError('Please enter a valid hex color (e.g., #1e90ff or 1e90ff)')
      setInputValue(color)
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
          aria-describedby={error ? `${pickerId}-desc ${errorId}` : `${pickerId}-desc`}
          aria-invalid={error ? 'true' : 'false'}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputCommit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleInputCommit(e)
          }}
          className={`w-36 rounded-md border px-2 py-1 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-800 ${
            error 
              ? 'border-red-500 bg-red-50 text-red-900 focus-visible:ring-red-500 dark:border-red-400 dark:bg-red-900/20 dark:text-red-200' 
              : 'border-gray-300 bg-white dark:border-neutral-700'
          }`}
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
      
      {/* Error message with WCAG 2.2 compliant styling and ARIA support */}
      {error && (
        <div 
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-1 flex items-center gap-2 text-sm text-red-700 dark:text-red-300"
        >
          <svg 
            className="h-4 w-4 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5l-4 7A1 1 0 006 16h8a1 1 0 00.867-1.5l-4-7A1 1 0 0010 7z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {/* Visual color picker with full keyboard support */}
      <HexColorPicker color={color} onChange={onChange} aria-label={`${label} color picker`} />
    </div>
  )
}
