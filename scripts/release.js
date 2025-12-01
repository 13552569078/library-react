#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出工具
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
};

function execCommand(command, options = {}) {
  console.log(colors.gray(`$ ${command}`));
  try {
    return execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      ...options
    });
  } catch (error) {
    if (options.throwError) {
      throw error;
    }
    console.error(colors.red(`❌ 命令执行失败: ${command}`));
    process.exit(1);
  }
}



function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

function validateWorkingDirectory() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log(colors.red('❌ 工作目录不干净，请先提交所有更改'));
      console.log(colors.gray('未提交的文件:'));
      console.log(status);
      process.exit(1);
    }
  } catch (error) {
    console.log(colors.red('❌ 无法检查 Git 状态'));
    process.exit(1);
  }
}

function release(type = 'patch') {
  console.log(colors.blue('🚀 开始发布流程...\n'));

  // 1. 检查工作目录
  console.log(colors.blue('1. 检查工作目录...'));
  validateWorkingDirectory();
  console.log(colors.green('✅ 工作目录干净\n'));

  // 2. 获取当前版本
  const currentVersion = getCurrentVersion();
  console.log(colors.blue(`2. 当前版本: ${currentVersion}`));

  // 3. 生成图标
  console.log(colors.blue('3. 生成图标组件...'));
  execCommand('npm run generate:icons');
  console.log(colors.green('✅ 图标生成完成\n'));

  // 4. 运行测试
  // console.log(colors.blue('4. 运行测试...'));
  // execCommand('npm run test');
  // console.log(colors.green('✅ 测试通过\n'));

  // 5. 构建项目
  console.log(colors.blue('5. 构建项目...'));
  execCommand('npm run build');
  console.log(colors.green('✅ 构建完成\n'));

  // 6. 预检查发布权限
  console.log(colors.blue('6. 检查发布权限...'));
  try {
    execCommand('npm publish --dry-run', { stdio: 'pipe', throwError: true });
    console.log(colors.green('✅ 发布权限检查通过\n'));
  } catch (error) {
    console.log(colors.red('❌ 发布权限检查失败，请检查npm登录状态和权限'));
    console.log(colors.gray('提示: 请先运行 npm login 登录到内网npm'));
    process.exit(1);
  }

  // 7. 更新版本号
  console.log(colors.blue(`7. 更新版本号 (${type})...`));
  let newVersion;
  try {
    execCommand(`npm version ${type}`, { throwError: true });
    newVersion = getCurrentVersion();
    console.log(colors.green(`✅ 版本更新: ${currentVersion} → ${newVersion}\n`));
  } catch (error) {
    console.log(colors.red('❌ 版本号更新失败'));
    process.exit(1);
  }

  // 8. 发布到内网 npm
  console.log(colors.blue('8. 发布到内网 npm...'));
  try {
    execCommand('npm publish', { throwError: true });
    console.log(colors.green('✅ 发布到内网 npm 成功\n'));
  } catch (error) {
    console.log(colors.red('❌ 发布失败，正在回滚版本号...'));
    try {
      // 回滚版本号和Git标签
      execCommand(`git tag -d v${newVersion}`, { throwError: true });
      execCommand(`git reset --hard HEAD~1`, { throwError: true });
      console.log(colors.yellow(`⚠️  版本号已回滚到 ${currentVersion}`));
    } catch (rollbackError) {
      console.log(colors.red('❌ 回滚失败，请手动处理:'));
      console.log(colors.gray(`   git tag -d v${newVersion}`));
      console.log(colors.gray(`   git reset --hard HEAD~1`));
    }
    process.exit(1);
  }

  // 9. 推送到 Git
  console.log(colors.blue('9. 推送到 Git...'));
  try {
    execCommand('git push origin --tags', { throwError: true });
    console.log(colors.green('✅ 推送到 Git 成功\n'));
  } catch (error) {
    console.log(colors.yellow('⚠️  推送到 Git 失败，但包已发布成功'));
    console.log(colors.gray('请手动推送: git push origin --tags'));
    console.log(colors.gray(`包版本: ai-arco-material@${newVersion} 已成功发布到内网npm\n`));
  }

  // 10. 完成
  console.log(colors.green('🎉 发布完成!'));
  console.log(colors.blue(`📦 包名: ai-arco-material@${newVersion}`));
  console.log(colors.blue(`🏷️  标签: v${newVersion}`));
  console.log(colors.blue(`🌐 内网地址: http://npm.cestc.cn`));
  console.log(colors.gray(`\n安装命令: npm install ai-arco-material@${newVersion} --registry=http://npm.cestc.cn`));
}

// 解析命令行参数
const args = process.argv.slice(2);
const type = args[0] || 'patch';

if (!['patch', 'minor', 'major'].includes(type)) {
  console.log(colors.red('❌ 无效的版本类型'));
  console.log(colors.gray('使用方法: node scripts/release.js [patch|minor|major]'));
  process.exit(1);
}

// 确认发布
const currentVersion = getCurrentVersion();
console.log(colors.yellow(`⚠️  即将发布 ${type} 版本: ${currentVersion} → [新版本]`));
console.log(colors.yellow(`📦 包名: ai-arco-material`));
console.log(colors.yellow(`🌐 发布到: npm (默认源)`));
console.log(colors.gray('\n按 Ctrl+C 取消，按 Enter 继续...'));

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', (key) => {
  if (key[0] === 3) { // Ctrl+C
    console.log(colors.yellow('\n❌ 发布已取消'));
    process.exit(0);
  } else if (key[0] === 13) { // Enter
    console.log('');
    release(type);
    process.exit(0);
  }
});
