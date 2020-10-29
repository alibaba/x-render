import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: ['src/index.js', 'src/antd.js', 'src/fusion.js'],
  esm: 'rollup',
  cjs: 'babel',
  extraRollupPlugins: [
    commonjs({
      include: 'node_modules/**',
    }),
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: 'css',
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
