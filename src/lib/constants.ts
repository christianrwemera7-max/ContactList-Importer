
export const APP_NAME = "KONEKT";

export const TIERS = {
  START: { 
    code: "START", 
    name: "START", 
    price: 0, 
    color: "text-muted",
    description: "Accès aux bases de la communauté et formations fondamentales."
  },
  PLUS: { 
    code: "PLUS", 
    name: "PLUS", 
    price: 10, 
    color: "text-cyan",
    description: "Accès complet aux cellules, messagerie et Academy standard."
  },
  PRO: { 
    code: "PRO", 
    name: "PRO", 
    price: 25, 
    color: "text-orange",
    description: "Accès prioritaire aux opportunités, mentorat et KONEKT Projects."
  }
};

export const ROLES = {
  MEMBER: { code: "member", label: "Membre" },
  LEADER: { code: "leader", label: "Leader de cellule" },
  ZONE_COORDINATOR: { code: "zone_coordinator", label: "Coordinateur de zone" },
  REGIONAL_COORDINATOR: { code: "regional_coordinator", label: "Coordinateur régional" },
  NATIONAL: { code: "national", label: "Direction nationale" }
};

export const FLOW_TYPES = {
  COMMUNITY: { label: "Communauté", color: "text-cyan", icon: "Users" },
  OPPORTUNITY: { label: "Opportunités", color: "text-orange", icon: "Zap" },
  LEARNING: { label: "Learning", color: "text-gold", icon: "GraduationCap" },
  PROJECT: { label: "Projects", color: "text-primary", icon: "Rocket" },
  IMPACT: { label: "Impact", color: "text-green-400", icon: "Heart" }
};

export const MEMBER_STATUS = {
  ACTIVE: "active",
  PAYMENT_LATE: "payment_late",
  SUSPENDED: "suspended",
  ALUMNI: "alumni"
};
