'use client'
import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { platformData } from '@/lib/data'
import { formatNumber, formatPercent } from '@/lib/utils'
import { useMouseGlow } from '@/lib/useMouseGlow'
import type { Platform } from '@/lib/types'

const LABELS: Record<Platform, string> = { instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' }
const totalReach = platformData.reduce((s, p) => s + p.reach, 0)

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { platform: Platform } }[] }) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  const pct = ((p.value / totalReach) * 100).toFixed(1)
  return (
    <div style={{ background: 'var(--chart-tooltip-bg)', border: '1px solid var(--chart-tooltip-border)', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--platform-' + p.payload.platform.slice(0,2) + ')', marginBottom: '4px' }}>{p.name}</p>
      <p className="tabular-nums" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>{formatNumber(p.value)} reach</p>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0' }}>{pct}% of total</p>
    </div>
  )
}

const PLATFORM_VARS: Record<Platform, { color: string; bg: string }> = {
  instagram: { color: 'var(--platform-ig)', bg: 'var(--platform-ig-bg)' },
  tiktok:    { color: 'var(--platform-tt)', bg: 'var(--platform-tt-bg)' },
  youtube:   { color: 'var(--platform-yt)', bg: 'var(--platform-yt-bg)' },
}

// Recharts needs resolved colors — we read them from CSS at runtime
function usePlatformColors() {
  if (typeof window === 'undefined') {
    return { instagram: '#c084fc', tiktok: '#22d3ee', youtube: '#f87171' }
  }
  const root = document.documentElement
  const get = (v: string) => getComputedStyle(root).getPropertyValue(v).trim()
  return {
    instagram: get('--platform-ig') || '#c084fc',
    tiktok:    get('--platform-tt') || '#22d3ee',
    youtube:   get('--platform-yt') || '#f87171',
  }
}

export function PlatformSplit() {
  const [hovered, setHovered] = useState<Platform | null>(null)
  const [, forceUpdate] = useState(0)
  const pieColors = usePlatformColors()

  const pieData = platformData.map(p => ({ name: LABELS[p.platform], value: p.reach, platform: p.platform }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>Platform Split</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>Reach & spend by channel</p>
      </div>

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
                  fill={pieColors[platformData[i].platform as Platform]}
                  opacity={hovered === null || hovered === platformData[i].platform ? 1 : 0.25}
                  style={{ transition: 'opacity 200ms ease-out', cursor: 'default' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', gap: '0px' }}>
          <span className="tabular-nums" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.2 }}>{formatNumber(totalReach)}</span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>TOTAL REACH</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {platformData.map(p => {
          const pct = (p.reach / totalReach) * 100
          const c = PLATFORM_VARS[p.platform]
          const isHov = hovered === p.platform
          return (
            <div
              key={p.platform}
              onMouseEnter={() => setHovered(p.platform)}
              onMouseLeave={() => setHovered(null)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', background: isHov ? c.bg : 'transparent', transition: 'background 160ms ease-out', cursor: 'default' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: c.color, flexShrink: 0 }} />
              <span style={{ fontSize: '13px', fontWeight: 550, color: 'var(--text-secondary)', flex: 1 }}>{LABELS[p.platform]}</span>
              <span className="tabular-nums" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatPercent(p.er)} ER</span>
              <span className="tabular-nums" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '40px', textAlign: 'right' }}>{pct.toFixed(0)}%</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
