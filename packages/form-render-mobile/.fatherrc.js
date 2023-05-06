import copy from 'rollup-plugin-copy';

export default {
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  lessInBabelMode: true,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es/components',
        style: false,
      },
      'antd-mobile',
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
