'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLES } from '@/constants/roles';

export default function RoleOnePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== ROLES.ROLE_ONE) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== ROLES.ROLE_ONE) {
    return <p>Redirecting...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Role-One Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <p>This is a dummy role. When using this template you might want to change/delete the role</p>
    </main>
  );
}
