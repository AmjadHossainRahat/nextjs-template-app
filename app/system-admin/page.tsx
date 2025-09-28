'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLES } from '@/constants/roles';

export default function SystemAdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== ROLES.SYSTEM_ADMIN) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== ROLES.SYSTEM_ADMIN) {
    return <p>Redirecting...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">System Admin Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
    </main>
  );
}
