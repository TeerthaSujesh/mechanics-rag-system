import React, { useState } from 'react'
import ConfidenceGauge, { confidenceTier } from './ConfidenceGauge'
import { resolveImageUrl } from '../api'

function ImagePlaceholder() {
  return (
    <div className="border border-dashed border-blueprint/30 dark:border-blueprintSoft/25 rounded-sm bg-paper dark:bg-paperDark flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
           className="text-graphite dark:text-graphiteDark">
        <rect x="3" y="4" width="18" height="14" rx="1.5" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M21 15l-5.5-5.5L7 18" />
      </svg>
      <div className="text-sm text-ink dark:text-inkDark font-medium">
        No handwritten solution image available.
      </div>
      <div className="text-xs text-graphite dark:text-graphiteDark max-w-xs">
        This image will appear once the backend images are added.
      </div>
    </div>
  )
}

export default function ReferenceCard({ reference }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!reference) {
    return (
      <div className="plate bg-card dark:bg-cardDark border border-blueprint/25 dark:border-blueprintSoft/20 rounded-sm p-6 text-sm text-graphite dark:text-graphiteDark">
        No reference pulled yet. The retrieved problem, its handwritten solution,
        and a confidence readout will appear here once you ask something.
      </div>
    )
  }

  const { matched_problem, confidence, image_path, solution_steps, final_answer } = reference
  const imgUrl = resolveImageUrl(image_path)
  const steps = Array.isArray(solution_steps) ? solution_steps : []
  const tier = confidenceTier(confidence)

  return (
    <div className="plate bg-card dark:bg-cardDark border border-blueprint/25 dark:border-blueprintSoft/20 rounded-sm p-5 space-y-5">
      <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono">
        RETRIEVED REFERENCE
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-1">PROBLEM ID</div>
          <div className="font-display text-lg font-semibold text-ink dark:text-inkDark">{matched_problem}</div>
          <span
            className="inline-block mt-2 text-[10px] font-mono tracking-wide px-2 py-0.5 rounded-full"
            style={{ color: tier.color, backgroundColor: `${tier.color}1A`, border: `1px solid ${tier.color}55` }}
          >
            {Math.round(tier.pct * 100)}% CONFIDENCE
          </span>
        </div>
        <ConfidenceGauge value={confidence} />
      </div>

      {steps.length > 0 && (
        <div>
          <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-2">SOLUTION STEPS</div>
          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink dark:text-inkDark">
                <span className="font-mono text-blueprint dark:text-blueprintSoft shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {final_answer && (
        <div className="border-t border-blueprint/20 dark:border-blueprintSoft/20 pt-4">
          <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-1">FINAL ANSWER</div>
          <div className="font-mono text-pencil dark:text-pencilSoft font-medium">{final_answer}</div>
        </div>
      )}

      <div className="border-t border-blueprint/20 dark:border-blueprintSoft/20 pt-4">
        <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-2">
          ORIGINAL HANDWRITTEN SOLUTION
        </div>
        {imgUrl && !imageFailed ? (
          <div className="border border-blueprint/20 dark:border-blueprintSoft/20 rounded-sm overflow-hidden bg-paper dark:bg-paperDark">
            <img
              src={imgUrl}
              alt={`Handwritten solution for ${matched_problem}`}
              className="w-full object-contain max-h-64"
              onError={() => setImageFailed(true)}
            />
          </div>
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </div>
  )
}
