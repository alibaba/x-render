import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'XRender',
  favicon: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  logo: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
  outputPath: 'docs-dist',
  dynamicImport: {
    loading: 'antd/lib/spin',
  },
  locales: [['zh-CN', '中文']],
  hire: {
    title: '飞猪用户技术正寻觅前端',
    content: `
<p><strong>招聘团队：</strong>飞猪用户技术（拔赤）- 前端组</p>
<p><strong>招聘层级：</strong>P5 ~ P7</p>
<p><strong>工作城市：</strong>杭州、北京</p>
<p><strong>面试效率：</strong>加急面试</p>
<p><strong>团队链接：</strong></p>
<ul>
  <li>微信：<a href="http://mp.weixin.qq.com/profile?src=3&timestamp=1617785038&ver=1&signature=yEIt6K-iuUGabtE3BZhh6LeXmUWnA37yvou2KbNlNnli4naTICfCbR*b2hryUv7kjmN6Fm7nGLZOsHFU2V1FTQ==" target="_blank">Fliggy F2E</a></li>
  <li>掘金：<a href="https://juejin.cn/user/3051900006845944" target="_blank">飞猪前端团队</a></li>
  <li>开源：<a href="https://github.com/alibaba/form-render/" target="_blank">alibaba/x-render</a></li>
  <li>开源：<a href="https://github.com/apache/incubator-weex-ui" target="_blank">apache/weex-ui</a></li>
  <li>开源：<a href="https://github.com/fliggy-mobile" target="_blank">fliggy-mobile</a></li>
</ul>`,
    email: 'tw102972@alibaba-inc.com',
    slogan: '想快乐的写前端吗？',
  },
  ignoreMomentLocale: false,
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
    {
      title: '周边工具',
      path: '/tools',
      children: [
        { title: 'Schema 编辑器', path: '/tools/generator' },
        { title: 'VSCode 插件', path: '/tools/vscode' },
        { title: 'PropToSchema', path: '/tools/proptypes' },
      ],
    },
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
        },
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
