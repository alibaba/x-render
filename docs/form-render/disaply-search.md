---
order: 1
toc: content
mobile: false
group: 
  title: 最佳示例
  order: 2
---

# 查询表单

## 基础

```jsx
import React from 'react';
import { useForm, SearchForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    inputA: {
      title: 'Field A',
      type: 'string',
      props: {},
    },
    inputB: {
      title: 'Field B',
      type: 'string',
      props: {},
    },
    input3: {
      title: 'Field C',
      type: 'string',
      props: {},
    },
    selectA: {
      title: 'Field D',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ]
      }
    }
  }
};

export default () => {
  const form = useForm();

  const onSearch = (values) => {
    console.log(values, 'searchData');
  };

  return (
    <SearchForm 
      schema={schema} 
      form={form}
      labelWidth={100}
      onSearch={onSearch}
      // loading={true}
    />
  )
};
```


## 可折叠

```jsx
import React from 'react';
import FormRender, { useForm, SearchForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'column',
  properties: {
    inputA: {
      title: 'Field A',
      type: 'string',
      props: {},
    },
    inputB: {
      title: 'Field B',
      type: 'string',
      props: {},
    },
    inputC: {
      title: 'Field C',
      type: 'string',
      props: {},
    },
    inputD: {
      title: 'Field D',
      type: 'string',
      props: {},
    },
    selectA: {
      title: 'Field E',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ]
      }
    },
    selectB: {
      title: 'Field F',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ]
      }
    },
    selectC: {
      title: 'Field G',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ]
      }
    },
    selectD: {
      title: 'Field H',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ]
      }
    }
  }
};

export default () => {
  const form = useForm();

  const onSearch = (values) => {
    console.log(values, 'searchData');
  }

  return (
    <SearchForm 
      schema={schema} 
      form={form}
      labelWidth={100}
      collapsed={true}
      onSearch={onSearch}
    />
  )
};
```


## API

| 参数             | 说明                                                                                     | 类型                                                                                                  | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| collapsed           | 是否可折叠                             | `boolean`          |  -    |
| defaultCollapsed    | 折叠收起                               | `boolean`          |  true   |
| loading             | 查询按钮加载中                          | `boolean`          |  -    |
| layoutAuto            | 自适应布局，可设置为 true / false 或对象：{ fieldMinWidth: `number` }， 当设置fieldMinWidth 会根据最小宽度动态自适应                         | `boolean` or `object`         |  `false `   |
| column              | 一行多列                               | `number`           |  4    |
| onMount             | 表单首次加载时触发                       | `() => void`       |  -    |
| onSearch            | 点击查询按钮触发                        | `(data) => void`    |  -    |
| searchText          | 自定义 查询按钮文案                     | `string`            |  查询  |
| resetText           | 自定义 重置按钮文案                      | `string`           |  重置  |
| searchOnMount      | 组件初次挂载时，是否默认执行查询动作        | `boolean`           | true   | 
| searchWithError    | 表单校验失败时，是否继续执行查询操作        | `boolean`           | true   |
| `...`              | 详见 formRender [Props](/form-render/api-props) |            |        |
