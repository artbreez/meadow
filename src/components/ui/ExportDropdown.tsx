'use client'
import { useState } from 'react'
import { FileText, Table, FileSpreadsheet, Link, Loader2 } from 'lucide-react'
import { DropdownSection, DropdownItem, DropdownLabel } from './DropdownPanel'

const FORMATS = [
  { icon: <FileText size={13} />, label: 'PDF Summary Report', sub: 'Charts + metrics overview', value: 'pdf' },
  { icon: <Table size={13} />, label: 'CSV Raw Data', sub: 'All campaign metrics', value: 'csv' },
  { icon: <FileSpreadsheet size={13} />, label: 'Excel Spreadsheet', sub: '.xlsx with multiple sheets', value: 'xlsx' },
]

interface ExportDropdownProps {
  onClose: () => void
}

export function ExportDropdown({ onClose }: ExportDropdownProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleExport = (value: string) => {
    setLoading(value)
    setTimeout(() => {
      setLoading(null)
      onClose()
    }, 1600)
  }

  const handleCopyLink = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 1200)
  }

  return (
    <div>
      <DropdownSection>
        <DropdownLabel>Export as</DropdownLabel>
        {FORMATS.map(f => (
          <DropdownItem
            key={f.value}
            icon={loading === f.value ? <Loader2 size={13} className="animate-spin-slow" /> : f.icon}
            label={f.label}
            sub={f.sub}
            onClick={() => !loading && handleExport(f.value)}
          />
        ))}
      </DropdownSection>
      <DropdownSection border={false}>
        <DropdownItem
          icon={<Link size={13} />}
          label={copied ? 'Link copied!' : 'Copy shareable link'}
          sub="View-only access, expires in 7 days"
          onClick={handleCopyLink}
          selected={copied}
        />
      </DropdownSection>
    </div>
  )
}
