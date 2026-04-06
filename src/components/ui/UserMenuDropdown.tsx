'use client'
import { User, Settings, CreditCard, HelpCircle, LogOut, Plug } from 'lucide-react'
import { DropdownSection, DropdownItem } from './DropdownPanel'

interface UserMenuDropdownProps {
  onClose: () => void
}

export function UserMenuDropdown({ onClose }: UserMenuDropdownProps) {
  return (
    <div>
      {/* User identity */}
      <div
        style={{
          padding: '12px 14px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'var(--bg-elevated)',
            border: '1.5px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            flexShrink: 0,
          }}
        >
          AK
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
            Artem Kolesnikov
          </p>
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '1px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            artem@glowessentials.com
          </p>
        </div>
      </div>

      <DropdownSection>
        <DropdownItem icon={<User size={13} />} label="Profile" onClick={onClose} />
        <DropdownItem icon={<Settings size={13} />} label="Account settings" onClick={onClose} />
        <DropdownItem icon={<CreditCard size={13} />} label="Billing & plan" sub="Pro · renews Apr 30" onClick={onClose} />
        <DropdownItem icon={<Plug size={13} />} label="API & integrations" onClick={onClose} />
      </DropdownSection>

      <DropdownSection border={false}>
        <DropdownItem icon={<HelpCircle size={13} />} label="Help center" onClick={onClose} />
        <DropdownItem icon={<LogOut size={13} />} label="Log out" danger onClick={onClose} />
      </DropdownSection>
    </div>
  )
}
