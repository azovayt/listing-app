import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

interface AuthResponse {
  data: any[];
  loading: boolean;
  error: string | null;
}

interface LoginCredentials {
  identifier: string;
  password: string;
}

const useAuth = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    if (!credentials.identifier || !credentials.password) {
      setError('Email/Username and password required!');
      return;
    }

    setLoading(true);
    try {
      const url = `${PUBLIC_URL}/api/auth/local`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        let errorMessage = `Login failed: ${errorResult.error?.message || 'Unknown error'}`;
        if (errorResult.error?.details?.errors) {
          errorMessage = errorResult.error.details.errors
            .map((err: any) => err.message)
            .join(', ');
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      await AsyncStorage.setItem('jwt', result.jwt);
      await AsyncStorage.setItem('user', JSON.stringify(result.user));
      setData([result.user]);
      setError(null);
    } catch (err: unknown) {
      console.error('useAuth: Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }

    return { data, loading, error };
  };

  return { login, data, loading, error };
};

export default useAuth;