import { mergeProps, createMeta } from './utils';

const props: any = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: []
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'StringSetter'
});

const snippets = [
  {
    title: '图片展示',
    screenshot: 'https://img.alicdn.com/imgextra/i3/O1CN015FUlW027PPlKrfQs9_!!6000000007789-2-tps-420-50.png',
    schema: {
      componentName: 'ImageInput',
      props: {
        title: '图片展示',
      },
    }
  }
]

export default createMeta('ImageInput', {
  title: '图片展示',
  category: '其他控件',
  props,
  // snippets
});
