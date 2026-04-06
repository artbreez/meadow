'use client'
import { useState } from 'react'
import { DropdownSearch, DropdownItem, DropdownLabel, DropdownSection } from './DropdownPanel'

export interface FilterOption {
  value: string
  label: string
  count?: number
  color?: string
  group?: string
}

interface FilterDropdownProps {
  options: FilterOption[]
  selected: string
  onSelect: (value: string) => void
  searchable?: boolean
  grouped?: boolean
}

export function FilterDropdown({
  options,
  selected,
  onSelect,
  searchable = false,
  grouped = false,
}: FilterDropdownProps) {
  const [query, setQuery] = useState('')

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  if (grouped) {
    const groups = Array.from(new Set(options.map(o => o.group).filter(Boolean))) as string[]
    const ungrouped = filtered.filter(o => !o.group)
    const groupedItems = groups.map(g => ({
      name: g,
      items: filtered.filter(o => o.group === g),
    }))

    return (
      <div>
        {searchable && (
          <DropdownSearch value={query} onChange={setQuery} placeholder="Search products…" />
        )}
        <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '6px' }}>
          {ungrouped.map(o => (
            <DropdownItem
              key={o.value}
              label={o.label}
              selected={selected === o.value}
              onClick={() => onSelect(o.value)}
              right={
                o.count !== undefined ? (
                  <Count n={o.count} selected={selected === o.value} />
                ) : undefined
              }
            />
          ))}
          {groupedItems.map(g =>
            g.items.length > 0 ? (
              <div key={g.name}>
                <DropdownLabel>{g.name}</DropdownLabel>
                {g.items.map(o => (
                  <DropdownItem
                    key={o.value}
                    label={o.label}
                    selected={selected === o.value}
                    onClick={() => onSelect(o.value)}
                  />
                ))}
              </div>
            ) : null
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {searchable && (
        <DropdownSearch value={query} onChange={setQuery} />
      )}
      <div style={{ padding: '6px', maxHeight: '300px', overflowY: 'auto' }}>
        {filtered.map(o => (
          <DropdownItem
            key={o.value}
            label={o.label}
            selected={selected === o.value}
            onClick={() => onSelect(o.value)}
            right={
              o.count !== undefined ? (
                <Count n={o.count} selected={selected === o.value} />
              ) : undefined
            }
          />
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '10px', textAlign: 'center', fontSize: '12px', color: 'var(--text-faint)' }}>
            No results
          </div>
        )}
      </div>
    </div>
  )
}

function Count({ n, selected }: { n: number; selected: boolean }) {
  return (
    <span
      style={{
        fontSize: '11px',
        fontWeight: 600,
        color: selected ? 'var(--accent)' : 'var(--text-faint)',
        background: selected ? 'var(--accent-dim)' : 'var(--bg-hover)',
        padding: '1px 6px',
        borderRadius: '4px',
        minWidth: '22px',
        textAlign: 'center',
        display: 'inline-block',
      }}
    >
      {n}
    </span>
  )
}
