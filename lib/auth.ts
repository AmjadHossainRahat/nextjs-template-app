import { type User } from '@/context/AuthContext';
import { type Role, ROLES } from '@/constants/roles';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ----------------------
// MOCK IMPLEMENTATION
// ----------------------
const MOCK_USERS: User[] = [
  {
    name: 'Admin User',
    email: 'system-admin@example.com',
    role: ROLES.SYSTEM_ADMIN,
  },
  {
    name: 'Role One User',
    email: 'role-one@example.com',
    role: ROLES.ROLE_ONE,
  },
  {
    name: 'Role Two User',
    email: 'role-two@example.com',
    role: ROLES.ROLE_TWO,
  },
];

export async function mockLogin(email: string, password: string): Promise<AuthResponse | null> {
  const foundUser = MOCK_USERS.find((u) => u.email === email);
  if (!foundUser || password !== '123456') return null;

  const accessToken = `mock-access-token.${btoa(email)}.${Date.now()}`;
  const refreshToken = `mock-refresh-token.${Date.now()}`;

  return { user: foundUser, accessToken, refreshToken };
}

async function mockLogout(): Promise<void> {
  return Promise.resolve();
}

// ----------------------
// REAL IMPLEMENTATION
// ----------------------
async function realLogin(email: string, password: string): Promise<AuthResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const data = await res.json();

  return {
    user: {
      name: data.user.name,
      email: data.user.email,
      role: data.user.role as Role,
    },
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
}

async function realLogout(): Promise<void> {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

// ----------------------
// CONDITIONAL EXPORT
// ----------------------
const useMock = process.env.NEXT_PUBLIC_DEV_AUTH === '1';

export const login = useMock ? mockLogin : realLogin;
export const logout = useMock ? mockLogout : realLogout;
