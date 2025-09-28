/**
 * Typed fetch wrapper for API calls
 * @param url - endpoint URL
 * @param options - fetch options
 * @returns typed JSON response
 */
export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data?.message || res.statusText;
    throw new Error(errorMessage);
  }

  return data as T;
}

/*
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const profile = await apiFetch<UserProfile>('/api/profile');

*/