"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wallet,
  Users,
  Rocket,
  MapPin,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Smartphone,
  CreditCard,
  Landmark,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useKonekt } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ZONES = ["Zone Sud", "Zone Centre", "Zone Nord", "Zone Est", "Zone Ouest"];

const PALIERS = [
  {
    id: "START",
    prix: "5 $ / mois",
    color: "text-muted",
    icon: Wallet,
    desc: "Adhésion de base : accès au feed, à la bibliothèque et à l'espace personnel.",
  },
  {
    id: "PLUS",
    prix: "10 $ / mois",
    color: "text-teal",
    icon: Users,
    desc: "Accès au Match et à l'espace projet, priorité sur les formations de cellule.",
  },
  {
    id: "PRO",
    prix: "20 $ / mois",
    color: "text-gold",
    icon: Rocket,
    desc: "Accompagnement renforcé, visibilité prioritaire dans le feed et le Match.",
  },
];

const SECTEURS = [
  "Agroalimentaire",
  "Mode & Artisanat",
  "Numérique / Tech",
  "Logistique",
  "Commerce",
  "Éducation & Formation",
  "Services",
  "Autre",
];

const PAIEMENTS = [
  { id: "mobile", label: "Mobile Money", icon: Smartphone },
  { id: "carte", label: "Carte bancaire", icon: CreditCard },
  { id: "virement", label: "Virement", icon: Landmark },
];

const STEPS = ["Identité", "Localisation", "Palier", "Profil", "Paiement", "Confirmation"];

