'use server';
/**
 * @fileOverview A flow to get migration status data.
 *
 * - getMigrationStatus - A function that handles fetching migration status data.
 * - GetMigrationStatusOutput - The return type for the getMigrationStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { subDays, format } from 'date-fns';

const MigrationStatusSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['Schema', 'Infrastructure', 'Data']),
  status: z.enum(['Completed', 'Failed', 'In Progress', 'Pending']),
  submittedAt: z.string(),
  completedAt: z.string().optional(),
});

const GetMigrationStatusOutputSchema = z.array(MigrationStatusSchema);
export type GetMigrationStatusOutput = z.infer<typeof GetMigrationStatusOutputSchema>;

export async function getMigrationStatus(): Promise<GetMigrationStatusOutput> {
  return getMigrationStatusFlow();
}

const getMigrationStatusFlow = ai.defineFlow(
  {
    name: 'getMigrationStatusFlow',
    outputSchema: GetMigrationStatusOutputSchema,
  },
  async () => {
    // In a real application, this would call a service that tracks database/infra migrations.
    // Here, we're returning mock data.
    const now = new Date();
    return [
      {
        id: 'MIG-001',
        description: 'Update users table to include new `last_login_ip` column.',
        type: 'Schema',
        status: 'Completed',
        submittedAt: format(subDays(now, 1), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        completedAt: format(subDays(now, 1), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      },
      {
        id: 'MIG-002',
        description: 'Terraform: Increase RDS instance size to db.m5.large.',
        type: 'Infrastructure',
        status: 'Completed',
        submittedAt: format(subDays(now, 2), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        completedAt: format(subDays(now, 2), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      },
      {
        id: 'MIG-003',
        description: 'Seed new `feature_flags` table with initial values.',
        type: 'Data',
        status: 'In Progress',
        submittedAt: format(now, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      },
       {
        id: 'MIG-004',
        description: 'CDK: Add new SQS queue for background processing.',
        type: 'Infrastructure',
        status: 'Failed',
        submittedAt: format(subDays(now, 3), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        completedAt: format(subDays(now, 3), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      },
       {
        id: 'MIG-005',
        description: 'Alter `orders` table to add foreign key to `customers`.',
        type: 'Schema',
        status: 'Pending',
        submittedAt: format(subDays(now, 4), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      },
    ].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }
);
