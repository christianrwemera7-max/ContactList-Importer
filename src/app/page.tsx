"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

type AppStep = 'splash' | 'start' | 'input' | 'preview' | 'instructions';

export default function ContactImporterPage() {
  const [step, setStep] = useState<AppStep>('splash');
  const [rawInput, setRawInput] = useState('');
  const [contacts, setContacts] = useState<string[]>([]);
  const [duplicatesCount, setDuplicatesCount] = useState(0);
  const [invalidCount, setInvalidCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('start'), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const processNumbers = () => {
    // Séparateurs : sauts de ligne, virgules, espaces, points-virgules
    const lines = rawInput.split(/[\n\r\s,;]+/);
    const seen = new Set<string>();
    const valid: string[] = [];
    let dups = 0;
    let inv = 0;

    lines.forEach(line => {
      const clean = line.trim();
      if (!clean) return;

      // Validation : doit contenir au moins 3 chiffres
      const digitMatch = clean.match(/\d/g);
      if (!digitMatch || digitMatch.length < 3) {
        inv++;
        return;
      }

      if (seen.has(clean)) {
        dups++;
      } else {
        seen.add(clean);
        if (valid.length < 1000) {
          valid.push(clean);
        }
      }
    });

    setContacts(valid);
    setDuplicatesCount(dups);
    setInvalidCount(inv);
    setStep('preview');
  };

  const generateVCF = () => {
    setIsGenerating(true);
    
    let vcfContent = "";
    contacts.forEach((num, index) => {
      vcfContent += `BEGIN:VCARD\n`;
      vcfContent += `VERSION:3.0\n`;
      vcfContent += `FN:Contact ${index + 1}\n`;
      vcfContent += `TEL;TYPE=CELL:${num}\n`;
      vcfContent += `END:VCARD\n`;
    });

    const blob = new Blob([vcfContent], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Contacts_NeoStud_${Date.now()}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setStep('instructions');
      setIsGenerating(false);
    }, 1500);
  };

  if (step === 'splash') {
    return (
      <div className="min-h-screen bg-[#05030A] flex flex-col items-center justify-center p-8">
        <div className="relative w-64 h-32 animate-in fade-in zoom-in duration-1000">
           <div className="text-center space-y-6">
              <span className="text-5xl font-display font-black text-white lowercase tracking-tighter italic">neostud</span>
              <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">ContactList Importer</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05030A] text-foreground font-sans selection:bg-primary/30 no-scrollbar overflow-x-hidden">
      <main className="max-w-xl mx-auto min-h-screen flex flex-col p-6 md:p-12">
        
        <header className="mb-16 flex justify-between items-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
            NeoStud Active Protocol
          </span>
          {step !== 'start' && (
            <button 
              onClick={() => { setStep('start'); setRawInput(''); }}
              className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Reset
            </button>
          )}
        </header>

        <div className="flex-1 flex flex-col justify-center">
          {step === 'start' && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-6xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.85] italic">
                  Import<br /><span className="text-primary">Massif.</span>
                </h2>
                <p className="text-muted-foreground font-bold text-sm leading-relaxed max-w-[300px] mx-auto md:mx-0">
                  Convertissez instantanément vos listes de numéros en fichiers contacts .VCF sécurisés.
                </p>
              </div>
              <Button 
                onClick={() => setStep('input')}
                className="h-28 w-full rounded-[40px] bg-primary text-white text-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform"
              >
                Commencer
              </Button>
            </div>
          )}

          {step === 'input' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-4">
                  Zone de saisie
                </label>
                <Textarea 
                  placeholder="Collez ici vos numéros (WhatsApp, Excel, SMS...)"
                  className="min-h-[400px] bg-white/5 border-none rounded-[48px] p-10 text-xl font-bold placeholder:opacity-5 focus-visible:ring-1 focus-visible:ring-primary/40 no-scrollbar resize-none"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-6">
                <Button 
                  disabled={!rawInput.trim()}
                  onClick={processNumbers}
                  className="h-24 rounded-[32px] bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-[0.3em]"
                >
                  Analyser la liste
                </Button>
                <p className="text-center text-[9px] text-white/20 font-black uppercase tracking-[0.5em]">
                  Capacité : 1 000 contacts / fichier
                </p>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Total" value={contacts.length} color="text-primary" />
                <StatCard label="Doublons" value={duplicatesCount} color="text-white/20" />
                <StatCard label="Invalides" value={invalidCount} color="text-white/20" />
              </div>

              <div className="bg-white/5 rounded-[48px] p-8 max-h-[350px] overflow-y-auto no-scrollbar border border-white/5">
                <div className="space-y-6">
                  {contacts.length === 0 ? (
                    <p className="text-center text-xs font-bold text-white/20 uppercase tracking-widest py-10">Aucun numéro valide détecté</p>
                  ) : (
                    contacts.map((num, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
                        <span className="text-[10px] font-black text-white/10 uppercase tracking-tighter w-8">
                          {String(i + 1).padStart(3, '0')}
                        </span>
                        <span className="flex-1 text-sm font-bold text-white/80">Contact {i + 1}</span>
                        <span className="text-sm font-mono font-bold text-primary tracking-tighter">{num}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={generateVCF}
                  disabled={contacts.length === 0 || isGenerating}
                  className="h-24 rounded-[32px] bg-primary text-white text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20"
                >
                  {isGenerating ? "Encryption..." : "Générer le fichier VCF"}
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setStep('input')}
                  className="h-14 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-white/20 border border-white/5"
                >
                  Modifier la source
                </Button>
              </div>
            </div>
          )}

          {step === 'instructions' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full animate-pulse" />
                </div>
                <h2 className="text-4xl font-display font-black uppercase tracking-tighter italic">Transfert Prêt</h2>
                <p className="text-muted-foreground font-bold text-sm max-w-[250px] mx-auto leading-relaxed">
                  Le fichier est dans vos téléchargements. Suivez les étapes d'importation.
                </p>
              </div>

              <div className="grid gap-6">
                <InstructionBox 
                  platform="iPhone / iOS"
                  steps={[
                    "Ouvrez le fichier NeoStud dans 'Fichiers'",
                    "Partager > App 'Contacts'",
                    "Sélectionnez 'Ajouter les contacts'"
                  ]}
                />
                <InstructionBox 
                  platform="Android OS"
                  steps={[
                    "Ouvrez le fichier .vcf téléchargé",
                    "Importer dans les contacts",
                    "Validez la fusion des données"
                  ]}
                />
              </div>

              <Button 
                onClick={() => { setStep('start'); setRawInput(''); }}
                className="h-20 w-full rounded-[24px] bg-white text-black text-xs font-black uppercase tracking-[0.3em]"
              >
                Nouvelle session
              </Button>
            </div>
          )}
        </div>

        <footer className="mt-20 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/5">
            NeoStud Technology Systems
          </p>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-white/5 rounded-[32px] p-6 text-center border border-white/5">
      <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">{label}</p>
      <p className={cn("text-2xl font-black tabular-nums", color)}>{value}</p>
    </div>
  );
}

function InstructionBox({ platform, steps }: { platform: string, steps: string[] }) {
  return (
    <div className="bg-white/5 rounded-[40px] p-8 border border-white/5 space-y-6">
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{platform}</h4>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-[10px] font-black text-white/10 mt-1">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-xs font-bold text-white/60 leading-relaxed uppercase tracking-tight">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}