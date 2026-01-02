# Inkweaver FastAPI后端架构设计

## 1. 目录结构设计

```
inkweaver-backend/
├── app/                      # 主应用目录
│   ├── api/                  # API路由层
│   │   ├── v1/               # API版本控制
│   │   │   ├── books.py      # 书籍相关路由
│   │   │   ├── volumes.py    # 卷相关路由
│   │   │   ├── chapters.py   # 章节相关路由
│   │   │   ├── beats.py      # 情节点相关路由
│   │   │   ├── codex.py      # 设定集相关路由
│   │   │   └── router.py     # 主路由聚合
│   │   └── dependencies.py   # 路由依赖（认证、数据库会话等）
│   ├── core/                 # 核心配置
│   │   ├── config.py         # 应用配置（环境变量、数据库连接等）
│   │   ├── constants.py      # 常量定义
│   │   └── security.py       # 安全相关（JWT、密码哈希等）
│   ├── crud/                 # 数据访问层
│   │   ├── base.py           # CRUD基础类
│   │   ├── books.py          # 书籍CRUD操作
│   │   ├── volumes.py        # 卷CRUD操作
│   │   ├── chapters.py       # 章节CRUD操作
│   │   ├── beats.py          # 情节点CRUD操作
│   │   └── codex.py          # 设定集CRUD操作
│   ├── db/                   # 数据库相关
│   │   ├── base.py           # 基础模型定义
│   │   ├── session.py        # 数据库会话管理
│   │   └── vector.py         # pgvector扩展配置
│   ├── models/               # SQLAlchemy数据模型
│   │   └── __init__.py       # 模型导出
│   ├── schemas/              # Pydantic数据验证模式
│   │   ├── books.py          # 书籍模式
│   │   ├── volumes.py        # 卷模式
│   │   ├── chapters.py       # 章节模式
│   │   ├── beats.py          # 情节点模式
│   │   └── codex.py          # 设定集模式
│   ├── services/             # 业务逻辑层
│   │   ├── book_service.py   # 书籍业务逻辑
│   │   ├── outline_service.py # 大纲推演服务
│   │   ├── codex_service.py  # 设定集服务
│   │   └── workflow_service.py # 工作流编排服务
│   ├── agents/               # AI代理模块
│   │   ├── base_agent.py     # 代理基类
│   │   ├── director.py       # 总编代理
│   │   ├── plotter.py        # 编剧代理
│   │   ├── writer.py         # 执笔代理
│   │   └── editor.py         # 校对代理
│   ├── workflows/            # 工作流编排
│   │   ├── base_workflow.py  # 工作流基类
│   │   ├── volume_planning.py # 卷规划工作流
│   │   ├── chapter_generation.py # 章节生成工作流
│   │   └── beat_refinement.py # 情节点细化工作流
│   ├── utils/                # 工具函数
│   │   ├── ai_utils.py       # AI调用工具
│   │   ├── text_utils.py     # 文本处理工具
│   │   └── validation_utils.py # 验证工具
│   ├── tests/                # 测试目录
│   │   ├── unit/             # 单元测试
│   │   ├── integration/      # 集成测试
│   │   └── conftest.py       # 测试配置
│   └── main.py               # 应用入口
├── alembic/                  # 数据库迁移工具
│   ├── versions/             # 迁移版本
│   ├── env.py                # 迁移环境配置
│   └── script.py.mako        # 迁移脚本模板
├── .env.example              # 环境变量示例
├── .gitignore                # Git忽略文件
├── alembic.ini               # Alembic配置
├── requirements.txt          # 项目依赖
└── README.md                 # 项目说明
```

## 2. 核心数据模型设计

接下来，我将编写`app/models/__init__.py`文件，使用SQLAlchemy ORM实现核心数据模型，包括：

- 定义Books、Volumes、Chapters、Beats、Codex_Entities五个实体
- 实现实体间的一对多关系（如Book → Volume → Chapter → Beat）
- 配置级联删除功能
- 使用JSONB类型存储beats_json和properties字段
- 为Codex_Entities的description_vector字段配置pgvector支持
- 添加必要的索引和约束
- 包含完整的类型注解

## 3. 实施步骤

1. 创建目录结构
2. 编写数据库基础配置（db/base.py, db/session.py, db/vector.py）
3. 编写核心数据模型（models/__init__.py）
4. 编写Pydantic模式（schemas/）
5. 编写CRUD操作（crud/）
6. 编写API路由（api/）
7. 编写业务逻辑服务（services/）
8. 配置应用入口（main.py）

现在，我将开始实现核心数据模型。