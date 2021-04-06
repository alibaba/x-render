import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default {
  esm: 'rollup',
  cjs: 'rollup',
  lessInBabelMode: true,
  lessInRollupMode: {},
  extraRollupPlugins: [
    commonjs({
      include: 'node_modules/**',
    }),
    copy({
      targets: [{ src: 'src/index.d.ts', dest: 'dist/' }],
    }),
  ],
};
