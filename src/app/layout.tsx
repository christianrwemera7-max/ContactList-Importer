
import "./globals.css";
import type { Metadata } from "next";
import { AppProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Espace Étudiant - RévisionFacile",
  description: "Plateforme moderne d'organisation et de révision pour étudiants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
