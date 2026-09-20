import { RoleCode } from './constants';

export interface UserAuthContext {
  uid: string;
  role: RoleCode;
}

export const hasPermission = (
  user: UserAuthContext | null,
  requiredRole: RoleCode
): boolean => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.role === requiredRole;
};
