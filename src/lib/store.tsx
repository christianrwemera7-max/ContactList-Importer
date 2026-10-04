"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { userService } from '@/services/userService';
import { User, Session } from '@supabase/supabase-js';
import { Database } from '@/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AppState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  theme: 'light' | 'dark';
}

interface AppContextType {
  state: AppState;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  toggleTheme: () => void;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    theme: 'light',
  });

  const fetchProfile = async (userId: string) => {
    try {
      const profile = await userService.getProfile(userId);
      setState(prev => ({ ...prev, profile }));
    } catch (error: any) {
      // Si la table n'existe pas ou erreur, on logue simplement sans bloquer
      console.log('Profile fetch notice:', error.message);
    }
  };

  useEffect(() => {
    // 1. Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setState(prev => ({ ...prev, session, user: session.user, isLoading: false }));
        fetchProfile(session.user.id);
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    // 2. Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setState(prev => ({ 
          ...prev, 
          session, 
          user: session.user, 
          isLoading: false 
        }));
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          fetchProfile(session.user.id);
        }
      } else {
        setState(prev => ({ 
          ...prev, 
          session: null, 
          user: null, 
          profile: null, 
          isLoading: false 
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setUser = (user: User | null) => setState(prev => ({ ...prev, user }));
  const setProfile = (profile: Profile | null) => setState(prev => ({ ...prev, profile }));
  
  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setState(prev => ({ ...prev, theme: newTheme }));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // Le listener onAuthStateChange s'occupera du reset de l'état
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppContext.Provider value={{ state, setUser, setProfile, toggleTheme, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export const useKonekt = useApp;
