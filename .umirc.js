import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'form-render',
  favicon: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  logo: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  outputPath: 'docs-dist',
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
        // camel2DashComponentName: false,
      },
    ],
  ],
  // more config: https://d.umijs.org/config
});
