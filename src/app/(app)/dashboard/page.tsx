import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Server, CloudLightning, Database, GitBranch } from 'lucide-react';
import CostTrackerCard from '@/components/dashboard/CostTrackerCard';
import CiCdPipelineStatus from '@/components/dashboard/CiCdPipelineStatus';
import InstanceStatusCard from '@/components/dashboard/InstanceStatusCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InstanceStatusCard
          serviceName="EC2"
          icon={<Server className="h-6 w-6 text-muted-foreground" />}
          status="Running"
          uptime={{ '24h': 99.98, '7d': 99.99, '30d': 100 }}
        />
        <InstanceStatusCard
          serviceName="Lambda"
          icon={<CloudLightning className="h-6 w-6 text-muted-foreground" />}
          status="Running"
          uptime={{ '24h': 100, '7d': 100, '30d': 100 }}
        />
        <InstanceStatusCard
          serviceName="RDS"
          icon={<Database className="h-6 w-6 text-muted-foreground" />}
          status="Running"
          uptime={{ '24h': 99.95, '7d': 99.9, '30d': 99.98 }}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CostTrackerCard />
        </div>
        <div className="lg:col-span-2">
           <CiCdPipelineStatus />
        </div>
      </div>
    </div>
  );
}
