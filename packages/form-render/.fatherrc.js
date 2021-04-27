import copy from 'rollup-plugin-copy';

export default {
  cjs: 'rollup',
  esm: {
    type: 'rollup',
    importLibToEs: true,
  },
  extraRollupPlugins: [
    copy({
      targets: [{ src: 'src/index.d.ts', dest: 'dist/' }],
    }),
  ],
  // lessInRollupMode: {
  //   paths: ['node_modules/**'],
  // },
  lessInBabelMode: true,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
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
