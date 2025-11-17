'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/src/components/ui/Card';
import Button from '@/src/components/ui/Button';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Client } from '@/src/types';

export default function AdminClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchClients();
  }, [statusFilter]);

  const fetchClients = async () => {
    try {
      const url = statusFilter !== 'all' 
        ? `/api/admin/clients?status=${statusFilter}`
        : '/api/admin/clients';
      const response = await fetch(url);
      const data = await response.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId: string) => {
    if (!confirm('Are you sure you want to delete this client?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchClients(); // Refresh list
      } else {
        alert('Failed to delete client');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error deleting client');
    }
  };

  const filteredClients = clients.filter((client) =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="mt-2 text-gray-600">
            Manage all client accounts and their settings
          </p>
        </div>
        <Button onClick={() => router.push('/admin/clients/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <Card.Content className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name or website..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Clients List */}
      {filteredClients.length === 0 ? (
        <Card>
          <Card.Content className="py-12 text-center">
            <p className="text-gray-600">No clients found.</p>
          </Card.Content>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredClients.map((client) => (
            <Card key={client._id} className="transition-shadow hover:shadow-lg">
              <Card.Content className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {client.companyName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">{client.website}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                          <span className="text-xs text-gray-500 capitalize">
                            {client.packageTier} Plan
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {client.industry.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/clients/${client._id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/clients/${client._id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(client._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <Card.Content className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            <p className="mt-1 text-sm text-gray-600">Total Clients</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {clients.filter((c) => c.status === 'active').length}
            </p>
            <p className="mt-1 text-sm text-gray-600">Active</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {clients.filter((c) => c.status === 'trial').length}
            </p>
            <p className="mt-1 text-sm text-gray-600">Trial</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">
              {clients.filter((c) => c.status === 'cancelled').length}
            </p>
            <p className="mt-1 text-sm text-gray-600">Cancelled</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
