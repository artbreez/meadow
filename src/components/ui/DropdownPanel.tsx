'use client'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownPanelProps {
  isOpen: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement | null>
  children: React.ReactNode
  width?: number
  align?: 'left' | 'right'
  offsetY?: number
}

export function DropdownPanel({
  isOpen, onClose, anchorRef, children, width = 220, align = 'left', offsetY = 6,
}: DropdownPanelProps) {
  const [mounted, setMounted] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const top = rect.bottom + offsetY
    const left = align === 'right'
      ? Math.max(8, rect.right - width)
      : Math.min(rect.left, window.innerWidth - width - 8)
    setPos({ top, left })
  }, [isOpen, anchorRef, align, width, offsetY])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !anchorRef.current?.contains(t)) onClose()
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', esc) }
  }, [isOpen, onClose, anchorRef])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
            width,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-dropdown)',
            overflow: 'hidden',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ── Shared dropdown primitives ──────────────────────────────────

export function DropdownSection({ children, border = true }: { children: React.ReactNode; border?: boolean }) {
  return (
    <div style={{ padding: '6px', borderBottom: border ? '1px solid var(--border)' : 'none' }}>
      {children}
    </div>
  )
}

export function DropdownItem({
  icon, label, sub, onClick, danger, selected, right,
}: {
  icon?: React.ReactNode
  label: string
  sub?: string
  onClick?: () => void
  danger?: boolean
  selected?: boolean
  right?: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        padding: '8px 10px',
        borderRadius: '9px',
        background: hovered
          ? selected ? 'var(--accent-fill)' : 'var(--bg-hover)'
          : selected ? 'var(--accent-dim)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'inherit',
        textAlign: 'left',
        transition: 'background 130ms ease-out',
      }}
    >
      {icon && (
        <span
          style={{
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: danger ? 'var(--danger)' : selected ? 'var(--accent)' : hovered ? 'var(--text-secondary)' : 'var(--text-muted)',
            flexShrink: 0,
            transition: 'color 130ms ease-out',
          }}
        >
          {icon}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: selected ? 600 : hovered ? 500 : 450,
            color: danger ? 'var(--danger)' : selected ? 'var(--accent)' : hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
            lineHeight: 1.3,
            transition: 'color 130ms ease-out',
          }}
        >
          {label}
        </div>
        {sub && (
          <div style={{ fontSize: '11px', color: hovered ? 'var(--text-muted)' : 'var(--text-faint)', marginTop: '1px', transition: 'color 130ms ease-out' }}>
            {sub}
          </div>
        )}
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
      {selected && !right && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
          <path d="M2 6l3 3 5-5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '6px 10px 3px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
      {children}
    </div>
  )
}

export function DropdownSearch({ value, onChange, placeholder = 'Search…' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ padding: '8px 8px 4px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '6px 10px',
          borderRadius: '8px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="5" cy="5" r="3.5" stroke="var(--text-muted)" strokeWidth="1.2" />
          <path d="M8 8l2.5 2.5" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '12.5px',
            color: 'var(--text-secondary)',
            fontFamily: 'inherit',
          }}
        />
      </div>
    </div>
  )
}
