📖 Inkweaver AI (墨织) - 需求与架构设计文档 (PRD)
1. 项目概述
Inkweaver AI 是一款面向网文作者的生产力工具。它不仅是简单的文本生成器，而是一个由多个 AI 专家（Agent）组成的“虚拟工作室”，能够从大纲推演、设定固化到正文执笔进行全流程协同。

---
2. 技术栈配置 (Tech Stack)
2.1 后端 (核心逻辑层)
- 语言: Python 3.11+
- Agent 框架: LangGraph (首选)
  - 选型理由: 创作小说需要频繁的“回溯”与“修正”，LangGraph 的循环图结构能完美处理“审核不通过重写”的逻辑。
- API 框架: FastAPI
- 大模型 (LLM): * 推理/大纲层: Claude 3.5 Sonnet (逻辑最严密，文风最细腻)。
  - 长文本/低成本层: DeepSeek V3 (对中文网文语境理解极佳，性价比极高)。
  - 向量化层: OpenAI text-embedding-3-small。
2.2 存储与检索 (数据层)
- 主数据库: PostgreSQL (搭配 pgvector 插件)
  - 作用: 存储章节内容、用户数据、人物卡、势力分布图。
- 缓存与消息队列: Redis
  - 作用: 存储 Agent 运行过程中的临时中间状态。
- 文件存储: MinIO 或 S3 (存储生成的插图、导出的 PDF/Epub)。
2.3 前端 (交互层)
- 框架: Next.js 14+ (App Router)
- 编辑器: TipTap (高度可定制，方便集成“AI 划词重写”功能)
- 状态管理: Zustand
- UI 组件: Shadcn UI + Tailwind CSS

---
3. 核心功能需求
3.1 世界观/设定集 (The Codex)
- 人物卡管理: 自动提取并存储性格、外貌、功法、好感度。
- 设定一致性扫描: 在生成新剧情时，自动检测是否与 Codex 中的设定冲突（如：等级设定、地理位置）。
3.2 级联式大纲推演 (Cascading Outlining)
- 三级推演: 1.  卷纲: 定义本卷核心冲突与结局。 2.  章纲: 将卷纲拆分为具体的 20-30 章梗概。 3.  节纲: 每章细化为 3-5 个情节点（Beats）。
3.3 多 Agent 协同执笔
- 自动扩写: 根据节纲生成 2000-3000 字的正文。
- 文风克隆: 用户上传 10,000 字自己的样章，AI 自动提取语言风格（人称、常用词、对话节奏）。

---
4. 系统架构逻辑 (System Architecture)
4.1 多智能体工作流 (Agentic Workflow)
系统采用 Director-Worker 模式：
1. Director Agent (总编): 接收用户指令，调度资源，维持主线剧情不跑偏。
2. Plotter Agent (编剧): 负责逻辑推理。在写新章节前，先去 Vector DB 检索前文伏笔。
3. Writer Agent (执笔): 负责文学性输出。它只看 Plotter 给出的精细节纲，专注于词藻和描写。
4. Editor Agent (审核): 负责“挑刺”。检查逻辑漏洞、敏感词、毒点，如果不合格，则触发 LangGraph 节点回溯，要求 Writer 重写。
4.2 记忆模型 (Memory Architecture)
- 短期记忆 (Short-term): 当前处理章节的上下文（Window Memory）。
- 中期记忆 (Mid-term): 最近 5-10 章的摘要（Summary Buffer）。
- 长期记忆 (Long-term): 基于 RAG 的全书设定集查询。

---
5. 数据流图 (Data Flow)
1. 输入端: 用户在 Next.js 前端输入情节灵感。
2. 处理端:  FastAPI 接收请求，触发 LangGraph。
  - Agent 调用 pgvector 检索相关背景设定。
  - LLM 开始流式生成（Server-Sent Events），实时反馈给前端。
3. 存储端: 生成完成后，自动触发“设定提取器”，将新出现的人物/法宝更新至 Codex。

