import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default {
  esm: 'rollup',
  cjs: 'rollup',
  lessInBabelMode: true,
  lessInRollupMode: {},
  extraRollupPlugins: [
    commonjs({
      include: '../../node_modules/**',
    }),
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
