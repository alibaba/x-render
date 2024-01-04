import { mergeProps, createMeta } from '../utils';

const props: any = mergeProps(
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'StringSetter'
});

const snippets = [
  {
    title: '图片 URL',
    screenshot: 'icon-image',
    schema: {
      componentName: 'ImageInput',
      props: {
        title: '图片 URL',
      },
    }
  }
]

export default createMeta('ImageInput', {
  title: '图片 URL',
  category: '其他',
  props,
  snippets
});
