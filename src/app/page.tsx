'use client'
import { Header } from '@/components/dashboard/Header'
import { PageIntro } from '@/components/dashboard/PageIntro'
import { ExecutiveOverview } from '@/components/dashboard/ExecutiveOverview'
import { AnalyticsGrid } from '@/components/dashboard/AnalyticsGrid'
import { CampaignTable } from '@/components/dashboard/CampaignTable'
import { InsightsPanel } from '@/components/dashboard/InsightsPanel'

export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-page)',
        color: 'var(--text-primary)',
      }}
    >
      <Header />

      <main
        style={{
          maxWidth: '1440px',
          marginInline: 'auto',
          paddingBottom: '60px',
        }}
      >
        <PageIntro />
        <ExecutiveOverview />
        <AnalyticsGrid />
        <CampaignTable />
        <InsightsPanel />
      </main>
    </div>
  )
}
