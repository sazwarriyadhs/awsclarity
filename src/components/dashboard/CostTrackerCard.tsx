"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const dailyData = [
  { name: 'Mon', cost: 45 },
  { name: 'Tue', cost: 52 },
  { name: 'Wed', cost: 48 },
  { name: 'Thu', cost: 60 },
  { name: 'Fri', cost: 55 },
  { name: 'Sat', cost: 30 },
  { name: 'Sun', cost: 28 },
];

const monthlyData = [
  { name: 'Jan', cost: 1200 },
  { name: 'Feb', cost: 1100 },
  { name: 'Mar', cost: 1350 },
  { name: 'Apr', cost: 1400 },
  { name: 'May', cost: 1600 },
  { name: 'Jun', cost: 1550 },
];

export default function CostTrackerCard() {
  const { t } = useLanguage();
  const [view, setView] = useState('daily');
  const data = view === 'daily' ? dailyData : monthlyData;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-lg">{t.costTracker}</CardTitle>
            <CardDescription>{t.costs} ({view === 'daily' ? t.daily : t.monthly})</CardDescription>
          </div>
          <Select value={view} onValueChange={setView}>
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
        </div>
      </CardContent>
    </Card>
  );
}
