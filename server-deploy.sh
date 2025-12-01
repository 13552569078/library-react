#!/bin/bash

# 服务器一键部署脚本
# 在服务器上执行: bash /tmp/server-deploy.sh

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 开始部署dumi文档...${NC}"

# 1. 停止nginx容器
echo -e "${YELLOW}🛑 停止nginx容器...${NC}"
docker stop nginx 2>/dev/null || true
docker rm -f nginx 2>/dev/null || true

# 2. 清理和解压文件
echo -e "${YELLOW}📁 清理和解压文件...${NC}"
cd /data/nginx/html/ai-arco-material
rm -rf *
tar -xzf /tmp/dumi-docs.tar.gz

# 3. 设置权限
echo -e "${YELLOW}🔧 设置权限...${NC}"
chown -R nginx:nginx /data/nginx/html/ai-arco-material 2>/dev/null || chown -R www-data:www-data /data/nginx/html/ai-arco-material 2>/dev/null || true
chmod -R 755 /data/nginx/html/ai-arco-material

# 4. 启动nginx容器
echo -e "${YELLOW}🚀 启动nginx容器...${NC}"
/data/nginx/start.sh

# 5. 等待启动
sleep 3

# 6. 检查结果
echo -e "${BLUE}🔍 检查部署结果...${NC}"
if docker ps | grep -q nginx; then
    echo -e "${GREEN}✅ nginx容器启动成功${NC}"
    docker ps | grep nginx
else
    echo "❌ nginx容器启动失败"
    exit 1
fi

# 7. 测试访问
echo -e "${BLUE}🌐 测试网站访问...${NC}"
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' http://localhost/ 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ 网站访问正常 (HTTP $HTTP_CODE)${NC}"
else
    echo "❌ 网站访问失败 (HTTP $HTTP_CODE)"
fi

# 8. 清理临时文件
echo -e "${BLUE}🧹 清理临时文件...${NC}"
rm -f /tmp/dumi-docs.tar.gz

# 9. 完成
echo ""
echo -e "${GREEN}🎉 部署完成！${NC}"
echo -e "${BLUE}🌐 访问地址:${NC}"
echo "   主页: http://10.252.216.12/"
echo "   图标: http://10.252.216.12/icons/"
echo "   组件: http://10.252.216.12/components/"
