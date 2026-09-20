export const APP_NAME = "Nouveau Projet";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type RoleCode = typeof ROLES[keyof typeof ROLES];
