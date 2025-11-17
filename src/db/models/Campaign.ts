import mongoose, { Schema, Document, Model } from 'mongoose';
import { Campaign, CampaignSettings, TargetAudience } from '@/src/types';

export interface CampaignDocument extends Omit<Campaign, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const TargetAudienceSchema = new Schema<TargetAudience>({
  demographics: {
    ageRange: [Number],
    gender: {
      type: String,
      enum: ['male', 'female', 'all'],
    },
    locations: [String],
  },
  interests: [String],
  behaviors: [String],
}, { _id: false });

const CampaignSettingsSchema = new Schema<CampaignSettings>({
  targetKeywords: [String],
  targetLocations: [String],
  targetAudience: TargetAudienceSchema,
  adGroups: [{
    name: String,
    keywords: [String],
    ads: [{
      headline: String,
      description: String,
      displayUrl: String,
      finalUrl: String,
      creativeUrl: String,
      status: {
        type: String,
        enum: ['active', 'paused', 'disapproved'],
      },
    }],
    bidAmount: Number,
  }],
}, { _id: false, strict: false }); // Allow additional platform-specific fields

const CampaignSchema = new Schema<CampaignDocument>(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId as any,
      ref: 'Client',
      required: true,
    },
    type: {
      type: String,
      enum: ['seo', 'google_ads', 'meta_ads', 'tiktok_ads', 'linkedin_ads'],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'completed', 'archived'],
      default: 'active',
    },
    platformAccountId: String,
    platformCampaignId: String,
    budget: Number,
    currency: {
      type: String,
      default: 'USD',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    settings: {
      type: CampaignSettingsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
CampaignSchema.index({ clientId: 1 });
CampaignSchema.index({ type: 1 });
CampaignSchema.index({ status: 1 });
CampaignSchema.index({ platformCampaignId: 1 });
CampaignSchema.index({ clientId: 1, type: 1 });

const CampaignModel: Model<CampaignDocument> =
  mongoose.models.Campaign || mongoose.model<CampaignDocument>('Campaign', CampaignSchema);

export default CampaignModel;

