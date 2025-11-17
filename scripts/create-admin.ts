/**
 * Script to create an admin user
 * 
 * Usage:
 *   npx tsx scripts/create-admin.ts <email> <password> <name>
 * 
 * Example:
 *   npx tsx scripts/create-admin.ts admin@example.com Admin123 Admin User
 */

import connectDB from '../src/db/connect';
import UserModel from '../src/db/models/User';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> <password> [name]');
    console.error('Example: npx tsx scripts/create-admin.ts admin@example.com Admin123 "Admin User"');
    process.exit(1);
  }

  const [email, password, name] = args;

  try {
    await connectDB();
    console.log('✅ Connected to database');

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      // Update existing user to admin
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      existingUser.role = 'admin';
      if (name) existingUser.name = name;
      await existingUser.save();
      
      console.log('✅ Updated existing user to admin role');
      console.log(`   Email: ${email}`);
      console.log(`   Role: admin`);
      console.log(`   Name: ${existingUser.name}`);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = await UserModel.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || 'Admin User',
        role: 'admin',
      });

      console.log('✅ Admin user created successfully');
      console.log(`   Email: ${email}`);
      console.log(`   Role: admin`);
      console.log(`   Name: ${adminUser.name}`);
      console.log(`   ID: ${adminUser._id}`);
    }

    console.log('\n🎉 You can now log in at http://localhost:3000/login');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n📊 Admin dashboard: http://localhost:3000/admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();

