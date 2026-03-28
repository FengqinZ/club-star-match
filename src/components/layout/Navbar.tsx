'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isStudent = pathname.startsWith('/student');
  const isClub = pathname.startsWith('/club');
  const isAdmin = pathname.startsWith('/admin');

  const roleColor = isClub ? 'from-teal-600 to-teal-500' : isAdmin ? 'from-slate-700 to-slate-600' : 'from-primary-600 to-primary-500';

  const studentLinks = [
    { href: '/student/match', label: 'AI推荐' },
    { href: '/student/discover', label: '发现社团' },
    { href: '/student/compare', label: '对比' },
    { href: '/student/advisor', label: 'AI顾问' },
    { href: '/student/applications', label: '报名管理' },
  ];

  const currentLinks = isStudent ? studentLinks : isClub ? [
    { href: '/club/dashboard', label: '招新管理' },
  ] : isAdmin ? [
    { href: '/admin/dashboard', label: '管理后台' },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${roleColor} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                星
              </div>
              <span className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">社团星图</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {currentLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isStudent && (
              <Link href="/student/profile" className="btn-secondary text-sm py-2">
                我的画像
              </Link>
            )}
            <div className="flex items-center gap-2">
              {!isStudent && (
                <Link href="/student/match" className="btn-ghost text-sm">新生端</Link>
              )}
              {!isClub && (
                <Link href="/club/dashboard" className="btn-ghost text-sm">社团端</Link>
              )}
              {!isAdmin && (
                <Link href="/admin/dashboard" className="btn-ghost text-sm">校方端</Link>
              )}
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100 mt-2 pt-3">
            <div className="flex flex-col gap-1">
              {currentLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === link.href ? 'text-primary-700 bg-primary-50' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 mt-2 pt-2 flex gap-2">
                <Link href="/student/match" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm flex-1 text-center">新生端</Link>
                <Link href="/club/dashboard" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm flex-1 text-center">社团端</Link>
                <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm flex-1 text-center">校方端</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
