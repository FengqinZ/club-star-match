'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import ScoreRing from '@/components/ui/ScoreRing';
import { clubs } from '@/data/clubs';
import { mockMatchResults } from '@/data/matching';

export default function ClubDetailContent() {
  const searchParams = useSearchParams();
  const clubId = searchParams.get('id') || 'tech-innovation';
  const club = clubs.find(c => c.id === clubId) || clubs[0];
  const matchResult = mockMatchResults.find(r => r.clubId === club.id);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Cover */}
      <div className="h-48 md:h-64 relative" style={{ background: club.cover }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-6 left-6 md:left-12 flex items-end gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
            {club.logo}
          </div>
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold">{club.name}</h1>
              {club.verified && (
                <span className="badge bg-white/20 text-white text-xs backdrop-blur-sm">✓ 校方认证</span>
              )}
            </div>
            <p className="text-white/80 text-sm">{club.slogan}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="card p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{club.memberCount}</p>
                  <p className="text-xs text-slate-500">成员人数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{club.satisfaction}</p>
                  <p className="text-xs text-slate-500">满意度</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{club.retentionRate}%</p>
                  <p className="text-xs text-slate-500">留存率</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-700">{club.foundedYear}</p>
                  <p className="text-xs text-slate-500">创立年份</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="badge-primary">{club.category}</span>
                {club.tags.map(tag => (
                  <span key={tag} className="badge bg-slate-50 text-slate-600">{tag}</span>
                ))}
                {club.popularity === 'hot' && <span className="badge-red">🔥 热门</span>}
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg text-slate-900 mb-3">社团简介</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{club.description}</p>
            </div>

            {/* Core Activities */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg text-slate-900 mb-4">核心活动</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {club.coreActivities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm text-slate-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruit Timeline */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg text-slate-900 mb-4">招新时间线</h2>
              <div className="relative">
                {club.recruitTimeline.map((item, i) => (
                  <div key={i} className="flex gap-4 mb-6 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        item.status === 'completed' ? 'bg-emerald-500' :
                        item.status === 'active' ? 'bg-primary-500 ring-4 ring-primary-100' :
                        'bg-slate-300'
                      }`} />
                      {i < club.recruitTimeline.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-1 ${
                          item.status === 'completed' ? 'bg-emerald-200' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-slate-900">{item.event}</p>
                      <p className="text-xs text-slate-500">{item.date}</p>
                      {item.status === 'active' && (
                        <span className="badge-primary text-xs mt-1">进行中</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time & Requirements */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg text-slate-900 mb-4">时间与要求</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">活动频率</p>
                  <p className="text-sm font-medium text-slate-900">{club.activityFrequency}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">每周时间投入</p>
                  <p className="text-sm font-medium text-slate-900">{club.weeklyHours}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 sm:col-span-2">
                  <p className="text-xs text-slate-500 mb-1">招新要求</p>
                  <p className="text-sm font-medium text-slate-900">{club.recruitRequirement}</p>
                </div>
                {club.hasInterview && (
                  <div className="p-4 rounded-lg bg-slate-50 sm:col-span-2">
                    <p className="text-xs text-slate-500 mb-1">面试/试训形式</p>
                    <p className="text-sm font-medium text-slate-900">{club.interviewForm}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Suitable / Not Suitable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="card p-6">
                <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> 适合什么样的人
                </h2>
                <ul className="space-y-2">
                  {club.suitableFor.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-amber-500">!</span> 不太适合
                </h2>
                <ul className="space-y-2">
                  {club.notSuitableFor.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg text-slate-900 mb-4">往届成员评价</h2>
              <div className="space-y-4">
                {club.reviews.map(review => (
                  <div key={review.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{review.avatar}</span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{review.author}</p>
                        <p className="text-xs text-slate-500">{review.grade} · {review.date}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-amber-400 text-sm">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">&ldquo;{review.content}&rdquo;</p>
                    <div className="flex flex-wrap gap-1.5">
                      {review.tags.map(tag => (
                        <span key={tag} className="badge bg-white text-slate-500 text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">评价由往届成员匿名提交，仅代表个人体验</p>
            </div>

            {/* FAQ */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg text-slate-900 mb-4">常见问题</h2>
              <div className="space-y-3">
                {club.faq.slice(0, showAllFaq ? undefined : 2).map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-slate-50">
                    <p className="text-sm font-medium text-slate-900 mb-1">Q: {item.q}</p>
                    <p className="text-sm text-slate-600">A: {item.a}</p>
                  </div>
                ))}
              </div>
              {club.faq.length > 2 && (
                <button
                  onClick={() => setShowAllFaq(!showAllFaq)}
                  className="text-sm text-primary-600 hover:text-primary-700 mt-3 font-medium"
                >
                  {showAllFaq ? '收起' : `查看全部 ${club.faq.length} 个问题`}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match Score */}
            {matchResult && (
              <div className="card p-6 border-primary-100 bg-gradient-to-b from-primary-50/50 to-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">AI匹配分析</h3>
                  <ScoreRing score={matchResult.score} size={56} />
                </div>
                <div className="space-y-3">
                  {matchResult.reasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-base">{reason.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{reason.label}</p>
                        <p className="text-xs text-slate-500">{reason.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {matchResult.highlights.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    {matchResult.highlights.map((h, i) => (
                      <p key={i} className="text-xs text-emerald-600 flex items-start gap-1.5 mb-1">
                        <span>✦</span><span>{h}</span>
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-3">基于你的画像与社团信息综合计算</p>
              </div>
            )}

            {/* Actions */}
            <div className="card p-6">
              <button
                onClick={() => setApplied(true)}
                disabled={applied}
                className={`w-full py-3 rounded-lg font-medium transition-all mb-3 ${
                  applied
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'btn-primary'
                }`}
              >
                {applied ? '✓ 已报名' : '立即报名'}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                    saved ? 'bg-amber-50 text-amber-700 border-amber-200' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {saved ? '★ 已收藏' : '☆ 收藏'}
                </button>
                <Link href={`/student/compare?ids=${club.id}`} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:border-slate-300 text-center">
                  加入对比
                </Link>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">快速了解</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">类别</span>
                  <span className="text-slate-900 font-medium">{club.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">面试</span>
                  <span className="text-slate-900 font-medium">{club.hasInterview ? '需要' : '无需'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">试训</span>
                  <span className="text-slate-900 font-medium">{club.hasTrial ? '有' : '无'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">热度</span>
                  <span className="text-slate-900 font-medium">
                    {club.popularity === 'hot' ? '🔥 热门' : club.popularity === 'medium' ? '适中' : '小众精品'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">联系方式</span>
                  <span className="text-slate-900 font-medium text-xs text-right max-w-[60%]">{club.contactInfo}</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            {club.achievements.length > 0 && (
              <div className="card p-6">
                <h3 className="font-semibold text-slate-900 mb-4">荣誉与成果</h3>
                <div className="space-y-2">
                  {club.achievements.map((a, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-amber-500 mt-0.5">🏆</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
