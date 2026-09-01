"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface KonektMember {
  uid: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  zone: string;
  ville: string;
  palier: 'START' | 'PLUS' | 'PRO';
  secteur: string;
  projetEnCours: boolean;
  projetDesc?: string;
  celluleId: string;
  role: 'member' | 'leader';
  status: 'active' | 'suspended' | 'pending';
  joinedAt: string;
}

export interface CellInfo {
  id: string;
  zone: string;
  membres: number;
}

interface AppState {
  currentUser: KonektMember | null;
  currentCell: CellInfo | null;
  isLoading: boolean;
}

interface KonektContextType {
  state: AppState;
  register: (data: Partial<KonektMember>) => Promise<{ membre: KonektMember; cellule: CellInfo }>;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
}

const KonektContext = createContext<KonektContextType | undefined>(undefined);

const STORAGE_KEY = 'konekt_global_state_v9';

export const KonektProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    currentCell: null,
    isLoading: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState({ ...JSON.parse(saved), isLoading: false });
      } catch (e) {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const assignCellule = async (zone: string): Promise<CellInfo> => {
    const cellsKey = 'konekt:cellules';
    const savedCells = localStorage.getItem(cellsKey);
    let cellules: CellInfo[] = savedCells ? JSON.parse(savedCells) : [];

    let cible = cellules.find(c => c.zone === zone && c.membres < 20);
    if (!cible) {
      const numero = cellules.filter(c => c.zone === zone).length + 1;
      cible = { id: `${zone.replace("Zone ", "").toUpperCase()}-${numero.toString().padStart(3, '0')}`, zone, membres: 0 };
      cellules.push(cible);
    }
    cible.membres += 1;
    localStorage.setItem(cellsKey, JSON.stringify(cellules));
    return cible;
  };

  const register = async (data: Partial<KonektMember>) => {
    const cellule = await assignCellule(data.zone || 'Zone Sud');
    const newMember: KonektMember = {
      uid: `mbr_${Date.now()}`,
      prenom: data.prenom || '',
      nom: data.nom || '',
      email: data.email || '',
      telephone: data.telephone || '',
      zone: data.zone || 'Zone Sud',
      ville: data.ville || '',
      palier: data.palier || 'START',
      secteur: data.secteur || '',
      projetEnCours: data.projetEnCours || false,
      projetDesc: data.projetDesc || '',
      celluleId: cellule.id,
      role: 'member',
      status: 'active',
      joinedAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      currentUser: newMember,
      currentCell: cellule
    }));

    return { membre: newMember, cellule };
  };

  const login = async (email: string) => {
    // Dans un proto, on simule la récupération d'un utilisateur existant
    if (state.currentUser && state.currentUser.email === email) {
      return true;
    }
    return false;
  };

  const logout = () => {
    setState({ currentUser: null, currentCell: null, isLoading: false });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <KonektContext.Provider value={{ state, register, login, logout }}>
      {children}
    </KonektContext.Provider>
  );
};

export const useKonekt = () => {
  const context = useContext(KonektContext);
  if (!context) throw new Error('useKonekt must be used within KonektProvider');
  return context;
};
