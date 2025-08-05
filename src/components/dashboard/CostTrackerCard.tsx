"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GetCostDataOutput } from '@/ai/flows/get-cost-data';
import { handleGetCostData } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

const serviceColors = {
  EC2: 'hsl(var(--chart-1))',
  Lambda: 'hsl(var(--chart-2))',
  RDS: 'hsl(var(--chart-3))',
  S3: 'hsl(var(--chart-4))',
};

export default function CostTrackerCard() {
  const { t } = useLanguage();
  const [view, setView] = useState<'daily' | 'monthly'>('daily');
  const [data, setData] = useState<GetCostDataOutput>([]);
  const [isPending, startTransition] = useTransition();

  const serviceNameMap = {
    EC2: t.ec2,
    Lambda: t.lambda,
    RDS: t.rds,
    S3: 'S3'
  };

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
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ 
                    background: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                  formatter={(value, name) => [`$${value}`, serviceNameMap[name as keyof typeof serviceNameMap]]}
                />
                <Legend formatter={(value) => serviceNameMap[value as keyof typeof serviceNameMap]}/>
                <Bar dataKey="EC2" stackId="a" fill={serviceColors.EC2} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Lambda" stackId="a" fill={serviceColors.Lambda} />
                <Bar dataKey="RDS" stackId="a" fill={serviceColors.RDS} />
                <Bar dataKey="S3" stackId="a" fill={serviceColors.S3} radius={[0, 0, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
