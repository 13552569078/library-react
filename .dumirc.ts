import { defineConfig } from 'dumi';
import { join } from 'path';
import pkg from './package.json';

const alias = {
  'ai-arco-material': join(__dirname, 'src'),
  'ai-arco-material/components': join(__dirname, 'src/components'),
  'ai-arco-material/business-components': join(__dirname, 'src/business/components'),
  'ai-arco-material/utils': join(__dirname, 'src/utils'),
  'ai-arco-material/hooks': join(__dirname, 'src/hooks'),
  'ai-arco-material/icons': join(__dirname, 'src/icons'),
};

const publicPath = process.env.DUMI_APP_PUBLIC_PATH || '/ai-arco-material/';

export default defineConfig({
  base: publicPath,
  publicPath: publicPath,
  outputPath: 'dist-docs',
  title: 'AI Arco Material - A comprehensive React component library',
  logo: `${publicPath}logo.svg`,
  mfsu: {
    // to make AntdAliasWebpackPlugin work
    exclude: ['antd-token-previewer-laf'],
  },
  favicons: [publicPath + 'logo.ico'],
  alias,
  resolve: {
    codeBlockMode: 'passive',
    atomDirs: [
      { type: 'components', dir: 'src/components' },
      { type: 'business', dir: 'src/business' },
      { type: 'business', dir: 'src/business/components' },
      { type: 'business', dir: 'src/business/store' },
      { type: 'business', dir: 'src/business/utils' },
      { type: 'business', dir: 'src/business/hooks' },
      { type: 'hooks', dir: 'src/hooks' },
      { type: 'utils', dir: 'src/utils' },
      { type: 'icons', dir: 'src/icons' },
    ],
  },
  themeConfig: {
    name: `AI Arco Material(${pkg.version})`,
    nprogress: true,
    sidebarGroupModePath: ['/guide', '/components', '/businesses', '/hooks', '/utils', '/icons'],
    showLineNum: true,
    socialLinks: {
      github: 'https://code.cestc.cn/ai-fe/library/ai-arco-material',
    },
    localesEnhance: [
      { id: 'en-US', switchPrefix: '中' },
      { id: 'zh-CN', switchPrefix: 'en' },
    ],
    nav: {
      'en-US': [
        { title: '指南', link: '/guide/ai-arco-material' },
        {
          title: '通用封装',
          link: '/components/add-button',
          children: [
            { title: '组件', link: '/components/add-button' },
            { title: 'Hooks', link: '/hooks/use-in-view' },
            { title: '工具', link: '/utils/copy-to-clipboard' },
          ],
        },
        // { title: '组件', link: '/components/add-button' },
        { title: '业务封装', link: '/businesses/login-card' },
        { title: '图标', link: '/icons' },
        // { title: 'Hooks', link: '/hooks/use-in-view' },
        // { title: '工具', link: '/utils/copy-to-clipboard' },
      ],
      'zh-CN': [
        { title: '指南', link: '/guide/ai-arco-material' },
        {
          title: '通用封装',
          link: '/components/add-button',
          children: [
            { title: '组件', link: '/components/add-button' },
            { title: 'Hooks', link: '/hooks/use-in-view' },
            { title: '工具', link: '/utils/copy-to-clipboard' },
          ],
        },
        // { title: '组件', link: '/components/add-button' },
        { title: '业务封装', link: '/businesses/login-card' },
        { title: '图标', link: '/icons' },
        // { title: 'Hooks', link: '/hooks/use-in-view' },
        // { title: '工具', link: '/utils/copy-to-clipboard' },
      ],
    },
    moreLinks: [
      { link: '/ai-workflow', text: 'AI 工作流(dev)' },
      { link: '/ai-chat', text: 'AI Chat(plan)' },
      { link: '/ai-echarts', text: 'AI 图表库(plan)' },
      { link: '/ai-writing', text: 'AI 写作(thinking)' },
    ],
  },
  locales: [
    {
      id: 'en-US',
      name: 'English',
      suffix: '',
    },
    {
      id: 'zh-CN',
      name: '中文',
      suffix: '-cn',
    },
  ],
});
