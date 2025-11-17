import connectDB from '@/src/db/connect';
import CampaignModel from '@/src/db/models/Campaign';
import { Campaign } from '@/src/types';

export class CampaignService {
  /**
   * Get campaigns by client ID
   */
  static async getByClientId(clientId: string): Promise<Campaign[]> {
    await connectDB();
    const campaigns = await CampaignModel.find({ clientId })
      .sort({ createdAt: -1 })
      .lean();
    return campaigns.map(campaign => ({
      ...campaign,
      _id: campaign._id.toString(),
      clientId: campaign.clientId.toString(),
    })) as Campaign[];
  }

  /**
   * Get campaign by ID
   */
  static async getById(campaignId: string): Promise<Campaign | null> {
    await connectDB();
    const campaign = await CampaignModel.findById(campaignId).lean();
    if (!campaign) return null;
    return {
      ...campaign,
      _id: campaign._id.toString(),
      clientId: campaign.clientId.toString(),
    } as Campaign;
  }

  /**
   * Create a new campaign
   */
  static async create(data: Omit<Campaign, '_id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
    await connectDB();
    const campaign = await CampaignModel.create(data);
    const campaignObj = campaign.toObject();
    return {
      ...campaignObj,
      _id: campaignObj._id.toString(),
      clientId: campaignObj.clientId.toString(),
    } as Campaign;
  }

  /**
   * Update campaign
   */
  static async update(
    campaignId: string,
    data: Partial<Campaign>
  ): Promise<Campaign | null> {
    await connectDB();
    const campaign = await CampaignModel.findByIdAndUpdate(
      campaignId,
      { $set: data },
      { new: true }
    ).lean();
    if (!campaign) return null;
    return {
      ...campaign,
      _id: campaign._id.toString(),
      clientId: campaign.clientId.toString(),
    } as Campaign;
  }

  /**
   * Delete campaign
   */
  static async delete(campaignId: string): Promise<boolean> {
    await connectDB();
    const result = await CampaignModel.findByIdAndDelete(campaignId);
    return !!result;
  }

  /**
   * Get campaigns by type
   */
  static async getByType(
    clientId: string,
    type: Campaign['type']
  ): Promise<Campaign[]> {
    await connectDB();
    const campaigns = await CampaignModel.find({ clientId, type })
      .sort({ createdAt: -1 })
      .lean();
    return campaigns.map(campaign => ({
      ...campaign,
      _id: campaign._id.toString(),
      clientId: campaign.clientId.toString(),
    })) as Campaign[];
  }

  /**
   * Get all campaigns (for admin)
   */
  static async getAll(limit: number = 100, skip: number = 0): Promise<Campaign[]> {
    await connectDB();
    const campaigns = await CampaignModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean();
    return campaigns.map(campaign => ({
      ...campaign,
      _id: campaign._id.toString(),
      clientId: campaign.clientId.toString(),
    })) as Campaign[];
  }
}

