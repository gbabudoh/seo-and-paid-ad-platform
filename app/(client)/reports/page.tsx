'use client';

import Card from '@/src/components/ui/Card';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Search,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Share2,
  Clock
} from 'lucide-react';

export default function ReportsPage() {
  const reportCategories = [
    {
      title: 'SEO Performance',
      icon: Search,
      color: 'from-blue-500 to-blue-600',
      reports: [
        { name: 'Monthly SEO Overview', date: 'Nov 2025', status: 'ready', size: '2.4 MB' },
        { name: 'Keyword Rankings Report', date: 'Nov 2025', status: 'ready', size: '1.8 MB' },
        { name: 'Backlink Analysis', date: 'Oct 2025', status: 'ready', size: '3.1 MB' },
      ]
    },
    {
      title: 'Paid Advertising',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      reports: [
        { name: 'Google Ads Performance', date: 'Nov 2025', status: 'ready', size: '1.9 MB' },
        { name: 'Facebook Ads Report', date: 'Nov 2025', status: 'processing', size: '2.2 MB' },
        { name: 'Campaign ROI Analysis', date: 'Oct 2025', status: 'ready', size: '2.7 MB' },
      ]
    },
    {
      title: 'Analytics & Insights',
      icon: BarChart3,
      color: 'from-emerald-500 to-emerald-600',
      reports: [
        { name: 'Website Traffic Report', date: 'Nov 2025', status: 'ready', size: '3.5 MB' },
        { name: 'Conversion Funnel Analysis', date: 'Nov 2025', status: 'ready', size: '2.1 MB' },
        { name: 'User Behavior Insights', date: 'Oct 2025', status: 'ready', size: '2.8 MB' },
      ]
    },
    {
      title: 'Social Media',
      icon: Share2,
      color: 'from-orange-500 to-orange-600',
      reports: [
        { name: 'Social Engagement Report', date: 'Nov 2025', status: 'ready', size: '1.6 MB' },
        { name: 'Content Performance', date: 'Nov 2025', status: 'ready', size: '2.0 MB' },
        { name: 'Audience Demographics', date: 'Oct 2025', status: 'ready', size: '1.4 MB' },
      ]
    },
  ];

  const quickStats = [
    { label: 'Total Reports', value: '12', icon: FileText },
    { label: 'This Month', value: '8', icon: Calendar },
    { label: 'Processing', value: '1', icon: Clock },
    { label: 'Downloaded', value: '45', icon: Download },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="mt-2 text-gray-600">
          Access detailed performance reports and analytics for your marketing campaigns
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="transition-shadow hover:shadow-lg">
              <Card.Content className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <Card.Content className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
              Date Range
            </button>
          </div>
        </Card.Content>
      </Card>

      {/* Report Categories */}
      <div className="space-y-8">
        {reportCategories.map((category) => {
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.title}>
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} shadow-lg`}>
                  <CategoryIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {category.reports.map((report, index) => (
                  <Card key={index} className="transition-all hover:shadow-lg">
                    <Card.Content className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                              <FileText className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{report.name}</h3>
                              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {report.date}
                                </span>
                                <span>{report.size}</span>
                              </div>
                              <div className="mt-3">
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  report.status === 'ready' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {report.status === 'ready' ? 'Ready' : 'Processing'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button 
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                          disabled={report.status !== 'ready'}
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        <button 
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                          disabled={report.status !== 'ready'}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Custom Report */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <Card.Content className="p-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <PieChart className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Need a Custom Report?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Generate custom reports tailored to your specific needs and metrics
            </p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
              <LineChart className="h-4 w-4" />
              Generate Custom Report
            </button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

