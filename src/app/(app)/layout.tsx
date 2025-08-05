'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Bot,
  Settings,
  CircleUserRound,
  ChevronDown,
  GitBranch,
  DatabaseZap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';
import Image from 'next/image';

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();
  const { isMobile } = useSidebar();

  const navItems = [
    { href: '/dashboard', icon: <LayoutDashboard />, label: t.dashboard },
    { href: '/pipelines', icon: <GitBranch />, label: t.pipelines },
    { href: '/migrations', icon: <DatabaseZap />, label: t.migrations },
    { href: '/logs', icon: <Bot />, label: t.logAnalysis },
    { href: '/settings', icon: <Settings />, label: t.settings },
  ];

  const pageTitles: { [key: string]: string } = {
    '/dashboard': t.pageTitleDashboard,
    '/pipelines': t.pageTitlePipelines,
    '/migrations': t.pageTitleMigrations,
    '/logs': t.pageTitleLogs,
    '/settings': t.pageTitleSettings,
  };

  const currentPageTitle = pageTitles[pathname] || t.appName;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="items-center p-4 h-auto">
          <Link href="/dashboard">
            <Image
              src="/image/logo.png"
              alt="Logo"
              width={128}
              height={128}
            />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Image 
            src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/aws-color.png" 
            alt="AWS Logo"
            width={128}
            height={128}
            className="w-full h-auto p-4"
          />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            {isMobile && <SidebarTrigger />}
            <h1 className="font-headline text-xl font-semibold sm:text-2xl">
              {currentPageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setLanguage('en' as Language)}>
                  {t.english}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('id' as Language)}>
                  {t.indonesian}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <CircleUserRound className="h-6 w-6" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t.profile}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t.settings}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t.logout}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </div>
  );
}

export default AppLayout;
