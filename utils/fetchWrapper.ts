/**
 * Simple fetch wrapper with JSON parsing and error handling
 */

export const fetchWrapper = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options
  });

  const data = await res.json();

  if (!res.ok) {
    const error = (data && data.message) || res.statusText;
    throw new Error(error);
  }

  return data;
};

/*
Usage:
const data = await fetchWrapper<{ id: string; name: string }>(
  '/api/items'
);
*/