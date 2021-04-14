export default {
  cjs: { type: 'rollup' },
  esm: {
    type: 'rollup',
    importLibToEs: true,
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
