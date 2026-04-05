'use client'
import type { KPIStatus, CampaignStatus } from '@/lib/types'

interface BadgeProps {
  status: KPIStatus | CampaignStatus | 'syncing' | 'fresh'
  label?: string
  size?: 'sm' | 'md'
}

const config: Record<string, { bg: string; text: string; dot?: string; label: string }> = {
  'on-track':     { bg: 'rgba(74,222,128,0.1)',    text: '#4ade80', dot: '#4ade80', label: 'On Track' },
  'achieved':     { bg: 'rgba(74,222,128,0.1)',    text: '#4ade80', dot: '#4ade80', label: 'Achieved' },
  'at-risk':      { bg: 'rgba(245,166,35,0.12)',   text: '#f5a623', dot: '#f5a623', label: 'At Risk' },
  'below-target': { bg: 'rgba(255,107,107,0.12)',  text: '#ff6b6b', dot: '#ff6b6b', label: 'Below Target' },
  'pending':      { bg: 'rgba(245,247,250,0.06)',  text: 'rgba(245,247,250,0.44)', dot: 'rgba(245,247,250,0.3)', label: 'Pending' },
  'active':       { bg: 'rgba(216,255,47,0.1)',    text: '#d8ff2f', dot: '#d8ff2f', label: 'Active' },
  'completed':    { bg: 'rgba(74,222,128,0.1)',    text: '#4ade80', dot: '#4ade80', label: 'Completed' },
  'delayed':      { bg: 'rgba(255,107,107,0.12)',  text: '#ff6b6b', dot: '#ff6b6b', label: 'Delayed' },
  'planning':     { bg: 'rgba(125,211,252,0.1)',   text: '#7dd3fc', dot: '#7dd3fc', label: 'Planning' },
  'syncing':      { bg: 'rgba(125,211,252,0.1)',   text: '#7dd3fc', dot: '#7dd3fc', label: 'Syncing' },
  'fresh':        { bg: 'rgba(74,222,128,0.1)',    text: '#4ade80', dot: '#4ade80', label: 'Live' },
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
