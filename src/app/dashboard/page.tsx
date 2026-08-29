'use client';

import { useKonekt } from '@/lib/store';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { HexFrame } from '@/components/ui/HexFrame';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Bell, 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Sparkles,
  Zap
} from 'lucide-react';
import { EngagementStats } from '@/components/dashboard/EngagementStats';

const OPPORTUNITIES = [
  {
    id: 1,
    author: "Cellule Gombe #014",
    tier: "PRO",
    initials: "G14",
    time: "Il y a 2h",
    type: "Financement",
    title: "Micro-crédit rotatif pour 8 porteurs de projet",
    body: "La cellule ouvre un tour de financement participatif interne pour soutenir 8 membres en phase de lancement. Ticket moyen visé : 500$.",
    tags: ["Financement", "Agro", "Cellule"],
    likes: 34,
    comments: 12,
    zone: "Zone Centre — Gombe",
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

  if (!user) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-6 text-center space-y-6">
        <h1 className="text-3xl font-display font-bold text-white">Bienvenue sur KONEKT</h1>
        <p className="text-muted max-w-sm">Veuillez vous inscrire pour rejoindre une cellule et accéder au réseau entrepreneurial.</p>
        <button onClick={() => window.location.href = '/join'} className="k-cta">S'inscrire maintenant</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ink connected-nodes">
      <AppSidebar />
      
      <main className="flex-1 md:ml-72 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-ink/80 backdrop-blur-md border-b border-white/5">
          <div className="flex-1 max-w-lg flex items-center gap-3 bg-surface border border-white/5 rounded-2xl px-4 py-2 text-muted">
            <Search size={16} />
            <input 
              placeholder="Chercher une opportunité, une cellule..." 
              className="bg-transparent border-none outline-none text-sm w-full text-white"
            />
          </div>
          <button className="ml-4 w-10 h-10 flex items-center justify-center rounded-2xl bg-surface border border-white/5 text-white hover:bg-surface-2 transition-colors">
            <Bell size={18} />
          </button>
        </header>

        <div className="p-6 max-w-4xl mx-auto w-full space-y-8 pb-28 md:pb-12">
          
          <section className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 k-hex-clip bg-orange/10 border border-orange/20 flex items-center justify-center text-orange">
                 <Zap className="w-5 h-5" />
               </div>
               <div>
                 <h2 className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] font-black">Mon Statut</h2>
                 <p className="text-xl font-display font-bold text-white">Christian Rwemera <span className="text-orange">· ID {user.uid.slice(-4)}</span></p>
               </div>
             </div>
             <EngagementStats />
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-display font-bold text-2xl text-white">Feed Opportunités</h1>
              <div className="flex gap-2">
                {['Tout', 'Finances', 'Jobs', 'Mentor'].map(f => (
                  <button key={f} className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${f === 'Tout' ? 'bg-orange border-orange text-ink' : 'glass-card border-white/5 text-muted hover:border-orange/50'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {OPPORTUNITIES.map((o) => (
                <article key={o.id} className="glass-card border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:border-orange/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <HexFrame size={46} color={o.tier === 'PRO' ? '#E8A83C' : '#35C29B'}>{o.initials}</HexFrame>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-white">{o.author}</strong>
                        <Badge variant="outline" className={`text-[9px] font-bold border-${o.tier === 'PRO' ? 'gold' : 'teal'} text-${o.tier === 'PRO' ? 'gold' : 'teal'} uppercase`}>
                          {o.tier}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted mt-1 uppercase font-mono tracking-widest">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {o.zone}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {o.time}</span>
                      </div>
                    </div>
                    <span className="bg-orange/10 border border-orange/20 text-orange text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
                      {o.type}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-orange transition-colors">{o.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{o.body}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {o.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-muted bg-surface-2 border border-white/5 px-4 py-1.5 rounded-xl">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-xs text-muted hover:text-white transition-colors">
                        <Heart size={16} /> {o.likes}
                      </button>
                      <button className="flex items-center gap-2 text-xs text-muted hover:text-white transition-colors">
                        <MessageCircle size={16} /> {o.comments}
                      </button>
                      <button className="text-muted hover:text-white transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                    <button className="k-cta h-11 text-xs px-6 shadow-lg shadow-orange/10">
                      Je suis intéressé·e
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}