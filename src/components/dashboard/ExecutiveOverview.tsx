'use client'
import { motion } from 'framer-motion'
import { DollarSign, Radio, Zap, Users, Activity } from 'lucide-react'
import { MetricCard } from './MetricCard'
import { summaryMetrics } from '@/lib/data'
import { formatCurrency, formatNumber, formatPercent, formatDelta } from '@/lib/utils'

const spendDelta = formatDelta(summaryMetrics.totalSpend, summaryMetrics.prevTotalSpend)
const reachDelta = formatDelta(summaryMetrics.totalReach, summaryMetrics.prevTotalReach)
const erDelta = formatDelta(summaryMetrics.avgER, summaryMetrics.prevAvgER)
const creatorDelta = formatDelta(summaryMetrics.totalCreators, summaryMetrics.prevCreators)

export function ExecutiveOverview() {
  return (
    <section className="rsp-sect" style={{ padding: '28px 32px 0' }}>
      {/* Metrics grid */}
      <div className="grid-metrics">
        <MetricCard
          index={0}
          label="Total Spend"
          value={formatCurrency(summaryMetrics.totalSpend)}
          delta={spendDelta.value}
          deltaPositive={spendDelta.positive}
          note="vs prior period"
          icon={<DollarSign size={14} />}
        />
        <MetricCard
          index={1}
          label="Total Reach"
          value={formatNumber(summaryMetrics.totalReach)}
          delta={reachDelta.value}
          deltaPositive={reachDelta.positive}
          note="vs plan"
          accent
          icon={<Radio size={14} />}
        />
        <MetricCard
          index={2}
          label="Avg ER"
          value={formatPercent(summaryMetrics.avgER)}
          delta={erDelta.value}
          deltaPositive={erDelta.positive}
          note="vs prior period"
          icon={<Zap size={14} />}
        />
        <MetricCard
          index={3}
          label="Total Creators"
          value={summaryMetrics.totalCreators.toString()}
          delta={creatorDelta.value}
          deltaPositive={creatorDelta.positive}
          note="across campaigns"
          icon={<Users size={14} />}
        />
        <MetricCard
          index={4}
          label="Active Campaigns"
          value={summaryMetrics.activeCampaigns.toString()}
          note="of 5 total"
          icon={<Activity size={14} />}
        />
      </div>

      {/* Insight strip */}
      <InsightStrip />
    </section>
  )
}

function InsightStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="insight-strip"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '14px 20px',
      }}
    >
      {/* AI tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 9px',
          borderRadius: '6px',
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-ring)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--accent)',
          }}
          className="animate-pulse-soft"
        />
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em' }}>
          SNAPSHOT
        </span>
      </div>

      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1, margin: 0 }}>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>3 campaigns are active.</span>{' '}
        Reach is{' '}
        <span style={{ color: 'var(--success)', fontWeight: 600 }}>14% above plan</span>
        , led by Spring Skincare Launch at 48.2M. Back to Routine is{' '}
        <span style={{ color: 'var(--warning)', fontWeight: 600 }}>below ER target</span>{' '}
        — only 62% of creators have posted.{' '}
        <span style={{ color: 'var(--text-muted)' }}>TikTok metrics syncing — final numbers may shift.</span>
      </p>

      <div className="insight-strip-stats">
        <Stat label="On Track" value="2" color="var(--success)" />
        <Stat label="At Risk" value="1" color="var(--warning)" />
        <Stat label="Completed" value="1" color="var(--text-muted)" />
      </div>
    </motion.div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', alignItems: 'center' }}>
      <span
        className="tabular-nums"
        style={{ fontSize: '18px', fontWeight: 700, color, letterSpacing: '-0.03em', lineHeight: 1.2 }}
      >
        {value}
      </span>
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
    </div>
  )
}
