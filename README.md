# Inkweaver (墨织)

AI-driven novel writing platform with cascading outline generation and multi-agent workflow.

## Features

- **Cascading Outline Generation**: 
  - Volume Planning: Define conflicts and大结局
  - Chapter Generation: Batch generate 20-30 chapter summaries
  - Beat Refinement: Refine into 3-5 beats per chapter

- **Multi-Agent Workflow**:
  - Director (总编)
  - Plotter (编剧)
  - Writer (执笔)
  - Editor (校对)

- **Dynamic Codex System**: 
  - Character cards
  - World-building consistency
  - Dynamic RAG system

## Architecture

- **Backend**: FastAPI + LangGraph
- **Database**: PostgreSQL + pgvector
- **Frontend**: Next.js + TipTap Editor
- **AI Models**: Claude 3.5 Sonnet, DeepSeek V3

## Quick Start

### Docker Deployment

```bash
docker-compose up -d
```

### Manual Setup

1. Install dependencies:
   ```bash
   uv install
   ```

2. Run migrations:
   ```bash
   alembic upgrade head
   ```

3. Start the server:
   ```bash
   make dev
   ```

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

## License

MIT
