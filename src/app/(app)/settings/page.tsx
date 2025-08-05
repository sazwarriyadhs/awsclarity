"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Bell, CloudCog, KeyRound, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const dummyUsers = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin', avatar: 'https://placehold.co/100x100.png' },
  { name: 'Bob', email: 'bob@example.com', role: 'Developer', avatar: 'https://placehold.co/100x100.png' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Developer', avatar: 'https://placehold.co/100x100.png' },
];

export default function SettingsPage() {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState({
    budget: true,
    pipeline: false,
    security: true,
  });

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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">{t.connectAccount}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t.connectAccount}</DialogTitle>
                <DialogDescription>
                  {t.awsConnectionDesc}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="access-key" className="text-right">
                    Access Key ID
                  </Label>
                  <Input id="access-key" placeholder="AKIAIOSFODNN7EXAMPLE" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="secret-key" className="text-right">
                    Secret Key
                  </Label>
                  <Input id="secret-key" type="password" placeholder="************************" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">{t.cancel}</Button>
                </DialogClose>
                <Button type="submit">{t.connectAccount}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <CardTitle className="font-headline">{t.roleManagement}</CardTitle>
          </div>
          <CardDescription>{t.roleManagementDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {dummyUsers.map(user => (
             <div key={user.email} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} data-ai-hint="person portrait" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
             </div>
           ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6" />
            <CardTitle className="font-headline">{t.notifications}</CardTitle>
          </div>
           <CardDescription>{t.notificationsDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="budget-alerts" className="flex flex-col gap-1">
                <span className="font-medium">{t.budgetAlerts}</span>
                <span className="text-xs text-muted-foreground">{t.budgetAlertsDesc}</span>
              </Label>
              <Switch
                id="budget-alerts"
                checked={notifications.budget}
                onCheckedChange={(checked) => setNotifications(p => ({...p, budget: checked}))}
              />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="pipeline-alerts" className="flex flex-col gap-1">
                <span className="font-medium">{t.pipelineAlerts}</span>
                <span className="text-xs text-muted-foreground">{t.pipelineAlertsDesc}</span>
              </Label>
              <Switch
                id="pipeline-alerts"
                checked={notifications.pipeline}
                onCheckedChange={(checked) => setNotifications(p => ({...p, pipeline: checked}))}
              />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="security-alerts" className="flex flex-col gap-1">
                <span className="font-medium">{t.securityAlerts}</span>
                <span className="text-xs text-muted-foreground">{t.securityAlertsDesc}</span>
              </Label>
              <Switch
                id="security-alerts"
                checked={notifications.security}
                onCheckedChange={(checked) => setNotifications(p => ({...p, security: checked}))}
              />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
