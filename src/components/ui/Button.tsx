'use client'
import { useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  children: React.ReactNode
  icon?: React.ReactNode
}

export function Button({ variant = 'secondary', size = 'md', children, icon, style, ...props }: ButtonProps) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: size === 'sm' ? '9px' : '11px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: size === 'sm' ? '13px' : '14px',
    padding: size === 'sm' ? '6px 12px' : '8px 16px',
    letterSpacing: '-0.01em',
    transform: pressed ? 'scale(0.972)' : 'scale(1)',
    whiteSpace: 'nowrap',
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--accent-bg)',
      color: '#0a0a0a',
      boxShadow: hovered && !pressed ? '0 0 18px var(--accent-glow)' : 'none',
      opacity: hovered ? 0.92 : 1,
    },
    secondary: {
      background: hovered ? 'var(--bg-hover)' : 'var(--bg-elevated)',
      color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
      border: `1px solid ${hovered ? 'var(--border-strong)' : 'var(--border)'}`,
    },
    ghost: {
      background: hovered ? 'var(--bg-hover)' : 'transparent',
      color: hovered ? 'var(--text-secondary)' : 'var(--text-muted)',
    },
  }

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  )
}
