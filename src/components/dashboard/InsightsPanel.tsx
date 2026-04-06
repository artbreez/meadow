'use client'
import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import { insights } from '@/lib/data'
import type { InsightItem } from '@/lib/types'

const iconMap: Record<InsightItem['type'], React.ElementType> = {
  positive: TrendingUp,
  warning: AlertTriangle,
  neutral: Zap,
  action: ArrowRight,
}

const colorMap: Record<InsightItem['type'], { icon: string; label: string }> = {
  positive: { icon: 'var(--accent)',  label: 'var(--accent)'  },
  warning:  { icon: 'var(--warning)', label: 'var(--warning)' },
  neutral:  { icon: 'var(--accent)',  label: 'var(--accent)'  },
  action:   { icon: 'var(--accent)',  label: 'var(--accent)'  },
}

export function InsightsPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="rsp-sect"
      style={{ padding: '24px 32px 32px' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
          Insights & Recommendations
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
          Auto-generated · based on current period data
        </p>
      </div>

      <div className="grid-insights">
        {insights.map((item, i) => (
          <InsightCard key={i} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  )
}

function InsightCard({ item, index }: { item: InsightItem; index: number }) {
  const c = colorMap[item.type]
  const Icon = iconMap[item.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.55 + index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        cursor: 'default',
        transition: 'box-shadow 180ms ease-out',
      }}
    >
      {/* Type label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Icon size={12} style={{ color: c.icon }} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: c.label, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
          {item.label}
        </span>
      </div>

      {/* Title */}
      <div>
        <p style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: '0 0 3px' }}>
          {item.title}
        </p>
        {item.value && (
          <p className="tabular-nums" style={{ fontSize: '13px', fontWeight: 700, color: c.icon, margin: '0 0 5px' }}>
            {item.value}
          </p>
        )}
        {item.note && (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            {item.note}
          </p>
        )}
      </div>
    </motion.div>
  )
}
