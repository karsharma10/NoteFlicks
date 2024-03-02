import { useState } from 'react';

type validTypes = 'POST' | 'PUT'

const usePostRequest = <T>(url: string, method: validTypes = 'POST') => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const postData = async (body: any): Promise<T> => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      setError(null);
      return Promise.resolve(responseData);
    } catch (error) {
      setError((error as Error).message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { postData, data, error, loading };
};

export default usePostRequest;
