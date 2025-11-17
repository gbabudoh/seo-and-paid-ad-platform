import mongoose, { Schema, Document, Model } from 'mongoose';
import { User } from '@/src/types';

export interface UserDocument extends Omit<User, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
  password?: string; // Password field for database (not in public User type)
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // Optional for OAuth users
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['admin', 'client', 'team_member'],
      default: 'client',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;

