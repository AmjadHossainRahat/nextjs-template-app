'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import { Role, ROLES } from '@/constants/roles';

interface RouteItem {
  name: string;
  path: string;
  roles?: Role[];
}

interface SidebarProps {
  user: User | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const routes: RouteItem[] = [
    { name: 'Landing', path: ROUTES.HOME },
    { name: 'Login', path: ROUTES.LOGIN },
    { name: 'Register', path: ROUTES.REGISTER },
    { name: 'Forgot Password', path: ROUTES.FORGOT_PASSWORD },
    { name: 'System Admin', path: ROUTES.SYSTEM_ADMIN, roles: [ROLES.SYSTEM_ADMIN] },
    { name: 'Role One', path: ROUTES.ROLE_ONE, roles: [ROLES.ROLE_ONE] },
    { name: 'Role Two', path: ROUTES.ROLE_TWO, roles: [ROLES.ROLE_TWO] },
  ];

  return (
    <aside className="w-60 bg-gray-100 p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">All Routes</h2>
      <ul className="flex flex-col gap-2">
        {routes.map((route) => {
          if (route.roles && (!user || !route.roles.includes(user.role))) return null;

          const isActive = pathname === route.path;

          return (
            <li key={route.path}>
              <Link
                href={route.path}
                className={`block px-3 py-2 rounded hover:bg-gray-200 ${
                  isActive ? 'bg-blue-500 text-white font-semibold' : ''
                }`}
              >
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
