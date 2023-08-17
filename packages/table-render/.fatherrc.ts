export default {
  cjs: { type: 'rollup' },
  esm: {
    type: 'rollup',
    importLibToEs: true,
  },
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
    // ['transform-remove-console', { exclude: ['error', 'warn'] }],
  ],
};
