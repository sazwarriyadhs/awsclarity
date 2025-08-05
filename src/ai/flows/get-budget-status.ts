'use server';
/**
 * @fileOverview A flow to get budget status data.
 *
 * - getBudgetStatus - A function that handles fetching budget status data.
 * - GetBudgetStatusOutput - The return type for the getBudgetStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetBudgetStatusOutputSchema = z.object({
    budgetName: z.string(),
    limit: z.number(),
    currentSpend: z.number(),
    forecastedSpend: z.number(),
});
export type GetBudgetStatusOutput = z.infer<typeof GetBudgetStatusOutputSchema>;

export async function getBudgetStatus(): Promise<GetBudgetStatusOutput> {
  return getBudgetStatusFlow();
}

const getBudgetStatusFlow = ai.defineFlow(
  {
    name: 'getBudgetStatusFlow',
    outputSchema: GetBudgetStatusOutputSchema,
  },
  async () => {
    // In a real application, this would call the AWS Budgets API.
    // Here, we're returning mock data.
    const limit = 2000;
    const currentSpend = Math.floor(Math.random() * (limit * 0.9)) + (limit * 0.1);
    const forecastedSpend = currentSpend * 1.25;

    return {
      budgetName: 'Monthly Cloud Spend',
      limit,
      currentSpend,
      forecastedSpend,
    };
  }
);
