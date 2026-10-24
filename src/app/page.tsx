
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AppStep = 'splash' | 'intro' | 'input' | 'preview' | 'instructions';

export default function ContactImporterPage() {
  const [step, setStep] = useState<AppStep>('splash');
  const [rawInput, setRawInput] = useState('');
  const [contacts, setContacts] = useState<string[]>([]);
  const [duplicatesCount, setDuplicatesCount] = useState(0);
  const [invalidCount, setInvalidCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('intro'), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const processNumbers = () => {
    const lines = rawInput.split(/[\n\r\s,;]+/);
    const seen = new Set<string>();
    const valid: string[] = [];
    let dups = 0;
    let inv = 0;

    lines.forEach(line => {
      const clean = line.trim();
      if (!clean) return;

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
      vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:Contact ${index + 1}\nTEL;TYPE=CELL:${num}\nEND:VCARD\n`;
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
      <div className="min-h-screen bg-[#05030A] flex items-center justify-center p-8">
        <div className="text-center animate-fade-in">
           <span className="text-4xl font-black text-white lowercase tracking-tighter italic">neostud</span>
           <div className="w-8 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05030A] text-foreground font-sans selection:bg-primary/30 no-scrollbar overflow-x-hidden">
      <main className="max-w-xl mx-auto min-h-screen flex flex-col p-6 md:p-12">
        
        <header className="mb-12 flex justify-between items-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
            Active Protocol
          </span>
          {step !== 'intro' && (
            <button 
              onClick={() => { setStep('intro'); setRawInput(''); }}
              className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Reset
            </button>
          )}
        </header>

        <div className="flex-1 flex flex-col justify-center">
          {step === 'intro' && (
            <div className="space-y-16 animate-slide-up">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] italic">
                  Import<br /><span className="text-primary">Massif.</span>
                </h2>
                <p className="text-muted-foreground font-bold text-sm leading-relaxed max-w-[280px]">
                  Convertissez instantanément vos listes en fichiers de contacts .VCF sécurisés.
                </p>
              </div>
              <button 
                onClick={() => setStep('input')}
                className="h-28 w-full rounded-[40px] bg-primary text-white text-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform"
              >
                Explorer
              </button>
            </div>
          )}

          {step === 'input' && (
            <div className="space-y-10 animate-fade-in">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-4">
                  Source de données
                </label>
                <textarea 
                  placeholder="Collez ici vos numéros (WhatsApp, Excel, SMS...)"
                  className="w-full min-h-[400px] bg-white/5 border-none rounded-[48px] p-10 text-xl font-bold placeholder:opacity-5 focus:ring-1 focus:ring-primary/40 no-scrollbar resize-none outline-none"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-6">
                <button 
                  disabled={!rawInput.trim()}
                  onClick={processNumbers}
                  className="h-24 rounded-[32px] bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-[0.3em] disabled:opacity-20"
                >
                  Analyser
                </button>
                <p className="text-center text-[9px] text-white/20 font-black uppercase tracking-[0.5em]">
                  Limite : 1 000 contacts / session
                </p>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-10 animate-fade-in">
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Valides" value={contacts.length} color="text-primary" />
                <StatCard label="Doublons" value={duplicatesCount} color="text-white/20" />
                <StatCard label="Erreurs" value={invalidCount} color="text-white/20" />
              </div>

              <div className="bg-white/5 rounded-[48px] p-8 max-h-[350px] overflow-y-auto no-scrollbar border border-white/5">
                <div className="space-y-6">
                  {contacts.length === 0 ? (
                    <p className="text-center text-xs font-bold text-white/20 uppercase tracking-widest py-10">Aucune donnée exploitable</p>
                  ) : (
                    contacts.map((num, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
                        <span className="text-[10px] font-black text-white/10 uppercase tracking-tighter w-8">
                          {String(i + 1).padStart(3, '0')}
                        </span>
                        <span className="flex-1 text-sm font-bold text-white/80">Contact {i + 1}</span>
                        <span className="text-sm font-bold text-primary tracking-tighter">{num}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={generateVCF}
                  disabled={contacts.length === 0 || isGenerating}
                  className="h-24 rounded-[32px] bg-primary text-white text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 disabled:opacity-20"
                >
                  {isGenerating ? "Génération..." : "Générer le fichier"}
                </button>
                <button 
                  onClick={() => setStep('input')}
                  className="h-14 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-white/20 border border-white/5"
                >
                  Modifier la source
                </button>
              </div>
            </div>
          )}

          {step === 'instructions' && (
            <div className="space-y-12 animate-slide-up">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full animate-pulse" />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Prêt.</h2>
                <p className="text-muted-foreground font-bold text-sm max-w-[250px] mx-auto leading-relaxed">
                  Le fichier est dans vos téléchargements. Suivez les étapes d'importation.
                </p>
              </div>

              <div className="grid gap-6">
                <InstructionBox 
                  platform="iPhone / iOS"
                  steps={[
                    "Ouvrez le fichier téléchargé",
                    "Partagez vers l'application Contacts",
                    "Validez l'ajout des contacts"
                  ]}
                />
                <InstructionBox 
                  platform="Android"
                  steps={[
                    "Ouvrez le fichier .vcf",
                    "Choisissez 'Importer'",
                    "Sélectionnez le compte de stockage"
                  ]}
                />
              </div>

              <button 
                onClick={() => { setStep('intro'); setRawInput(''); }}
                className="h-20 w-full rounded-[24px] bg-white text-black text-xs font-black uppercase tracking-[0.3em]"
              >
                Nouvelle session
              </button>
            </div>
          )}
        </div>

        <footer className="mt-20 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/5">
            Technology Systems
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
