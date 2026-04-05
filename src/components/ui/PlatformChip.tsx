import type { Platform } from '@/lib/types'

const platformConfig: Record<Platform, { label: string; color: string; bg: string; icon: string }> = {
  instagram: {
    label: 'Instagram',
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.1)',
    icon: 'IG',
  },
  tiktok: {
    label: 'TikTok',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.1)',
    icon: 'TT',
  },
  youtube: {
    label: 'YouTube',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    icon: 'YT',
  },
}

interface PlatformChipProps {
  platform: Platform
  size?: 'sm' | 'md'
  showLabel?: boolean
}

export function PlatformChip({ platform, size = 'md', showLabel = true }: PlatformChipProps) {
  const c = platformConfig[platform]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '2px 7px' : '3px 9px',
        borderRadius: '6px',
        background: c.bg,
        color: c.color,
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: size === 'sm' ? '9px' : '10px', fontWeight: 700 }}>{c.icon}</span>
      {showLabel && c.label}
    </span>
  )
}

interface PlatformIconProps {
  platform: Platform
  size?: number
}

export function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  const c = platformConfig[platform]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '5px',
        background: c.bg,
        color: c.color,
        fontSize: Math.round(size * 0.42) + 'px',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {c.icon}
    </span>
  )
}
