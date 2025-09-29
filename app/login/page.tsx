'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginForm } from '@/utils/validators';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch (err: any) {
      // Prefer showing a non-blocking notice; keep simple for template
      // Replace with a nicer UI/Toast in your app
      alert(err?.message || 'Login failed');
    }
  };

  // Note visible only when dev auth is enabled
  const devAuthEnabled = process.env.NEXT_PUBLIC_DEV_AUTH === '1';

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Email" {...register('email')} error={errors.email?.message} />
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {devAuthEnabled && (
          <aside
            aria-live="polite"
            className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-4 text-sm text-slate-800 rounded"
          >
            <strong className="block mb-2">Local dev credentials (only for development)</strong>
            <p className="mb-2">You can use any of these emails with password <code>123456</code> for quick testing:</p>

            <ul className="list-disc pl-5 space-y-1">
              <li><code>system-admin@example.com</code> — <em>system-admin</em></li>
              <li><code>role-one@example.com</code> — <em>role-one</em></li>
              <li><code>role-two@example.com</code> — <em>role-two</em></li>
            </ul>

            <p className="mt-3 text-xs text-gray-600">
              This note is shown because <code>NEXT_PUBLIC_DEV_AUTH=1</code>. <strong>Do not enable</strong> dev auth in production.
            </p>
          </aside>
        )}

        {!devAuthEnabled && (
          <p className="mt-6 text-xs text-gray-500">
            Please use your production credentials to sign in.
          </p>
        )}
      </div>
    </main>
  );
}
