
'use server';
/**
 * @fileOverview Flux Genkit pour générer une synthèse professionnelle KONEKT ID.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MemberSummaryInputSchema = z.object({
  name: z.string(),
  profession: z.string(),
  skills: z.array(z.string()),
  objectives: z.array(z.string()),
  konektScore: z.number(),
  tier: z.enum(['START', 'PLUS', 'PRO']),
});

const MemberSummaryOutputSchema = z.object({
  bio: z.string().describe('Une bio professionnelle percutante pour le réseau KONEKT.'),
  recommendation: z.string().describe('Conseil IA pour booster le score d\'activation.'),
  matchingKeywords: z.array(z.string()).describe('Mots-clés pour le moteur KONEKT MATCH.'),
});

export async function generateMemberSummary(input: z.infer<typeof MemberSummaryInputSchema>) {
  return generateMemberSummaryFlow(input);
}

const summaryPrompt = ai.definePrompt({
  name: 'memberSummaryPrompt',
  input: { schema: MemberSummaryInputSchema },
  output: { schema: MemberSummaryOutputSchema },
  prompt: `Tu es l'expert en networking de KONEKT. 
Analyse le profil de {{{name}}}, {{{profession}}} au niveau {{{tier}}}.
Ses compétences : {{#each skills}}{{{this}}}, {{/each}}.
Ses objectifs : {{#each objectives}}{{{this}}}, {{/each}}.
Score KONEKT : {{{konektScore}}}.

Génère une bio qui met en avant sa valeur pour la communauté, un conseil pour atteindre le palier suivant de leadership, et 5 mots-clés de matchmaking.
`
});

const generateMemberSummaryFlow = ai.defineFlow(
  {
    name: 'generateMemberSummaryFlow',
    inputSchema: MemberSummaryInputSchema,
    outputSchema: MemberSummaryOutputSchema
  },
  async (input) => {
    const { output } = await summaryPrompt(input);
    if (!output) throw new Error('Échec génération synthèse.');
    return output;
  }
);
