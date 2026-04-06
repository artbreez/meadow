'use client'
import { motion } from 'framer-motion'
import { campaigns } from '@/lib/data'
import { Badge } from '@/components/ui/Badge'
import { useMouseGlow } from '@/lib/useMouseGlow'
import { PlatformChip } from '@/components/ui/PlatformChip'
import { formatNumber, formatPercent } from '@/lib/utils'
import type { CampaignStatus } from '@/lib/types'

const statusOrder: CampaignStatus[] = ['active', 'at-risk', 'completed', 'planning', 'delayed']

export function CampaignHealth() {
  const sorted = [...campaigns].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Campaign Health
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
            KPI status across all campaigns
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <StatusCount status="active" count={3} />
          <StatusCount status="at-risk" count={1} />
          <StatusCount status="completed" count={1} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {sorted.map((c, i) => (
          <HealthRow key={c.id} campaign={c} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

function StatusCount({ status, count }: { status: CampaignStatus; count: number }) {
  const colors: Partial<Record<CampaignStatus, string>> = {
    active: 'var(--accent)',
    'at-risk': 'var(--warning)',
    completed: 'var(--success)',
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span className="tabular-nums" style={{ fontSize: '13px', fontWeight: 700, color: colors[status] }}>
        {count}
      </span>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{status}</span>
    </div>
  )
}

function HealthRow({ campaign: c, index }: { campaign: typeof campaigns[0]; index: number }) {
  const achievedKpis = c.kpis.filter(k => k.status === 'achieved' || k.status === 'on-track').length
  const totalKpis = c.kpis.length
  const kpiPct = totalKpis > 0 ? (achievedKpis / totalKpis) * 100 : 0

  const reachPct = c.reachTarget > 0 ? Math.min((c.reach / c.reachTarget) * 100, 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: 0.35 + index * 0.05 }}
      whileHover={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--border-strong)',
        transition: { duration: 0.15 },
      }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        borderRadius: '11px',
        background: 'var(--bg-section)',
        border: '1px solid var(--border)',
        cursor: 'default',
      }}
    >
      {/* Left: name + meta */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 650,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {c.name}
          </span>
          <Badge status={c.status} size="sm" />
        </div>

        {/* KPI progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              flex: 1,
              height: '2px',
              borderRadius: '2px',
              background: 'var(--border)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${reachPct}%` }}
              transition={{ duration: 0.7, delay: 0.5 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                height: '100%',
                borderRadius: '2px',
                background:
                  c.status === 'at-risk'
                    ? 'var(--warning-bg)'
                    : c.status === 'completed'
                    ? 'var(--success-bg)'
                    : c.status === 'planning'
                    ? 'var(--border)'
                    : 'var(--accent-ring)',
              }}
            />
          </div>
          <span className="tabular-nums" style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
            {c.status === 'planning' ? '—' : `${reachPct.toFixed(0)}%`}
          </span>
        </div>
      </div>

      {/* Middle: KPIs + stats */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
        <span className="tabular-nums" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {c.status === 'planning' ? 'Planned' : formatNumber(c.reach)}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {c.status === 'planning' ? `target ${formatNumber(c.reachTarget)}` : `of ${formatNumber(c.reachTarget)}`}
        </span>
      </div>

      {/* Right: platforms */}
      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
        {c.platforms.map(p => (
          <PlatformChip key={p} platform={p} size="sm" showLabel={false} />
        ))}
      </div>
    </motion.div>
  )
}
