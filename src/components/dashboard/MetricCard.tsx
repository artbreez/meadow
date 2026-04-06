'use client'
import { useRef, useState, useCallback } from 'react'
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
  const cardRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const glowBg = hovered
    ? `radial-gradient(220px circle at ${mouse.x}px ${mouse.y}px, var(--card-glow-color), transparent 70%), var(--bg-card)`
    : accent
    ? 'var(--bg-card)'
    : 'var(--bg-card)'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: glowBg,
        border: `1px solid ${accent && hovered ? 'var(--accent-ring)' : accent ? 'var(--accent-ring)' : hovered ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: '18px',
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: accent && hovered
          ? '0 0 0 0.5px var(--accent-ring), 0 8px 32px rgba(0,0,0,0.08)'
          : hovered
          ? '0 8px 32px rgba(0,0,0,0.06)'
          : 'none',
      }}
    >
      {/* Ambient accent glow */}
      {accent && (
        <div
          style={{
            position: 'absolute',
            top: '-24px',
            right: '-24px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--accent-glow)',
            filter: 'blur(28px)',
            pointerEvents: 'none',
            opacity: hovered ? 1.2 : 0.8,
            transition: 'opacity 200ms ease-out',
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
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        {icon && (
          <span style={{ color: accent ? 'var(--accent)' : 'var(--text-faint)', opacity: 0.8 }}>
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
              color: deltaPositive ? 'var(--success)' : 'var(--danger)',
              background: deltaPositive ? 'var(--success-bg)' : 'var(--danger-bg)',
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
