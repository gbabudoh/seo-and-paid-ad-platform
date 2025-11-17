// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'team_member';
  createdAt: Date;
  updatedAt: Date;
}

// Client Types
export interface Client {
  _id: string;
  userId: string; // Reference to User
  companyName: string;
  website: string;
  industry: Industry;
  targetAudience: TargetAudience;
  targetCountries: string[]; // ISO country codes
  preferredLanguage: string; // ISO language code
  packageTier: PackageTier;
  roiExpectation: ROIExpectation;
  budgetAllocation: BudgetAllocation;
  status: 'active' | 'on_hold' | 'trial' | 'cancelled';
  accountManagerId?: string; // Reference to User (admin/team member)
  createdAt: Date;
  updatedAt: Date;
}

export type Industry =
  | 'ecommerce_fashion'
  | 'ecommerce_electronics'
  | 'b2b_saas'
  | 'local_service_plumbing'
  | 'local_service_electrician'
  | 'healthcare'
  | 'real_estate'
  | 'education'
  | 'finance'
  | 'other';

export interface TargetAudience {
  demographics: {
    ageRange?: [number, number];
    gender?: 'male' | 'female' | 'all';
    locations: string[]; // Country/city codes
  };
  interests: string[];
  behaviors?: string[];
}

export type PackageTier = 'bronze' | 'silver' | 'gold' | 'enterprise';

export interface ROIExpectation {
  type: 'roas' | 'leads' | 'sales' | 'brand_awareness';
  value: number; // e.g., 3x ROAS, 50 leads/month
  metric?: string; // Additional context
}

export interface BudgetAllocation {
  seo: number; // Percentage
  googleAds: number;
  metaAds: number;
  tiktokAds?: number;
  linkedinAds?: number;
  other?: number;
}

// Campaign Types
export interface Campaign {
  _id: string;
  clientId: string; // Reference to Client
  type: 'seo' | 'google_ads' | 'meta_ads' | 'tiktok_ads' | 'linkedin_ads';
  name: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  platformAccountId?: string; // External platform account ID
  platformCampaignId?: string; // External platform campaign ID
  budget?: number;
  currency: string; // ISO currency code
  startDate: Date;
  endDate?: Date;
  settings: CampaignSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignSettings {
  targetKeywords?: string[];
  targetLocations?: string[];
  targetAudience?: TargetAudience;
  adGroups?: AdGroup[];
  [key: string]: unknown; // Flexible for platform-specific settings
}

export interface AdGroup {
  name: string;
  keywords?: string[];
  ads?: Ad[];
  bidAmount?: number;
}

export interface Ad {
  headline?: string;
  description?: string;
  displayUrl?: string;
  finalUrl?: string;
  creativeUrl?: string;
  status: 'active' | 'paused' | 'disapproved';
}

// Report Types
export interface Report {
  _id: string;
  clientId: string;
  campaignId?: string; // Optional, can be client-wide report
  type: 'seo' | 'paid_ads' | 'combined';
  period: {
    start: Date;
    end: Date;
  };
  metrics: ReportMetrics;
  createdAt: Date;
}

export interface ReportMetrics {
  // SEO Metrics
  organicTraffic?: number;
  keywordRankings?: KeywordRanking[];
  backlinks?: number;
  domainAuthority?: number;
  
  // Paid Ads Metrics
  impressions?: number;
  clicks?: number;
  spend?: number;
  conversions?: number;
  conversionRate?: number;
  cpc?: number; // Cost per click
  cpa?: number; // Cost per acquisition
  roas?: number; // Return on ad spend
  
  // Combined Metrics
  totalLeads?: number;
  totalSales?: number;
  blendedCPA?: number;
  clientHealthScore?: number; // 0-100
  
  // Geo-specific
  geoPerformance?: GeoPerformance[];
  
  // Platform-specific
  platformBreakdown?: PlatformMetrics[];
}

export interface KeywordRanking {
  keyword: string;
  position: number;
  url: string;
  change?: number; // Position change from previous period
}

export interface GeoPerformance {
  country: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue?: number;
}

export interface PlatformMetrics {
  platform: 'google' | 'meta' | 'tiktok' | 'linkedin';
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  roas: number;
}

// API Credential Types
export interface APICredential {
  _id: string;
  clientId: string;
  platform: 'google_ads' | 'meta' | 'tiktok' | 'linkedin' | 'google_analytics' | 'google_search_console';
  encryptedCredentials: string; // Encrypted OAuth tokens, API keys, etc.
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export interface Task {
  _id: string;
  clientId: string;
  campaignId?: string;
  assignedTo?: string; // Reference to User (team member)
  type: 'content_creation' | 'campaign_setup' | 'optimization' | 'reporting' | 'other';
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Billing Types
export interface Subscription {
  _id: string;
  clientId: string;
  packageTier: PackageTier;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  currency: string;
  amount: number; // Monthly amount
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  _id: string;
  clientId: string;
  subscriptionId: string;
  stripeInvoiceId?: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  dueDate: Date;
  paidAt?: Date;
  createdAt: Date;
}

// Message Types
export interface Message {
  _id: string;
  clientId: string;
  senderId: string; // Reference to User
  recipientId: string; // Reference to User
  subject?: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
}

// Industry Template Types
export interface IndustryTemplate {
  _id: string;
  industry: Industry;
  name: string;
  description?: string;
  campaignStructure: CampaignTemplate;
  defaultKeywords: string[];
  defaultAudiences: TargetAudience[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignTemplate {
  adGroups: AdGroup[];
  defaultBidAmount?: number;
  defaultBudget?: number;
  targetingSettings?: Record<string, unknown>;
}

// Job Queue Types
export interface JobData {
  type: 'fetch_report_data' | 'create_campaign' | 'optimize_campaign' | 'send_email' | 'generate_report';
  clientId?: string;
  campaignId?: string;
  platform?: string;
  [key: string]: unknown;
}

