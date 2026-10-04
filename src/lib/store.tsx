
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { userService } from '@/services/userService';
import { User } from '@supabase/supabase-js';
import { Database } from '@/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AppState {
  user: User | null;
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
    profile: null,
    isLoading: true,
    theme: 'light',
  });

  const fetchProfile = async (userId: string) => {
    try {
      const profile = await userService.getProfile(userId);
      setState(prev => ({ ...prev, profile }));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setState(prev => ({ ...prev, user: session.user }));
        fetchProfile(session.user.id);
      }
      setState(prev => ({ ...prev, isLoading: false }));
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setState(prev => ({ ...prev, user: session.user, isLoading: false }));
        fetchProfile(session.user.id);
      } else {
        setState(prev => ({ ...prev, user: null, profile: null, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setUser = (user: User | null) => setState(prev => ({ ...prev, user }));
  const setProfile = (profile: Profile | null) => setState(prev => ({ ...prev, profile }));
  const toggleTheme = () => setState(prev => ({ 
    ...prev, 
    theme: prev.theme === 'light' ? 'dark' : 'light' 
  }));

  const logout = async () => {
    await supabase.auth.signOut();
    setState(prev => ({ ...prev, user: null, profile: null }));
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

// Alias for compatibility with existing components
export const useKonekt = useApp;
