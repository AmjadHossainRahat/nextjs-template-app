'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import { Role, ROLES } from '@/constants/roles';

// export type Role = 'system-admin' | 'role-one' | 'role-two';

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error('Invalid credentials'));
        return;
      }

      // Determine role
      let role: Role = ROLES.ROLE_ONE;
      if (email.includes(ROLES.SYSTEM_ADMIN)) { // TODO: replace this logic
        role = ROLES.SYSTEM_ADMIN;
      } else if (email.includes(ROLES.ROLE_TWO)) { // TODO: replace this logic
        role = ROLES.ROLE_TWO;
      }

      const loggedInUser: User = {
        name: email.split('@')[0] || 'Default-Name', // TODO: replace this logic
        email,
        role,
      };

      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      resolve();
    }, 500);
  });
};


  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout
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
