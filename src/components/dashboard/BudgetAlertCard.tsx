
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { handleGetBudgetStatus } from '@/lib/actions';
import type { GetBudgetStatusOutput } from '@/ai/flows/get-budget-status';
import { cn } from '@/lib/utils';
import { AlertTriangle, TrendingUp, Target, Coins } from 'lucide-react';

export default function BudgetAlertCard() {
  const { t, language } = useLanguage();
  const [budget, setBudget] = useState<GetBudgetStatusOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await handleGetBudgetStatus();
      if (result.status === 'success' && result.data) {
        setBudget(result.data);
      } else {
        console.error(result.message);
        setBudget(null);
      }
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language, { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  if (isPending) {
    return <Skeleton className="h-[250px] w-full" />;
  }

  if (!budget) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.budgetAlerts}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t.budgetError}</p>
        </CardContent>
      </Card>
    );
  }

  const spendPercentage = (budget.currentSpend / budget.limit) * 100;
  const forecastExceedsLimit = budget.forecastedSpend > budget.limit;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">{t.budgetAlerts}</CardTitle>
        <CardDescription>{budget.budgetName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>{t.currentSpend}</span>
            <span>{formatCurrency(budget.limit)}</span>
          </div>
          <Progress value={spendPercentage} />
          <p className="mt-1 text-right text-sm text-muted-foreground">{formatCurrency(budget.currentSpend)} ({spendPercentage.toFixed(1)}%)</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 rounded-md bg-muted/50 p-3">
             <Target className="h-5 w-5 text-muted-foreground" />
             <div>
                <p className="text-muted-foreground">{t.budgetLimit}</p>
                <p className="font-bold">{formatCurrency(budget.limit)}</p>
             </div>
          </div>
           <div className="flex items-center gap-2 rounded-md bg-muted/50 p-3">
             <TrendingUp className="h-5 w-5 text-muted-foreground" />
             <div>
                <p className="text-muted-foreground">{t.forecastedSpend}</p>
                <p className={cn("font-bold", forecastExceedsLimit && "text-destructive")}>{formatCurrency(budget.forecastedSpend)}</p>
             </div>
          </div>
        </div>

        {forecastExceedsLimit && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{t.forecastWarning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
