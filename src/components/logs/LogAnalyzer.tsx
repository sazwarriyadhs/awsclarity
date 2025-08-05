"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleSummarizeLogs } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t.generating}
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          {t.generateSummary}
        </>
      )}
    </Button>
  );
}

export default function LogAnalyzer() {
  const { t } = useLanguage();
  const initialState = { status: "idle" as const };
  const [state, formAction] = useFormState(handleSummarizeLogs, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.aiLogSummary}</CardTitle>
        <CardDescription>{t.aiLogSummaryDesc}</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="timeFrame">{t.timeFrame}</Label>
              <Select name="timeFrame" defaultValue="last_24_hours">
                <SelectTrigger id="timeFrame">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_hour">Last Hour</SelectItem>
                  <SelectItem value="last_24_hours">Last 24 Hours</SelectItem>
                  <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="awsResource">{t.awsResource}</Label>
              <Select name="awsResource" defaultValue="lambda">
                <SelectTrigger id="awsResource">
                  <SelectValue placeholder="Select AWS resource" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ec2">EC2 Instance</SelectItem>
                  <SelectItem value="lambda">Lambda Function</SelectItem>
                  <SelectItem value="api_gateway">API Gateway</SelectItem>
                  <SelectItem value="rds">RDS Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="logData">{t.logData}</Label>
            <Textarea
              id="logData"
              name="logData"
              placeholder={t.logDataPlaceholder}
              rows={10}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>

      {state.status === "error" && (
        <CardFooter>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message || t.summaryError}</AlertDescription>
          </Alert>
        </CardFooter>
      )}

      {state.status === "success" && state.summary && (
        <CardFooter>
          <Card className="w-full bg-muted/50">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Bot className="h-5 w-5" />
                {t.summary}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{state.summary}</p>
            </CardContent>
          </Card>
        </CardFooter>
      )}
    </Card>
  );
}
