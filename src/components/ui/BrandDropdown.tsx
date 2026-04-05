'use client'
import { DropdownSection, DropdownItem, DropdownLabel } from './DropdownPanel'
import { brands } from '@/lib/data'

const brandMeta: Record<string, { campaigns: number; active: number }> = {
  glow: { campaigns: 2, active: 2 },
  nutri: { campaigns: 2, active: 1 },
  wander: { campaigns: 1, active: 1 },
}

interface BrandDropdownProps {
  selected: string
  onSelect: (brand: string) => void
}

export function BrandDropdown({ selected, onSelect }: BrandDropdownProps) {
  return (
    <div>
      <DropdownSection>
        <DropdownItem
          label="All Brands"
          sub="5 campaigns"
          selected={selected === 'All Brands'}
          onClick={() => onSelect('All Brands')}
        />
      </DropdownSection>

      <DropdownSection border={false}>
        <DropdownLabel>Brands</DropdownLabel>
        {brands.map(b => {
          const meta = brandMeta[b.id]
          return (
            <DropdownItem
              key={b.id}
              label={b.name}
              sub={`${b.products.join(' · ')}`}
              selected={selected === b.name}
              onClick={() => onSelect(b.name)}
              right={
                <span
                  style={{
                    fontSize: '11px',
                    color: meta.active > 0 ? 'var(--accent)' : 'var(--text-faint)',
                    background: meta.active > 0 ? 'var(--accent-glow)' : 'rgba(255,255,255,0.04)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  {meta.active} active
                </span>
              }
            />
          )
        })}
      </DropdownSection>
    </div>
  )
}
