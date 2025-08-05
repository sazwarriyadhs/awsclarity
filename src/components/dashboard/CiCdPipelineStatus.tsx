"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { handleGetCiCdStatus } from '@/lib/actions';
import type { GetCiCdStatusOutput } from '@/ai/flows/get-cicd-status';

const statusVariantMap = {
  Success: 'default',
  Failed: 'destructive',
  'In Progress': 'secondary',
};

export default function CiCdPipelineStatus() {
  const { t } = useLanguage();
  const [pipelines, setPipelines] = useState<GetCiCdStatusOutput>([]);
  const [isPending, startTransition] = useTransition();
  
  const statusTextMap = {
    Success: t.success,
    Failed: t.failed,
    'In Progress': t.inProgress,
  };

  useEffect(() => {
    startTransition(async () => {
      const result = await handleGetCiCdStatus();
      if (result.status === 'success' && result.data) {
        setPipelines(result.data);
      } else {
        console.error(result.message);
        setPipelines([]);
      }
    });
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-lg">{t.cicdStatus}</CardTitle>
        <CardDescription>Live status of your deployment pipelines</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
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
                    <Badge variant={statusVariantMap[p.status] as any}>
                      {statusTextMap[p.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{p.lastRun}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
