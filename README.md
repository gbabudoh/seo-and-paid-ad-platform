# MarketingHub - Unified SEO & Paid Ad Platform

A modern, enterprise-grade marketing platform that integrates SEO, GEO, and Paid Advertising across all platforms in one powerful dashboard.

![MarketingHub](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## 🚀 Features

### For Clients
- **Unified Dashboard** - Monitor all marketing channels in one place
- **Campaign Management** - Create and manage campaigns across Google Ads, Meta, LinkedIn, TikTok
- **Real-Time Analytics** - Track performance with live data and comprehensive reporting
- **AI-Powered Insights** - Get automated optimization recommendations
- **Multi-Platform Integration** - Connect all your marketing platforms seamlessly
- **Custom Reports** - Generate detailed performance reports on demand

### For Admins
- **Client Management** - Oversee all client accounts and campaigns
- **User Administration** - Manage team members and permissions
- **Platform Configuration** - Configure system settings and integrations
- **Analytics Dashboard** - Monitor platform-wide metrics and performance

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS 4
- **UI Components:** Custom component library with Lucide icons
- **API Integrations:** Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/gbabudoh/seo-and-paid-ad-platform.git
cd seo-and-paid-ad-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# API Keys (optional)
GOOGLE_ADS_API_KEY=your_google_ads_key
META_ADS_API_KEY=your_meta_ads_key
LINKEDIN_ADS_API_KEY=your_linkedin_ads_key
TIKTOK_ADS_API_KEY=your_tiktok_ads_key
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
seo-and-paid-ad-platform/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin routes
│   ├── (auth)/                   # Authentication pages
│   ├── (client)/                 # Client dashboard routes
│   ├── (marketing)/              # Public marketing pages
│   ├── admin/                    # Admin dashboard
│   └── api/                      # API routes
├── src/
│   ├── components/               # React components
│   │   ├── ui/                   # UI components (Button, Card, Input)
│   │   ├── layout/               # Layout components (Navbar, Sidebar, Footer)
│   │   └── features/             # Feature-specific components
│   ├── db/                       # Database models and connection
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities and services
│   │   ├── api/                  # API integrations
│   │   ├── auth/                 # Authentication config
│   │   ├── services/             # Business logic services
│   │   └── utils/                # Helper functions
│   └── types/                    # TypeScript type definitions
├── public/                       # Static assets
└── scripts/                      # Utility scripts
```

## 🎨 Design System

### Colors
- **Primary:** Indigo (#4F46E5)
- **Secondary:** Purple (#9333EA)
- **Success:** Emerald (#10B981)
- **Warning:** Amber (#F59E0B)
- **Error:** Red (#EF4444)
- **Sidebar:** #555454
- **Borders:** Gainsboro (#DCDCDC)

### Components
- Modern card-based layouts
- Gradient backgrounds and icons
- Smooth transitions and hover effects
- Responsive grid systems
- Professional typography

## 🔐 Authentication

The platform supports multiple authentication methods:
- Email/Password authentication
- Google OAuth
- Role-based access control (Admin, Client, Team Member)

## 📊 Key Pages

### Public Pages
- **Homepage** (`/`) - Landing page with features and How It Works
- **Pricing** (`/pricing`) - Package tiers and pricing information
- **Consultation** (`/consultation`) - Free consultation booking

### Client Dashboard
- **Dashboard** (`/dashboard`) - Overview with stats and metrics
- **Campaigns** (`/campaigns`) - Campaign management
- **Reports** (`/reports`) - Performance reports
- **Settings** (`/settings`) - Account and company settings

### Admin Dashboard
- **Admin Dashboard** (`/admin`) - Platform overview
- **Clients** (`/admin/clients`) - Client management
- **Configuration** (`/admin/config`) - System settings

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t marketinghub .
docker run -p 3000:3000 marketinghub
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Developer:** [Your Name]
- **Repository:** [gbabudoh](https://github.com/gbabudoh)

## 📞 Support

For support, email support@marketinghub.com or open an issue in the GitHub repository.

## 🎯 Roadmap

- [ ] Advanced AI-powered campaign optimization
- [ ] White-label reporting for agencies
- [ ] Mobile app (iOS & Android)
- [ ] Advanced analytics and forecasting
- [ ] Integration with more ad platforms
- [ ] Automated budget optimization
- [ ] Multi-language support
- [ ] API for third-party integrations

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set

---

**Built with ❤️ using Next.js and TypeScript**
