
/**
 * @fileOverview Système de gestion des permissions KONEKT (Rôle + Scope + Action)
 */

export type RoleCode = 'member' | 'leader' | 'zone_coordinator' | 'regional_coordinator' | 'national';
export type ScopeType = 'cell' | 'zone' | 'pole' | 'national';

export interface UserContext {
  role: RoleCode;
  scopeId: string; // ID de la cellule, zone ou pôle
  status: string;
}

export const canPerformAction = (
  user: UserContext, 
  action: string, 
  targetScopeType: ScopeType, 
  targetScopeId: string
): boolean => {
  // Un membre suspendu ne peut rien faire
  if (user.status === 'suspended') return false;

  // Direction Nationale : Pouvoir total sur tout
  if (user.role === 'national') return true;

  // Règle n°20 : Un responsable ne peut agir que dans son périmètre
  if (user.scopeId !== targetScopeId) return false;

  const permissions: Record<RoleCode, string[]> = {
    member: ['view_cell', 'apply_opportunity', 'create_project', 'attend_meeting'],
    leader: ['view_cell', 'manage_cell_members', 'publish_cell_announcement', 'mark_attendance'],
    zone_coordinator: ['view_zone', 'manage_leaders', 'audit_cell_performance'],
    regional_coordinator: ['view_pole', 'manage_zone_coordinators', 'view_financial_reports'],
    national: ['*']
  };

  const userPerms = permissions[user.role] || [];
  return userPerms.includes('*') || userPerms.includes(action);
};
