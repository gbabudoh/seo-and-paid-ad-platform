'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Card from '@/src/components/ui/Card';
import Button from '@/src/components/ui/Button';
import { ArrowLeft, Edit, Building2, Globe, Package, Target, DollarSign } from 'lucide-react';
import { Client } from '@/src/types';

export default function AdminClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const clientId = resolvedParams.id;
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`);
      if (response.ok) {
        const data = await response.json();
        setClient(data);
      }
    } catch (error) {
      console.error('Error fetching client:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading client details...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Client Not Found</h1>
        <p className="mt-4 text-gray-600">The client you're looking for doesn't exist.</p>
        <Button className="mt-4" onClick={() => router.push('/admin/clients')}>
          Back to Clients
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{client.companyName}</h1>
            <p className="mt-1 text-gray-600">{client.website}</p>
          </div>
        </div>
        <Button onClick={() => router.push(`/admin/clients/${clientId}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Client
        </Button>
      </div>

      {/* Status Badge */}
      <div>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
            client.status === 'active'
              ? 'bg-green-100 text-green-800'
              : client.status === 'trial'
              ? 'bg-amber-100 text-amber-800'
              : client.status === 'on_hold'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {client.status}
        </span>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Company</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{client.companyName}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Website</p>
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-lg font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  {client.website}
                </a>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Package</p>
                <p className="mt-1 text-lg font-semibold capitalize text-gray-900">
                  {client.packageTier}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <Card.Title>Business Information</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Industry</label>
                <p className="mt-1 capitalize text-gray-900">
                  {client.industry.replace(/_/g, ' ')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Target Countries</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {client.targetCountries.map((country, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Preferred Language</label>
                <p className="mt-1 text-gray-900">{client.preferredLanguage.toUpperCase()}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>ROI & Budget</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ROI Expectation</label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {client.roiExpectation.value}
                  {client.roiExpectation.type === 'roas' ? 'x' : ''} {client.roiExpectation.type.replace('_', ' ')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Budget Allocation</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SEO</span>
                    <span className="font-medium">{client.budgetAllocation.seo}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Google Ads</span>
                    <span className="font-medium">{client.budgetAllocation.googleAds}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Meta Ads</span>
                    <span className="font-medium">{client.budgetAllocation.metaAds}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

