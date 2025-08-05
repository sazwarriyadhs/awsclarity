"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GetCostDataOutput } from '@/ai/flows/get-cost-data';
import { handleGetCostData } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function CostTrackerCard() {
  const { t } = useLanguage();
  const [view, setView] = useState<'daily' | 'monthly'>('daily');
  const [data, setData] = useState<GetCostDataOutput>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await handleGetCostData(view);
      if (result.status === 'success' && result.data) {
        setData(result.data);
      } else {
        // Handle error case, maybe show a toast
        console.error(result.message);
        setData([]);
      }
    });
  }, [view]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-lg">{t.costTracker}</CardTitle>
            <CardDescription>{t.costs} ({view === 'daily' ? t.daily : t.monthly})</CardDescription>
          </div>
          <Select value={view} onValueChange={(v) => setView(v as 'daily' | 'monthly')}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t.view} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">{t.daily}</SelectItem>
              <SelectItem value="monthly">{t.monthly}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {isPending ? (
            <div className="flex h-full w-full items-center justify-center">
               <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ 
                    background: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
