import { createFromIconfontCN } from '@ant-design/icons';

export default (url?: string) => {
  return createFromIconfontCN({
    scriptUrl: url || '//at.alicdn.com/t/a/font_2750617_sax751jyfjl.js',
  });
};
