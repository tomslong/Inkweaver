'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { CodexEntityCard } from '@/components/codex/CodexEntityCard';
import { useAppStore } from '@/stores/useAppStore';
import { CodexEntity } from '@/types';

const CodexPage = () => {
  const { codexEntities, addCodexEntity, updateCodexEntity, deleteCodexEntity } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [entityType, setEntityType] = useState<'all' | 'character' | 'world_rule' | 'plot_seed'>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingEntity, setEditingEntity] = useState<CodexEntity | null>(null);

  const filteredEntities = codexEntities.filter((entity) => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = entityType === 'all' || entity.entity_type === entityType;
    return matchesSearch && matchesType;
  });

  const handleAddEntity = () => {
    // 这里将在后续实现添加实体的功能
    // 暂时关闭对话框
    setShowAddDialog(false);
  };

  const handleEditEntity = (entity: CodexEntity) => {
    setEditingEntity(entity);
    // 这里将在后续实现编辑实体的功能
  };

  const handleDeleteEntity = (entityId: string) => {
    deleteCodexEntity(entityId);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">The Codex</h1>
          <p className="text-gray-500">管理你的小说设定集</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          添加实体
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="搜索实体..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={entityType} onValueChange={(value) => setEntityType(value as any)}>
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="选择实体类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有类型</SelectItem>
            <SelectItem value="character">人物</SelectItem>
            <SelectItem value="world_rule">世界观规则</SelectItem>
            <SelectItem value="plot_seed">伏笔</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntities.map((entity) => (
          <CodexEntityCard
            key={entity.id}
            entity={entity}
            onEdit={handleEditEntity}
            onDelete={handleDeleteEntity}
          />
        ))}
        {filteredEntities.length === 0 && (
          <Card className="col-span-full p-8 text-center">
            <p className="text-gray-500">没有找到匹配的实体</p>
            <Button onClick={() => setShowAddDialog(true)} className="mt-4">
              添加第一个实体
            </Button>
          </Card>
        )}
      </div>

      {/* 添加实体对话框 */}
      {/* 这里将在后续实现完整的对话框功能 */}
    </div>
  );
};

export default CodexPage;
