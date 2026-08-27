
'use client';

import { Search, MapPin, Users, GraduationCap, Briefcase, Rocket } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';

export default function ExplorerPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 space-y-4">
        <h1 className="font-display font-bold text-xl">Explorer KONEKT</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-2" />
          <Input 
            className="pl-10 bg-surface-2 border-border focus:border-cyan transition-all rounded-2xl h-12" 
            placeholder="Membres, compétences, formations..." 
          />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10">
        {/* Categories */}
        <section className="grid grid-cols-2 gap-4">
          <CategoryCard icon={Users} label="Membres" count="8,742" color="cyan" />
          <CategoryCard icon={GraduationCap} label="Academy" count="125" color="gold" />
          <CategoryCard icon={Briefcase} label="Opportunités" count="48" color="orange" />
          <CategoryCard icon={Rocket} label="Projets" count="42" color="primary" />
        </section>

        {/* Match Recommendations */}
        <section className="space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">KONEKT MATCH · RECOMMANDATIONS</h3>
          <div className="space-y-4">
            <MatchCard name="Malick T." role="Développeur Mobile" skill="React Native" initials="MT" />
            <MatchCard name="Sarah D." role="Experte Finance" skill="Business Plan" initials="SD" />
            <MatchCard name="Awa K." role="Marketing Leader" skill="Copywriting" initials="AK" />
          </div>
        </section>

        {/* Popular Skills */}
        <section className="space-y-4">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">COMPÉTENCES RECHERCHÉES</h3>
          <div className="flex flex-wrap gap-2">
            {['Marketing Digital', 'IA & Prompting', 'Droit des Affaires', 'Comptabilité', 'Logistique', 'Vidéo'].map(skill => (
              <Badge key={skill} variant="outline" className="rounded-xl border-border px-4 py-2 text-[11px] text-muted hover:border-cyan/50 hover:text-cyan transition-colors cursor-pointer">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function CategoryCard({ icon: Icon, label, count, color }: any) {
  return (
    <div className={`glass-card p-6 rounded-[2rem] border-${color}/20 flex flex-col items-center text-center space-y-2`}>
      <div className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="font-display font-bold text-sm">{label}</p>
      <p className="text-[10px] font-mono text-muted-2">{count} objets</p>
    </div>
  );
}

function MatchCard({ name, role, skill, initials }: any) {
  return (
    <div className="glass-card p-5 rounded-[2.5rem] flex items-center justify-between border-border/50 hover:border-cyan/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-surface-3 flex items-center justify-center font-display font-bold text-cyan border border-border">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-[10px] text-muted-2 font-medium">{role}</p>
        </div>
      </div>
      <div className="text-right">
        <Badge className="bg-cyan/10 text-cyan border-none text-[8px] uppercase">{skill}</Badge>
        <button className="block text-[10px] text-cyan font-bold mt-2 hover:underline">Se connecter</button>
      </div>
    </div>
  );
}
