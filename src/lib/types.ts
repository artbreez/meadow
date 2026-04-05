export type Platform = 'instagram' | 'tiktok' | 'youtube'
export type CampaignStatus = 'active' | 'completed' | 'at-risk' | 'planning' | 'delayed'
export type KPIStatus = 'on-track' | 'achieved' | 'at-risk' | 'below-target' | 'pending'

export interface KPI {
  name: string
  planned: number
  achieved: number
  unit: string
  status: KPIStatus
}

export interface Campaign {
  id: string
  name: string
  brand: string
  product: string
  period: { start: string; end: string }
  budget: number
  spent: number
  creators: number
  platforms: Platform[]
  status: CampaignStatus
  reach: number
  reachTarget: number
  er: number
  erTarget: number
  cpm: number
  impressions: number
  kpis: KPI[]
  geography: string[]
}

export interface GeographyData {
  country: string
  code: string
  reach: number
  er: number
  campaigns: number
  trend: 'up' | 'down' | 'flat'
}

export interface TimeSeriesPoint {
  month: string
  reach: number
  spend: number
  engagements: number
}

export interface PlatformData {
  platform: Platform
  reach: number
  creators: number
  spend: number
  er: number
}

export interface InsightItem {
  type: 'positive' | 'warning' | 'neutral' | 'action'
  label: string
  title: string
  value?: string
  note?: string
}

export interface Brand {
  id: string
  name: string
  products: string[]
}
