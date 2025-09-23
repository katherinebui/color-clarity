// Utility helpers for color contrast using chroma-js
// We keep WCAG 2.2 thresholds (same as 2.1 for contrast)
// AA (normal): 4.5, AA (large >= 18.66px/14pt or bold >= 14px/18.66px): 3.0
// AAA (normal): 7.0, AAA (large): 4.5

import chroma from 'chroma-js'

export const CONTRAST_THRESHOLDS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3.0,
  AAA_NORMAL: 7.0,
  AAA_LARGE: 4.5,
}

// Safely parse hex or rgb strings. Falls back to black if invalid.
export function safeColor(input, fallback = '#000000') {
  try {
    return chroma(input)
  } catch {
    return chroma(fallback)
  }
}

export function contrastRatio(bg, fg) {
  try {
    return chroma.contrast(bg, fg)
  } catch {
    return 0
  }
}

export function evaluateWCAG(bg, fg) {
  const ratio = contrastRatio(bg, fg)
  return {
    ratio,
    AA: {
      normal: ratio >= CONTRAST_THRESHOLDS.AA_NORMAL,
      large: ratio >= CONTRAST_THRESHOLDS.AA_LARGE,
    },
    AAA: {
      normal: ratio >= CONTRAST_THRESHOLDS.AAA_NORMAL,
      large: ratio >= CONTRAST_THRESHOLDS.AAA_LARGE,
    },
  }
}

// Suggest a foreground color for a given background that meets a desired threshold.
// Strategy:
// 1) Try pure black/white.
// 2) Move foreground in LCH space towards max contrast until threshold is met.
export function suggestAccessibleForeground(bg, desired = CONTRAST_THRESHOLDS.AA_NORMAL) {
  const background = safeColor(bg)
  const white = chroma('#ffffff')
  const black = chroma('#000000')

  const cWhite = chroma.contrast(background, white)
  const cBlack = chroma.contrast(background, black)

  // Prefer the higher-contrast of black/white if it passes
  if (cWhite >= desired || cBlack >= desired) {
    return cWhite >= cBlack ? '#ffffff' : '#000000'
  }

  // Otherwise, search along a lightness scale to find a passing color
  // We'll sweep lightness from 0 to 100 and choose the best match
  const [h, c, l] = background.lch()

  let best = { color: null, ratio: 0 }
  for (let light = 0; light <= 100; light += 2) {
    const candidate = chroma.lch(light, Math.min(c, 40), h) // reduce chroma to avoid wild hues
    const r = chroma.contrast(background, candidate)
    if (r > best.ratio) {
      best = { color: candidate.hex(), ratio: r }
    }
    if (r >= desired) {
      return candidate.hex()
    }
  }

  // If we didn't hit desired threshold, return best effort
  return best.color ?? (cWhite > cBlack ? '#ffffff' : '#000000')
}

export function formatRatio(ratio) {
  return ratio.toFixed(2)
}
