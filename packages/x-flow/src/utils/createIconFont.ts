import { createFromIconfontCN } from '@ant-design/icons';

export default (url?: string) => {
  return createFromIconfontCN({
    // scriptUrl: url || '//at.alicdn.com/t/a/font_4201076_frx3c9x07if.js',
    scriptUrl: url || '//at.alicdn.com/t/a/font_4069358_dd524fgnynb.js',
  });
};
