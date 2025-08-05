'use server';
/**
 * @fileOverview A flow to get cost data.
 *
 * - getCostData - A function that handles fetching cost data.
 * - GetCostDataInput - The input type for the getCostData function.
 * - GetCostDataOutput - The return type for the getCostData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetCostDataInputSchema = z.object({
  timePeriod: z.enum(['daily', 'monthly']).describe('The time period for the cost data.'),
});
export type GetCostDataInput = z.infer<typeof GetCostDataInputSchema>;

const CostDataItemSchema = z.object({
  name: z.string(),
  cost: z.number(),
});

const GetCostDataOutputSchema = z.array(CostDataItemSchema);
export type GetCostDataOutput = z.infer<typeof GetCostDataOutputSchema>;

export async function getCostData(input: GetCostDataInput): Promise<GetCostDataOutput> {
  return getCostDataFlow(input);
}

const getCostDataFlow = ai.defineFlow(
  {
    name: 'getCostDataFlow',
    inputSchema: GetCostDataInputSchema,
    outputSchema: GetCostDataOutputSchema,
  },
  async ({ timePeriod }) => {
    // In a real application, this would call the AWS Cost Explorer API.
    // Here, we're returning mock data.
    if (timePeriod === 'daily') {
      return [
        { name: 'Mon', cost: Math.floor(Math.random() * 20) + 40 },
        { name: 'Tue', cost: Math.floor(Math.random() * 20) + 45 },
        { name: 'Wed', cost: Math.floor(Math.random() * 20) + 42 },
        { name: 'Thu', cost: Math.floor(Math.random() * 20) + 55 },
        { name: 'Fri', cost: Math.floor(Math.random() * 20) + 50 },
        { name: 'Sat', cost: Math.floor(Math.random() * 20) + 25 },
        { name: 'Sun', cost: Math.floor(Math.random() * 20) + 20 },
      ];
    } else {
      return [
        { name: 'Jan', cost: Math.floor(Math.random() * 400) + 1100 },
        { name: 'Feb', cost: Math.floor(Math.random() * 400) + 1000 },
        { name: 'Mar', cost: Math.floor(Math.random() * 400) + 1250 },
        { name: 'Apr', cost: Math.floor(Math.random() * 400) + 1300 },
        { name: 'May', cost: Math.floor(Math.random() * 400) + 1500 },
        { name: 'Jun', cost: Math.floor(Math.random() * 400) + 1450 },
      ];
    }
  }
);
