import { createMeta } from '../utils';

const props: any = [
  {
    name: 'title',
    title: { label: '标题', tip: 'title | 卡片主题' },
    setter: 'StringSetter'
  },
  {
    name: 'code',
    title: { label: '字段名', tip: 'key | 字段名' },
    setter: 'StringSetter',
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
    title: '对象',
    screenshot: 'icon-object',
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
  title: '对象',
  category: '布局',
  group: '基础组件',
  priority: 1,
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
      nestingRule: {
        parentWhitelist: ['FormRender', 'Card', 'CardList']
      }
    }
  }
});
