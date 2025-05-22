import { useState, useEffect } from 'react';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;
const cache = new Map<string, any>();

interface FetchResponse<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

interface FetchOptions {
  method?: 'GET' | 'POST';
  body?: any;
  headers?: Record<string, string>;
}

const useFetch = <T>(endpoint: string, queryParams: Record<string, string> = {}, options: FetchOptions = { method: 'GET' }, dependencies: any[] = []): FetchResponse<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${endpoint}:${JSON.stringify(queryParams)}:${options.method}`;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const queryString = new URLSearchParams(queryParams).toString();
        const url = `${PUBLIC_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : null,
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorResult = await response.json();
          let errorMessage = `Error: ${errorResult.error?.message || 'Unknown error'}`;
          if (errorResult.error?.details?.errors) {
            errorMessage = errorResult.error.details.errors
              .map((err: any) => err.message)
              .join(', ');
          }
          throw new Error(errorMessage);
        }

        const result = await response.json();
        const responseData = result.data || result;
        if (!Array.isArray(responseData)) throw new Error('Invalid data format');
        cache.set(cacheKey, responseData);
        setData(responseData);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('useFetch: Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [cacheKey, ...dependencies]);

  return { data, loading, error };
};

export default useFetch;