'use client'
import { useRef, useState } from 'react'
import { RefreshCw, Clock, Wifi, ChevronDown, X } from 'lucide-react'
import { DropdownPanel } from '@/components/ui/DropdownPanel'
import { FilterDropdown, FilterOption } from '@/components/ui/FilterDropdown'

// ── Filter option sets ────────────────────────────────────────────────────────

const BRAND_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Brands', count: 5 },
  { value: 'glow', label: 'Glow Essentials', count: 2 },
  { value: 'nutri', label: 'NutriCore', count: 2 },
  { value: 'wander', label: 'Wanderlust', count: 1 },
]

const PLATFORM_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Platforms', count: 5 },
  { value: 'instagram', label: 'Instagram', count: 4 },
  { value: 'tiktok', label: 'TikTok', count: 3 },
  { value: 'youtube', label: 'YouTube', count: 3 },
]

const STATUS_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Status', count: 5 },
  { value: 'active', label: 'Active', count: 3 },
  { value: 'at-risk', label: 'At Risk', count: 1 },
  { value: 'completed', label: 'Completed', count: 1 },
  { value: 'planning', label: 'Planning', count: 1 },
]

const GEO_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Markets', count: 6 },
  { value: 'us', label: 'United States', count: 5 },
  { value: 'uk', label: 'United Kingdom', count: 3 },
  { value: 'ca', label: 'Canada', count: 3 },
  { value: 'au', label: 'Australia', count: 3 },
  { value: 'de', label: 'Germany', count: 2 },
  { value: 'fr', label: 'France', count: 1 },
]

const PRODUCT_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Products' },
  { value: 'hydra', label: 'Hydra Serum', group: 'Glow Essentials' },
  { value: 'clarify', label: 'Clarify Toner', group: 'Glow Essentials' },
  { value: 'spf', label: 'Daily SPF', group: 'Glow Essentials' },
  { value: 'protein', label: 'Protein Blend', group: 'NutriCore' },
  { value: 'greens', label: 'Greens Complex', group: 'NutriCore' },
  { value: 'sleep', label: 'Sleep Formula', group: 'NutriCore' },
  { value: 'travel', label: 'Travel Kit', group: 'Wanderlust' },
  { value: 'sun', label: 'Sun Collection', group: 'Wanderlust' },
]

// ── Component ─────────────────────────────────────────────────────────────────

type FilterKey = 'brand' | 'platform' | 'status' | 'geo' | 'product'

interface FilterState {
  brand: string
  platform: string
  status: string
  geo: string
  product: string
}

const FILTER_LABELS: Record<FilterKey, Record<string, string>> = {
  brand: Object.fromEntries(BRAND_OPTIONS.map(o => [o.value, o.label])),
  platform: Object.fromEntries(PLATFORM_OPTIONS.map(o => [o.value, o.label])),
  status: Object.fromEntries(STATUS_OPTIONS.map(o => [o.value, o.label])),
  geo: Object.fromEntries(GEO_OPTIONS.map(o => [o.value, o.label])),
  product: Object.fromEntries(PRODUCT_OPTIONS.map(o => [o.value, o.label])),
}

