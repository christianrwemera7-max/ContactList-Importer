
'use client';

import { useMemo } from 'react';
import { Compass, Search, Bell, Heart, MessageCircle, Share2, MapPin, Clock } from 'lucide-react';
import { HexFrame } from '@/components/ui/HexFrame';
import { Badge } from '@/components/ui/badge';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useKonekt } from '@/lib/store';

const OPPORTUNITIES = [
  {
    id: 1,
    author: "Cellule Kin-Sud",
    tier: "PRO",
    initials: "KS",
    time: "Il y a 2h",
    type: "Financement",
    title: "Micro-crédit rotatif pour 8 porteurs de projet",
    body: "La cellule ouvre un tour de financement participatif interne pour soutenir 8 membres en phase de lancement. Ticket moyen visé : 250$.",
    tags: ["Financement", "Agro", "Cellule"],
    likes: 34,
    comments: 12,
    zone: "Zone Sud — Gombe",
  },
  {
    id: 2,
    author: "Fatou D.",
    tier: "PLUS",
    initials: "FD",
    time: "Il y a 5h",
    type: "Marché",
    title: "Appel d'offres municipal — fournitures scolaires",
    body: "La mairie de Limete lance un appel d'offres pour l'équipement de 6 écoles. Cherche 2-3 membres KONEKT pour groupement.",
    tags: ["Appel d'offres", "Éducation"],
    likes: 51,
    comments: 19,
    zone: "Zone Centre — Limete",
  },
  {
    id: 3,
    author: "Pôle Numérique",
    tier: "PRO",
    initials: "PN",
    time: "Hier",
    type: "Formation",
    title: "Session gratuite : comptabilité simplifiée pour TPE",
    body: "3 places restantes pour la session du pôle national. Priorité aux membres START.",
    tags: ["Formation", "Gestion", "Pôle national"],
    likes: 28,
    comments: 6,
    zone: "Direction nationale",
  },
];

export default function Dashboard() {
  const { state } = useKonekt();
  const user = state.currentUser;

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-ink">
      <AppSidebar />
      
      <main className="flex-1 md:ml-72 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-ink/80 backdrop-blur-md border-b border-line">
          <div className="flex-1 max-w-lg flex items-center gap-3 bg-surface border border-line rounded-xl px-4 py-2 text-muted">
            <Search size={16} />
            <input 
              placeholder="Chercher une opportunité, une cellule..." 
              className="bg-transparent border-none outline-none text-sm w-full text-text"
            />
          </div>
          <button className="ml-4 w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-line text-text hover:bg-surface-2 transition-colors">
            <Bell size={18} />
          </button>
        </header>

        <div className="p-6 max-w-4xl mx-auto w-full space-y-8 pb-28 md:pb-12">
          <section className="space-y-2">
            <h1 className="font-display font-bold text-2xl">Feed opportunités</h1>
            <p className="text-muted text-sm">Financements, appels d'offres et formations remontés par les cellules.</p>
          </section>

          <div className="space-y-6">
            {OPPORTUNITIES.map((o) => (
              <article key={o.id} className="bg-surface border border-line rounded-[2rem] p-6 space-y-4 hover:border-teal/30 transition-all">
                <div className="flex items-center gap-4">
                  <HexFrame size={42} color={o.tier === 'PRO' ? '#E8A83C' : '#35C29B'}>{o.initials}</HexFrame>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold">{o.author}</strong>
                      <Badge variant="outline" className={`text-[9px] font-bold border-${o.tier === 'PRO' ? 'gold' : 'teal'} text-${o.tier === 'PRO' ? 'gold' : 'teal'} uppercase`}>
                        {o.tier}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted mt-1">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {o.zone}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {o.time}</span>
                    </div>
                  </div>
                  <span className="bg-gold-dim border border-gold/30 text-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {o.type}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg leading-tight">{o.title}</h3>
                <p className="text-sm text-text/80 leading-relaxed">{o.body}</p>
                
                <div className="flex flex-wrap gap-2">
                  {o.tags.map(t => (
                    <span key={t} className="text-[11px] text-muted bg-surface-2 border border-line px-3 py-1 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-xs text-muted hover:text-text transition-colors">
                      <Heart size={16} /> {o.likes}
                    </button>
                    <button className="flex items-center gap-2 text-xs text-muted hover:text-text transition-colors">
                      <MessageCircle size={16} /> {o.comments}
                    </button>
                    <button className="text-muted hover:text-text transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                  <button className="k-cta text-xs py-2 px-4">
                    Je suis intéressé·e
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
