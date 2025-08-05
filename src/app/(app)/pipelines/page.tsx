'use client'; 

import React from 'react';
import PipelineList from '@/components/pipelines/PipelineList';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PipelinesPage() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.deploymentPipelines}</CardTitle>
        <CardDescription>{t.deploymentPipelinesDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <PipelineList />
      </CardContent>
    </Card>
  );
}
