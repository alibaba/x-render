import { createMeta, notInputPropsBasic } from '../utils';

export default createMeta('Color', {
  title: '颜色选择',
  category: '其他',
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: notInputPropsBasic
    }
  ],
  snippets: [
    {
      title: '颜色选择',
      screenshot:'icon-color',
      schema: {
        componentName: 'Color',
        props: {
          title: '颜色选择',
        }
      }
    }
  ]
});
