'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Role, ROLES } from '@/constants/roles';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
      router.push('/login');
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return <p>Redirecting...</p>;
  }

  return <>{children}</>;
}


/*
Usage:
<AuthGuard allowedRoles={[ROLES.SYSTEM_ADMIN]}>
  <SystemAdminDashboard />
</AuthGuard>
*/