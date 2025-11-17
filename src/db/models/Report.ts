import mongoose, { Schema, Document, Model } from 'mongoose';
import { Report, ReportMetrics, KeywordRanking, GeoPerformance, PlatformMetrics } from '@/src/types';

export interface ReportDocument extends Omit<Report, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const KeywordRankingSchema = new Schema<KeywordRanking>({
  keyword: { type: String, required: true },
  position: { type: Number, required: true },
  url: { type: String, required: true },
  change: Number,
}, { _id: false });

const GeoPerformanceSchema = new Schema<GeoPerformance>({
  country: { type: String, required: true },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  spend: { type: Number, default: 0 },
  revenue: Number,
}, { _id: false });

const PlatformMetricsSchema = new Schema<PlatformMetrics>({
  platform: {
    type: String,
    enum: ['google', 'meta', 'tiktok', 'linkedin'],
    required: true,
  },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  spend: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  roas: { type: Number, default: 0 },
}, { _id: false });

const ReportMetricsSchema = new Schema<ReportMetrics>({
  // SEO Metrics
  organicTraffic: Number,
  keywordRankings: [KeywordRankingSchema],
  backlinks: Number,
  domainAuthority: Number,
  
  // Paid Ads Metrics
  impressions: Number,
  clicks: Number,
  spend: Number,
  conversions: Number,
  conversionRate: Number,
  cpc: Number,
  cpa: Number,
  roas: Number,
  
  // Combined Metrics
  totalLeads: Number,
  totalSales: Number,
  blendedCPA: Number,
  clientHealthScore: Number,
  
  // Geo-specific
  geoPerformance: [GeoPerformanceSchema],
  
  // Platform-specific
  platformBreakdown: [PlatformMetricsSchema],
}, { _id: false });

const ReportSchema = new Schema<ReportDocument>(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId as any,
      ref: 'Client',
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId as any,
      ref: 'Campaign',
    },
    type: {
      type: String,
      enum: ['seo', 'paid_ads', 'combined'],
      required: true,
    },
    period: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    metrics: {
      type: ReportMetricsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ReportSchema.index({ clientId: 1 });
ReportSchema.index({ campaignId: 1 });
ReportSchema.index({ type: 1 });
ReportSchema.index({ 'period.start': 1, 'period.end': 1 });
ReportSchema.index({ clientId: 1, 'period.start': -1 });

const ReportModel: Model<ReportDocument> =
  mongoose.models.Report || mongoose.model<ReportDocument>('Report', ReportSchema);

export default ReportModel;

