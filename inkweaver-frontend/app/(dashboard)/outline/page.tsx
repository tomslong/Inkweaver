'use client';

import { OutlineTree } from '@/components/outline/OutlineTree';
import { useAppStore } from '@/stores/useAppStore';

const OutlinePage = () => {
  const { volumes } = useAppStore();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">级联式大纲推演</h1>
          <p className="text-gray-500">管理你的小说大纲结构</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <OutlineTree volumes={volumes} />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">大纲详情</h2>
            <p className="text-gray-500">点击左侧大纲树中的项目查看详情</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlinePage;
