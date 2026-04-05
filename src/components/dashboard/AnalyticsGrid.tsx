import { PerformanceChart } from './PerformanceChart'
import { PlatformSplit } from './PlatformSplit'
import { GeographyPanel } from './GeographyPanel'
import { CampaignHealth } from './CampaignHealth'

export function AnalyticsGrid() {
  return (
    <section style={{ padding: '24px 32px 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: '12px',
        }}
      >
        {/* Performance chart — spans 2 cols, row 1 */}
        <div style={{ gridColumn: '1 / 3', gridRow: '1 / 2', minHeight: '280px' }}>
          <PerformanceChart />
        </div>

        {/* Platform split — col 3, row 1 */}
        <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
          <PlatformSplit />
        </div>

        {/* Geography — col 1, row 2 */}
        <div style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}>
          <GeographyPanel />
        </div>

        {/* Campaign health — spans 2 cols, row 2 */}
        <div style={{ gridColumn: '2 / 4', gridRow: '2 / 3' }}>
          <CampaignHealth />
        </div>
      </div>
    </section>
  )
}
