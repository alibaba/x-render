// 通用的配置，可以在每个package里写 fatherrc.js 来覆盖
export default {
  esm: 'rollup',
  disableTypeCheck: false, // 如果出了问题，这个可以改成true
  cjs: { type: 'babel', lazy: true },
};
