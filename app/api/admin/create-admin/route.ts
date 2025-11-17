import { NextResponse } from 'next/server';
import connectDB from '@/src/db/connect';
import UserModel from '@/src/db/models/User';
import bcrypt from 'bcryptjs';

/**
 * One-time admin creation endpoint
 * 
 * WARNING: This should be disabled in production after creating the first admin!
 * 
 * Usage: POST /api/admin/create-admin
 * Body: { email: string, password: string, name?: string }
 */
export async function POST(request: Request) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { message: 'This endpoint is disabled in production' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      // Update existing user to admin
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      existingUser.role = 'admin';
      if (name) existingUser.name = name;
      await existingUser.save();

      return NextResponse.json({
        message: 'User updated to admin role',
        user: {
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
        },
      });
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = await UserModel.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || 'Admin User',
        role: 'admin',
      });

      return NextResponse.json({
        message: 'Admin user created successfully',
        user: {
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
        },
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

