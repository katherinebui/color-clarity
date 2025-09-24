// AccessiblePreview renders sample UI components (button, card, text) styled
// with the currently selected background and text colors. It includes visible
// labels and uses icons/text to avoid relying on color alone for meaning.

import React from 'react';
import ContrastBadge from './ContrastBadge';
import { evaluateWCAG } from '../utils/contrast';

function Section({ title, children }) {
  return (
    <section className="space-y-2" aria-label={title}>
      <h3 className="text-sm font-semibold tracking-wide text-gray-700 dark:text-neutral-300">{title}</h3>
      {children}
    </section>
  );
}

export default function AccessiblePreview({ bg, fg }) {
  const wcag = evaluateWCAG(bg, fg);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-3">
        <ContrastBadge bg={bg} fg={fg} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2 rounded-lg" style={{ backgroundColor: bg, color: fg }}>
        <Section title="Button">
          <button
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:ring-2 disabled:opacity-50"
            style={{
              backgroundColor: fg,
              color: bg,
              borderColor: fg,
            }}
          >
            <span>Action</span>
          </button>
          <p className="mt-1 text-xs opacity-80">
            Button text contrasted against button background (inverted pair)
          </p>
        </Section>

        <Section title="Card">
          <div className="rounded-lg border p-3 shadow-sm" style={{ borderColor: fg }}>
            <h4 className="text-lg font-semibold">Card title</h4>
            <p className="mt-1 text-sm opacity-90">This is an example card using your colors.</p>
            <a href="#" className="mt-2 inline-block underline">
              Learn more
            </a>
          </div>
          <p className="mt-1 text-xs opacity-80">Content uses the selected text color on the selected background.</p>
        </Section>

        <Section title="Text block">
          <p className="text-base">
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-lg font-semibold">
            Large text sample for AA-large/AAA-large evaluation.
          </p>
        </Section>

        <Section title="Status">
          <ul className="text-sm space-y-1">
            <li>
              <span className="font-medium">AA Normal:</span> {wcag.AA.normal ? 'Pass' : 'Fail'}
              <div className="text-xs opacity-75 ml-2">Min 4.5:1 ratio - Standard compliance</div>
            </li>
            <li>
              <span className="font-medium">AA Large:</span> {wcag.AA.large ? 'Pass' : 'Fail'}
              <div className="text-xs opacity-75 ml-2">Min 3.0:1 ratio - Large text (18pt+ or 14pt+ bold)</div>
            </li>
            <li>
              <span className="font-medium">AAA Normal:</span> {wcag.AAA.normal ? 'Pass' : 'Fail'}
              <div className="text-xs opacity-75 ml-2">Min 7.0:1 ratio - Enhanced compliance</div>
            </li>
            <li>
              <span className="font-medium">AAA Large:</span> {wcag.AAA.large ? 'Pass' : 'Fail'}
              <div className="text-xs opacity-75 ml-2">Min 4.5:1 ratio - Enhanced large text</div>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
