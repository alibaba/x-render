import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: ['src/index.js'],
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
        libraryName: '@ant-design/icons',
        libraryDirectory: 'lib/icons',
        camel2DashComponentName: false,
      },
      '@ant-design/icons',
    ],
  ],
};
