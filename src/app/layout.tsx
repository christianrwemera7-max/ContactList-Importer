
"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <title>ContactList Importer | NeoStud Premium</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <meta name="description" content="Importation massive de contacts au format VCF." />
      </head>
      <body className="antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
