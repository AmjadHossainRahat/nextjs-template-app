// constants/roles.ts
export const ROLES = {
  SYSTEM_ADMIN: 'system-admin' as const,
  ROLE_ONE: 'role-one' as const,
  ROLE_TWO: 'role-two' as const,
};

export type Role = (typeof ROLES)[keyof typeof ROLES];
