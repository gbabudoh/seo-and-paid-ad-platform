'use client';

import { useAuth } from '@/src/hooks/useAuth';
import { useClient } from '@/src/hooks/useClient';
import Card from '@/src/components/ui/Card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  MousePointerClick, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuth();
  const { client, loading: clientLoading } = useClient();

  if (clientLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Revenue',
      value: '$0',
      change: '+0%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    },
    {
      name: 'Total Traffic',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      name: 'Conversions',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: MousePointerClick,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      name: 'ROAS',
      value: '0x',
      change: '+0%',
      trend: 'up',
      icon: Target,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
  ];

  const recentActivity = [
    { action: 'Campaign launched', detail: 'Q4 Holiday Campaign', time: '2 hours ago', status: 'success' },
    { action: 'Report generated', detail: 'Monthly Performance Report', time: '5 hours ago', status: 'info' },
    { action: 'Budget updated', detail: 'Google Ads Campaign', time: '1 day ago', status: 'warning' },
  ];

  return (
    <div className="space-y-8">
      {/* Alert Banner */}
      {!client && (
        <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 shadow-sm">
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Activity className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">Setup Incomplete</h3>
                <p className="mt-1 text-sm text-amber-800">
                  Complete your onboarding to unlock all features and start tracking your marketing performance.
                </p>
                <a
                  href="/onboarding"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                >
                  Complete Setup
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Info Cards */}
      {client && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <Card.Content className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">{client.companyName}</h3>
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    {client.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Package Tier</p>
                  <h3 className="mt-2 text-2xl font-bold capitalize text-gray-900">{client.packageTier}</h3>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">ROI Target</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {client.roiExpectation.value}
                    {client.roiExpectation.type === 'roas' ? 'x' : ''}
                  </h3>
                  <p className="mt-2 text-sm capitalize text-gray-600">
                    {client.roiExpectation.type.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* Performance Stats */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            <p className="mt-1 text-sm text-gray-600">Real-time marketing metrics and insights</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === 'up';
            
            return (
              <Card key={stat.name} className="overflow-hidden transition-shadow hover:shadow-lg">
                <Card.Content className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                      <div className="mt-3 flex items-center gap-1">
                        {isPositive ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          isPositive ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500">vs last period</span>
                      </div>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart Placeholder */}
        <Card className="lg:col-span-2">
          <Card.Content className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex gap-2">
                <button className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">Week</button>
                <button className="rounded-lg px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">Month</button>
                <button className="rounded-lg px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">Year</button>
              </div>
            </div>
            <div className="flex h-64 items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center">
                <Activity className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm font-medium text-gray-600">Chart visualization coming soon</p>
                <p className="mt-1 text-xs text-gray-500">Connect your data sources to see insights</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card>
          <Card.Content className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.detail}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              View All Activity
            </button>
          </Card.Content>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Content className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <Target className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New Campaign</p>
                <p className="text-xs text-gray-600">Launch campaign</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition-all hover:border-purple-300 hover:bg-purple-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">View Reports</p>
                <p className="text-xs text-gray-600">Analytics & insights</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Budget Manager</p>
                <p className="text-xs text-gray-600">Manage spending</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Team Settings</p>
                <p className="text-xs text-gray-600">Manage access</p>
              </div>
            </button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

