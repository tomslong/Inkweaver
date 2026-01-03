'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { useAppStore } from '@/stores/useAppStore';

const EditorPage = () => {
  const { editorContent, setEditorContent, currentChapter, currentBeat, agentHistory } = useAppStore();
  const [showAgentPanel, setShowAgentPanel] = useState(false);

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI编辑器</h1>
          <p className="text-gray-500">
            {currentChapter && currentBeat 
              ? `编辑：第 ${currentChapter.order} 章 - 情节点 ${currentBeat.order}` 
              : '开始你的创作'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">保存</Button>
          <Button variant="default">发布</Button>
          <Button 
            variant="ghost" 
            onClick={() => setShowAgentPanel(!showAgentPanel)}
          >
            {showAgentPanel ? '隐藏Agent' : '显示Agent'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-${showAgentPanel ? 3 : 4}`}>
          <Card className="h-[calc(100vh-120px)]">
            <CardHeader className="pb-2">
              <CardTitle>写作区</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TipTapEditor 
                initialContent={editorContent} 
                placeholder="开始写作..." 
                onContentChange={handleContentChange}
              />
            </CardContent>
          </Card>
        </div>
        {showAgentPanel && (
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-120px)]">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Agent工作区</span>
                  <Button variant="ghost" size="sm">
                    清空
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {agentHistory.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <p>Agent历史记录为空</p>
                    </div>
                  ) : (
                    agentHistory.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{item.agent}</span>
                          <span className="text-xs text-gray-500">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          {item.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t p-4">
                  <h3 className="text-sm font-medium mb-2">Agent操作</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="default" size="sm">
                      Director
                    </Button>
                    <Button variant="default" size="sm">
                      Plotter
                    </Button>
                    <Button variant="default" size="sm">
                      Writer
                    </Button>
                    <Button variant="default" size="sm">
                      Editor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
