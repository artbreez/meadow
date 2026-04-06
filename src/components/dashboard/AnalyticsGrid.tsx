import { PerformanceChart } from './PerformanceChart'
import { PlatformSplit } from './PlatformSplit'
import { GeographyPanel } from './GeographyPanel'
import { CampaignHealth } from './CampaignHealth'

export function AnalyticsGrid() {
  return (
    <section className="rsp-sect" style={{ padding: '24px 32px 0' }}>
      <div className="grid-analytics">
        {/* Performance chart — spans 2 cols, row 1 */}
        <div className="col-perf">
          <PerformanceChart />
        </div>

        {/* Platform split — col 3, row 1 */}
        <div className="col-plat">
          <PlatformSplit />
        </div>

        {/* Geography — col 1, row 2 */}
        <div className="col-geo">
          <GeographyPanel />
        </div>

        {/* Campaign health — spans 2 cols, row 2 */}
        <div className="col-health">
          <CampaignHealth />
        </div>
      </div>
    </section>
  )
}
