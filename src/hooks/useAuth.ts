"use client";

import { useApp } from '@/lib/store';
import { authService } from '@/services/authService';

/**
 * Hook centralisé pour la gestion de l'authentification Supabase.
 */
export function useAuth() {
  const { state, logout } = useApp();

  return {
    user: state.user,
    session: state.session,
    profile: state.profile,
    isLoading: state.isLoading,
    isAuthenticated: !!state.user,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: logout,
    resetPassword: authService.resetPassword,
  };
}
