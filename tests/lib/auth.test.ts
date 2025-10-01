import { mockLogin } from '@/lib/auth';
import { ROLES } from '@/constants/roles';

describe('mockLogin', () => {
  it('logs in successfully with correct credentials', async () => {
    const result = await mockLogin('system-admin@example.com', '123456');
    expect(result).not.toBeNull();
    expect(result?.user.role).toBe(ROLES.SYSTEM_ADMIN);
    expect(result?.accessToken).toContain('mock-access-token');
  });

  it('fails with wrong password', async () => {
    const result = await mockLogin('system-admin@example.com', 'wrongpass');
    expect(result).toBeNull();
  });

  it('fails with non-existing user', async () => {
    const result = await mockLogin('unknown@example.com', '123456');
    expect(result).toBeNull();
  });
});
