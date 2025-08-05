"use client";

import React, { useState, useEffect, useTransition } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { handleGetCiCdStatus } from '@/lib/actions';
import type { GetCiCdStatusOutput } from '@/ai/flows/get-cicd-status';
import { CheckCircle, XCircle, Clock, GitBranch } from 'lucide-react';

const statusMap = {
  Success: { 
    variant: 'default' as const, 
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  Failed: { 
    variant: 'destructive' as const,
    icon: <XCircle className="h-4 w-4 text-red-500" />,
  },
  'In Progress': { 
    variant: 'secondary' as const,
    icon: <Clock className="h-4 w-4 animate-spin" />,
   },
};

export default function PipelineList() {
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
  }, [t]);

  if (isPending) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {pipelines.map((pipeline) => (
        <AccordionItem value={pipeline.name} key={pipeline.name}>
          <AccordionTrigger>
            <div className="flex items-center gap-4 w-full">
              <GitBranch className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-left font-medium">{pipeline.name}</span>
              <div className="flex items-center gap-2">
                {statusMap[pipeline.status].icon}
                <Badge variant={statusMap[pipeline.status].variant}>
                  {statusTextMap[pipeline.status]}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground w-24 text-right">{pipeline.lastRun}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
             <div className="p-4 bg-muted/50 rounded-md">
                <h4 className="font-semibold mb-2">{t.details}</h4>
                <p>{t.pipelineDetailsPlaceholder}</p>
             </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
