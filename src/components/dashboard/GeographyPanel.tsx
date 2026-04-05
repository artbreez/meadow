'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { geographyData } from '@/lib/data'
import { formatNumber, formatPercent } from '@/lib/utils'

const maxReach = geographyData[0].reach

export function GeographyPanel() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
          Geography
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
          Reach distribution by market
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {geographyData.map((g, i) => {
          const pct = (g.reach / maxReach) * 100
          const isTop = i === 0
          return (
            <div
              key={g.code}
              onMouseEnter={() => setHovered(g.code)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '9px 10px',
                borderRadius: '10px',
                background: hovered === g.code ? 'var(--bg-elevated)' : 'transparent',
                transition: 'background 160ms ease-out',
                cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                {/* Flag / code */}
                <span
                  style={{
                    width: '26px',
                    height: '18px',
                    borderRadius: '4px',
                    background: isTop ? 'var(--accent-glow)' : 'var(--bg-elevated)',
                    border: `1px solid ${isTop ? 'rgba(216,255,47,0.25)' : 'var(--border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: 700,
                    color: isTop ? 'var(--accent)' : 'var(--text-muted)',
                    letterSpacing: '0.03em',
                    flexShrink: 0,
                  }}
                >
                  {g.code}
                </span>

                <span style={{ fontSize: '13px', fontWeight: 550, color: 'var(--text-secondary)', flex: 1 }}>
                  {g.country}
                </span>

                <span className="tabular-nums" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {formatPercent(g.er)} ER
                </span>

                <span className="tabular-nums" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '48px', textAlign: 'right' }}>
                  {formatNumber(g.reach)}
                </span>

                <TrendIndicator trend={g.trend} />
              </div>

              {/* Bar */}
              <div
                style={{
                  height: '3px',
                  borderRadius: '2px',
                  background: 'var(--bg-elevated)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    height: '100%',
                    borderRadius: '2px',
                    background: isTop
                      ? 'var(--accent)'
                      : `rgba(245,247,250,${0.35 - i * 0.04})`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function TrendIndicator({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') return <TrendingUp size={12} style={{ color: '#4ade80', flexShrink: 0 }} />
  if (trend === 'down') return <TrendingDown size={12} style={{ color: '#ff6b6b', flexShrink: 0 }} />
  return <Minus size={12} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
}
