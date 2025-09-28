'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Template FE App
      </Link>

      <nav className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-gray-700">Hello, {user.name}</span>
            <span className="text-sm text-gray-500">{user.role}</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
