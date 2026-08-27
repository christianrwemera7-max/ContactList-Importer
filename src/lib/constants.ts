
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

export const ROLES = [
  { code: "member", label: "Membre" },
  { code: "leader", label: "Leader de cellule" },
  { code: "zone_coordinator", label: "Coordinateur de zone" },
  { code: "regional_coordinator", label: "Coordinateur régional" },
  { code: "national", label: "Direction nationale" }
];

export const POST_TYPES = {
  OPPORTUNITY: "opportunity",
  COURSE: "course",
  TESTIMONIAL: "testimonial",
  PROJECT: "project",
  ANNOUNCEMENT: "announcement"
};

export const MEMBER_STATUS = {
  ACTIVE: "active",
  PAYMENT_LATE: "payment_late",
  SUSPENDED: "suspended",
  ALUMNI: "alumni"
};
