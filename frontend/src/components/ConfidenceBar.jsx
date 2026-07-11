import React from 'react'

export default function ConfidenceBar({ value = 0.0 }) {
  const pct = Math.round(value * 100)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-slate-700">Confidence</div>
        <div className="text-sm font-semibold text-blue-600">{pct}%</div>
      </div>

      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
