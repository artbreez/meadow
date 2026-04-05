'use client'
import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import { motion } from 'framer-motion'
import { timeSeries } from '@/lib/data'
import { formatNumber, formatCurrency } from '@/lib/utils'

type Metric = 'reach' | 'spend' | 'engagements'

const metricConfig: Record<Metric, { label: string; color: string; format: (n: number) => string }> = {
  reach: { label: 'Reach', color: '#d8ff2f', format: formatNumber },
  spend: { label: 'Spend', color: 'rgba(125,211,252,0.9)', format: formatCurrency },
  engagements: { label: 'Engagements', color: 'rgba(192,132,252,0.9)', format: formatNumber },
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-strong)',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        minWidth: '160px',
      }}
    >
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', color: entry.color, fontWeight: 500 }}>{entry.name}</span>
          <span className="tabular-nums" style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>
            {metricConfig[entry.name.toLowerCase() as Metric]?.format(entry.value) ?? entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function PerformanceChart() {
  const [active, setActive] = useState<Metric[]>(['reach', 'spend'])

  const toggle = (m: Metric) => {
    setActive(prev =>
      prev.includes(m) ? (prev.length > 1 ? prev.filter(x => x !== m) : prev) : [...prev, m]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Performance over Time
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
            Oct 2024 – Mar 2025 · 6-month view
          </p>
        </div>

        {/* Metric toggles */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {(Object.keys(metricConfig) as Metric[]).map(m => (
            <button
              key={m}
              onClick={() => toggle(m)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '7px',
                background: active.includes(m) ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: `1px solid ${active.includes(m) ? 'var(--border-strong)' : 'transparent'}`,
                color: active.includes(m) ? 'var(--text-secondary)' : 'var(--text-faint)',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'all 160ms ease-out',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: active.includes(m) ? metricConfig[m].color : 'var(--text-faint)',
                  flexShrink: 0,
                }}
              />
              {metricConfig[m].label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeSeries} margin={{ top: 4, right: 0, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d8ff2f" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#d8ff2f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#c084fc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="1 4"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'rgba(245,247,250,0.38)', fontFamily: 'inherit' }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'rgba(245,247,250,0.3)', fontFamily: 'inherit' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => {
                if (active.includes('reach') && v >= 1000000) return `${(v / 1000000).toFixed(0)}M`
                if (active.includes('spend') && v >= 1000) return `$${(v / 1000).toFixed(0)}K`
                return String(v)
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
            {active.includes('reach') && (
              <Area
                type="monotone"
                dataKey="reach"
                name="Reach"
                stroke="#d8ff2f"
                strokeWidth={2}
                fill="url(#reachGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#d8ff2f', strokeWidth: 0 }}
              />
            )}
            {active.includes('spend') && (
              <Area
                type="monotone"
                dataKey="spend"
                name="Spend"
                stroke="rgba(125,211,252,0.8)"
                strokeWidth={1.5}
                fill="url(#spendGrad)"
                dot={false}
                activeDot={{ r: 3, fill: '#7dd3fc', strokeWidth: 0 }}
              />
            )}
            {active.includes('engagements') && (
              <Area
                type="monotone"
                dataKey="engagements"
                name="Engagements"
                stroke="rgba(192,132,252,0.8)"
                strokeWidth={1.5}
                fill="url(#engGrad)"
                dot={false}
                activeDot={{ r: 3, fill: '#c084fc', strokeWidth: 0 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
