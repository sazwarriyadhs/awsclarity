"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const pipelines = [
  { name: 'frontend-deploy', status: 'Success', lastRun: '2h ago' },
  { name: 'backend-deploy', status: 'Success', lastRun: '3h ago' },
  { name: 'infra-staging', status: 'In Progress', lastRun: '5m ago' },
  { name: 'e2e-tests', status: 'Failed', lastRun: '1d ago' },
];

const statusVariantMap = {
  Success: 'default',
  Failed: 'destructive',
  'In Progress': 'secondary',
};

export default function CiCdPipelineStatus() {
  const { t } = useLanguage();
  
  const statusTextMap = {
    Success: t.success,
    Failed: t.failed,
    'In Progress': t.inProgress,
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-lg">{t.cicdStatus}</CardTitle>
        <CardDescription>Live status of your deployment pipelines</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.pipeline}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.lastRun}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pipelines.map((p) => (
              <TableRow key={p.name}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[p.status as keyof typeof statusVariantMap] as any}>
                    {statusTextMap[p.status as keyof typeof statusTextMap]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{p.lastRun}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
