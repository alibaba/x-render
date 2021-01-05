import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'form-render',
  favicon: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  logo: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  outputPath: 'docs-dist',
  dynamicImport: {},
  // menus: {
  //   '/guide': [
  //     {
  //       title: '介绍',
  //       children: ['guide/getting-started', 'guide/new-feature'],
  //     },
  //   ],
  // },
  navs: [
    null,
    {
      title: '表单设计器',
      path: 'https://x-render.gitee.io/schema-generator/',
    },
    {
      title: 'table-render',
      path: 'https://x-render.gitee.io/table-render/',
    },
    { title: 'GitHub', path: 'https://github.com/alibaba/form-render' },
    {
      title: '更新日志',
      path:
        'https://github.com/alibaba/form-render/blob/master/packages/form-render/CHANGELOG.md',
    },
    {
      title: '国内镜像',
      path: 'https://x-render.gitee.io/form-render/',
    },
  ],
  mode: 'site',
  alias: {
    'form-render/dist': path.resolve(__dirname, 'packages/form-render/dist'),
  },
  base: '/form-render/',
  publicPath: '/form-render/',
  exportStatic: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: 'css',
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
