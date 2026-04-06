'use client'
import { useState } from 'react'
import { AlertTriangle, CheckCircle, Bell, Zap } from 'lucide-react'

const NOTIFS = [
  {
    id: 'n1',
    type: 'warning' as const,
    title: 'Back to Routine needs attention',
    body: 'Reach at 37% of plan — creator posting rate low',
    time: '2h ago',
    unread: true,
  },
  {
    id: 'n2',
    type: 'success' as const,
    title: 'TikTok sync completed',
    body: 'Spring Skincare Launch metrics updated',
    time: '4h ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'info' as const,
    title: 'Spring Skincare near budget cap',
    body: '89% spent — $32K remaining of $320K',
    time: '1d ago',
    unread: true,
  },
  {
    id: 'n4',
    type: 'neutral' as const,
    title: 'Holiday Gift Edit planning starts',
    body: 'Budget approved: $175K · May 1 kickoff',
    time: '2d ago',
    unread: false,
  },
]

const iconMap = {
  warning: <AlertTriangle size={13} style={{ color: '#f5a623' }} />,
  success: <CheckCircle size={13} style={{ color: '#4ade80' }} />,
  info:    <Zap size={13} style={{ color: '#7dd3fc' }} />,
  neutral: <Bell size={13} style={{ color: 'rgba(245,247,250,0.3)' }} />,
}

interface NotificationsDropdownProps {
  onClose: () => void
}

export function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  const [items, setItems] = useState(NOTIFS)
  const unreadCount = items.filter(n => n.unread).length
  const [markHovered, setMarkHovered] = useState(false)
  const [footerHovered, setFooterHovered] = useState(false)

  const markAllRead = () => setItems(i => i.map(n => ({ ...n, unread: false })))

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px 8px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ fontSize: '13px', fontWeight: 650, color: 'var(--text-primary)' }}>
            Notifications
          </span>
          {unreadCount > 0 && (
            <span
              style={{
                padding: '1px 7px',
                borderRadius: '5px',
                background: 'var(--accent-glow)',
                border: '1px solid rgba(216,255,47,0.25)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--accent)',
              }}
            >
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            onMouseEnter={() => setMarkHovered(true)}
            onMouseLeave={() => setMarkHovered(false)}
            style={{
              background: 'none',
              border: 'none',
              color: markHovered ? 'var(--text-secondary)' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              padding: '3px 6px',
              borderRadius: '5px',
              transition: 'color 130ms ease-out',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div style={{ padding: '6px' }}>
        {items.map(n => (
          <NotifRow key={n.id} notif={n} />
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '6px 6px 6px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onMouseEnter={() => setFooterHovered(true)}
          onMouseLeave={() => setFooterHovered(false)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '9px',
            background: footerHovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${footerHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
            color: footerHovered ? 'var(--text-secondary)' : 'var(--text-muted)',
            fontSize: '12.5px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 130ms ease-out',
          }}
        >
          View all notifications
        </button>
      </div>
    </div>
  )
}

function NotifRow({ notif }: { notif: typeof NOTIFS[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: '10px',
        padding: '9px 10px',
        borderRadius: '9px',
        background: hovered
          ? 'rgba(255,255,255,0.05)'
          : notif.unread
          ? 'rgba(255,255,255,0.025)'
          : 'transparent',
        cursor: 'default',
        transition: 'background 130ms ease-out',
        position: 'relative',
      }}
    >
      {notif.unread && (
        <span
          style={{
            position: 'absolute',
            top: '11px',
            right: '10px',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--accent)',
            flexShrink: 0,
          }}
        />
      )}
      <div style={{ marginTop: '1px', flexShrink: 0 }}>{iconMap[notif.type]}</div>
      <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>
        <p
          style={{
            fontSize: '13px',
            fontWeight: notif.unread ? 600 : 450,
            color: notif.unread ? 'var(--text-primary)' : 'var(--text-secondary)',
            margin: '0 0 3px',
            lineHeight: 1.35,
          }}
        >
          {notif.title}
        </p>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          {notif.body}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--text-faint)', margin: '4px 0 0' }}>
          {notif.time}
        </p>
      </div>
    </div>
  )
}
