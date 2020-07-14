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
};
