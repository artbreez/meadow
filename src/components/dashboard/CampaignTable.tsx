'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, ChevronRight } from 'lucide-react'
import { campaigns } from '@/lib/data'
import { Badge } from '@/components/ui/Badge'
import { PlatformChip } from '@/components/ui/PlatformChip'
import { formatNumber, formatCurrency, formatPercent } from '@/lib/utils'

type SortKey = 'name' | 'reach' | 'er' | 'spent' | 'cpm' | 'creators'

const COLS: { key: SortKey; label: string; align: 'left' | 'right' }[] = [
  { key: 'name', label: 'Campaign', align: 'left' },
  { key: 'spent', label: 'Spend', align: 'right' },
  { key: 'creators', label: 'Creators', align: 'right' },
  { key: 'reach', label: 'Reach', align: 'right' },
  { key: 'er', label: 'Avg ER', align: 'right' },
  { key: 'cpm', label: 'CPM', align: 'right' },
]

export function CampaignTable() {
  const [sortKey, setSortKey] = useState<SortKey>('reach')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [hovered, setHovered] = useState<string | null>(null)

  const sorted = [...campaigns].sort((a, b) => {
    const av = a[sortKey] as number | string
    const bv = b[sortKey] as number | string
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number)
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ padding: '24px 32px 0' }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        {/* Table header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px 14px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 650, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Campaigns
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
              All campaigns · Jan – Mar 2025
            </p>
          </div>
        </div>

        {/* Column headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2.2fr 1fr 0.8fr 1.1fr 0.8fr 0.8fr 1fr 100px',
            padding: '0 24px',
            borderBottom: '1px solid var(--border)',
            gap: '0',
          }}
        >
          <ColHeader label="Campaign" sortKey="name" currentKey={sortKey} dir={sortDir} onSort={handleSort} align="left" />
          <ColHeader label="Period" sortKey={null} currentKey={sortKey} dir={sortDir} onSort={handleSort} align="left" />
          <ColHeader label="Spend" sortKey="spent" currentKey={sortKey} dir={sortDir} onSort={handleSort} align="right" />
          <ColHeader label="Platforms" sortKey={null} currentKey={sortKey} dir={sortDir} onSort={handleSort} align="left" />
          <ColHeader label="Creators" sortKey="creators" currentKey={sortKey} dir={sortDir} onSort={handleSort} align="right" />
          <ColHeader label="Reach" sortKey="reach" currentKey={sortKey} dir={sortDir} onSort={handleSort} align="right" />
          <ColHeader label="ER · CPM" sortKey="er" currentKey={sortKey} dir={sortDir} onSort={handleSort} align="right" />
          <ColHeader label="Status" sortKey={null} currentKey={sortKey} dir={sortDir} onSort={handleSort} align="left" />
        </div>

        {/* Rows */}
        {sorted.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.45 + i * 0.04 }}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: '2.2fr 1fr 0.8fr 1.1fr 0.8fr 0.8fr 1fr 100px',
              padding: '0 24px',
              borderBottom: i < sorted.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              alignItems: 'center',
              gap: '0',
              background: hovered === c.id ? 'rgba(255,255,255,0.015)' : 'transparent',
              transition: 'background 160ms ease-out',
              cursor: 'default',
            }}
          >
            {/* Campaign name */}
            <Cell>
              <div style={{ paddingBlock: '14px' }}>
                <div
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 650,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.015em',
                    marginBottom: '2px',
                  }}
                >
                  {c.name}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 400 }}>
                  {c.brand} · {c.product}
                </div>
              </div>
            </Cell>

            {/* Period */}
            <Cell>
              <span className="tabular-nums" style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                {c.period.start}–{c.period.end}
              </span>
            </Cell>

            {/* Spend */}
            <Cell align="right">
              <div>
                <div className="tabular-nums" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {c.spent > 0 ? formatCurrency(c.spent) : '—'}
                </div>
                <div className="tabular-nums" style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                  of {formatCurrency(c.budget)}
                </div>
              </div>
            </Cell>

            {/* Platforms */}
            <Cell>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {c.platforms.map(p => (
                  <PlatformChip key={p} platform={p} size="sm" showLabel={false} />
                ))}
              </div>
            </Cell>

            {/* Creators */}
            <Cell align="right">
              <span className="tabular-nums" style={{ fontSize: '13px', fontWeight: 600, color: c.creators > 0 ? 'var(--text-secondary)' : 'var(--text-faint)' }}>
                {c.creators > 0 ? c.creators : '—'}
              </span>
            </Cell>

            {/* Reach */}
            <Cell align="right">
              <div>
                <div className="tabular-nums" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {c.reach > 0 ? formatNumber(c.reach) : '—'}
                </div>
                {c.reachTarget > 0 && c.reach > 0 && (
                  <div
                    className="tabular-nums"
                    style={{
                      fontSize: '11px',
                      color: c.reach >= c.reachTarget ? '#4ade80' : '#f5a623',
                    }}
                  >
                    {c.reach >= c.reachTarget ? '+' : ''}
                    {(((c.reach - c.reachTarget) / c.reachTarget) * 100).toFixed(0)}% vs plan
                  </div>
                )}
              </div>
            </Cell>

            {/* ER · CPM */}
            <Cell align="right">
              <div>
                <div className="tabular-nums" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {c.er > 0 ? formatPercent(c.er) : '—'}
                </div>
                <div className="tabular-nums" style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                  {c.cpm > 0 ? `$${c.cpm.toFixed(2)} CPM` : '—'}
                </div>
              </div>
            </Cell>

            {/* Status + action */}
            <Cell>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge status={c.status} size="sm" />
                <motion.button
                  initial={false}
                  animate={{
                    opacity: hovered === c.id ? 1 : 0,
                    x: hovered === c.id ? 0 : -4,
                  }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(216,255,47,0.08)',
                    border: '1px solid rgba(216,255,47,0.2)',
                    color: 'var(--accent)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    outline: 'none',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    pointerEvents: hovered === c.id ? 'auto' : 'none',
                  }}
                >
                  View
                  <ChevronRight size={10} />
                </motion.button>
              </div>
            </Cell>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function Cell({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        paddingBlock: '12px',
        paddingInline: '6px',
      }}
    >
      {children}
    </div>
  )
}

function ColHeader({
  label, sortKey, currentKey, dir, onSort, align,
}: {
  label: string
  sortKey: SortKey | null
  currentKey: SortKey
  dir: 'asc' | 'desc'
  onSort: (k: SortKey) => void
  align: 'left' | 'right'
}) {
  const active = sortKey === currentKey
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        padding: '10px 6px',
        gap: '4px',
        cursor: sortKey ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      onClick={() => sortKey && onSort(sortKey)}
    >
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: active ? 'var(--text-secondary)' : hovered && sortKey ? 'var(--text-muted)' : 'var(--text-faint)',
          transition: 'color 140ms ease-out',
        }}
      >
        {label}
      </span>
      {sortKey && (
        <ArrowUpDown
          size={10}
          style={{
            color: active ? 'var(--accent)' : hovered ? 'var(--text-muted)' : 'var(--text-faint)',
            transition: 'color 140ms ease-out',
          }}
        />
      )}
    </div>
  )
}
