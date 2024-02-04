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
    title: '模版配置',
    display: 'block',
    type: 'group',
    items: [
      {
        name: 'widget',
        title: {
          label: '类型',
          tip: 'widget ｜ 类型',
        },
        setter: {
          componentName: 'SelectSetter',
          props: {
            options: [
              {
                title: 'SimpleList',
                value: 'simpleList',
              },
              {
                title: 'CardList',
                value: 'cardList',
              },
              {
                title: 'DrawerList',
                value: 'drawerList',
              },
              {
                title: 'TableList',
                value: 'tableList'
              },
              {
                title: 'VirtualList',
                value: 'virtualList'
              },
              {
                title: 'TabList',
                value: 'tabList'
              }
            ]
          }
        },
        extraProps: {
          setValue(target: any, value: string) {
            const node = target.getNode();
            if (value !== 'cardList') {
              node.setPropValue('items.widget', undefined);
              node.setPropValue('items.title', undefined);
              node.setPropValue('items.description', undefined);
              node.setPropValue('items.column', undefined);
            } 
          }
        }
      },
      {
        name: 'items.widget',
        title: {
          label: '样式类型',
          tip: '样式类型',
        },
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
        },
        condition: (target: any) => target.getProps().getPropValue('widget') === 'cardList'
      },
      {
        name: 'items.title',
        title: { label: '标题', tip: 'title | 卡片主题' },
        setter: 'StringSetter',
        condition: (target: any) => target.getProps().getPropValue('widget') === 'cardList'
      },
      {
        name: 'items.description',
        title: { label: '描述', tip: 'description ｜ 卡片的描述' },
        setter: 'StringSetter',
        condition: (target: any) => target.getProps().getPropValue('widget') === 'cardList'
      },
      {
        name: 'items.column',
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
        condition: (target: any) => target.getProps().getPropValue('widget') === 'cardList',
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
      }
    ]
  }
];

const snippets = [
  {
    title: '列表',
    screenshot: 'icon-list',
    schema: {
      componentName: 'CardList',
      props: {
        title: '列表',
        description: '这是一个列表',
        type: 'array',
        items: {
          title: '卡片主题',
          description: '这是一个对象类型',
          column: 3,
          type: 'object',
        }
      }
    }
  }
]

export default createMeta('CardList', {
  title: '列表',
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
        parentWhitelist: ['FormRender', 'Card']
      }
    },
  }
});
