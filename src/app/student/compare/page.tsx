'use client';

import { Suspense } from 'react';
import CompareContent from './CompareContent';

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">加载中...</div>}>
      <CompareContent />
    </Suspense>
  );
}
