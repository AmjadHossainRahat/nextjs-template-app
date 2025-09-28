'use client';

import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';

export default function SidebarClientWrapper() {
  const { user } = useAuth();
  return <Sidebar user={user} />;
}
