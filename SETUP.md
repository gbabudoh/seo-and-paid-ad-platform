# 🚀 Setup Guide - SEO & Paid Ad Platform

This guide will help you set up the platform for development.

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)
- Redis instance (for job queue - local or Redis Cloud)
- Git

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the environment template and fill in your values:

```bash
# Copy env.template to .env.local
cp env.template .env.local
```

**Required Environment Variables:**

- `MONGODB_URI` - Your MongoDB connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `REDIS_URL` - Your Redis connection string
- `STRIPE_SECRET_KEY` - Your Stripe secret key (for payments)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - For Google OAuth
- `META_APP_ID` & `META_APP_SECRET` - For Meta Ads API

### 3. Database Setup

#### MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally, then:
MONGODB_URI=mongodb://localhost:27017/seo-paid-ad-platform
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

#### Redis

**Option A: Local Redis**
```bash
# Install Redis locally, then:
REDIS_URL=redis://localhost:6379
```

**Option B: Redis Cloud**
1. Create account at https://redis.com/try-free/
2. Create database
3. Get connection string
4. Add to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
seo-and-paid-ad-platform/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Public marketing pages
│   ├── (auth)/             # Authentication pages
│   ├── (client)/           # Client dashboard
│   ├── (admin)/            # Admin backend
│   └── api/                # API routes
├── src/
│   ├── components/         # React components
│   ├── db/                 # Database models & connection
│   ├── lib/                # Business logic & utilities
│   │   ├── api/            # External API clients
│   │   ├── auth/           # Authentication config
│   │   ├── services/       # Core services
│   │   └── utils/          # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
└── public/                 # Static assets
```

## Key Features Implemented

✅ **Folder Structure** - Complete directory structure for scalable development  
✅ **Database Models** - Mongoose schemas for User, Client, Campaign, Report  
✅ **TypeScript Types** - Comprehensive type definitions  
✅ **Authentication** - NextAuth setup with Credentials & Google OAuth  
✅ **API Routes** - Basic API route structure  
✅ **Utility Functions** - Currency, date, validation utilities  
✅ **API Client Stubs** - Google Ads, Meta Ads, Stripe wrappers  

## Next Steps

1. **Complete Authentication Flow**
   - Add password hashing to User model
   - Implement registration API
   - Add protected route middleware

2. **Build Onboarding Wizard**
   - Multi-step form with validation
   - Save client data to database
   - Generate initial campaigns

3. **Implement API Integrations**
   - Google Ads API integration
   - Meta Ads API integration
   - SEO tools API integration

4. **Build Dashboard**
   - Data visualization components
   - Real-time reporting
   - Campaign management UI

5. **Set Up Job Queue**
   - Configure BullMQ workers
   - Schedule daily data pulls
   - Automated campaign optimization

## Testing

Test database connection:
```bash
curl http://localhost:3000/api/data/test
```

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB is running (if local)
- Verify network access (if Atlas)

### Redis Connection Issues
- Verify `REDIS_URL` is correct
- Check Redis is running (if local)
- Verify network access (if cloud)

### NextAuth Issues
- Ensure `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your app URL
- Check OAuth provider credentials

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NextAuth Documentation](https://next-auth.js.org/)
- [Stripe Documentation](https://stripe.com/docs)

