'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import ScoreRing from '@/components/ui/ScoreRing';
import { clubs } from '@/data/clubs';
import { mockMatchResults } from '@/data/matching';

const compareFields = [
  { key: 'category', label: '社团类别' },
  { key: 'slogan', label: '定位' },
  { key: 'activityFrequency', label: '活动频率' },
  { key: 'weeklyHours', label: '每周时间投入' },
  { key: 'recruitRequirement', label: '招新门槛' },
  { key: 'interviewForm', label: '面试形式' },
  { key: 'memberCount', label: '成员人数' },
  { key: 'retentionRate', label: '留存率' },
  { key: 'satisfaction', label: '成员满意度' },
  { key: 'suitableFor', label: '适合人群' },
  { key: 'notSuitableFor', label: '不太适合' },
];

export default function CompareContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');
  const initialIds = idsParam ? idsParam.split(',').slice(0, 3) : ['tech-innovation', 'debate-team', 'photo-club'];
  const [selectedIds, setSelectedIds] = useState(initialIds);

  const selectedClubs = selectedIds.map(id => clubs.find(c => c.id === id)).filter(Boolean) as typeof clubs;

  const getFieldValue = (club: typeof clubs[0], key: string) => {
    switch (key) {
      case 'suitableFor': return club.suitableFor.slice(0, 3).join('；');
      case 'notSuitableFor': return club.notSuitableFor.join('；');
      case 'retentionRate': return `${club.retentionRate}%`;
      case 'satisfaction': return `${club.satisfaction} / 5.0`;
      case 'memberCount': return `${club.memberCount} 人`;
      default: return (club as unknown as Record<string, string>)[key];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">社团横向对比</h1>
          <p className="text-slate-500">通过标准化字段对比，帮你看清每个社团的真实区别</p>
        </div>

        {/* Selector */}
        <div className="card p-4 mb-6">
          <p className="text-sm font-medium text-slate-700 mb-3">选择对比社团（最多3个）</p>
          <div className="flex flex-wrap gap-2">
            {clubs.map(club => (
              <button
                key={club.id}
                onClick={() => {
                  if (selectedIds.includes(club.id)) {
                    setSelectedIds(selectedIds.filter(id => id !== club.id));
                  } else if (selectedIds.length < 3) {
                    setSelectedIds([...selectedIds, club.id]);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedIds.includes(club.id)
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {club.logo} {club.name}
              </button>
            ))}
          </div>
        </div>

        {selectedClubs.length >= 2 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header */}
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="p-4 text-left text-sm font-medium text-slate-500 w-40 bg-slate-50">对比项</th>
                    {selectedClubs.map(club => (
                      <th key={club.id} className="p-4 text-center min-w-[240px]">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: club.cover }}>
                            {club.logo}
                          </div>
                          <Link href={`/student/club?id=${club.id}`} className="font-bold text-slate-900 hover:text-primary-600">
                            {club.name}
                          </Link>
                          {club.verified && <span className="badge-green text-xs">✓ 校方认证</span>}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Match Score */}
                <tbody>
                  <tr className="border-b border-slate-100 bg-primary-50/30">
                    <td className="p-4 text-sm font-medium text-slate-700 bg-slate-50">综合匹配度</td>
                    {selectedClubs.map(club => {
                      const result = mockMatchResults.find(r => r.clubId === club.id);
                      return (
                        <td key={club.id} className="p-4 text-center">
                          {result && <ScoreRing score={result.score} size={56} />}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Compare Fields */}
                  {compareFields.map((field, i) => (
                    <tr key={field.key} className={`border-b border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                      <td className="p-4 text-sm font-medium text-slate-700 bg-slate-50">{field.label}</td>
                      {selectedClubs.map(club => (
                        <td key={club.id} className="p-4 text-sm text-slate-600 text-center">
                          {getFieldValue(club, field.key)}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Reviews */}
                  <tr className="border-b border-slate-50">
                    <td className="p-4 text-sm font-medium text-slate-700 bg-slate-50">往届反馈</td>
                    {selectedClubs.map(club => (
                      <td key={club.id} className="p-4 text-sm text-slate-600">
                        {club.reviews[0] && (
                          <div className="bg-slate-50 rounded-lg p-3 text-left">
                            <p className="text-xs text-slate-500 mb-1">{club.reviews[0].author} · {club.reviews[0].grade}</p>
                            <p className="text-xs leading-relaxed">&ldquo;{club.reviews[0].content.slice(0, 80)}...&rdquo;</p>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-slate-400">请至少选择2个社团进行对比</p>
          </div>
        )}
      </div>
    </div>
  );
}
