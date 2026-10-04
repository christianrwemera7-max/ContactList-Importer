
"use client";

import "./globals.css";
import { AppProvider, useApp } from "@/lib/store";
import { Toaster } from "@/components/ui/toaster";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Liste des routes qui nécessitent d'être connecté
const PROTECTED_ROUTES = [
  '/dashboard',
  '/study',
  '/community',
  '/challenges',
  '/profile',
  '/explorer',
  '/opportunities',
  '/academy',
  '/governance',
  '/vision',
  '/tasks',
  '/documents'
];

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { state } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Si l'auth est chargée et que l'utilisateur n'est pas connecté sur une route protégée
    if (!state.isLoading && !state.user && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
      router.push('/login');
    }
  }, [state.isLoading, state.user, pathname, router]);

  // Optionnel : On pourrait afficher un loader global ici pendant state.isLoading
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="light">
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <AppProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
