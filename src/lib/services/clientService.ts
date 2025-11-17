import connectDB from '@/src/db/connect';
import ClientModel from '@/src/db/models/Client';
import { Client } from '@/src/types';
import { ClientOnboardingInput } from '@/src/lib/utils/validation';

export class ClientService {
  /**
   * Get client by user ID
   */
  static async getByUserId(userId: string): Promise<Client | null> {
    await connectDB();
    const client = await ClientModel.findOne({ userId }).lean();
    if (!client) return null;
    return {
      ...client,
      _id: client._id.toString(),
      userId: client.userId.toString(),
      accountManagerId: client.accountManagerId?.toString(),
    } as Client;
  }

  /**
   * Get client by ID
   */
  static async getById(clientId: string): Promise<Client | null> {
    await connectDB();
    const client = await ClientModel.findById(clientId).lean();
    if (!client) return null;
    return {
      ...client,
      _id: client._id.toString(),
      userId: client.userId.toString(),
      accountManagerId: client.accountManagerId?.toString(),
    } as Client;
  }

  /**
   * Create a new client
   */
  static async create(userId: string, data: ClientOnboardingInput): Promise<Client> {
    await connectDB();
    
    // Check if client already exists for this user
    const existingClient = await ClientModel.findOne({ userId });
    if (existingClient) {
      throw new Error('Client profile already exists for this user');
    }
    
    const client = await ClientModel.create({
      userId,
      ...data,
      status: 'trial',
    });
    const clientObj = client.toObject();
    return {
      ...clientObj,
      _id: clientObj._id.toString(),
      userId: clientObj.userId.toString(),
      accountManagerId: clientObj.accountManagerId?.toString(),
    } as Client;
  }

  /**
   * Update client
   */
  static async update(clientId: string, data: Partial<Client>): Promise<Client | null> {
    await connectDB();
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { $set: data },
      { new: true }
    ).lean();
    if (!client) return null;
    return {
      ...client,
      _id: client._id.toString(),
      userId: client.userId.toString(),
      accountManagerId: client.accountManagerId?.toString(),
    } as Client;
  }

  /**
   * Get all clients (for admin)
   */
  static async getAll(limit: number = 50, skip: number = 0): Promise<Client[]> {
    await connectDB();
    const clients = await ClientModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean();
    return clients.map(client => ({
      ...client,
      _id: client._id.toString(),
      userId: client.userId.toString(),
      accountManagerId: client.accountManagerId?.toString(),
    })) as Client[];
  }

  /**
   * Delete client
   */
  static async delete(clientId: string): Promise<boolean> {
    await connectDB();
    const result = await ClientModel.findByIdAndDelete(clientId);
    return !!result;
  }
}

