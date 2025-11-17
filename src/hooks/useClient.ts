import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { Client } from '@/src/types';

export function useClient() {
  const { user, isAuthenticated } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    const fetchClient = async () => {
      try {
        const response = await fetch('/api/clients/me');
        if (!response.ok) {
          if (response.status === 401) {
            setError('Unauthorized - please log in');
          } else {
            throw new Error('Failed to fetch client data');
          }
          setLoading(false);
          return;
        }
        const data = await response.json();
        // Handle null response (client not found) as valid state
        setClient(data || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [isAuthenticated, user]);

  return { client, loading, error, refetch: () => setLoading(true) };
}

