'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import Card from '@/src/components/ui/Card';
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
} from 'lucide-react';

interface DashboardStats {
  totalClients: number;
  activeClients: number;
  trialClients: number;
  totalUsers: number;
  totalCampaigns: number;
  totalRevenue: number;
  recentClients: any[];
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeClients: 0,
    trialClients: 0,
    totalUsers: 0,
    totalCampaigns: 0,
    totalRevenue: 0,
    recentClients: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, usersRes, campaignsRes] = await Promise.all([
          fetch('/api/admin/clients'),
          fetch('/api/admin/users'),
          fetch('/api/admin/stats'),
        ]);

        const clientsData = await clientsRes.json();
        const usersData = await usersRes.json();
        const statsData = await campaignsRes.json();

        setStats({
          totalClients: clientsData.clients?.length || 0,
          activeClients: clientsData.clients?.filter((c: any) => c.status === 'active').length || 0,
          trialClients: clientsData.clients?.filter((c: any) => c.status === 'trial').length || 0,
          totalUsers: usersData.users?.length || 0,
          totalCampaigns: statsData.totalCampaigns || 0,
          totalRevenue: statsData.totalRevenue || 0,
          recentClients: clientsData.clients?.slice(0, 5) || [],
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Clients',
      value: stats.totalClients,
      icon: Building2,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      change: '+0',
    },
    {
      name: 'Active Clients',
      value: stats.activeClients,
      icon: CheckCircle2,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      change: '+0',
    },
    {
      name: 'Trial Clients',
      value: stats.trialClients,
      icon: Clock,
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      change: '+0',
    },
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      change: '+0',
    },
    {
      name: 'Total Campaigns',
      value: stats.totalCampaigns,
      icon: BarChart3,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      change: '+0',
    },
    {
      name: 'Total Revenue',
      value: `${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      change: '+0%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user?.name || 'Admin'}. Here's an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="overflow-hidden transition-shadow hover:shadow-lg">
              <Card.Content className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="mt-3 flex items-center gap-1">
                      <span className="text-sm font-medium text-emerald-600">
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">vs last month</span>
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

      {/* Recent Clients */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <Card.Title>Recent Clients</Card.Title>
          </Card.Header>
          <Card.Content>
            {stats.recentClients.length === 0 ? (
              <div className="py-8 text-center">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">No clients yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentClients.map((client: any) => (
                  <div
                    key={client._id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{client.companyName}</p>
                      <p className="mt-1 text-sm text-gray-600">{client.website}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            client.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : client.status === 'trial'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {client.status}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {client.packageTier} Plan
                        </span>
                      </div>
                    </div>
                    <a
                      href={`/admin/clients/${client._id}`}
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <a
                href="/admin/clients"
                className="block rounded-lg border border-gray-200 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                View All Clients
              </a>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <a
                href="/admin/clients"
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-indigo-300 hover:bg-indigo-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Manage Clients</p>
                  <p className="text-xs text-gray-600">View and manage all client accounts</p>
                </div>
              </a>
              <a
                href="/admin/users"
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-purple-300 hover:bg-purple-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-xs text-gray-600">View and manage user accounts</p>
                </div>
              </a>
              <a
                href="/admin/config"
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-emerald-300 hover:bg-emerald-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Platform Config</p>
                  <p className="text-xs text-gray-600">Configure platform settings</p>
                </div>
              </a>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
