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

// 将kebab-case转换为PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// 验证SVG文件
function validateSVG(svgContent, fileName) {
  const issues = [];

  // 检查是否是有效的SVG
  if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
    issues.push('不是有效的SVG文件');
  }

  // 检查是否使用了currentColor
  if (!svgContent.includes('currentColor')) {
    issues.push('建议使用 currentColor 以支持动态颜色');
  }

  // 检查是否有viewBox
  if (!svgContent.includes('viewBox')) {
    issues.push('建议添加 viewBox 属性');
  }

  return issues;
}

// 提取SVG内容（去掉外层svg标签）
function extractSVGContent(svgContent) {
  const match = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
  return match ? match[1].trim() : '';
}

function extractSVGViewBox(svgContent) {
  const regex = /<svg\b[\s\S]*?\sviewBox\s*=\s*"\s*([\d\s.-]+)\s*"[\s\S]*?>/i;
  const match = svgContent.match(regex);
  return match ? match[1].trim() : undefined;
}

function transformSVGForReact(svgString) {
  // 转换style属性
  let result = svgString.replace(/style="([^"]*)"/g, (match, cssContent) => {
    const styleObj = {};
    cssContent.split(';').forEach((decl) => {
      const [prop, val] = decl.split(':').map((s) => s.trim());
      if (prop && val) {
        const camelCaseProp = prop.replace(/-([a-z])/g, (m, l) => l.toUpperCase());
        styleObj[camelCaseProp] = val;
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });

  // 转换其他kebab-case属性为camelCase
  result = result.replace(/(\w+)-([a-z])/g, (match, prefix, letter) => {
    return prefix + letter.toUpperCase();
  });

  return result;
}

// 生成React组件代码
function generateIconComponent(iconName, svgContent) {
  const componentName = `Icon${toPascalCase(iconName)}`;
  const innerContent = transformSVGForReact(extractSVGContent(svgContent));
  const viewBox = extractSVGViewBox(svgContent);

  return `import React from 'react';
import Icon, { IconProps } from '../Icon';

const ${componentName}: React.FC<Omit<IconProps, 'children'>> = (props) => {
  return (
    <Icon viewBox="${viewBox}" {...props}>
      ${innerContent}
    </Icon>
  );
};

export default ${componentName};
`;
}

// 主函数
function generateIcons() {
  console.log(colors.blue('🚀 开始生成图标组件...\n'));

  const svgsDir = path.join(__dirname, '../src/icons/svgs');
  const iconsDir = path.join(__dirname, '../src/icons/icons');

  // 检查svgs目录是否存在
  if (!fs.existsSync(svgsDir)) {
    console.log(colors.red('❌ SVG目录不存在:'), svgsDir);
    console.log(colors.yellow('💡 请创建目录并添加SVG文件'));
    return;
  }

  // 确保icons目录存在
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
    console.log(colors.green('✅ 创建图标组件目录:'), iconsDir);
  }

  // 读取所有SVG文件
  const svgFiles = fs.readdirSync(svgsDir).filter((file) => file.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.log(colors.yellow('⚠️  未找到SVG文件'));
    console.log(colors.gray('   请将SVG文件放入:'), svgsDir);
    return;
  }

  console.log(colors.blue(`📁 找到 ${svgFiles.length} 个SVG文件\n`));

  const iconExports = [];
  const warnings = [];

  svgFiles.forEach((file) => {
    const iconName = path.basename(file, '.svg');
    const svgPath = path.join(svgsDir, file);
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // 验证SVG文件
    const issues = validateSVG(svgContent, file);
    if (issues.length > 0) {
      warnings.push({ file, issues });
    }

    // 生成组件代码
    const componentCode = generateIconComponent(iconName, svgContent);
    const componentName = `Icon${toPascalCase(iconName)}`;

    // 写入组件文件
    const componentPath = path.join(iconsDir, `${componentName}.tsx`);
    fs.writeFileSync(componentPath, componentCode);

    iconExports.push({
      name: componentName,
      file: `./${componentName}`,
      iconName: iconName,
    });

    console.log(colors.green('✅'), `${componentName}`, colors.gray(`(${file})`));
  });

  // 生成index.ts文件
  const indexContent = `// Auto-generated file. Do not edit manually.
${iconExports.map((icon) => `export { default as ${icon.name} } from '${icon.file}';`).join('\n')}

// Icon metadata for demo
export const iconList = [
${iconExports.map((icon) => `  { name: '${icon.name}', iconName: '${icon.iconName}' },`).join('\n')}
];
`;

  const indexPath = path.join(iconsDir, 'index.ts');
  fs.writeFileSync(indexPath, indexContent);

  console.log(colors.green('\n✅ 生成导出文件:'), 'index.ts');

  // 显示警告信息
  if (warnings.length > 0) {
    console.log(colors.yellow('\n⚠️  发现以下问题:'));
    warnings.forEach(({ file, issues }) => {
      console.log(colors.yellow(`   ${file}:`));
      issues.forEach((issue) => {
        console.log(colors.gray(`     - ${issue}`));
      });
    });
  }

  // 显示总结
  console.log(colors.blue('\n📊 生成完成:'));
  console.log(colors.gray(`   - 处理文件: ${svgFiles.length} 个`));
  console.log(colors.gray(`   - 生成组件: ${iconExports.length} 个`));
  console.log(colors.gray(`   - 警告信息: ${warnings.length} 个`));

  // 显示使用说明
  console.log(colors.blue('\n💡 使用方法:'));
  console.log(colors.gray("   import { IconAdd, IconEdit } from 'ai-arco-material';"));

  // 显示下一步操作
  console.log(colors.blue('\n🔄 下一步:'));
  console.log(colors.gray('   1. 运行 npm run build 构建项目'));
  console.log(colors.gray('   2. 在文档中查看新图标'));
  console.log(colors.gray('   3. 在代码中导入使用'));
}

// 运行生成脚本
generateIcons();
