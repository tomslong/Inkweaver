'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CodexEntity, Character, WorldRule, PlotSeed } from '@/types';
import { useAppStore } from '@/stores/useAppStore';

interface CodexEntityCardProps {
  entity: CodexEntity;
  onEdit: (entity: CodexEntity) => void;
  onDelete: (entityId: string) => void;
}

export function CodexEntityCard({
  entity,
  onEdit,
  onDelete,
}: CodexEntityCardProps) {
  const { deleteCodexEntity } = useAppStore();

  const handleDelete = () => {
    deleteCodexEntity(entity.id);
    onDelete(entity.id);
  };

  const renderEntityContent = () => {
    switch (entity.entity_type) {
      case 'character': {
        const char = entity as Character;
        return (
          <div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">基本信息</h4>
              <p className="text-sm">别名：{char.alias.join(', ') || '无'}</p>
              <p className="text-sm">类型：{char.archetype}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">性格特征</h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {char.personality_profile.traits.map((trait, index) => (
                  <Badge key={index} variant="secondary">{trait}</Badge>
                ))}
              </div>
              <p className="text-sm">语言风格：{char.personality_profile.speech_style}</p>
              <p className="text-sm">道德 alignment：{char.personality_profile.moral_alignment}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">能力状态</h4>
              <p className="text-sm">实力等级：{char.stats.power_level}</p>
              <div className="mb-2">
                <span className="text-sm font-medium">技能：</span>
                <div className="flex flex-wrap gap-1">
                  {char.stats.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">物品：</span>
                <div className="flex flex-wrap gap-1">
                  {char.stats.inventory.map((item, index) => (
                    <Badge key={index} variant="outline">{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">背景故事</h4>
              <p className="text-sm">{char.biography.background}</p>
              <div className="mt-2">
                <span className="text-sm font-medium">关键事件：</span>
                <ul className="list-disc list-inside text-sm mt-1">
                  {char.biography.key_events.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }
      case 'world_rule': {
        const rule = entity as WorldRule;
        return (
          <div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">规则类型</h4>
              <Badge variant="default">{rule.category}</Badge>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">具体规则</h4>
              {rule.rules.map((r, index) => (
                <div key={index} className="mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <h5 className="font-medium">{r.level_name}</h5>
                  <p className="text-sm">限制：{r.limitations}</p>
                  {r.scarcity && <p className="text-sm">稀有度：{r.scarcity}</p>}
                  {r.transformation && <p className="text-sm">变化：{r.transformation}</p>}
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2">全局逻辑</h4>
              <p className="text-sm">{rule.global_logic}</p>
            </div>
          </div>
        );
      }
      case 'plot_seed': {
        const seed = entity as PlotSeed;
        return (
          <div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">状态</h4>
              <Badge variant={seed.status === 'active' ? 'default' : seed.status === 'resolved' ? 'secondary' : 'destructive'}>
                {seed.status}
              </Badge>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">触发条件</h4>
              <p className="text-sm">{seed.trigger_condition}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">来源章节</h4>
              <p className="text-sm">第 {seed.source_chapter} 章</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">关联人物</h4>
              <div className="flex flex-wrap gap-1">
                {seed.linked_characters.map((char, index) => (
                  <Badge key={index} variant="outline">{char}</Badge>
                ))}
              </div>
            </div>
          </div>
        );
      }
      default:
        return <div>未知实体类型</div>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{entity.name}</CardTitle>
            <CardDescription>
              {entity.entity_type === 'character' && '人物卡'}
              {entity.entity_type === 'world_rule' && '世界观规则'}
              {entity.entity_type === 'plot_seed' && '伏笔'}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <span className="sr-only">打开菜单</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>操作</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(entity)}>
                编辑
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {renderEntityContent()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="outline">{entity.entity_type}</Badge>
        <Button variant="default" size="sm" onClick={() => onEdit(entity)}>
          编辑详情
        </Button>
      </CardFooter>
    </Card>
  );
}
