"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Bell, CloudCog } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CloudCog className="h-6 w-6" />
            <CardTitle className="font-headline">{t.awsConnection}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t.awsConnectionDesc}</p>
          <Button className="mt-4">{t.connectAccount}</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <CardTitle className="font-headline">{t.roleManagement}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t.roleManagementDesc}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6" />
            <CardTitle className="font-headline">{t.notifications}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t.notificationsDesc}</p>
        </CardContent>
      </Card>
    </div>
  );
}
