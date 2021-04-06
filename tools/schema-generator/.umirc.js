import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'schema生成器',
  favicon: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  logo: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  navs: [
    null,
    {
      title: 'FormRender',
      path: 'https://x-render.gitee.io/form-render/',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/form-render/schema-generator',
    },
    {
      title: '更新日志',
      path:
        'https://github.com/form-render/schema-generator/blob/master/CHANGELOG.md',
    },
  ],
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/schema-generator/',
  publicPath: '/schema-generator/',
  exportStatic: {},
  // more config: https://d.umijs.org/config
});
