import { useState, useEffect } from 'react';
import { Campaign } from '@/src/types';

export function useCampaigns(clientId?: string) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const url = clientId ? `/api/campaigns?clientId=${clientId}` : '/api/campaigns';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [clientId]);

  return { campaigns, loading, error, refetch: () => setLoading(true) };
}

