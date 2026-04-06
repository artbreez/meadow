'use client'
import type { KPIStatus, CampaignStatus } from '@/lib/types'

interface BadgeProps {
  status: KPIStatus | CampaignStatus | 'syncing' | 'fresh'
  label?: string
  size?: 'sm' | 'md'
}

const config: Record<string, { bg: string; text: string; dot?: string; label: string }> = {
  'on-track':     { bg: 'var(--success-bg)', text: 'var(--success)', dot: 'var(--success)', label: 'On Track' },
  'achieved':     { bg: 'var(--success-bg)', text: 'var(--success)', dot: 'var(--success)', label: 'Achieved' },
  'at-risk':      { bg: 'var(--warning-bg)', text: 'var(--warning)', dot: 'var(--warning)', label: 'At Risk' },
  'below-target': { bg: 'var(--danger-bg)',  text: 'var(--danger)',  dot: 'var(--danger)',  label: 'Below Target' },
  'pending':      { bg: 'var(--border)',     text: 'var(--text-muted)', dot: 'var(--text-faint)', label: 'Pending' },
  'active':       { bg: 'var(--accent-dim)', text: 'var(--accent)', dot: 'var(--accent)',   label: 'Active' },
  'completed':    { bg: 'var(--success-bg)', text: 'var(--success)', dot: 'var(--success)', label: 'Completed' },
  'delayed':      { bg: 'var(--danger-bg)',  text: 'var(--danger)',  dot: 'var(--danger)',  label: 'Delayed' },
  'planning':     { bg: 'var(--info-bg)',    text: 'var(--info)',    dot: 'var(--info)',    label: 'Planning' },
  'syncing':      { bg: 'var(--info-bg)',    text: 'var(--info)',    dot: 'var(--info)',    label: 'Syncing' },
  'fresh':        { bg: 'var(--success-bg)', text: 'var(--success)', dot: 'var(--success)', label: 'Live' },
}

export function Badge({ status, label, size = 'md' }: BadgeProps) {
  const c = config[status] ?? config['pending']
  const text = label ?? c.label

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'sm' ? '4px' : '5px',
        padding: size === 'sm' ? '2px 7px' : '3px 9px',
        borderRadius: '6px',
        background: c.bg,
        color: c.text,
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 500,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        lineHeight: 1.6,
      }}
    >
      {c.dot && (
        <span
          style={{
            width: size === 'sm' ? '5px' : '6px',
            height: size === 'sm' ? '5px' : '6px',
            borderRadius: '50%',
            background: c.dot,
            flexShrink: 0,
          }}
        />
      )}
      {text}
    </span>
  )
}
