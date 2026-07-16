import React from 'react'
import ThemeToggle from './ThemeToggle'

const FIELDS = [
  { label: 'SUBJECT', value: 'MECHANICS' },
  { label: 'UNIT', value: '4' },
  { label: 'CHAPTER', value: 'FRICTION' },
]

export default function TitleBlock() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
      <header className="border-[3px] border-ink dark:border-inkDark bg-card dark:bg-cardDark rounded-2xl shadow-[5px_5px_0_0_#2B1220] dark:shadow-[5px_5px_0_0_#FFE9D6] -rotate-1 px-5 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.2em] text-blueprint dark:text-blueprintSoft font-mono font-bold mb-1">
            MECHANICS DOUBT SOLVER
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink dark:text-inkDark leading-tight">
            Mechanics Doubt Solver
          </h1>
          <p className="text-sm text-graphite dark:text-graphiteDark mt-1 max-w-md">
            AI-powered Mechanics: Statics tutor using Retrieval-Augmented
            Generation and handwritten solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex border-2 border-ink dark:border-inkDark rounded-xl overflow-hidden text-[11px] font-mono bg-paper dark:bg-paperDark rotate-1">
            {FIELDS.map((f, i) => (
              <div
                key={f.label}
                className={`px-3 py-2 ${i !== 0 ? 'border-l-2 border-ink dark:border-inkDark' : ''} ${f.label === 'UNIT' ? 'text-center' : ''}`}
              >
                <div className="text-graphite dark:text-graphiteDark tracking-wider font-bold">{f.label}</div>
                <div className="text-ink dark:text-inkDark font-medium">{f.value}</div>
              </div>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </header>
    </div>
  )
}
