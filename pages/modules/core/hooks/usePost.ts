import { useState } from 'react';

type validTypes = 'POST' | 'PUT'

const usePostRequest = (url: string, method: validTypes = 'POST') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const postData = async (body: any) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      setError(null);
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
