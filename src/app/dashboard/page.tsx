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
  MapPin, 
  Clock, 
  Zap,
  TrendingUp
} from 'lucide-react';

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
    color: "#E8A83C"
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
    color: "#2563EB"
  },
];

export default function Dashboard() {
  const { state } = useKonekt();
  const user = state.currentUser;

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-16 h-16 k-hex-clip bg-primary flex items-center justify-center font-display font-bold text-white text-3xl shadow-xl shadow-primary/20">K</div>
        <h1 className="text-3xl font-display font-bold text-foreground uppercase tracking-tighter">Bienvenue sur KONEKT</h1>
        <p className="text-muted-foreground max-w-sm">Rejoignez une cellule pour accéder au réseau entrepreneurial.</p>
        <button onClick={() => window.location.href = '/join'} className="k-cta">S'inscrire maintenant</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background connected-nodes">
      <AppSidebar />
      
      <main className="flex-1 md:ml-72 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-border">
          <div className="flex-1 max-w-lg flex items-center gap-3 bg-muted border border-border rounded-2xl px-4 py-2 text-muted-foreground">
            <Search size={16} />
            <input 
              placeholder="Chercher une opportunité..." 
              className="bg-transparent border-none outline-none text-sm w-full text-foreground"
            />
          </div>
          <button className="ml-4 w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-border text-foreground hover:bg-muted transition-colors">
            <Bell size={18} />
          </button>
        </header>

        <div className="p-6 max-w-4xl mx-auto w-full space-y-8 pb-28 md:pb-12">
          
          {/* Status Header */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 k-hex-clip bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                 <Zap className="w-5 h-5" />
               </div>
               <div>
                 <h2 className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] font-black">Mon Statut</h2>
                 <p className="text-xl font-display font-bold text-foreground">{user.prenom} {user.nom} <span className="text-primary">· ID {user.uid.slice(-4)}</span></p>
               </div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <StatusCard label="Cellule" value={`#${user.celluleId}`} />
               <StatusCard label="Palier" value={user.palier} color="text-primary" />
               <StatusCard label="Secteur" value={user.secteur} />
               <StatusCard label="Réseau" value="ACTIF" color="text-secondary" />
             </div>
          </section>

          {/* Feed */}
          <section className="space-y-6">
            <h1 className="font-display font-bold text-2xl text-foreground tracking-tighter uppercase">Feed Opportunités</h1>
            <div className="space-y-6">
              {OPPORTUNITIES.map((o) => (
                <article key={o.id} className="glass-card rounded-[2.5rem] p-8 space-y-6 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <HexFrame size={46} color={o.color}>{o.initials}</HexFrame>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-foreground">{o.author}</strong>
                        <Badge variant="outline" className={`text-[9px] font-bold border-border text-muted-foreground uppercase`}>
                          {o.tier}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1 uppercase font-mono tracking-widest">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {o.zone}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {o.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">{o.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{o.body}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {o.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted border border-border px-4 py-1.5 rounded-xl">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Heart size={16} /> {o.likes}
                      </button>
                      <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <MessageCircle size={16} /> {o.comments}
                      </button>
                    </div>
                    <button className="k-cta h-11 text-xs px-6">
                      Plus d'infos
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

function StatusCard({ label, value, color = "text-foreground" }: any) {
  return (
    <div className="glass-card p-6 rounded-[2rem] border-border bg-white shadow-sm">
      <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-black mb-1">{label}</p>
      <p className={`text-lg font-bold truncate ${color}`}>{value}</p>
    </div>
  );
}
