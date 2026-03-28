'use client';

import Link from 'next/link';
import { Club } from '@/data/types';
import ScoreRing from './ScoreRing';

interface ClubCardProps {
  club: Club;
  matchScore?: number;
  matchReasons?: string[];
  isHiddenGem?: boolean;
  showCompare?: boolean;
  onCompare?: (id: string) => void;
  compared?: boolean;
}

export default function ClubCard({ club, matchScore, matchReasons, isHiddenGem, showCompare, onCompare, compared }: ClubCardProps) {
  return (
    <div className="card overflow-hidden group">
      {/* Cover */}
      <div className="h-32 relative" style={{ background: club.cover }}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-3 left-3 flex gap-2">
          {club.verified && (
            <span className="badge bg-white/90 text-emerald-700 text-xs shadow-sm">
              ✓ 校方认证
            </span>
          )}
          {club.popularity === 'hot' && (
            <span className="badge bg-red-500/90 text-white text-xs shadow-sm">🔥 热门</span>
          )}
          {isHiddenGem && (
            <span className="badge bg-amber-500/90 text-white text-xs shadow-sm">💎 宝藏社团</span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 text-3xl drop-shadow-md">{club.logo}</div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
              {club.name}
            </h3>
            <p className="text-sm text-slate-500">{club.slogan}</p>
          </div>
          {matchScore !== undefined && (
            <ScoreRing score={matchScore} size={52} strokeWidth={4} />
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge-primary">{club.category}</span>
          {club.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge bg-slate-50 text-slate-600">{tag}</span>
          ))}
        </div>

        {/* Match reasons */}
        {matchReasons && matchReasons.length > 0 && (
          <div className="mb-3 space-y-1">
            {matchReasons.slice(0, 2).map((reason, i) => (
              <p key={i} className="text-xs text-primary-600 flex items-start gap-1.5">
                <span className="mt-0.5">✦</span>
                <span>{reason}</span>
              </p>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <span>{club.memberCount} 名成员</span>
          <span>·</span>
          <span>{club.activityFrequency}</span>
          <span>·</span>
          <span>周{club.weeklyHours}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/student/club?id=${club.id}`} className="btn-primary flex-1 text-center text-sm py-2">
            查看详情
          </Link>
          {showCompare && (
            <button
              onClick={() => onCompare?.(club.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                compared
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600'
              }`}
            >
              {compared ? '已选' : '对比'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