---
6. 项目演进建议 (Roadmap)
- Phase 1 (MVP): 实现基础的 Markdown 编辑器 + 基于单 Agent 的章节扩写。
- Phase 2 (Agentic): 引入 LangGraph，实现“总编-执笔-审核”的多 Agent 协同。
- Phase 3 (Ecosystem): 增加 AI 绘图 Agent (Midjourney API) 为章节自动配图，支持一键导出网文平台格式。
📜 Inkweaver Codex：核心设定集元数据设计 (Schema)
7. 人物实体建模 (Character Entity)
人物是小说的灵魂。传统的标签式存储不足以支撑 AI 模拟人物性格，我们需要“维度化”建模。
{
  "entity_type": "character",
  "identity": {
    "name": "韩立",
    "alias": ["厉飞雨", "韩跑跑"],
    "archetype": "稳健型主角" 
  },
  "personality_profile": {
    "traits": ["谨慎", "利己主义", "低调"],
    "speech_style": "言简意赅，多用反问句，习惯性自称‘在下’",
    "moral_alignment": "绝对中立"
  },
  "stats": {
    "power_level": "筑基初期",
    "skills": ["青元剑诀", "罗烟步"],
    "inventory": ["掌天瓶", "金蚨子母刃"]
  },
  "biography": {
    "background": "山村穷小子，误入七玄门",
    "key_events": ["血色禁地收割者", "乱星海第一战"]
  }
}
8. 世界观规则建模 (World-Building Rules)
网文中最忌讳的是“战力系统崩坏”。我们需要为 AI 设定刚性的物理限制。
{
  "entity_type": "world_rule",
  "category": "power_system",
  "rules": [
    {
      "level_name": "练气期",
      "limitations": "无法飞行，法力储备仅够支撑三枚火弹术",
      "scarcity": "平庸之辈占90%"
    },
    {
      "level_name": "筑基期",
      "limitations": "可御器飞行，寿元翻倍至两百岁",
      "transformation": "灵气液化"
    }
  ],
  "global_logic": "能量守恒：任何大招必有冷却时间或反噬"
}
9. 伏笔与因果链建模 (Plot Seeds & Causality)
这是解决 AI “记性差”的关键。
{
  "entity_type": "plot_seed",
  "seed_id": "ps_001",
  "description": "主角在坊市购买的残破古籍中藏有一张藏宝图",
  "status": "active", // 可选: active (活跃), resolved (已回收), abandoned (已废弃)"source_chapter": 12,
  "trigger_condition": "当主角进入‘天南禁地’时自动检索本条",
  "linked_characters": ["墨大夫"]
}

---
Codex 系统运行架构 (Logic Flow)
1 自动同步机制 (Auto-Sync)
当 Writer Agent 完成一章后，Editor Agent 会执行一个专门的 Update_Codex 任务：
1. 扫描: “本章是否出现了新物品？” -> 发现“聚灵丹”。
2. 提取: 提取属性信息。
3. 写入: 将“聚灵丹”自动加入主角的 inventory 列表。
2 冲突检测机制 (Conflict Detection)
在写新章节前，Plotter Agent 会发起一个查询请求：
- 输入: “主角准备使用瞬移术逃跑。”
- Codex 检索: 检索人物 stats 下的 skills。
- 冲突反馈: “警告：主角目前等级（练气期）无法使用瞬移术。”
- 指令: 修正为“主角使用轻功快速撤离”。

---


🚲核心工作流的伪代码实现
import operator
from typing import Annotated, List, TypedDict, Union
from langgraph.graph import StateGraph, END

# 1. 定义全局状态（接力棒）
class AgentState(TypedDict):
    instruction: str            # 用户初始指令
    codex_snapshot: dict        # 从数据库调取的设定
    outline: dict               # Plotter生成的节纲
    draft: str                  # Writer生成的正文
    critique: str               # Editor的修改意见
    revision_count: int         # 迭代次数

# 2. 定义节点函数 (Nodes)
def director_node(state: AgentState):
    """总编：分析指令，调取Codex"""
    # 模拟检索数据库逻辑
    snapshot = {"protagonist": "韩立", "level": "筑基", "location": "乱星海"}
    return {"codex_snapshot": snapshot, "revision_count": 0}

def plotter_node(state: AgentState):
    """编剧：生成细化节纲"""
    # 调用 LLM (如 Claude 3.5) 生成 JSON 节纲
    outline = {"beats": ["潜入禁地", "遭遇傀儡", "智取灵草"]}
    return {"outline": outline}

def writer_node(state: AgentState):
    """执笔：扩写正文"""
    # 根据 outline 和 codex_snapshot 生成正文
    draft = "韩立化作一道青烟，无声无息地落在了禁地入口..."
    return {"draft": draft}

def editor_node(state: AgentState):
    """校对：逻辑审核"""
    # 检查是否有Bug。如果有，返回建议；如果没有，通过。
    if "瞬移" in state["draft"] and state["codex_snapshot"]["level"] == "筑基":
        return {"critique": "逻辑错误：筑基期无法瞬移，请修改。"}
    return {"critique": "PASS"}

# 3. 定义路由逻辑 (Conditional Edges)
def should_continue(state: AgentState):
    if state["critique"] == "PASS" or state["revision_count"] > 3:
        return "end"
    return "rewrite"

