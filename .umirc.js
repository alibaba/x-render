import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'XRender',
  favicon: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  logo: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  outputPath: 'docs-dist',
  dynamicImport: {},
  navs: [
    {
      title: 'FormRender',
      path: '/form-render',
      children: [
        { title: '教程', path: '/form-render/guide' },
        { title: 'Schema', path: '/form-render/schema' },
        { title: 'Playground', path: '/playground' },
      ],
    },
    {
      title: 'TableRender',
      path: '/table-render',
    },
    {
      title: 'ChartRender',
      path: '/chart-render',
    },
    // {
    //   title: '周边工具',
    //   path: '/tools',
    //   children: [{ title: 'VSCode 插件', path: '/tools/vscode' }],
    // },
    {
      title: '更新日志',
      children: [
        {
          title: 'FormTender',
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
        }
      ],
    },
    {
      title: '国内镜像',
      path: 'https://x-render.gitee.io/form-render/',
    },
    { title: 'GitHub', path: 'https://github.com/alibaba/form-render' },
  ],
  mode: 'site',
  alias: {
    'form-render/dist': path.resolve(__dirname, 'packages/form-render/dist'),
  },
  esbuild: {},
  base: '/x-render/',
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
  // more config: https://d.umijs.org/config
});
