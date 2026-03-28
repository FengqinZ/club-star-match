'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ScoreRing from '@/components/ui/ScoreRing';
import { clubs } from '@/data/clubs';
import { mockApplicants } from '@/data/applications';

const club = clubs[0]; // 科创工坊 as demo

export default function ClubDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'applicants' | 'edit'>('overview');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredApplicants = filterStatus === 'all'
    ? mockApplicants
    : mockApplicants.filter(a => a.status === filterStatus);

  const statusCounts = {
    all: mockApplicants.length,
    submitted: mockApplicants.filter(a => a.status === 'submitted').length,
    reviewing: mockApplicants.filter(a => a.status === 'reviewing').length,
    interview: mockApplicants.filter(a => a.status === 'interview').length,
    accepted: mockApplicants.filter(a => a.status === 'accepted').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: club.cover }}>
              {club.logo}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{club.name} · 招新后台</h1>
              <p className="text-slate-500 text-sm">管理招新信息、查看报名者、筛选候选人</p>
            </div>
          </div>
          <span className="badge-green">✓ 已认证</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-slate-200">
          {[
            { key: 'overview', label: '数据概览' },
            { key: 'applicants', label: '报名者管理' },
            { key: 'edit', label: '招新信息编辑' },
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
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat-card">
                <p className="text-3xl font-bold text-primary-600">{mockApplicants.length}</p>
                <p className="text-sm text-slate-500">总报名数</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-amber-600">{statusCounts.reviewing + statusCounts.submitted}</p>
                <p className="text-sm text-slate-500">待处理</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-emerald-600">{statusCounts.accepted}</p>
                <p className="text-sm text-slate-500">已录取</p>
              </div>
              <div className="stat-card">
                <p className="text-3xl font-bold text-slate-700">83</p>
                <p className="text-sm text-slate-500">平均匹配度</p>
              </div>
            </div>

            {/* Match Distribution */}
            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">报名者匹配度分布</h2>
              <div className="space-y-3">
                {[
                  { range: '90-100', count: 2, color: 'bg-emerald-500', percent: 25 },
                  { range: '80-89', count: 3, color: 'bg-primary-500', percent: 37.5 },
                  { range: '70-79', count: 2, color: 'bg-amber-500', percent: 25 },
                  { range: '60-69', count: 1, color: 'bg-slate-400', percent: 12.5 },
                ].map(item => (
                  <div key={item.range} className="flex items-center gap-4">
                    <span className="text-sm text-slate-600 w-16">{item.range}分</span>
                    <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full progress-fill flex items-center justify-end pr-2`}
                        style={{ width: `${item.percent}%` }}
                      >
                        <span className="text-xs text-white font-medium">{item.count}人</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">近期动态</h2>
              <div className="space-y-3">
                {[
                  { time: '2小时前', event: '张明远 完成面试', type: 'interview' },
                  { time: '5小时前', event: '孙晓彤 被标记为「已录取」', type: 'accepted' },
                  { time: '昨天', event: '收到 3 份新报名', type: 'new' },
                  { time: '2天前', event: '吴梦琳 进入面试阶段', type: 'interview' },
                  { time: '3天前', event: '招新信息审核通过', type: 'system' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-slate-400 w-20 text-xs">{item.time}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'accepted' ? 'bg-emerald-500' :
                      item.type === 'interview' ? 'bg-blue-500' :
                      item.type === 'new' ? 'bg-primary-500' :
                      'bg-slate-400'
                    }`} />
                    <span className="text-slate-700">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === 'applicants' && (
          <div>
            {/* Filters */}
            <div className="flex gap-2 mb-6">
              {[
                { key: 'all', label: `全部 (${statusCounts.all})` },
                { key: 'submitted', label: `待审核 (${statusCounts.submitted})` },
                { key: 'reviewing', label: `审核中 (${statusCounts.reviewing})` },
                { key: 'interview', label: `待面试 (${statusCounts.interview})` },
                { key: 'accepted', label: `已录取 (${statusCounts.accepted})` },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === f.key
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Applicants List */}
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left p-4 text-sm font-medium text-slate-500">报名者</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">兴趣方向</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-500">匹配度</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">技能</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">目标</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-500">状态</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map(applicant => (
                    <tr key={applicant.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{applicant.avatar}</span>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{applicant.name}</p>
                            <p className="text-xs text-slate-400">{applicant.appliedAt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {applicant.interests.slice(0, 2).map(i => (
                            <span key={i} className="badge bg-slate-50 text-slate-600 text-xs">{i}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <ScoreRing score={applicant.matchScore} size={40} strokeWidth={3} />
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {applicant.skills.slice(0, 2).map(s => (
                            <span key={s} className="badge-primary text-xs">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-xs text-slate-600">{applicant.goals.join('、')}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`badge ${
                          applicant.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' :
                          applicant.status === 'interview' ? 'bg-blue-50 text-blue-700' :
                          applicant.status === 'reviewing' ? 'bg-amber-50 text-amber-700' :
                          'bg-slate-50 text-slate-600'
                        }`}>
                          {applicant.status === 'accepted' ? '已录取' :
                           applicant.status === 'interview' ? '待面试' :
                           applicant.status === 'reviewing' ? '审核中' : '待审核'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                          查看详情
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Tab */}
        {activeTab === 'edit' && (
          <div className="max-w-3xl space-y-6">
            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">基本信息</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">社团名称</label>
                  <input type="text" defaultValue={club.name} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">一句话介绍</label>
                  <input type="text" defaultValue={club.slogan} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">社团简介</label>
                  <textarea defaultValue={club.description} rows={4} className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">类别</label>
                    <select defaultValue={club.category} className="input-field">
                      <option>科技</option><option>学术</option><option>文艺</option>
                      <option>体育</option><option>公益</option><option>创业</option><option>媒体</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">成员人数</label>
                    <input type="number" defaultValue={club.memberCount} className="input-field" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">招新设置</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">活动频率</label>
                  <input type="text" defaultValue={club.activityFrequency} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">每周时间投入</label>
                  <input type="text" defaultValue={club.weeklyHours} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">招新要求</label>
                  <textarea defaultValue={club.recruitRequirement} rows={2} className="input-field" />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" defaultChecked={club.hasInterview} className="rounded border-slate-300" />
                    需要面试
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" defaultChecked={club.hasTrial} className="rounded border-slate-300" />
                    有试训期
                  </label>
                </div>
                {club.hasInterview && (
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">面试形式</label>
                    <input type="text" defaultValue={club.interviewForm} className="input-field" />
                  </div>
                )}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4">适合人群</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">适合什么样的人（每行一条）</label>
                  <textarea defaultValue={club.suitableFor.join('\n')} rows={4} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">不太适合（每行一条）</label>
                  <textarea defaultValue={club.notSuitableFor.join('\n')} rows={3} className="input-field" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn-secondary">取消</button>
              <button className="btn-primary">保存并提交审核</button>
            </div>

            <p className="text-xs text-slate-400 text-center">
              提交后将由校方审核，审核通过后信息将更新到平台。标准化字段确保新生获得一致的决策信息。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
