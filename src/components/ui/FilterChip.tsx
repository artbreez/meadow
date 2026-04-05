'use client'
import { ChevronDown } from 'lucide-react'

interface FilterChipProps {
  label: string
  value?: string
  active?: boolean
  onClick?: () => void
  dropdown?: boolean
}

export function FilterChip({ label, value, active, onClick, dropdown = true }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '6px 11px',
        borderRadius: '9px',
        background: active ? 'var(--accent-glow)' : 'var(--bg-card)',
        border: `1px solid ${active ? 'rgba(216,255,47,0.3)' : 'var(--border)'}`,
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 180ms ease-out',
        outline: 'none',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        boxShadow: active ? '0 0 10px var(--accent-glow)' : 'none',
      }}
    >
      <span style={{ color: active ? 'var(--accent-soft)' : 'var(--text-muted)', fontSize: '11px', fontWeight: 500 }}>
        {label}
      </span>
      {value && (
        <span style={{ color: active ? 'var(--accent)' : 'var(--text-primary)', fontWeight: 600 }}>
          {value}
        </span>
      )}
      {dropdown && (
        <ChevronDown
          size={12}
          style={{
            color: active ? 'var(--accent)' : 'var(--text-muted)',
            marginLeft: '1px',
          }}
        />
      )}
    </button>
  )
}
