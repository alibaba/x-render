import { defineConfig } from 'dumi';
import path from 'path';

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
  hire: {
    title: '飞猪用户技术正寻觅前端',
    content: `
<p><strong>招聘团队：</strong>飞猪用户技术（拔赤）- 前端组</p>
<p><strong>招聘层级：</strong>P5 ~ P7</p>
<p><strong>工作城市：</strong>杭州、北京</p>
<p><strong>面试效率：</strong>加急面试</p>
<p><strong>团队链接：</strong></p>
<ul>
  <li>微信：<a href="https://weixin.sogou.com/weixin?query=Fliggy+F2E" target="_blank">Fliggy F2E</a></li>
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
      title: 'Playground',
      path: '/playground',
    },
    {
      title: '周边工具',
      path: '/tools',
      children: [
        { title: 'Schema 编辑器', path: '/tools/generator' },
        { title: 'PropToSchema', path: '/tools/proptypes' },
        { title: 'VSCode 插件', path: '/tools/vscode' },
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
      title: '旧版本',
      path: 'https://x-components.gitee.io/form-render/',
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
  // more config: https://d.umijs.org/config
});
