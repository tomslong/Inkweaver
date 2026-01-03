# 多阶段构建：使用Python 3.11-slim作为基础镜像
FROM python:3.11-slim AS builder

# 设置环境变量
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# 配置国内镜像源
ENV UV_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
ENV PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple

# 合并所有apt-get命令为单一指令，并在同一层清理缓存
RUN apt-get update && apt-get install -y \n    gcc \n    libpq-dev \n    git \n    curl \n    && rm -rf /var/lib/apt/lists/* && apt-get clean

# 使用多阶段构建方式安装uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 设置工作目录
WORKDIR /app

# 仅复制依赖描述文件
COPY pyproject.toml .
COPY uv.lock .
COPY alembic.ini .
COPY alembic alembic

# 安装依赖，使用--no-cache和--system参数
RUN uv pip install --no-cache --system -e .

# 复制项目文件
COPY app app
COPY entrypoint.sh entrypoint.sh

# 设置entrypoint脚本执行权限
RUN chmod +x /app/entrypoint.sh

# 暴露端口
EXPOSE 8000

# 设置入口点
ENTRYPOINT ["/app/entrypoint.sh"]
