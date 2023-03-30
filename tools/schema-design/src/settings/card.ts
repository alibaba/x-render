import { createMeta } from './utils';

const props: any = [
  {
    name: 'title',
    title: { label: '标题', tip: 'title | 卡片主题' },
    setter: 'StringSetter'
  },
  {
    name: 'description',
    title: { label: '描述', tip: 'description ｜ 卡片的描述' },
    setter: 'StringSetter'
  },
  {
    name: 'column',
    title: {
      label: '一行多列',
      tip: 'column ｜ 表单内容分成几列展示',
    },
    defaultValue: 1,
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [
          {
            title: '一列',
            value: 1,
          },
          {
            title: '两列',
            value: 2,
          },
          {
            title: '三列',
            value: 3,
          },
          {
            title: '四列',
            value: 4
          }
        ]
      }
    },
    extraProps: {
      setValue(target: any, value: number) {
        const node = target.getNode();
        let labelSpan = 8;
        let wrapperColSpan = 16;
        if (value === 1) {
          labelSpan = 4;
          wrapperColSpan = 6;
        } else if (value === 2) {
          wrapperColSpan = 10;
        }
        node.setPropValue('labelCol.span', labelSpan);
        node.setPropValue('wrapperCol.span', wrapperColSpan);

        node.mergeChildren(
          (child: any) => {
            let span = 24 / value;
            child.setPropValue('span', span);
            return false;
          },
          () => {},
          () => {},
        );
      }
    }
  },
  {
    name: 'widget',
    title: {
      label: '类型',
      tip: 'widget ｜ 类型',
    },
    defaultValue: 1,
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [
          {
            title: '卡片',
            value: 'card',
          },
          {
            title: '折叠面板',
            value: 'collapse',
          },
          {
            title: '标题线',
            value: 'lineTitle',
          },
          {
            title: '内联',
            value: 'subInline'
          }
        ]
      }
    }
  },
];

const snippets = [
  {
    title: 'Card',
    screenshot: 'https://img.alicdn.com/imgextra/i3/O1CN01A0xQre1cW3Prqi0Pn_!!6000000003607-2-tps-1316-198.png',
    schema: {
      componentName: 'Card',
      props: {
        title: '卡片主题',
        description: '这是一个对象类型',
        column: 3,
        type: 'object',
        widget: 'collapse'
      }
    }
  }
]

export default createMeta('Card', {
  title: 'Card',
  category: '嵌套组件',
  group: '高级组件',
  props,
  snippets,
  configure: {
    supports: {
      loop: false,
      condition: false
    },
    component: {
      isContainer: true,
      isModal: false,
    }
  }
});
