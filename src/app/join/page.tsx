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
  Zap, 
  Rocket, 
  Users, 
  GraduationCap, 
  Briefcase,
  Target,
  Globe
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
    <div className="min-h-screen flex flex-col connected-nodes bg-ink">
      <header className="p-6 flex items-center justify-between border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-50">
        <Button variant="ghost" size="sm" onClick={prev} disabled={step === 1} className="text-muted">
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
        <div className="w-32">
          <Progress value={progress} className="h-1.5 bg-surface-3" indicatorClassName="bg-primary" />
        </div>
        <div className="w-20 text-[10px] font-mono text-muted text-right">ÉTAPE {step}/{totalSteps}</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full">
        {/* Step 1: Identity */}
        {step === 1 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Identité KONEKT</h1>
              <p className="text-muted text-sm">Crée ton identité numérique unique.</p>
            </div>
            <div className="space-y-4">
              <Input 
                placeholder="Prénom" 
                className="h-14 rounded-2xl bg-surface-2 border-border"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
              <Input 
                placeholder="Nom" 
                className="h-14 rounded-2xl bg-surface-2 border-border"
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
              <Input 
                placeholder="Email" 
                type="email" 
                className="h-14 rounded-2xl bg-surface-2 border-border"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <Button 
                onClick={next} 
                disabled={!formData.firstName || !formData.email}
                className="w-full h-14 rounded-2xl bg-primary text-ink font-bold gap-2"
              >
                Continuer <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Profession */}
        {step === 2 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Qui es-tu ?</h1>
              <p className="text-muted text-sm">Sélectionne ton profil principal.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'Étudiant', icon: GraduationCap },
                { id: 'Entrepreneur', icon: Rocket },
                { id: 'Freelance', icon: Briefcase },
                { id: 'Créateur', icon: Sparkles },
                { id: 'Professionnel', icon: ShieldCheck },
                { id: 'Chercheur', icon: Users },
              ].map(role => (
                <button
                  key={role.id}
                  onClick={() => { setFormData({ ...formData, profession: role.id }); next(); }}
                  className={`p-6 rounded-[2rem] border transition-all text-left space-y-3 group ${
                    formData.profession === role.id ? 'bg-primary/10 border-primary' : 'glass-card border-border hover:border-primary/50'
                  }`}
                >
                  <role.icon className={`w-6 h-6 ${formData.profession === role.id ? 'text-primary' : 'text-muted group-hover:text-primary'}`} />
                  <p className="font-bold text-sm">{role.id}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Skills */}
        {step === 3 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Tes Compétences</h1>
              <p className="text-muted text-sm">Ce que tu apportes à la communauté.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Marketing', 'Finance', 'Design', 'Programmation', 'Droit', 'Vente', 'Communication', 'Agriculture', 'IA'].map(skill => (
                <button
                  key={skill}
                  onClick={() => {
                    const nextSkills = formData.skills.includes(skill) 
                      ? formData.skills.filter(s => s !== skill)
                      : [...formData.skills, skill];
                    setFormData({ ...formData, skills: nextSkills });
                  }}
                  className={`px-6 py-3 rounded-2xl border text-sm font-bold transition-all ${
                    formData.skills.includes(skill) ? 'bg-cyan text-ink border-cyan shadow-lg shadow-cyan/20' : 'glass-card border-border text-muted'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <Button onClick={next} disabled={formData.skills.length === 0} className="w-full h-14 rounded-2xl bg-primary text-ink font-bold mt-4">
              Continuer
            </Button>
          </div>
        )}

        {/* Step 4: Objectives */}
        {step === 4 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Tes Objectifs</h1>
              <p className="text-muted text-sm">Ce que tu recherches dans KONEKT.</p>
            </div>
            <div className="space-y-3">
              {['Apprendre', 'Trouver des opportunités', 'Créer un projet', 'Trouver un associé', 'Mentorat'].map(obj => (
                <button
                  key={obj}
                  onClick={() => {
                    const nextObjs = formData.objectives.includes(obj) 
                      ? formData.objectives.filter(o => o !== obj)
                      : [...formData.objectives, obj];
                    setFormData({ ...formData, objectives: nextObjs });
                  }}
                  className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    formData.objectives.includes(obj) ? 'bg-primary/10 border-primary text-primary' : 'glass-card border-border text-muted'
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

        {/* Step 5: Adhesion */}
        {step === 5 && (
          <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold">Niveau d'Adhésion</h1>
              <p className="text-muted text-sm">L'argent donne accès aux services. L'engagement donne accès au leadership.</p>
            </div>
            <div className="space-y-4">
              <TierCard 
                title="START" 
                price="5$" 
                benefits={['Accès communauté', 'Opportunités générales', 'Formations de base']}
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
                price="20$" 
                benefits={['Tout PLUS', 'Project Lab', 'Accès prioritaire']}
                selected={formData.tier === 'PRO'}
                onSelect={() => setFormData({...formData, tier: 'PRO'})}
              />
              <Button onClick={next} disabled={!formData.tier} className="w-full h-14 mt-4 rounded-2xl bg-primary text-ink font-bold">
                Valider mon adhésion
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Activation */}
        {step === 6 && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 w-full">
            <div className="w-24 h-24 rounded-[2.5rem] bg-cyan/10 border border-cyan/30 flex items-center justify-center mx-auto text-cyan animate-bounce">
              <Check className="w-12 h-12" strokeWidth={3} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-display font-bold">Bienvenue, {formData.firstName} !</h1>
              <p className="text-muted leading-relaxed">
                Ton identité KONEKT est active. Tu as été affecté à la cellule <b className="text-text">Kinshasa Centre #014</b>.<br/>
                Ton Leader <b className="text-text">Sarah</b> t'attend.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-[2rem] text-left border-cyan/20">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Cellule</p>
                <h3 className="font-bold text-sm">Entrepreneurs Kinshasa</h3>
                <p className="text-[10px] text-cyan mt-1">Rencontre Samedi 15h</p>
              </div>
              <div className="glass-card p-5 rounded-[2rem] text-left border-orange/20">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Première Mission</p>
                <h3 className="font-bold text-sm">Compléter mon ID</h3>
                <p className="text-[10px] text-orange mt-1">+10 Points</p>
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
        selected ? 'bg-surface-3 border-primary shadow-xl scale-[1.02]' : 'glass-card border-border hover:border-primary/30'
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
