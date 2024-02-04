import { createMeta, inputPropsBasic } from '../utils';

export default createMeta('ImageInput', {
  title: '图片 URL',
  category: '其他',
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: inputPropsBasic
    },
  ],
  snippets: [
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
});
