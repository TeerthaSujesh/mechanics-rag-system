import React from 'react'

export default function Header() {
  return (
    <header className="w-full py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">Mechanics Statics RAG Tutor</h1>
            <p className="text-sm text-slate-500 mt-1">Ask doubts using handwritten solutions</p>
          </div>
        </div>
      </div>
    </header>
  )
}
