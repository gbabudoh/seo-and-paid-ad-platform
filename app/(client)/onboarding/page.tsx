'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';
import Card from '@/src/components/ui/Card';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    industry: '',
    targetCountries: [] as string[],
    preferredLanguage: 'en',
    packageTier: '',
    roiType: '',
    roiValue: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const industries = [
    'ecommerce_fashion',
    'ecommerce_electronics',
    'b2b_saas',
    'local_service_plumbing',
    'local_service_electrician',
    'healthcare',
    'real_estate',
    'education',
    'finance',
    'other',
  ];

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    
    // Client-side validation
    if (!formData.companyName || !formData.website || !formData.industry) {
      setError('Please complete all required fields in step 1');
      setStep(1);
      setLoading(false);
      return;
    }
    
    if (!formData.packageTier || !formData.roiType || !formData.roiValue) {
      setError('Please complete all required fields');
      setLoading(false);
      return;
    }

    // Validate ROI value is a number
    const roiValueNum = parseFloat(formData.roiValue);
    if (isNaN(roiValueNum) || roiValueNum <= 0) {
      setError('ROI value must be a positive number');
      setLoading(false);
      return;
    }

    // Validate target countries
    if (!formData.targetCountries || formData.targetCountries.length === 0) {
      setError('Please enter at least one target country (e.g., US, GB, CA)');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/clients/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show detailed error message
        const errorMessage = data.errors 
          ? data.errors.map((e: { path: string; message: string }) => `${e.path}: ${e.message}`).join(', ')
          : data.message || 'Failed to complete setup';
        setError(errorMessage);
        setLoading(false);
        return;
      }

      // Success - redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Welcome! Let's get started</h1>
          <p className="mt-2 text-gray-600">Step {step} of 3</p>
          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <Card.Content>
            {error && (
              <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            )}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Business Information</h2>
                <Input
                  label="Company Name"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
                <Input
                  label="Website URL"
                  type="url"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} disabled={!formData.companyName || !formData.website || !formData.industry}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Targeting & Goals</h2>
                <Input
                  label="Target Countries (comma-separated ISO codes, e.g., US,GB,CA)"
                  value={formData.targetCountries.join(',')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetCountries: e.target.value.split(',').map((c) => c.trim()),
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Language
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="ml-auto">
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Package & ROI Expectations</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Tier
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    value={formData.packageTier}
                    onChange={(e) => setFormData({ ...formData, packageTier: e.target.value })}
                    required
                  >
                    <option value="">Select package</option>
                    <option value="bronze">Bronze - $499/month</option>
                    <option value="silver">Silver - $999/month</option>
                    <option value="gold">Gold - $1999/month</option>
                    <option value="enterprise">Enterprise - Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ROI Expectation Type
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    value={formData.roiType}
                    onChange={(e) => setFormData({ ...formData, roiType: e.target.value })}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="roas">Return on Ad Spend (ROAS)</option>
                    <option value="leads">Lead Generation</option>
                    <option value="sales">Sales Volume</option>
                    <option value="brand_awareness">Brand Awareness</option>
                  </select>
                </div>
                <Input
                  label="Expected Value (e.g., 3 for 3x ROAS or 50 for 50 leads/month)"
                  type="number"
                  step="0.1"
                  value={formData.roiValue}
                  onChange={(e) => setFormData({ ...formData, roiValue: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500">
                  Enter a numeric value (e.g., 3 for 3x ROAS, 50 for 50 leads)
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading} className="ml-auto">
                    {loading ? 'Completing...' : 'Complete Setup'}
                  </Button>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

