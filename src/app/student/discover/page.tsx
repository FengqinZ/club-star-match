'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ClubCard from '@/components/ui/ClubCard';
import { clubs, categories } from '@/data/clubs';

export default function DiscoverPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('全部');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [interviewFilter, setInterviewFilter] = useState('');
  const [compareList, setCompareList] = useState<string[]>([]);

  const filtered = clubs.filter(club => {
    if (search && !club.name.includes(search) && !club.tags.some(t => t.includes(search)) && !club.description.includes(search)) return false;
    if (category !== '全部' && club.category !== category) return false;
    if (interviewFilter === '无面试' && club.hasInterview) return false;
    if (interviewFilter === '有面试' && !club.hasInterview) return false;
    return true;
  });

  const toggleCompare = (id: string) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">发现社团</h1>
            <p className="text-slate-500 text-sm">浏览全部 {clubs.length} 个入驻社团</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-primary-50 text-primary-600' : 'text-slate-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-slate-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索社团名称、标签或关键词..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field"
              />
            </div>
            <select
              value={interviewFilter}
              onChange={e => setInterviewFilter(e.target.value)}
              className="input-field w-full md:w-40"
            >
              <option value="">面试要求</option>
              <option value="无面试">无需面试</option>
              <option value="有面试">需面试</option>
            </select>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="card p-4 mb-6 flex items-center justify-between bg-primary-50 border-primary-100">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-primary-700">
                已选 {compareList.length}/3 个社团对比
              </span>
              <div className="flex gap-2">
                {compareList.map(id => {
                  const club = clubs.find(c => c.id === id);
                  return club ? (
                    <span key={id} className="badge-primary flex items-center gap-1">
                      {club.logo} {club.name}
                      <button onClick={() => toggleCompare(id)} className="ml-1 hover:text-red-500">×</button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            <a
              href={`/student/compare?ids=${compareList.join(',')}`}
              className="btn-primary text-sm py-2"
            >
              开始对比
            </a>
          </div>
        )}

        {/* Results */}
        <div className="mb-4 text-sm text-slate-400">
          共 {filtered.length} 个社团
        </div>

        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(club => (
              <ClubCard
                key={club.id}
                club={club}
                showCompare
                onCompare={toggleCompare}
                compared={compareList.includes(club.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(club => (
              <a key={club.id} href={`/student/club?id=${club.id}`} className="card p-4 flex items-center gap-4 hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: club.cover }}>
                  {club.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{club.name}</h3>
                    <span className="badge-primary text-xs">{club.category}</span>
                    {club.verified && <span className="badge-green text-xs">✓ 认证</span>}
                  </div>
                  <p className="text-sm text-slate-500 truncate">{club.slogan}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400 flex-shrink-0">
                  <span>{club.memberCount}人</span>
                  <span>{club.weeklyHours}/周</span>
                  <span>{club.hasInterview ? '需面试' : '免面试'}</span>
                </div>
                <button
                  onClick={e => { e.preventDefault(); toggleCompare(club.id); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex-shrink-0 ${
                    compareList.includes(club.id) ? 'bg-primary-50 border-primary-200 text-primary-600' : 'border-slate-200 text-slate-400'
                  }`}
                >
                  {compareList.includes(club.id) ? '已选' : '对比'}
                </button>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
