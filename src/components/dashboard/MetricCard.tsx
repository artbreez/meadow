'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
  note?: string
  accent?: boolean
  index?: number
  icon?: React.ReactNode
}

export function MetricCard({ label, value, delta, deltaPositive, note, accent, index = 0, icon }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: accent ? 'rgba(216,255,47,0.04)' : 'var(--bg-card)',
        border: `1px solid ${accent ? 'rgba(216,255,47,0.18)' : 'var(--border)'}`,
        borderRadius: '18px',
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'all 200ms ease-out',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{
        background: accent
          ? 'rgba(216,255,47,0.07)'
          : 'rgba(255,255,255,0.02)',
        borderColor: accent ? 'rgba(216,255,47,0.28)' : 'rgba(255,255,255,0.1)',
        y: -1,
        transition: { duration: 0.15 },
      }}
    >
      {/* Subtle glow for accent cards */}
      {accent && (
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'var(--accent-glow)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--text-muted)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        {icon && (
          <span style={{ color: accent ? 'var(--accent)' : 'var(--text-faint)', opacity: 0.7 }}>
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <div
        className="tabular-nums"
        style={{
          fontSize: '36px',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: accent ? 'var(--accent)' : 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {/* Delta + note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {delta && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '12px',
              fontWeight: 600,
              color: deltaPositive ? '#4ade80' : '#ff6b6b',
              background: deltaPositive ? 'rgba(74,222,128,0.1)' : 'rgba(255,107,107,0.1)',
              padding: '2px 7px',
              borderRadius: '5px',
            }}
          >
            {deltaPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {delta}
          </span>
        )}
        {note && (
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>
            {note}
          </span>
        )}
      </div>
    </motion.div>
  )
}
