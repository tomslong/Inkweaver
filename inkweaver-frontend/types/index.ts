// 核心类型定义

// Codex 类型定义
export interface Character {
  entity_type: 'character';
  id: string;
  name: string;
  alias: string[];
  archetype: string;
  personality_profile: {
    traits: string[];
    speech_style: string;
    moral_alignment: string;
  };
  stats: {
    power_level: string;
    skills: string[];
    inventory: string[];
  };
  biography: {
    background: string;
    key_events: string[];
  };
}

export interface WorldRule {
  entity_type: 'world_rule';
  id: string;
  name: string;
  category: 'power_system' | 'geography' | 'history' | 'culture' | string;
  rules: Array<{
    level_name: string;
    limitations: string;
    scarcity?: string;
    transformation?: string;
  }>;
  global_logic: string;
}

export interface PlotSeed {
  entity_type: 'plot_seed';
  id: string;
  name: string;
  description: string;
  status: 'active' | 'resolved' | 'abandoned';
  source_chapter: number;
  trigger_condition: string;
  linked_characters: string[];
}

export type CodexEntity = Character | WorldRule | PlotSeed;

// 大纲类型定义
export interface Volume {
  id: string;
  title: string;
  description: string;
  core_conflict: string;
  ending: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  summary: string;
  beats: Beat[];
  order: number;
}

export interface Beat {
  id: string;
  description: string;
  order: number;
}

// Agent 类型定义
export interface AgentState {
  instruction: string;
  codex_snapshot: Record<string, any>;
  outline: {
    beats: string[];
  };
  draft: string;
  critique: string;
  revision_count: number;
}

export type AgentType = 'director' | 'plotter' | 'writer' | 'editor';

// 书籍类型定义
export interface Book {
  id: string;
  title: string;
  style_profile: {
    sentence_structure: string;
    common_words: string[];
    dialogue_style: string;
  };
  created_at: Date;
  updated_at: Date;
}
