'use client';

import Link from 'next/link';
import { 
  TrendingUp, 
  Target, 
  Globe, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  LineChart,
  Star,
  Award,
  TrendingDown,
  DollarSign,
  Clock,
  Layers
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: TrendingUp,
      title: 'SEO Optimization',
      description: 'Track rankings, optimize content, and build sustainable organic traffic with advanced analytics.',
      color: 'from-emerald-500 to-emerald-600',
      stats: '10K+ keywords tracked'
    },
    {
      icon: Target,
      title: 'Paid Advertising',
      description: 'Manage Google Ads, Meta, TikTok, and LinkedIn campaigns from one unified dashboard.',
      color: 'from-blue-500 to-blue-600',
      stats: '$50M+ ad spend managed'
    },
    {
      icon: Globe,
      title: 'Geo-Targeting',
      description: 'Optimize campaigns for global markets with multi-currency and multi-language support.',
      color: 'from-purple-500 to-purple-600',
      stats: '150+ countries supported'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Get instant insights into campaign performance with comprehensive reporting tools.',
      color: 'from-orange-500 to-orange-600',
      stats: 'Sub-second data refresh'
    },
    {
      icon: Zap,
      title: 'AI Automation',
      description: 'Automate repetitive tasks and optimize campaigns with AI-powered recommendations.',
      color: 'from-yellow-500 to-yellow-600',
      stats: '80% time saved'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC 2 compliance and advanced data protection.',
      color: 'from-red-500 to-red-600',
      stats: 'SOC 2 Type II certified'
    }
  ];

  const benefits = [
    'Unified dashboard for all marketing channels',
    'Real-time performance tracking',
    'AI-powered optimization recommendations',
    'Multi-platform campaign management',
    'Advanced ROI analytics',
    'White-label reporting'
  ];

  const stats = [
    { value: '10K+', label: 'Active Campaigns', icon: Rocket },
    { value: '500+', label: 'Enterprise Clients', icon: Users },
    { value: '99.9%', label: 'Uptime SLA', icon: Shield },
    { value: '24/7', label: 'Support', icon: Clock }
  ];

  const testimonials = [
    {
      quote: "MarketingHub transformed our digital strategy. We've seen a 300% increase in ROI within 6 months.",
      author: "Sarah Johnson",
      role: "CMO, TechCorp",
      rating: 5
    },
    {
      quote: "The unified dashboard saves us hours every day. Best marketing platform we've ever used.",
      author: "Michael Chen",
      role: "Marketing Director, GrowthLabs",
      rating: 5
    },
    {
      quote: "Finally, a platform that brings all our marketing channels together. Game changer for our team.",
      author: "Emily Rodriguez",
      role: "VP Marketing, ScaleUp Inc",
      rating: 5
    }
  ];

  const integrations = [
    'Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'TikTok Ads', 
    'Google Analytics', 'Shopify', 'WordPress', 'HubSpot'
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-24 sm:py-32">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                <Sparkles className="h-4 w-4" />
                <span>Trusted by 500+ Enterprise Clients</span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                Unified Marketing
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Platform</span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                Integrate SEO, GEO, and Paid Advertising across all platforms in one powerful dashboard.
                Maximize your ROI with data-driven insights and automated campaign management.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/50"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all hover:border-indigo-600 hover:text-indigo-600"
                >
                  View Pricing
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-white py-20" style={{ borderColor: '#DCDCDC' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 transition-all group-hover:bg-indigo-600">
                      <Icon className="h-6 w-6 text-indigo-600 transition-colors group-hover:text-white" />
                    </div>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                    <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 px-4 py-24">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                <Layers className="h-4 w-4" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Everything you need to scale
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Powerful features to help you manage and optimize your marketing campaigns across all channels
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-indigo-200 hover:shadow-2xl"
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className={`relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg transition-transform group-hover:scale-110`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="relative mt-6 text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="relative mt-3 text-gray-600">
                      {feature.description}
                    </p>
                    <div className="relative mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600">
                      <Award className="h-4 w-4" />
                      <span>{feature.stats}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white px-4 py-24">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                <Rocket className="h-4 w-4" />
                <span>Simple Process</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                How MarketingHub Works
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Get started in minutes and see results in days. Our streamlined process makes marketing management effortless.
              </p>
            </div>
            
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-200 via-purple-200 to-indigo-200 lg:block" />
              
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="lg:text-right">
                    <div className="inline-block rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 lg:float-right">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-2xl font-bold text-white shadow-lg">
                        1
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">Sign Up & Connect</h3>
                      <p className="text-gray-600">
                        Create your account in under 2 minutes. Connect your existing marketing platforms - Google Ads, Facebook, LinkedIn, and more. Our secure OAuth integration ensures your data stays protected.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 lg:justify-end">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">Google Ads</span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">Meta Ads</span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">LinkedIn</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block" />
                </div>

                {/* Step 2 */}
                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="hidden lg:block" />
                  <div>
                    <div className="inline-block rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 text-2xl font-bold text-white shadow-lg">
                        2
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">Set Your Goals</h3>
                      <p className="text-gray-600">
                        Define your marketing objectives and KPIs. Whether it's increasing ROAS, driving traffic, or boosting conversions, our AI helps you set realistic, data-driven targets based on your industry benchmarks.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <span className="text-sm text-gray-700">Revenue targets</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <span className="text-sm text-gray-700">ROAS objectives</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <span className="text-sm text-gray-700">Traffic goals</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="lg:text-right">
                    <div className="inline-block rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 lg:float-right">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-2xl font-bold text-white shadow-lg">
                        3
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">Launch Campaigns</h3>
                      <p className="text-gray-600">
                        Create and launch campaigns across multiple platforms from one unified dashboard. Use our AI-powered recommendations to optimize ad copy, targeting, and budgets for maximum performance.
                      </p>
                      <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Campaign Setup Time</span>
                          <span className="font-bold text-emerald-600">5 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block" />
                </div>

                {/* Step 4 */}
                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="hidden lg:block" />
                  <div>
                    <div className="inline-block rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-2xl font-bold text-white shadow-lg">
                        4
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">Track & Optimize</h3>
                      <p className="text-gray-600">
                        Monitor real-time performance across all channels in one dashboard. Get AI-powered insights and automated optimization suggestions. Receive alerts when campaigns need attention or hit milestones.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-white p-3 shadow-sm">
                          <p className="text-xs text-gray-600">Real-time Data</p>
                          <p className="mt-1 text-lg font-bold text-gray-900">Live</p>
                        </div>
                        <div className="rounded-lg bg-white p-3 shadow-sm">
                          <p className="text-xs text-gray-600">Auto Reports</p>
                          <p className="mt-1 text-lg font-bold text-gray-900">Daily</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="lg:text-right">
                    <div className="inline-block rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 lg:float-right">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 text-2xl font-bold text-white shadow-lg">
                        5
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">Scale & Grow</h3>
                      <p className="text-gray-600">
                        As you see results, easily scale successful campaigns with one click. Our platform automatically adjusts budgets, expands targeting, and replicates winning strategies across channels to maximize your growth.
                      </p>
                      <div className="mt-4 flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                        <TrendingUp className="h-8 w-8 text-emerald-600" />
                        <div className="text-left">
                          <p className="text-xs text-gray-600">Average Growth</p>
                          <p className="text-xl font-bold text-gray-900">247%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                Free 14-day trial • No credit card required
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 px-4 py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Why choose MarketingHub?
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Built for modern marketing teams who demand performance, reliability, and results.
                </p>
                <div className="mt-8 space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-emerald-600" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                  >
                    Start Your Free Trial
                    <Rocket className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                        <LineChart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Revenue Growth</p>
                        <p className="text-2xl font-bold text-gray-900">+247%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Campaign ROAS</p>
                        <p className="text-2xl font-bold text-gray-900">8.5x</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">12.4K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white px-4 py-24">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                <Star className="h-4 w-4 fill-amber-700" />
                <span>Loved by Marketing Teams</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                What our clients say
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 transition-all hover:shadow-xl"
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="border-y bg-gray-50 px-4 py-20" style={{ borderColor: '#DCDCDC' }}>
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Integrates with your favorite tools
              </h2>
              <p className="mt-3 text-gray-600">
                Connect seamlessly with the platforms you already use
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="flex h-20 w-40 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-4 transition-all hover:border-indigo-300 hover:shadow-lg"
                >
                  <span className="font-semibold text-gray-700">{integration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-4 py-24">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))]" />
          <div className="container relative mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Start Your Free 14-Day Trial</span>
              </div>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Ready to transform your marketing?
              </h2>
              <p className="mt-4 text-xl text-indigo-100">
                Join 500+ companies already using MarketingHub to drive growth and maximize ROI
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-2xl transition-all hover:scale-105 hover:bg-gray-50"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Book a Demo
                </Link>
              </div>
              <p className="mt-6 text-sm text-indigo-200">
                No credit card required • Cancel anytime • 24/7 support
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

