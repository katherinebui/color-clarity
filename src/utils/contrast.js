// Utility helpers for color contrast using chroma-js
// We keep WCAG 2.2 thresholds (same as 2.1 for contrast)
// AA (normal): 4.5, AA (large >= 18.66px/14pt or bold >= 14px/18.66px): 3.0
// AAA (normal): 7.0, AAA (large): 4.5

import chroma from 'chroma-js';

export const CONTRAST_THRESHOLDS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3.0,
  AAA_NORMAL: 7.0,
  AAA_LARGE: 4.5,
};

// Safely parse hex or rgb strings. Falls back to black if invalid.
export function safeColor(input, fallback = '#000000') {
  try {
    return chroma(input);
  } catch {
    return chroma(fallback);
  }
}

export function contrastRatio(bg, fg) {
  try {
    return chroma.contrast(bg, fg);
  } catch {
    return 0;
  }
}

export function evaluateWCAG(bg, fg) {
  const ratio = contrastRatio(bg, fg);
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
  };
}

/**
 * Suggest a foreground color for a given background that meets a desired contrast threshold.
 * 
 * Algorithm Strategy:
 * 1) First, try pure black and white (most common accessible combinations)
 * 2) If neither works, search the LCH color space for an optimal match
 * 3) Fall back to the best available option if threshold can't be met
 * 
 * @param {string} bg - Background color (hex, rgb, etc.)
 * @param {number} desired - Target contrast ratio (default: 4.5 for WCAG AA)
 * @returns {string} Hex color that provides best contrast with background
 */
export function suggestAccessibleForeground(bg, desired = CONTRAST_THRESHOLDS.AA_NORMAL) {
  // Step 1: Parse and validate the background color safely
  const background = safeColor(bg);
  const white = chroma('#ffffff');
  const black = chroma('#000000');

  // Step 2: Calculate contrast ratios for the most common text colors
  const cWhite = chroma.contrast(background, white);
  const cBlack = chroma.contrast(background, black);

  // Step 3: If black or white meets the threshold, prefer the higher contrast option
  // This covers ~90% of real-world use cases efficiently
  if (cWhite >= desired || cBlack >= desired) {
    return cWhite >= cBlack ? '#ffffff' : '#000000';
  }

  // Step 4: Advanced search using LCH color space for edge cases
  // LCH (Lightness, Chroma, Hue) provides perceptually uniform color manipulation
  const [h, c] = background.lch(); // Extract hue and chroma, ignore lightness
  
  // Track the best color found during our search
  let best = { color: null, ratio: 0 };
  
  // Step 5: Sweep through lightness values from pure black (0) to pure white (100)
  // Using step size of 2 for performance vs. precision balance
  for (let light = 0; light <= 100; light += 2) {
    // Create candidate color: same hue as background, reduced chroma, varying lightness
    // Math.min(c, 40) prevents oversaturated colors that might look unnatural
    const candidate = chroma.lch(light, Math.min(c, 40), h);
    
    // Calculate contrast ratio between background and this candidate
    const r = chroma.contrast(background, candidate);
    
    // Keep track of the best option we've seen so far
    if (r > best.ratio) {
      best = { color: candidate.hex(), ratio: r };
    }
    
    // If we found a color that meets our threshold, return it immediately
    // This gives us the darkest acceptable color (lowest lightness value)
    if (r >= desired) {
      return candidate.hex();
    }
  }

  // Step 6: Fallback strategy if no color in our search met the threshold
  // Return either our best attempt, or fall back to black/white based on which contrasts better
  return best.color ?? (cWhite > cBlack ? '#ffffff' : '#000000');
}

export function formatRatio(ratio) {
  return ratio.toFixed(2);
}
