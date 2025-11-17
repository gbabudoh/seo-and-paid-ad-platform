# Admin Dashboard Access Guide

## How to Access the Admin Dashboard

### Method 1: Using the API Endpoint (Development Only)

1. **Make a POST request** to create an admin user:
   ```bash
   curl -X POST http://localhost:3000/api/admin/create-admin \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@example.com",
       "password": "Admin123",
       "name": "Admin User"
     }'
   ```

2. **Or use a tool like Postman** or your browser's console:
   ```javascript
   fetch('/api/admin/create-admin', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'admin@example.com',
       password: 'Admin123',
       name: 'Admin User'
     })
   })
   ```

### Method 2: Using the Script (Recommended)

1. **Run the admin creation script**:
   ```bash
   npx tsx scripts/create-admin.ts admin@example.com Admin123 "Admin User"
   ```

   **Note:** You may need to install `tsx` first:
   ```bash
   npm install -D tsx
   ```

### Method 3: Manual Database Update

1. **Connect to your MongoDB database** (using MongoDB Compass, mongosh, or any MongoDB client)

2. **Find your user** in the `users` collection:
   ```javascript
   db.users.findOne({ email: "your-email@example.com" })
   ```

3. **Update the user's role** to `admin`:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

4. **Or create a new admin user**:
   ```javascript
   db.users.insertOne({
     email: "admin@example.com",
     name: "Admin User",
     password: "$2a$10$...", // You'll need to hash the password first
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

   **To hash a password**, you can use Node.js:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = bcrypt.hashSync('YourPassword123', 10);
   console.log(hash);
   ```

## Accessing the Admin Dashboard

Once you have an admin user:

1. **Log in** at `http://localhost:3000/login` with your admin credentials

2. **Navigate to** `http://localhost:3000/admin` - you'll be automatically redirected if you're not an admin

3. **Admin Dashboard Features**:
   - **Dashboard** (`/admin`) - Overview statistics and quick actions
   - **Clients** (`/admin/clients`) - Manage all client accounts
   - **Reports** (`/admin/reports`) - View platform reports
   - **Config** (`/admin/config`) - Platform configuration

## Security Notes

⚠️ **Important Security Considerations:**

1. **The `/api/admin/create-admin` endpoint is disabled in production** - it only works in development mode

2. **After creating your first admin**, consider:
   - Removing or securing the admin creation endpoint
   - Using environment variables for admin credentials
   - Implementing proper admin invitation system

3. **Best Practices**:
   - Use strong passwords for admin accounts
   - Limit admin access to trusted users only
   - Regularly audit admin user list
   - Use two-factor authentication (when implemented)

## Troubleshooting

### "Unauthorized" or "Forbidden" Error

- Make sure your user has `role: "admin"` in the database
- Check that you're logged in with the correct account
- Clear your browser cookies and log in again

### Can't Access Admin Routes

- Verify your session has the admin role: Check the browser's developer tools → Application → Cookies → `next-auth.session-token`
- Try logging out and logging back in
- Check the server logs for authentication errors

### Script Not Working

- Make sure MongoDB is running and accessible
- Check that `MONGODB_URI` is set correctly in `.env.local`
- Ensure you have the required dependencies installed (`bcryptjs`, `mongoose`)

## Quick Test

To quickly test admin access:

1. Create an admin user using Method 1 or 2 above
2. Log in at `http://localhost:3000/login`
3. Navigate to `http://localhost:3000/admin`
4. You should see the admin dashboard with statistics

