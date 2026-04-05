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

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: size === 'sm' ? '9px' : '11px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 160ms ease-out',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: size === 'sm' ? '13px' : '14px',
    padding: size === 'sm' ? '6px 12px' : '8px 16px',
    letterSpacing: '-0.01em',
    transform: pressed ? 'scale(0.975)' : 'scale(1)',
    whiteSpace: 'nowrap',
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--accent)',
      color: '#0a0a0a',
      boxShadow: pressed ? 'none' : '0 0 0 0 transparent',
    },
    secondary: {
      background: 'var(--bg-elevated)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
    },
  }

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  )
}
