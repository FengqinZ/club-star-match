'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ClubCard from '@/components/ui/ClubCard';
import { clubs } from '@/data/clubs';
import { mockMatchResults } from '@/data/matching';

export default function MatchPage() {
  const [mode, setMode] = useState<'conservative' | 'explore'>('conservative');
  const [expandedReason, setExpandedReason] = useState<string | null>(null);

  const results = mode === 'conservative'
    ? mockMatchResults.filter(r => r.score >= 65)
    : mockMatchResults;

  const hiddenGems = mockMatchResults.filter(r => r.isHiddenGem);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">AI 为你推荐的社团</h1>
          <p className="text-slate-500">基于你的兴趣画像，我们找到了以下适合你的社团</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            <button
              onClick={() => setMode('conservative')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'conservative' ? 'bg-primary-500 text-white shadow-sm' : 'text-slate-600 hover:text-primary-600'
              }`}
            >
              精准推荐
            </button>
            <button
              onClick={() => setMode('explore')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'explore' ? 'bg-primary-500 text-white shadow-sm' : 'text-slate-600 hover:text-primary-600'
              }`}
            >
              探索看看
            </button>
          </div>
          <p className="text-sm text-slate-400">
            {mode === 'conservative' ? '展示与你匹配度较高的社团' : '展示所有社团，包括可能意想不到的选择'}
          </p>
        </div>

        {/* Match Summary */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-primary-50 to-white border-primary-100">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🎯</div>
            <div>
              <p className="font-semibold text-slate-900">
                共找到 <span className="text-primary-600">{results.length}</span> 个推荐社团
                {hiddenGems.length > 0 && (
                  <span className="ml-2 text-amber-600">（含 {hiddenGems.length} 个宝藏社团）</span>
                )}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                推荐依据：你的兴趣方向、时间预算、参与目标和性格偏好综合计算
              </p>
            </div>
          </div>
        </div>

        {/* Hidden Gems Section */}
        {hiddenGems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">💎</span>
              <h2 className="font-semibold text-slate-900">适合你但容易被忽略的社团</h2>
              <span className="badge-amber">宝藏推荐</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              这些社团不是最热门的，但和你的画像有很高匹配度。低曝光意味着竞争更小、融入更容易。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hiddenGems.map(result => {
                const club = clubs.find(c => c.id === result.clubId)!;
                return (
                  <ClubCard
                    key={club.id}
                    club={club}
                    matchScore={result.score}
                    matchReasons={result.reasons.map(r => r.detail)}
                    isHiddenGem={true}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Main Recommendations */}
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-semibold text-slate-900 text-lg">
            {mode === 'conservative' ? '精准推荐' : '全部社团'}
          </h2>
          <span className="text-sm text-slate-400">{results.length} 个社团</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {results.map(result => {
            const club = clubs.find(c => c.id === result.clubId)!;
            const isExpanded = expandedReason === club.id;
            return (
              <div key={club.id}>
                <ClubCard
                  club={club}
                  matchScore={result.score}
                  matchReasons={result.reasons.map(r => r.detail)}
                  isHiddenGem={result.isHiddenGem}
                  showCompare
                />
                {/* Why Recommended Drawer */}
                <button
                  onClick={() => setExpandedReason(isExpanded ? null : club.id)}
                  className="w-full mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-primary-50 transition-all"
                >
                  {isExpanded ? '收起' : '为什么推荐给我？'}
                  <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="card p-4 mt-1 animate-fade-in border-primary-100 bg-primary-50/50">
                    <p className="text-xs font-medium text-primary-700 mb-3">匹配度解析</p>
                    <div className="space-y-3">
                      {result.reasons.map((reason, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-base mt-0.5">{reason.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{reason.label}</p>
                            <p className="text-xs text-slate-500">{reason.detail}</p>
                          </div>
                        </div>
                      ))}
                      {result.highlights.map((h, i) => (
                        <p key={i} className="text-xs text-emerald-600 flex items-start gap-1.5">
                          <span>✦</span><span>{h}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
