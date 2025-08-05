'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginForm() {
  const { t } = useLanguage();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would handle authentication here.
    // For now, we'll just redirect to the dashboard.
    window.location.href = '/dashboard';
  };

  return (
    <Card className="w-full max-w-sm">
       <CardHeader className="items-center text-center">
        <Image src="/image/logo.png" alt="Logo" width={150} height={150} className="mb-4" />
        <CardTitle className="font-headline text-2xl">{t.login}</CardTitle>
        <CardDescription>{t.loginDesc}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input id="email" type="email" placeholder="user@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t.password}</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                {t.forgotPassword}
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">{t.login}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
