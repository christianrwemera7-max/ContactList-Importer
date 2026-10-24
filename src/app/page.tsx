
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type AppStep = 'splash' | 'intro' | 'input' | 'preview' | 'instructions';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

export default function ContactImporterPage() {
  const [step, setStep] = useState<AppStep>('splash');
  const [rawInput, setRawInput] = useState('');
  const [globalPrefix, setGlobalPrefix] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [duplicatesCount, setDuplicatesCount] = useState(0);
  const [invalidCount, setInvalidCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('intro'), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const processInput = () => {
    const lines = rawInput.split(/[\n\r]+/);
    const valid: Contact[] = [];
    const seenPhones = new Set<string>();
    let dups = 0;
    let inv = 0;

    lines.forEach(line => {
      const cleanLine = line.trim();
      if (!cleanLine) return;

      const parts = cleanLine.split(/[\t\-\,;]+/).map(p => p.trim()).filter(p => p.length > 0);
      
      let phone = "";
      let name = "";

      if (parts.length >= 2) {
        const digitRatios = parts.map(p => {
          const digits = p.replace(/\D/g, "").length;
          return digits / p.length;
        });
        
        const maxRatioIndex = digitRatios.indexOf(Math.max(...digitRatios));
        phone = parts[maxRatioIndex];
        
        const remainingParts = [...parts];
        remainingParts.splice(maxRatioIndex, 1);
        name = remainingParts.join(" ");
      } else {
        const digits = cleanLine.replace(/\D/g, "");
        if (digits.length >= 5) {
          phone = cleanLine;
        } else {
          inv++;
          return;
        }
      }

      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 3) {
        inv++;
        return;
      }

      if (seenPhones.has(phone)) {
        dups++;
      } else {
        seenPhones.add(phone);
        if (valid.length < 1000) {
          valid.push({
            id: valid.length + 1,
            name: name,
            phone: phone
          });
        }
      }
    });

    setContacts(valid);
    setDuplicatesCount(dups);
    setInvalidCount(inv);
    setStep('preview');
  };

  const updateContactName = (id: number, newName: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, name: newName } : c));
  };

  const generateVCF = () => {
    setIsGenerating(true);
    
    let vcfContent = "";
    contacts.forEach((contact, index) => {
      const baseName = contact.name.trim() || `Contact ${index + 1}`;
      const finalName = globalPrefix.trim() 
        ? `${globalPrefix.trim()} ${baseName}` 
        : baseName;
        
      vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:${finalName}\nTEL;TYPE=CELL:${contact.phone}\nEND:VCARD\n`;
    });

    const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${globalPrefix.trim() || 'Contacts'}_${Date.now()}.vcf`);
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
        <div className="relative w-32 h-12 animate-reveal">
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/10">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-24">
        
        <header className="mb-16 flex flex-col items-center text-center space-y-6">
          <div className="w-24 h-6 relative grayscale brightness-0 opacity-10">
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
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors"
            >
              Retour au début
            </button>
          )}
        </header>

        <div className="min-h-[450px] flex flex-col">
          {step === 'intro' && (
            <div className="space-y-12 animate-reveal text-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-display font-light tracking-tight leading-tight">
                  ContactList <br />
                  <span className="font-bold">Importer</span>
                </h1>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Importation massive avec gestion des pseudonymes et référencement groupé.
                </p>
              </div>
              <button 
                onClick={() => setStep('input')}
                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Commencer
              </button>
            </div>
          )}

          {step === 'input' && (
            <div className="space-y-8 animate-reveal">
              <div className="space-y-6">
                <div className="space-y-2 px-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Référence de la liste (Préfixe)
                  </label>
                  <input 
                    type="text"
                    placeholder="Ex: CLIENTS, EVENT_2024, etc."
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-semibold focus:ring-2 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
                    value={globalPrefix}
                    onChange={(e) => setGlobalPrefix(e.target.value)}
                  />
                  <p className="text-[9px] text-slate-400 italic">Sera ajouté devant chaque nom (ex: {globalPrefix || 'REF'} Jean)</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end px-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Données brutes
                    </label>
                    <span className="text-[10px] text-slate-300 font-medium italic">Nom - Numéro ou colonnes Excel</span>
                  </div>
                  <textarea 
                    placeholder="Collez ici :&#10;Jean Dupont - +33612345678&#10;Marie Durant, 0789456123&#10;+243812345678"
                    className="w-full min-h-[250px] bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm font-medium focus:ring-2 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all resize-none"
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                  />
                </div>
              </div>
              <button 
                disabled={!rawInput.trim()}
                onClick={processInput}
                className="w-full h-14 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest disabled:opacity-20 transition-all shadow-lg shadow-primary/20"
              >
                Analyser les données
              </button>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-8 animate-reveal">
              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Contacts" value={contacts.length} />
                <StatBox label="Doublons" value={duplicatesCount} />
                <StatBox label="Invalides" value={invalidCount} />
              </div>

              <div className="space-y-3">
                <div className="px-2">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Aperçu du format final</p>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="max-h-[350px] overflow-y-auto no-scrollbar">
                    {contacts.length === 0 ? (
                      <div className="py-20 text-center text-xs font-medium text-slate-400 italic">Aucune donnée exploitable trouvée</div>
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-md border-b border-slate-100">
                          <tr>
                            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 w-12">#</th>
                            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Nom final (Modifiable)</th>
                            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Téléphone</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {contacts.map((c, i) => (
                            <tr key={c.id} className="group hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 text-[10px] font-medium text-slate-300">{i + 1}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                  {globalPrefix && (
                                    <span className="text-[10px] font-black text-primary bg-primary/5 px-1.5 py-0.5 rounded">{globalPrefix}</span>
                                  )}
                                  <input 
                                    type="text"
                                    value={c.name}
                                    placeholder={`Contact ${i + 1}`}
                                    onChange={(e) => updateContactName(c.id, e.target.value)}
                                    className="flex-1 bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 placeholder:text-slate-300 placeholder:font-normal"
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-slate-400 text-right tabular-nums">{c.phone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={generateVCF}
                  disabled={contacts.length === 0 || isGenerating}
                  className="w-full h-14 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-20 transition-all"
                >
                  {isGenerating ? "Génération..." : "Télécharger mon fichier VCF"}
                </button>
                <button 
                  onClick={() => setStep('input')}
                  className="w-full h-12 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100 hover:bg-slate-50 transition-all"
                >
                  Modifier la liste brute
                </button>
              </div>
            </div>
          )}

          {step === 'instructions' && (
            <div className="space-y-10 animate-reveal">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <h2 className="text-2xl font-display font-bold">Fichier généré</h2>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                  Votre carnet d'adresses avec référentiel est prêt.
                </p>
              </div>

              <div className="grid gap-4">
                <InfoSection 
                  title="iPhone (iOS)"
                  items={[
                    "Ouvrez le fichier téléchargé depuis l'app Fichiers.",
                    "Appuyez sur le bouton Partager en haut à droite.",
                    "Choisissez 'Contacts' dans la liste des apps.",
                    "Appuyez sur 'Tout ajouter' pour confirmer."
                  ]}
                />
                <InfoSection 
                  title="Android"
                  items={[
                    "Ouvrez le fichier .vcf téléchargé directement.",
                    "Sélectionnez 'Importer' dans la fenêtre surgissante.",
                    "Choisissez d'enregistrer vers 'Compte Google' ou 'Téléphone'."
                  ]}
                />
              </div>

              <button 
                onClick={() => { setStep('intro'); setRawInput(''); setGlobalPrefix(''); }}
                className="w-full h-14 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Nouvel import
              </button>
            </div>
          )}
        </div>

        <footer className="mt-24 pt-8 border-t border-slate-50 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-200">
            Studio Efficiency
          </p>
        </footer>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}

function InfoSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">{title}</h4>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-[10px] font-bold text-slate-200 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
