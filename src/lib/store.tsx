"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TEAMS, PLAYERS_INITIAL, Team, Player, PRIZE_POOL_TOTAL } from './constants';

export interface Match {
  id: string;
  type: 'group' | 'knockout';
  phase: string;
  group?: 'A' | 'B' | 'C' | 'D';
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  played: boolean;
  knockoutSlot?: string; // e.g., 'Q1', 'S1', 'F', 'P'
}

interface AppState {
  teams: Team[];
  players: Player[];
  matches: Match[];
  currentPhase: 'Poules' | 'Phase Finale' | 'Terminé';
  distributedPrize: number;
}

interface CompetitionContextType {
  state: AppState;
  updateMatch: (matchId: string, homeScore: number, awayScore: number) => void;
  resetCompetition: () => void;
  advanceToKnockout: () => void;
  finishTournament: () => void;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

const STORAGE_KEY = 'one_cup_kinshasa_2026_v3';

const generateInitialMatches = (): Match[] => {
  const matches: Match[] = [];
  ['A', 'B', 'C', 'D'].forEach((g) => {
    const groupTeams = TEAMS.filter(t => t.group === g);
    for (let i = 0; i < groupTeams.length; i++) {
      for (let j = i + 1; j < groupTeams.length; j++) {
        // Aller
        matches.push({
          id: `g-${g}-a-${i}-${j}`,
          type: 'group',
          phase: 'Phase de Poules',
          group: g as any,
          homeTeamId: groupTeams[i].id,
          awayTeamId: groupTeams[j].id,
          homeScore: null,
          awayScore: null,
          played: false,
        });
        // Retour
        matches.push({
          id: `g-${g}-r-${i}-${j}`,
          type: 'group',
          phase: 'Phase de Poules',
          group: g as any,
          homeTeamId: groupTeams[j].id,
          awayTeamId: groupTeams[i].id,
          homeScore: null,
          awayScore: null,
          played: false,
        });
      }
    }
  });
  return matches;
};

export const CompetitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    teams: TEAMS,
    players: PLAYERS_INITIAL,
    matches: generateInitialMatches(),
    currentPhase: 'Poules',
    distributedPrize: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateMatch = (matchId: string, homeScore: number, awayScore: number) => {
    setState(prev => {
      const newMatches = prev.matches.map(m => m.id === matchId ? { ...m, homeScore, awayScore, played: true } : m);
      
      // Update team stats for group matches
      let newTeams = prev.teams.map(team => {
        let played = 0, won = 0, drawn = 0, lost = 0, gf = 0, ga = 0, pts = 0;
        newMatches.filter(m => m.played && m.type === 'group').forEach(m => {
          if (m.homeTeamId === team.id) {
            played++;
            gf += m.homeScore || 0;
            ga += m.awayScore || 0;
            if (m.homeScore! > m.awayScore!) won++;
            else if (m.homeScore! === m.awayScore!) drawn++;
            else lost++;
          } else if (m.awayTeamId === team.id) {
            played++;
            gf += m.awayScore || 0;
            ga += m.homeScore || 0;
            if (m.awayScore! > m.homeScore!) won++;
            else if (m.awayScore! === m.homeScore!) drawn++;
            else lost++;
          }
        });
        pts = won * 3 + drawn;
        return { ...team, played, won, drawn, lost, goalsFor: gf, goalsAgainst: ga, points: pts };
      });

      // Handle Knockout Logic
      const match = newMatches.find(m => m.id === matchId);
      if (match?.type === 'knockout') {
        const winnerId = (homeScore > awayScore) ? match.homeTeamId : match.awayTeamId;
        const loserId = (homeScore > awayScore) ? match.awayTeamId : match.homeTeamId;

        // Progress logic based on knockoutSlot
        if (match.phase === 'Quarts de finale') {
          const nextSlot = (match.knockoutSlot === 'Q1' || match.knockoutSlot === 'Q2') ? 'S1' : 'S2';
          const isHome = (match.knockoutSlot === 'Q1' || match.knockoutSlot === 'Q3');
          
          newMatches.forEach(nm => {
            if (nm.knockoutSlot === nextSlot) {
              if (isHome) nm.homeTeamId = winnerId;
              else nm.awayTeamId = winnerId;
            }
          });
        } else if (match.phase === 'Demi-finale') {
          const isS1 = match.knockoutSlot === 'S1';
          newMatches.forEach(nm => {
            if (nm.knockoutSlot === 'F') {
              if (isS1) nm.homeTeamId = winnerId;
              else nm.awayTeamId = winnerId;
            }
            if (nm.knockoutSlot === 'P') {
              if (isS1) nm.homeTeamId = loserId;
              else nm.awayTeamId = loserId;
            }
          });
        }
      }

      // Calculate Distributed Prize
      let prizeDist = 0;
      const finalMatch = newMatches.find(m => m.knockoutSlot === 'F');
      if (finalMatch?.played) {
        prizeDist += 700; // 500 Champion + 200 Finalist
      }
      const thirdPlaceMatch = newMatches.find(m => m.knockoutSlot === 'P');
      if (thirdPlaceMatch?.played) {
        prizeDist += 100; // 100 3rd Place
      }

      return { ...prev, matches: newMatches, teams: newTeams, distributedPrize: prizeDist };
    });
  };

