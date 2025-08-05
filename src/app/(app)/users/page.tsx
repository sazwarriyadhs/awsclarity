
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import UserManagementTable from '@/components/users/UserManagementTable';

export default function UserManagementPage() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.pageTitleUserManagement}</CardTitle>
        <CardDescription>{t.userManagementDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <UserManagementTable />
      </CardContent>
    </Card>
  );
}
