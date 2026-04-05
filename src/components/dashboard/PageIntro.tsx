'use client'
import { useState } from 'react'
import { RefreshCw, Clock, Wifi } from 'lucide-react'
import { FilterChip } from '@/components/ui/FilterChip'

const BRANDS = ['All Brands', 'Glow Essentials', 'NutriCore', 'Wanderlust']
const PLATFORMS = ['All Platforms', 'Instagram', 'TikTok', 'YouTube']
const STATUS = ['All Status', 'Active', 'Completed', 'At Risk', 'Planning']

export function PageIntro() {
  const [activeBrand, setActiveBrand] = useState('All Brands')
  const [activePlatform, setActivePlatform] = useState('All Platforms')
  const [activeStatus, setActiveStatus] = useState('All Status')

  return (
    <div
      style={{
        paddingInline: '32px',
        paddingTop: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '16px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '5px',
            }}
          >
            Client Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400, lineHeight: 1.5 }}>
            Overview of influencer placements, campaign performance, and spend efficiency.
          </p>
        </div>

        {/* Status badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Period */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 11px',
              borderRadius: '9px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Period</span>
            <span style={{ fontWeight: 600 }}>Jan 1 – Mar 31, 2025</span>
          </div>

          {/* Freshness */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '9px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontWeight: 450,
            }}
          >
            <Clock size={11} />
            Updated 2h ago
          </div>

          {/* TikTok syncing */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '9px',
              background: 'rgba(34,211,238,0.06)',
              border: '1px solid rgba(34,211,238,0.15)',
              fontSize: '12px',
              color: '#22d3ee',
              fontWeight: 500,
            }}
          >
            <RefreshCw size={11} className="animate-spin-slow" />
            TikTok syncing
          </div>

          {/* YouTube partial */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '9px',
              background: 'rgba(248,113,113,0.06)',
              border: '1px solid rgba(248,113,113,0.15)',
              fontSize: '12px',
              color: '#f87171',
              fontWeight: 450,
            }}
          >
            <Wifi size={11} />
            YT stats may lag 6h
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-faint)', marginRight: '4px', fontWeight: 500 }}>
          Filters
        </span>
        <FilterChip
          label="Brand"
          value={activeBrand === 'All Brands' ? undefined : activeBrand}
          active={activeBrand !== 'All Brands'}
          onClick={() => {
            const idx = BRANDS.indexOf(activeBrand)
            setActiveBrand(BRANDS[(idx + 1) % BRANDS.length])
          }}
        />
        <FilterChip
          label="Platform"
          value={activePlatform === 'All Platforms' ? undefined : activePlatform}
          active={activePlatform !== 'All Platforms'}
          onClick={() => {
            const idx = PLATFORMS.indexOf(activePlatform)
            setActivePlatform(PLATFORMS[(idx + 1) % PLATFORMS.length])
          }}
        />
        <FilterChip
          label="Status"
          value={activeStatus === 'All Status' ? undefined : activeStatus}
          active={activeStatus !== 'All Status'}
          onClick={() => {
            const idx = STATUS.indexOf(activeStatus)
            setActiveStatus(STATUS[(idx + 1) % STATUS.length])
          }}
        />
        <FilterChip label="Geography" dropdown />
        <FilterChip label="Product" dropdown />
      </div>
    </div>
  )
}
