'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume, Chapter, Beat } from '@/types';
import { useAppStore } from '@/stores/useAppStore';

interface OutlineTreeProps {
  volumes: Volume[];
}

export function OutlineTree({ volumes }: OutlineTreeProps) {
  const { 
    setCurrentVolume, 
    setCurrentChapter, 
    setCurrentBeat, 
    addChapter, 
    addBeat, 
    updateVolume, 
    updateChapter, 
    updateBeat, 
    deleteVolume, 
    deleteChapter, 
    deleteBeat 
  } = useAppStore();

  const [expandedVolumes, setExpandedVolumes] = useState<Record<string, boolean>>({});
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<{
    type: 'volume' | 'chapter' | 'beat';
    id: string;
    content: string;
  } | null>(null);

  const toggleVolumeExpansion = (volumeId: string) => {
    setExpandedVolumes(prev => ({
      ...prev,
      [volumeId]: !prev[volumeId]
    }));
  };

  const toggleChapterExpansion = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleVolumeClick = (volume: Volume) => {
    setCurrentVolume(volume);
    setCurrentChapter(null);
    setCurrentBeat(null);
  };

  const handleChapterClick = (volume: Volume, chapter: Chapter) => {
    setCurrentVolume(volume);
    setCurrentChapter(chapter);
    setCurrentBeat(null);
  };

  const handleBeatClick = (volume: Volume, chapter: Chapter, beat: Beat) => {
    setCurrentVolume(volume);
    setCurrentChapter(chapter);
    setCurrentBeat(beat);
  };

  const handleAddChapter = (volumeId: string) => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: '新章节',
      summary: '',
      beats: [],
      order: 0
    };
    addChapter(volumeId, newChapter);
  };

  const handleAddBeat = (volumeId: string, chapterId: string) => {
    const newBeat: Beat = {
      id: `beat-${Date.now()}`,
      description: '新情节点',
      order: 0
    };
    addBeat(volumeId, chapterId, newBeat);
  };

  return (
    <div className="w-full h-full overflow-auto">
      <Card className="h-full">
        <CardHeader className="border-b">
          <CardTitle className="flex justify-between items-center">
            <span>大纲结构</span>
            <Button variant="ghost" size="sm">
              添加卷纲
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {volumes.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>暂无大纲</p>
              <Button variant="default" size="sm" className="mt-2">
                创建第一个卷纲
              </Button>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {volumes.map(volume => (
                <div key={volume.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleVolumeExpansion(volume.id)}
                    >
                      {expandedVolumes[volume.id] ? '▼' : '▶'}
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-left font-semibold"
                      onClick={() => handleVolumeClick(volume)}
                    >
                      卷：{volume.title}
                    </Button>
                    <div className="ml-auto flex gap-1">
                      <Button variant="ghost" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  {expandedVolumes[volume.id] && (
                    <div className="pl-6 space-y-2">
                      {volume.chapters.map(chapter => (
                        <div key={chapter.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleChapterExpansion(chapter.id)}
                            >
                              {expandedChapters[chapter.id] ? '▼' : '▶'}
                            </Button>
                            <Button
                              variant="ghost"
                              className="justify-start text-left"
                              onClick={() => handleChapterClick(volume, chapter)}
                            >
                              第 {chapter.order} 章：{chapter.title}
                            </Button>
                            <div className="ml-auto flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleAddBeat(volume.id, chapter.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 5v14" />
                                  <path d="M5 12h14" />
                                </svg>
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 6 6 18" />
                                  <path d="m6 6 12 12" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                          {expandedChapters[chapter.id] && (
                            <div className="pl-6 space-y-1">
                              {chapter.beats.map(beat => (
                                <div key={beat.id} className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    className="justify-start text-left text-sm"
                                    onClick={() => handleBeatClick(volume, chapter, beat)}
                                  >
                                    情节点 {beat.order}：{beat.description}
                                  </Button>
                                  <div className="ml-auto flex gap-1">
                                    <Button variant="ghost" size="icon" className="text-red-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                      </svg>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start pl-8 text-sm text-gray-500"
                                onClick={() => handleAddBeat(volume.id, chapter.id)}
                              >
                                + 添加情节点
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start pl-6 text-sm text-gray-500"
                        onClick={() => handleAddChapter(volume.id)}
                      >
                        + 添加章节
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
