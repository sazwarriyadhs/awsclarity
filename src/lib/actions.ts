"use server";

import { z } from "zod";
import { summarizeLogs } from "@/ai/flows/summarize-logs";
import { getCostData, GetCostDataOutput } from "@/ai/flows/get-cost-data";

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
