#!/bin/bash

# 本地一键构建dumi文档脚本
# 使用方法: ./build-docs.sh

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 开始构建dumi文档...${NC}"

# 1. 切换到Node.js 18
echo "📦 切换到Node.js 18..."
source ~/.nvm/nvm.sh
nvm use 18

# 2. 构建dumi文档
echo "🔨 构建dumi文档..."
npm run docs:build

# 3. 创建压缩包
echo "📦 创建部署包..."
tar -czf dumi-docs.tar.gz -C dist .

# 4. 显示结果
echo -e "${GREEN}✅ 构建完成！${NC}"
echo "📁 部署包: dumi-docs.tar.gz"
ls -lh dumi-docs.tar.gz

echo ""
echo -e "${BLUE}📤 下一步：上传到服务器${NC}"
echo "scp dumi-docs.tar.gz root@10.252.216.12:/tmp/"
