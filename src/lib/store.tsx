
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * @fileOverview Store centralisé pour KONEKT.
 * Gère l'état global du membre, de sa cellule et de sa progression.
 */

export interface KonektMember {
  uid: string;
  name: string;
  tier: 'START' | 'PLUS' | 'PRO';
  role: string;
  cellId: string;
  score: number;
  skills: string[];
  objectives: string[];
  status: 'active' | 'suspended' | 'pending';
}

export interface CellInfo {
  id: string;
  name: string;
  memberCount: number;
  activityRate: number;
  leaderName: string;
}

interface AppState {
  currentUser: KonektMember | null;
  currentCell: CellInfo | null;
  notifications: any[];
  isLoading: boolean;
}

interface KonektContextType {
  state: AppState;
  updateScore: (points: number) => void;
  setMember: (member: KonektMember) => void;
}

const KonektContext = createContext<KonektContextType | undefined>(undefined);

const STORAGE_KEY = 'konekt_global_state_v4';

export const KonektProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: {
      uid: "mem-001",
      name: "Christian Rwemera",
      tier: "PLUS",
      role: "LEADER",
      cellId: "cell-032",
      score: 850,
      skills: ["Marketing Digital", "Droit des Affaires", "IA & Prompting"],
      objectives: ["Trouver des Associés", "Mentorat"],
      status: "active"
    },
    currentCell: {
      id: "cell-032",
      name: "Cocody #032",
      memberCount: 18,
      activityRate: 92,
      leaderName: "Awa K."
    },
    notifications: [],
    isLoading: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load KONEKT state", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateScore = (points: number) => {
    setState(prev => {
      if (!prev.currentUser) return prev;
      return {
        ...prev,
        currentUser: {
          ...prev.currentUser,
          score: prev.currentUser.score + points
        }
      };
    });
  };

  const setMember = (member: KonektMember) => {
    setState(prev => ({ ...prev, currentUser: member }));
  };

  return (
    <KonektContext.Provider value={{ state, updateScore, setMember }}>
      {children}
    </KonektContext.Provider>
  );
};

export const useKonekt = () => {
  const context = useContext(KonektContext);
  if (!context) throw new Error('useKonekt must be used within KonektProvider');
  return context;
};

// Aliases de compatibilité pour éviter les erreurs de build sur les anciennes pages
export const useCompetition = useKonekt;
export const CompetitionProvider = KonektProvider;
