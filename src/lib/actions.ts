"use server";

import { z } from "zod";
import { summarizeLogs } from "@/ai/flows/summarize-logs";
import { getCostData, GetCostDataOutput } from "@/ai/flows/get-cost-data";
import { getCiCdStatus, GetCiCdStatusOutput } from "@/ai/flows/get-cicd-status";
import { getBudgetStatus, GetBudgetStatusOutput } from "@/ai/flows/get-budget-status";
import { getMigrationStatus, GetMigrationStatusOutput } from "@/ai/flows/get-migration-status";

const formSchema = z.object({
  timeFrame: z.string(),
  awsResource: z.string(),
  logData: z.string().min(10, "Log data must be at least 10 characters."),
});

type SummarizeState = {
  status: "success" | "error" | "idle";
  message?: string;
  summary?: string;
};

export async function handleSummarizeLogs(
  prevState: SummarizeState,
  formData: FormData
): Promise<SummarizeState> {
  const validatedFields = formSchema.safeParse({
    timeFrame: formData.get("timeFrame"),
    awsResource: formData.get("awsResource"),
    logData: formData.get("logData"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid form data.",
    };
  }

  try {
    const result = await summarizeLogs(validatedFields.data);
    return { status: "success", summary: result.summary };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to generate summary." };
  }
}

type CostDataState = {
    status: "success" | "error";
    message?: string;
    data?: GetCostDataOutput;
}

export async function handleGetCostData(
    timePeriod: 'daily' | 'monthly'
): Promise<CostDataState> {
    try {
        const result = await getCostData({ timePeriod });
        return { status: "success", data: result };
    } catch (error) {
        console.error(error);
        return { status: "error", message: "Failed to fetch cost data." };
    }
}

type CiCdStatusState = {
    status: "success" | "error";
    message?: string;
    data?: GetCiCdStatusOutput;
}

export async function handleGetCiCdStatus(): Promise<CiCdStatusState> {
    try {
        const result = await getCiCdStatus();
        return { status: "success", data: result };
    } catch (error) {
        console.error(error);
        return { status: "error", message: "Failed to fetch CI/CD status." };
    }
}

type BudgetStatusState = {
    status: "success" | "error";
    message?: string;
    data?: GetBudgetStatusOutput;
};

export async function handleGetBudgetStatus(): Promise<BudgetStatusState> {
    try {
        const result = await getBudgetStatus();
        return { status: "success", data: result };
    } catch (error) {
        console.error(error);
        return { status: "error", message: "Failed to fetch budget status." };
    }
}

type MigrationStatusState = {
    status: "success" | "error";
    message?: string;
    data?: GetMigrationStatusOutput;
};

export async function handleGetMigrationStatus(): Promise<MigrationStatusState> {
    try {
        const result = await getMigrationStatus();
        return { status: "success", data: result };
    } catch (error) {
        console.error(error);
        return { status: "error", message: "Failed to fetch migration status." };
    }
}
