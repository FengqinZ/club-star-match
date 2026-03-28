'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { clubs } from '@/data/clubs';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'clubs' | 'audit'>('overview');

  const totalMembers = clubs.reduce((s, c) => s + c.memberCount, 0);
  const verifiedCount = clubs.filter(c => c.verified).length;
  const hotCount = clubs.filter(c => c.popularity === 'hot').length;
  const nicheCount = clubs.filter(c => c.popularity === 'niche').length;

  const riskItems = [
    { club: '飞翼篮球社', issue: '招新信息缺少面试形式说明', level: 'warning' },
    { club: '绿行环保社', issue: '社团简介信息量不足（<50字）', level: 'warning' },
    { club: 'Pulse舞团', issue: '面试时间与思辩社冲突（9月14日）', level: 'error' },
  ];

  const auditItems = [
    { club: '科创工坊', action: '更新招新信息', time: '2小时前', status: 'approved' },
    { club: '思辩社', action: '新增社团信息', time: '昨天', status: 'approved' },
    { club: '金融研习社', action: '修改面试形式', time: '2天前', status: 'pending' },
    { club: 'AI前沿研究社', action: '更新招新时间线', time: '3天前', status: 'approved' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-lg">
              🏫
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">校方管理后台</h1>
              <p className="text-slate-500 text-sm">招新治理中心 · 全校社团数据一览</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-slate-200">
          {[
            { key: 'overview', label: '招新总览' },
            { key: 'clubs', label: '社团管理' },
            { key: 'audit', label: '信息审核' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="stat-card">
                <p className="text-3xl font-bold text-primary-600">{clubs.length}</p>
                <p className="text-sm text-slate-500">入驻社团</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-emerald-600">{verifiedCount}</p>
                <p className="text-sm text-slate-500">已认证</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-slate-700">{totalMembers}</p>
                <p className="text-sm text-slate-500">总成员数</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-amber-600">156</p>
                <p className="text-sm text-slate-500">总报名数</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-primary-600">98%</p>
                <p className="text-sm text-slate-500">信息规范率</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-emerald-600">87%</p>
                <p className="text-sm text-slate-500">招新覆盖率</p>
              </div>
            </div>

            {/* Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h2 className="font-semibold text-slate-900 mb-4">社团类别分布</h2>
                <div className="space-y-3">
                  {[
                    { category: '科技', count: 2, color: 'bg-primary-500' },
                    { category: '文艺', count: 3, color: 'bg-pink-500' },
                    { category: '学术', count: 2, color: 'bg-purple-500' },
                    { category: '公益', count: 2, color: 'bg-emerald-500' },
                    { category: '体育', count: 1, color: 'bg-amber-500' },
                    { category: '创业', count: 1, color: 'bg-blue-500' },
                    { category: '媒体', count: 1, color: 'bg-teal-500' },
                  ].map(item => (
                    <div key={item.category} className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 w-12">{item.category}</span>
                      <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full progress-fill`}
                          style={{ width: `${(item.count / clubs.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-500 w-8">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h2 className="font-semibold text-slate-900 mb-4">热门/冷门分布</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-xl bg-red-50">
                    <p className="text-2xl font-bold text-red-600">{hotCount}</p>
                    <p className="text-xs text-red-600">热门社团</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-slate-50">
                    <p className="text-2xl font-bold text-slate-600">{clubs.length - hotCount - nicheCount}</p>
                    <p className="text-xs text-slate-500">适中</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-blue-50">
                    <p className="text-2xl font-bold text-blue-600">{nicheCount}</p>
                    <p className="text-xs text-blue-600">小众精品</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="text-sm text-amber-800 font-medium mb-1">⚠️ 热度失衡提醒</p>
                  <p className="text-xs text-amber-700">
                    4个热门社团吸纳了约60%的报名量。建议在推荐算法中适度增加小众社团的曝光权重，
                    帮助优质但低知名度的社团获得关注。
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Alerts */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-slate-900">风险与治理提醒</h2>
                <span className="badge-red">{riskItems.length}</span>
              </div>
              <div className="space-y-3">
                {riskItems.map((item, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
                    item.level === 'error' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
                  }`}>
                    <span className={`text-lg ${item.level === 'error' ? 'text-red-500' : 'text-amber-500'}`}>
                      {item.level === 'error' ? '🚨' : '⚠️'}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.club}</p>
                      <p className="text-xs text-slate-600">{item.issue}</p>
                    </div>
                    <button className="ml-auto text-sm text-primary-600 hover:text-primary-700 font-medium flex-shrink-0">
                      处理
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Health */}
            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">平台治理指标</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: '信息完整度', value: '96%', desc: '所有必填字段填写率', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: '审核及时率', value: '100%', desc: '48小时内完成审核', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: '时间冲突', value: '1处', desc: '社团面试时间重叠', color: 'text-red-600', bg: 'bg-red-50' },
                  { label: '报名入口覆盖', value: '92%', desc: '社团已开放报名通道', color: 'text-primary-600', bg: 'bg-primary-50' },
                ].map(item => (
                  <div key={item.label} className={`p-4 rounded-xl ${item.bg}`}>
                    <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-sm font-medium text-slate-800 mt-1">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clubs Management Tab */}
        {activeTab === 'clubs' && (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left p-4 text-sm font-medium text-slate-500">社团</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-500">类别</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-500">成员</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-500">热度</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-500">认证</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-500">满意度</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-500">留存率</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map(club => (
                  <tr key={club.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{club.logo}</span>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{club.name}</p>
                          <p className="text-xs text-slate-400">创立于{club.foundedYear}年</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="badge-primary text-xs">{club.category}</span>
                    </td>
                    <td className="p-4 text-center text-sm text-slate-600">{club.memberCount}</td>
                    <td className="p-4 text-center">
                      <span className={`badge text-xs ${
                        club.popularity === 'hot' ? 'bg-red-50 text-red-600' :
                        club.popularity === 'medium' ? 'bg-slate-50 text-slate-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {club.popularity === 'hot' ? '热门' : club.popularity === 'medium' ? '适中' : '小众'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {club.verified ? (
                        <span className="text-emerald-500">✓</span>
                      ) : (
                        <span className="text-slate-300">−</span>
                      )}
                    </td>
                    <td className="p-4 text-center text-sm text-slate-600">{club.satisfaction}</td>
                    <td className="p-4 text-center text-sm text-slate-600">{club.retentionRate}%</td>
                    <td className="p-4 text-center">
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">审核队列</h2>
              <div className="space-y-3">
                {auditItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.club} · {item.action}</p>
                        <p className="text-xs text-slate-400">{item.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.status === 'approved' ? (
                        <span className="badge-green text-xs">已通过</span>
                      ) : (
                        <>
                          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">通过</button>
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">驳回</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">审核标准</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="font-medium text-slate-800 mb-2">必填字段检查</p>
                  <ul className="space-y-1 text-xs">
                    <li>✓ 社团名称与简介</li>
                    <li>✓ 活动频率与时间投入</li>
                    <li>✓ 招新要求与面试形式</li>
                    <li>✓ 适合/不适合人群说明</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="font-medium text-slate-800 mb-2">内容质量检查</p>
                  <ul className="space-y-1 text-xs">
                    <li>✓ 简介不少于100字</li>
                    <li>✓ 不含夸大或虚假宣传</li>
                    <li>✓ 招新时间线完整合理</li>
                    <li>✓ 联系方式有效可达</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
