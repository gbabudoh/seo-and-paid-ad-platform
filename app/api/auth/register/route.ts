import { NextResponse } from 'next/server';
import connectDB from '@/src/db/connect';
import UserModel from '@/src/db/models/User';
import bcrypt from 'bcryptjs';
import { emailSchema, passwordSchema } from '@/src/lib/utils/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      const passwordErrors = passwordResult.error.errors.map(err => err.message).join(', ');
      return NextResponse.json(
        { 
          message: 'Password does not meet requirements',
          details: passwordErrors,
          errors: passwordResult.error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (Note: User model needs password field added)
    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword, // This field needs to be added to User model
      role: 'client',
    });

    return NextResponse.json(
      { message: 'User created successfully', userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