  const advanceToKnockout = () => {
    setState(prev => {
      const knockoutMatches: Match[] = [];
      const groups = ['A', 'B', 'C', 'D'];
      const qualifiers: Record<string, string[]> = {};

      groups.forEach(g => {
        const sorted = [...prev.teams]
          .filter(t => t.group === g)
          .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            const diffA = a.goalsFor - a.goalsAgainst;
            const diffB = b.goalsFor - b.goalsAgainst;
            if (diffB !== diffA) return diffB - diffA;
            return b.goalsFor - a.goalsFor;
          });
        qualifiers[g] = [sorted[0].id, sorted[1].id];
      });

      // Q1: A1 vs B2
      knockoutMatches.push({ id: 'k-q1', type: 'knockout', phase: 'Quarts de finale', knockoutSlot: 'Q1', homeTeamId: qualifiers['A'][0], awayTeamId: qualifiers['B'][1], homeScore: null, awayScore: null, played: false });
      // Q2: C1 vs D2
      knockoutMatches.push({ id: 'k-q2', type: 'knockout', phase: 'Quarts de finale', knockoutSlot: 'Q2', homeTeamId: qualifiers['C'][0], awayTeamId: qualifiers['D'][1], homeScore: null, awayScore: null, played: false });
      // Q3: B1 vs A2
      knockoutMatches.push({ id: 'k-q3', type: 'knockout', phase: 'Quarts de finale', knockoutSlot: 'Q3', homeTeamId: qualifiers['B'][0], awayTeamId: qualifiers['A'][1], homeScore: null, awayScore: null, played: false });
      // Q4: D1 vs C2
      knockoutMatches.push({ id: 'k-q4', type: 'knockout', phase: 'Quarts de finale', knockoutSlot: 'Q4', homeTeamId: qualifiers['D'][0], awayTeamId: qualifiers['C'][1], homeScore: null, awayScore: null, played: false });

      // S1 & S2 Placeholder
      knockoutMatches.push({ id: 'k-s1', type: 'knockout', phase: 'Demi-finale', knockoutSlot: 'S1', homeTeamId: '', awayTeamId: '', homeScore: null, awayScore: null, played: false });
      knockoutMatches.push({ id: 'k-s2', type: 'knockout', phase: 'Demi-finale', knockoutSlot: 'S2', homeTeamId: '', awayTeamId: '', homeScore: null, awayScore: null, played: false });
      
      // Final & 3rd Place Placeholder
      knockoutMatches.push({ id: 'k-f', type: 'knockout', phase: 'Finale', knockoutSlot: 'F', homeTeamId: '', awayTeamId: '', homeScore: null, awayScore: null, played: false });
      knockoutMatches.push({ id: 'k-p', type: 'knockout', phase: 'Petite Finale', knockoutSlot: 'P', homeTeamId: '', awayTeamId: '', homeScore: null, awayScore: null, played: false });

      return {
        ...prev,
        currentPhase: 'Phase Finale',
        matches: [...prev.matches.filter(m => m.type === 'group'), ...knockoutMatches]
      };
    });
  };

  const finishTournament = () => {
    setState(prev => ({ ...prev, currentPhase: 'Terminé', distributedPrize: 1000 }));
  };

  const resetCompetition = () => {
    const newState = {
      teams: TEAMS,
      players: PLAYERS_INITIAL,
      matches: generateInitialMatches(),
      currentPhase: 'Poules' as const,
      distributedPrize: 0,
    };
    setState(newState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CompetitionContext.Provider value={{ state, updateMatch, resetCompetition, advanceToKnockout, finishTournament }}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (!context) throw new Error('useCompetition must be used within CompetitionProvider');
  return context;
};
