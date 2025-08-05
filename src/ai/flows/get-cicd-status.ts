'use server';
/**
 * @fileOverview A flow to get CI/CD pipeline status data.
 *
 * - getCiCdStatus - A function that handles fetching pipeline status data.
 * - GetCiCdStatusOutput - The return type for the getCiCdStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PipelineStatusSchema = z.object({
  name: z.string(),
  status: z.enum(['Success', 'Failed', 'In Progress']),
  lastRun: z.string(),
});

const GetCiCdStatusOutputSchema = z.array(PipelineStatusSchema);
export type GetCiCdStatusOutput = z.infer<typeof GetCiCdStatusOutputSchema>;

export async function getCiCdStatus(): Promise<GetCiCdStatusOutput> {
  return getCiCdStatusFlow();
}

const getCiCdStatusFlow = ai.defineFlow(
  {
    name: 'getCiCdStatusFlow',
    outputSchema: GetCiCdStatusOutputSchema,
  },
  async () => {
    // In a real application, this would call the AWS CodePipeline API.
    // Here, we're returning mock data with some randomness.
    const statuses: Array<'Success' | 'Failed' | 'In Progress'> = ['Success', 'Failed', 'In Progress'];
    const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];
    const getRandomDuration = (max: number) => Math.floor(Math.random() * max) + 1;

    return [
      { name: 'frontend-deploy', status: getRandomStatus(), lastRun: `${getRandomDuration(5)}h ago` },
      { name: 'backend-deploy', status: 'Success', lastRun: `${getRandomDuration(8)}h ago` },
      { name: 'infra-staging', status: 'In Progress', lastRun: `${getRandomDuration(10)}m ago` },
      { name: 'e2e-tests', status: 'Failed', lastRun: '1d ago' },
      { name: 'security-scan', status: getRandomStatus(), lastRun: `${getRandomDuration(24)}h ago` },
    ];
  }
);
