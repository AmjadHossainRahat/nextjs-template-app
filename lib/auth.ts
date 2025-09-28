/**
 * Dev/mock authentication helpers
 * In production, replace these with real API calls
 */

import { type Role, ROLES } from '@/constants/roles';
import type { User } from '@/context/AuthContext';

const MOCK_USERS: User[] = [
  { name: 'Admin User', email: 'admin@example.com', role: ROLES.SYSTEM_ADMIN },
  { name: 'Role One User', email: 'user1@example.com', role: ROLES.ROLE_ONE },
  { name: 'Role Two User', email: 'user2@example.com', role: ROLES.ROLE_TWO },
];

const TOKEN_KEY = 'auth_token';

/**
 * Simulate login and return mock token
 */
export const mockLogin = async (email: string): Promise<string> => {
  const user = MOCK_USERS.find((u) => u.email === email);
  if (!user) throw new Error('User not found');

  const token = btoa(JSON.stringify({ email, role: user.role }));
  localStorage.setItem(TOKEN_KEY, token);
  return token;
};

/**
 * Get current logged-in user from token
 */
export const getUserFromToken = (): User | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const data = JSON.parse(atob(token)) as { email: string; role: Role };
    const user = MOCK_USERS.find((u) => u.email === data.email);
    return user ?? null;
  } catch {
    return null;
  }
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
