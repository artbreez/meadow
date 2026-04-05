'use client'
import { useRef, useState } from 'react'
import { Bell, Download, ChevronDown, Calendar, LayoutDashboard, Users, BarChart3, FileText, Settings } from 'lucide-react'
import { DropdownPanel } from '@/components/ui/DropdownPanel'
import { BrandDropdown } from '@/components/ui/BrandDropdown'
import { DateRangeDropdown } from '@/components/ui/DateRangeDropdown'
import { ExportDropdown } from '@/components/ui/ExportDropdown'
import { NotificationsDropdown } from '@/components/ui/NotificationsDropdown'
import { UserMenuDropdown } from '@/components/ui/UserMenuDropdown'

type Panel = 'brand' | 'date' | 'export' | 'notif' | 'user' | null

const navItems = [
  { label: 'Dashboard', active: true },
  { label: 'Campaigns' },
  { label: 'Creators' },
  { label: 'Reports' },
  { label: 'Settings' },
]

export function Header() {
  const [open, setOpen] = useState<Panel>(null)
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [dateLabel, setDateLabel] = useState('Jan 1 – Mar 31, 2025')
  const [navHover, setNavHover] = useState<string | null>(null)

  const brandRef = useRef<HTMLButtonElement>(null)
  const dateRef = useRef<HTMLButtonElement>(null)
  const exportRef = useRef<HTMLButtonElement>(null)
  const notifRef = useRef<HTMLButtonElement>(null)
  const userRef = useRef<HTMLButtonElement>(null)

  const toggle = (panel: Panel) => setOpen(p => (p === panel ? null : panel))
  const close = () => setOpen(null)

  const notifCount = 3

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(5,5,5,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          paddingInline: '24px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '32px', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/meadow-logo.svg" alt="Meadow" style={{ height: '15px', width: 'auto', display: 'block' }} />
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
          {navItems.map(({ label, active }) => (
            <button
              key={label}
              onMouseEnter={() => setNavHover(label)}
              onMouseLeave={() => setNavHover(null)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: active
                  ? 'rgba(216,255,47,0.09)'
                  : navHover === label
                  ? 'rgba(255,255,255,0.05)'
                  : 'transparent',
                color: active ? 'var(--accent)' : navHover === label ? 'var(--text-secondary)' : 'var(--text-muted)',
                fontSize: '13.5px',
                fontWeight: active ? 600 : 450,
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                transition: 'background 140ms ease-out, color 140ms ease-out',
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Brand selector */}
          <HeaderButton
            ref={brandRef}
            onClick={() => toggle('brand')}
            active={open === 'brand'}
          >
            <span
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                background: 'var(--accent-glow)',
                border: '1px solid rgba(216,255,47,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                fontWeight: 700,
                color: 'var(--accent)',
                flexShrink: 0,
              }}
            >
              {selectedBrand === 'All Brands' ? 'AB' : selectedBrand.slice(0, 2).toUpperCase()}
            </span>
            <span>{selectedBrand}</span>
            <ChevronDown size={12} style={{ color: 'var(--text-muted)', marginLeft: '1px' }} />
          </HeaderButton>

          {/* Date range */}
          <HeaderButton ref={dateRef} onClick={() => toggle('date')} active={open === 'date'}>
            <Calendar size={13} style={{ color: open === 'date' ? 'var(--accent)' : 'var(--text-muted)' }} />
            <span>{dateLabel}</span>
            <ChevronDown size={12} style={{ color: 'var(--text-muted)', marginLeft: '1px' }} />
          </HeaderButton>

          {/* Export */}
          <HeaderButton ref={exportRef} onClick={() => toggle('export')} active={open === 'export'}>
            <Download size={13} />
            <span>Export</span>
          </HeaderButton>

          {/* Notifications */}
          <IconButton
            ref={notifRef}
            onClick={() => toggle('notif')}
            active={open === 'notif'}
            badge={notifCount}
          >
            <Bell size={15} />
          </IconButton>

          {/* Avatar */}
          <button
            ref={userRef}
            onClick={() => toggle('user')}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: open === 'user'
                ? 'linear-gradient(135deg, #3a3d40 0%, #2a2d30 100%)'
                : 'linear-gradient(135deg, #2a2d30 0%, #1a1d20 100%)',
              border: `1.5px solid ${open === 'user' ? 'rgba(216,255,47,0.3)' : 'rgba(255,255,255,0.12)'}`,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              transition: 'all 140ms ease-out',
              boxShadow: open === 'user' ? '0 0 12px var(--accent-glow)' : 'none',
            }}
          >
            AK
          </button>
        </div>
      </header>

      {/* Dropdowns */}
      <DropdownPanel isOpen={open === 'brand'} onClose={close} anchorRef={brandRef} width={260} align="right">
        <BrandDropdown
          selected={selectedBrand}
          onSelect={v => { setSelectedBrand(v); close() }}
        />
      </DropdownPanel>

      <DropdownPanel isOpen={open === 'date'} onClose={close} anchorRef={dateRef} width={240} align="right">
        <DateRangeDropdown
          selected="q1-2025"
          onSelect={(_, label) => { setDateLabel(label); close() }}
        />
      </DropdownPanel>

      <DropdownPanel isOpen={open === 'export'} onClose={close} anchorRef={exportRef} width={230} align="right">
        <ExportDropdown onClose={close} />
      </DropdownPanel>

      <DropdownPanel isOpen={open === 'notif'} onClose={close} anchorRef={notifRef} width={300} align="right">
        <NotificationsDropdown onClose={close} />
      </DropdownPanel>

      <DropdownPanel isOpen={open === 'user'} onClose={close} anchorRef={userRef} width={220} align="right">
        <UserMenuDropdown onClose={close} />
      </DropdownPanel>
    </>
  )
}

// ── Shared header button primitives ───────────────────────────────────────────

import React from 'react'

const HeaderButton = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; onClick: () => void; active?: boolean }
>(({ children, onClick, active }, ref) => {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 11px',
        borderRadius: '9px',
        background: active
          ? 'rgba(216,255,47,0.07)'
          : hovered
          ? 'rgba(255,255,255,0.05)'
          : 'var(--bg-card)',
        border: `1px solid ${active ? 'rgba(216,255,47,0.2)' : hovered ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`,
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'inherit',
        transition: 'all 140ms ease-out',
        boxShadow: active ? '0 0 10px rgba(216,255,47,0.12)' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
})
HeaderButton.displayName = 'HeaderButton'

const IconButton = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; onClick: () => void; active?: boolean; badge?: number }
>(({ children, onClick, active, badge }, ref) => {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '34px',
        height: '34px',
        borderRadius: '9px',
        background: active
          ? 'rgba(216,255,47,0.07)'
          : hovered
          ? 'rgba(255,255,255,0.05)'
          : 'var(--bg-card)',
        border: `1px solid ${active ? 'rgba(216,255,47,0.2)' : hovered ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`,
        color: active ? 'var(--accent)' : hovered ? 'var(--text-secondary)' : 'var(--text-muted)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        transition: 'all 140ms ease-out',
      }}
    >
      {children}
      {badge != null && badge > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'var(--accent)',
            border: '1.5px solid var(--bg-page)',
          }}
        />
      )}
    </button>
  )
})
IconButton.displayName = 'IconButton'
