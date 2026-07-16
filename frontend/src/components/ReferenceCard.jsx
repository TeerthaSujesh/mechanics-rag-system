import React, { useState } from 'react'
import ConfidenceGauge, { confidenceTier } from './ConfidenceGauge'
import { resolveImageUrl } from '../api'

function ImagePlaceholder() {
  return (
    <div className="border-2 border-dashed border-ink/40 dark:border-inkDark/40 rounded-xl bg-paper dark:bg-paperDark flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
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
      <div className="bg-card dark:bg-cardDark border-[3px] border-ink dark:border-inkDark rounded-2xl shadow-[5px_5px_0_0_#2B1220] dark:shadow-[5px_5px_0_0_#FFE9D6] p-6 text-sm text-graphite dark:text-graphiteDark rotate-1">
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
    <div className="bg-card dark:bg-cardDark border-[3px] border-ink dark:border-inkDark rounded-2xl shadow-[5px_5px_0_0_#2B1220] dark:shadow-[5px_5px_0_0_#FFE9D6] p-5 space-y-5 rotate-1">
      <div className="inline-block text-[10px] tracking-wide text-ink font-display font-bold px-2.5 py-1 bg-yellow-300 border-2 border-ink rounded-full -rotate-1" style={{ backgroundColor: '#FFC93C' }}>
        RETRIEVED REFERENCE
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-1">PROBLEM ID</div>
          <div className="font-display text-lg font-extrabold text-ink dark:text-inkDark">{matched_problem}</div>
          <span
            className="inline-block mt-2 text-[10px] font-mono font-bold tracking-wide px-2.5 py-1 rounded-full border-2"
            style={{ color: tier.color, backgroundColor: `${tier.color}22`, borderColor: tier.color }}
          >
            {Math.round(tier.pct * 100)}% CONFIDENCE
          </span>
        </div>
        <div className="border-2 border-ink dark:border-inkDark rounded-xl p-1 bg-paper dark:bg-paperDark rotate-2">
          <ConfidenceGauge value={confidence} />
        </div>
      </div>

      {steps.length > 0 && (
        <div>
          <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-2">SOLUTION STEPS</div>
          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink dark:text-inkDark">
                <span className="font-mono font-bold text-blueprint dark:text-blueprintSoft shrink-0 w-6 h-6 flex items-center justify-center border-2 border-ink dark:border-inkDark rounded-full text-xs">{i + 1}</span>
                <span className="leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {final_answer && (
        <div className="border-t-2 border-dashed border-ink/30 dark:border-inkDark/30 pt-4">
          <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-1">FINAL ANSWER</div>
          <span className="inline-block font-mono text-sm font-bold text-pencil dark:text-pencilSoft bg-pink-100 dark:bg-pencilSoft/10 border-2 border-pencil dark:border-pencilSoft rounded-full px-3 py-1">
            {final_answer}
          </span>
        </div>
      )}

      <div className="border-t-2 border-dashed border-ink/30 dark:border-inkDark/30 pt-4">
        <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-2">
          ORIGINAL HANDWRITTEN SOLUTION
        </div>
        {imgUrl && !imageFailed ? (
          <div className="border-2 border-ink dark:border-inkDark rounded-xl overflow-hidden bg-paper dark:bg-paperDark">
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
