// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

interface FetchResponse<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

const useFetch = <T>(endpoint: string, queryParams: Record<string, string> = {}): FetchResponse<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryString = new URLSearchParams(queryParams).toString();
        const url = `${PUBLIC_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(`Veri çekme hatası, Status: ${response.status}, ${JSON.stringify(errorResult)}`);
        }
        const { data } = await response.json();
        if (!Array.isArray(data)) throw new Error('Geçersiz veri');
        setData(data);
        setError(null);
      } catch (err) {
        console.error('Fetch hatası:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(queryParams)]);

  return { data, loading, error };
};

export default useFetch;