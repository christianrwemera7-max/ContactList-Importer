
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronLeft, Sparkles, Check, ShieldCheck, Zap, Rocket, Users, GraduationCap, Briefcase } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    objectives: [] as string[],
    skills: [] as string[],
    tier: ''
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const roles = [
    { id: 'student', label: 'Étudiant', icon: GraduationCap },
    { id: 'entrepreneur', label: 'Entrepreneur', icon: Rocket },
    { id: 'freelance', label: 'Freelance', icon: Briefcase },
    { id: 'creator', label: 'Créateur', icon: Sparkles },
    { id: 'pro', label: 'Professionnel', icon: ShieldCheck },
    { id: 'seeker', label: 'Chercheur', icon: Users },
  ];

  const next = () => setStep(s => Math.min(s + 1, totalSteps));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const complete = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col connected-nodes">
      <header className="p-6 flex items-center justify-between border-b border-border/50">
        <Button variant="ghost" size="sm" onClick={prev} disabled={step === 1} className="text-muted">
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
        <div className="w-32">
          <Progress value={progress} className="h-1.5 bg-surface-3" indicatorClassName="bg-primary" />
        </div>
        <div className="w-20 text-[10px] font-mono text-muted text-right">ÉTAPE {step}/{totalSteps}</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Bienvenue chez KONEKT</h1>
              <p className="text-muted text-sm">Commençons par créer ton identité numérique.</p>
            </div>
            <div className="space-y-4">
              <Input placeholder="Prénom" className="h-14 rounded-2xl bg-surface-2 border-border" />
              <Input placeholder="Nom" className="h-14 rounded-2xl bg-surface-2 border-border" />
              <Input placeholder="Email" type="email" className="h-14 rounded-2xl bg-surface-2 border-border" />
              <Button onClick={next} className="w-full h-14 rounded-2xl bg-primary text-ink font-bold gap-2">
                Continuer <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Qui es-tu ?</h1>
              <p className="text-muted text-sm">Sélectionne ton profil principal.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => { setFormData({ ...formData, role: role.id }); next(); }}
                  className={`p-6 rounded-[2rem] border transition-all text-left space-y-3 group ${
                    formData.role === role.id ? 'bg-primary/10 border-primary' : 'glass-card border-border hover:border-primary/50'
                  }`}
                >
                  <role.icon className={`w-6 h-6 ${formData.role === role.id ? 'text-primary' : 'text-muted group-hover:text-primary'}`} />
                  <p className="font-bold text-sm">{role.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Tes objectifs ?</h1>
              <p className="text-muted text-sm">Que souhaites-tu accomplir avec KONEKT ?</p>
            </div>
            <div className="space-y-3">
              {['Apprendre', 'Trouver des opportunités', 'Créer un projet', 'Rencontrer des collaborateurs', 'Devenir entrepreneur'].map(obj => (
                <button
                  key={obj}
                  onClick={() => {
                    const nextObjs = formData.objectives.includes(obj) 
                      ? formData.objectives.filter(o => o !== obj)
                      : [...formData.objectives, obj];
                    setFormData({ ...formData, objectives: nextObjs });
                  }}
                  className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    formData.objectives.includes(obj) ? 'bg-cyan/10 border-cyan text-cyan' : 'glass-card border-border text-muted'
                  }`}
                >
                  <span className="text-sm font-bold">{obj}</span>
                  {formData.objectives.includes(obj) && <Check className="w-4 h-4" />}
                </button>
              ))}
              <Button onClick={next} disabled={formData.objectives.length === 0} className="w-full h-14 mt-6 rounded-2xl bg-primary text-ink font-bold">
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Choisis ton adhésion</h1>
              <p className="text-muted text-sm">Le moteur de ton activation.</p>
            </div>
            <div className="space-y-4">
              <TierCard 
                title="START" 
                price="5$" 
                benefits={['Accès communauté', 'Événements', 'Academy standard']}
                selected={formData.tier === 'START'}
                onSelect={() => setFormData({...formData, tier: 'START'})}
              />
              <TierCard 
                title="PLUS" 
                price="10$" 
                benefits={['Tout START', 'Formations avancées', 'Mentorat collectif']}
                selected={formData.tier === 'PLUS'}
                onSelect={() => setFormData({...formData, tier: 'PLUS'})}
                featured
              />
              <TierCard 
                title="PRO" 
                price="25$" 
                benefits={['Tout PLUS', 'Project Lab', 'Accès premium']}
                selected={formData.tier === 'PRO'}
                onSelect={() => setFormData({...formData, tier: 'PRO'})}
              />
              <Button onClick={next} disabled={!formData.tier} className="w-full h-14 mt-4 rounded-2xl bg-primary text-ink font-bold">
                Valider mon adhésion
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 rounded-[2.5rem] bg-cyan/10 border border-cyan/30 flex items-center justify-center mx-auto text-cyan animate-bounce">
              <Check className="w-12 h-12" strokeWidth={3} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-display font-bold">Bienvenue, Christian !</h1>
              <p className="text-muted leading-relaxed">
                Tu as été affecté à la cellule <b className="text-text">Cocody #032</b>.<br/>
                Ta Leader <b className="text-text">Awa</b> t'attend pour ta première rencontre.
              </p>
            </div>
            <div className="glass-card p-6 rounded-[2rem] text-left border-cyan/20">
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">Ta première mission</p>
              <h3 className="font-bold mb-2">Rencontre de cellule</h3>
              <div className="flex items-center gap-2 text-sm text-cyan">
                <Check className="w-4 h-4" /> Samedi 30 Août · 15h00
              </div>
            </div>
            <Button onClick={complete} size="lg" className="w-full h-16 rounded-[2rem] bg-primary text-ink font-bold text-lg">
              Entrer dans KONEKT
            </Button>
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
      className={`w-full p-6 rounded-[2.5rem] border text-left relative transition-all ${
        selected ? 'bg-surface-3 border-primary shadow-xl' : 'glass-card border-border hover:border-primary/30'
      }`}
    >
      {featured && <Badge className="absolute -top-3 right-8 bg-primary text-ink font-bold">RECOMMANDÉ</Badge>}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-display font-bold">{title}</h3>
          <p className="text-2xl font-display font-bold text-primary">{price}<span className="text-xs text-muted font-normal">/mois</span></p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-primary bg-primary text-ink' : 'border-border'}`}>
          {selected && <Check className="w-4 h-4" strokeWidth={3} />}
        </div>
      </div>
      <ul className="space-y-2">
        {benefits.map((b: string) => (
          <li key={b} className="text-xs text-muted flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" /> {b}
          </li>
        ))}
      </ul>
    </button>
  );
}
