import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import SidebarClientWrapper from '@/components/SidebarClientWrapper';

export const metadata = {
  title: 'Next.js Role-Based App',
  description: 'Frontend-only template with roles',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <div className="flex min-h-screen">
            <SidebarClientWrapper />
            <main className="flex-1 p-8">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
