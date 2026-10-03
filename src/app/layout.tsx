import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouveau Projet",
  description: "Démarrage d'un nouveau projet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
