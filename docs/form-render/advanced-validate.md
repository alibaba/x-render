---
order: 2
toc: content
mobile: false
group: 
  title: 高级用法
  order: 1
---

# 表单校验
- 通过内置校验字段配置，实现简单校验逻辑
- 通过 rules 配置，实现复杂校验逻辑
- 通过 validateMessages 实现校验提示模版定制
### 一、内置校验

- required：必填
- max：最大长度 | 最大值
- min：最小长度 | 最小值
- format：url ｜ email ｜ image | color

```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '必填',
      type: 'string',
      required: true,
    },
    input2: {
      title: '数字最大值',
      type: 'number',
      max: 2,
      required: true
    },
    input3: {
      title: '数字最小值',
      type: 'number',
      min: 10,
      required: true,
    },
    input4: {
      title: '字符最大长度',
      type: 'string',
      max: 2,
      required: true,
    },
    input5: {
      title: '字符最小长度',
      type: 'string',
      min: 10,
      required: true,
    },
    input6: {
      title: 'url 校验',
      type: 'string',
      required: true,
      format: 'url',
    },
    input7: {
      title: 'email 校验',
      type: 'string',
      required: true,
      format: 'email',
    },
    input8: {
      title: '图片格式校验',
      type: 'string',
      required: true,
      format: 'image',
    }
  }
};

export default () => {
  const form = useForm();
  
  return (
    <FormRender 
      schema={schema} 
      form={form} 
      footer={true}
    />
  )
};
```


### 二、Rules 校验
- 全面拥抱 Antd Form Rules
- 自定义校验 validator：做了一点小小的改变，validator 直接返回布尔值。


```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '正则表达式',
      type: 'string',
      required: true,
      rules: [
        { pattern: '^[\u4E00-\u9FA5]+$', message: '请输入中文！' }
      ]
    },
    input2: {
      title: '自定义校验',
      type: 'string',
      rules: [
        { 
          validator: (_, value) => {
            const pattern = '^[\u4E00-\u9FA5]+$';
            const result = new RegExp(pattern).test(value);
            return result;
            // 或者是返回一个对象，用于动态设置 message 内容
            // return {
            //   status: result,
            //   message: '请输入中文！',
            // }
          }, 
          message: '请输入中文！' 
        }
      ]
    }
  }
};

export default () => {
  const form = useForm();
  
  return (
     <FormRender 
      schema={schema} 
      form={form} 
      footer={true}
    />
  )
};
```

### 三、子表单校验
自定义组件是一个子表单时，表单提交是无法触发子表单进行校验的，所以这种类型的子组件需要单独处理
```js
import { useImperativeHandle } from 'react';
const ChildForm = (props) => {
  
	// 内部校验方法，异步校验请用 async、await 语法
  const validator = async () => { 
    return true; // 返回 boolean 值，true 表示内部校验通过
  
    // 如果需在外部显示子表单错误信息可以使用对象形式返回
    // retrun { status: boolean, message: string };
  };

  useImperativeHandle(props.addons.fieldRef, () => {
    // 将校验方法暴露出去，方便外部表单提交时，触发校验
    return {
      validator
    };
  });

  return (
  	...// 表单渲染代码
  );
}

export default ChildForm;
```
### 四、定制校验模版
- 全面拥抱 Antd Form Rules
- validateMessages：通过配置 validateMessages 定制校验模版，可以按需定制，定制模版会和默认校验模版进行合并处理


```jsx
import React from 'react';
import FormRender, { useForm } from 'form-render';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '地址（必填）',
      type: 'string',
      required: true,
    }
  }
};

export default () => {
  const form = useForm();

  const validateMessages = {
    required: '${label} 不能为空',
  };
  
  return (
     <FormRender 
      schema={schema} 
      form={form} 
      footer={true}
      validateMessages={validateMessages}
    />
  )
};
```


### 五、默认模版内容

- 中文模版
```Js
const typeTemplate = '${label}的类型不是${label}';

const validateMessagesCN = {
  default: '${label}未通过校验',
  required: '${label}必填',
  whitespace: '${label}不能为空',
  date: {
    format: '${label}的格式错误',
    parse: '${label}无法被解析',
    invalid: '${label}数据不合法',
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: '${label}长度不是${len}',
    min: '${label}长度不能小于${min}',
    max: '${label}长度不能大于${max}',
    range: '${label}长度需在${min}与${max}之间',
  },
  number: {
    len: '${label}不等于${len}',
    min: '${label}不能小于${min}',
    max: '${label}不能大于${max}',
    range: '${label}需在${min}与${max}之间',
  },
  array: {
    len: '${label}长度不是${len}',
    min: '${label}长度不能小于${min}',
    max: '${label}长度不能大于${max}',
    range: '${label}长度需在${min}与${max}之间',
  },
  pattern: {
    mismatch: '${label}未通过正则判断${pattern}',
  },
};
```

- 英文模版
```Js
const typeTemplate = "'${label}' is not a valid ${type}";
const validateMessages = {
  default: "Validation error on field '${label}'",
  required: "'${label}' is required",
  enum: "'${label}' must be one of [${enum}]",
  whitespace: "'${label}' cannot be empty",
  date: {
    format: "'${label}' is invalid for format date",
    parse: "'${label}' could not be parsed as date",
    invalid: "'${label}' is invalid date",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "'${label}' must be exactly ${len} characters",
    min: "'${label}' must be at least ${min} characters",
    max: "'${label}' cannot be longer than ${max} characters",
    range: "'${label}' must be between ${min} and ${max} characters",
  },
  number: {
    len: "'${label}' must equal ${len}",
    min: "'${label}' cannot be less than ${min}",
    max: "'${label}' cannot be greater than ${max}",
    range: "'${label}' must be between ${min} and ${max}",
  },
  array: {
    len: "'${label}' must be exactly ${len} in length",
    min: "'${label}' cannot be less than ${min} in length",
    max: "'${label}' cannot be greater than ${max} in length",
    range: "'${label}' must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: "'${label}' does not match pattern ${pattern}",
  },
};
```