import React from 'react'
import ThemeToggle from './ThemeToggle'

const FIELDS = [
  { label: 'SUBJECT', value: 'MECHANICS' },
  { label: 'UNIT', value: '4' },
  { label: 'CHAPTER', value: 'FRICTION' },
]

export default function TitleBlock() {
  return (
    <header className="border-b border-blueprint/25 dark:border-blueprintSoft/20 bg-card/70 dark:bg-cardDark/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.25em] text-blueprint dark:text-blueprintSoft font-mono mb-1">
            MECHANICS DOUBT SOLVER
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-inkDark leading-tight">
            Mechanics Doubt Solver
          </h1>
          <p className="text-sm text-graphite dark:text-graphiteDark mt-1 max-w-md">
            AI-powered Mechanics: Statics tutor using Retrieval-Augmented
            Generation and handwritten solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex border border-blueprint/30 dark:border-blueprintSoft/25 rounded-sm overflow-hidden text-[11px] font-mono">
            {FIELDS.map((f, i) => (
              <div
                key={f.label}
                className={`px-3 py-2 ${i !== 0 ? 'border-l border-blueprint/30 dark:border-blueprintSoft/25' : ''} ${f.label === 'UNIT' ? 'text-center' : ''}`}
              >
                <div className="text-graphite dark:text-graphiteDark tracking-wider">{f.label}</div>
                <div className="text-ink dark:text-inkDark font-medium">{f.value}</div>
              </div>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
