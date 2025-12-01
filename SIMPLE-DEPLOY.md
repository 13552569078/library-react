# 🚀 最简单的部署流程

## 📋 部署方式说明

**我们采用的是：本地打包 → 上传 → 服务器解压部署**

### 为什么这样做？
- ✅ **本地环境稳定** - 避免服务器环境问题
- ✅ **网络带宽节省** - 只传输压缩包，不传输源码
- ✅ **服务器资源节省** - 不需要在服务器安装Node.js等开发环境
- ✅ **部署速度快** - 服务器只需解压和重启nginx

---

## 🎯 最简单的3步部署

### 第1步：本地打包（只需要1个命令）
```bash
# 在你的项目目录执行
cd /Users/curry/Desktop/demo/ai-design

# 一键构建dumi文档包
source ~/.nvm/nvm.sh && nvm use 18 && npm run docs:build && tar -czf dumi-docs.tar.gz -C dist .
```

### 第2步：上传到服务器（只需要1个命令）
```bash
# 上传文档包到服务器
scp dumi-docs.tar.gz root@10.252.216.12:/tmp/
```

### 第3步：服务器部署（只需要3个命令）
```bash
# 连接服务器
ssh root@10.252.216.12

# 停止nginx，解压文件，启动nginx
docker stop nginx 2>/dev/null || true && docker rm -f nginx 2>/dev/null || true && cd /data/nginx/html && rm -rf * && tar -xzf /tmp/dumi-docs.tar.gz && /data/nginx/start.sh

# 测试访问
curl -I http://localhost/
```

**完成！访问 http://10.252.216.12/**

---

## 🔄 详细步骤说明

### 📦 第1步：本地打包详解

#### 1.1 为什么要切换Node.js版本？
- Node.js v24有兼容性问题，dumi无法正常构建
- Node.js 18是稳定版本，完全支持dumi

#### 1.2 打包过程
```bash
# 切换到Node.js 18
source ~/.nvm/nvm.sh && nvm use 18

# 构建dumi文档（生成dist目录）
npm run docs:build

# 压缩成tar.gz包
tar -czf dumi-docs.tar.gz -C dist .
```

#### 1.3 检查打包结果
```bash
# 检查包大小
ls -lh dumi-docs.tar.gz

# 检查包内容
tar -tzf dumi-docs.tar.gz | head -10
```

### 📤 第2步：上传到服务器详解

#### 2.1 使用scp上传
```bash
# 基本语法
scp 本地文件 用户名@服务器IP:远程路径

# 实际命令
scp dumi-docs.tar.gz root@10.252.216.12:/tmp/
```

#### 2.2 输入密码
```
密码：xxx
```

#### 2.3 验证上传
```bash
# 连接服务器检查文件
ssh root@10.252.216.12 "ls -la /tmp/dumi-docs.tar.gz"
```

### 🐳 第3步：服务器部署详解

#### 3.1 停止现有nginx容器
```bash
# 停止容器
docker stop nginx 2>/dev/null || true

# 删除容器
docker rm -f nginx 2>/dev/null || true
```

#### 3.2 清理和解压文件
```bash
# 进入网站目录
cd /data/nginx/html

# 清理旧文件
rm -rf *

# 解压新文件
tar -xzf /tmp/dumi-docs.tar.gz
```

#### 3.3 启动nginx容器
```bash
# 使用提供的启动脚本
/data/nginx/start.sh
```

#### 3.4 验证部署
```bash
# 检查容器状态
docker ps | grep nginx

# 测试HTTP访问
curl -I http://localhost/
```

---

## 🛠️ 一键部署脚本

### 本地一键打包脚本
```bash
#!/bin/bash
# 保存为 build-docs.sh

echo "🚀 开始构建dumi文档..."
source ~/.nvm/nvm.sh
nvm use 18
npm run docs:build
tar -czf dumi-docs.tar.gz -C dist .
echo "✅ 构建完成: dumi-docs.tar.gz"
ls -lh dumi-docs.tar.gz
```

### 服务器一键部署脚本
```bash
#!/bin/bash
# 保存为 server-deploy.sh，上传到服务器执行

echo "🛑 停止nginx容器..."
docker stop nginx 2>/dev/null || true
docker rm -f nginx 2>/dev/null || true

echo "📁 清理和解压文件..."
cd /data/nginx/html
rm -rf *
tar -xzf /tmp/dumi-docs.tar.gz

echo "🚀 启动nginx容器..."
/data/nginx/start.sh

echo "✅ 部署完成！"
docker ps | grep nginx
curl -I http://localhost/
```

---

## 🎯 超级简化版（复制粘贴即可）

### 本地执行
```bash
cd /Users/curry/Desktop/demo/ai-design && source ~/.nvm/nvm.sh && nvm use 18 && npm run docs:build && tar -czf dumi-docs.tar.gz -C dist . && scp dumi-docs.tar.gz root@10.252.216.12:/tmp/
```

### 服务器执行
```bash
ssh root@10.252.216.12 "docker stop nginx 2>/dev/null || true && docker rm -f nginx 2>/dev/null || true && cd /data/nginx/html && rm -rf * && tar -xzf /tmp/dumi-docs.tar.gz && /data/nginx/start.sh && echo '✅ 部署完成！访问 http://10.252.216.12/'"
```

---

## 🔍 常见问题

### Q: 为什么不在服务器直接构建？
A: 服务器通常没有完整的开发环境，安装Node.js、npm等会很麻烦，而且占用服务器资源。

### Q: 每次都要重新上传整个包吗？
A: 是的，但压缩包很小（通常几MB），上传很快。这样确保部署的一致性。

### Q: 如果上传失败怎么办？
A: 检查网络连接，或者使用FTP工具手动上传到 `/tmp/` 目录。

### Q: 如果nginx启动失败怎么办？
A: 检查容器日志：`docker logs $(docker ps -a | grep nginx | awk '{print $1}')`

---

## 📋 部署检查清单

- [ ] 本地Node.js切换到18版本
- [ ] dumi文档构建成功
- [ ] 压缩包创建成功
- [ ] 文件上传到服务器成功
- [ ] 服务器nginx容器停止
- [ ] 旧文件清理完成
- [ ] 新文件解压成功
- [ ] nginx容器启动成功
- [ ] 网站访问正常

---

## 🎉 总结

**部署流程就是：本地打包 → 上传 → 服务器解压重启**

这是最简单、最可靠的部署方式！
