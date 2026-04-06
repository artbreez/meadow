'use client'
import { useState } from 'react'
import { DropdownSection, DropdownItem, DropdownLabel } from './DropdownPanel'

function ApplyButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginTop: '2px',
        padding: '7px 12px',
        borderRadius: '8px',
        background: hovered ? 'var(--accent-soft)' : 'var(--accent)',
        border: 'none',
        color: '#0a0a0a',
        fontSize: '12.5px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 130ms ease-out, box-shadow 130ms ease-out',
        boxShadow: hovered ? '0 0 14px var(--accent-glow-strong)' : 'none',
        width: '100%',
      }}
    >
      Apply range
    </button>
  )
}

const PRESETS = [
  { label: 'Last 7 days', value: 'last-7' },
  { label: 'Last 30 days', value: 'last-30' },
  { label: 'Last 90 days', value: 'last-90' },
  { label: 'This quarter', value: 'this-q' },
  { label: 'Q1 2025', value: 'q1-2025' },
  { label: 'Last 6 months', value: 'last-6m' },
  { label: 'Year to date', value: 'ytd' },
  { label: 'All time', value: 'all' },
]

interface DateRangeDropdownProps {
  selected: string
  onSelect: (value: string, label: string) => void
}

export function DateRangeDropdown({ selected, onSelect }: DateRangeDropdownProps) {
  const [fromVal, setFromVal] = useState('2025-01-01')
  const [toVal, setToVal] = useState('2025-03-31')

  return (
    <div>
      <DropdownSection>
        <DropdownLabel>Quick ranges</DropdownLabel>
        {PRESETS.map(p => (
          <DropdownItem
            key={p.value}
            label={p.label}
            selected={selected === p.value}
            onClick={() => onSelect(p.value, p.label)}
          />
        ))}
      </DropdownSection>

      <DropdownSection border={false}>
        <DropdownLabel>Custom range</DropdownLabel>
        <div style={{ padding: '4px 10px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-faint)', fontWeight: 500 }}>From</label>
            <input
              type="date"
              value={fromVal}
              onChange={e => setFromVal(e.target.value)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '7px',
                padding: '5px 8px',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                outline: 'none',
                fontFamily: 'inherit',
                width: '100%',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-faint)', fontWeight: 500 }}>To</label>
            <input
              type="date"
              value={toVal}
              onChange={e => setToVal(e.target.value)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '7px',
                padding: '5px 8px',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                outline: 'none',
                fontFamily: 'inherit',
                width: '100%',
              }}
            />
          </div>
          <ApplyButton onClick={() => onSelect('custom', `${fromVal} – ${toVal}`)} />
        </div>
      </DropdownSection>
    </div>
  )
}
