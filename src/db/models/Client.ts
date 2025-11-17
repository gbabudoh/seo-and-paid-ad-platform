import mongoose, { Schema, Document, Model } from 'mongoose';
import { Client, Industry, PackageTier, TargetAudience, ROIExpectation, BudgetAllocation } from '@/src/types';

export interface ClientDocument extends Omit<Client, '_id'>, Document {
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

const ROIExpectationSchema = new Schema<ROIExpectation>({
  type: {
    type: String,
    enum: ['roas', 'leads', 'sales', 'brand_awareness'],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  metric: String,
}, { _id: false });

const BudgetAllocationSchema = new Schema<BudgetAllocation>({
  seo: { type: Number, required: true },
  googleAds: { type: Number, required: true },
  metaAds: { type: Number, required: true },
  tiktokAds: Number,
  linkedinAds: Number,
  other: Number,
}, { _id: false });

const ClientSchema = new Schema<ClientDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId as any,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      enum: [
        'ecommerce_fashion',
        'ecommerce_electronics',
        'b2b_saas',
        'local_service_plumbing',
        'local_service_electrician',
        'healthcare',
        'real_estate',
        'education',
        'finance',
        'other',
      ] as Industry[],
      required: true,
    },
    targetAudience: {
      type: TargetAudienceSchema,
      required: true,
    },
    targetCountries: {
      type: [String],
      required: true,
    },
    preferredLanguage: {
      type: String,
      required: true,
      default: 'en',
    },
    packageTier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'enterprise'] as PackageTier[],
      required: true,
    },
    roiExpectation: {
      type: ROIExpectationSchema,
      required: true,
    },
    budgetAllocation: {
      type: BudgetAllocationSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'on_hold', 'trial', 'cancelled'],
      default: 'trial',
    },
    accountManagerId: {
      type: mongoose.Schema.Types.ObjectId as any,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ClientSchema.index({ userId: 1 });
ClientSchema.index({ status: 1 });
ClientSchema.index({ accountManagerId: 1 });
ClientSchema.index({ packageTier: 1 });

const ClientModel: Model<ClientDocument> =
  mongoose.models.Client || mongoose.model<ClientDocument>('Client', ClientSchema);

export default ClientModel;

