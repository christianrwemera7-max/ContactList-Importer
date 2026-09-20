export const APP_NAME = "Application";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type RoleCode = typeof ROLES[keyof typeof ROLES];
