import cloneDeep from 'lodash/cloneDeep';
import { formItemProps } from './common';

export const mergeProps = (fieldProps: any, initialValueProps?: any, placeholder?: any) => {
  let result: any = cloneDeep(formItemProps);

  if (initialValueProps) {
    result[0].items.splice(2, 1, initialValueProps);
  }

  if (placeholder) {
    result[0].items.splice(3, 1 , placeholder)
  }
  
  result = result.concat(fieldProps);
  return result;
};

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
        // nestingRule: {
        //   parentWhitelist: ['FormRender', 'Card', 'CardList', 'TableList']
        // }
      },
    },
    group: '基础组件',
    category: '常用控件',
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN01gxzRdT1hm9KXRbZkU_!!6000000004319-2-tps-200-200.png',
    ...params
  };
}

export const optionsMeta = {
  display: 'accordion',
  name: 'props.options',
  title: { label: '可选项配置', tip: 'options ｜ 可选项配置' },
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
              // {
              //   name: 'tooltip.title',
              //   title: '气泡提示',
              //   setter: 'StringSetter',
              // },
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