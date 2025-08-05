// Summarize logs
'use server';

/**
 * @fileOverview A flow to summarize logs for a given time frame and AWS resource.
 *
 * - summarizeLogs - A function that handles the log summarization process.
 * - SummarizeLogsInput - The input type for the summarizeLogs function.
 * - SummarizeLogsOutput - The return type for the summarizeLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLogsInputSchema = z.object({
  timeFrame: z.string().describe('The time frame for the logs to summarize.'),
  awsResource: z.string().describe('The AWS resource to summarize logs for.'),
  logData: z.string().describe('The raw log data to summarize.'),
});
export type SummarizeLogsInput = z.infer<typeof SummarizeLogsInputSchema>;

const SummarizeLogsOutputSchema = z.object({
  summary: z.string().describe('A natural language summary of the logs.'),
});
export type SummarizeLogsOutput = z.infer<typeof SummarizeLogsOutputSchema>;

export async function summarizeLogs(input: SummarizeLogsInput): Promise<SummarizeLogsOutput> {
  return summarizeLogsFlow(input);
}

const summarizeLogsPrompt = ai.definePrompt({
  name: 'summarizeLogsPrompt',
  input: {schema: SummarizeLogsInputSchema},
  output: {schema: SummarizeLogsOutputSchema},
  prompt: `You are an AI assistant helping to summarize logs for AWS resources.

  Summarize the following logs for the given time frame and AWS resource in a concise and easy-to-understand manner.

  Time Frame: {{{timeFrame}}}
  AWS Resource: {{{awsResource}}}
  Logs: {{{logData}}}
  \n  Summary:`,
});

const summarizeLogsFlow = ai.defineFlow(
  {
    name: 'summarizeLogsFlow',
    inputSchema: SummarizeLogsInputSchema,
    outputSchema: SummarizeLogsOutputSchema,
  },
  async input => {
    const {output} = await summarizeLogsPrompt(input);
    return output!;
  }
);
