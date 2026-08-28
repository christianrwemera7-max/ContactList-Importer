
export const APP_NAME = "KONEKT";

export const TIERS = {
  START: { 
    code: "START", 
    name: "START", 
    price: 5, 
    color: "text-muted",
    description: "Accès à la communauté et aux formations de base."
  },
  PLUS: { 
    code: "PLUS", 
    name: "PLUS", 
    price: 10, 
    color: "text-cyan",
    description: "Accès complet aux cellules et formations avancées."
  },
  PRO: { 
    code: "PRO", 
    name: "PRO", 
    price: 20, 
    color: "text-orange",
    description: "Accès au Project Lab et opportunités premium."
  }
};

export const ROLES = {
  MEMBER: { code: "member", label: "Membre" },
  LEADER: { code: "leader", label: "Leader de cellule" },
  ZONE_COORDINATOR: { code: "zone_coordinator", label: "Coordinateur de zone" },
  REGIONAL_COORDINATOR: { code: "regional_coordinator", label: "Coordinateur régional" },
  NATIONAL: { code: "national", label: "Direction nationale" }
};

export const MEMBER_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  PAYMENT_LATE: "payment_late",
  SUSPENDED: "suspended",
  ALUMNI: "alumni",
  CANCELLED: "cancelled"
};

export const OPPORTUNITY_STATUS = {
  DRAFT: "draft",
  PENDING_REVIEW: "pending_review",
  APPROVED: "approved",
  PUBLISHED: "published",
  EXPIRED: "expired"
};

export const PROJECT_STATUS = {
  IDEE: "IDÉE",
  SOUMIS: "SOUMIS",
  EVALUATION: "EN ÉVALUATION",
  SELECTIONNE: "SÉLECTIONNÉ",
  ACCOMPAGNE: "ACCOMPAGNÉ",
  LANCE: "LANCÉ"
};

export const ACTIVITY_TYPES = {
  COURSE_COMPLETED: "course_completed",
  EVENT_ATTENDED: "event_attended",
  OPPORTUNITY_VIEWED: "opportunity_viewed",
  PROJECT_CREATED: "project_created",
  CELL_MEETING_ATTENDED: "cell_meeting_attended",
  LEADERSHIP_ACTION: "leadership_action"
};
