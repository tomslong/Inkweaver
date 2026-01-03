import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to Inkweaver AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600 dark:text-gray-300">
            一款面向网文作者的生产力工具，由多个 AI 专家（Agent）组成的“虚拟工作室”，
            能够从大纲推演、设定固化到正文执笔进行全流程协同。
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/codex">
              <Button variant="default" size="lg">
                进入工作台
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">The Codex</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                管理人物卡、世界观规则和伏笔因果链
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">级联式大纲推演</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                从卷纲到章纲再到节纲的三级推演
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">多Agent协同执笔</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                总编、编剧、执笔、审核多Agent协同工作
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
