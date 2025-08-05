"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface InstanceStatusCardProps {
  serviceName: string;
  icon: React.ReactNode;
  status: 'Running' | 'Stopped' | 'Error';
  uptime: { '24h': number; '7d': number; '30d': number };
}

export default function InstanceStatusCard({ serviceName, icon, status, uptime }: InstanceStatusCardProps) {
  const { t } = useLanguage();

  const statusMap = {
    Running: { text: t.running, className: 'bg-green-500' },
    Stopped: { text: t.stopped, className: 'bg-yellow-500' },
    Error: { text: t.error, className: 'bg-red-500' },
  };

  const currentStatus = statusMap[status];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-lg">{serviceName}</CardTitle>
          {icon}
        </div>
        <CardDescription>{t.instanceMonitoring}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{t.status}</span>
          <div className="flex items-center gap-2">
            <div className={cn('h-2.5 w-2.5 rounded-full', currentStatus.className)} />
            <span className="font-semibold">{currentStatus.text}</span>
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">{t.uptimeMonitoring}</h4>
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <p className="font-bold good-status">{uptime['24h']}%</p>
              <p className="text-xs text-muted-foreground">{t['24h']}</p>
            </div>
            <div className="text-center">
              <p className={cn('font-bold', uptime['7d'] > 99.9 ? 'good-status' : 'bad-status')}>{uptime['7d']}%</p>
              <p className="text-xs text-muted-foreground">{t['7d']}</p>
            </div>
            <div className="text-center">
              <p className={cn('font-bold', uptime['30d'] > 99.9 ? 'good-status' : 'bad-status')}>{uptime['30d']}%</p>
              <p className="text-xs text-muted-foreground">{t['30d']}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
