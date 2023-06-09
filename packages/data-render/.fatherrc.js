import copy from 'rollup-plugin-copy';

export default {
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  lessInBabelMode: true,
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
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    // [
    //   'import',
    //   {
    //     libraryName: '@ant-design/icons',
    //     libraryDirectory: 'lib/icons',
    //     camel2DashComponentName: false,
    //   },
    //   '@ant-design/icons',
    // ],
  ],
};
