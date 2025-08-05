import React from 'react';
import PipelineList from '@/components/pipelines/PipelineList';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

// Since this page uses a client-side hook, we must mark it as a client component.
// However, the language context is not actually needed here.
// To avoid making this a client component, we'd need to refactor how translations are passed.
// For now, let's keep it simple. A better approach might be to pass `t` from the layout.
'use client'; 

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
