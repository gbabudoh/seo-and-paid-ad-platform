'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useCampaigns } from '@/src/hooks/useCampaigns';
import { useClient } from '@/src/hooks/useClient';
import Card from '@/src/components/ui/Card';
import Button from '@/src/components/ui/Button';

export default function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;
  const { client } = useClient();
  const { campaigns, loading } = useCampaigns(client?._id);
  
  const campaign = campaigns.find(c => c._id === campaignId);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Campaign Details</h1>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Campaign Not Found</h1>
        <p className="mt-4 text-gray-600">The campaign you're looking for doesn't exist.</p>
        <Button className="mt-4" onClick={() => router.push('/campaigns')}>
          Back to Campaigns
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            ← Back
          </Button>
          <h1 className="mt-4 text-3xl font-bold">{campaign.name}</h1>
          <p className="mt-2 text-gray-600 capitalize">
            {campaign.type.replace('_', ' ')} Campaign
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <Card.Header>
            <Card.Title>Campaign Information</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <p className={`mt-1 text-lg font-semibold capitalize ${
                  campaign.status === 'active' ? 'text-green-600' :
                  campaign.status === 'paused' ? 'text-yellow-600' :
                  'text-gray-600'
                }`}>
                  {campaign.status}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Type</label>
                <p className="mt-1 text-lg capitalize">{campaign.type.replace('_', ' ')}</p>
              </div>
              {campaign.budget && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Budget</label>
                  <p className="mt-1 text-lg font-semibold">
                    {campaign.currency} {campaign.budget.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Timeline</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Start Date</label>
                <p className="mt-1 text-lg">
                  {new Date(campaign.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              {campaign.endDate && (
                <div>
                  <label className="text-sm font-medium text-gray-600">End Date</label>
                  <p className="mt-1 text-lg">
                    {new Date(campaign.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(campaign.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card className="md:col-span-2">
          <Card.Header>
            <Card.Title>Campaign Settings</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {campaign.settings.targetKeywords && campaign.settings.targetKeywords.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Target Keywords</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {campaign.settings.targetKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {campaign.settings.targetLocations && campaign.settings.targetLocations.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Target Locations</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {campaign.settings.targetLocations.map((location, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(!campaign.settings.targetKeywords || campaign.settings.targetKeywords.length === 0) &&
               (!campaign.settings.targetLocations || campaign.settings.targetLocations.length === 0) && (
                <p className="text-gray-500">No settings configured yet.</p>
              )}
            </div>
          </Card.Content>
        </Card>

        <Card className="md:col-span-2">
          <Card.Header>
            <Card.Title>Performance</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-500">Performance metrics will appear here once the campaign starts collecting data.</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

