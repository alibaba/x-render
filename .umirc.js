import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  title: 'XRender',
  favicon: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  logo: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  outputPath: 'docs-dist',
  hash: true,
  dynamicImport: {
    loading: '@/docs/Loading.js',
  },
  locales: [['zh-CN', '中文']],
  ignoreMomentLocale: false,
  navs: [
    {
      title: 'FormRender',
      path: '/form-render',
    },
    {
      title: 'TableRender',
      path: '/table-render',
    },
    {
      title: 'ChartRender',
      path: '/chart-render',
    },
    { title: 'Schema 编辑器', path: '/generator' },
    {
      title: 'Playground',
      // children: [
      //   { title: 'Playground', path: '/playground' },
      //   { title: 'Schema 编辑器', path: '/tools/generator/playground' },
      // ],
      path: '/playground',
    },
    {
      title: '周边工具',
      path: '/tools',
      children: [
        { title: 'PropToSchema', path: '/tools/proptypes' },
        { title: 'VSCode 插件', path: '/tools/vscode' },
        {
          title: '旧版文档',
          path: 'https://x-components.gitee.io/form-render/',
        },
      ],
    },
    {
      title: '更新日志',
      children: [
        {
          title: 'FormRender',
          path:
            'https://github.com/alibaba/form-render/blob/master/packages/form-render/CHANGELOG.md',
        },
        {
          title: 'TableRender',
          path:
            'https://github.com/alibaba/form-render/blob/master/packages/table-render/CHANGELOG.md',
        },
        {
          title: 'ChartRender',
          path:
            'https://github.com/alibaba/form-render/blob/master/packages/chart-render/CHANGELOG.md',
        },
      ],
    },

    { title: 'GitHub', path: 'https://github.com/alibaba/form-render' },
  ],
  mode: 'site',
  // alias: {
  //   'form-render/dist': path.resolve(__dirname, 'packages/form-render/dist'),
  // },
  esbuild: {},
  // base: '/x-render/',
  publicPath: '/x-render/',
  exportStatic: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: '@alifd/next',
        libraryDirectory: 'lib',
      },
      '@alifd/next',
    ],
  ],
  chainWebpack(config, { webpack }) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin);
  },
  // more config: https://d.umijs.org/config
});
