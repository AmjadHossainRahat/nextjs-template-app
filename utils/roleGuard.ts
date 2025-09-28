import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Role } from '@/constants/roles';

/**
 * Hook to protect a page based on roles
 * @param allowedRoles - array of allowed roles for this page
 */
export const useRoleGuard = (allowedRoles: Role[]) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
      router.push('/login');
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  return { isAllowed: isAuthenticated && !!user && allowedRoles.includes(user.role) };
};

/*
Usage: instead of repeating useEffect checks in each page, you can now do:

const { isAllowed } = useRoleGuard([ROLES.SYSTEM_ADMIN]);
if (!isAllowed) return <p>Redirecting...</p>;

*/