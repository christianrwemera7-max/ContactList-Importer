
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Rocket, 
  Users, 
  GraduationCap, 
  Briefcase
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profession: '',
    objectives: [] as string[],
    skills: [] as string[],
    tier: ''
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const next = () => setStep(s => Math.min(s + 1, totalSteps));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const complete = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col connected-nodes bg-ink selection:bg-orange selection:text-ink">
      <header className="p-6 flex items-center justify-between border-b border-white/5 sticky top-0 bg-ink/80 backdrop-blur-md z-50">
        <Button variant="ghost" size="sm" onClick={prev} disabled={step === 1} className="text-muted hover:text-white">
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
        <div className="w-32">
          <Progress value={progress} className="h-1.5 bg-surface-3" indicatorClassName="bg-orange" />
        </div>
        <div className="w-20 text-[10px] font-mono text-muted text-right font-black tracking-widest uppercase">ÉTAPE {step}</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full py-20">
        {/* Step 1: Vision Awareness */}
        {step === 1 && (
          <div className="space-y-10 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-[2rem] bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-display font-bold text-white tracking-tighter">Votre ID KONEKT</h1>
              <p className="text-muted text-sm leading-relaxed max-w-[280px] mx-auto">
                L'identité numérique unique qui certifie votre appartenance au réseau et votre score de valeur.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="Prénom" 
                  className="h-14 rounded-2xl bg-surface-2 border-white/5 text-white focus:border-orange/50 transition-all"
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                />
                <Input 
                  placeholder="Nom" 
                  className="h-14 rounded-2xl bg-surface-2 border-white/5 text-white focus:border-orange/50 transition-all"
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <Input 
                placeholder="Email professionnel" 
                type="email" 
                className="h-14 rounded-2xl bg-surface-2 border-white/5 text-white focus:border-orange/50 transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <Button 
                onClick={next} 
                disabled={!formData.firstName || !formData.email}
                className="w-full h-14 rounded-2xl bg-orange text-ink font-bold gap-2 text-lg"
              >
                Commencer <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {step === 2 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold text-white">Votre Profil</h1>
              <p className="text-muted text-sm">Ceci nous aide à vous placer dans la bonne Cellule.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'Entrepreneur', icon: Rocket, label: 'Lancer & Bâtir' },
                { id: 'Professionnel', icon: ShieldCheck, label: 'Expert Métier' },
                { id: 'Freelance', icon: Briefcase, label: 'Services Tech' },
                { id: 'Étudiant', icon: GraduationCap, label: 'Apprentissage' },
                { id: 'Créateur', icon: Sparkles, label: 'Média & Art' },
                { id: 'Chercheur', icon: Users, label: 'Pôle Social' },
              ].map(role => (
                <button
                  key={role.id}
                  onClick={() => { setFormData({ ...formData, profession: role.id }); next(); }}
                  className={`p-6 rounded-[2rem] border transition-all text-left space-y-3 group ${
                    formData.profession === role.id ? 'bg-orange/10 border-orange' : 'glass-card border-white/5 hover:border-orange/50'
                  }`}
                >
                  <role.icon className={`w-6 h-6 ${formData.profession === role.id ? 'text-orange' : 'text-muted group-hover:text-orange'}`} />
                  <div>
                    <p className="font-bold text-sm text-white">{role.id}</p>
                    <p className="text-[10px] text-muted-2 uppercase tracking-widest font-mono mt-1">{role.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Tiers (Crucial Vision Part) */}
        {step === 5 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold text-white">Adhésion Annuelle</h1>
              <p className="text-muted text-sm leading-relaxed max-w-[320px] mx-auto">
                L'argent finance les ressources. L'engagement finance votre leadership. Choisissez votre point d'entrée.
              </p>
            </div>
            <div className="space-y-4">
              <TierCard 
                title="START" 
                price="5$" 
                benefits={['Accès Cellule de proximité', 'Academy (Base)', 'Événements Networking']}
                selected={formData.tier === 'START'}
                onSelect={() => setFormData({...formData, tier: 'START'})}
              />
              <TierCard 
                title="PLUS" 
                price="10$" 
                benefits={['Tout START', 'Mentorat collectif', 'Accès Opportunités 48h avant']}
                selected={formData.tier === 'PLUS'}
                onSelect={() => setFormData({...formData, tier: 'PLUS'})}
                featured
              />
              <TierCard 
                title="PRO" 
                price="20$" 
                benefits={['Tout PLUS', 'Incubation Project Lab', 'Moteur KONEKT MATCH Pro']}
                selected={formData.tier === 'PRO'}
                onSelect={() => setFormData({...formData, tier: 'PRO'})}
              />
              <Button onClick={next} disabled={!formData.tier} className="w-full h-14 mt-4 rounded-2xl bg-orange text-ink font-bold text-lg">
                Confirmer mon adhésion
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Success */}
        {step === 6 && (
          <div className="text-center space-y-10 animate-in zoom-in-95 duration-500 w-full">
            <div className="relative mx-auto w-32 h-32">
              <div className="absolute inset-0 bg-orange/20 blur-2xl rounded-full" />
              <div className="w-full h-full rounded-[2.5rem] bg-orange/10 border border-orange/30 flex items-center justify-center text-orange relative z-10">
                <Check className="w-16 h-16" strokeWidth={3} />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-display font-bold text-white tracking-tighter">Bienvenue, {formData.firstName} !</h1>
              <p className="text-muted leading-relaxed text-sm">
                Votre ID KONEKT <b className="text-white">8742-014</b> est actif.<br/>
                Affectation : <b className="text-white">Cellule Gombe #014</b>.<br/>
                Votre Leader vous contactera sous 24h.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-[2rem] text-left border-blue-electric/20">
                <p className="text-[9px] font-mono text-muted uppercase tracking-widest mb-2 font-black">Prochaine Étape</p>
                <h3 className="font-bold text-xs text-white">Compléter mon ID</h3>
                <p className="text-[10px] text-blue-electric mt-1 font-bold">+50 Points</p>
              </div>
              <div className="glass-card p-5 rounded-[2rem] text-left border-orange/20">
                <p className="text-[9px] font-mono text-muted uppercase tracking-widest mb-2 font-black">Adhésion</p>
                <h3 className="font-bold text-xs text-white">KONEKT {formData.tier}</h3>
                <p className="text-[10px] text-orange mt-1 font-bold">Actif jusqu'en 2027</p>
              </div>
            </div>
            <Button onClick={complete} size="lg" className="w-full h-16 rounded-[2rem] bg-orange text-ink font-bold text-xl shadow-xl shadow-orange/20">
              Entrer dans le Flow
            </Button>
          </div>
        )}

        {/* Other steps simplified for brevity but functional */}
        {step === 3 && (
           <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 text-center">
             <h1 className="text-3xl font-display font-bold text-white">Vos Talents</h1>
             <div className="flex flex-wrap gap-2 justify-center">
               {['Tech', 'Finance', 'Design', 'Vente', 'Agriculture', 'Logistique'].map(s => (
                 <button key={s} onClick={() => next()} className="px-6 py-3 rounded-2xl glass-card border-white/5 text-muted hover:border-orange text-sm font-bold">{s}</button>
               ))}
             </div>
           </div>
        )}
        {step === 4 && (
           <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 text-center">
             <h1 className="text-3xl font-display font-bold text-white">Vos Objectifs</h1>
             <div className="space-y-3">
               {['Trouver un associé', 'Apprendre', 'Financer mon projet'].map(o => (
                 <button key={o} onClick={() => next()} className="w-full p-5 rounded-2xl glass-card border-white/5 text-muted hover:border-orange text-sm font-bold">{o}</button>
               ))}
             </div>
           </div>
        )}
      </main>
    </div>
  );
}

function TierCard({ title, price, benefits, selected, onSelect, featured }: any) {
  return (
    <button
      onClick={onSelect}
      className={`w-full p-6 rounded-[2.5rem] border text-left relative transition-all duration-500 ${
        selected ? 'bg-surface border-orange shadow-2xl scale-[1.02]' : 'glass-card border-white/5 hover:border-orange/30'
      }`}
    >
      {featured && <Badge className="absolute -top-3 right-8 bg-orange text-ink font-black text-[10px] px-3 py-1">RECOMMANDÉ</Badge>}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-white">{title}</h3>
          <p className="text-2xl font-display font-bold text-orange">{price}<span className="text-xs text-muted font-normal">/an</span></p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-orange bg-orange text-ink' : 'border-white/10'}`}>
          {selected && <Check className="w-4 h-4" strokeWidth={3} />}
        </div>
      </div>
      <ul className="space-y-2">
        {benefits.map((b: string) => (
          <li key={b} className="text-[11px] text-muted flex items-center gap-2 font-medium">
            <div className="w-1 h-1 rounded-full bg-orange" /> {b}
          </li>
        ))}
      </ul>
    </button>
  );
}
