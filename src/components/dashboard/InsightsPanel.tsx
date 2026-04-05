'use client'
import { motion } from 'framer-motion'
import { Sparkles, AlertTriangle, Globe, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import { insights } from '@/lib/data'
import type { InsightItem } from '@/lib/types'

const iconMap: Record<InsightItem['type'], React.ElementType> = {
  positive: TrendingUp,
  warning: AlertTriangle,
  neutral: Zap,
  action: ArrowRight,
}

const colorMap: Record<InsightItem['type'], { border: string; bg: string; icon: string; label: string }> = {
  positive: {
    border: 'rgba(74,222,128,0.2)',
    bg: 'rgba(74,222,128,0.04)',
    icon: '#4ade80',
    label: '#4ade80',
  },
  warning: {
    border: 'rgba(245,166,35,0.2)',
    bg: 'rgba(245,166,35,0.04)',
    icon: '#f5a623',
    label: '#f5a623',
  },
  neutral: {
    border: 'rgba(125,211,252,0.2)',
    bg: 'rgba(125,211,252,0.04)',
    icon: '#7dd3fc',
    label: '#7dd3fc',
  },
  action: {
    border: 'rgba(216,255,47,0.2)',
    bg: 'rgba(216,255,47,0.04)',
    icon: 'var(--accent)',
    label: 'var(--accent)',
  },
}

export function InsightsPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ padding: '24px 32px 32px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Sparkles size={14} style={{ color: 'var(--accent)' }} />
        <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
          Insights & Recommendations
        </h3>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--text-muted)',
            padding: '2px 7px',
            borderRadius: '5px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          Auto-generated
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
        }}
      >
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
        background: c.bg,
        border: `1px solid ${c.border}`,
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
