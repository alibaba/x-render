import cloneDeep from 'lodash/cloneDeep';

export const inputPropsBasic = [
  {
    name: 'title',
    title: { label: '标题', tip: 'title | 标题' },
    setter: 'StringSetter',
  },
  {
    name: 'code',
    title: { label: '字段名', tip: 'key | 字段名' },
    setter: 'StringSetter',
  },
  {
    name: 'defaultValue',
    title: { label: '默认值', tip: 'defaultValue | 默认值'},
    setter: 'StringSetter'
  },
  {
    name: 'props.placeholder',
    title: { label: '提示文案', tip: 'placeholder | 提示文案' },
    setter: 'StringSetter'
  },
  {
    name: 'description',
    title: { label: '补充说明', tip: 'description | 补充说明' },
    setter: 'StringSetter',
  },
  {
    name: 'tooltip.title',
    title: { label: '气泡提示', tip: 'tooltip.title | 气泡提示文案' },
    setter: 'StringSetter',
  },
  {
    name: 'extra',
    title: { label: '额外提示', tip: 'extra | 额外的提示信息'},
    setter: 'StringSetter'
  },
  {
    name: 'disabled',
    title: { label: '禁用', tip: 'disabled | 禁用' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'hidden',
    title: { label: '隐藏', tip: 'hidden | 隐藏' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'readOnly',
    title: { label: '只读', tip: 'readOnly | 只读' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'readOnlyWidget',
    title: { label: '只读组件', tip: 'readOnlyWidget | 只读组件' },
    setter: 'StringSetter',
    condition: (target: any) => !!target.getProps().getPropValue('readOnly')
  }
];

export const notInputPropsBasic = [
  {
    name: 'title',
    title: { label: '标题', tip: 'title | 标题' },
    setter: 'StringSetter',
  },
  {
    name: 'code',
    title: { label: '字段名', tip: 'key | 字段名' },
    setter: 'StringSetter',
  },
  {
    name: 'defaultValue',
    title: { label: '默认值', tip: 'defaultValue | 默认值'},
    setter: 'StringSetter'
  },
  {
    name: 'description',
    title: { label: '补充说明', tip: 'description | 补充说明' },
    setter: 'StringSetter',
  },
  {
    name: 'tooltip',
    title: { label: '气泡提示', tip: 'tooltip | 气泡提示文案' },
    setter: 'StringSetter',
  },
  {
    name: 'extra',
    title: { label: '额外提示', tip: 'extra | 额外的提示信息'},
    setter: 'StringSetter'
  },
  {
    name: 'disabled',
    title: { label: '禁用', tip: 'disabled | 禁用' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'hidden',
    title: { label: '隐藏', tip: 'hidden | 隐藏' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'readOnly',
    title: { label: '只读', tip: 'readOnly | 只读' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'readOnlyWidget',
    title: { label: '只读组件', tip: 'readOnlyWidget | 只读组件' },
    setter: 'StringSetter',
    condition: (target: any) => !!target.getProps().getPropValue('readOnly')
  }
];

export const optionsProp = {
  display: 'accordion',
  name: 'props.options',
  title: { label: '选项配置', tip: 'options ｜ 选项配置' },
  setter: {
    componentName: 'ArraySetter',
    props: {
      itemSetter: {
        componentName: 'ObjectSetter',
        initialValue: () => ({
          label: '选项名',
          value: uuid()
        }),
        props: {
          config: {
            items: [
              {
                name: 'label',
                title: '选项名',
                important: true,
                setter: 'StringSetter',
              },
              {
                name: 'value',
                title: '选项值',
                setter: ['StringSetter', 'NumberSetter'],
                important: true,
              },
              {
                name: 'disabled',
                title: '禁用',
                setter: 'JsonSetter',
              }
            ]
          }
        }
      }
    }
  }
};

export const getInputPropsBasic = (defaultValueProp: any, placeholder?: any) => {
  const result = cloneDeep(inputPropsBasic);
  result.splice(2, 0, defaultValueProp);
  if (placeholder) {
    result.splice(3, 0, defaultValueProp);
  }
  return result;
}

export const getNotInputPropsBasic = (defaultValueProp: any) => {
  const result = cloneDeep(notInputPropsBasic);
  result.splice(2, 0, defaultValueProp);
  return result;
}

export const uuid = () => {
  return ((Math.random() * 1e6) >> 0).toString(36);
};

export const createMeta = (componentName: string, params: any) => {
  return {
    componentName,
    docUrl: '',
    screenshot: '',
    devMode: 'proCode',
    npm: {
      package: '@ali/form-render-material',
      version: '1.0.0',
      exportName: componentName,
      main: 'src/index.tsx',
      destructuring: true,
      subName: '',
    },
    configure: {
      supports: {
        loop: false,
        condition: false
      },
      component: {
        isContainer: false,
        isModal: false,
        nestingRule: {
          parentWhitelist: ['FormRender', 'Card', 'CardList', 'TableList']
        }
      },
    },
    group: '基础组件',
    category: '常用',
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN01gxzRdT1hm9KXRbZkU_!!6000000004319-2-tps-200-200.png',
    ...params
  };
}

