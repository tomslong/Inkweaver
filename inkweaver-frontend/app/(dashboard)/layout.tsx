'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Inkweaver AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              我的书籍
            </Button>
            <Button variant="ghost" size="sm">
              设置
            </Button>
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 py-4">
        {/* 侧边导航 */}
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64">
            <Card className="p-4">
              <nav className="space-y-1">
                <Link href="/codex" className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                  The Codex
                </Link>
                <Link href="/outline" className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                  大纲管理
                </Link>
                <Link href="/editor" className="block py-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-medium">
                  AI编辑器
                </Link>
              </nav>
            </Card>
          </aside>

          {/* 页面内容 */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
