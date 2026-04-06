'use client'
import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { timeSeries } from '@/lib/data'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import { useMouseGlow } from '@/lib/useMouseGlow'

type Metric = 'reach' | 'spend' | 'engagements'

interface MetricDef { label: string; color: string; fillStart: string; fillEnd: string; format: (n: number) => string }

function useChartColors() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  return {
    reach:       { label: 'Reach',        color: dark ? '#d8ff2f' : '#4d7a00', fillStart: dark ? 'rgba(216,255,47,0.22)' : 'rgba(77,122,0,0.16)', fillEnd: 'transparent', format: formatNumber },
    spend:       { label: 'Spend',        color: dark ? 'rgba(125,211,252,0.9)' : 'rgba(37,99,235,0.85)', fillStart: dark ? 'rgba(125,211,252,0.16)' : 'rgba(37,99,235,0.09)', fillEnd: 'transparent', format: formatCurrency },
    engagements: { label: 'Engagements', color: dark ? 'rgba(192,132,252,0.9)' : 'rgba(109,40,217,0.85)', fillStart: dark ? 'rgba(192,132,252,0.16)' : 'rgba(109,40,217,0.09)', fillEnd: 'transparent', format: formatNumber },
  } as Record<Metric, MetricDef>
}

function CustomTooltip({ active, payload, label, colors }: {
  active?: boolean
  payload?: { name: string; value: number }[]
  label?: string
  colors: Record<Metric, MetricDef>
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: 'var(--chart-tooltip-bg)',
        border: '1px solid var(--chart-tooltip-border)',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        minWidth: '160px',
      }}
    >
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>{label}</p>
      {payload.map(entry => {
        const key = entry.name.toLowerCase() as Metric
        const def = colors[key]
        return (
          <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: def?.color ?? 'var(--text-muted)', fontWeight: 500 }}>{entry.name}</span>
            <span className="tabular-nums" style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>
              {def?.format(entry.value) ?? entry.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function PerformanceChart() {
  const [active, setActive] = useState<Metric[]>(['reach', 'spend'])
  const colors = useChartColors()
  const { theme } = useTheme()

  const toggle = (m: Metric) =>
    setActive(prev => prev.includes(m) ? (prev.length > 1 ? prev.filter(x => x !== m) : prev) : [...prev, m])

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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Performance over Time
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
            Oct 2024 – Mar 2025 · 6-month view
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(Object.keys(colors) as Metric[]).map(m => (
            <button
              key={m}
              onClick={() => toggle(m)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '7px',
                background: active.includes(m) ? 'var(--bg-elevated)' : 'transparent',
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
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: active.includes(m) ? colors[m].color : 'var(--text-faint)', flexShrink: 0 }} />
              {colors[m].label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeSeries} margin={{ top: 4, right: 0, bottom: 0, left: -10 }}>
            <defs>
              {(Object.keys(colors) as Metric[]).map(m => (
                <linearGradient key={m} id={`grad-${m}-${theme}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors[m].fillStart} />
                  <stop offset="100%" stopColor={colors[m].fillEnd} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="1 4" stroke="var(--chart-grid)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--chart-axis)', fontFamily: 'inherit' }} axisLine={false} tickLine={false} dy={6} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--chart-axis)', fontFamily: 'inherit' }} axisLine={false} tickLine={false}
              tickFormatter={v => active.includes('spend') && !active.includes('reach') ? `$${(v / 1000).toFixed(0)}K` : v >= 1000000 ? `${(v / 1000000).toFixed(0)}M` : String(v)}
            />
            <Tooltip content={<CustomTooltip colors={colors} />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1 }} />
            {(Object.keys(colors) as Metric[]).map(m => active.includes(m) && (
              <Area
                key={m}
                type="monotone"
                dataKey={m}
                name={colors[m].label}
                stroke={colors[m].color}
                strokeWidth={m === 'reach' ? 2 : 1.5}
                fill={`url(#grad-${m}-${theme})`}
                dot={false}
                activeDot={{ r: m === 'reach' ? 4 : 3, fill: colors[m].color, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
