'use client'
import { useState } from 'react'
import { Bell, Download, ChevronDown, Calendar, LayoutDashboard, Users, BarChart3, FileText, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Campaigns', icon: BarChart3 },
  { label: 'Creators', icon: Users },
  { label: 'Reports', icon: FileText },
  { label: 'Settings', icon: Settings },
]

export function Header() {
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(5,5,5,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        paddingInline: '24px',
        gap: '0',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginRight: '32px', flexShrink: 0 }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <polygon points="7,1 13,5 13,9 7,13 1,9 1,5" fill="#0a0a0a" />
          </svg>
        </div>
        <span
          style={{
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          PRISM
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
        {navItems.map(({ label, active }) => (
          <button
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: active ? 'rgba(216,255,47,0.09)' : 'transparent',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '13.5px',
              fontWeight: active ? 600 : 450,
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              transition: 'all 160ms ease-out',
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Brand selector */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 11px',
            borderRadius: '9px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'all 160ms ease-out',
          }}
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
            }}
          >
            GE
          </span>
          Glow Essentials
          <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
        </button>

        {/* Date range */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 11px',
            borderRadius: '9px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'all 160ms ease-out',
          }}
        >
          <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
          Jan 1 – Mar 31, 2025
          <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
        </button>

        {/* Export */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '9px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'all 160ms ease-out',
          }}
        >
          <Download size={13} />
          Export
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          style={{
            position: 'relative',
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            transition: 'all 160ms ease-out',
          }}
        >
          <Bell size={15} />
          <span
            style={{
              position: 'absolute',
              top: '7px',
              right: '7px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
              border: '1.5px solid var(--bg-page)',
            }}
          />
        </button>

        {/* Avatar */}
        <button
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2a2d30 0%, #1a1d20 100%)',
            border: '1.5px solid var(--border-strong)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          AK
        </button>
      </div>
    </header>
  )
}
