import React from 'react'
import ConfidenceBar from './ConfidenceBar'

export default function SolutionViewer({ solution = null }) {
  if (!solution) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="text-slate-500">No retrieved solution yet. Ask a question to see matched problem and solution.</div>
      </div>
    )
  }

  const { problem_id, confidence, image } = solution

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-slate-500">Matched Problem</div>
          <div className="text-lg font-semibold text-slate-800">{problem_id}</div>
        </div>
      </div>

      <div className="mb-4">
        <ConfidenceBar value={confidence} />
      </div>

      <div className="mt-4">
        <div className="text-sm text-slate-500 mb-2">Handwritten Solution</div>
        <div className="w-full h-56 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
          <img src={image} alt="handwritten solution" className="object-contain h-full" />
        </div>
      </div>
    </div>
  )
}
