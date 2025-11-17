'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';
import { useClient } from '@/src/hooks/useClient';
import { useCampaigns } from '@/src/hooks/useCampaigns';
import Card from '@/src/components/ui/Card';
import Button from '@/src/components/ui/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Calendar,
  BarChart3,
  Play,
  Pause,
  Eye,
  Edit,
  MoreVertical,
  Rocket,
  Activity,
  Clock
} from 'lucide-react';

export default function CampaignsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { client } = useClient();
  const { campaigns, loading } = useCampaigns(client?._id);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Campaigns', value: campaigns.length.toString(), icon: Rocket, color: 'from-blue-500 to-blue-600' },
    { label: 'Active', value: campaigns.filter(c => c.status === 'active').length.toString(), icon: Play, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Paused', value: campaigns.filter(c => c.status === 'paused').length.toString(), icon: Pause, color: 'from-amber-500 to-amber-600' },
    { label: 'Total Budget', value: `$${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}`, icon: DollarSign, color: 'from-purple-500 to-purple-600' },
  ];

  const getCampaignIcon = (type: string) => {
    switch (type) {
      case 'google_ads':
      case 'facebook_ads':
      case 'linkedin_ads':
        return Target;
      case 'seo':
        return TrendingUp;
      default:
        return BarChart3;
    }
  };

  const getCampaignColor = (type: string) => {
    switch (type) {
      case 'google_ads':
        return 'from-blue-500 to-blue-600';
      case 'facebook_ads':
        return 'from-indigo-500 to-indigo-600';
      case 'linkedin_ads':
        return 'from-cyan-500 to-cyan-600';
      case 'seo':
        return 'from-emerald-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="mt-2 text-gray-600">
            Manage and monitor your marketing campaigns across all channels
          </p>
        </div>
        <Button 
          onClick={() => router.push('/campaigns/create')}
          className="inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      {campaigns.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="transition-shadow hover:shadow-lg">
                <Card.Content className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      )}

      {/* Search and Filters */}
      {campaigns.length > 0 && (
        <Card>
          <Card.Content className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <option>All Types</option>
                <option>Google Ads</option>
                <option>Facebook Ads</option>
                <option>LinkedIn Ads</option>
                <option>SEO</option>
              </select>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Campaigns Grid */}
      {campaigns.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
          <Card.Content className="py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <Rocket className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No campaigns yet</h3>
            <p className="mt-2 text-sm text-gray-600">
              Get started by creating your first marketing campaign
            </p>
            <Button 
              className="mt-6 inline-flex items-center gap-2" 
              onClick={() => router.push('/campaigns/create')}
            >
              <Plus className="h-4 w-4" />
              Create Your First Campaign
            </Button>
          </Card.Content>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((campaign) => {
            const CampaignIcon = getCampaignIcon(campaign.type);
            const campaignColor = getCampaignColor(campaign.type);
            
            return (
              <Card key={campaign._id} className="transition-all hover:shadow-lg">
                <Card.Content className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${campaignColor} shadow-lg`}>
                        <CampaignIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{campaign.name}</h3>
                        <p className="mt-1 text-xs text-gray-500 capitalize">
                          {campaign.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <button className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      campaign.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : campaign.status === 'paused'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status === 'active' && <Activity className="h-3 w-3" />}
                      {campaign.status === 'paused' && <Pause className="h-3 w-3" />}
                      {campaign.status === 'draft' && <Clock className="h-3 w-3" />}
                      <span className="capitalize">{campaign.status}</span>
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                    {campaign.budget && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Budget</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {campaign.currency} {campaign.budget.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Start Date</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(campaign.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    {campaign.endDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">End Date</span>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Performance Metrics */}
                  <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Clicks</p>
                      <p className="mt-1 text-lg font-bold text-gray-900">0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Conv.</p>
                      <p className="mt-1 text-lg font-bold text-gray-900">0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">ROAS</p>
                      <p className="mt-1 text-lg font-bold text-gray-900">0x</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/campaigns/${campaign._id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/campaigns/${campaign._id}/edit`)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

