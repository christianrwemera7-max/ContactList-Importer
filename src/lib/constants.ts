
export const PRIZE_POOL_TOTAL = 1000;

export interface Team {
  id: string;
  schoolName: string;
  teamName: string;
  neighborhood: string;
  stadium: string;
  colors: string;
  group: 'A' | 'B' | 'C' | 'D';
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  currentGains: number;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: 'Gardien' | 'Défenseur' | 'Milieu' | 'Attaquant';
  goals: number;
  assists: number;
  rating: number;
  matchesPlayed: number;
  yellowCards: number;
  redCards: number;
  badges: string[];
}

export const TEAMS: Team[] = [
  { id: 't1', schoolName: 'Collège Boboto', teamName: 'Boboto FC', neighborhood: 'Lingwala', stadium: 'Tata Raphaël', colors: 'Vert/Rouge', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't2', schoolName: 'Lycée Bosangani', teamName: 'Bosangani United', neighborhood: 'Gombe', stadium: 'Stade des Martyrs', colors: 'Bleu/Blanc', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't3', schoolName: 'Institut Kimbangu', teamName: 'Kimbangu Stars', neighborhood: 'Kasa-Vubu', stadium: 'Terrain Kimbangu', colors: 'Jaune/Noir', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't4', schoolName: 'Collège Saint Joseph', teamName: 'Saint Joseph FC', neighborhood: 'Ngaliema', stadium: 'Saint Joseph Arena', colors: 'Blanc/Bleu', group: 'A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't5', schoolName: 'Lycée Molondo', teamName: 'Molondo Warriors', neighborhood: 'Molondo', stadium: 'Molondo Parc', colors: 'Rouge/Noir', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't6', schoolName: 'Institut Mbindisi', teamName: 'Mbindisi Lions', neighborhood: 'Kalamu', stadium: 'Kalamu Stadium', colors: 'Orange/Noir', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't7', schoolName: 'Collège Kibwe', teamName: 'Kibwe Academie', neighborhood: 'Bandundu', stadium: 'Kibwe Complex', colors: 'Vert/Jaune', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't8', schoolName: 'Lycée Kintambo', teamName: 'Kintambo Eagles', neighborhood: 'Kintambo', stadium: 'Kintambo Arena', colors: 'Bleu ciel', group: 'B', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't9', schoolName: 'Institut Lufungula', teamName: 'Lufungula Spurs', neighborhood: 'Limete', stadium: 'Limete Parc', colors: 'Blanc/Noir', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't10', schoolName: 'Collège Ngaliema', teamName: 'Ngaliema City', neighborhood: 'Ngaliema', stadium: 'Ngaliema Stadium', colors: 'Violet/Blanc', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't11', schoolName: 'Lycée Sakombi', teamName: 'Sakombi Dragons', neighborhood: 'Kisenso', stadium: 'Kisenso Parc', colors: 'Rouge/Jaune', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't12', schoolName: 'Institut Bonsomi', teamName: 'Bonsomi FC', neighborhood: 'Gombe', stadium: 'Bonsomi Field', colors: 'Vert/Blanc', group: 'C', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't13', schoolName: 'Collège Kwilu', teamName: 'Kwilu United', neighborhood: 'Selembao', stadium: 'Selembao Park', colors: 'Bleu marine', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't14', schoolName: 'Lycée Mapapa', teamName: 'Mapapa Stars', neighborhood: 'Mont Ngafula', stadium: 'Mapapa Arena', colors: 'Jaune/Bleu', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't15', schoolName: 'Institut Kimbanseke', teamName: 'Kimbanseke Warriors', neighborhood: 'Kimbanseke', stadium: 'Kimbanseke Complex', colors: 'Noir/Rouge', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
  { id: 't16', schoolName: 'Collège Masina', teamName: 'Masina City', neighborhood: 'Masina', stadium: 'Masina Stadium', colors: 'Vert/Orange', group: 'D', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, currentGains: 0 },
];

export const PLAYERS_INITIAL: Player[] = [
  { id: 'p1', name: 'Kambala Mputu', teamId: 't1', position: 'Attaquant', goals: 9, assists: 2, rating: 8.7, matchesPlayed: 6, yellowCards: 1, redCards: 0, badges: ['SNIPER'] },
  { id: 'p2', name: 'Luyindula Makosso', teamId: 't2', position: 'Milieu', goals: 3, assists: 7, rating: 8.5, matchesPlayed: 6, yellowCards: 0, redCards: 0, badges: ['MAESTRO'] },
  { id: 'p3', name: 'Mbemba Kabongo', teamId: 't9', position: 'Attaquant', goals: 6, assists: 3, rating: 8.9, matchesPlayed: 6, yellowCards: 0, redCards: 0, badges: ['MVP'] },
  { id: 'p4', name: 'Tshimanga Beya', teamId: 't6', position: 'Gardien', goals: 0, assists: 0, rating: 8.2, matchesPlayed: 6, yellowCards: 0, redCards: 0, badges: ['MUR'] },
  { id: 'p5', name: 'Kabasele Junior', teamId: 't13', position: 'Défenseur', goals: 1, assists: 1, rating: 8.0, matchesPlayed: 6, yellowCards: 2, redCards: 0, badges: ['ROC'] },
];
