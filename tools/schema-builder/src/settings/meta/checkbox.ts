import { createMeta, getNotInputPropsBasic } from '../utils';

export default createMeta('Checkbox', {
  title: '是否选择',
  priority: 994,
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: getNotInputPropsBasic({
        name: 'defaultValue',
        title: { label: '默认值', tip: 'defaultValue | 默认值'},
        setter: 'BoolSetter'
      })
    },
  ],
  snippets: [
    {
      title: '是否选择',
      screenshot:'icon-isNot',
      schema: {
        componentName: 'Checkbox',
        props: {
          title: '是否选择',
          type: 'boolean'
        },
      }
    }
  ],
  
});
