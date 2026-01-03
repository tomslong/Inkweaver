# Inkweaver AI 部署指南

## 项目概述

Inkweaver是一个AI驱动的小说写作平台，具有级联大纲生成和多Agent工作流功能。

- **后端**: FastAPI + LangGraph (端口8000)
- **数据库**: PostgreSQL + pgvector (端口5432)
- **前端**: Next.js + TipTap Editor (端口3000)
- **管理工具**: Adminer (端口8080)

## 环境要求

- Docker 20.10.0+
- Docker Compose 1.29.0+
- 至少4GB内存
- 足够的磁盘空间用于容器镜像和数据存储

## Docker部署步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd Inkweaver
```

### 2. 配置环境变量

复制环境变量示例文件并根据需要修改：

```bash
cp .env.example .env
# 编辑.env文件，配置必要的环境变量
```

### 3. 构建并启动容器

```bash
# 构建并启动所有服务
docker-compose up -d

# 或仅启动特定服务
docker-compose up -d backend db frontend

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f
```

### 4. 等待服务就绪

服务启动需要一些时间，特别是第一次启动时需要构建镜像。您可以通过以下命令检查服务状态：

```bash
# 检查后端服务是否就绪
docker-compose logs -f backend | grep "Application startup complete"

# 检查前端服务是否就绪
docker-compose logs -f frontend | grep "ready on"
```

## 服务访问地址

- **前端应用**: http://localhost:3000
- **后端API**: http://localhost:8000
- **Swagger文档**: http://localhost:8000/api/v1/docs
- **ReDoc文档**: http://localhost:8000/api/v1/redoc
- **数据库管理**: http://localhost:8080

## 手动构建和运行

### 后端构建

```bash
cd Inkweaver
docker build -t inkweaver-backend .
docker run -d --name inkweaver-backend -p 8000:8000 inkweaver-backend
```

### 前端构建

```bash
cd Inkweaver/inkweaver-frontend
docker build -t inkweaver-frontend .
docker run -d --name inkweaver-frontend -p 3000:3000 inkweaver-frontend
```

## 容器管理命令

```bash
# 停止所有服务
docker-compose down

# 停止并删除所有服务（包括数据卷）
docker-compose down -v

# 重启服务
docker-compose restart

# 重启特定服务
docker-compose restart backend

# 进入容器
docker-compose exec backend bash
docker-compose exec frontend bash
docker-compose exec db psql -U inkweaver_user -d inkweaver
```

## 故障排查指南

### 1. 服务无法启动

- 检查端口是否被占用
- 查看服务日志：`docker-compose logs -f <service-name>`
- 确保环境变量配置正确
- 检查Docker资源是否足够（内存、CPU）

### 2. 前端无法访问后端

- 检查后端服务是否正常运行
- 确保前端配置的API_BASE_URL正确
- 检查容器网络是否连通：`docker-compose exec frontend ping backend`
- 查看前端控制台日志获取详细错误信息

### 3. 数据库连接问题

- 检查数据库服务是否正常运行
- 查看数据库日志：`docker-compose logs -f db`
- 确保数据库用户名和密码正确
- 检查数据库连接字符串格式

### 4. 构建失败

- 检查依赖是否正确
- 确保网络连接正常（构建过程需要下载依赖）
- 清理旧的构建缓存：`docker-compose build --no-cache`

## 开发环境配置

### 本地开发模式

对于本地开发，您可以使用以下配置：

1. **后端开发**:
   ```bash
   uv run dev
   ```

2. **前端开发**:
   ```bash
   cd inkweaver-frontend
   npm run dev
   ```

### 环境变量配置

开发环境建议使用以下配置：

```
# 后端环境变量
DATABASE_URL=postgresql+asyncpg://inkweaver_user:inkweaver_password@localhost:5432/inkweaver

# 前端环境变量
API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## 生产环境配置

### 1. 安全配置

- 更改默认密码
- 配置HTTPS
- 设置合适的防火墙规则
- 配置SSL证书

### 2. 性能优化

- 增加容器资源限制
- 配置合适的数据库连接池
- 启用缓存
- 配置CDN加速静态资源

### 3. 监控和日志

- 配置日志收集系统（如ELK Stack）
- 设置监控告警
- 定期备份数据库

## 常见问题

### Q: 如何更新服务？

A: 拉取最新代码后，重新构建并重启容器：

```bash
git pull
docker-compose build --no-cache
docker-compose up -d
```

### Q: 如何备份数据库？

A: 使用以下命令备份数据库：

```bash
docker-compose exec db pg_dump -U inkweaver_user -d inkweaver > backup.sql
```

### Q: 如何恢复数据库？

A: 使用以下命令恢复数据库：

```bash
cat backup.sql | docker-compose exec -T db psql -U inkweaver_user -d inkweaver
```

### Q: 如何查看容器资源使用情况？

A: 使用Docker Stats命令：

```bash
docker stats
```

## 联系信息

如有任何部署问题，请联系开发团队。
