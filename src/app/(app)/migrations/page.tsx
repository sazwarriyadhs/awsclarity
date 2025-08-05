'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import MigrationList from '@/components/migrations/MigrationList';

export default function MigrationsPage() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.pageTitleMigrations}</CardTitle>
        <CardDescription>{t.migrationsDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <MigrationList />
      </CardContent>
    </Card>
  );
}
