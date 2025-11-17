'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClient } from '@/src/hooks/useClient';
import { useCampaigns } from '@/src/hooks/useCampaigns';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';
import Card from '@/src/components/ui/Card';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;
  const { client } = useClient();
  const { campaigns, loading: campaignsLoading } = useCampaigns(client?._id);
  
  const campaign = campaigns.find(c => c._id === campaignId);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'draft',
    budget: '',
    currency: 'USD',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        type: campaign.type,
        status: campaign.status,
        budget: campaign.budget?.toString() || '',
        currency: campaign.currency || 'USD',
        startDate: new Date(campaign.startDate).toISOString().split('T')[0],
        endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
      });
    }
  }, [campaign]);

  const campaignTypes = [
    { value: 'seo', label: 'SEO Campaign' },
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'facebook_ads', label: 'Facebook Ads' },
    { value: 'meta_ads', label: 'Meta (Facebook/Instagram) Ads' },
    { value: 'tiktok_ads', label: 'TikTok Ads' },
    { value: 'linkedin_ads', label: 'LinkedIn Ads' },
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          status: formData.status,
          budget: formData.budget ? parseFloat(formData.budget) : undefined,
          currency: formData.currency,
          startDate: new Date(formData.startDate),
          endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update campaign');
      }

      router.push(`/campaigns/${campaignId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete campaign');
      }

      router.push('/campaigns');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete campaign');
      setLoading(false);
    }
  };

  if (campaignsLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Campaign Not Found</h1>
        <p className="mt-4 text-gray-600">The campaign you're looking for doesn't exist.</p>
        <Button className="mt-6" onClick={() => router.push('/campaigns')}>
          Back to Campaigns
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Edit Campaign</h1>
          <p className="mt-2 text-gray-600">Update your campaign settings and details</p>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete Campaign
        </Button>
      </div>

      {/* Form */}
      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            )}

            <Input
              label="Campaign Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Summer Sale 2024"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Campaign Type
                </label>
                <select
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="">Select campaign type</option>
                  {campaignTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Budget (Optional)"
                type="number"
                step="0.01"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="0.00"
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Start Date"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              <Input
                label="End Date (Optional)"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <div className="flex gap-4 border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="inline-flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
