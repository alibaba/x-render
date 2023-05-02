import { createFromIconfontCN } from '@ant-design/icons';

export default () => {
  return createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/a/font_2705259_bm3cr8z1o4q.js',
  });
};

export function uuid() {
  return ((Math.random() * 1e6) >> 0).toString(36);
}
