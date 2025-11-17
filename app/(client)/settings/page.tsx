'use client';

import { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useClient } from '@/src/hooks/useClient';
import Card from '@/src/components/ui/Card';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';
import { 
  User, 
  Building2, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Key,
  Mail,
  Phone,
  MapPin,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  Trash2,
  Plus
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { client } = useClient();
  const [activeTab, setActiveTab] = useState('account');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings, preferences, and billing information
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <Check className="h-5 w-5 text-emerald-600" />
          <p className="text-sm font-medium text-emerald-800">Settings saved successfully!</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-100">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          <Card>
            <Card.Content className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white">
                  {user?.name?.[0] || user?.email?.[0] || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                  <p className="text-sm text-gray-600">Update your profile photo</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">Upload New</Button>
                    <Button size="sm" variant="ghost">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input 
                    label="Full Name" 
                    defaultValue={user?.name || ''} 
                    icon={<User className="h-4 w-4" />}
                  />
                  <Input 
                    label="Email Address" 
                    type="email" 
                    defaultValue={user?.email || ''} 
                    icon={<Mail className="h-4 w-4" />}
                  />
                  <Input 
                    label="Phone Number" 
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    icon={<Phone className="h-4 w-4" />}
                  />
                  <Input 
                    label="Job Title" 
                    placeholder="e.g., Marketing Manager"
                  />
                </div>
                <Button onClick={handleSave} className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* Company Tab */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          <Card>
            <Card.Content className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Company Details</h3>
              <div className="space-y-4">
                <Input 
                  label="Company Name" 
                  defaultValue={client?.companyName || ''} 
                  icon={<Building2 className="h-4 w-4" />}
                />
                <Input 
                  label="Website" 
                  type="url" 
                  defaultValue={client?.website || ''} 
                  icon={<Globe className="h-4 w-4" />}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input 
                    label="Industry" 
                    placeholder="e.g., Technology, Retail"
                  />
                  <Input 
                    label="Company Size" 
                    placeholder="e.g., 10-50 employees"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Company Address
                  </label>
                  <div className="space-y-4">
                    <Input placeholder="Street Address" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Input placeholder="City" />
                      <Input placeholder="State/Province" />
                      <Input placeholder="Postal Code" />
                    </div>
                    <Input placeholder="Country" />
                  </div>
                </div>
                <Button onClick={handleSave} className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <Card>
            <Card.Content className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Current Plan</h3>
              <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-6">
                <div>
                  <p className="text-sm text-gray-600">Package Tier</p>
                  <p className="mt-1 text-2xl font-bold capitalize text-gray-900">
                    {client?.packageTier || 'No Plan'}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Status: <span className="font-medium capitalize">{client?.status || 'N/A'}</span>
                  </p>
                </div>
                <Button variant="outline">Upgrade Plan</Button>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                <Button size="sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">Edit</Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="p-6">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">Billing History</h3>
              <div className="divide-y divide-gray-100">
                {[
                  { date: 'Nov 1, 2025', amount: '$99.00', status: 'Paid', invoice: '#INV-001' },
                  { date: 'Oct 1, 2025', amount: '$99.00', status: 'Paid', invoice: '#INV-002' },
                  { date: 'Sep 1, 2025', amount: '$99.00', status: 'Paid', invoice: '#INV-003' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.invoice}</p>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900">{item.amount}</span>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        {item.status}
                      </span>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <Card.Content className="p-6">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">Email Notifications</h3>
              <div className="divide-y divide-gray-100">
                {[
                  { label: 'Campaign Updates', description: 'Get notified about campaign performance and status changes' },
                  { label: 'Weekly Reports', description: 'Receive weekly performance summaries via email' },
                  { label: 'Budget Alerts', description: 'Alerts when campaigns reach budget thresholds' },
                  { label: 'New Features', description: 'Updates about new features and improvements' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start justify-between py-4 first:pt-0 last:pb-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    </div>
                    <label className="relative ml-4 inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <Card.Content className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Change Password</h3>
              <div className="space-y-4">
                <Input 
                  label="Current Password" 
                  type="password" 
                  icon={<Key className="h-4 w-4" />}
                />
                <Input 
                  label="New Password" 
                  type="password" 
                  icon={<Key className="h-4 w-4" />}
                />
                <Input 
                  label="Confirm New Password" 
                  type="password" 
                  icon={<Key className="h-4 w-4" />}
                />
                <Button onClick={handleSave} className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
              <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Not Enabled</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                  <Button size="sm" className="mt-3">Enable 2FA</Button>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="p-6">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">Active Sessions</h3>
              <div className="divide-y divide-gray-100">
                {[
                  { device: 'Chrome on Windows', location: 'New York, US', time: 'Active now' },
                  { device: 'Safari on iPhone', location: 'New York, US', time: '2 hours ago' },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="font-medium text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-600">{session.location} • {session.time}</p>
                    </div>
                    <Button size="sm" variant="ghost">Revoke</Button>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

