'use client';

import Link from 'next/link';
import { clubs } from '@/data/clubs';
import { mockMatchResults } from '@/data/matching';

const painPoints = [
  { icon: '😵', title: '信息不对称', desc: '社团宣传千篇一律，看不出真实区别，不知道哪个适合自己' },
  { icon: '😰', title: '选择焦虑', desc: '几十个社团不知道怎么选，怕选错浪费时间，怕加入后不适合' },
  { icon: '🏃', title: '报名混乱', desc: '不同社团报名时间/方式不统一，容易错过或重复报名' },
  { icon: '📋', title: '管理低效', desc: '社团招新靠表格和微信群，信息碎片化，校方缺乏整体掌握' },
];

const features = [
  { icon: '🎯', title: '智能匹配', desc: '1分钟建档，AI根据兴趣、时间、目标多维匹配，告诉你为什么推荐', color: 'from-primary-500 to-primary-600' },
  { icon: '⚖️', title: '标准化对比', desc: '横向比较社团的时间投入、活动频率、招新门槛，用数据辅助决策', color: 'from-teal-500 to-teal-600' },
  { icon: '📱', title: '全流程管理', desc: '从报名到面试到结果，全程状态透明，不再焦虑等待', color: 'from-amber-500 to-amber-600' },
  { icon: '🏫', title: '校级治理', desc: '标准化社团信息、监控招新秩序、平衡热门与冷门，提升招新质量', color: 'from-purple-500 to-purple-600' },
];

const stats = [
  { value: '12+', label: '入驻社团' },
  { value: '98%', label: '信息规范率' },
  { value: '< 60s', label: '完成建档' },
  { value: '4.5', label: '平均满意度' },
];

export default function HomePage() {
  const topClubs = mockMatchResults.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              星
            </div>
            <span className="font-bold text-lg text-slate-900">社团星图</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/student/profile" className="btn-primary text-sm py-2">开始匹配</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              2025秋季招新进行中
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              用智能匹配<br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                帮新生找到真正适合的社团
              </span>
            </h1>

            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              不再盲目选择。只需1分钟完成兴趣建档，AI会告诉你哪些社团适合你、为什么适合你，
              帮你从「看了几十个社团还是不知道选哪个」变成「清晰了解、果断决策」。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/student/profile" className="btn-primary text-base px-8 py-3 shadow-lg shadow-primary-200">
                🎯 开始智能匹配
              </Link>
              <Link href="/student/discover" className="btn-secondary text-base px-8 py-3">
                浏览全部社团
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">传统招新的四大痛点</h2>
            <p className="section-desc">每年招新季，这些问题都在重复上演</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map(p => (
              <div key={p.title} className="card p-6 text-center hover:-translate-y-1">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">社团星图如何解决</h2>
            <p className="section-desc">一个平台，服务新生、社团和校方三方</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(f => (
              <div key={f.title} className="card p-6 flex gap-5 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Recommended */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">热门推荐预览</h2>
            <p className="section-desc">完成建档后，你将获得个性化的推荐结果</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topClubs.map(result => {
              const club = clubs.find(c => c.id === result.clubId)!;
              return (
                <Link href={`/student/club?id=${club.id}`} key={club.id} className="card overflow-hidden group hover:-translate-y-1">
                  <div className="h-28" style={{ background: club.cover }}>
                    <div className="h-full flex items-center justify-center text-4xl">{club.logo}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{club.name}</h3>
                      <span className="text-sm font-bold text-primary-600">{result.score}分</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{club.slogan}</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="badge-primary text-xs">{club.category}</span>
                      {club.tags.slice(0, 2).map(t => (
                        <span key={t} className="badge bg-slate-50 text-slate-500 text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/student/profile" className="btn-primary">完成建档，获取个性化推荐 →</Link>
          </div>
        </div>
      </section>

      {/* Role Entry */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">选择你的角色</h2>
            <p className="section-desc">社团星图服务招新全链路的每一个参与方</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/student/profile" className="card p-8 text-center hover:-translate-y-2 group border-2 border-transparent hover:border-primary-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl shadow-lg shadow-primary-200">
                🎓
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">我是新生</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                完成1分钟建档，获得AI推荐<br />
                对比社团、管理报名、一站搞定
              </p>
              <span className="text-primary-600 font-medium text-sm">开始探索 →</span>
            </Link>

            <Link href="/club/dashboard" className="card p-8 text-center hover:-translate-y-2 group border-2 border-transparent hover:border-teal-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-3xl shadow-lg shadow-teal-200">
                🏠
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">我是社团</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                标准化发布招新信息<br />
                查看匹配报名者、高效筛选候选人
              </p>
              <span className="text-teal-600 font-medium text-sm">进入后台 →</span>
            </Link>

            <Link href="/admin/dashboard" className="card p-8 text-center hover:-translate-y-2 group border-2 border-transparent hover:border-slate-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-3xl shadow-lg shadow-slate-200">
                🏫
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">我是校方</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                审核社团信息、监控招新秩序<br />
                掌握全校招新数据与治理指标
              </p>
              <span className="text-slate-600 font-medium text-sm">进入管理 →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Complete Pipeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">完整的招新链路</h2>
            <p className="section-desc">从发现到加入，每一步都有平台支撑</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {['发现', '理解', '比较', '决策', '报名', '跟进'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${
                    i < 3 ? 'bg-primary-500' : 'bg-primary-600'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-slate-700 mt-2">{step}</span>
                </div>
                {i < 5 && (
                  <div className="hidden md:block w-12 h-0.5 bg-primary-200 mx-2 mt-[-16px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
              星
            </div>
            <span className="font-bold text-white">社团星图</span>
          </div>
          <p className="text-sm mb-2">用智能匹配，帮新生找到真正适合自己的社团</p>
          <p className="text-xs text-slate-500">© 2025 社团星图 · 社团招新智能匹配平台 · 校方认证</p>
        </div>
      </footer>
    </div>
  );
}
