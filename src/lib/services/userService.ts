import connectDB from '@/src/db/connect';
import UserModel from '@/src/db/models/User';
import { User } from '@/src/types';

export class UserService {
  /**
   * Get user by ID
   */
  static async getById(userId: string): Promise<User | null> {
    await connectDB();
    const user = await UserModel.findById(userId).lean();
    if (!user) return null;
    return {
      ...user,
      _id: user._id.toString(),
    } as User;
  }

  /**
   * Get user by email
   */
  static async getByEmail(email: string): Promise<User | null> {
    await connectDB();
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
    if (!user) return null;
    return {
      ...user,
      _id: user._id.toString(),
    } as User;
  }

  /**
   * Get all users (for admin)
   */
  static async getAll(limit: number = 50, skip: number = 0, role?: string): Promise<User[]> {
    await connectDB();
    const query = role ? { role } : {};
    const users = await UserModel.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean();
    return users.map(user => ({
      ...user,
      _id: user._id.toString(),
    })) as User[];
  }

  /**
   * Update user
   */
  static async update(userId: string, data: Partial<User>): Promise<User | null> {
    await connectDB();
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ).lean();
    if (!user) return null;
    return {
      ...user,
      _id: user._id.toString(),
    } as User;
  }

  /**
   * Delete user
   */
  static async delete(userId: string): Promise<boolean> {
    await connectDB();
    const result = await UserModel.findByIdAndDelete(userId);
    return !!result;
  }

  /**
   * Get user count by role
   */
  static async getCountByRole(): Promise<Record<string, number>> {
    await connectDB();
    const counts = await UserModel.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]);
    return counts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {} as Record<string, number>);
  }
}