# 4. 构建图 (Graph Construction)
workflow = StateGraph(AgentState)

# 添加节点
workflow.add_node("director", director_node)
workflow.add_node("plotter", plotter_node)
workflow.add_node("writer", writer_node)
workflow.add_node("editor", editor_node)

# 设置入口
workflow.set_entry_point("director")

# 编排连线
workflow.add_edge("director", "plotter")
workflow.add_edge("plotter", "writer")
workflow.add_edge("writer", "editor")

# 设置条件循环：审核不通过就回滚到 plotter 重新设计逻辑
workflow.add_conditional_edges(
    "editor",
    should_continue,
    {
        "rewrite": "plotter",
        "end": END
    }
)

# 编译运行
app = workflow.compile()
开发建议
1. 差异化模型配置 (Model Routing)
不要所有的节点都用同一个模型。
- Director & Editor: 必须用最聪明的模型（如 Claude 3.5 Sonnet），因为它们负责逻辑。
- Writer: 可以选择文风最华丽或对中文网文训练最深的模型（如 DeepSeek V3 或 GPT-4o）。
2. “流式”用户体验 (Streaming UI)
在 Writer 节点工作时，要使用 FastAPI 的 StreamingResponse。让用户看到 AI 是一行行把小说“打印”出来的，这种沉浸感对写作者非常重要。
3. 手动干预点 (Breakpoints)
在 LangGraph 中，你可以设置 Interrupt（中断）。
大师建议： 在 plotter 节点执行完后强制暂停，将节纲推给前端页面。用户点击“满意，开始执笔”后，Agent 才会继续运行。这能避免 AI 浪费 Token 去写一段用户根本不喜欢的情节。
4. 后端技术配置建议
- 数据库: 使用 PostgreSQL 15+。将这些 JSON 存入 JSONB 字段。
- 索引: 在 JSONB 上建立 GIN 索引，确保查询人物属性的速度达到毫秒级。
- 向量化: 将 personality_profile 和 biography 进行 Embedding（向量化），存入 pgvector。
  - 用途: 当用户问“主角为什么这么做？”时，Agent 能通过语义检索快速找到性格依据。

架构图：
[图片]
Plotter Agent 的级联结构
stateDiagram-v2
    [*] --> Volume_Planning: 触发“新卷”创作
    
    state Volume_Planning {
        [*] --> Define_Conflict: 定义本卷核心矛盾
        Define_Conflict --> Set_Ending: 确定卷终大事件(Climax)
        Set_Ending --> Volume_Codex_Check: 校验世界观兼容性
        Volume_Codex_Check --> Volume_Approved: 卷纲定稿
    }

    Volume_Approved --> Chapter_Batch_Generation: 级联下行

    state Chapter_Batch_Generation {
        [*] --> Split_Chapters: 拆分为 20-30 个章节梗概
        Split_Chapters --> Plot_Pacing_Check: 节奏检查(起承转合)
        Plot_Pacing_Check --> Chapter_Approved: 章纲存入数据库
    }

    Chapter_Approved --> Beat_Refinement: 创作当前章

    state Beat_Refinement {
        [*] --> Fetch_Chapter_Summary: 提取当前章梗概
        Fetch_Chapter_Summary --> Generate_Beats: 细化为 3-5 个情节点(Beats)
        Generate_Beats --> Logic_Gate: 逻辑/伏笔校验
        Logic_Gate --> Ready_to_Write: 节纲就绪(送往Writer)
    }

    Ready_to_Write --> [*]: 进入执笔节点




🗄️ Inkweaver 项目核心数据库表结构设计 (PostgreSQL)
1. 书籍主表 (Books)
存储项目的全局信息及选定的文风模型。
字段名
类型
说明
id
UUID
主键
title
String
书名
style_profile
JSONB
存储文风克隆提取的特征（句式、常用词等）
created_at
Timestamp
创建时间

---
2. 级联推演三剑客 (The Cascade Trio)
这是实现 “三级大纲推演” 的核心，通过 parent_id 形成严格的树状约束。
2.1 卷纲表 (Volumes)
暂时无法在飞书文档外展示此内容
2.2 章纲表 (Chapters)
暂时无法在飞书文档外展示此内容
2.3 节纲表 (Beats)
暂时无法在飞书文档外展示此内容

---
3. 设定集表 (Codex Entities)
这是你的“云端参谋部”，使用向量索引来支持 RAG。
字段名
类型
说明
id
UUID
主键
book_id
UUID
外键
entity_type
Enum
character, location, item, rule
name
String
关键词（如“韩立”）
properties
JSONB
结构化属性（性格、修为、好感度等）
description_vector
Vector(1536)
核心：用于语义检索的向量字段

