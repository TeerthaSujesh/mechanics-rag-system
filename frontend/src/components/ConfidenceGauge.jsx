import React from 'react'

// Shared tiering so the gauge and the reference-card badge always agree.
// Green >= 80%, yellow 60-79%, red < 60%.
export function confidenceTier(value = 0) {
  const pct = Math.max(0, Math.min(1, value))
  if (pct >= 0.8) return { pct, level: 'high', label: 'HIGH CONFIDENCE', color: '#2F8F5B' }
  if (pct >= 0.6) return { pct, level: 'moderate', label: 'MODERATE CONFIDENCE', color: '#C98A1D' }
  return { pct, level: 'low', label: 'LOW CONFIDENCE', color: '#B33F32' }
}

// A protractor reads angles; here it reads retrieval confidence.
// 0% sits at the left tick (180°), 100% at the right tick (0°).
export default function ConfidenceGauge({ value = 0 }) {
  const { pct, label, color } = confidenceTier(value)
  const angleDeg = 180 - pct * 180 // needle rotation from horizontal-left

  const ticks = Array.from({ length: 10 }, (_, i) => i * 20) // every 20 degrees

  const cx = 60
  const cy = 62
  const r = 46

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 72" width="180" height="108">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          className="stroke-grid dark:stroke-gridDark"
          strokeWidth="1.5"
        />
        {ticks.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const inner = r - 6
          const x1 = cx - r * Math.cos(rad)
          const y1 = cy - r * Math.sin(rad)
          const x2 = cx - inner * Math.cos(rad)
          const y2 = cy - inner * Math.sin(rad)
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-graphite dark:stroke-graphiteDark"
              strokeWidth="1"
              opacity="0.5"
            />
          )
        })}
        <line
          className="gauge-needle"
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - r + 10}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transform: `rotate(${90 - angleDeg}deg)` }}
        />
        <circle cx={cx} cy={cy} r="3" fill={color} />
        <text x={cx - r - 2} y={cy + 12} fontSize="7" className="fill-graphite dark:fill-graphiteDark" fontFamily="IBM Plex Mono">0</text>
        <text x={cx + r - 6} y={cy + 12} fontSize="7" className="fill-graphite dark:fill-graphiteDark" fontFamily="IBM Plex Mono">100</text>
      </svg>
      <div className="-mt-2 font-mono text-2xl font-medium" style={{ color }}>
        {Math.round(pct * 100)}%
      </div>
      <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono">
        {label}
      </div>
    </div>
  )
}
