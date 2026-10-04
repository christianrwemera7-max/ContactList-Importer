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

  const loadProfile = async (userId: string) => {
    try {
      const profile = await userService.getProfile(userId);
      setState(prev => ({ ...prev, profile }));
    } catch (error: any) {
      console.error('Failed to load profile:', error.message);
    }
  };

  useEffect(() => {
    // Session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setState(prev => ({ 
          ...prev, 
          session, 
          user: session.user,
          isLoading: false 
        }));
        loadProfile(session.user.id);
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    // Écouteur de changements
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setState(prev => ({ 
          ...prev, 
          session, 
          user: session.user, 
          isLoading: false 
        }));
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          loadProfile(session.user.id);
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
