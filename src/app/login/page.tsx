
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { useKonekt } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useKonekt(); // In a real app, this would be a real login function

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation d'une connexion
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-6 connected-nodes">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="flex flex-col items-center text-center space-y-4 mb-8">
          <Link href="/" className="group flex flex-col items-center">
            <div className="w-16 h-16 k-hex-clip bg-primary flex items-center justify-center font-display font-bold text-white text-3xl shadow-xl shadow-primary/20 mb-4 group-hover:scale-105 transition-transform">K</div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tighter">Se connecter à KONEKT</h1>
            <p className="text-muted-2 text-sm mt-1">Accédez à votre ID numérique et à votre cellule.</p>
          </Link>
        </header>

        <main className="glass-card p-8 rounded-[2.5rem] border-white/5 space-y-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest px-1 font-bold">Email KONEKT</p>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="votre@email.com" 
                className="bg-surface-2 border-white/5 h-12 rounded-2xl text-white" 
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest font-bold">Mot de passe</p>
                <button type="button" className="text-[9px] text-primary font-bold uppercase tracking-wider hover:underline">Oublié ?</button>
              </div>
              <div className="relative">
                <Input 
                  type={showPwd ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="bg-surface-2 border-white/5 h-12 rounded-2xl pr-10 text-white" 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPwd(!showPwd)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-white transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Accéder à l'espace"}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-2">
              Pas encore membre ?{' '}
              <Link href="/join" className="text-primary font-bold hover:underline">Créer mon KONEKT ID</Link>
            </p>
          </div>
        </main>

        <Button asChild variant="ghost" className="w-full text-muted-2 hover:text-white mt-4">
          <Link href="/">
            <ChevronLeft className="mr-2 w-4 h-4" /> Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}
