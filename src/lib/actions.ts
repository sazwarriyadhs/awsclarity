"use server";

import { z } from "zod";
import { summarizeLogs } from "@/ai/flows/summarize-logs";

const formSchema = z.object({
  timeFrame: z.string(),
  awsResource: z.string(),
  logData: z.string().min(10, "Log data must be at least 10 characters."),
});

type State = {
  status: "success" | "error" | "idle";
  message?: string;
  summary?: string;
};

export async function handleSummarizeLogs(
  prevState: State,
  formData: FormData
): Promise<State> {
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
