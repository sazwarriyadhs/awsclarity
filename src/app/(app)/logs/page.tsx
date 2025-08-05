import React from 'react';
import LogAnalyzer from '@/components/logs/LogAnalyzer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LogsPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto w-full max-w-4xl">
       <LogAnalyzer />
    </div>
  );
}
