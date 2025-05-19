import { useState, useEffect } from 'react';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;
const cache = new Map<string, any>();

interface FetchResponse<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

const useFetch = <T>(endpoint: string, queryParams: Record<string, string> = {}): FetchResponse<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${endpoint}:${JSON.stringify(queryParams)}`;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (cache.has(cacheKey)) {
        setData(cache.get(cacheKey));
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      try {
        const queryString = new URLSearchParams(queryParams).toString();
        const url = `${PUBLIC_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(`Veri çekme hatası, Status: ${response.status}, ${JSON.stringify(errorResult)}`);
        }
        const { data } = await response.json();
        if (!Array.isArray(data)) throw new Error('Geçersiz veri');
        cache.set(cacheKey, data);
        setData(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('Fetch hatası:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [cacheKey]);

  return { data, loading, error };
};

export default useFetch;