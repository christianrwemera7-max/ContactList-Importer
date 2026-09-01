/**
 * @fileOverview Système de gestion des permissions KONEKT (Rôle + Permission + Scope)
 */

import { RoleCode, PermissionCode, ROLE_PERMISSIONS, ROLES } from './constants';

export interface UserAuthContext {
  uid: string;
  role: RoleCode;
  tier: 'START' | 'PLUS' | 'PRO';
  status: string;
  scopeId: string; // ID de la cellule, zone ou pôle de rattachement
}

/**
 * Vérifie si un utilisateur a la permission d'effectuer une action, 
 * éventuellement restreinte à un périmètre (scope).
 */
export const hasPermission = (
  user: UserAuthContext, 
  permission: PermissionCode, 
  targetScopeId?: string
): boolean => {
  // 1. Un membre suspendu n'a aucune permission active
  if (user.status === 'suspended') return false;

  // 2. Direction Nationale : Pouvoir total sur tout, pas de restriction de scope
  if (user.role === ROLES.NATIONAL) return true;

  // 3. Vérifier si le rôle possède la permission demandée
  const allowedPermissions = ROLE_PERMISSIONS[user.role] || [];
  const hasBasePermission = allowedPermissions.includes(permission);

  if (!hasBasePermission) return false;

  // 4. Vérifier la restriction de périmètre (Scope)
  // Règle n°21 : Les permissions doivent être basées sur le rôle ET le périmètre
  if (targetScopeId && user.role !== ROLES.NATIONAL) {
    // Si un scope est spécifié, l'utilisateur ne peut agir que si c'est son périmètre assigné
    return user.scopeId === targetScopeId;
  }

  return true;
};

/**
 * Vérifie l'accès à un service basé sur le niveau d'adhésion (Tier)
 * Règle métier : START < PLUS < PRO
 */
export const hasTierAccess = (
  userTier: 'START' | 'PLUS' | 'PRO',
  requiredTier: 'START' | 'PLUS' | 'PRO'
): boolean => {
  const tiers = ['START', 'PLUS', 'PRO'];
  return tiers.indexOf(userTier) >= tiers.indexOf(requiredTier);
};