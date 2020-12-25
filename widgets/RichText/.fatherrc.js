// 通用的配置，可以在每个package里写 fatherrc.js 来覆盖
export default {
  esm: 'rollup',
  cjs: 'rollup',
  disableTypeCheck: false, // 如果出了问题，这个可以改成true
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
    ],
  ],
};
