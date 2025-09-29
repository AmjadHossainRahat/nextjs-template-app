'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { type Role } from '@/constants/roles';
import { login as authLogin, logout as authLogout, type AuthResponse } from '@/lib/auth';

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed: AuthResponse = JSON.parse(stored);
      setUser(parsed.user);
      setAccessToken(parsed.accessToken);
      setRefreshToken(parsed.refreshToken);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const result = await authLogin(email, password);
    if (!result) throw new Error('Invalid credentials');

    localStorage.setItem('auth', JSON.stringify(result));
    setUser(result.user);
    setAccessToken(result.accessToken);
    setRefreshToken(result.refreshToken);
  };

  const logout = async () => {
    await authLogout();
    localStorage.removeItem('auth');
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!user && !!accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
