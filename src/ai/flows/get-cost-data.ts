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
  name: z.string(), // Represents the time unit (e.g., 'Mon', 'Jan')
  EC2: z.number(),
  Lambda: z.number(),
  RDS: z.number(),
  S3: z.number(),
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
    // In a real application, this would call the AWS Cost Explorer API and aggregate by service.
    // Here, we're returning mock data.
    const generateServiceCosts = (base: number) => ({
        EC2: Math.floor(Math.random() * (base * 0.4)) + (base * 0.2),
        Lambda: Math.floor(Math.random() * (base * 0.15)) + (base * 0.05),
        RDS: Math.floor(Math.random() * (base * 0.25)) + (base * 0.1),
        S3: Math.floor(Math.random() * (base * 0.1)) + (base * 0.02),
    });

    if (timePeriod === 'daily') {
      return [
        { name: 'Mon', ...generateServiceCosts(50) },
        { name: 'Tue', ...generateServiceCosts(55) },
        { name: 'Wed', ...generateServiceCosts(52) },
        { name: 'Thu', ...generateServiceCosts(65) },
        { name: 'Fri', ...generateServiceCosts(60) },
        { name: 'Sat', ...generateServiceCosts(35) },
        { name: 'Sun', ...generateServiceCosts(30) },
      ];
    } else {
       return [
        { name: 'Jan', ...generateServiceCosts(1200) },
        { name: 'Feb', ...generateServiceCosts(1100) },
        { name: 'Mar', ...generateServiceCosts(1350) },
        { name: 'Apr', ...generateServiceCosts(1400) },
        { name: 'May', ...generateServiceCosts(1600) },
        { name: 'Jun', ...generateServiceCosts(1550) },
      ];
    }
  }
);
