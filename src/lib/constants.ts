export const APP_NAME = "KONEKT";

export const TIERS = {
  START: { 
    code: "START", 
    name: "KONEKT START", 
    price: 5, 
    color: "text-muted",
    description: "Pour rejoindre la communauté et accéder aux bases."
  },
  PLUS: { 
    code: "PLUS", 
    name: "KONEKT PLUS", 
    price: 10, 
    color: "text-primary",
    description: "Le niveau principal pour le networking et les formations avancées."
  },
  PRO: { 
    code: "PRO", 
    name: "KONEKT PRO", 
    price: 20, 
    color: "text-accent",
    description: "Pour développer son activité avec le Project Lab et un accompagnement premium."
  }
};

export const ROLES = {
  MEMBER: "member",
  LEADER: "leader",
  ZONE_COORDINATOR: "zone_coordinator",
  REGIONAL_COORDINATOR: "regional_coordinator",
  NATIONAL: "national",
  FINANCE: "finance",
  MODERATION: "moderation",
  ACADEMY_MANAGER: "academy_manager",
  OPPORTUNITY_MANAGER: "opportunity_manager",
  PROJECT_MANAGER: "project_manager",
  TECH_ADMIN: "tech_admin"
} as const;

export type RoleCode = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  PROFILE_EDIT: "profile.edit",
  CELL_VIEW: "cell.view",
  CELL_MANAGE: "cell.manage",
  CELL_ATTENDANCE: "cell.attendance.manage",
  ZONE_VIEW: "zone.view",
  ZONE_MANAGE: "zone.manage",
  POLE_VIEW: "pole.view",
  POLE_MANAGE: "pole.manage",
  COURSE_MANAGE: "course.manage",
  OPPORTUNITY_MANAGE: "opportunity.manage",
  PROJECT_REVIEW: "project.review",
  FINANCE_VIEW: "finance.view",
  FINANCE_APPROVE: "finance.approve",
  AUDIT_VIEW: "audit.view",
  ROLE_ASSIGN: "role.assign",
  MEMBER_SUSPEND: "member.suspend"
} as const;

export type PermissionCode = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<RoleCode, PermissionCode[]> = {
  [ROLES.MEMBER]: [
    PERMISSIONS.CELL_VIEW
  ],
  [ROLES.LEADER]: [
    PERMISSIONS.CELL_VIEW,
    PERMISSIONS.CELL_MANAGE,
    PERMISSIONS.CELL_ATTENDANCE
  ],
  [ROLES.ZONE_COORDINATOR]: [
    PERMISSIONS.CELL_VIEW,
    PERMISSIONS.ZONE_VIEW,
    PERMISSIONS.ZONE_MANAGE
  ],
  [ROLES.REGIONAL_COORDINATOR]: [
    PERMISSIONS.CELL_VIEW,
    PERMISSIONS.ZONE_VIEW,
    PERMISSIONS.POLE_VIEW,
    PERMISSIONS.POLE_MANAGE
  ],
  [ROLES.NATIONAL]: [
    PERMISSIONS.CELL_VIEW,
    PERMISSIONS.ZONE_VIEW,
    PERMISSIONS.POLE_VIEW,
    PERMISSIONS.COURSE_MANAGE,
    PERMISSIONS.OPPORTUNITY_MANAGE,
    PERMISSIONS.PROJECT_REVIEW,
    PERMISSIONS.FINANCE_VIEW,
    PERMISSIONS.FINANCE_APPROVE,
    PERMISSIONS.AUDIT_VIEW,
    PERMISSIONS.ROLE_ASSIGN,
    PERMISSIONS.MEMBER_SUSPEND
  ],
  [ROLES.FINANCE]: [
    PERMISSIONS.FINANCE_VIEW,
    PERMISSIONS.AUDIT_VIEW
  ],
  [ROLES.MODERATION]: [
    PERMISSIONS.MEMBER_SUSPEND
  ],
  [ROLES.ACADEMY_MANAGER]: [
    PERMISSIONS.COURSE_MANAGE
  ],
  [ROLES.OPPORTUNITY_MANAGER]: [
    PERMISSIONS.OPPORTUNITY_MANAGE
  ],
  [ROLES.PROJECT_MANAGER]: [
    PERMISSIONS.PROJECT_REVIEW
  ],
  [ROLES.TECH_ADMIN]: [
    PERMISSIONS.AUDIT_VIEW
  ]
};

export const MEMBER_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  PAYMENT_LATE: "payment_late",
  SUSPENDED: "suspended",
  ALUMNI: "alumni",
  DISABLED: "disabled"
};