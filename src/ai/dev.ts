
import { config } from 'dotenv';
config();

// Enregistrement des flux IA spécifiques à KONEKT
// Seuls les flux liés à la vision institutionnelle sont activés
import '@/ai/flows/generate-member-summary.ts';
