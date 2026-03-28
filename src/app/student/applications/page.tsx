'use client';

import Navbar from '@/components/layout/Navbar';
import { mockApplications, statusMap } from '@/data/applications';
import { clubs } from '@/data/clubs';
import Link from 'next/link';

export default function ApplicationsPage() {
  const activeApps = mockApplications.filter(a => !['rejected', 'joined'].includes(a.status));
  const completedApps = mockApplications.filter(a => ['rejected', 'joined'].includes(a.status));

  const upcomingEvents = mockApplications
    .filter(a => a.interviewTime || a.status === 'written_test')
    .map(a => ({
      clubName: a.clubName,
      event: a.status === 'interview' ? `面试：${a.interviewTime}` : '在线笔试待完成',
      location: a.interviewLocation || '',
      notes: a.notes || '',
      urgent: true,
    }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">报名管理</h1>
          <p className="text-slate-500">追踪你所有社团的报名进度，不错过任何重要节点</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <p className="text-3xl font-bold text-primary-600">{mockApplications.length}</p>
            <p className="text-sm text-slate-500">已报名</p>
          </div>
          <div className="stat-card">
            <p className="text-3xl font-bold text-amber-600">{activeApps.length}</p>
            <p className="text-sm text-slate-500">进行中</p>
          </div>
          <div className="stat-card">
            <p className="text-3xl font-bold text-emerald-600">
              {mockApplications.filter(a => a.status === 'joined' || a.status === 'accepted').length}
            </p>
            <p className="text-sm text-slate-500">已录取/加入</p>
          </div>
          <div className="stat-card">
            <p className="text-3xl font-bold text-red-600">
              {mockApplications.filter(a => a.status === 'rejected').length}
            </p>
            <p className="text-sm text-slate-500">未通过</p>
          </div>
        </div>

        {/* Upcoming Events / Reminders */}
        {upcomingEvents.length > 0 && (
          <div className="card p-6 mb-8 border-amber-100 bg-gradient-to-r from-amber-50 to-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">⏰</span>
              <h2 className="font-semibold text-slate-900">待办提醒</h2>
              <span className="badge-amber">{upcomingEvents.length}项待处理</span>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-amber-100">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0 animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{event.clubName} · {event.event}</p>
                    {event.location && <p className="text-xs text-slate-500 mt-0.5">📍 {event.location}</p>}
                    {event.notes && <p className="text-xs text-slate-500 mt-1">💡 {event.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Applications */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg text-slate-900 mb-4">进行中的报名</h2>
          <div className="space-y-4">
            {activeApps.map(app => {
              const club = clubs.find(c => c.id === app.clubId);
              const status = statusMap[app.status];
              return (
                <div key={app.id} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {club && <span className="text-2xl">{club.logo}</span>}
                      <div>
                        <Link href={`/student/club?id=${app.clubId}`} className="font-semibold text-slate-900 hover:text-primary-600">
                          {app.clubName}
                        </Link>
                        <p className="text-xs text-slate-500">报名时间：{app.appliedAt}</p>
                      </div>
                    </div>
                    <span className={`badge ${status.bgColor} ${status.color}`}>{status.label}</span>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-0 overflow-x-auto pb-2">
                    {app.timeline.map((step, i) => (
                      <div key={i} className="flex items-center min-w-0">
                        <div className="flex flex-col items-center min-w-[80px]">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                            step.status === 'done' ? 'bg-emerald-500' :
                            step.status === 'current' ? 'bg-primary-500 ring-4 ring-primary-100' :
                            'bg-slate-200'
                          }`} />
                          <p className={`text-xs mt-1.5 text-center ${
                            step.status === 'current' ? 'text-primary-600 font-medium' : 'text-slate-400'
                          }`}>
                            {step.event}
                          </p>
                          <p className="text-xs text-slate-300">{step.date}</p>
                        </div>
                        {i < app.timeline.length - 1 && (
                          <div className={`w-8 h-0.5 flex-shrink-0 ${
                            step.status === 'done' ? 'bg-emerald-200' : 'bg-slate-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {app.notes && (
                    <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                      <p className="text-xs text-blue-700">💡 {app.notes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed */}
        {completedApps.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg text-slate-900 mb-4">已结束</h2>
            <div className="space-y-3">
              {completedApps.map(app => {
                const club = clubs.find(c => c.id === app.clubId);
                const status = statusMap[app.status];
                return (
                  <div key={app.id} className="card p-4 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-3">
                      {club && <span className="text-xl">{club.logo}</span>}
                      <div>
                        <p className="font-medium text-slate-700">{app.clubName}</p>
                        <p className="text-xs text-slate-400">{app.appliedAt}</p>
                      </div>
                    </div>
                    <span className={`badge ${status.bgColor} ${status.color}`}>{status.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="card p-6 mt-8 bg-slate-50 border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">招新小贴士</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <span className="text-primary-500">💡</span>
              <span>建议同时报名2-3个社团，避免只报一个导致落选后没有选择</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-500">💡</span>
              <span>注意各社团的面试时间是否冲突，提前做好时间规划</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-500">💡</span>
              <span>面试前可以在社团详情页查看面试形式和常见问题</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-500">💡</span>
              <span>如果被拒也不要气馁，很多社团下学期还会补招</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
