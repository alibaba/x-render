import copy from 'rollup-plugin-copy';

export default {
  entry: ['src/index.js'],
  esm: 'rollup',
  cjs: 'rollup',
  lessInBabelMode: true,
  lessInRollupMode: {},
  extraRollupPlugins: [
    copy({
      targets: [{ src: 'src/index.d.ts', dest: 'dist/' }],
    }),
  ],
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
        libraryName: '@ant-design/icons',
        libraryDirectory: 'lib/icons',
        camel2DashComponentName: false,
      },
      '@ant-design/icons',
    ],
  ],
};
