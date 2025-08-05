'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { handleGetMigrationStatus } from '@/lib/actions';
import type { GetMigrationStatusOutput } from '@/ai/flows/get-migration-status';
import { CheckCircle, XCircle, Clock, PauseCircle, Database, Server, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale, enUS as enUSLocale } from 'date-fns/locale';

const statusMap = {
  Completed: { 
    variant: 'default' as const, 
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  Failed: { 
    variant: 'destructive' as const,
    icon: <XCircle className="h-4 w-4 text-red-500" />,
  },
  'In Progress': { 
    variant: 'secondary' as const,
    icon: <Clock className="h-4 w-4 text-blue-500 animate-spin" />,
   },
  Pending: {
    variant: 'outline' as const,
    icon: <PauseCircle className="h-4 w-4 text-gray-500" />,
  }
};

const typeMap = {
    Schema: { icon: <Database className="h-4 w-4" /> },
    Infrastructure: { icon: <Server className="h-4 w-4" /> },
    Data: { icon: <FileText className="h-4 w-4" /> },
}

export default function MigrationList() {
  const { t, language } = useLanguage();
  const [migrations, setMigrations] = useState<GetMigrationStatusOutput>([]);
  const [isPending, startTransition] = useTransition();

  const locale = language === 'id' ? idLocale : enUSLocale;

  const statusTextMap = {
    Completed: t.statusCompleted,
    Failed: t.statusFailed,
    'In Progress': t.statusInProgress,
    Pending: t.statusPending,
  };

  const typeTextMap = {
    Schema: t.migrationTypeSchema,
    Infrastructure: t.migrationTypeInfra,
    Data: t.migrationTypeData,
  };

  useEffect(() => {
    startTransition(async () => {
      const result = await handleGetMigrationStatus();
      if (result.status === 'success' && result.data) {
        setMigrations(result.data);
      } else {
        console.error(result.message);
        setMigrations([]);
      }
    });
  }, []);

  if (isPending) {
    return (
       <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
    );
  }

  return (
    <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">{t.migrationID}</TableHead>
            <TableHead>{t.migrationDescription}</TableHead>
            <TableHead>{t.migrationType}</TableHead>
            <TableHead>{t.migrationStatus}</TableHead>
            <TableHead className="text-right">{t.migrationSubmitted}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {migrations.map((migration) => (
            <TableRow key={migration.id}>
                <TableCell className="font-mono text-xs">{migration.id}</TableCell>
                <TableCell className="font-medium">{migration.description}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {typeMap[migration.type].icon}
                        <span>{typeTextMap[migration.type]}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {statusMap[migration.status].icon}
                        <Badge variant={statusMap[migration.status].variant}>
                            {statusTextMap[migration.status]}
                        </Badge>
                    </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                    {formatDistanceToNow(new Date(migration.submittedAt), { addSuffix: true, locale })}
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
  );
}