export function PageIntro() {
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    brand: 'all',
    platform: 'all',
    status: 'all',
    geo: 'all',
    product: 'all',
  })

  const brandRef = useRef<HTMLButtonElement>(null)
  const platformRef = useRef<HTMLButtonElement>(null)
  const statusRef = useRef<HTMLButtonElement>(null)
  const geoRef = useRef<HTMLButtonElement>(null)
  const productRef = useRef<HTMLButtonElement>(null)

  const refs: Record<FilterKey, React.RefObject<HTMLButtonElement | null>> = {
    brand: brandRef,
    platform: platformRef,
    status: statusRef,
    geo: geoRef,
    product: productRef,
  }

  const toggle = (key: FilterKey) => setOpenFilter(p => (p === key ? null : key))
  const close = () => setOpenFilter(null)

  const setFilter = (key: FilterKey, value: string) => {
    setFilters(f => ({ ...f, [key]: value }))
    close()
  }

  const clearFilter = (key: FilterKey, e: React.MouseEvent) => {
    e.stopPropagation()
    setFilters(f => ({ ...f, [key]: 'all' }))
  }

  const activeCount = Object.values(filters).filter(v => v !== 'all').length

  const chipLabel = (key: FilterKey): { prefix: string; value: string | null } => {
    const prefixMap: Record<FilterKey, string> = {
      brand: 'Brand', platform: 'Platform', status: 'Status', geo: 'Market', product: 'Product',
    }
    const v = filters[key]
    return {
      prefix: prefixMap[key],
      value: v === 'all' ? null : FILTER_LABELS[key][v] ?? v,
    }
  }

  return (
    <div
      className="rsp-pad"
      style={{
        paddingInline: '32px',
        paddingTop: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '16px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1
            className="page-title"
            style={{
              fontSize: '26px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '5px',
            }}
          >
            Client Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400, lineHeight: 1.5 }}>
            Overview of influencer placements, campaign performance, and spend efficiency.
          </p>
        </div>

        {/* Status badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
          <StatusChip>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Period</span>
            <span style={{ fontWeight: 600 }}>Jan 1 – Mar 31, 2025</span>
          </StatusChip>
          <StatusChip>
            <Clock size={11} style={{ color: 'var(--text-muted)' }} />
            <span>Updated 2h ago</span>
          </StatusChip>
          <StatusChip color="cyan">
            <RefreshCw size={11} className="animate-spin-slow" />
            <span>TikTok syncing</span>
          </StatusChip>
          <StatusChip color="red">
            <Wifi size={11} />
            <span>YT stats may lag 6h</span>
          </StatusChip>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'], paddingBottom: '2px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-faint)', marginRight: '4px', fontWeight: 500 }}>
          Filters
        </span>

        {(Object.keys(refs) as FilterKey[]).map(key => {
          const { prefix, value } = chipLabel(key)
          const isActive = value !== null
          const isOpen = openFilter === key

          return (
            <FilterChipButton
              key={key}
              ref={refs[key]}
              prefix={prefix}
              value={value}
              active={isActive}
              open={isOpen}
              onClick={() => toggle(key)}
              onClear={isActive ? (e) => clearFilter(key, e) : undefined}
            />
          )
        })}

        {activeCount > 0 && (
          <button
            onClick={() => setFilters({ brand: 'all', platform: 'all', status: 'all', geo: 'all', product: 'all' })}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-faint)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'color 140ms ease-out',
              marginLeft: '2px',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      <DropdownPanel isOpen={openFilter === 'brand'} onClose={close} anchorRef={brandRef} width={210}>
        <FilterDropdown options={BRAND_OPTIONS} selected={filters.brand} onSelect={v => setFilter('brand', v)} />
      </DropdownPanel>

      <DropdownPanel isOpen={openFilter === 'platform'} onClose={close} anchorRef={platformRef} width={200}>
        <FilterDropdown options={PLATFORM_OPTIONS} selected={filters.platform} onSelect={v => setFilter('platform', v)} />
      </DropdownPanel>

      <DropdownPanel isOpen={openFilter === 'status'} onClose={close} anchorRef={statusRef} width={200}>
        <FilterDropdown options={STATUS_OPTIONS} selected={filters.status} onSelect={v => setFilter('status', v)} />
      </DropdownPanel>

      <DropdownPanel isOpen={openFilter === 'geo'} onClose={close} anchorRef={geoRef} width={210} >
        <FilterDropdown options={GEO_OPTIONS} selected={filters.geo} onSelect={v => setFilter('geo', v)} searchable />
      </DropdownPanel>

      <DropdownPanel isOpen={openFilter === 'product'} onClose={close} anchorRef={productRef} width={220}>
        <FilterDropdown
          options={PRODUCT_OPTIONS}
          selected={filters.product}
          onSelect={v => setFilter('product', v)}
          grouped
          searchable
        />
      </DropdownPanel>
    </div>
  )
}

// ── Primitives ────────────────────────────────────────────────────────────────

import React from 'react'

const FilterChipButton = React.forwardRef<
  HTMLButtonElement,
  {
    prefix: string
    value: string | null
    active: boolean
    open: boolean
    onClick: () => void
    onClear?: (e: React.MouseEvent) => void
  }
>(({ prefix, value, active, open, onClick, onClear }, ref) => {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '6px 10px',
        paddingRight: onClear ? '7px' : '10px',
        borderRadius: '9px',
        background: open
          ? 'var(--accent-fill)'
          : active
          ? 'var(--accent-dim)'
          : hovered
          ? 'var(--bg-hover)'
          : 'var(--bg-card)',
        border: `1px solid ${
          open
            ? 'var(--accent-ring-focus)'
            : active
            ? 'var(--accent-ring)'
            : hovered
            ? 'var(--border-strong)'
            : 'var(--border)'
        }`,
        color: open || active ? 'var(--accent)' : hovered ? '#f5f7fa' : 'var(--text-secondary)',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        transition: 'background 130ms ease-out, border-color 130ms ease-out, color 130ms ease-out, box-shadow 130ms ease-out',
        boxShadow: 'none',
        transform: 'none',
      }}
    >
      <span style={{
        color: open || active ? 'var(--accent)' : 'var(--text-muted)',
        fontSize: '11px',
        fontWeight: 500,
        transition: 'color 130ms ease-out',
      }}>
        {prefix}
      </span>
      {value && (
        <span style={{ color: open || active ? 'var(--accent)' : 'var(--text-primary)', fontWeight: 600 }}>
          {value}
        </span>
      )}
      {onClear ? (
        <span
          onClick={onClear}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '14px',
            height: '14px',
            borderRadius: '3px',
            background: 'var(--accent-ring)',
            cursor: 'pointer',
            marginLeft: '1px',
            transition: 'background 120ms ease-out',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-ring-focus)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-ring)'
          }}
        >
          <X size={9} style={{ color: 'var(--accent)' }} />
        </span>
      ) : (
        <ChevronDown
          size={12}
          style={{
            color: open || active ? 'var(--accent)' : hovered ? 'var(--text-secondary)' : 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 180ms ease-out, color 130ms ease-out',
          }}
        />
      )}
    </button>
  )
})
FilterChipButton.displayName = 'FilterChipButton'

function StatusChip({
  children,
  color,
}: {
  children: React.ReactNode
  color?: 'cyan' | 'red'
}) {
  const styles = {
    cyan: { bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.15)', text: '#22d3ee' },
    red: { bg: 'rgba(248,113,113,0.06)', border: 'rgba(248,113,113,0.15)', text: '#f87171' },
  }
  const c = color ? styles[color] : null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 10px',
        borderRadius: '9px',
        background: c ? c.bg : 'var(--bg-card)',
        border: `1px solid ${c ? c.border : 'var(--border)'}`,
        fontSize: '12px',
        color: c ? c.text : 'var(--text-muted)',
        fontWeight: 450,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  )
}
