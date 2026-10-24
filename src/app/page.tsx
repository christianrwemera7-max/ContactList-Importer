
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
      const timer = setTimeout(() => setStep('intro'), 3500);
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
    link.setAttribute('download', `Contacts_${Date.now()}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setStep('instructions');
      setIsGenerating(false);
    }, 1200);
  };

  if (step === 'splash') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative w-48 h-12 animate-reveal">
           <Image 
             src="https://res.cloudinary.com/c6krili4/image/upload/v1/neostud/logo"
             alt="Logo"
             fill
             className="object-contain grayscale brightness-0"
             priority
           />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/5">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-24">
        
        <header className="mb-16 flex flex-col items-center text-center space-y-4">
          <div className="w-32 h-8 relative grayscale brightness-0 opacity-20">
            <Image 
              src="https://res.cloudinary.com/c6krili4/image/upload/v1/neostud/logo"
              alt="Logo Small"
              fill
              className="object-contain"
            />
          </div>
          {step !== 'intro' && (
            <button 
              onClick={() => { setStep('intro'); setRawInput(''); }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </header>

        <div className="min-h-[400px] flex flex-col">
          {step === 'intro' && (
            <div className="space-y-12 animate-reveal text-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-display font-light tracking-tight text-foreground leading-tight">
                  Gestionnaire <br />
                  <span className="font-bold">Massif de Contacts</span>
                </h1>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                  L'outil studio pour convertir vos listes brutes en fichiers de contacts universels. Rapide, local et sécurisé.
                </p>
              </div>
              <button 
                onClick={() => setStep('input')}
                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 transition-all"
              >
                Commencer l'import
              </button>
            </div>
          )}

          {step === 'input' && (
            <div className="space-y-8 animate-reveal">
              <div className="space-y-4">
                <div className="flex justify-between items-end px-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Données Sources
                  </label>
                  <span className="text-[10px] text-muted-foreground/40 font-medium">Max 1 000 entrées</span>
                </div>
                <textarea 
                  placeholder="Collez vos numéros ici (WhatsApp, Excel, SMS...)"
                  className="w-full min-h-[300px] bg-white border border-border rounded-2xl p-6 text-sm font-medium focus:ring-1 focus:ring-primary/20 focus:border-primary/30 outline-none transition-all resize-none shadow-sm"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                />
              </div>
              <button 
                disabled={!rawInput.trim()}
                onClick={processNumbers}
                className="w-full h-14 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest disabled:opacity-20 transition-all shadow-lg shadow-primary/10"
              >
                Analyser la liste
              </button>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-8 animate-reveal">
              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Valides" value={contacts.length} />
                <StatBox label="Doublons" value={duplicatesCount} />
                <StatBox label="Invalides" value={invalidCount} />
              </div>

              <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                  {contacts.length === 0 ? (
                    <div className="py-20 text-center text-xs font-medium text-muted-foreground italic">Aucun numéro exploitable</div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-muted/50 backdrop-blur-sm border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-16">#</th>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Contact</th>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Mobile</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {contacts.map((num, i) => (
                          <tr key={i} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 text-[10px] font-medium text-muted-foreground/60">{i + 1}</td>
                            <td className="px-4 py-3 text-sm font-semibold">Contact {i + 1}</td>
                            <td className="px-4 py-3 text-sm font-medium text-primary text-right">{num}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={generateVCF}
                  disabled={contacts.length === 0 || isGenerating}
                  className="w-full h-14 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 disabled:opacity-20 transition-all"
                >
                  {isGenerating ? "Traitement..." : "Générer le fichier .vcf"}
                </button>
                <button 
                  onClick={() => setStep('input')}
                  className="w-full h-12 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border hover:bg-muted transition-all"
                >
                  Modifier les données
                </button>
              </div>
            </div>
          )}

          {step === 'instructions' && (
            <div className="space-y-10 animate-reveal">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Prêt pour l'importation</h2>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Votre fichier a été généré. Suivez ces étapes simples pour l'ajouter à votre répertoire.
                </p>
              </div>

              <div className="grid gap-4">
                <InfoSection 
                  title="iOS (iPhone)"
                  items={[
                    "Ouvrez le fichier téléchargé dans l'app Fichiers.",
                    "Appuyez sur 'Partager' puis choisissez 'Contacts'.",
                    "Sélectionnez 'Tout ajouter'."
                  ]}
                />
                <InfoSection 
                  title="Android"
                  items={[
                    "Ouvrez le fichier .vcf téléchargé.",
                    "Choisissez 'Importer' dans la fenêtre qui s'ouvre.",
                    "Sélectionnez votre compte Google ou Téléphone."
                  ]}
                />
              </div>

              <button 
                onClick={() => { setStep('intro'); setRawInput(''); }}
                className="w-full h-14 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Nouvelle importation
              </button>
            </div>
          )}
        </div>

        <footer className="mt-24 pt-8 border-t border-border/50 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
            Studio Efficiency
          </p>
        </footer>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 text-center shadow-sm">
      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">{label}</p>
      <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
    </div>
  );
}

function InfoSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 space-y-4 shadow-sm">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">{title}</h4>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-[10px] font-bold text-muted-foreground/30 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-xs font-medium text-foreground/70 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
