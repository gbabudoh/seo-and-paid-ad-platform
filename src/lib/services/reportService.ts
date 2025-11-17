import connectDB from '@/src/db/connect';
import ReportModel from '@/src/db/models/Report';
import { Report } from '@/src/types';

export class ReportService {
  /**
   * Get reports by client ID
   */
  static async getByClientId(
    clientId: string,
    limit: number = 30
  ): Promise<Report[]> {
    await connectDB();
    const reports = await ReportModel.find({ clientId })
      .sort({ 'period.start': -1 })
      .limit(limit)
      .lean();
    return reports.map(report => ({
      ...report,
      _id: report._id.toString(),
      clientId: report.clientId.toString(),
      campaignId: report.campaignId?.toString(),
    })) as Report[];
  }

  /**
   * Get latest report for client
   */
  static async getLatest(clientId: string): Promise<Report | null> {
    await connectDB();
    const report = await ReportModel.findOne({ clientId })
      .sort({ 'period.start': -1 })
      .lean();
    if (!report) return null;
    return {
      ...report,
      _id: report._id.toString(),
      clientId: report.clientId.toString(),
      campaignId: report.campaignId?.toString(),
    } as Report;
  }

  /**
   * Create a new report
   */
  static async create(data: Omit<Report, '_id' | 'createdAt'>): Promise<Report> {
    await connectDB();
    const report = await ReportModel.create(data);
    const reportObj = report.toObject();
    return {
      ...reportObj,
      _id: reportObj._id.toString(),
      clientId: reportObj.clientId.toString(),
      campaignId: reportObj.campaignId?.toString(),
    } as Report;
  }

  /**
   * Get reports by date range
   */
  static async getByDateRange(
    clientId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Report[]> {
    await connectDB();
    const reports = await ReportModel.find({
      clientId,
      'period.start': { $gte: startDate },
      'period.end': { $lte: endDate },
    })
      .sort({ 'period.start': -1 })
      .lean();
    return reports.map(report => ({
      ...report,
      _id: report._id.toString(),
      clientId: report.clientId.toString(),
      campaignId: report.campaignId?.toString(),
    })) as Report[];
  }
}

