import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-logs.ts';
import '@/ai/flows/get-cost-data.ts';
import '@/ai/flows/get-cicd-status.ts';