export default function OnboardingPage() {
  const router = useRouter();
  const { register } = useKonekt();
  const [step, setStep] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [form, setForm] = useState<any>({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    motDePasse: "",
    confirmation: "",
    zone: "",
    ville: "",
    palier: "",
    secteur: "",
    projetEnCours: false,
    projetDesc: "",
    modePaiement: "",
  });

  const [errors, setErrors] = useState<any>({});

  const progress = ((step + 1) / STEPS.length) * 100;

  const setVal = (key: string, val: any) => {
    setForm((f: any) => ({ ...f, [key]: val }));
  };

  const validate = () => {
    const e: any = {};
    if (step === 0) {
      if (!form.prenom) e.prenom = "Champ requis";
      if (!form.email || !form.email.includes("@")) e.email = "Email invalide";
      if (form.motDePasse.length < 6) e.motDePasse = "6 caractères min.";
    }
    if (step === 1 && !form.zone) e.zone = "Choisissez une zone";
    if (step === 2 && !form.palier) e.palier = "Choisissez un palier";
    if (step === 3 && !form.secteur) e.secteur = "Choisissez un secteur";
    if (step === 4 && !form.modePaiement) e.modePaiement = "Requis";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (step === 4) {
      setSubmitting(true);
      try {
        const res = await register(form);
        setResult(res);
        setStep(5);
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-6 pb-24 md:pb-6">
      <div className="w-full max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="flex flex-col items-center text-center space-y-4 mb-10">
          <div className="w-16 h-16 k-hex-clip bg-orange flex items-center justify-center font-display font-bold text-ink text-3xl">K</div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter">Votre ID KONEKT</h1>
          <div className="w-full max-w-xs space-y-2">
            <Progress value={progress} className="h-1.5 bg-surface-2" indicatorClassName="bg-orange" />
            <p className="text-[10px] font-mono text-muted uppercase tracking-[0.3em]">Étape {step + 1} : {STEPS[step]}</p>
          </div>
        </header>

        <main className="glass-card p-8 rounded-[2.5rem] border-white/5 space-y-6">
          
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest px-1">Prénom</p>
                <Input value={form.prenom} onChange={e => setVal('prenom', e.target.value)} placeholder="Aïcha" className="bg-surface-2 border-white/5 h-12 rounded-2xl" />
                {errors.prenom && <p className="text-[10px] text-orange px-1">{errors.prenom}</p>}
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest px-1">Nom</p>
                <Input value={form.nom} onChange={e => setVal('nom', e.target.value)} placeholder="Bamba" className="bg-surface-2 border-white/5 h-12 rounded-2xl" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest px-1">Email Professionnel</p>
                <Input type="email" value={form.email} onChange={e => setVal('email', e.target.value)} placeholder="aicha@konekt.id" className="bg-surface-2 border-white/5 h-12 rounded-2xl" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest px-1">Mot de passe</p>
                <div className="relative">
                  <Input type={showPwd ? "text" : "password"} value={form.motDePasse} onChange={e => setVal('motDePasse', e.target.value)} className="bg-surface-2 border-white/5 h-12 rounded-2xl pr-10" />
                  <button onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Choisir ma Zone</p>
                <div className="flex flex-wrap gap-2">
                  {ZONES.map(z => (
                    <button key={z} onClick={() => setVal('zone', z)} className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${form.zone === z ? 'bg-orange border-orange text-ink' : 'glass-card border-white/5 text-muted hover:border-orange/50'}`}>
                      {z}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Ville / Quartier</p>
                <Input value={form.ville} onChange={e => setVal('ville', e.target.value)} placeholder="Gombe, Kinshasa" className="bg-surface-2 border-white/5 h-12 rounded-2xl" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3">
              {PALIERS.map(p => (
                <button key={p.id} onClick={() => setVal('palier', p.id)} className={`flex items-start gap-4 p-5 rounded-[2rem] border text-left transition-all ${form.palier === p.id ? 'bg-surface-2 border-orange scale-[1.02]' : 'glass-card border-white/5'}`}>
                  <div className={`w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center ${p.color}`}>
                    <p.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-display font-bold text-white">{p.id}</span>
                      <span className={`font-mono text-[10px] font-bold ${p.color}`}>{p.prix}</span>
                    </div>
                    <p className="text-[10px] text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Secteur Principal</p>
                <div className="grid grid-cols-2 gap-2">
                  {SECTEURS.map(s => (
                    <button key={s} onClick={() => setVal('secteur', s)} className={`px-4 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-wider transition-all ${form.secteur === s ? 'bg-orange border-orange text-ink' : 'glass-card border-white/5 text-muted'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Mode de paiement</p>
                <div className="grid grid-cols-3 gap-3">
                  {PAIEMENTS.map(p => (
                    <button key={p.id} onClick={() => setVal('modePaiement', p.id)} className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${form.modePaiement === p.id ? 'bg-orange/10 border-orange text-orange' : 'glass-card border-white/5 text-muted'}`}>
                      <p.icon size={20} />
                      <span className="text-[9px] font-bold uppercase">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-surface-2 rounded-2xl border border-white/5 space-y-2">
                <div className="flex justify-between text-[11px]"><span className="text-muted">Palier</span><span className="text-white font-bold">{form.palier}</span></div>
                <div className="flex justify-between text-[11px]"><span className="text-muted">Zone</span><span className="text-white font-bold">{form.zone}</span></div>
              </div>
            </div>
          )}

          {step === 5 && result && (
            <div className="text-center space-y-6 py-6 animate-in zoom-in-95">
              <div className="w-20 h-20 k-hex-clip bg-teal flex items-center justify-center text-ink mx-auto">
                <Check size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold text-white">Félicitations !</h2>
                <p className="text-sm text-muted">Bienvenue, {result.membre.prenom}. Votre ID KONEKT est actif.</p>
              </div>
              <div className="bg-surface-2 p-6 rounded-[2rem] border border-white/5 space-y-4 text-left">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[10px] font-mono text-muted uppercase">Cellule Assignée</span>
                  <span className="font-display font-bold text-teal text-xl">#{result.cellule.id}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-muted uppercase">Impact Immédiat</p>
                  <p className="text-xs text-white">Vous êtes le <span className="text-orange font-bold">{result.cellule.membres}ème membre</span> de cette cellule. Votre leader local vous contactera sous 24h.</p>
                </div>
              </div>
              <Button onClick={() => router.push('/dashboard')} className="w-full h-14 rounded-2xl bg-orange text-ink font-bold text-lg">Entrer dans le réseau</Button>
            </div>
          )}

          {step < 5 && (
            <div className="flex gap-4 pt-4">
              <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0} className="flex-1 h-14 rounded-2xl text-muted hover:text-white border border-white/5">
                <ChevronLeft className="mr-2" size={18} /> Retour
              </Button>
              <Button onClick={handleNext} disabled={submitting} className="flex-[2] h-14 rounded-2xl bg-orange text-ink font-bold hover:bg-orange/90 shadow-xl shadow-orange/20">
                {submitting ? <Loader2 className="animate-spin" /> : step === 4 ? "Confirmer mon ID" : "Continuer"}
                {step < 4 && <ChevronRight className="ml-2" size={18} />}
              </Button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}