
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

type AppStep = 'start' | 'input' | 'preview' | 'instructions';

export default function ContactImporterPage() {
  const [step, setStep] = useState<AppStep>('start');
  const [rawInput, setRawInput] = useState('');
  const [contacts, setContacts] = useState<string[]>([]);
  const [duplicatesCount, setDuplicatesCount] = useState(0);
  const [invalidCount, setInvalidCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Séquence d'introduction fluide
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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

      // Validation basique : doit contenir au moins 3 chiffres
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
    link.setAttribute('download', `Contacts_Import_${Date.now()}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setStep('instructions');
    setIsGenerating(false);
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#05030A] flex items-center justify-center p-8">
        <div className="text-center space-y-4 animate-in fade-in duration-1000">
          <h1 className="text-primary text-4xl md:text-6xl font-display font-black tracking-tighter italic text-glow uppercase">
            ContactList
          </h1>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.8em]">
            Importer Premium
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05030A] text-foreground font-sans selection:bg-primary/30">
      <main className="max-w-xl mx-auto min-h-screen flex flex-col p-6 md:p-12">
        
        {/* Header Minimaliste */}
        <header className="mb-12">
          <div className="flex justify-between items-center">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">
              ContactList v1.0
            </span>
            {step !== 'start' && (
              <button 
                onClick={() => { setStep('start'); setRawInput(''); }}
                className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Recommencer
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-center">
          {step === 'start' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-4">
                <h2 className="text-5xl font-display font-black tracking-tighter uppercase leading-none">
                  Importation<br />Massive.
                </h2>
                <p className="text-muted-foreground font-bold text-sm leading-relaxed max-w-[280px]">
                  Convertissez vos listes de numéros en fichiers contacts prêts à l'emploi.
                </p>
              </div>
              <Button 
                onClick={() => setStep('input')}
                className="h-24 w-full rounded-[32px] bg-primary text-white text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20"
              >
                Démarrer l'import
              </Button>
            </div>
          )}

          {step === 'input' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                  Collez vos numéros ici
                </label>
                <Textarea 
                  placeholder="Ex: +243... , 081... , 099..."
                  className="min-h-[300px] bg-white/5 border-none rounded-[32px] p-8 text-lg font-bold placeholder:opacity-10 focus-visible:ring-1 focus-visible:ring-primary/50 no-scrollbar"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Button 
                  disabled={!rawInput.trim()}
                  onClick={processNumbers}
                  className="h-20 rounded-[24px] bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-[0.3em]"
                >
                  Analyser la liste
                </Button>
                <p className="text-center text-[9px] text-white/20 font-black uppercase tracking-widest">
                  Limite : 1 000 contacts par fichier
                </p>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Total" value={contacts.length} color="text-primary" />
                <StatCard label="Doublons" value={duplicatesCount} color="text-white/40" />
                <StatCard label="Invalides" value={invalidCount} color="text-white/40" />
              </div>

              <div className="bg-white/5 rounded-[32px] p-6 max-h-[350px] overflow-y-auto no-scrollbar border border-white/5">
                <div className="space-y-4">
                  {contacts.map((num, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-sm font-bold text-white/80">Contact {i + 1}</span>
                      <span className="text-sm font-mono font-bold text-primary">{num}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={generateVCF}
                  disabled={contacts.length === 0 || isGenerating}
                  className="h-20 rounded-[24px] bg-primary text-white text-sm font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20"
                >
                  {isGenerating ? "Génération..." : "Télécharger le fichier VCF"}
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setStep('input')}
                  className="h-14 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5"
                >
                  Modifier la liste
                </Button>
              </div>
            </div>
          )}

          {step === 'instructions' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-10 h-10 bg-primary rounded-full animate-pulse" />
                </div>
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Fichier Prêt</h2>
                <p className="text-muted-foreground font-bold text-sm">Suivez les étapes ci-dessous pour importer vos contacts.</p>
              </div>

              <div className="grid gap-4">
                <InstructionBox 
                  platform="iPhone / iOS"
                  steps={[
                    "Ouvrez le fichier téléchargé dans l'app 'Fichiers'",
                    "Appuyez sur 'Partager' puis choisissez l'app 'Contacts'",
                    "Sélectionnez 'Ajouter les contacts'"
                  ]}
                />
                <InstructionBox 
                  platform="Android"
                  steps={[
                    "Ouvrez le fichier .vcf téléchargé",
                    "Choisissez 'Importer dans les contacts'",
                    "Validez la fusion des données"
                  ]}
                />
              </div>

              <Button 
                onClick={() => { setStep('start'); setRawInput(''); }}
                className="h-20 w-full rounded-[24px] bg-white text-black text-xs font-black uppercase tracking-[0.3em]"
              >
                Nouvelle importation
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
            Technologie NeoStud Actif
          </p>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-white/5 rounded-[20px] p-4 text-center border border-white/5">
      <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">{label}</p>
      <p className={cn("text-xl font-black", color)}>{value}</p>
    </div>
  );
}

function InstructionBox({ platform, steps }: { platform: string, steps: string[] }) {
  return (
    <div className="bg-white/5 rounded-[24px] p-6 border border-white/5 space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{platform}</h4>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-[10px] font-black text-white/20 mt-1">{i + 1}.</span>
            <p className="text-xs font-bold text-white/70 leading-relaxed">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
