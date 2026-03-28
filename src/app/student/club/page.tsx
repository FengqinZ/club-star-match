'use client';

import { Suspense } from 'react';
import ClubDetailContent from './ClubDetailContent';

export default function ClubDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">加载中...</div>}>
      <ClubDetailContent />
    </Suspense>
  );
}
