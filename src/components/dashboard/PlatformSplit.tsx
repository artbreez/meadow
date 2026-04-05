'use client'
import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { platformData } from '@/lib/data'
import { formatNumber, formatCurrency, formatPercent } from '@/lib/utils'
import type { Platform } from '@/lib/types'

const COLORS: Record<Platform, string> = {
  instagram: '#c084fc',
  tiktok: '#22d3ee',
  youtube: '#f87171',
}

const BG_COLORS: Record<Platform, string> = {
  instagram: 'rgba(192,132,252,0.1)',
  tiktok: 'rgba(34,211,238,0.1)',
  youtube: 'rgba(248,113,113,0.1)',
}

const LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}

const totalReach = platformData.reduce((s, p) => s + p.reach, 0)

const pieData = platformData.map(p => ({
  name: LABELS[p.platform],
  value: p.reach,
  platform: p.platform,
}))

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { platform: Platform } }[] }) => {
  if (!active || !payload?.length) return null
  const p = payload[0]
  const pct = ((p.value / totalReach) * 100).toFixed(1)
  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-strong)',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <p style={{ fontSize: '12px', fontWeight: 600, color: COLORS[p.payload.platform], marginBottom: '4px' }}>
        {p.name}
      </p>
      <p className="tabular-nums" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
        {formatNumber(p.value)} reach
      </p>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0' }}>{pct}% of total</p>
    </div>
  )
}

export function PlatformSplit() {
  const [hovered, setHovered] = useState<Platform | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
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
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
          Platform Split
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
          Reach & spend by channel
        </p>
      </div>

      {/* Donut chart */}
      <div style={{ height: '170px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              onMouseEnter={(_, i) => setHovered(platformData[i].platform)}
              onMouseLeave={() => setHovered(null)}
            >
              {pieData.map((entry, i) => (
                <Cell
                  key={entry.platform}
                  fill={COLORS[platformData[i].platform]}
                  opacity={hovered === null || hovered === platformData[i].platform ? 1 : 0.3}
                  style={{ transition: 'opacity 200ms ease-out', cursor: 'default' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            gap: '0px',
          }}
        >
          <span className="tabular-nums" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.2 }}>
            {formatNumber(totalReach)}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
            TOTAL REACH
          </span>
        </div>
      </div>

      {/* Breakdown list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {platformData.map(p => {
          const pct = (p.reach / totalReach) * 100
          const isHovered = hovered === p.platform
          return (
            <div
              key={p.platform}
              onMouseEnter={() => setHovered(p.platform)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '10px',
                background: isHovered ? BG_COLORS[p.platform] : 'transparent',
                transition: 'background 160ms ease-out',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: COLORS[p.platform],
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: 550, color: 'var(--text-secondary)', flex: 1 }}>
                {LABELS[p.platform]}
              </span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span className="tabular-nums" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {formatPercent(p.er)} ER
                </span>
                <span className="tabular-nums" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '40px', textAlign: 'right' }}>
                  {pct.toFixed(0)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
