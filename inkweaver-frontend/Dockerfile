# 多阶段构建：使用Node.js 20官方镜像作为构建镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装所有依赖（包括开发依赖）
RUN npm ci

# 复制项目文件
COPY . .

# 构建Next.js应用
RUN npm run build

# 使用Node.js 20-alpine作为生产镜像
FROM node:20-alpine AS runner

# 设置工作目录
WORKDIR /app

# 复制生产依赖
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# 复制构建产物
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 暴露端口3000
EXPOSE 3000

# 定义环境变量
ENV NODE_ENV=production
ENV API_BASE_URL=http://backend:8000
ENV NEXT_PUBLIC_API_BASE_URL=http://backend:8000

# 运行Next.js应用
CMD ["npm", "start"]
