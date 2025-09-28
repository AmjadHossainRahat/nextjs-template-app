'use client';

import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  let userInfo;
  if (isAuthenticated && user) {
    userInfo = (
      <p className="text-gray-700">
        Logged in as <strong>{user.name}</strong> ({user.role})
      </p>
    );
  } else {
    userInfo = <p className="text-gray-700">You are not logged in.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Next.js Role-Based App</h1>
      {userInfo}
      <p className="mt-4 text-gray-600">
        Use the sidebar to navigate through public and private routes.
      </p>
    </div>
  );
}
