// Utilities for exporting color combinations as CSS variables, Tailwind config snippets, and JSON design tokens.

export function toCSSVars({ bg, fg, prefix = 'cc' }) {
  return `:root{\n  --${prefix}-bg: ${bg};\n  --${prefix}-fg: ${fg};\n}\n\n.bg-${prefix}{ background-color: var(--${prefix}-bg); }\n.text-${prefix}{ color: var(--${prefix}-fg); }\n.button-${prefix}{ background-color: var(--${prefix}-fg); color: var(--${prefix}-bg); }\n`;
}

// A minimal Tailwind theme extension snippet you can paste into tailwind.config if using v3 or earlier.
// For Tailwind v4, you can use CSS variables directly or the new design tokens approach.
export function toTailwindConfig({ bg, fg, name = 'brand' }) {
  return `// tailwind.config.js snippet\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${name}: {\n          bg: '${bg}',\n          fg: '${fg}',\n        },\n      },\n    },\n  },\n}\n`;
}

export function toJSONTokens({ bg, fg, name = 'brand' }) {
  const obj = {
    color: {
      [name]: {
        background: { value: bg },
        foreground: { value: fg },
        button: {
          background: { value: fg },
          foreground: { value: bg },
        },
      },
    },
  }
  return JSON.stringify(obj, null, 2)
}
