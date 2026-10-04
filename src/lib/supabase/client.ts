import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Utilisation de valeurs de secours au format valide pour éviter le crash au démarrage si les clés sont absentes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    'Supabase: Les variables d\'environnement sont manquantes. L\'application utilise des valeurs de secours.'
  );
}

// Initialisation du client Supabase
// Le client ne plantera plus lors de l'évaluation du code car l'URL aura toujours un format valide (http/https)
export const supabase = createClient<Database>(
  supabaseUrl,
  supabasePublishableKey
);
