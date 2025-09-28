'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

/*
Each private page can now just use this layout:
// app/system-admin/page.tsx
import DashboardLayout from '../dashboard-layout';

export default function SystemAdminPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">System Admin Dashboard</h1>
    </DashboardLayout>
  );
}

*/