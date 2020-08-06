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
    { title: 'GitHub', path: 'https://github.com/alibaba/form-render' },
    {
      title: '更新日志',
      path: 'https://github.com/alibaba/form-render/blob/master/CHANGELOG.md',
    },
  ],
  mode: 'site',
  alias: { 'form-render/dist': path.resolve(__dirname, 'dist') },
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
