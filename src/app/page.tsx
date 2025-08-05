
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Server, DollarSign, GitBranch, Bot, Globe, Shield, BarChart2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="text-center hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="mx-auto bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <CardTitle className="mt-4 font-headline">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function LandingPage() {
    const { t } = useLanguage();
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
             <Image src="/image/logo.png" alt="AWS Clarity Logo" width={80} height={80} />
          </Link>
          <Button asChild>
            <Link href="/login">
              {t.login} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl">
            {t.appName}: Your Mission Control for AWS
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Gain unparalleled visibility into your AWS environment. Monitor services, track costs, and analyze logs with an intuitive, AI-powered dashboard.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/login">
                Get Started for Free
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline">Powerful Features, Simplified</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Everything you need to manage your AWS infrastructure effectively.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                     <FeatureCard
                        icon={<Server size={32} />}
                        title={t.instanceMonitoring}
                        description="Visualize the real-time status and uptime of EC2, Lambda, RDS, and more."
                    />
                    <FeatureCard
                        icon={<DollarSign size={32} />}
                        title={t.costTracker}
                        description="Keep your cloud spending in check with detailed cost breakdowns and budget alerts."
                    />
                    <FeatureCard
                        icon={<GitBranch size={32} />}
                        title={t.cicdStatus}
                        description="Monitor your CI/CD pipelines to ensure smooth and successful deployments."
                    />
                    <FeatureCard
                        icon={<Bot size={32} />}
                        title={t.aiLogSummary}
                        description="Leverage AI to get human-readable summaries from complex log data instantly."
                    />
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://www.digimediakomunika.cloud/images/logo.png" alt="Digimedia Komunika" width={200} height={67} className="mb-6"/>
                        <h2 className="text-3xl font-bold font-headline text-primary">Powered by PT Digi Media Komunika</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           PT Digi Media Komunika is a leading cloud solutions provider, empowering businesses to innovate and scale with the power of the cloud. With deep expertise in AWS, we deliver tailored solutions that drive efficiency, security, and growth.
                        </p>
                         <p className="mt-4 text-muted-foreground text-lg">
                           AWS Clarity is our commitment to simplifying cloud management, providing our clients with the tools they need to succeed.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Image src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/aws-color.png" alt="AWS Logo" width={250} height={250} />
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {t.appName}. All rights reserved.</p>
             <p className="text-sm text-muted-foreground">A collaboration with PT Digi Media Komunika.</p>
          </div>
          <div className="flex gap-4">
             <Link href="#" className="text-muted-foreground hover:text-foreground"><Globe size={20}/></Link>
             <Link href="#" className="text-muted-foreground hover:text-foreground"><Shield size={20}/></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
