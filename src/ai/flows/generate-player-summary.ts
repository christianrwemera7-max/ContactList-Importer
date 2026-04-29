'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate an AI summary of a football player's performance.
 *
 * - generatePlayerSummary - A function that generates a performance summary for a given player.
 * - AiPlayerPerformanceSummaryInput - The input type for the generatePlayerSummary function.
 * - AiPlayerPerformanceSummaryOutput - The return type for the generatePlayerSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the player performance summary
const AiPlayerPerformanceSummaryInputSchema = z.object({
  playerName: z.string().describe("The full name of the player."),
  teamName: z.string().describe("The name of the player's team."),
  position: z.string().describe("The player's primary position (e.g., Attaquant, Milieu, Gardien)."),
  matchesPlayed: z.number().int().min(0).describe("The total number of matches played by the player."),
  goals: z.number().int().min(0).describe("The total number of goals scored by the player."),
  assists: z.number().int().min(0).describe("The total number of assists made by the player."),
  yellowCards: z.number().int().min(0).describe("The total number of yellow cards received by the player."),
  redCards: z.number().int().min(0).describe("The total number of red cards received by the player."),
  interceptions: z.number().int().min(0).optional().describe("The total number of interceptions made by the player (optional)."),
  rating: z.number().min(0).max(10).describe("The player's overall rating out of 10."),
  badges: z.array(z.string()).optional().describe("A list of special badges or achievements earned by the player."),
  potentialPrize: z.string().optional().describe("Description of any potential individual prize the player is currently contending for."),
  currentTournamentPhase: z.string().describe("The current phase of the tournament (e.g., 'Phase de poules', 'Quarts de finale', 'Finale')."),
});

export type AiPlayerPerformanceSummaryInput = z.infer<typeof AiPlayerPerformanceSummaryInputSchema>;

// Define the output schema for the player performance summary
const AiPlayerPerformanceSummaryOutputSchema = z.object({
  summary: z.string().describe("A concise and engaging summary of the player's performance in the tournament."),
  keyHighlights: z.array(z.string()).describe("A list of 3-5 bullet points highlighting the player's most significant contributions and statistics."),
  overallRatingComment: z.string().describe("A brief analytical comment on the player's overall rating and its implications for their tournament performance."),
});

export type AiPlayerPerformanceSummaryOutput = z.infer<typeof AiPlayerPerformanceSummaryOutputSchema>;

// Define the Genkit prompt for generating the player summary
const generatePlayerSummaryPrompt = ai.definePrompt({
  name: 'generatePlayerSummaryPrompt',
  input: { schema: AiPlayerPerformanceSummaryInputSchema },
  output: { schema: AiPlayerPerformanceSummaryOutputSchema },
  prompt: `You are an expert football analyst. Your task is to generate a concise and engaging summary of a football player's performance in the ONE CUP LEAGUE INTERSCOLAIRE DE KINSHASA tournament. Focus on their key statistics, impact on their team, and any potential individual awards.\n\nPlayer Name: {{{playerName}}}\nTeam: {{{teamName}}}\nPosition: {{{position}}}\nMatches Played: {{{matchesPlayed}}}\nGoals: {{{goals}}}\nAssists: {{{assists}}}\nYellow Cards: {{{yellowCards}}}\nRed Cards: {{{redCards}}}\n{{#if interceptions}}Interceptions: {{{interceptions}}}\n{{/if}}Rating: {{{rating}}} / 10\n{{#if badges}}Badges: {{#each badges}}'{{{this}}}'{{#unless @last}}, {{/unless}}{{/each}}\n{{/if}}{{#if potentialPrize}}Potential Prize: {{{potentialPrize}}}\n{{/if}}Current Tournament Phase: {{{currentTournamentPhase}}}\n\nGenerate a summary, key highlights (3-5 points), and an overall rating comment based on the data above.`,
});

// Define the Genkit flow to orchestrate the player summary generation
const generatePlayerSummaryFlow = ai.defineFlow(
  {
    name: 'generatePlayerSummaryFlow',
    inputSchema: AiPlayerPerformanceSummaryInputSchema,
    outputSchema: AiPlayerPerformanceSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await generatePlayerSummaryPrompt(input);
    if (!output) {
      throw new Error('Failed to generate player summary: No output from prompt.');
    }
    return output;
  }
);

/**
 * Generates an AI-powered summary of a football player's performance in the tournament.
 * @param input - The player's performance data.
 * @returns A promise that resolves to the AI-generated player summary.
 */
export async function generatePlayerSummary(input: AiPlayerPerformanceSummaryInput): Promise<AiPlayerPerformanceSummaryOutput> {
  return generatePlayerSummaryFlow(input);
}
