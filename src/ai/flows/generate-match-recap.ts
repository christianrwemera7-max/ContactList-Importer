'use server';
/**
 * @fileOverview A Genkit flow for generating engaging and concise match recaps and highlight reports.
 *
 * - generateMatchRecap - A function that generates a match recap using AI.
 * - GenerateMatchRecapInput - The input type for the generateMatchRecap function.
 * - GenerateMatchRecapOutput - The return type for the generateMatchRecap function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMatchRecapInputSchema = z.object({
  homeTeamName: z.string().describe('The name of the home team.'),
  awayTeamName: z.string().describe('The name of the away team.'),
  homeTeamScore: z.number().describe('The score of the home team.'),
  awayTeamScore: z.number().describe('The score of the away team.'),
  matchPhase: z.string().describe('The current phase of the match (e.g., "Phase de Poules", "Quarts de finale", "Finale").'),
  groupName: z.string().optional().describe('The name of the group if it is a group stage match (e.g., "Groupe A").'),
  scorers: z.array(
    z.object({
      playerName: z.string().describe("The name of the player who scored."),
      teamName: z.string().describe("The name of the team the player belongs to."),
      goals: z.number().describe("The number of goals scored by this player in the match.")
    })
  ).optional().describe('An array of objects detailing the goal scorers for the match.'),
  keyEvents: z.array(z.string()).optional().describe('An array of key events or notable moments from the match.'),
  prizeImplication: z.string().optional().describe('Information about potential prize money implications for the match (e.g., "Winner advances to earn 200$").')
});
export type GenerateMatchRecapInput = z.infer<typeof GenerateMatchRecapInputSchema>;

const GenerateMatchRecapOutputSchema = z.object({
  title: z.string().describe('A concise and engaging title for the match recap.'),
  summary: z.string().describe('A detailed summary of the match, including key moments, team performances, and overall outcome.'),
  highlights: z.array(z.string()).describe('A list of significant highlights or standout performances from the match.')
});
export type GenerateMatchRecapOutput = z.infer<typeof GenerateMatchRecapOutputSchema>;

export async function generateMatchRecap(input: GenerateMatchRecapInput): Promise<GenerateMatchRecapOutput> {
  return generateMatchRecapFlow(input);
}

const matchRecapPrompt = ai.definePrompt({
  name: 'matchRecapPrompt',
  input: { schema: GenerateMatchRecapInputSchema },
  output: { schema: GenerateMatchRecapOutputSchema },
  prompt: `You are a professional sports journalist covering the "ONE CUP LEAGUE INTERSCOLAIRE DE KINSHASA".
Your task is to generate a concise and engaging match recap based on the provided details.
Focus on the intensity, key moments, and implications of the match.

Competition Name: ONE CUP LEAGUE INTERSCOLAIRE DE KINSHASA
Match Phase: {{{matchPhase}}}
{{#if groupName}}
Group: {{{groupName}}}
{{/if}}
Teams: {{{homeTeamName}}} vs {{{awayTeamName}}}
Score: {{{homeTeamName}}} {{homeTeamScore}} - {{awayTeamScore}} {{{awayTeamName}}}

{{#if scorers}}
Goal Scorers:
{{#each scorers}}
- {{{playerName}}} ({{{teamName}}}) : {{goals}} goal(s)
{{/each}}
{{/if}}

{{#if keyEvents}}
Key Moments:
{{#each keyEvents}}
- {{{this}}}
{{/each}}
{{/if}}

{{#if prizeImplication}}
Prize Implications: {{{prizeImplication}}}
{{/if}}

Craft a compelling title, a detailed summary of the match, and a list of key highlights.
`
});

const generateMatchRecapFlow = ai.defineFlow(
  {
    name: 'generateMatchRecapFlow',
    inputSchema: GenerateMatchRecapInputSchema,
    outputSchema: GenerateMatchRecapOutputSchema
  },
  async (input) => {
    const { output } = await matchRecapPrompt(input);
    if (!output) {
      throw new Error('Failed to generate match recap.');
    }
    return output;
  }
);
